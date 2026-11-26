import { createHash, randomUUID } from 'node:crypto';
import fs from 'node:fs';
import { GetObjectCommand, HeadObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import sharp from 'sharp';

export interface ObjectStorageEnv {
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
  AWS_ENDPOINT_URL_S3: string;
  AWS_REGION: string;
  ASSET_BUCKET: string;
}

export type UploadMode = 'object' | 'stateless' | 'local';

export interface S3Like {
  send(command: any): Promise<any>;
}

export const REQUIRED_ASSET_ENV: Array<keyof ObjectStorageEnv> = [
  'AWS_ACCESS_KEY_ID',
  'AWS_SECRET_ACCESS_KEY',
  'AWS_ENDPOINT_URL_S3',
  'AWS_REGION',
  'ASSET_BUCKET',
];

export function readObjectStorageEnv(env: NodeJS.ProcessEnv = process.env): ObjectStorageEnv | null {
  const values = REQUIRED_ASSET_ENV.map((key) => (env[key] || '').trim());
  if (values.some((value) => !value)) return null;
  return {
    AWS_ACCESS_KEY_ID: values[0],
    AWS_SECRET_ACCESS_KEY: values[1],
    AWS_ENDPOINT_URL_S3: values[2],
    AWS_REGION: values[3],
    ASSET_BUCKET: values[4],
  };
}

export function buildS3ClientConfig(env: NodeJS.ProcessEnv | ObjectStorageEnv) {
  const config = readObjectStorageEnv(env as NodeJS.ProcessEnv) ?? (env as ObjectStorageEnv);
  return {
    region: config.AWS_REGION,
    endpoint: config.AWS_ENDPOINT_URL_S3,
    credentials: {
      accessKeyId: config.AWS_ACCESS_KEY_ID,
      secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    },
    // Neon Object Storage only supports path-style addressing and SigV4.
    forcePathStyle: true,
  };
}

let cachedClient: S3Like | null = null;

export function getAssetS3Client(env: NodeJS.ProcessEnv = process.env): S3Like {
  if (!cachedClient) {
    const config = readObjectStorageEnv(env);
    if (!config) throw new Error('Neon object storage credentials are not configured');
    cachedClient = new S3Client(buildS3ClientConfig(config));
  }
  return cachedClient;
}

function isStatelessEnv(env: NodeJS.ProcessEnv): boolean {
  return env.STATELESS_HOST === '1' || env.VERCEL === '1' || env.RENDER === '1';
}

/** Object storage first, then fail closed on stateless hosts, then local dev disk. */
export function chooseUploadMode(env: NodeJS.ProcessEnv = process.env): UploadMode {
  if (readObjectStorageEnv(env)) return 'object';
  if (isStatelessEnv(env)) return 'stateless';
  return 'local';
}

/**
 * Render Free has 512 MB RAM. A decoded 20 MP RGBA image is ~80 MB and leaves
 * room for Sharp's pipeline; 8192px per side blocks decompression bombs that
 * would otherwise be decoded before we can inspect the result.
 */
export const MAX_INPUT_PIXELS = 20_000_000;
export const MAX_INPUT_DIMENSION = 8192;

export function assertImageLimits(width: number, height: number): void {
  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
    throw new Error('Uploaded image has invalid dimensions');
  }
  if (width > MAX_INPUT_DIMENSION || height > MAX_INPUT_DIMENSION) {
    throw new Error(`Uploaded image exceeds the ${MAX_INPUT_DIMENSION}px dimension limit`);
  }
  if (width * height > MAX_INPUT_PIXELS) {
    throw new Error(`Uploaded image exceeds the ${MAX_INPUT_PIXELS} pixel limit`);
  }
}

const MIME_FORMATS: Record<string, string[]> = {
  'image/jpeg': ['jpeg', 'jpg'],
  'image/png': ['png'],
  'image/gif': ['gif'],
  'image/webp': ['webp'],
};

