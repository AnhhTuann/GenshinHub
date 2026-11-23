/**
 * materialBackfill.ts
 * ------------------------------------------------------------------
 * Backfill có kiểm chứng cho Character.ascensionMats / Character.talentMats.
 *
 * CLI (mặc định dry-run, KHÔNG ghi DB):
 *   ts-node scripts/sync/materialBackfill.ts [--dry-run] [--validate] [--report <file>]
 *   ts-node scripts/sync/materialBackfill.ts --sync [--report <file>]
 *   ts-node scripts/sync/materialBackfill.ts --verify [--report <file>]
 *   ts-node scripts/sync/materialBackfill.ts --rollback <snapshot file>
 *
 * Nguyên tắc:
 *  - Chỉ đọc costs từ genshin-db@5.2.15 (game data v7.2) đã cài đặt.
 *  - KHÔNG ghi đè dữ liệu có sẵn; chỉ điền field đang null/[].
 *  - pending khi nguồn thiếu; KHÔNG bịa material.
 *  - snapshot JSON trước khi ghi; rollback được.
 *  - chỉ cho phép ghi/rollback khi DATABASE_URL trỏ tới local/loopback.
 */

import * as fs from 'fs';
import * as path from 'path';
import { randomUUID } from 'node:crypto';
import { Prisma, PrismaClient } from '@prisma/client';
import * as genshindb from 'genshin-db';
import { normalizeName } from './idMapper';

const gdb = genshindb as any;
const prisma = new PrismaClient();

const BACKEND_ROOT = path.join(__dirname, '..', '..');
const BACKUPS_DIR = process.env.SYNC_BACKUP_DIR || path.join(BACKEND_ROOT, 'backups');
const FRONTEND_PUBLIC = path.join(BACKEND_ROOT, '..', 'frontend', 'public');

const gdbPackage = require('genshin-db/package.json') as { version: string; description: string };
const GDB_VERSION = gdbPackage.version;
const GAME_DATA_VERSION = (gdbPackage.description.match(/v(\d+(?:\.\d+)?)/) || [])[1] || '0';

const MORA_ID = 202;
const CROWN_NAME = 'Crown of Insight';
const LEGACY_TRAVELER_ASC_SOURCE = 'Aether';

const ELEMENTAL_TRAVELER_IDS = new Set([
  'traveler-anemo',
  'traveler-geo',
  'traveler-electro',
  'traveler-dendro',
  'traveler-hydro',
  'traveler-pyro',
]);

/**
 * Manekin / Manekina là mannequin của Miliastra Wonderland (genshin-db v6.1).
 * Kiểm chứng: genshin-db trả costs chỉ có Mora KHÔNG có count, không có talent;
 * Fandom wiki xác nhận "requires no Character EXP Materials, Character Ascension
 * Materials, or Mora to level up or ascend" và talents tự tăng theo ascension.
 * Vì vậy field đúng của họ là [] (verified), KHÔNG phải pending và KHÔNG bịa material.
 * Nếu nguồn sau này có costs thật, điều kiện xác thực sẽ sai và họ tự chuyển sang backfill thường.
 */
const NO_MATERIALS_DB_IDS = new Set(['traveler-boy', 'traveler-girl']);
const NO_MATERIALS_SOURCE_NAMES = new Set(['Manekin', 'Manekina']);
const NO_MATERIALS_SOURCE_URL = 'https://genshin-impact.fandom.com/wiki/Wonderland_Manekin';

type StageKind = 'ascension' | 'talent';
type Cause = 'NONE' | 'SYNC_MISSING' | 'SOURCE_MISSING' | 'MAPPING_ERROR' | 'UNRELEASED' | 'NO_MATERIALS_REQUIRED';

interface CostItem {
  id: number;
  name: string;
  count?: number;
}

interface MaterialRow {
  level: string;
  mora: number;
  items: { materialId: string; count: number }[];
}

interface SourceRef {
  name: string | null;
  version: string | null;
  reason?: string;
}

interface MaterialEntry {
  dbId: string;
  nameEn: string;
  releaseStatus: string;
  cause: Cause;
  ascension: MaterialRow[] | null;
  talent: MaterialRow[] | null;
  ascensionSource: SourceRef;
  talentSource: SourceRef;
  missingReason: string;
  note: string;
}

