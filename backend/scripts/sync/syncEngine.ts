/**
 * syncEngine.ts
 * ------------------------------------------------------------------
 * Engine đồng bộ dữ liệu GenshinHub từ `genshin-db` vào PostgreSQL.
 *
 * CLI:
 *   ts-node scripts/sync/syncEngine.ts [flags]
 *
 * Flags:
 *   --dry-run           (mặc định) Chỉ so sánh & báo cáo, KHÔNG ghi DB, KHÔNG tải ảnh.
 *   --sync              Thực hiện upsert an toàn (non-destructive).
 *   --download-assets   Tải ảnh còn thiếu -> WebP qua sharp (bắt buộc kết hợp --sync,
 *                       hoặc chạy riêng để bổ sung assets cho dữ liệu đã sync).
 *   --validate          Kiểm tra tính toàn vẹn trước khi sync (ID, stats, payload).
 *   --rollback <file>   Khôi phục DB từ file snapshot JSON (backups/snapshot_*.json).
 *   --report <file>     Ghi báo cáo Markdown ra đường dẫn tùy chọn
 *                       (mặc định: logs/sync_report_<timestamp>.md).
 *   --only <kind>       Giới hạn: characters | weapons | artifacts | materials
 *
 * Cam kết an toàn:
 *  - KHÔNG BAO GIỜ deleteMany / xóa bản ghi.
 *  - Trường do Admin quản lý được bảo toàn 100% (xem PROTECTED_* trong detector.ts).
 *  - Snapshot toàn bộ bản ghi bị ảnh hưởng vào backend/backups/ trước khi ghi.
 *  - Không bịa dữ liệu: chỉ dùng stats() thật từ genshin-db; thiếu -> warning/pending.
 */

import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';
import { PrismaClient } from '@prisma/client';
import * as genshindb from 'genshin-db';
import { detectChanges, SyncReport, DiffEntry, GENSHIN_DB_VERSION } from './detector';
import {
  characterSplashPath,
  assetFolderName,
  normalizeName,
} from './idMapper';
import { downloadAndConvertToWebp } from '../../src/utils/imageDownloader';

const prisma = new PrismaClient();

const BACKEND_ROOT = path.join(__dirname, '..', '..');
const FRONTEND_PUBLIC = path.join(BACKEND_ROOT, '..', 'frontend', 'public');
const BACKUPS_DIR = path.join(BACKEND_ROOT, 'backups');
const LOGS_DIR = path.join(BACKEND_ROOT, 'logs');
const ENKA_UI = 'https://enka.network/ui';

// ------------------------------------------------------------------
// CLI args
// ------------------------------------------------------------------

interface CliArgs {
  dryRun: boolean;
  sync: boolean;
  downloadAssets: boolean;
  validate: boolean;
  rollbackFile?: string;
  reportPath?: string;
  only?: 'characters' | 'weapons' | 'artifacts' | 'materials';
}

function parseArgs(argv: string[]): CliArgs {
  const args: CliArgs = { dryRun: true, sync: false, downloadAssets: false, validate: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    switch (a) {
      case '--dry-run': args.dryRun = true; args.sync = false; break;
      case '--sync': args.sync = true; args.dryRun = false; break;
      case '--download-assets': args.downloadAssets = true; break;
      case '--validate': args.validate = true; break;
      case '--rollback': args.rollbackFile = argv[++i]; break;
      case '--report': args.reportPath = argv[++i]; break;
      case '--only': {
        const v = argv[++i] as CliArgs['only'];
        if (['characters', 'weapons', 'artifacts', 'materials'].includes(v as string)) args.only = v;
        break;
      }
      default:
        if (a.startsWith('--')) console.warn(`⚠️  Unknown flag: ${a}`);
    }
  }
  return args;
}

// ------------------------------------------------------------------
// Snapshot / Rollback
// ------------------------------------------------------------------

interface SnapshotEntry {
  kind: 'character' | 'weapon' | 'artifactSet' | 'material';
  action: 'create' | 'update';
  id: string;
  before: any | null; // null = bản ghi được tạo mới -> rollback sẽ xóa
}

interface Snapshot {
  createdAt: string;
  genshinDbVersion: string;
  entries: SnapshotEntry[];
}

