/**
 * Allowlist for Admin-uploaded asset URLs served by the frontend proxy.
 * Mirrors the backend's uploads/ key pattern exactly: one stable WebP path,
 * no listing, no backup objects, no encoded traversal.
 */
const UPLOAD_KEY = /^uploads\/\d{4}\/\d{2}\/[a-f0-9-]{36}\.webp$/;
const CATALOG_KEY = /^[A-Za-z0-9][A-Za-z0-9._/-]*\.(?:webp|png|jpe?g)$/i;

function safeDecoded(value: string): string | null {
  if (!value || value.includes('\0') || /%2f|%5c/i.test(value)) return null;
  try {
    const decoded = decodeURIComponent(value);
    return decoded === value ? decoded : null;
  } catch {
    return null;
  }
}

export function isUploadAssetKey(rel: string): boolean {
  const decoded = safeDecoded(rel);
  return decoded !== null && UPLOAD_KEY.test(decoded);
}

/**
 * Map an existing public `/assets/...` catalog path to the private bucket key
 * exposed through the backend proxy. Only image paths are allowed; uploads,
 * backups, traversal and encoded separators are rejected.
 */
export function catalogAssetKeyFromPublicPath(publicPath: string): string | null {
  const decoded = safeDecoded(publicPath);
  if (!decoded) return null;
  const rel = decoded.replace(/^\/+/, '');
  if (!rel.startsWith('assets/')) return null;
  const candidate = rel.slice('assets/'.length);
  if (candidate.startsWith('catalog/') || candidate.startsWith('uploads/')) return null;
  if (!CATALOG_KEY.test(candidate)) return null;
  const parts = candidate.split('/');
  if (parts.some((part) => !part || part === '.' || part === '..' || part.includes('\\'))) return null;
  return `catalog/${candidate}`;
}
