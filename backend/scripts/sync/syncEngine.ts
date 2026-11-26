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
import { randomUUID } from 'node:crypto';
import { Prisma, PrismaClient } from '@prisma/client';
import * as genshindb from 'genshin-db';
import { detectChanges, SyncReport, DiffEntry, GENSHIN_DB_VERSION } from './detector';
import {
  characterSplashPath,
  normalizeName,
} from './idMapper';
import { characterAssetUrls, filenameFromLocalPath, yattaImage } from './assetSync';
import { loadYattaMaterials } from './yattaMaterials';
import { downloadWithFallback as downloadAssetWithFallback } from '../../src/utils/imageDownloader';
import { resolveAssetFilePath, isDecodableImageFile, getAssetStorageRoot } from '../../src/utils/assetStorage';
import { putCatalogAsset } from '../../src/utils/objectStorage';

const prisma = new PrismaClient();

const BACKEND_ROOT = path.join(__dirname, '..', '..');
getAssetStorageRoot(); // khởi tạo/validate thư mục assets sớm
const BACKUPS_DIR = process.env.SYNC_BACKUP_DIR || path.join(BACKEND_ROOT, 'backups');
const LOGS_DIR = path.join(BACKEND_ROOT, 'logs');
const ENKA_UI = 'https://enka.network/ui';

// ------------------------------------------------------------------
// CLI args
// ------------------------------------------------------------------

interface CliArgs {
  dryRun: boolean;
  sync: boolean;
  downloadAssets: boolean;
  publishAssets: boolean;
  validate: boolean;
  rollbackFile?: string;
  reportPath?: string;
  only?: 'characters' | 'weapons' | 'artifacts' | 'materials';
}