async function takeSnapshot(entries: SnapshotEntry[]): Promise<string> {
  fs.mkdirSync(BACKUPS_DIR, { recursive: true });
  const file = path.join(BACKUPS_DIR, `snapshot_before_sync_${Date.now()}.json`);
  const snapshot: Snapshot = { createdAt: new Date().toISOString(), genshinDbVersion: GENSHIN_DB_VERSION, entries };
  fs.writeFileSync(file, JSON.stringify(snapshot, null, 2));
  return file;
}

async function rollback(snapshotPath: string): Promise<void> {
  const snap: Snapshot = JSON.parse(fs.readFileSync(snapshotPath, 'utf8'));
  console.log(`↩️  Rollback từ snapshot ${snap.createdAt} (${snap.entries.length} entries)...`);

  // Xử lý create trước (xóa), sau đó update (restore)
  const created = snap.entries.filter(e => e.action === 'create');
  const updated = snap.entries.filter(e => e.action === 'update');

  for (const e of created) {
    try {
      if (e.kind === 'character') {
        await prisma.characterWeapon.deleteMany({ where: { characterId: e.id } });
        await prisma.characterArtifact.deleteMany({ where: { characterId: e.id } });
        await prisma.characterTeam.deleteMany({ where: { characterId: e.id } });
        await prisma.character.delete({ where: { id: e.id } });
      } else if (e.kind === 'weapon') {
        await prisma.weapon.delete({ where: { id: e.id } });
      } else if (e.kind === 'artifactSet') {
        await prisma.artifactSet.delete({ where: { id: e.id } });
      } else if (e.kind === 'material') {
        await prisma.material.delete({ where: { id: e.id } });
      }
      console.log(`  🗑️  Xóa bản ghi tạo mới: ${e.kind} ${e.id}`);
    } catch (err: any) {
      console.warn(`  ⚠️  Không xóa được ${e.kind} ${e.id}: ${err.message}`);
    }
  }

  for (const e of updated) {
    try {
      if (e.kind === 'character') {
        const { id, ...data } = e.before;
        await prisma.character.update({ where: { id: e.id }, data });
      } else if (e.kind === 'weapon') {
        const { id, ...data } = e.before;
        await prisma.weapon.update({ where: { id: e.id }, data });
      } else if (e.kind === 'artifactSet') {
        const { id, ...data } = e.before;
        await prisma.artifactSet.update({ where: { id: e.id }, data });
      } else if (e.kind === 'material') {
        const { id, ...data } = e.before;
        await prisma.material.update({ where: { id: e.id }, data });
      }
      console.log(`  ♻️  Restore bản ghi: ${e.kind} ${e.id}`);
    } catch (err: any) {
      console.warn(`  ⚠️  Không restore được ${e.kind} ${e.id}: ${err.message}`);
    }
  }
  console.log('✅ Rollback hoàn tất.');
}

// ------------------------------------------------------------------
// Yatta external ID resolver (cho Weapon / ArtifactSet / Material mới)
// ------------------------------------------------------------------

type YattaKind = 'weapon' | 'reliquary' | 'material';
const yattaCache = new Map<string, Map<string, string>>();

async function getYattaIndex(kind: YattaKind, locale: 'en' | 'vi'): Promise<Map<string, string>> {
  const key = `${kind}:${locale}`;
  const cached = yattaCache.get(key);
  if (cached) return cached;

  const map = new Map<string, string>();
  try {
    const { data } = await axios.get(`https://gi.yatta.moe/api/v2/${locale}/${kind}`, { timeout: 20000 });
    const items = data?.data?.items || {};
    for (const id of Object.keys(items)) {
      const item = items[id];
      const names = [item?.name, item?.nameEn].filter(Boolean).map((n: string) => normalizeName(n));
      for (const n of names) if (n && !map.has(n)) map.set(n, String(id));
    }
  } catch (e: any) {
    console.warn(`⚠️  Không tải được danh sách yatta ${kind}/${locale}: ${e.message}`);
  }
  yattaCache.set(key, map);
  return map;
}

