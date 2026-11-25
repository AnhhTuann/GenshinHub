import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getAuthBackendUrl } from '@/lib/auth-api';
import { isUploadAssetKey } from '@/lib/uploadAssets';

/**
 * Serves /assets/* for both the committed catalog and Admin uploads.
 *
 * Local filesystem first (development + WebP files committed in public/assets).
 * For the narrow upload prefix, a missing local file is fetched from the
 * backend's controlled read-only S3 proxy. Upload keys are allowlisted here as
 * well, so no traversal, listing, or backup-bucket path can be requested.
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
    const p = safeJoin(path.resolve(storageRoot, 'assets'), rel);
    if (p) candidates.push(p);
  }
  // public/assets/<rel> — public root already contains the assets directory.
  const pub = safeJoin(path.resolve(process.cwd(), 'public', 'assets'), rel);
  if (pub) candidates.push(pub);
  for (const c of candidates) {
    try {
      if (fs.existsSync(c) && fs.statSync(c).isFile()) return c;
    } catch { /* ignore */ }
  }
  return null;
}

async function proxyUpload(rel: string): Promise<NextResponse> {
  try {
    const upstream = await fetch(`${getAuthBackendUrl()}/assets/${rel}`, {
      method: 'GET',
      cache: 'no-store',
    });
    if (!upstream.ok) {
      return new NextResponse('Not Found', {
        status: upstream.status === 502 ? 502 : 404,
      });
    }
    const data = await upstream.arrayBuffer();
    return new NextResponse(new Uint8Array(data), {
      status: 200,
      headers: {
        'Content-Type': upstream.headers.get('content-type') || 'image/webp',
        'Cache-Control': upstream.headers.get('cache-control') || 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('[Asset proxy] backend request failed:', error instanceof Error ? error.message : 'unknown');
    return new NextResponse('Bad Gateway', { status: 502 });
  }
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path: segments } = await params;
  const rel = (segments || []).join('/');

  const file = findAsset(segments || []);
  if (file) {
    const ext = path.extname(file).toLowerCase();
    const type = CONTENT_TYPES[ext] || 'application/octet-stream';
    const data = fs.readFileSync(file);
    return new NextResponse(new Uint8Array(data), {
      status: 200,
      headers: {
        'Content-Type': type,
        // Game asset filenames are effectively immutable.
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  }

  if (isUploadAssetKey(rel)) return proxyUpload(rel);
  return new NextResponse('Not Found', { status: 404 });
}
