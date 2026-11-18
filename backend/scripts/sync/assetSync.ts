/**
 * assetSync.ts
 * ------------------------------------------------------------------
 * Quét TOÀN BỘ asset URLs trong DB và đồng bộ file local.
 * Dùng chung cho:
 *   - scripts/sync-assets.ts (CLI standalone)
 *   - syncEngine --download-assets (chỉ record thay đổi)
 *   - asset integration tests
 *
 * Nguyên tắc:
 *   - Không xóa file cũ; không ghi đè file hợp lệ.
 *   - File thiếu/hỏng -> thử nguồn Enka theo filename + genshin-db fallback.
 *   - CDN 404/timeout không làm hỏng cả quá trình; ghi vào missing list.
 */

import * as fs from 'fs';
import * as path from 'path';
import { PrismaClient } from '@prisma/client';
import * as genshindb from 'genshin-db';
import axios from 'axios';
import { resolveAssetFilePath, isValidImageFile, getAssetStorageRoot } from '../../src/utils/assetStorage';
import { downloadWithFallback } from '../../src/utils/imageDownloader';

const ENKA_UI = 'https://enka.network/ui';
const ENKA_CHARS_URL = 'https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/characters.json';
const enka = (filename?: string | null) => (filename ? `${ENKA_UI}/${filename}.png` : undefined);

/** Tạo URL Enka trực tiếp từ basename file local (UI_ItemIcon_xxx.webp -> UI_ItemIcon_xxx.png). */
function enkaFromLocalPath(rel: string | null | undefined): string | undefined {
  if (!rel) return undefined;
  const base = path.basename(rel).replace(/\.webp$/i, '');
  if (!base || base === 'avatar' || base === 'splash' || base === 'icon') return undefined;
  return enka(base);
}

export interface AssetJob {
  label: string;
  relPath: string;      // public path, vd /assets/items/UI_ItemIcon_107016.webp
  absPath: string;      // absolute path trong asset root
  urls: string[];       // nguồn thử theo thứ tự
}

export interface AssetScanResult {
  root: string;
  total: number;
  valid: number;
  missing: number;      // không có file
  invalid: number;      // có file nhưng hỏng/0-byte/sai format
  jobs: AssetJob[];     // các asset cần tải
  skippedNoPath: number; // record không có URL (iconUrl null)
}

function pushJob(
  jobs: AssetJob[],
  counters: { valid: number; missing: number; invalid: number; skippedNoPath: number },
  label: string,
  relPath: string | null | undefined,
  urls: string[],
): void {
  if (!relPath) { counters.skippedNoPath++; return; }
  const abs = resolveAssetFilePath(relPath);
  if (!abs) { counters.invalid++; return; } // path traversal -> invalid
  if (fs.existsSync(abs)) {
    if (isValidImageFile(abs)) { counters.valid++; return; }
    counters.invalid++;
  } else {
    counters.missing++;
  }
  const cleanUrls = urls.filter(Boolean);
  if (cleanUrls.length) jobs.push({ label, relPath, absPath: abs, urls: cleanUrls });
}

/** Tra cứu genshin-db theo nameEn/nameVi, trả về images object hoặc null. */
function genshinImagesByName(nameEn: string, nameVi?: string | null): any | null {
  for (const q of [nameEn, nameVi].filter(Boolean) as string[]) {
    try {
      const m = genshindb.materials(q) || genshindb.weapons(q) || genshindb.artifacts(q) || genshindb.characters(q);
      if (m?.images) return m.images;
    } catch { /* ignore */ }
  }
  return null;
}

/** Map folder slug -> internal name từ Enka characters.json (fallback cho nhân vật genshin-db không tra được). */
let enkaCharMapPromise: Promise<Map<string, string> | null> | null = null;
function getEnkaCharMap(): Promise<Map<string, string> | null> {
  if (!enkaCharMapPromise) {
    enkaCharMapPromise = axios.get(ENKA_CHARS_URL, { timeout: 20000 })
      .then((res) => {
        const map = new Map<string, string>();
        const data = res.data || {};
        for (const key of Object.keys(data)) {
          const side = data[key]?.SideIconName;
          if (typeof side === 'string' && side.startsWith('UI_AvatarIcon_Side_')) {
            const internal = side.replace('UI_AvatarIcon_Side_', '');
            map.set(internal.toLowerCase().replace(/[^a-z]/g, ''), internal);
          }
        }
        return map;
      })
      .catch(() => null);
  }
  return enkaCharMapPromise;
}