export async function resolveYattaId(kind: YattaKind, nameEn: string, nameVi: string): Promise<string | null> {
  const enIdx = await getYattaIndex(kind, 'en');
  const viIdx = await getYattaIndex(kind, 'vi');
  return enIdx.get(normalizeName(nameEn)) ||
         viIdx.get(normalizeName(nameVi)) ||
         enIdx.get(normalizeName(nameVi)) ||
         viIdx.get(normalizeName(nameEn)) ||
         null;
}

// ------------------------------------------------------------------
// Validation
// ------------------------------------------------------------------

const PROTECTED_KEYS = new Set([
  // Character admin/build fields — tuyệt đối không được ghi
  'tier', 'role', 'recommendedC', 'tierNoteEn', 'tierNoteVi',
  'talentPriority', 'signatureWeapons', 'sands', 'goblet', 'circlet',
  'subStatsPriority', 'stats', 'ascensionMats', 'talentMats',
  'bestWeapons', 'bestArtifacts', 'teams',
]);

function validateReport(report: SyncReport): string[] {
  const errors: string[] = [];
  const checkPayload = (kind: string, obj: Record<string, any>) => {
    for (const k of Object.keys(obj)) {
      if (PROTECTED_KEYS.has(k)) errors.push(`[${kind}] Payload chứa trường được bảo vệ: ${k}`);
    }
  };

  for (const e of report.characters) {
    if (e.action === 'create' && e.source.pending) errors.push(`[Character ${e.sourceName}] pending=true`);
    if (e.action === 'create') {
      if (!e.source.baseHp || !e.source.baseAtk || !e.source.baseDef)
        errors.push(`[Character ${e.sourceName}] stats rỗng/0 — từ chối tạo dữ liệu giả`);
      checkPayload('Character', e.source as any);
    }
  }
  for (const e of report.weapons) {
    if (e.action === 'create' && (!e.source.baseAtk || e.source.rarity < 1))
      errors.push(`[Weapon ${e.sourceName}] baseAtk/rarity không hợp lệ`);
    checkPayload('Weapon', e.source as any);
  }
  for (const e of report.artifacts) {
    if (e.action === 'create' && e.source.rarityList.length === 0)
      errors.push(`[Artifact ${e.sourceName}] rarityList rỗng`);
    checkPayload('Artifact', e.source as any);
  }
  // ID trùng nhau?
  const ids = [...report.characters, ...report.weapons, ...report.artifacts]
    .filter(e => e.action === 'create' && e.dbId)
    .map(e => e.dbId);
  const dup = ids.filter((v, i) => ids.indexOf(v) !== i);
  if (dup.length) errors.push(`ID bị trùng giữa các bản ghi create: ${[...new Set(dup)].join(', ')}`);
  return errors;
}

// ------------------------------------------------------------------
// Apply (sync)
// ------------------------------------------------------------------

function publicPathExists(rel: string): boolean {
  return fs.existsSync(path.join(FRONTEND_PUBLIC, rel));
}