export async function validateImageBuffer(buffer: Buffer, declaredMime: string): Promise<void> {
  const formats = MIME_FORMATS[declaredMime];
  if (!formats) throw new Error(`Unsupported upload MIME type: ${declaredMime || 'unknown'}`);
  let metadata;
  try {
    metadata = await sharp(buffer, { limitInputPixels: MAX_INPUT_PIXELS, failOn: 'error' }).metadata();
  } catch {
    throw new Error('Uploaded file is not a valid image or exceeds the allowed pixel budget');
  }
  if (!metadata.format || !metadata.width || !metadata.height || !formats.includes(metadata.format)) {
    throw new Error('Uploaded file is not a valid image for the declared MIME type');
  }
  assertImageLimits(metadata.width, metadata.height);
}

export async function processImageForUpload(buffer: Buffer, declaredMime: string): Promise<Buffer> {
  await validateImageBuffer(buffer, declaredMime);
  const webp = await sharp(buffer, { limitInputPixels: MAX_INPUT_PIXELS })
    .rotate()
    .webp({ quality: 80 })
    .toBuffer();
  if (webp.length < 50) throw new Error('Processed WebP image is empty');
  return webp;
}

export function sanitizeOriginalName(name: string): string {
  return String(name || 'upload')
    .replace(/^.*[\\/]/, '')
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .slice(0, 100) || 'upload';
}

export function buildUploadObjectKey(now: Date = new Date(), uuid: string = randomUUID()): string {
  const year = now.getUTCFullYear().toString().padStart(4, '0');
  const month = (now.getUTCMonth() + 1).toString().padStart(2, '0');
  const safeUuid = uuid.replace(/[^a-f0-9-]/gi, '').toLowerCase();
  return `uploads/${year}/${month}/${safeUuid}.webp`;
}

/**
 * Map a stable public URL back to the one asset-bucket key prefix we expose.
 * Anything outside `/assets/uploads/<year>/<month>/<uuid>.webp` is rejected,
 * including backup objects and percent-encoded traversal attempts.
 */
export function parseUploadPublicPath(publicPath: string): string | null {
  if (typeof publicPath !== 'string' || !publicPath || publicPath.includes('\0')) return null;
  let decoded: string;
  try {
    decoded = decodeURIComponent(publicPath);
  } catch {
    return null;
  }
  if (/%2f|%5c/i.test(publicPath)) return null;
  const match = decoded.match(/^\/assets\/uploads\/(\d{4})\/(\d{2})\/([a-f0-9-]{36})\.webp$/);
  if (!match) return null;
  return `uploads/${match[1]}/${match[2]}/${match[3]}.webp`;
}

export function objectKeyToPublicPath(key: string): string {
  if (key.startsWith(CATALOG_KEY_PREFIX)) return `/assets/${key.slice(CATALOG_KEY_PREFIX.length)}`;
  if (key.startsWith('uploads/')) return `/assets/${key}`;
  return `/assets/${key}`;
}

// ---------------------------------------------------------------------------
// Durable catalog assets (synced WebP files). The bucket stays private; the
// backend exposes a narrow read-only proxy, so no public bucket URL is used.
// ---------------------------------------------------------------------------

export const CATALOG_KEY_PREFIX = 'catalog/';
export const MAX_CATALOG_FILE_BYTES = 10 * 1024 * 1024;
const CATALOG_IMAGE_RE = /^[A-Za-z0-9][A-Za-z0-9._/-]*\.(?:webp|png|jpe?g)$/i;

function validateCatalogRel(rel: string): string | null {
  if (!CATALOG_IMAGE_RE.test(rel)) return null;
  const parts = rel.split('/');
  if (parts.some((part) => !part || part === '.' || part === '..' || part.includes('\\'))) return null;
  return rel;
}

