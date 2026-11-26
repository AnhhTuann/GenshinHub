import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import sharp from 'sharp';
import {
  assertImageLimits,
  buildS3ClientConfig,
  buildUploadObjectKey,
  catalogKeyFromAssetPath,
  chooseUploadMode,
  getCatalogAsset,
  getUploadedImage,
  MAX_INPUT_DIMENSION,
  MAX_INPUT_PIXELS,
  parseCatalogPublicPath,
  parseUploadPublicPath,
  processImageForUpload,
  putCatalogAsset,
  putUploadedImage,
  readObjectStorageEnv,
  validateImageBuffer,
} from './objectStorage';

const ENV = {
  AWS_ACCESS_KEY_ID: 'test-access-key',
  AWS_SECRET_ACCESS_KEY: 'test-secret-key',
  AWS_ENDPOINT_URL_S3: 'https://br-hidden-frost-aouh1xm1.storage.c-2.ap-southeast-1.aws.neon.tech',
  AWS_REGION: 'ap-southeast-1',
  ASSET_BUCKET: 'genshinhub-staging-assets',
  BACKUP_BUCKET: 'genshinhub-staging-backups',
} as NodeJS.ProcessEnv;

class FakeS3Client {
  calls: Array<{ command: string; input: any }> = [];
  responses = new Map<string, any>();
  failOn: string[] = [];

  async send(command: any): Promise<any> {
    const name = command.constructor.name;
    this.calls.push({ command: name, input: command.input });
    if (this.failOn.includes(name)) throw new Error('S3 unavailable');
    return this.responses.get(name) ?? {};
  }
}

async function pngFixture(): Promise<Buffer> {
  return sharp({
    create: { width: 4, height: 4, channels: 3, background: { r: 210, g: 180, b: 120 } },
  }).png().toBuffer();
}

test('buildS3ClientConfig uses Neon path-style endpoint and explicit credentials', () => {
  const config = buildS3ClientConfig(ENV);
  assert.equal(config.forcePathStyle, true);
  assert.equal(config.endpoint, ENV.AWS_ENDPOINT_URL_S3);
  assert.equal(config.region, 'ap-southeast-1');
  assert.deepEqual(config.credentials, {
    accessKeyId: 'test-access-key',
    secretAccessKey: 'test-secret-key',
  });
});

test('readObjectStorageEnv returns null when a required credential is missing', () => {
  const partial = { ...ENV };
  delete partial.AWS_SECRET_ACCESS_KEY;
  assert.equal(readObjectStorageEnv(partial), null);
});

test('chooseUploadMode prefers object storage, then stateless guard, then local filesystem', () => {
  assert.equal(chooseUploadMode(ENV), 'object');
  assert.equal(chooseUploadMode({ RENDER: '1' } as NodeJS.ProcessEnv), 'stateless');
  assert.equal(chooseUploadMode({} as NodeJS.ProcessEnv), 'local');
});

test('validateImageBuffer verifies real image bytes against the declared MIME type', async () => {
  const png = await pngFixture();
  await assert.doesNotReject(validateImageBuffer(png, 'image/png'));
  await assert.rejects(validateImageBuffer(Buffer.from('<html>not an image</html>'), 'image/png'), /valid image/i);
  await assert.rejects(validateImageBuffer(png, 'application/pdf'), /MIME/i);
});

test('assertImageLimits enforces a conservative pixel and dimension budget', () => {
  assert.equal(MAX_INPUT_PIXELS, 20_000_000);
  assert.equal(MAX_INPUT_DIMENSION, 8192);
  assert.doesNotThrow(() => assertImageLimits(4000, 4000));
  assert.doesNotThrow(() => assertImageLimits(MAX_INPUT_DIMENSION, 1));
  assert.throws(() => assertImageLimits(MAX_INPUT_DIMENSION + 1, 1), /dimension/i);
  assert.throws(() => assertImageLimits(1, MAX_INPUT_DIMENSION + 1), /dimension/i);
  assert.throws(() => assertImageLimits(5000, 5000), /pixel/i);
  assert.throws(() => assertImageLimits(0, 100), /invalid dimensions/i);
});