interface Plan {
  entries: MaterialEntry[];
  errors: string[];
  warnings: string[];
}

interface SnapshotEntry {
  id: string;
  nameEn: string;
  before: { ascensionMats: any; talentMats: any };
  beforeRaw: { ascensionMats: string | null; talentMats: string | null };
  filled: StageKind[];
}

interface Snapshot {
  kind: 'character-material-backfill';
  createdAt: string;
  genshinDbVersion: string;
  gameDataVersion: string;
  entries: SnapshotEntry[];
}

interface CliArgs {
  mode: 'dry-run' | 'sync' | 'verify' | 'rollback';
  validate: boolean;
  reportPath?: string;
  rollbackFile?: string;
}

function parseArgs(argv: string[]): CliArgs {
  const args: CliArgs = { mode: 'dry-run', validate: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    switch (a) {
      case '--dry-run': args.mode = 'dry-run'; break;
      case '--sync': args.mode = 'sync'; break;
      case '--verify': args.mode = 'verify'; break;
      case '--validate': args.validate = true; break;
      case '--report': args.reportPath = argv[++i]; break;
      case '--rollback':
        args.mode = 'rollback';
        args.rollbackFile = argv[++i];
        if (!args.rollbackFile || args.rollbackFile.startsWith('--')) throw new Error('Cần đường dẫn snapshot sau --rollback');
        break;
      default:
        if (a.startsWith('--')) console.warn(`⚠️  Unknown flag: ${a}`);
    }
  }
  return args;
}

export function assertLocalWriteAllowed(): void {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('Thiếu DATABASE_URL');
  let host = '';
  try {
    host = new URL(url).hostname.toLowerCase();
  } catch {
    throw new Error('DATABASE_URL không hợp lệ');
  }
  const localHosts = new Set(['localhost', '127.0.0.1', '::1', '[::1]']);
  if (!localHosts.has(host)) {
    throw new Error(`Từ chối ghi: DATABASE_URL không trỏ tới local/loopback (host=${host}). Chỉ sync trên dev/test DB.`);
  }
}

function versionTuple(v: string): number[] {
  return v.split('.').map(part => Number.parseInt(part, 10) || 0);
}

export function isNewerVersion(candidate: string | null, baseline: string): boolean {
  if (!candidate) return false;
  const a = versionTuple(candidate);
  const b = versionTuple(baseline);
  const len = Math.max(a.length, b.length);
  for (let i = 0; i < len; i++) {
    if ((a[i] || 0) > (b[i] || 0)) return true;
    if ((a[i] || 0) < (b[i] || 0)) return false;
  }
  return false;
}

function names(folder: 'characters' | 'talents'): string[] {
  return (gdb[folder]('names', { matchCategories: true }) as string[] | undefined) || [];
}

function lookup(folder: 'characters' | 'talents', name: string | null): any | null {
  if (!name) return null;
  return gdb[folder](name, { matchName: 'equal' }) || null;
}

function isEmptyField(value: any): boolean {
  return value == null || (Array.isArray(value) && value.length === 0);
}

/** Không bao giờ ghi đè dữ liệu có sẵn; [] chỉ được ghi vào field đang SQL NULL. */
function shouldWrite(planned: MaterialRow[] | null | undefined, current: any): boolean {
  if (planned === null || planned === undefined) return false;
  if (!isEmptyField(current)) return false;
  return !(Array.isArray(current) && current.length === 0 && planned.length === 0);
}

/** Chỉ đúng khi source có 6 mốc, mỗi mốc đúng 1 item Mora và KHÔNG có count. */
export function isMoraOnlyCosts(costs: Record<string, CostItem[]> | undefined): boolean {
  if (!costs) return false;
  const keys = ['ascend1', 'ascend2', 'ascend3', 'ascend4', 'ascend5', 'ascend6'];
  return keys.every(key => {
    const items = costs[key];
    return Array.isArray(items)
      && items.length === 1
      && Number(items[0]?.id) === MORA_ID
      && items[0]?.count === undefined;
  });
}

