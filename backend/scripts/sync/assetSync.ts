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
import { characterSplashPath } from './idMapper';
import { resolveAssetFilePath, isDecodableImageFile, getAssetStorageRoot } from '../../src/utils/assetStorage';
import { downloadWithFallback } from '../../src/utils/imageDownloader';

const ENKA_UI = 'https://enka.network/ui';
const ENKA_CHARS_URL = 'https://raw.githubusercontent.com/EnkaNetwork/API-docs/master/store/characters.json';
const enka = (filename?: string | null) => (filename ? `${ENKA_UI}/${filename}.png` : undefined);
export const yattaImage = (filename?: string | null) =>
  filename && /^UI_[a-zA-Z0-9_-]+$/.test(filename)
    ? `https://gi.yatta.moe/assets/UI/${filename}.png`
    : undefined;


/** Tạo URL Enka trực tiếp từ basename file local (UI_ItemIcon_xxx.webp -> UI_ItemIcon_xxx.png). */
export function filenameFromLocalPath(rel: string | null | undefined): string | undefined {
  if (!rel) return undefined;
  const base = path.basename(rel).replace(/\.webp$/i, '');
  if (!base || base === 'avatar' || base === 'splash' || base === 'icon') return undefined;
  return /^UI_[a-zA-Z0-9_-]+$/.test(base) ? base : undefined;
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
  unresolved: { label: string; relPath: string | null }[];
}

async function pushJob(
  jobs: AssetJob[],
  unresolved: AssetScanResult['unresolved'],
  counters: { valid: number; missing: number; invalid: number; skippedNoPath: number },
  label: string,
  relPath: string | null | undefined,
  urls: string[],
): Promise<void> {
  if (!relPath) { counters.skippedNoPath++; unresolved.push({ label, relPath: null }); return; }
  const abs = resolveAssetFilePath(relPath);
  if (!abs) { counters.invalid++; unresolved.push({ label, relPath }); return; } // path traversal -> invalid
  if (fs.existsSync(abs)) {
    if (await isDecodableImageFile(abs)) { counters.valid++; return; }
    counters.invalid++;
  } else {
    counters.missing++;
  }
  const cleanUrls = urls.filter(Boolean);
  if (cleanUrls.length) jobs.push({ label, relPath, absPath: abs, urls: [...new Set(cleanUrls)] });
  else unresolved.push({ label, relPath });
}