/** Map an existing public catalog URL (/assets/<rel>) to its private bucket key. */
export function catalogKeyFromAssetPath(publicPath: string): string | null {
  if (typeof publicPath !== 'string' || !publicPath || publicPath.includes('\0')) return null;
  if (/%2f|%5c/i.test(publicPath)) return null;
  let decoded: string;
  try {
    decoded = decodeURIComponent(publicPath);
  } catch {
    return null;
  }
  const rel = decoded.replace(/^\/+/, '');
  if (!rel.startsWith('assets/')) return null;
  const candidate = rel.slice('assets/'.length);
  if (candidate.startsWith('catalog/') || candidate.startsWith('uploads/')) return null;
  const safe = validateCatalogRel(candidate);
  return safe ? `${CATALOG_KEY_PREFIX}${safe}` : null;
}

/** Map the backend read proxy path (/assets/catalog/<rel>) to its bucket key. */
export function parseCatalogPublicPath(publicPath: string): string | null {
  if (typeof publicPath !== 'string' || !publicPath || publicPath.includes('\0')) return null;
  if (/%2f|%5c/i.test(publicPath)) return null;
  let decoded: string;
  try {
    decoded = decodeURIComponent(publicPath);
  } catch {
    return null;
  }
  if (!decoded.startsWith(`/assets/${CATALOG_KEY_PREFIX}`)) return null;
  const safe = validateCatalogRel(decoded.slice(`/assets/${CATALOG_KEY_PREFIX}`.length));
  return safe ? `${CATALOG_KEY_PREFIX}${safe}` : null;
}

export interface PutCatalogAssetInput {
  filePath: string;
  publicPath: string;
  env?: NodeJS.ProcessEnv;
  client?: S3Like;
}

export interface CatalogAssetResult {
  key: string;
  publicPath: string;
  contentType: 'image/webp';
  size: number;
  checksum: string;
  uploaded: boolean;
}

/**
 * Publish one sync-generated WebP. Idempotent: an identical object is skipped;
 * a conflicting object is never overwritten. The checksum metadata round-trips
 * through HeadObject before the asset is considered published.
 */
export async function putCatalogAsset(input: PutCatalogAssetInput): Promise<CatalogAssetResult> {
  const config = readObjectStorageEnv(input.env);
  if (!config) throw new Error('Neon object storage credentials are not configured');
  const key = catalogKeyFromAssetPath(input.publicPath);
  if (!key) throw new Error('Invalid catalog asset path');

  const body = fs.readFileSync(input.filePath);
  if (body.length === 0 || body.length > MAX_CATALOG_FILE_BYTES) {
    throw new Error('Catalog asset size is invalid');
  }
  const metadata = await sharp(body, { failOn: 'error', limitInputPixels: MAX_INPUT_PIXELS }).metadata();
  if (metadata.format !== 'webp' || !metadata.width || !metadata.height) {
    throw new Error('Catalog asset must be a valid WebP image');
  }
  const checksum = createHash('sha256').update(body).digest('hex');
  const client = input.client ?? getAssetS3Client(input.env);

  let existing: any = null;
  try {
    existing = await client.send(new HeadObjectCommand({
      Bucket: config.ASSET_BUCKET,
      Key: key,
    }));
  } catch (error: any) {
    const notFound = error?.name === 'NotFound'
      || error?.name === 'NoSuchKey'
      || error?.$metadata?.httpStatusCode === 404;
    if (!notFound) throw error;
  }
  if (existing) {
    const storedChecksum = existing.Metadata?.['content-sha256'];
    if (storedChecksum && storedChecksum !== checksum) {
      throw new Error(`Catalog asset ${key} already exists with a different checksum; refusing to overwrite`);
    }
    if (existing.ContentLength !== body.length) {
      throw new Error(`Catalog asset ${key} already exists with a different size; refusing to overwrite`);
    }
    return {
      key,
      publicPath: objectKeyToPublicPath(key),
      contentType: 'image/webp',
      size: body.length,
      checksum,
      uploaded: false,
    };
  }

  await client.send(new PutObjectCommand({
    Bucket: config.ASSET_BUCKET,
    Key: key,
    Body: body,
    ContentType: 'image/webp',
    CacheControl: 'public, max-age=31536000, immutable',
    Metadata: { 'content-sha256': checksum },
  }));
  const verified = await client.send(new HeadObjectCommand({
    Bucket: config.ASSET_BUCKET,
    Key: key,
  }));
  if (verified?.ContentLength !== body.length || verified?.Metadata?.['content-sha256'] !== checksum) {
    throw new Error(`HeadObject verification failed for catalog asset ${key}`);
  }
  return {
    key,
    publicPath: objectKeyToPublicPath(key),
    contentType: 'image/webp',
    size: body.length,
    checksum,
    uploaded: true,
  };
}