export function costsToRows(costs: Record<string, CostItem[]> | undefined, kind: StageKind): MaterialRow[] | null {
  if (!costs) return null;
  const keys = kind === 'ascension'
    ? ['ascend1', 'ascend2', 'ascend3', 'ascend4', 'ascend5', 'ascend6']
    : ['lvl2', 'lvl3', 'lvl4', 'lvl5', 'lvl6', 'lvl7', 'lvl8', 'lvl9', 'lvl10'];
  const rows: MaterialRow[] = [];

  for (const key of keys) {
    const source = costs[key];
    if (!Array.isArray(source) || source.length === 0) return null;

    const seen = new Set<string>();
    const items: MaterialRow['items'] = [];
    let mora: number | null = null;

    for (const item of source) {
      const id = Number(item.id);
      const count = Number(item.count);
      if (!Number.isInteger(id) || id <= 0) return null;
      if (!Number.isInteger(count) || count <= 0) return null;

      if (id === MORA_ID) {
        if (mora !== null) return null;
        mora = count;
        continue;
      }

      const materialId = String(id);
      if (seen.has(materialId)) return null;
      seen.add(materialId);
      items.push({ materialId, count });
    }

    if (mora === null || items.length === 0) return null;

    const level = kind === 'ascension'
      ? `Lv.${(keys.indexOf(key) + 1) * 10 + 30}`
      : `Lv.${key.replace('lvl', '')}`;

    rows.push({ level, mora, items });
  }

  return rows.length === (kind === 'ascension' ? 6 : 9) ? rows : null;
}

interface CatalogInfo {
  byId: Map<string, { id: string; nameEn: string; iconUrl: string | null }>;
  byName: Map<string, { id: string; nameEn: string; iconUrl: string | null }>;
}

async function loadCatalog(): Promise<CatalogInfo> {
  const rows = await prisma.material.findMany({ select: { id: true, nameEn: true, iconUrl: true } });
  const byId = new Map<string, { id: string; nameEn: string; iconUrl: string | null }>();
  const byName = new Map<string, { id: string; nameEn: string; iconUrl: string | null }>();
  for (const row of rows) {
    byId.set(String(row.id), row);
    byName.set(normalizeName(row.nameEn), row);
  }
  return { byId, byName };
}

function validateRows(
  dbId: string,
  kind: StageKind,
  rows: MaterialRow[] | null,
  catalog: CatalogInfo,
  errors: string[],
  warnings: string[],
): void {
  if (!rows) return;
  rows.forEach((row, rowIndex) => {
    if (!/^Lv\.\d+$/.test(row.level)) errors.push(`${dbId}/${kind}[${rowIndex}] level không hợp lệ: ${row.level}`);
    if (!Number.isInteger(row.mora) || row.mora <= 0) errors.push(`${dbId}/${kind}[${rowIndex}] Mora không hợp lệ`);

    const seen = new Set<string>();
    row.items.forEach(item => {
      if (seen.has(item.materialId)) errors.push(`${dbId}/${kind}[${rowIndex}] trùng materialId ${item.materialId}`);
      seen.add(item.materialId);
      if (!Number.isInteger(item.count) || item.count <= 0) errors.push(`${dbId}/${kind}[${rowIndex}] count không hợp lệ cho ${item.materialId}`);

      const material = catalog.byId.get(item.materialId) || catalog.byName.get(normalizeName(item.materialId));
      if (!material) {
        errors.push(`${dbId}/${kind}[${rowIndex}] materialId ${item.materialId} không có trong Material catalog`);
        return;
      }
      if (!material.iconUrl) {
        errors.push(`${dbId}/${kind}[${rowIndex}] ${item.materialId} thiếu iconUrl`);
        return;
      }
      if (material.iconUrl.startsWith('/assets/')) {
        const localPath = path.join(FRONTEND_PUBLIC, material.iconUrl.slice(1));
        if (!fs.existsSync(localPath)) {
          errors.push(`${dbId}/${kind}[${rowIndex}] icon local thiếu: ${material.iconUrl}`);
        }
      }
    });
  });

  if (kind === 'talent') {
    const allNames = rows.flatMap(r => r.items.map(i => catalog.byId.get(i.materialId)?.nameEn || i.materialId));
    if (!allNames.some(name => name === CROWN_NAME)) {
      warnings.push(`${dbId}/talent không có Crown of Insight trong nguồn — kiểm tra lại theo từng nhân vật`);
    }
  }
}