function genshinImagesByName(
  folder: 'materials' | 'weapons' | 'artifacts',
  nameEn: string,
  nameVi?: string | null,
): any | null {
  const en = genshindb[folder](nameEn);
  if (en?.name === nameEn) return en.images;
  if (!nameVi) return null;
  const vi = genshindb[folder](nameVi, {
    queryLanguages: [genshindb.Language.Vietnamese],
    resultLanguage: genshindb.Language.Vietnamese,
  });
  return vi?.name === nameVi ? vi.images : null;
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

let yattaAvatars: Promise<Map<string, string>> | undefined;

function getYattaAvatars(): Promise<Map<string, string>> {
  yattaAvatars ??= axios.get('https://gi.yatta.moe/api/v2/en/avatar', { timeout: 10000 })
    .then(({ data }) => {
      const entries = Object.values(data?.data?.items || {}) as { name: string; icon: string }[];
      return new Map(entries.map(({ name, icon }) => [name, icon]));
    })
    .catch(() => new Map());
  return yattaAvatars;
}

export async function characterAssetUrls(nameEn: string) {
  const character = genshindb.characters(nameEn);
  if (character?.name !== nameEn) return { avatar: [], splash: [] };
  const images = character.images;
  const yattaIcon = images?.filename_icon || (await getYattaAvatars()).get(nameEn);
  const splash = images?.filename_gachaSplash ||
    yattaIcon?.replace(/^UI_AvatarIcon_(?!Side_)/, 'UI_Gacha_AvatarImg_');
  const asStrings = (urls: (string | undefined)[]) =>
    urls.filter((url): url is string => Boolean(url));
  return {
    avatar: asStrings([images?.mihoyo_icon, enka(yattaIcon), yattaImage(yattaIcon)]),
    splash: asStrings([enka(splash), yattaImage(splash)]),
  };
}

/**
 * Quét toàn bộ DB, trả về danh sách job cần tải + thống kê.
 * Chỉ đọc DB — không ghi gì.
 */
export async function scanAssets(prisma: PrismaClient, kinds?: { characters?: boolean; weapons?: boolean; artifacts?: boolean; materials?: boolean }): Promise<AssetScanResult> {
  const want = { characters: true, weapons: true, artifacts: true, materials: true, ...kinds };
  const counters = { valid: 0, missing: 0, invalid: 0, skippedNoPath: 0 };
  const jobs: AssetJob[] = [];
  const unresolved: AssetScanResult['unresolved'] = [];
  let total = 0;

  const enkaMap = want.characters ? await getEnkaCharMap() : null;

  if (want.characters) {
    const rows = await prisma.character.findMany({ select: { id: true, nameEn: true, nameVi: true, avatarUrl: true, splashArtUrl: true } });
    total += rows.length;
    for (const r of rows) {
      const imgs = await characterAssetUrls(r.nameEn);
      // Fallback Enka theo folder slug (vd Alhatham -> Alhaitham)
      const slug = folderSlugFromPath(r.avatarUrl) || folderSlugFromPath(r.splashArtUrl);
      const enkaInternal = slug && enkaMap
        ? enkaMap.get(slug.toLowerCase().replace(/[^a-z]/g, ''))
        : undefined;
      const enkaAvatar = enkaInternal ? enka(`UI_AvatarIcon_${enkaInternal}`) : undefined;
      const enkaSplash = enkaInternal ? enka(`UI_Gacha_AvatarImg_${enkaInternal}`) : undefined;
      const asStr = (arr: (string | undefined)[]) => arr.filter((u): u is string => Boolean(u));
      await pushJob(jobs, unresolved, counters, `avatar:${r.nameEn}`, r.avatarUrl,
        asStr([...(imgs.avatar || []), enkaAvatar]));
      await pushJob(jobs, unresolved, counters, `splash:${r.nameEn}`, r.splashArtUrl || (imgs.splash.length ? characterSplashPath(r.nameEn) : null),
        asStr([...(imgs.splash || []), enkaSplash]));
    }
  }

  if (want.weapons) {
    const rows = await prisma.weapon.findMany({ select: { id: true, nameEn: true, nameVi: true, iconUrl: true } });
    total += rows.length;
    for (const r of rows) {
      const imgs = genshinImagesByName('weapons', r.nameEn, r.nameVi);
      const urls = [
        imgs?.mihoyo_icon,
        enka(imgs?.filename_icon),
        enka(imgs?.filename_awakenIcon),
        yattaImage(imgs?.filename_icon),
        enka(filenameFromLocalPath(r.iconUrl)), yattaImage(filenameFromLocalPath(r.iconUrl)),
      ];
      await pushJob(jobs, unresolved, counters, `weapon:${r.nameEn}`, r.iconUrl, urls.filter(Boolean) as string[]);
    }
  }

  if (want.artifacts) {
    const rows = await prisma.artifactSet.findMany({ select: { id: true, nameEn: true, nameVi: true, iconUrl: true } });
    total += rows.length;
    for (const r of rows) {
      const imgs = genshinImagesByName('artifacts', r.nameEn, r.nameVi);
      const f = imgs?.filename_flower || imgs?.filename_plume || imgs?.filename_sands || imgs?.filename_goblet || imgs?.filename_circlet;
      const mihoyoKey = f === imgs?.filename_flower ? 'mihoyo_flower'
        : f === imgs?.filename_plume ? 'mihoyo_plume'
        : f === imgs?.filename_sands ? 'mihoyo_sands'
        : f === imgs?.filename_goblet ? 'mihoyo_goblet'
        : 'mihoyo_circlet';
      const urls = [imgs?.[mihoyoKey], enka(f), yattaImage(f), enka(filenameFromLocalPath(r.iconUrl)), yattaImage(filenameFromLocalPath(r.iconUrl))];
      await pushJob(jobs, unresolved, counters, `artifact:${r.nameEn}`, r.iconUrl, urls.filter(Boolean) as string[]);
    }
  }

  if (want.materials) {
    const rows = await prisma.material.findMany({ select: { id: true, nameEn: true, nameVi: true, iconUrl: true } });
    total += rows.length;
    for (const r of rows) {
      const imgs = genshinImagesByName('materials', r.nameEn, r.nameVi);
      const urls = [imgs?.mihoyo_icon, enka(imgs?.filename_icon), yattaImage(imgs?.filename_icon), enka(filenameFromLocalPath(r.iconUrl)), yattaImage(filenameFromLocalPath(r.iconUrl))];
      await pushJob(jobs, unresolved, counters, `material:${r.nameEn}`, r.iconUrl, urls.filter(Boolean) as string[]);
    }
  }

  return {
    root: getAssetStorageRoot(),
    total,
    valid: counters.valid,
    missing: counters.missing,
    invalid: counters.invalid,
    jobs,
    unresolved,
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
  const queue = [...new Map(scan.jobs.map(job => [job.absPath, job])).values()];
  const workers = Array.from({ length: concurrency }, async () => {
    while (queue.length) {
      const job = queue.shift()!;
      const res = await downloadWithFallback(job.urls, job.absPath, { skipExisting: true });
      if (res.skipped) {
        result.skippedValid++;
      } else if (res.ok) {
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