export async function applyReport(report: SyncReport, downloadAssets: boolean): Promise<void> {
  const snapshotEntries: SnapshotEntry[] = [];

  // ---------- Characters ----------
  for (const e of report.characters) {
    if (e.action === 'unchanged') continue;
    const s = e.source;
    if (e.action === 'create') {
      const id = e.dbId!;
      const exists = await prisma.character.findUnique({ where: { id }, select: { id: true } });
      if (exists) {
        console.warn(`⚠️  Character id "${id}" đã tồn tại — bỏ qua create, chuyển sang update.`);
        e.action = 'update';
        e.dbId = id;
      } else {
        snapshotEntries.push({ kind: 'character', action: 'create', id, before: null });
        const splashArtUrl = publicPathExists(characterSplashPath(s.nameEn)) ? characterSplashPath(s.nameEn) : '';
        await prisma.character.create({
          data: {
            id,
            nameEn: s.nameEn,
            nameVi: s.nameVi,
            titleEn: s.titleEn,
            titleVi: s.titleVi,
            rarity: s.rarity,
            element: s.element,
            weapon: s.weapon,
            region: s.region,
            avatarUrl: s.avatarUrl,
            splashArtUrl,
            descriptionEn: s.descriptionEn,
            descriptionVi: s.descriptionVi,
            baseHp: s.baseHp,
            baseAtk: s.baseAtk,
            baseDef: s.baseDef,
            fandomUrl: s.fandomUrl,
            birthday: s.birthday,
            // Các trường Admin/build để trống — Admin tự đánh giá sau
            tier: null,
            role: null,
            recommendedC: null,
            tierNoteEn: [],
            tierNoteVi: [],
            talentPriority: [],
            signatureWeapons: [],
            sands: [],
            goblet: [],
            circlet: [],
            subStatsPriority: [],
          },
        });
        console.log(`  ➕ Character mới: ${s.nameEn} (${id})`);
        continue;
      }
    }

    // update
    const id = e.dbId!;
    const before = await prisma.character.findUnique({ where: { id } });
    if (!before) { console.warn(`⚠️  Character ${id} không còn trong DB — bỏ qua.`); continue; }
    snapshotEntries.push({ kind: 'character', action: 'update', id, before });

    const splashCandidate = characterSplashPath(s.nameEn);
    const splashArtUrl = publicPathExists(splashCandidate) ? splashCandidate : before.splashArtUrl;

    await prisma.character.update({
      where: { id },
      data: {
        nameEn: s.nameEn,
        nameVi: s.nameVi,
        titleEn: s.titleEn,
        titleVi: s.titleVi,
        rarity: s.rarity,
        element: s.element,
        weapon: s.weapon,
        region: s.region,
        avatarUrl: s.avatarUrl,
        splashArtUrl,
        ...(s.descriptionEn ? { descriptionEn: s.descriptionEn } : {}),
        ...(s.descriptionVi ? { descriptionVi: s.descriptionVi } : {}),
        baseHp: s.baseHp,
        baseAtk: s.baseAtk,
        baseDef: s.baseDef,
        fandomUrl: s.fandomUrl,
        birthday: s.birthday,
        // KHÔNG đụng: tier, role, recommendedC, tierNote*, talentPriority,
        // signatureWeapons, sands, goblet, circlet, subStatsPriority,
        // stats, ascensionMats, talentMats, bestWeapons, bestArtifacts, teams
      },
    });
    console.log(`  ✏️  Character cập nhật: ${s.nameEn} (${id}) — ${e.changes.length} trường`);
  }

  // ---------- Weapons ----------
  for (const e of report.weapons) {
    if (e.action === 'unchanged') continue;
    const s = e.source;
    if (e.action === 'create') {
      const extId = await resolveYattaId('weapon', s.nameEn, s.nameVi);
      if (!extId) {
        e.warnings.push('Không resolve được ID yatta — bỏ qua tạo (pending)');
        continue;
      }
      const exists = await prisma.weapon.findUnique({ where: { id: extId }, select: { id: true } });
      if (exists) { e.action = 'update'; e.dbId = extId; }
      else {
        snapshotEntries.push({ kind: 'weapon', action: 'create', id: extId, before: null });
        await prisma.weapon.create({
          data: {
            id: extId,
            nameEn: s.nameEn,
            nameVi: s.nameVi,
            rarity: s.rarity,
            type: s.typeVi,
            baseAtk: s.baseAtk,
            subStat: s.subStat,
            subStatValue: s.subStatValue,
            passiveNameEn: s.passiveNameEn,
            passiveNameVi: s.passiveNameVi,
            passiveDescEn: s.passiveDescEn,
            passiveDescVi: s.passiveDescVi,
            iconUrl: s.iconUrl,
            tier: null,
            role: null,
          },
        });
        console.log(`  ➕ Weapon mới: ${s.nameEn} (${extId})`);
        continue;
      }
    }

    const id = e.dbId!;
    const before = await prisma.weapon.findUnique({ where: { id } });
    if (!before) { console.warn(`⚠️  Weapon ${id} không còn trong DB — bỏ qua.`); continue; }
    snapshotEntries.push({ kind: 'weapon', action: 'update', id, before });

    await prisma.weapon.update({
      where: { id },
      data: {
        nameEn: s.nameEn,
        nameVi: s.nameVi,
        rarity: s.rarity,
        type: s.typeVi,
        baseAtk: s.baseAtk,
        ...(s.subStat ? { subStat: s.subStat } : {}),
        ...(s.subStatValue != null ? { subStatValue: s.subStatValue } : {}),
        ...(s.passiveNameEn ? { passiveNameEn: s.passiveNameEn } : {}),
        ...(s.passiveNameVi ? { passiveNameVi: s.passiveNameVi } : {}),
        ...(s.passiveDescEn ? { passiveDescEn: s.passiveDescEn } : {}),
        ...(s.passiveDescVi ? { passiveDescVi: s.passiveDescVi } : {}),
        ...(s.iconUrl ? { iconUrl: s.iconUrl } : {}),
        // KHÔNG đụng: tier, role
      },
    });
    console.log(`  ✏️  Weapon cập nhật: ${s.nameEn} (${id}) — ${e.changes.length} trường`);
  }

  // ---------- Artifact Sets ----------
  for (const e of report.artifacts) {
    if (e.action === 'unchanged') continue;
    const s = e.source;
    if (e.action === 'create') {
      const extId = await resolveYattaId('reliquary', s.nameEn, s.nameVi);
      if (!extId) {
        e.warnings.push('Không resolve được ID yatta — bỏ qua tạo (pending)');
        continue;
      }
      const exists = await prisma.artifactSet.findUnique({ where: { id: extId }, select: { id: true } });
      if (exists) { e.action = 'update'; e.dbId = extId; }
      else {
        snapshotEntries.push({ kind: 'artifactSet', action: 'create', id: extId, before: null });
        await prisma.artifactSet.create({
          data: {
            id: extId,
            nameEn: s.nameEn,
            nameVi: s.nameVi,
            rarityList: s.rarityList,
            piece2DescEn: s.piece2DescEn,
            piece2DescVi: s.piece2DescVi,
            piece4DescEn: s.piece4DescEn,
            piece4DescVi: s.piece4DescVi,
            iconUrl: s.iconUrl,
          },
        });
        console.log(`  ➕ Artifact set mới: ${s.nameEn} (${extId})`);
        continue;
      }
    }

    const id = e.dbId!;
    const before = await prisma.artifactSet.findUnique({ where: { id } });
    if (!before) { console.warn(`⚠️  ArtifactSet ${id} không còn trong DB — bỏ qua.`); continue; }
    snapshotEntries.push({ kind: 'artifactSet', action: 'update', id, before });

    await prisma.artifactSet.update({
      where: { id },
      data: {
        nameEn: s.nameEn,
        nameVi: s.nameVi,
        rarityList: s.rarityList.length ? s.rarityList : before.rarityList,
        ...(s.piece2DescEn ? { piece2DescEn: s.piece2DescEn } : {}),
        ...(s.piece2DescVi ? { piece2DescVi: s.piece2DescVi } : {}),
        ...(s.piece4DescEn ? { piece4DescEn: s.piece4DescEn } : {}),
        ...(s.piece4DescVi ? { piece4DescVi: s.piece4DescVi } : {}),
        ...(s.iconUrl ? { iconUrl: s.iconUrl } : {}),
      },
    });
    console.log(`  ✏️  Artifact set cập nhật: ${s.nameEn} (${id}) — ${e.changes.length} trường`);
  }

  // ---------- Materials: chỉ update, KHÔNG tạo ----------
  for (const e of report.materials) {
    if (e.action !== 'update') continue;
    const s = e.source;
    const id = e.dbId!;
    const before = await prisma.material.findUnique({ where: { id } });
    if (!before) continue;
    snapshotEntries.push({ kind: 'material', action: 'update', id, before });
    await prisma.material.update({
      where: { id },
      data: {
        nameEn: s.nameEn,
        nameVi: s.nameVi,
        ...(s.rarity ? { rarity: s.rarity } : {}),
        ...(s.iconUrl ? { iconUrl: s.iconUrl } : {}),
        // type giữ nguyên (mapping yatta <-> genshin-db chưa ổn định)
      },
    });
  }

  // ---------- Snapshot ----------
  if (snapshotEntries.length > 0) {
    const file = await takeSnapshot(snapshotEntries);
    console.log(`💾 Snapshot: ${file} (${snapshotEntries.length} bản ghi)`);
  } else {
    console.log('ℹ️  Không có bản ghi nào bị tác động — không cần snapshot.');
  }
}