function sourceLabel(folder: 'characters' | 'talents', name: string | null): string {
  if (!name) return 'none';
  return `genshin-db@${GDB_VERSION}:${folder}(${name}).costs`;
}

export function resolveSource(dbChar: { id: string; nameEn: string }, charNames: string[], talentNames: string[]) {
  if (dbChar.id === 'traveler') {
    return {
      asc: LEGACY_TRAVELER_ASC_SOURCE,
      tal: 'Traveler (Anemo)',
      note: 'Hồ sơ Traveler legacy dùng chung chi phí đột phá Aether và chi phí thiên phú Anemo theo quy ước của dự án.',
    };
  }
  if (ELEMENTAL_TRAVELER_IDS.has(dbChar.id)) {
    const match = dbChar.nameEn.match(/^Traveler \((Anemo|Geo|Electro|Dendro|Hydro|Pyro|Cryo)\)$/);
    if (match) {
      return {
        asc: LEGACY_TRAVELER_ASC_SOURCE,
        tal: `Traveler (${match[1]})`,
        note: 'Traveler theo nguyên tố: đột phá dùng Aether (Brilliant Diamond), thiên phú dùng bản ghi theo nguyên tố.',
      };
    }
  }

  const asc = charNames.find(name => normalizeName(name) === normalizeName(dbChar.nameEn)) || null;
  const tal = talentNames.find(name => normalizeName(name) === normalizeName(dbChar.nameEn)) || null;
  return { asc, tal, note: '' };
}

async function buildPlan(): Promise<Plan> {
  const errors: string[] = [];
  const warnings: string[] = [];
  const [dbChars, catalog] = await Promise.all([
    prisma.character.findMany({ select: { id: true, nameEn: true, ascensionMats: true, talentMats: true } }),
    loadCatalog(),
  ]);

  const charNames = names('characters');
  const talentNames = names('talents');
  const entries: MaterialEntry[] = [];

  for (const dbChar of dbChars.sort((a, b) => a.id.localeCompare(b.id))) {
    const resolved = resolveSource(dbChar, charNames, talentNames);
    const ascRecord = lookup('characters', resolved.asc);
    const talRecord = lookup('talents', resolved.tal);

    let ascension = costsToRows(ascRecord?.costs, 'ascension');
    let talent = costsToRows(talRecord?.costs, 'talent');

    const noMaterialsVerified =
      (NO_MATERIALS_DB_IDS.has(dbChar.id) || (resolved.asc !== null && NO_MATERIALS_SOURCE_NAMES.has(resolved.asc)))
      && ascension === null
      && talent === null
      && isMoraOnlyCosts(ascRecord?.costs)
      && talRecord === null;

    if (noMaterialsVerified) {
      // Trạng thái ĐÚNG đã kiểm chứng, không phải dữ liệu thiếu: lưu mảng rỗng để
      // phân biệt với null/undefined (chưa công bố) trên cả DB và frontend.
      ascension = [];
      talent = [];
    }

    if (!noMaterialsVerified) {
      validateRows(dbChar.id, 'ascension', ascension, catalog, errors, warnings);
      validateRows(dbChar.id, 'talent', talent, catalog, errors, warnings);
    }

    const ascVersion = ascRecord?.version || null;
    const talVersion = talRecord?.version || null;
    const unreleased = isNewerVersion(ascVersion, GAME_DATA_VERSION) || isNewerVersion(talVersion, GAME_DATA_VERSION);

    const hasAsc = ascension !== null;
    const hasTal = talent !== null;
    const targetEmpty = isEmptyField(dbChar.ascensionMats) || isEmptyField(dbChar.talentMats);
    let cause: Cause = 'NONE';
    let missingReason = '—';
    let releaseStatus = 'RELEASED / READY';

    if (noMaterialsVerified) {
      cause = 'NO_MATERIALS_REQUIRED';
      releaseStatus = 'NO MATERIALS REQUIRED / VERIFIED';
      missingReason = `NO_MATERIALS_REQUIRED — ${NO_MATERIALS_SOURCE_URL}: lên cấp qua Miliastra Wonderland, không cần nguyên liệu đột phá/thiên phú; lưu [] đã kiểm chứng.`;
    } else if (unreleased) {
      cause = 'UNRELEASED';
      releaseStatus = 'UNRELEASED / PENDING';
      missingReason = `UNRELEASED — bản ghi nguồn có version mới hơn game data ${GAME_DATA_VERSION}; giữ pending, không ghi dữ liệu.`;
    } else if (!hasAsc || !hasTal) {
      cause = !resolved.asc && !resolved.tal ? 'MAPPING_ERROR' : 'SOURCE_MISSING';
      releaseStatus = 'SOURCE_INCOMPLETE / PENDING';
      const reasons: string[] = [];
      if (!hasAsc) reasons.push(resolved.asc ? 'genshin-db không có chi phí đột phá dùng được (chỉ có Mora)' : 'không map được bản ghi character trong genshin-db');
      if (!hasTal) reasons.push(resolved.tal ? 'genshin-db không có bản ghi talent cho profile này' : 'không map được bản ghi talent trong genshin-db');
      missingReason = `${cause} — ${reasons.join('; ')}.`;
    } else if (targetEmpty) {
      cause = 'SYNC_MISSING';
    }

    if (resolved.note) warnings.push(`${dbChar.id}: ${resolved.note}`);

    entries.push({
      dbId: dbChar.id,
      nameEn: dbChar.nameEn,
      releaseStatus,
      cause,
      ascension,
      talent,
      ascensionSource: {
        name: resolved.asc,
        version: ascVersion,
        reason: hasAsc ? undefined : (ascVersion ? 'costs incomplete' : 'source not found'),
      },
      talentSource: {
        name: resolved.tal,
        version: talVersion,
        reason: hasTal ? undefined : (talVersion ? 'costs incomplete' : 'source not found'),
      },
      missingReason,
      note: resolved.note,
    });
  }

  return { entries, errors, warnings };
}