test('validateImageBuffer rejects an oversized image before it is decoded', async () => {
  // 8200x1 is one row of pixels (well under the pixel budget) but exceeds the
  // dimension cap, so it can be generated cheaply and still proves the guard.
  const wide = await sharp({
    create: { width: 8200, height: 1, channels: 3, background: { r: 10, g: 20, b: 30 } },
  }).png().toBuffer();
  await assert.rejects(validateImageBuffer(wide, 'image/png'), /dimension/i);
});

test('processImageForUpload converts an uploaded image to WebP with Sharp', async () => {
  const webp = await processImageForUpload(await pngFixture(), 'image/png');
  const meta = await sharp(webp).metadata();
  assert.equal(meta.format, 'webp');
  assert.ok(webp.length > 50);
});

test('buildUploadObjectKey generates a sanitized, unique WebP key under uploads/', () => {
  const first = buildUploadObjectKey(new Date('2026-11-25T07:00:00Z'), 'aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee');
  const second = buildUploadObjectKey(new Date('2026-11-25T07:00:00Z'), '11111111-2222-4333-8444-555555555555');
  assert.match(first, /^uploads\/2026\/11\/[a-f0-9-]{36}\.webp$/);
  assert.notEqual(first, second);
});

test('parseUploadPublicPath accepts only controlled upload image paths', () => {
  assert.equal(
    parseUploadPublicPath('/assets/uploads/2026/11/aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee.webp'),
    'uploads/2026/11/aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee.webp',
  );
  for (const bad of [
    '/assets/uploads/../pgdump/secret.dump',
    '/assets/uploads/2026/11/..%2fsecret.webp',
    '/assets/pgdump/2026/backup.dump',
    '/assets/uploads/backup.webp',
    '/assets/uploads/2026/11/image.png',
    '/assets/uploads//etc/passwd',
  ]) {
    assert.equal(parseUploadPublicPath(bad), null, `expected rejection: ${bad}`);
  }
});

test('putUploadedImage writes WebP bytes with immutable cache metadata to the asset bucket', async () => {
  const client = new FakeS3Client();
  const result = await putUploadedImage(
    { buffer: await pngFixture(), mime: 'image/png', originalName: 'My Hero.PNG', env: ENV, client: client as any },
  );
  assert.equal(result.publicPath.startsWith('/assets/uploads/'), true);
  const put = client.calls.find(c => c.command === 'PutObjectCommand');
  assert.ok(put, 'expected PutObjectCommand');
  assert.equal(put.input.Bucket, 'genshinhub-staging-assets');
  assert.notEqual(put.input.Bucket, ENV.BACKUP_BUCKET);
  assert.match(put.input.Key, /^uploads\/\d{4}\/\d{2}\/[a-f0-9-]{36}\.webp$/);
  assert.equal(put.input.ContentType, 'image/webp');
  assert.match(put.input.CacheControl, /immutable/);
});

test('putUploadedImage reports failed uploads instead of returning a broken URL', async () => {
  const client = new FakeS3Client();
  client.failOn.push('PutObjectCommand');
  await assert.rejects(
    putUploadedImage({ buffer: await pngFixture(), mime: 'image/png', originalName: 'x.png', env: ENV, client: client as any }),
    /S3 unavailable/,
  );
});