export interface GetCatalogAssetInput {
  env?: NodeJS.ProcessEnv;
  client?: S3Like;
}

/** Read a catalog WebP either by its public path or the controlled proxy path. */
export async function getCatalogAsset(
  publicPath: string,
  input: GetCatalogAssetInput = {},
): Promise<{ body: Buffer; contentType: string; cacheControl: string } | null> {
  const key = parseCatalogPublicPath(publicPath) ?? catalogKeyFromAssetPath(publicPath);
  if (!key) return null;
  const config = readObjectStorageEnv(input.env);
  if (!config) return null;
  const client = input.client ?? getAssetS3Client(input.env);
  const result = await client.send(new GetObjectCommand({
    Bucket: config.ASSET_BUCKET,
    Key: key,
  }));
  const raw = result?.Body;
  let body: Buffer | null = null;
  if (raw && typeof raw.transformToByteArray === 'function') {
    body = Buffer.from(await raw.transformToByteArray());
  } else if (raw instanceof Uint8Array) {
    body = Buffer.from(raw);
  }
  if (!body) return null;
  return {
    body,
    contentType: result.ContentType || 'image/webp',
    cacheControl: result.CacheControl || 'public, max-age=31536000, immutable',
  };
}

export interface PutUploadedImageInput {
  buffer: Buffer;
  mime: string;
  originalName: string;
  env?: NodeJS.ProcessEnv;
  client?: S3Like;
}

export async function putUploadedImage(input: PutUploadedImageInput): Promise<{
  key: string;
  publicPath: string;
  contentType: string;
  size: number;
  checksum: string;
}> {
  const config = readObjectStorageEnv(input.env);
  if (!config) throw new Error('Neon object storage credentials are not configured');
  const body = await processImageForUpload(input.buffer, input.mime);
  const key = buildUploadObjectKey();
  const checksum = createHash('sha256').update(body).digest('hex');
  const client = input.client ?? getAssetS3Client(input.env);
  await client.send(new PutObjectCommand({
    Bucket: config.ASSET_BUCKET,
    Key: key,
    Body: body,
    ContentType: 'image/webp',
    CacheControl: 'public, max-age=31536000, immutable',
    Metadata: {
      'original-name': sanitizeOriginalName(input.originalName),
      'content-sha256': checksum,
    },
  }));
  return {
    key,
    publicPath: objectKeyToPublicPath(key),
    contentType: 'image/webp',
    size: body.length,
    checksum,
  };
}

export interface GetUploadedImageInput {
  env?: NodeJS.ProcessEnv;
  client?: S3Like;
}

export async function getUploadedImage(
  publicPath: string,
  input: GetUploadedImageInput = {},
): Promise<{ body: Buffer; contentType: string; cacheControl: string } | null> {
  const key = parseUploadPublicPath(publicPath);
  if (!key) return null;
  const config = readObjectStorageEnv(input.env);
  if (!config) return null;
  const client = input.client ?? getAssetS3Client(input.env);
  const result = await client.send(new GetObjectCommand({
    Bucket: config.ASSET_BUCKET,
    Key: key,
  }));
  const raw = result?.Body;
  let body: Buffer | null = null;
  if (raw && typeof raw.transformToByteArray === 'function') {
    body = Buffer.from(await raw.transformToByteArray());
  } else if (raw instanceof Uint8Array) {
    body = Buffer.from(raw);
  }
  if (!body) return null;
  return {
    body,
    contentType: result.ContentType || 'image/webp',
    cacheControl: result.CacheControl || 'public, max-age=31536000, immutable',
  };
}