function writeSnapshot(entries: SnapshotEntry[]): string {
  fs.mkdirSync(BACKUPS_DIR, { recursive: true });
  const file = path.join(BACKUPS_DIR, `material_backfill_${Date.now()}_${randomUUID()}.json`);
  const snapshot: Snapshot = {
    kind: 'character-material-backfill',
    createdAt: new Date().toISOString(),
    genshinDbVersion: GDB_VERSION,
    gameDataVersion: GAME_DATA_VERSION,
    entries,
  };
  fs.writeFileSync(file, JSON.stringify(snapshot, null, 2), { flag: 'wx', mode: 0o600, flush: true });
  return file;
}

async function readRawMaterialState(client: Prisma.TransactionClient | PrismaClient, id: string) {
  const rows = await client.$queryRaw<{ ascensionMats: string | null; talentMats: string | null }[]>`
    SELECT "ascensionMats"::text AS "ascensionMats", "talentMats"::text AS "talentMats"
    FROM "Character" WHERE id = ${id}
  `;
  return rows[0] || { ascensionMats: null, talentMats: null };
}

async function applyPlan(entries: MaterialEntry[]): Promise<string | undefined> {
  assertLocalWriteAllowed();
  let snapshotFile: string | undefined;

  await prisma.$transaction(async tx => {
    const [{ locked }] = await tx.$queryRaw<{ locked: boolean }[]>`
      SELECT pg_try_advisory_xact_lock(383191126) AS locked
    `;
    if (!locked) throw new Error('Một tiến trình material backfill/rollback đang chạy');

    const snapshots: SnapshotEntry[] = [];
    for (const entry of entries) {
      if (entry.ascension === null && entry.talent === null) continue;

      const fresh = await tx.character.findUnique({
        where: { id: entry.dbId },
        select: { id: true, nameEn: true, ascensionMats: true, talentMats: true },
      });
      if (!fresh) throw new Error(`Character biến mất trong lúc backfill: ${entry.dbId}`);

      const fillAsc = shouldWrite(entry.ascension, fresh.ascensionMats);
      const fillTal = shouldWrite(entry.talent, fresh.talentMats);
      if (!fillAsc && !fillTal) continue;

      const beforeRaw = await readRawMaterialState(tx, entry.dbId);
      snapshots.push({
        id: entry.dbId,
        nameEn: fresh.nameEn,
        before: { ascensionMats: fresh.ascensionMats, talentMats: fresh.talentMats },
        beforeRaw: { ascensionMats: beforeRaw.ascensionMats, talentMats: beforeRaw.talentMats },
        filled: [fillAsc ? 'ascension' : null, fillTal ? 'talent' : null].filter(Boolean) as StageKind[],
      });

      await tx.character.update({
        where: { id: entry.dbId },
        data: {
          ...(fillAsc ? { ascensionMats: entry.ascension as unknown as Prisma.InputJsonValue } : {}),
          ...(fillTal ? { talentMats: entry.talent as unknown as Prisma.InputJsonValue } : {}),
        },
      });
    }

    if (snapshots.length) snapshotFile = writeSnapshot(snapshots);
  }, { isolationLevel: 'Serializable', timeout: 120000 });

  return snapshotFile;
}

