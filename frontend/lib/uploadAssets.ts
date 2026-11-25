/**
 * Allowlist for Admin-uploaded asset URLs served by the frontend proxy.
 * Mirrors the backend's uploads/ key pattern exactly: one stable WebP path,
 * no listing, no backup objects, no encoded traversal.
 */
const UPLOAD_KEY = /^uploads\/\d{4}\/\d{2}\/[a-f0-9-]{36}\.webp$/;

export function isUploadAssetKey(rel: string): boolean {
  if (!rel || rel.includes('\0') || /%2f|%5c/i.test(rel)) return false;
  try {
    if (decodeURIComponent(rel) !== rel) return false;
  } catch {
    return false;
  }
  return UPLOAD_KEY.test(rel);
}
