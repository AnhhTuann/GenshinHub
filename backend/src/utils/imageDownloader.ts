import axios, { AxiosError } from 'axios';
import * as path from 'path';
import sharp from 'sharp';
import { getAssetStorageRoot, resolveAssetFilePath, atomicWriteFile, isDecodableImageFile } from './assetStorage';

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;
const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10MB guard

export interface DownloadOptions {
  /** If true and target file already exists & valid, skip download. Default true. */
  skipExisting?: boolean;
  /** Explicit output path (absolute or public "/assets/..."). Overrides url-based naming. */
  outputPath?: string;
}

function resolveOutputPath(url: string, outputPath?: string): string | null {
  if (outputPath) {
    // Accept either absolute path or "/assets/..." public path
    if (outputPath.startsWith('/assets/')) {
      return resolveAssetFilePath(outputPath);
    }
    const abs = path.resolve(outputPath);
    const root = path.resolve(getAssetStorageRoot());
    const prefix = root + path.sep;
    if (abs !== root && !abs.startsWith(prefix)) return null;
    return abs;
  }
  // Derive from URL filename, sanitize, place under <root>/assets/_remote/
  try {
    const u = new URL(url);
    let name = path.basename(u.pathname) || 'image';
    name = name.replace(/[^a-zA-Z0-9._-]/g, '_');
    return path.join(getAssetStorageRoot(), 'assets', '_remote', name);
  } catch {
    return null;
  }
}

async function fetchBuffer(url: string, timeoutMs = 15000): Promise<Buffer> {
  const res = await axios.get<ArrayBuffer>(url, {
    responseType: 'arraybuffer',
    timeout: timeoutMs,
    maxContentLength: MAX_FILE_BYTES,
    maxBodyLength: MAX_FILE_BYTES,
    headers: { 'User-Agent': 'GenshinHub-AssetSync/1.0' },
    validateStatus: (s) => s >= 200 && s < 300,
  });
  return Buffer.from(res.data);
}

/**
 * Download an image URL and save as WebP inside the configured asset root.
 * - Skips when target exists and is a valid image (no overwrite).
 * - Retries up to MAX_RETRIES with delay.
 * - Atomic write via temp file + rename.
 * - Returns { ok, path?, skipped?, error? }.
 */
export async function downloadAndConvertToWebp(
  url: string,
  outputPath?: string,
  options: DownloadOptions = {},
): Promise<{ ok: boolean; path?: string; skipped?: boolean; error?: string }> {
  const { skipExisting = true } = options;
  const target = resolveOutputPath(url, options.outputPath ?? outputPath);
  if (!target) {
    return { ok: false, error: `Invalid output path for ${url}` };
  }

  if (skipExisting && await isDecodableImageFile(target)) {
    return { ok: true, path: target, skipped: true };
  }
  let lastErr = '';
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const buf = await fetchBuffer(url);
      if (!buf || buf.length < 50) {
        lastErr = 'empty or too small response';
        throw new Error(lastErr);
      }
      // Validate it's actually an image via sharp metadata
      const meta = await sharp(buf, { failOn: 'error' }).metadata();
      if (!meta.format || !meta.width || !meta.height) {
        throw new Error('not a valid image');
      }
      const webp = await sharp(buf)
        .webp({ quality: 80 })
        .toBuffer();
      if (webp.length < 50) throw new Error('webp output too small');
      if (skipExisting && await isDecodableImageFile(target)) {
        return { ok: true, path: target, skipped: true };
      }
      await atomicWriteFile(target, webp);
      return { ok: true, path: target };
    } catch (err) {
      const e = err as AxiosError;
      lastErr = e?.response?.status
        ? `HTTP ${e.response.status}`
        : e?.message || String(err);
      if (e?.response?.status === 404) break;
      if (attempt < MAX_RETRIES) {
        await new Promise((r) => setTimeout(r, RETRY_DELAY_MS * attempt));
      }
    }
  }
  return { ok: false, error: lastErr };
}

/**
 * Try multiple source URLs in order until one succeeds.
 * Returns first success; collects errors for reporting.
 */
export async function downloadWithFallback(
  urls: string[],
  outputPath: string,
  options: DownloadOptions = {},
): Promise<{ ok: boolean; path?: string; skipped?: boolean; error?: string; tried: string[] }> {
  const tried: string[] = [];
  let lastErr = 'no sources';
  for (const url of urls) {
    if (!url) continue;
    tried.push(url);
    const res = await downloadAndConvertToWebp(url, outputPath, options);
    if (res.ok) return { ...res, tried };
    lastErr = res.error || lastErr;
  }
  return { ok: false, error: lastErr, tried };
}