function jsonValueForRollback(value: any, raw: string | null): Prisma.NullableJsonNullValueInput | Prisma.InputJsonValue {
  if (raw === null) return Prisma.DbNull;
  if (value === null) return Prisma.JsonNull;
  return value as Prisma.InputJsonValue;
}

async function rollbackSnapshot(file: string): Promise<void> {
  assertLocalWriteAllowed();
  const snap = JSON.parse(fs.readFileSync(file, 'utf8')) as Snapshot;
  if (snap.kind !== 'character-material-backfill' || !Array.isArray(snap.entries)) {
    throw new Error('Snapshot không phải character-material-backfill');
  }

  await prisma.$transaction(async tx => {
    const [{ locked }] = await tx.$queryRaw<{ locked: boolean }[]>`
      SELECT pg_try_advisory_xact_lock(383191126) AS locked
    `;
    if (!locked) throw new Error('Một tiến trình material backfill/rollback đang chạy');

    for (const entry of [...snap.entries].reverse()) {
      await tx.character.update({
        where: { id: entry.id },
        data: {
          ascensionMats: jsonValueForRollback(entry.before.ascensionMats, entry.beforeRaw.ascensionMats),
          talentMats: jsonValueForRollback(entry.before.talentMats, entry.beforeRaw.talentMats),
        },
      });
    }
  }, { isolationLevel: 'Serializable', timeout: 120000 });
}

function statusCell(value: MaterialRow[] | null | undefined, cause: Cause): string {
  if (cause === 'NO_MATERIALS_REQUIRED') return 'NONE (verified — no materials)';
  if (!value || value.length === 0) return 'PENDING';
  return `OK (${value.length} levels)`;
}

function matchesExpected(actual: any, expected: MaterialRow[] | null | undefined): boolean {
  if (expected === null || expected === undefined) return true;
  if (expected.length === 0) return Array.isArray(actual) && actual.length === 0;
  return !isEmptyField(actual) && (actual as MaterialRow[]).length === expected.length;
}

function verificationCell(entry: MaterialEntry, dbState: Map<string, { ascensionMats: any; talentMats: any }>): string {
  const state = dbState.get(entry.dbId);
  const ascOk = matchesExpected(state?.ascensionMats, entry.ascension);
  const talOk = matchesExpected(state?.talentMats, entry.talent);
  return ascOk && talOk ? 'Prisma OK' : 'Prisma MISMATCH';
}