test('getUploadedImage reads only from the asset bucket and returns image bytes', async () => {
  const client = new FakeS3Client();
  client.responses.set('GetObjectCommand', {
    ContentType: 'image/webp',
    CacheControl: 'public, max-age=31536000, immutable',
    Body: { transformToByteArray: async () => Buffer.from('webp-bytes') },
  });
  const result = await getUploadedImage(
    '/assets/uploads/2026/11/aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee.webp',
    { env: ENV, client: client as any },
  );
  assert.deepEqual(result?.body, Buffer.from('webp-bytes'));
  assert.equal(result?.contentType, 'image/webp');
  const get = client.calls.find(c => c.command === 'GetObjectCommand');
  assert.equal(get?.input.Bucket, 'genshinhub-staging-assets');
  assert.equal(get?.input.Key, 'uploads/2026/11/aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee.webp');
});

test('getUploadedImage never issues a request for traversal or backup-bucket paths', async () => {
  const client = new FakeS3Client();
  assert.equal(await getUploadedImage('/assets/uploads/../../pgdump/backup.dump', { env: ENV, client: client as any }), null);
  assert.equal(client.calls.length, 0);
});

test('catalogKeyFromAssetPath maps only safe catalog images to private keys', () => {
  assert.equal(
    catalogKeyFromAssetPath('/assets/items/UI_ItemIcon_107016.webp'),
    'catalog/items/UI_ItemIcon_107016.webp',
  );
  for (const bad of [
    '/assets/items/../pgdump/backup.dump',
    '/assets/items/%2e%2e/secret.webp',
    '/assets/pgdump/backup.dump',
    '/assets/items/image.png.exe',
    '',
  ]) {
    assert.equal(catalogKeyFromAssetPath(bad), null, `expected rejection: ${bad}`);
  }
});

test('parseCatalogPublicPath accepts the controlled proxy prefix only', () => {
  assert.equal(
    parseCatalogPublicPath('/assets/catalog/characters/albedo/avatar.webp'),
    'catalog/characters/albedo/avatar.webp',
  );
  assert.equal(parseCatalogPublicPath('/assets/uploads/2026/11/id.webp'), null);
  assert.equal(parseCatalogPublicPath('/assets/catalog/../pgdump/backup.dump'), null);
  assert.equal(parseCatalogPublicPath('/assets/catalog/pgdump/backup.dump'), null);
});

class CatalogFakeS3Client {
  calls: Array<{ command: string; input: any }> = [];
  existing: { ContentLength: number; Metadata?: Record<string, string> } | null = null;
  throwNotFound = false;
  putBody?: Buffer;
  putMetadata?: Record<string, string>;

  async send(command: any): Promise<any> {
    const name = command.constructor.name;
    this.calls.push({ command: name, input: command.input });
    if (name === 'HeadObjectCommand') {
      if (this.existing) return this.existing;
      if (this.putBody) {
        return {
          ContentLength: this.putBody.length,
          Metadata: this.putMetadata,
        };
      }
      if (this.throwNotFound) {
        const error = new Error('Not Found') as Error & { name: string };
        error.name = 'NotFound';
        throw error;
      }
      return null;
    }
    if (name === 'PutObjectCommand') {
      this.putBody = command.input.Body as Buffer;
      this.putMetadata = command.input.Metadata;
      return {};
    }
    return {};
  }
}

async function webpFixtureFile(): Promise<{ dir: string; filePath: string; body: Buffer }> {
  const dir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'genshinhub-catalog-'));
  const filePath = path.join(dir, 'UI_ItemIcon_107016.webp');
  const body = await sharp({
    create: { width: 8, height: 8, channels: 3, background: { r: 30, g: 90, b: 140 } },
  }).webp({ quality: 80 }).toBuffer();
  await fs.promises.writeFile(filePath, body);
  return { dir, filePath, body };
}