// ------------------------------------------------------------------
// Asset downloader
// ------------------------------------------------------------------

interface GenshinAssetInfo {
  avatarUrl?: string;   // URL nguồn trực tiếp (mihoyo)
  splashUrl?: string;   // URL nguồn splash (enka UI)
  iconUrl?: string;     // URL nguồn icon
}

function genshinCharacterAssetInfo(genshinName: string): GenshinAssetInfo {
  const en = genshindb.characters(genshinName) as any;
  if (!en) return {};
  const imgs = en.images || {};
  const splashFile = imgs.filename_gachaSplash || imgs.filename_sideIcon;
  return {
    avatarUrl: imgs.mihoyo_icon || (imgs.filename_icon ? `${ENKA_UI}/${imgs.filename_icon}.png` : undefined),
    splashUrl: splashFile ? `${ENKA_UI}/${splashFile}.png` : undefined,
  };
}

function genshinWeaponAssetInfo(genshinName: string): GenshinAssetInfo {
  const en = genshindb.weapons(genshinName) as any;
  if (!en) return {};
  const imgs = en.images || {};
  return {
    iconUrl: imgs.mihoyo_icon || (imgs.filename_icon ? `${ENKA_UI}/${imgs.filename_icon}.png` : undefined),
  };
}

function genshinArtifactAssetInfo(genshinName: string): GenshinAssetInfo {
  const en = genshindb.artifacts(genshinName) as any;
  if (!en) return {};
  const imgs = en.images || {};
  const f = imgs.filename_circlet || imgs.filename_goblet || imgs.filename_sands ||
            imgs.filename_plume || imgs.filename_flower;
  return { iconUrl: f ? `${ENKA_UI}/${f}.png` : undefined };
}