async function buildReport(plan: Plan, mode: CliArgs['mode'], snapshotFile?: string): Promise<string> {
  const dbStates = await prisma.character.findMany({ select: { id: true, ascensionMats: true, talentMats: true } });
  {
    const dbState = new Map(dbStates.map(row => [row.id, row] as const));
    const causes = new Map<Cause, number>();
    for (const entry of plan.entries) causes.set(entry.cause, (causes.get(entry.cause) || 0) + 1);
    const pending = plan.entries.filter(e =>
      e.cause !== 'NONE' && e.cause !== 'SYNC_MISSING' && e.cause !== 'NO_MATERIALS_REQUIRED'
    );
    const noMaterials = plan.entries.filter(e => e.cause === 'NO_MATERIALS_REQUIRED');

    const fixFor = (entry: MaterialEntry, state?: { ascensionMats: any; talentMats: any }) => {
      if (entry.cause === 'NO_MATERIALS_REQUIRED') {
        return mode === 'sync' || mode === 'verify'
          ? 'Ghi [] đã kiểm chứng (không cần nguyên liệu)'
          : 'Dự kiến ghi [] đã kiểm chứng';
      }
      if (entry.cause !== 'NONE') return 'Không ghi — giữ pending';
      if (mode === 'sync') return 'Backfill JSON đã kiểm chứng (chỉ field trống)';
      if (mode === 'verify') {
        return !isEmptyField(state?.ascensionMats) && !isEmptyField(state?.talentMats)
          ? 'Backfill JSON đã kiểm chứng (chỉ field trống)'
          : 'Không đổi (dữ liệu đã có)';
      }
      return 'Dự kiến backfill JSON (chỉ field trống)';
    };

    const rows = plan.entries.map(entry => {
      const finalAsc = (mode === 'dry-run' ? entry.ascension : dbState.get(entry.dbId)?.ascensionMats) as MaterialRow[] | null | undefined;
      const finalTal = (mode === 'dry-run' ? entry.talent : dbState.get(entry.dbId)?.talentMats) as MaterialRow[] | null | undefined;
      const verification = mode === 'dry-run'
        ? 'Chưa ghi — chờ dry-run'
        : verificationCell(entry, dbState);
      return [
        entry.dbId,
        entry.nameEn,
        entry.releaseStatus,
        statusCell(finalAsc, entry.cause),
        statusCell(finalTal, entry.cause),
        entry.missingReason,
        `${sourceLabel('characters', entry.ascensionSource.name)}${entry.talentSource.name ? ` + ${sourceLabel('talents', entry.talentSource.name)}` : ''}${entry.cause === 'NO_MATERIALS_REQUIRED' ? ` (verified: ${NO_MATERIALS_SOURCE_URL})` : ''}`,
        fixFor(entry, dbState.get(entry.dbId)),
        verification,
      ];
    });

    const table = [
      '| Character ID | Character Name | Release/Data Status | Ascension Materials Status | Talent Materials Status | Missing Reason | Data Source | Fix Applied | Verification Result |',
      '|---|---|---|---|---|---|---|---|---|',
      ...rows.map(r => `| ${r.join(' | ')} |`),
    ].join('\n');

    const causeSummary = [...causes.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([cause, count]) => `| ${cause} | ${count} |`)
      .join('\n');

    const pendingLines = pending.map(e =>
      `- \`${e.dbId}\` — ${e.nameEn}: ${e.missingReason} Nguồn: ${sourceLabel('characters', e.ascensionSource.name)}${e.talentSource.name ? ` + ${sourceLabel('talents', e.talentSource.name)}` : ''}`
    ).join('\n') || '- Không còn nhân vật pending.';

    return `# Kiểm toán nguyên liệu đột phá & thiên phú của nhân vật

- **Thời gian**: ${new Date().toISOString()}
- **Nguồn**: genshin-db@${GDB_VERSION} (game data v${GAME_DATA_VERSION}), license MIT, dữ liệu từ GenshinData/Fandom — không scrape/đoán.
- **Chế độ**: ${mode}${snapshotFile ? `; snapshot: \`${snapshotFile}\`` : ''}
- **Phạm vi**: ${plan.entries.length} nhân vật trong development database.
- **An toàn dữ liệu**: chỉ điền field đang \`null\`/\`[]\`; không xoá bản ghi; không ghi đè tier/build/team/stats; snapshot + rollback; chỉ cho phép ghi khi \`DATABASE_URL\` là local/loopback.
- **Lỗi frontend đã sửa**: bỏ mock Prithiva Topaz/Juvenile Jade khỏi cả 2 section; talent editor giờ gọi \`updateCharacterTalentMats\` thay vì ghi nhầm vào ascension.

## Tổng hợp cause

| Cause | Count |
|---|---:|
${causeSummary}

- Pending / chưa đầy đủ: **${pending.length}**
- Sẵn sàng từ nguồn nhưng sync cũ không ghi: **${causes.get('SYNC_MISSING') || 0}**
- Verified không cần nguyên liệu (lưu \`[]\`): **${noMaterials.length}**

## Warnings

${plan.warnings.length ? plan.warnings.map(w => `- ${w}`).join('\n') : '- Không có warning.'}

## Chi tiết từng nhân vật

${table}

## Pending characters

${pendingLines}

## Verified: không cần nguyên liệu

${noMaterials.length ? noMaterials.map(e => `- \`${e.dbId}\` — ${e.nameEn}: lưu \`[]\` cho cả hai field. Nguồn: ${NO_MATERIALS_SOURCE_URL}; genshin-db v6.1 trả costs chỉ có Mora không có count và không có bản ghi talent.`).join('\n') : '- Không có nhân vật nào ở trạng thái này.'}

