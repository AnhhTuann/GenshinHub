import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

/**
 * Fallback server cho /assets/* khi file không nằm trong frontend/public
 * (vd: ASSET_STORAGE_PATH trỏ tới thư mục persistent ngoài source code).
 *
 * Thứ tự tìm file:
 *   1. $ASSET_STORAGE_PATH/assets/<path>
 *   2. <frontend>/public/assets/<path>  (dev mặc định)
 *
 * Bảo vệ path traversal: resolve + kiểm tra prefix, từ chối ".." và null byte.
 */

const CONTENT_TYPES: Record<string, string> = {
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
  '.gif': 'image/gif',
};

function safeJoin(root: string, rel: string): string | null {
  if (!rel || rel.includes('\0') || rel.includes('..')) return null;
  const abs = path.resolve(root, rel);
  const prefix = path.resolve(root) + path.sep;
  if (abs !== path.resolve(root) && !abs.startsWith(prefix)) return null;
  return abs;
}

function findAsset(relSegments: string[]): string | null {
  const rel = relSegments.join('/');
  const candidates: string[] = [];
  const storageRoot = process.env.ASSET_STORAGE_PATH;
  if (storageRoot) {
    const p = safeJoin(path.resolve(storageRoot), path.posix.join('assets', rel));
    if (p) candidates.push(p);
  }
  // public/assets/<rel> — public root đã chứa thư mục assets
  const pub = safeJoin(path.resolve(process.cwd(), 'public'), path.posix.join('assets', rel));
  if (pub) candidates.push(pub);
  for (const c of candidates) {
    try {
      if (fs.existsSync(c) && fs.statSync(c).isFile()) return c;
    } catch { /* ignore */ }
  }
  return null;
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path: segments } = await params;
  const file = findAsset(segments || []);
  if (!file) {
    return new NextResponse('Not Found', { status: 404 });
  }
  const ext = path.extname(file).toLowerCase();
  const type = CONTENT_TYPES[ext] || 'application/octet-stream';
  const data = fs.readFileSync(file);
  return new NextResponse(new Uint8Array(data), {
    status: 200,
    headers: {
      'Content-Type': type,
      // Ảnh game gần như immutable theo filename
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
