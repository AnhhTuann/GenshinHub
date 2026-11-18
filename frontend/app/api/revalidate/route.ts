import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { timingSafeEqual } from 'crypto';
import { routing } from '../../../i18n/routing';

/**
 * POST /api/revalidate
 *
 * Endpoint on-demand ISR revalidation, được gọi bởi backend sync engine
 * hoặc GitHub Actions sau khi database được cập nhật.
 *
 * Body JSON:
 * {
 *   "secret": "<REVALIDATE_SECRET>",
 *   "paths": ["/characters", "/weapons/11505"]   // optional, logical paths
 * }
 *
 * `paths` được hiểu là path logic KHÔNG có locale prefix — server sẽ
 * revalidate cho toàn bộ locales trong routing. Nếu path đã bắt đầu
 * bằng "/<locale>/" thì dùng nguyên văn.
 */

const DEFAULT_PATHS = ['/', '/characters', '/weapons', '/artifacts', '/materials', '/tierlist', '/teams', '/banners'];

const LOCALE_SET = new Set(routing.locales as readonly string[]);

function isSecretValid(provided: string, expected: string): boolean {
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function POST(request: NextRequest) {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected) {
    return NextResponse.json({ error: 'REVALIDATE_SECRET is not configured' }, { status: 500 });
  }

  let body: { secret?: string; paths?: string[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!body.secret || !isSecretValid(body.secret, expected)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const requested = Array.isArray(body.paths) && body.paths.length > 0 ? body.paths : DEFAULT_PATHS;

  const revalidated: string[] = [];
  for (const raw of requested) {
    if (typeof raw !== 'string' || !raw.startsWith('/')) continue;

    // Path đã có locale prefix (vd: /en/characters) -> dùng nguyên văn
    const firstSeg = raw.split('/')[1];
    if (LOCALE_SET.has(firstSeg)) {
      revalidatePath(raw);
      revalidated.push(raw);
      continue;
    }

    // Path logic -> expand theo tất cả locales
    for (const locale of routing.locales) {
      const full = `/${locale}${raw === '/' ? '' : raw}` || `/${locale}`;
      revalidatePath(full === `/${locale}` ? `/${locale}/` : full);
      revalidated.push(full);
    }
  }

  return NextResponse.json({ revalidated: true, paths: revalidated }, { status: 200 });
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed. Use POST.' }, { status: 405 });
}