## Ghi chú mapping

- Traveler legacy dùng \`characters(Aether).costs\` cho đột phá (Brilliant Diamond) và \`talents(Traveler (<Element>)).costs\` cho thiên phú theo từng variant.
- \`traveler-boy\` / \`traveler-girl\` là slug legacy của Manekin / Manekina. Họ là mannequin của Miliastra Wonderland: lên cấp Wonderland Level 10 thì tự động mở ascension và tự tăng talent, **không cần nguyên liệu**. Vì vậy lưu \`[]\` (khác với \`null\` = chưa công bố), frontend hiển thị thông báo riêng, không dùng chung thông báo "chưa được công bố đầy đủ" và không bịa material.
- Mọi materialId được lưu dưới dạng ID số game và phải tồn tại trong bảng \`Material\` với icon WebP local tương ứng.
`;
  }
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));

  if (args.mode === 'rollback') {
    await rollbackSnapshot(args.rollbackFile!);
    console.log(`✅ Rollback xong từ ${args.rollbackFile}`);
    return;
  }

  const plan = await buildPlan();
  if (plan.errors.length) {
    throw new Error(`Validation thất bại (${plan.errors.length} lỗi):\n${plan.errors.slice(0, 25).join('\n')}`);
  }
  if (args.validate) console.log(`✅ Validation OK (${plan.warnings.length} warnings)`);

  let snapshotFile: string | undefined;
  if (args.mode === 'sync') {
    snapshotFile = await applyPlan(plan.entries);
    console.log(`💾 Backfill xong${snapshotFile ? `; snapshot: ${snapshotFile}` : ' (không có field trống để điền)'}`);
  } else if (args.mode === 'verify') {
    console.log('🔎 Verify: đọc lại Prisma và so khối lượng row với nguồn.');
  } else {
    console.log('ℹ️  Dry-run — không ghi DB.');
  }

  const report = await buildReport(plan, args.mode, snapshotFile);
  if (args.reportPath) {
    fs.mkdirSync(path.dirname(path.resolve(args.reportPath)), { recursive: true });
    fs.writeFileSync(path.resolve(args.reportPath), report, 'utf8');
    console.log(`📄 Report: ${path.resolve(args.reportPath)}`);
  } else {
    console.log(report.split('\n').slice(0, 18).join('\n'));
  }

  const ready = plan.entries.filter(e => e.cause === 'SYNC_MISSING').length;
  const noMaterials = plan.entries.filter(e => e.cause === 'NO_MATERIALS_REQUIRED').length;
  const pending = plan.entries.filter(e =>
    e.cause !== 'NONE' && e.cause !== 'SYNC_MISSING' && e.cause !== 'NO_MATERIALS_REQUIRED'
  ).length;
  console.log(`Tổng: ${plan.entries.length} nhân vật | source-ready: ${ready} | no-materials: ${noMaterials} | pending: ${pending} | errors: ${plan.errors.length} | warnings: ${plan.warnings.length}`);
}

if (require.main === module) {
  main()
    .catch(error => {
      console.error('❌', error instanceof Error ? error.message : error);
      process.exitCode = 1;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