function folderSlugFromPath(rel: string | null | undefined): string | null {
  if (!rel) return null;
  const m = rel.match(/\/assets\/characters\/([a-zA-Z0-9_-]+)\//);
  return m ? m[1] : null;
}

function genshinCharacterImages(nameEn: string, nameVi?: string | null): { avatar?: string[]; splash?: string[] } {
  for (const q of [nameEn, nameVi].filter(Boolean) as string[]) {
    try {
      const c = genshindb.characters(q);
      if (c?.images) {
        const imgs = c.images;
        return {
          avatar: [imgs.mihoyo_icon, enka(imgs.filename_icon)].filter(Boolean) as string[],
          splash: [enka(imgs.filename_gachaSplash || imgs.filename_sideIcon)].filter(Boolean) as string[],
        };
      }
    } catch { /* ignore */ }
  }
  return {};
}

/**
 * Quét toàn bộ DB, trả về danh sách job cần tải + thống kê.
 * Chỉ đọc DB — không ghi gì.
 */
export async function scanAssets(prisma: PrismaClient, kinds?: { characters?: boolean; weapons?: boolean; artifacts?: boolean; materials?: boolean }): Promise<AssetScanResult> {
  const want = { characters: true, weapons: true, artifacts: true, materials: true, ...kinds };
  const counters = { valid: 0, missing: 0, invalid: 0, skippedNoPath: 0 };
  const jobs: AssetJob[] = [];
  let total = 0;

  const enkaMap = await getEnkaCharMap();

  if (want.characters) {
    const rows = await prisma.character.findMany({ select: { id: true, nameEn: true, nameVi: true, avatarUrl: true, splashArtUrl: true } });
    total += rows.length;
    for (const r of rows) {
      const imgs = genshinCharacterImages(r.nameEn, r.nameVi);
      // Fallback Enka theo folder slug (vd Alhatham -> Alhaitham)
      const slug = folderSlugFromPath(r.avatarUrl) || folderSlugFromPath(r.splashArtUrl);
      const enkaInternal = slug && enkaMap
        ? enkaMap.get(slug.toLowerCase().replace(/[^a-z]/g, ''))
        : undefined;
      const enkaAvatar = enkaInternal ? enka(`UI_AvatarIcon_${enkaInternal}`) : undefined;
      const enkaSplash = enkaInternal ? enka(`UI_Gacha_AvatarImg_${enkaInternal}`) : undefined;
      const asStr = (arr: (string | undefined)[]) => arr.filter((u): u is string => Boolean(u));
      pushJob(jobs, counters, `avatar:${r.nameEn}`, r.avatarUrl,
        asStr([...(imgs.avatar || []), enkaAvatar]));
      pushJob(jobs, counters, `splash:${r.nameEn}`, r.splashArtUrl || null,
        asStr([...(imgs.splash || []), enkaSplash]));
    }
  }

  if (want.weapons) {
    const rows = await prisma.weapon.findMany({ select: { id: true, nameEn: true, nameVi: true, iconUrl: true } });
    total += rows.length;
    for (const r of rows) {
      const imgs = genshinImagesByName(r.nameEn, r.nameVi);
      const urls = [
        imgs?.mihoyo_icon,
        enka(imgs?.filename_icon),
        enka(imgs?.filename_awakenIcon),
        enkaFromLocalPath(r.iconUrl),
      ];
      pushJob(jobs, counters, `weapon:${r.nameEn}`, r.iconUrl, urls.filter(Boolean) as string[]);
    }
  }

  if (want.artifacts) {
    const rows = await prisma.artifactSet.findMany({ select: { id: true, nameEn: true, nameVi: true, iconUrl: true } });
    total += rows.length;
    for (const r of rows) {
      const imgs = genshinImagesByName(r.nameEn, r.nameVi);
      const f = imgs?.filename_flower || imgs?.filename_plume || imgs?.filename_sands || imgs?.filename_goblet || imgs?.filename_circlet;
      const mihoyoKey = f === imgs?.filename_flower ? 'mihoyo_flower'
        : f === imgs?.filename_plume ? 'mihoyo_plume'
        : f === imgs?.filename_sands ? 'mihoyo_sands'
        : f === imgs?.filename_goblet ? 'mihoyo_goblet'
        : 'mihoyo_circlet';
      const urls = [imgs?.[mihoyoKey], enka(f), enkaFromLocalPath(r.iconUrl)];
      pushJob(jobs, counters, `artifact:${r.nameEn}`, r.iconUrl, urls.filter(Boolean) as string[]);
    }
  }

  if (want.materials) {
    const rows = await prisma.material.findMany({ select: { id: true, nameEn: true, nameVi: true, iconUrl: true } });
    total += rows.length;
    for (const r of rows) {
      const imgs = genshinImagesByName(r.nameEn, r.nameVi);
      const urls = [enka(imgs?.filename_icon), enkaFromLocalPath(r.iconUrl)];
      pushJob(jobs, counters, `material:${r.nameEn}`, r.iconUrl, urls.filter(Boolean) as string[]);
    }
  }

  return {
    root: getAssetStorageRoot(),
    total,
    valid: counters.valid,
    missing: counters.missing,
    invalid: counters.invalid,
    jobs,
    skippedNoPath: counters.skippedNoPath,
  };
}

export interface AssetSyncResult {
  ok: number;
  fail: number;
  skippedValid: number;
  failures: { label: string; relPath: string; error: string }[];
}

/**
 * Tải các asset còn thiếu/hỏng. Mỗi job độc lập — 1 icon lỗi không ảnh hưởng icon khác.
 */
export async function syncAssets(prisma: PrismaClient, kinds?: Parameters<typeof scanAssets>[1], opts: { concurrency?: number; dryRun?: boolean } = {}): Promise<AssetSyncResult & { scan: AssetScanResult }> {
  const scan = await scanAssets(prisma, kinds);
  const result: AssetSyncResult = { ok: 0, fail: 0, skippedValid: scan.valid, failures: [] };

  if (opts.dryRun) {
    return { ...result, scan };
  }

  const concurrency = opts.concurrency ?? 4;
  const queue = [...scan.jobs];
  const workers = Array.from({ length: concurrency }, async () => {
    while (queue.length) {
      const job = queue.shift()!;
      const res = await downloadWithFallback(job.urls, job.absPath, { skipExisting: true });
      if (res.ok) {
        result.ok++;
      } else {
        result.fail++;
        result.failures.push({ label: job.label, relPath: job.relPath, error: res.error || 'unknown' });
      }
    }
  });
  await Promise.all(workers);
  return { ...result, scan };
}

export function isSafeRelPath(rel: string): boolean {
  return resolveAssetFilePath(rel) !== null;
}