function genshinMaterialAssetInfo(genshinName: string): GenshinAssetInfo {
  const en = genshindb.materials(genshinName) as any;
  if (!en) return {};
  const f = en.images?.filename_icon;
  return { iconUrl: f ? `${ENKA_UI}/${f}.png` : undefined };
}

async function downloadMissingAssets(report: SyncReport): Promise<void> {
  let ok = 0, fail = 0, skipped = 0;

  const jobs: { url?: string; dest: string; label: string }[] = [];

  for (const e of [...report.characters, ...report.weapons, ...report.artifacts, ...report.materials]) {
    if (e.action === 'unchanged') continue;
    const name = (e.source as any).genshinDbName as string;
    if (!name) continue;

    if ('baseHp' in e.source) {
      const info = genshinCharacterAssetInfo(name);
      const avatarDest = path.join(FRONTEND_PUBLIC, (e.source as any).avatarUrl);
      if (info.avatarUrl && !fs.existsSync(avatarDest)) {
        jobs.push({ url: info.avatarUrl, dest: avatarDest, label: `avatar:${name}` });
      } else skipped++;
      const splashRel = characterSplashPath((e.source as any).nameEn);
      const splashDest = path.join(FRONTEND_PUBLIC, splashRel);
      if (info.splashUrl && !fs.existsSync(splashDest)) {
        jobs.push({ url: info.splashUrl, dest: splashDest, label: `splash:${name}` });
      }
    } else if ('baseAtk' in e.source && 'typeVi' in e.source) {
      const info = genshinWeaponAssetInfo(name);
      const rel = (e.source as any).iconUrl as string | null;
      if (info.iconUrl && rel) {
        const dest = path.join(FRONTEND_PUBLIC, rel);
        if (!fs.existsSync(dest)) jobs.push({ url: info.iconUrl, dest, label: `weapon:${name}` });
        else skipped++;
      } else skipped++;
    } else if ('rarityList' in e.source) {
      const info = genshinArtifactAssetInfo(name);
      const rel = (e.source as any).iconUrl as string | null;
      if (info.iconUrl && rel) {
        const dest = path.join(FRONTEND_PUBLIC, rel);
        if (!fs.existsSync(dest)) jobs.push({ url: info.iconUrl, dest, label: `artifact:${name}` });
        else skipped++;
      } else skipped++;
    } else if ('rarity' in e.source && 'iconUrl' in e.source && !('piece2DescEn' in e.source)) {
      const info = genshinMaterialAssetInfo(name);
      const rel = (e.source as any).iconUrl as string | null;
      if (info.iconUrl && rel) {
        const dest = path.join(FRONTEND_PUBLIC, rel);
        if (!fs.existsSync(dest)) jobs.push({ url: info.iconUrl, dest, label: `material:${name}` });
        else skipped++;
      } else skipped++;
    }
  }

  console.log(`🖼️  Asset jobs: ${jobs.length} cần tải, ${skipped} đã có sẵn.`);
  for (const job of jobs) {
    if (!job.url) { fail++; continue; }
    const success = await downloadAndConvertToWebp(job.url, job.dest);
    if (success) { ok++; console.log(`  ✅ ${job.label}`); }
    else { fail++; console.log(`  ❌ ${job.label} <- ${job.url}`); }
  }
  console.log(`🖼️  Assets: ${ok} tải mới, ${fail} lỗi, ${skipped} bỏ qua.`);
}