function parseArgs(argv: string[]): CliArgs {
  const args: CliArgs = { dryRun: true, sync: false, downloadAssets: false, publishAssets: false, validate: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    switch (a) {
      case '--dry-run': args.dryRun = true; args.sync = false; break;
      case '--sync': args.sync = true; args.dryRun = false; break;
      case '--download-assets': args.downloadAssets = true; break;
      case '--publish-assets': args.publishAssets = true; break;
      case '--validate': args.validate = true; break;
      case '--rollback': {
        args.rollbackFile = argv[++i];
        if (!args.rollbackFile || args.rollbackFile.startsWith('--')) throw new Error('Cần đường dẫn snapshot sau --rollback');
        break;
      }
      case '--report': args.reportPath = argv[++i]; break;
      case '--only': {
        const v = argv[++i] as CliArgs['only'];
        if (!['characters', 'weapons', 'artifacts', 'materials'].includes(v as string)) throw new Error('Danh mục --only không hợp lệ');
        args.only = v;
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
  const file = path.join(BACKUPS_DIR, `snapshot_before_sync_${Date.now()}_${randomUUID()}.json`);
  const snapshot: Snapshot = { createdAt: new Date().toISOString(), genshinDbVersion: GENSHIN_DB_VERSION, entries };
  fs.writeFileSync(file, JSON.stringify(snapshot, null, 2), { flag: 'wx', mode: 0o600, flush: true });
  return file;
}

export async function rollback(snapshotPath: string): Promise<void> {
  const snap: Snapshot = JSON.parse(fs.readFileSync(snapshotPath, 'utf8'));
  console.log(`↩️  Rollback từ snapshot ${snap.createdAt} (${snap.entries.length} entries)...`);

  await prisma.$transaction(async tx => {
    await lockSync(tx);
    for (const entry of [...snap.entries].reverse()) {
      const { id, kind, action, before } = entry;
      if (!id || !['character', 'weapon', 'artifactSet', 'material'].includes(kind)) {
        throw new Error('Snapshot chứa bản ghi không hợp lệ');
      }
      if (action === 'create') {
        const userReference = { itemId: id, itemType: kind === 'artifactSet' ? 'ARTIFACT' : kind.toUpperCase() };
        if (kind !== 'material' && (
          await tx.userFavorite.count({ where: userReference }) ||
          await tx.userWishlist.count({ where: userReference })
        )) {
          throw new Error(`Bản ghi ${id} đang được người dùng lưu`);
        }
        // FK restrictions protect existing curated relations.
        if (kind === 'character') {
          if (await tx.userTeam.count({ where: { characters: { has: id } } })) {
            throw new Error(`Character ${id} đang được đội hình người dùng sử dụng`);
          }
          await tx.character.delete({ where: { id } });
        } else if (kind === 'weapon') {
          if (await tx.characterWeapon.count({ where: { weaponId: id } })) {
            throw new Error(`Weapon ${id} đang được build sử dụng`);
          }
          await tx.weapon.delete({ where: { id } });
        } else if (kind === 'artifactSet') await tx.artifactSet.delete({ where: { id } });
        else await tx.material.delete({ where: { id } });
        continue;
      }
      if (action !== 'update' || !before || typeof before !== 'object') {
        throw new Error('Snapshot thiếu dữ liệu trước sync');
      }
      const data = Object.fromEntries(Object.entries(before)
        .filter(([key]) => key !== 'id' && !PROTECTED_KEYS.has(key)));
      if (kind === 'character') await tx.character.update({ where: { id }, data });
      else if (kind === 'weapon') await tx.weapon.update({ where: { id }, data });
      else if (kind === 'artifactSet') await tx.artifactSet.update({ where: { id }, data });
      else await tx.material.update({ where: { id }, data });
    }
  }, { isolationLevel: 'Serializable', timeout: 120000 });
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
    if (e.action !== 'create' && e.action !== 'update') continue;
    if (e.source.pending) errors.push(`[Character ${e.sourceName}] pending=true`);
    if (!e.source.baseHp || !e.source.baseAtk || !e.source.baseDef)
      errors.push(`[Character ${e.sourceName}] stats rỗng/0 — từ chối tạo dữ liệu giả`);
    checkPayload('Character', e.source as any);
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
  for (const entry of report.materials) checkPayload('Material', entry.source);
  for (const entries of [report.characters, report.weapons, report.artifacts, report.materials]) {
    const seen = new Set<string>();
    for (const entry of entries) {
      if (!entry.dbId || entry.action === 'pending') continue;
      if (seen.has(entry.dbId)) errors.push(`ID đích trùng: ${entry.dbId}`);
      seen.add(entry.dbId);
    }
  }
  return errors;
}

// ------------------------------------------------------------------
// Material type mapping (best-effort khi yatta không có item)
// ------------------------------------------------------------------

/**
 * Map sang `type` camelCase của DB (theo convention gi.yatta.moe).
 * Chỉ dùng khi tạo material mới không resolve được yatta — typeText
 * từ genshin-db là phân loại hiển thị, không phải type DB.
 */
function mapMaterialType(s: { category?: string; typeText: string }): string {
  const tt = (s.typeText || '').toLowerCase();
  const cat = s.category || '';
  if (tt.includes('weapon') && tt.includes('ascension')) return 'weaponAscensionMaterial';
  if (tt.includes('adventure')) return 'adventureItem';
  if (cat === 'WEAPON_EXP_STONE') return 'weaponAscensionMaterial';
  if (cat === 'ELEM_CRYSTAL') return 'characterLevelUpMaterial';
  return 'material';
}

// ------------------------------------------------------------------
// Apply (sync)
// ------------------------------------------------------------------

async function publicPathExists(rel: string): Promise<boolean> {
  const abs = resolveAssetFilePath(rel);
  return !!abs && await isDecodableImageFile(abs);
}

export interface SyncDeps {
  resolveYattaId?: (kind: 'weapon' | 'reliquary' | 'material', nameEn: string, nameVi: string) => Promise<string | null>;
}

function assertSameIdentity(
  id: string,
  row: { nameEn: string; nameVi: string },
  source: { nameEn: string; nameVi: string },
): void {
  if (normalizeName(row.nameEn) !== normalizeName(source.nameEn) &&
      normalizeName(row.nameVi) !== normalizeName(source.nameVi)) {
    throw new Error(`Xung đột ID ${id}: ${row.nameEn} / ${source.nameEn}`);
  }
}

async function lockSync(tx: Prisma.TransactionClient): Promise<void> {
  const [{ locked }] = await tx.$queryRaw<{ locked: boolean }[]>`SELECT pg_try_advisory_xact_lock(383191125) AS locked`;
  if (!locked) throw new Error('Một tiến trình sync hoặc rollback đang ghi dữ liệu');
}

export async function applyReport(report: SyncReport, _downloadAssets: boolean, deps: SyncDeps = {}): Promise<string | undefined> {
  const resolveId = deps.resolveYattaId || resolveYattaId;
  const errors = validateReport(report);
  if (errors.length) throw new Error(errors.join('\n'));
  for (const [kind, entries] of [
    ['weapon', report.weapons],
    ['reliquary', report.artifacts],
    ['material', report.materials],
  ] as const) {
    for (const entry of entries) {
      if (entry.action !== 'create') continue;
      const sourceId = entry.source.externalId;
      entry.dbId = (deps.resolveYattaId ? await resolveId(kind, entry.source.nameEn, entry.source.nameVi) : null)
        || sourceId || await resolveId(kind, entry.source.nameEn, entry.source.nameVi);
      if (!entry.dbId) {
        entry.action = 'pending';
        entry.warnings.push('Không resolve được ID nguồn — giữ pending');
      }
    }
  }

  const resolvedErrors = validateReport(report);
  if (resolvedErrors.length) throw new Error(resolvedErrors.join('\n'));

  const snapshotFile = await prisma.$transaction(async tx => {
    await lockSync(tx);
    const snapshotEntries = await applyEntries(tx, report);
    return snapshotEntries.length ? takeSnapshot(snapshotEntries) : undefined;
  }, { isolationLevel: 'Serializable', timeout: 120000 });
  if (snapshotFile) console.log(`💾 Snapshot: ${snapshotFile}`);
  return snapshotFile;
}

function plannedUpdate<T extends object>(
  before: Record<string, unknown>,
  candidate: T,
  changes: DiffEntry<unknown>['changes'],
): Partial<T> {
  const patch: Partial<T> = {};
  const equal = (left: unknown, right: unknown) => JSON.stringify(left ?? null) === JSON.stringify(right ?? null);
  for (const change of changes) {
    if (!Object.hasOwn(candidate, change.field)) continue;
    const key = change.field as keyof T;
    const current = before[change.field];
    if (equal(current, candidate[key])) continue;
    if (!equal(current, change.from) || !equal(candidate[key], change.to)) {
      throw new Error(`Sync plan changed for ${String(before.id)}.${change.field}; run a new dry-run`);
    }
    patch[key] = candidate[key];
  }
  return patch;
}

async function applyEntries(tx: Prisma.TransactionClient, report: SyncReport): Promise<SnapshotEntry[]> {
  const snapshotEntries: SnapshotEntry[] = [];

  // ---------- Characters ----------
  for (const e of report.characters) {
    if (e.action !== 'create' && e.action !== 'update') continue;
    const s = e.source;
    if (e.action === 'create') {
      const id = e.dbId!;
      const exists = await tx.character.findUnique({ where: { id }, select: { nameEn: true, nameVi: true } });
      if (exists) {
        assertSameIdentity(id, exists, s);
        e.action = 'unchanged';
        continue;
      } else {
        snapshotEntries.push({ kind: 'character', action: 'create', id, before: null });
        const splashArtUrl = await publicPathExists(characterSplashPath(s.nameEn)) ? characterSplashPath(s.nameEn) : '';
        await tx.character.upsert({
          where: { id: id },
          update: {},
          create: {
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
    const before = await tx.character.findUnique({ where: { id } });
    if (!before) { console.warn(`⚠️  Character ${id} không còn trong DB — bỏ qua.`); continue; }

    const splashCandidate = characterSplashPath(s.nameEn);
    const splashArtUrl = before.splashArtUrl || (await publicPathExists(splashCandidate) ? splashCandidate : '');

    const data = plannedUpdate(before, {
      nameEn: s.nameEn,
      nameVi: s.nameVi,
      titleEn: s.titleEn,
      titleVi: s.titleVi,
      rarity: s.rarity,
      element: s.element,
      weapon: s.weapon,
      region: s.region,
      avatarUrl: before.avatarUrl || s.avatarUrl,
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
    }, e.changes);
    if (!Object.keys(data).length) continue;
    snapshotEntries.push({ kind: 'character', action: 'update', id, before });
    await tx.character.update({ where: { id }, data });
    console.log(`  ✏️  Character cập nhật: ${s.nameEn} (${id}) — ${e.changes.length} trường`);
  }

  // ---------- Weapons ----------
  for (const e of report.weapons) {
    if (e.action !== 'create' && e.action !== 'update') continue;
    const s = e.source;
    if (e.action === 'create') {
      const extId = e.dbId;
      if (!extId) {
        e.warnings.push('Không resolve được ID yatta — bỏ qua tạo (pending)');
        continue;
      }
      const exists = await tx.weapon.findUnique({ where: { id: extId }, select: { nameEn: true, nameVi: true } });
      if (exists) {
        assertSameIdentity(extId, exists, s);
        e.action = 'unchanged';
        continue;
      }
      else {
        snapshotEntries.push({ kind: 'weapon', action: 'create', id: extId, before: null });
        await tx.weapon.upsert({
          where: { id: extId },
          update: {},
          create: {
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
    const before = await tx.weapon.findUnique({ where: { id } });
    if (!before) { console.warn(`⚠️  Weapon ${id} không còn trong DB — bỏ qua.`); continue; }

    const data = plannedUpdate(before, {
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
      ...(!before.iconUrl && s.iconUrl ? { iconUrl: s.iconUrl } : {}),
      // KHÔNG đụng: tier, role
    }, e.changes);
    if (!Object.keys(data).length) continue;
    snapshotEntries.push({ kind: 'weapon', action: 'update', id, before });
    await tx.weapon.update({ where: { id }, data });
    console.log(`  ✏️  Weapon cập nhật: ${s.nameEn} (${id}) — ${e.changes.length} trường`);
  }

  // ---------- Artifact Sets ----------
  for (const e of report.artifacts) {
    if (e.action !== 'create' && e.action !== 'update') continue;
    const s = e.source;
    if (e.action === 'create') {
      const extId = e.dbId;
      if (!extId) {
        e.warnings.push('Không resolve được ID yatta — bỏ qua tạo (pending)');
        continue;
      }
      const exists = await tx.artifactSet.findUnique({ where: { id: extId }, select: { nameEn: true, nameVi: true } });
      if (exists) {
        assertSameIdentity(extId, exists, s);
        e.action = 'unchanged';
        continue;
      }
      else {
        snapshotEntries.push({ kind: 'artifactSet', action: 'create', id: extId, before: null });
        await tx.artifactSet.upsert({
          where: { id: extId },
          update: {},
          create: {
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
    const before = await tx.artifactSet.findUnique({ where: { id } });
    if (!before) { console.warn(`⚠️  ArtifactSet ${id} không còn trong DB — bỏ qua.`); continue; }

    const data = plannedUpdate(before, {
      nameEn: s.nameEn,
      nameVi: s.nameVi,
      rarityList: s.rarityList.length ? s.rarityList : before.rarityList,
      ...(s.piece2DescEn ? { piece2DescEn: s.piece2DescEn } : {}),
      ...(s.piece2DescVi ? { piece2DescVi: s.piece2DescVi } : {}),
      ...(s.piece4DescEn ? { piece4DescEn: s.piece4DescEn } : {}),
      ...(s.piece4DescVi ? { piece4DescVi: s.piece4DescVi } : {}),
      ...(!before.iconUrl && s.iconUrl ? { iconUrl: s.iconUrl } : {}),
    }, e.changes);
    if (!Object.keys(data).length) continue;
    snapshotEntries.push({ kind: 'artifactSet', action: 'update', id, before });
    await tx.artifactSet.update({ where: { id }, data });
    console.log(`  ✏️  Artifact set cập nhật: ${s.nameEn} (${id}) — ${e.changes.length} trường`);
  }

  // ---------- Materials ----------
  for (const e of report.materials) {
    if (e.action !== 'create' && e.action !== 'update') continue;
    const s = e.source;

    if (e.action === 'create') {
      if (!s.rarity) {
        e.warnings.push('Material thiếu rarity từ nguồn — bỏ qua tạo (pending)');
        continue;
      }
      const extId = e.dbId;
      if (!extId) {
        e.warnings.push('Không có ID nguồn (yatta + genshin-db) — bỏ qua tạo');
        continue;
      }
      const exists = await tx.material.findUnique({ where: { id: extId }, select: { nameEn: true, nameVi: true } });
      if (exists) {
        assertSameIdentity(extId, exists, s);
        e.action = 'unchanged';
        continue;
      }
      else {
        snapshotEntries.push({ kind: 'material', action: 'create', id: extId, before: null });
        await tx.material.upsert({
          where: { id: extId },
          update: {},
          create: {
            id: extId,
            nameEn: s.nameEn,
            nameVi: s.nameVi,
            type: s.sourceType ?? mapMaterialType(s),
            rarity: s.rarity,
            iconUrl: s.iconUrl,
          },
        });
        console.log(`  ➕ Material mới: ${s.nameEn} (${extId})`);
        continue;
      }
    }

    const id = e.dbId!;
    const before = await tx.material.findUnique({ where: { id } });
    if (!before) continue;
    const data = plannedUpdate(before, {
      nameEn: s.nameEn,
      nameVi: s.nameVi,
      ...(s.rarity ? { rarity: s.rarity } : {}),
      ...(!before.iconUrl && s.iconUrl ? { iconUrl: s.iconUrl } : {}),
      // type giữ nguyên (mapping nguồn chưa đủ tin cậy để ghi đè)
    }, e.changes);
    if (!Object.keys(data).length) continue;
    snapshotEntries.push({ kind: 'material', action: 'update', id, before });
    await tx.material.update({ where: { id }, data });
  }

  return snapshotEntries;
}

// ------------------------------------------------------------------
// Asset downloader
// ------------------------------------------------------------------

interface GenshinAssetInfo {
  iconUrls?: string[];    // URL nguồn icon
}

const enka = (filename?: string) => (filename ? `${ENKA_UI}/${filename}.png` : undefined);

function genshinWeaponAssetInfo(genshinName: string): GenshinAssetInfo {
  const en = genshindb.weapons(genshinName) as any;
  if (!en) return {};
  const imgs = en.images || {};
  return {
    iconUrls: [imgs.mihoyo_icon, enka(imgs.filename_icon), enka(imgs.filename_awakenIcon), yattaImage(imgs.filename_icon)].filter((u): u is string => Boolean(u)),
  };
}

function genshinArtifactAssetInfo(genshinName: string): GenshinAssetInfo {
  const en = genshindb.artifacts(genshinName) as any;
  if (!en) return {};
  const imgs = en.images || {};
  const f = imgs.filename_flower || imgs.filename_plume || imgs.filename_sands ||
            imgs.filename_goblet || imgs.filename_circlet;
  const mihoyoKey = f === imgs.filename_flower ? 'mihoyo_flower'
    : f === imgs.filename_plume ? 'mihoyo_plume'
    : f === imgs.filename_sands ? 'mihoyo_sands'
    : f === imgs.filename_goblet ? 'mihoyo_goblet'
    : 'mihoyo_circlet';
  return { iconUrls: [imgs[mihoyoKey], enka(f), yattaImage(f)].filter((u): u is string => Boolean(u)) };
}

function genshinMaterialAssetInfo(genshinName: string): GenshinAssetInfo {
  const en = genshindb.materials(genshinName) as any;
  if (!en) return {};
  return { iconUrls: [enka(en.images?.filename_icon), yattaImage(en.images?.filename_icon)].filter((u): u is string => Boolean(u)) };
}

export interface AssetSyncResult {
  ok: number;
  fail: number;
  skipped: number;
  unprocessed: { label: string; urls: string[] }[];
}

/**
 * Tải ảnh với fallback: thử lần lượt các URL nguồn; chỉ ghi file khi
 * download + convert WebP thành công và file kết quả hợp lệ.
 * KHÔNG ghi đè file đã tồn tại & hợp lệ (no-overwrite trong downloader).
 */
async function downloadWithFallback(urls: string[], dest: string, label: string): Promise<boolean> {
  const res = await downloadAssetWithFallback(urls, dest, { skipExisting: true });
  if (res.ok) return true;
  console.log(`     ↳ ${label}: ${res.error} (đã thử ${res.tried.length} nguồn)`);
  return false;
}

async function downloadMissingAssets(report: SyncReport, publishAssets: boolean): Promise<AssetSyncResult> {
  const result: AssetSyncResult = { ok: 0, fail: 0, skipped: 0, unprocessed: [] };
  const jobs: { urls: string[]; dest: string; rel: string; label: string }[] = [];

  const pushJob = async (urls: string[] | undefined, rel: string | null | undefined, label: string) => {
    if (!urls || urls.length === 0 || !rel) { result.skipped++; return; }
    const dest = resolveAssetFilePath(rel);
    if (!dest) { result.skipped++; return; }
    if (await isDecodableImageFile(dest)) { result.skipped++; return; }
    jobs.push({ urls, dest, rel, label });
  };

  for (const e of [...report.characters, ...report.weapons, ...report.artifacts, ...report.materials]) {
    if (e.action !== 'create' && e.action !== 'update') continue;
    const src = e.source as any;
    const name = src.genshinDbName as string;
    if (!name && src.sourceType) {
      const icon = yattaImage(filenameFromLocalPath(src.iconUrl));
      await pushJob(icon ? [icon] : undefined, src.iconUrl, `material:${e.sourceName}`);
      continue;
    }
    if (!name) continue;

    if ('baseHp' in src) {
      const info = await characterAssetUrls(name);
      await pushJob(info.avatar, src.avatarUrl, `avatar:${name}`);
      await pushJob(info.splash, characterSplashPath(src.nameEn), `splash:${name}`);
    } else if ('baseAtk' in src && 'typeVi' in src) {
      const info = genshinWeaponAssetInfo(name);
      await pushJob(info.iconUrls, src.iconUrl, `weapon:${name}`);
    } else if ('rarityList' in src) {
      const info = genshinArtifactAssetInfo(name);
      await pushJob(info.iconUrls, src.iconUrl, `artifact:${name}`);
    } else if ('typeText' in src) {
      const info = genshinMaterialAssetInfo(name);
      await pushJob(info.iconUrls, src.iconUrl, `material:${name}`);
    }
  }

  console.log(`🖼️  Asset jobs: ${jobs.length} cần tải, ${result.skipped} đã có sẵn.`);
  for (const job of jobs) {
    const success = await downloadWithFallback(job.urls, job.dest, job.label);
    if (success) {
      result.ok++;
      console.log(`  ✅ ${job.label}`);
      if (publishAssets) {
        try {
          const published = await putCatalogAsset({ filePath: job.dest, publicPath: job.rel });
          console.log(`  ☁️  ${published.uploaded ? 'published' : 'already published'}: ${published.key}`);
        } catch (error) {
          // Abort before the database write: the frontend must be able to serve
          // every new catalog asset before its URL is committed to PostgreSQL.
          throw new Error(`Failed to publish ${job.label} to durable storage: ${error instanceof Error ? error.message : String(error)}`);
        }
      }
    } else {
      result.fail++;
      result.unprocessed.push({ label: job.label, urls: job.urls });
      console.log(`  ❌ ${job.label} <- tất cả nguồn thất bại (${job.urls.length} URL)`);
    }
  }
  console.log(`🖼️  Assets: ${result.ok} tải mới, ${result.fail} lỗi, ${result.skipped} bỏ qua.`);
  return result;
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

function buildMarkdownReport(report: SyncReport, mode: string, assetResult?: AssetSyncResult | null): string {
  const count = (kind: keyof SyncReport, action: string) =>
    (report[kind] as DiffEntry<any>[]).filter(e => e.action === action).length;

  return `# GenshinHub Data Sync Report

- **Thời gian**: ${report.generatedAt}
- **genshin-db version**: ${report.genshinDbVersion}
- **Chế độ**: ${mode}

## Tổng quan

| Loại | Mới | Cập nhật | Giữ nguyên | Pending |
|---|---|---|---|---|
| Nhân vật | ${count('characters', 'create')} | ${count('characters', 'update')} | ${count('characters', 'unchanged')} | ${count('characters', 'pending')} |
| Vũ khí | ${count('weapons', 'create')} | ${count('weapons', 'update')} | ${count('weapons', 'unchanged')} | ${count('weapons', 'pending')} |
| Artifact sets | ${count('artifacts', 'create')} | ${count('artifacts', 'update')} | ${count('artifacts', 'unchanged')} | ${count('artifacts', 'pending')} |
| Materials | ${count('materials', 'create')} | ${count('materials', 'update')} | ${count('materials', 'unchanged')} | ${count('materials', 'pending')} |

${section('Nhân vật (Characters)', report.characters)}
${section('Vũ khí (Weapons)', report.weapons)}
${section('Artifact sets', report.artifacts)}
${section('Materials', report.materials)}

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

${assetResult ? `## Assets

- Tải mới: ${assetResult.ok} | Lỗi: ${assetResult.fail} | Bỏ qua (đã có): ${assetResult.skipped}
${assetResult.unprocessed.length ? `\n### Icon chưa xử lý được (${assetResult.unprocessed.length})\n\n${assetResult.unprocessed.map(u => `- ${u.label} — nguồn: ${u.urls.join(', ')}`).join('\n')}` : ''}

` : ''}> *Tài nguyên hình ảnh thuộc bản quyền của miHoYo Co., Ltd.*
`;
}

// ------------------------------------------------------------------
// Main
// ------------------------------------------------------------------

async function main() {
  if (!process.env.DATABASE_URL) throw new Error('Cần truyền DATABASE_URL rõ ràng qua môi trường');
  const args = parseArgs(process.argv.slice(2));
  if (args.publishAssets && !args.downloadAssets) {
    throw new Error('--publish-assets requires --download-assets');
  }

  console.log('==========================================');
  console.log('🔄 GenshinHub Data Sync Engine');
  console.log(`📦 genshin-db version: ${GENSHIN_DB_VERSION}`);
  console.log(`⚙️  Mode: ${args.rollbackFile ? 'ROLLBACK' : args.sync ? 'SYNC' : 'DRY-RUN'}${args.downloadAssets ? ' + assets' : ''}${args.publishAssets ? ' + publish' : ''}${args.validate ? ' + validate' : ''}`);
  console.log('==========================================\n');

  if (args.rollbackFile) {
    const file = path.isAbsolute(args.rollbackFile)
      ? args.rollbackFile
      : path.join(BACKEND_ROOT, args.rollbackFile);
    await rollback(file);
    return;
  }

  console.log('🔍 Đang so sánh genshin-db ↔ database...');
  const supplementalMaterials = args.only && args.only !== 'materials' ? [] : await loadYattaMaterials();
  console.log(`📦 Yatta Material/Item catalog: ${supplementalMaterials.length} bản ghi hợp lệ`);
  const report = await detectChanges(prisma, supplementalMaterials);

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
      process.exitCode = 1;
      return;
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
  console.log(`  Materials  : +${sum('materials', 'create')} mới | ~${sum('materials', 'update')} cập nhật`);

  const warnings = [...report.characters, ...report.weapons, ...report.artifacts, ...report.materials]
    .flatMap(e => e.warnings);
  if (warnings.length) {
    console.log('\n⚠️  WARNINGS:');
    [...new Set(warnings)].slice(0, 30).forEach(w => console.log(`  - ${w}`));
  }

  // ---------- Report file ----------
  fs.mkdirSync(LOGS_DIR, { recursive: true });
  const reportPath = args.reportPath || path.join(LOGS_DIR, `sync_report_${Date.now()}.md`);
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, buildMarkdownReport(report, args.sync ? 'sync' : 'dry-run'));
  console.log(`\n📝 Báo cáo: ${reportPath}`);

  if (!args.sync) {
    console.log('\nℹ️  Dry-run hoàn tất — không có thay đổi nào được ghi vào DB.');
    console.log('   Chạy với --sync để áp dụng, --download-assets để tải ảnh.');
    return;
  }

  let assetResult: AssetSyncResult | null = null;
  if (args.downloadAssets) {
    console.log('\n🖼️  Đang đồng bộ assets...');
    assetResult = await downloadMissingAssets(report, args.publishAssets);
  }

  console.log('\n💾 Đang đồng bộ vào database...');
  await applyReport(report, args.downloadAssets);
  fs.writeFileSync(reportPath, buildMarkdownReport(report, 'sync', assetResult));
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