test('putCatalogAsset uploads a valid WebP and verifies the stored object', async () => {
  const { dir, filePath, body } = await webpFixtureFile();
  try {
    const client = new CatalogFakeS3Client();
    const result = await putCatalogAsset({
      filePath,
      publicPath: '/assets/items/UI_ItemIcon_107016.webp',
      env: ENV,
      client: client as any,
    });
    assert.equal(result.uploaded, true);
    assert.equal(result.key, 'catalog/items/UI_ItemIcon_107016.webp');
    const put = client.calls.find((c) => c.command === 'PutObjectCommand');
    assert.ok(put, 'expected PutObjectCommand');
    assert.equal(put.input.Bucket, 'genshinhub-staging-assets');
    assert.equal(put.input.ContentType, 'image/webp');
    assert.deepEqual(put.input.Body, body);
    assert.equal(client.calls.filter((c) => c.command === 'HeadObjectCommand').length, 2);
  } finally {
    await fs.promises.rm(dir, { recursive: true, force: true });
  }
});

test('putCatalogAsset treats a NotFound HeadObject as a missing asset', async () => {
  const { dir, filePath } = await webpFixtureFile();
  try {
    const client = new CatalogFakeS3Client();
    client.throwNotFound = true;
    const result = await putCatalogAsset({
      filePath,
      publicPath: '/assets/items/UI_ItemIcon_107016.webp',
      env: ENV,
      client: client as any,
    });
    assert.equal(result.uploaded, true);
  } finally {
    await fs.promises.rm(dir, { recursive: true, force: true });
  }
});

test('putCatalogAsset skips an already published asset with a matching checksum', async () => {
  const { dir, filePath, body } = await webpFixtureFile();
  try {
    const { createHash } = await import('node:crypto');
    const checksum = createHash('sha256').update(body).digest('hex');
    const client = new CatalogFakeS3Client();
    client.existing = { ContentLength: body.length, Metadata: { 'content-sha256': checksum } };
    const result = await putCatalogAsset({
      filePath,
      publicPath: '/assets/items/UI_ItemIcon_107016.webp',
      env: ENV,
      client: client as any,
    });
    assert.equal(result.uploaded, false);
    assert.equal(client.calls.some((c) => c.command === 'PutObjectCommand'), false);
  } finally {
    await fs.promises.rm(dir, { recursive: true, force: true });
  }
});

test('putCatalogAsset refuses to overwrite a conflicting catalog object', async () => {
  const { dir, filePath } = await webpFixtureFile();
  try {
    const client = new CatalogFakeS3Client();
    client.existing = { ContentLength: 10, Metadata: { 'content-sha256': 'different' } };
    await assert.rejects(
      putCatalogAsset({
        filePath,
        publicPath: '/assets/items/UI_ItemIcon_107016.webp',
        env: ENV,
        client: client as any,
      }),
      /refusing to overwrite/i,
    );
    assert.equal(client.calls.some((c) => c.command === 'PutObjectCommand'), false);
  } finally {
    await fs.promises.rm(dir, { recursive: true, force: true });
  }
});

test('getCatalogAsset reads catalog assets from the private bucket only', async () => {
  const client = new FakeS3Client();
  client.responses.set('GetObjectCommand', {
    ContentType: 'image/webp',
    CacheControl: 'public, max-age=31536000, immutable',
    Body: { transformToByteArray: async () => Buffer.from('catalog-webp') },
  });
  const result = await getCatalogAsset(
    '/assets/items/UI_ItemIcon_107016.webp',
    { env: ENV, client: client as any },
  );
  assert.deepEqual(result?.body, Buffer.from('catalog-webp'));
  const get = client.calls.find((c) => c.command === 'GetObjectCommand');
  assert.equal(get?.input.Bucket, 'genshinhub-staging-assets');
  assert.equal(get?.input.Key, 'catalog/items/UI_ItemIcon_107016.webp');
});

test('getCatalogAsset never requests traversal or backup paths', async () => {
  const client = new FakeS3Client();
  assert.equal(await getCatalogAsset('/assets/../pgdump/backup.dump', { env: ENV, client: client as any }), null);
  assert.equal(await getCatalogAsset('/assets/uploads/2026/11/id.webp', { env: ENV, client: client as any }), null);
  assert.equal(client.calls.length, 0);
});