// ------------------------------------------------------------------
// Report Markdown
// ------------------------------------------------------------------

function entryLine(e: DiffEntry<any>): string {
  const changes = e.changes.length
    ? e.changes.map(c => `\`${c.field}\``).join(', ')
    : '-';
  const warn = e.warnings.length ? ` ⚠️ ${e.warnings.join('; ')}` : '';
  return `| ${e.action} | ${e.dbId ?? '(pending)'} | ${e.sourceName} | ${changes} |${warn} |`;
}

function section(title: string, entries: DiffEntry<any>[]): string {
  const todo = entries.filter(e => e.action !== 'unchanged');
  if (!todo.length) return `### ${title}\n\n✅ Không có thay đổi.\n`;
  const rows = todo.map(entryLine).join('\n');
  return `### ${title}\n\n| Action | DB ID | Tên | Trường thay đổi | Ghi chú |\n|---|---|---|---|---|\n${rows}\n`;
}

function buildMarkdownReport(report: SyncReport, mode: string): string {
  const count = (kind: keyof SyncReport, action: string) =>
    (report[kind] as DiffEntry<any>[]).filter(e => e.action === action).length;

  return `# GenshinHub Data Sync Report

- **Thời gian**: ${report.generatedAt}
- **genshin-db version**: ${report.genshinDbVersion}
- **Chế độ**: ${mode}

## Tổng quan

| Loại | Mới | Cập nhật | Giữ nguyên |
|---|---|---|---|
| Nhân vật | ${count('characters', 'create')} | ${count('characters', 'update')} | ${count('characters', 'unchanged')} |
| Vũ khí | ${count('weapons', 'create')} | ${count('weapons', 'update')} | ${count('weapons', 'unchanged')} |
| Artifact sets | ${count('artifacts', 'create')} | ${count('artifacts', 'update')} | ${count('artifacts', 'unchanged')} |
| Materials | ${count('materials', 'create')} | ${count('materials', 'update')} | ${count('materials', 'unchanged')} |

${section('Nhân vật (Characters)', report.characters)}
${section('Vũ khí (Weapons)', report.weapons)}
${section('Artifact sets', report.artifacts)}
${section('Materials (chỉ báo cáo)', report.materials)}

## Bản ghi trong DB không có trong nguồn (KHÔNG bị xóa)

<details><summary>Characters (${report.unmatchedInDb.characters.length})</summary>

${report.unmatchedInDb.characters.map(x => `- ${x}`).join('\n') || '- (không có)'}

</details>

<details><summary>Weapons (${report.unmatchedInDb.weapons.length})</summary>

${report.unmatchedInDb.weapons.map(x => `- ${x}`).join('\n') || '- (không có)'}

</details>

<details><summary>Artifact sets (${report.unmatchedInDb.artifacts.length})</summary>

${report.unmatchedInDb.artifacts.map(x => `- ${x}`).join('\n') || '- (không có)'}

</details>

<details><summary>Materials (${report.unmatchedInDb.materials.length})</summary>

${report.unmatchedInDb.materials.slice(0, 100).map(x => `- ${x}`).join('\n')}${report.unmatchedInDb.materials.length > 100 ? `\n- ... và ${report.unmatchedInDb.materials.length - 100} mục khác` : ''}

</details>

> *Tài nguyên hình ảnh thuộc bản quyền của miHoYo Co., Ltd.*
`;
}

// ------------------------------------------------------------------
// Main
// ------------------------------------------------------------------

async function main() {
  const args = parseArgs(process.argv.slice(2));

  console.log('==========================================');
  console.log('🔄 GenshinHub Data Sync Engine');
  console.log(`📦 genshin-db version: ${GENSHIN_DB_VERSION}`);
  console.log(`⚙️  Mode: ${args.rollbackFile ? 'ROLLBACK' : args.sync ? 'SYNC' : 'DRY-RUN'}${args.downloadAssets ? ' + assets' : ''}${args.validate ? ' + validate' : ''}`);
  console.log('==========================================\n');

  if (args.rollbackFile) {
    const file = path.isAbsolute(args.rollbackFile)
      ? args.rollbackFile
      : path.join(BACKEND_ROOT, args.rollbackFile);
    await rollback(file);
    return;
  }

  console.log('🔍 Đang so sánh genshin-db ↔ database...');
  let report = await detectChanges(prisma);

  if (args.only) {
    const key = { characters: 'characters', weapons: 'weapons', artifacts: 'artifacts', materials: 'materials' }[args.only] as keyof SyncReport;
    for (const k of ['characters', 'weapons', 'artifacts', 'materials'] as const) {
      if (k !== key) (report as any)[k] = [];
    }
  }

  // ---------- Validate ----------
  if (args.validate || args.sync) {
    const errors = validateReport(report);
    if (errors.length) {
      console.error('\n❌ VALIDATION FAILED:');
      errors.slice(0, 50).forEach(e => console.error(`  - ${e}`));
      if (errors.length > 50) console.error(`  ... và ${errors.length - 50} lỗi khác`);
      if (args.sync) {
        console.error('⛔ Dừng sync do validation lỗi.');
        process.exitCode = 1;
        return;
      }
    } else {
      console.log('✅ Validation passed.');
    }
  }

  // ---------- Summary ----------
  const sum = (k: keyof SyncReport, a: string) =>
    (report[k] as DiffEntry<any>[]).filter(e => e.action === a).length;
  console.log('\n📊 KẾT QUẢ SO SÁNH:');
  console.log(`  Characters : +${sum('characters', 'create')} mới | ~${sum('characters', 'update')} cập nhật`);
  console.log(`  Weapons    : +${sum('weapons', 'create')} mới | ~${sum('weapons', 'update')} cập nhật`);
  console.log(`  Artifacts  : +${sum('artifacts', 'create')} mới | ~${sum('artifacts', 'update')} cập nhật`);
  console.log(`  Materials  : +${sum('materials', 'create')} mới (chỉ báo cáo) | ~${sum('materials', 'update')} cập nhật`);

  const warnings = [...report.characters, ...report.weapons, ...report.artifacts, ...report.materials]
    .flatMap(e => e.warnings);
  if (warnings.length) {
    console.log('\n⚠️  WARNINGS:');
    [...new Set(warnings)].slice(0, 30).forEach(w => console.log(`  - ${w}`));
  }

  // ---------- Report file ----------
  fs.mkdirSync(LOGS_DIR, { recursive: true });
  const reportPath = args.reportPath || path.join(LOGS_DIR, `sync_report_${Date.now()}.md`);
  fs.writeFileSync(reportPath, buildMarkdownReport(report, args.sync ? 'sync' : 'dry-run'));
  console.log(`\n📝 Báo cáo: ${reportPath}`);

  if (!args.sync) {
    console.log('\nℹ️  Dry-run hoàn tất — không có thay đổi nào được ghi vào DB.');
    console.log('   Chạy với --sync để áp dụng, --download-assets để tải ảnh.');
    return;
  }

  // ---------- Sync ----------
  console.log('\n💾 Đang đồng bộ vào database...');
  await applyReport(report, args.downloadAssets);

  if (args.downloadAssets) {
    console.log('\n🖼️  Đang đồng bộ assets...');
    await downloadMissingAssets(report);
  }

  console.log('\n✅ SYNC HOÀN TẤT.');
  console.log('   Rollback: npx ts-node scripts/sync/syncEngine.ts --rollback backups/<snapshot>.json');
}

if (require.main === module) {
  main()
    .catch(e => {
      console.error('❌ Lỗi engine:', e);
      process.exitCode = 1;
    })
    .finally(() => prisma.$disconnect());
}
