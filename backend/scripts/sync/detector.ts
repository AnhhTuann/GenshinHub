/**
 * detector.ts
 * ------------------------------------------------------------------
 * So sánh dữ liệu giữa `genshin-db` (nguồn game) và database hiện tại.
 *
 * Output: DiffReport mô tả chính xác những gì sẽ được TẠO MỚI hoặc
 * CẬP NHẬT, kèm danh sách các trường "protected" (do Admin quản lý)
 * được cam kết KHÔNG đụng tới.
 *
 * Nguyên tắc bảo vệ dữ liệu Admin:
 *  - Character: tier, role, recommendedC, tierNoteEn/Vi, talentPriority,
 *    signatureWeapons, sands, goblet, circlet, subStatsPriority,
 *    stats, ascensionMats, talentMats, bestWeapons, bestArtifacts, teams.
 *  - Weapon:    tier, role.
 *  - ArtifactSet / Material: không có trường admin (toàn bộ là game data).
 */

import { PrismaClient } from '@prisma/client';
import * as genshindb from 'genshin-db';
import {
  normalizeName,
  characterSlugId,
  genshinDbNameAliases,
  mapElement,
  mapWeaponType,
  mapWeaponTypeVi,
  mapSubStatVi,
  characterAvatarPath,
  characterSplashPath,
  weaponIconPath,
  artifactIconPath,
  materialIconPath,
} from './idMapper';

export const GENSHIN_DB_VERSION = require('genshin-db/package.json').version as string;

// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------

export interface FieldChange {
  field: string;
  from: unknown;
  to: unknown;
}

export interface CharacterSource {
  genshinDbName: string;
  nameEn: string;
  nameVi: string;
  titleEn: string;
  titleVi: string;
  rarity: number;
  element: string;
  weapon: string;
  region: string;
  birthday: string;
  descriptionEn: string;
  descriptionVi: string;
  baseHp: number;
  baseAtk: number;
  baseDef: number;
  fandomUrl: string;
  avatarUrl: string;
  splashArtUrl: string;
  pending: boolean; // true nếu thiếu dữ liệu bắt buộc -> đánh dấu, không bịa
}

export interface WeaponSource {
  genshinDbName: string;
  nameEn: string;
  nameVi: string;
  rarity: number;
  typeVi: string;
  typeEn: string;
  baseAtk: number;
  subStat: string | null;
  subStatValue: number | null;
  passiveNameEn: string | null;
  passiveNameVi: string | null;
  passiveDescEn: string | null;
  passiveDescVi: string | null;
  iconUrl: string | null;
}

export interface ArtifactSource {
  genshinDbName: string;
  nameEn: string;
  nameVi: string;
  rarityList: number[];
  piece2DescEn: string;
  piece2DescVi: string;
  piece4DescEn: string;
  piece4DescVi: string;
  iconUrl: string | null;
}

export interface MaterialSource {
  genshinDbName: string;
  nameEn: string;
  nameVi: string;
  rarity: number;          // 0 = nguồn không có -> engine sẽ pending, không bịa
  iconUrl: string | null;
  externalId: string | null; // game item ID từ genshin-db (cùng namespace yatta)
  typeText: string;          // phân loại tiếng Anh từ nguồn (vd: 'Refinement Material')
  category?: string;
}

export interface DiffEntry<T> {
  action: 'create' | 'update' | 'unchanged' | 'pending';
  dbId: string | null; // null khi create và chưa resolve được external ID
  sourceName: string;
  source: T;
  changes: FieldChange[];
  warnings: string[];
}

export interface SyncReport {
  genshinDbVersion: string;
  generatedAt: string;
  characters: DiffEntry<CharacterSource>[];
  weapons: DiffEntry<WeaponSource>[];
  artifacts: DiffEntry<ArtifactSource>[];
  materials: DiffEntry<MaterialSource>[];
  unmatchedInDb: {
    characters: string[]; // tồn tại trong DB nhưng genshin-db không có (vd: crossover/manual)
    weapons: string[];
    artifacts: string[];
    materials: string[];
  };
}

// ------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------

const clean = (s: unknown): string => (typeof s === 'string' ? s.trim() : '');

function allNames(folderQuery: (q: string, o?: any) => any): string[] {
  const res = folderQuery('names', { matchCategories: true });
  return Array.isArray(res) ? (res as string[]) : [];
}

/** Tên DB chuẩn tương ứng của một entry genshin-db (áp dụng alias). */
function canonicalDbName(genshinName: string): string {
  return genshinDbNameAliases[genshinName.toLowerCase()] || genshinName;
}

/** Index DB records theo normalized nameEn VÀ nameVi. */
function buildNameIndex<T extends { id: string; nameEn: string; nameVi?: string | null }>(
  rows: T[]
): Map<string, T> {
  const map = new Map<string, T>();
  for (const row of rows) {
    const en = normalizeName(row.nameEn || '');
    const vi = normalizeName(row.nameVi || '');
    if (en && !map.has(en)) map.set(en, row);
    if (vi && vi !== en && !map.has(vi)) map.set(vi, row);
  }
  return map;
}

function diffFields<T extends Record<string, any>>(
  dbRow: T,
  source: Partial<T>,
  fields: (keyof T & string)[]
): FieldChange[] {
  const changes: FieldChange[] = [];
  for (const f of fields) {
    const from = dbRow[f];
    const to = source[f];
    if (to === undefined) continue; // undefined = không sync field này
    const eq = JSON.stringify(from ?? null) === JSON.stringify(to ?? null);
    if (!eq) changes.push({ field: f, from: from ?? null, to: to ?? null });
  }
  return changes;
}

// ------------------------------------------------------------------
// Character mapping
// ------------------------------------------------------------------

const CHARACTER_GAME_FIELDS = [
  'nameEn', 'nameVi', 'titleEn', 'titleVi', 'rarity', 'element', 'weapon',
  'region', 'birthday', 'descriptionEn', 'descriptionVi',
  'baseHp', 'baseAtk', 'baseDef', 'fandomUrl', 'avatarUrl',
] as const;

function mapCharacter(genshinName: string): { source: CharacterSource; warnings: string[] } | null {
  const warnings: string[] = [];
  const en = genshindb.characters(genshinName);
  const vi = genshindb.characters(genshinName, { resultLanguage: genshindb.Language.Vietnamese as any });
  if (!en) return null;

  // stats(90, 6) = Lv.90 / Ascension 6 (max). Chỉ dùng số liệu thật.
  const stats = (en.stats ? en.stats(90, 6) : undefined) || ({} as any);
  const baseHp = Math.round(stats.hp ?? 0);
  const baseAtk = Math.round(stats.attack ?? 0);
  const baseDef = Math.round(stats.defense ?? 0);
  if (!baseHp || !baseAtk || !baseDef) warnings.push('Thiếu base stats từ genshin-db (stats(90,6))');

  const weaponTypeEn = mapWeaponType(en.weaponType);
  const rarity = en.rarity === 4 ? 4 : 5;
  // genshin-db birthdaymmdd có dạng "M/D" (vd: "7/15") -> chuẩn hóa DB "DD/MM".
  const mmdd = clean(en.birthdaymmdd);
  let birthday = clean(en.birthday) || 'Chưa rõ';
  const m = mmdd.match(/^(\d{1,2})\/(\d{1,2})$/);
  if (m) {
    birthday = `${m[2].padStart(2, '0')}/${m[1].padStart(2, '0')}`;
  } else if (mmdd) {
    birthday = mmdd;
  }

  const nameVi = clean(vi?.name) || clean(en.name);
  const titleEn = clean(en.title) || `${clean(en.name)} Title`;
  const titleVi = clean(vi?.title) || clean(en.title) || titleEn;

  if (!clean(en.description)) warnings.push('Thiếu description (EN)');
  if (!clean(vi?.description)) warnings.push('Thiếu description (VI) - fallback EN');

  return {
    warnings,
    source: {
      genshinDbName: genshinName,
      nameEn: canonicalDbName(en.name),
      nameVi,
      titleEn,
      titleVi,
      rarity,
      element: mapElement(en.elementType),
      weapon: weaponTypeEn,
      region: clean(en.region) || clean(en.affiliation) || 'Other',
      birthday,
      descriptionEn: clean(en.description),
      descriptionVi: clean(vi?.description) || clean(en.description),
      baseHp,
      baseAtk,
      baseDef,
      fandomUrl: en.url?.fandom || `https://genshin-impact.fandom.com/wiki/${encodeURIComponent(en.name.replace(/ /g, '_'))}`,
      avatarUrl: characterAvatarPath(en.name),
      splashArtUrl: '', // engine sẽ kiểm tra file tồn tại khi sync assets
      pending: !baseHp || !baseAtk || !baseDef,
    },
  };
}

// ------------------------------------------------------------------
// Weapon mapping
// ------------------------------------------------------------------

const WEAPON_GAME_FIELDS = [
  'nameEn', 'nameVi', 'rarity', 'type', 'baseAtk', 'subStat', 'subStatValue',
  'passiveNameEn', 'passiveNameVi', 'passiveDescEn', 'passiveDescVi', 'iconUrl',
] as const;

function mapWeapon(genshinName: string): WeaponSource | null {
  const en = genshindb.weapons(genshinName);
  const vi = genshindb.weapons(genshinName, { resultLanguage: genshindb.Language.Vietnamese as any });
  if (!en) return null;
  // Bỏ qua vũ khí không thể obtain (vd: Prized Isshin Blade - dupealias)
  // để tránh entry "pending" vĩnh viễn trong mọi báo cáo.
  if ((en as any).dupealias) return null;

  const stats = (en.stats ? en.stats(90, 6) : undefined) || ({} as any);
  const baseAtk = Math.round(stats.attack ?? 0);
  // subStatValue: chỉ tính cho chỉ số dạng % (không phải EM/flat).
  let subStatValue: number | null = null;
  if (en.mainStatType && en.mainStatType !== 'FIGHT_PROP_ELEMENT_MASTERY') {
    const v = stats.specialized;
    if (typeof v === 'number' && v > 0) {
      subStatValue = Math.round(v * 1000) / 10; // 0.441 -> 44.1
    }
  }

  // Passive: dùng mô tả refinement R1 (giống seed cũ dùng affix upgrade['0'])
  const passiveDescEn = en.r1?.description || en.description || null;
  const passiveDescVi = vi?.r1?.description || vi?.description || passiveDescEn;

  return {
    genshinDbName: genshinName,
    nameEn: clean(en.name),
    nameVi: clean(vi?.name) || clean(en.name),
    rarity: en.rarity || 1,
    typeVi: mapWeaponTypeVi(en.weaponType),
    typeEn: mapWeaponType(en.weaponType),
    baseAtk: baseAtk || Math.round(en.baseAtkValue ?? 0),
    subStat: mapSubStatVi(en.mainStatType),
    subStatValue,
    passiveNameEn: en.effectName || null,
    passiveNameVi: vi?.effectName || en.effectName || null,
    passiveDescEn,
    passiveDescVi,
    iconUrl: weaponIconPath(en.images?.filename_icon),
  };
}

// ------------------------------------------------------------------
// Artifact mapping
// ------------------------------------------------------------------

const ARTIFACT_GAME_FIELDS = [
  'nameEn', 'nameVi', 'rarityList', 'piece2DescEn', 'piece2DescVi',
  'piece4DescEn', 'piece4DescVi', 'iconUrl',
] as const;

function artifactIconUrl(art: any): string | null {
  const imgs = art?.images || {};
  const f = imgs.filename_flower || imgs.filename_plume || imgs.filename_sands ||
            imgs.filename_goblet || imgs.filename_circlet;
  return artifactIconPath(f);
}

function mapArtifact(genshinName: string): ArtifactSource | null {
  const en = genshindb.artifacts(genshinName);
  const vi = genshindb.artifacts(genshinName, { resultLanguage: genshindb.Language.Vietnamese as any });
  if (!en) return null;

  const pick = (a: any, key: string) => clean(a?.[key]);
  return {
    genshinDbName: genshinName,
    nameEn: clean(en.name),
    nameVi: clean(vi?.name) || clean(en.name),
    rarityList: Array.isArray(en.rarityList) ? en.rarityList.map(Number) : [],
    piece2DescEn: pick(en, 'effect2Pc'),
    piece2DescVi: pick(vi, 'effect2Pc') || pick(en, 'effect2Pc'),
    piece4DescEn: pick(en, 'effect4Pc'),
    piece4DescVi: pick(vi, 'effect4Pc') || pick(en, 'effect4Pc'),
    iconUrl: artifactIconUrl(en),
  };
}

// ------------------------------------------------------------------
// Material mapping (chỉ detect + update name/icon/rarity; KHÔNG tạo mới)
// ------------------------------------------------------------------

const MATERIAL_GAME_FIELDS = ['nameEn', 'nameVi', 'rarity', 'iconUrl'] as const;

const MATERIAL_SYNC_CATEGORIES = new Set(['AVATAR_MATERIAL', 'WEAPON_EXP_STONE', 'ELEM_CRYSTAL']);

function mapMaterial(genshinName: string): MaterialSource | null {
  const en = genshindb.materials(genshinName);
  const vi = genshindb.materials(genshinName, { resultLanguage: genshindb.Language.Vietnamese as any });
  if (!en) return null;
  // Chỉ sync vật liệu nâng cấp/đột phá — bỏ qua food, fish, quest items...
  if (en.category && !MATERIAL_SYNC_CATEGORIES.has(en.category)) return null;
  return {
    genshinDbName: genshinName,
    nameEn: clean(en.name),
    nameVi: clean(vi?.name) || clean(en.name),
    rarity: typeof en.rarity === 'number' ? en.rarity : 0,
    iconUrl: materialIconPath(en.images?.filename_icon),
    externalId: typeof en.id === 'number' ? String(en.id) : null,
    typeText: clean(en.typeText),
    category: clean(en.category) || undefined,
  };
}

// genshin-db đôi khi trả tên trùng (vd: 'Prized Isshin Blade' x3) -> dedupe.
function uniqueNames(names: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const n of names) {
    const k = normalizeName(n);
    if (k && !seen.has(k)) { seen.add(k); out.push(n); }
  }
  return out;
}

// ------------------------------------------------------------------
// Detector entrypoint
// ------------------------------------------------------------------

export async function detectChanges(prisma: PrismaClient): Promise<SyncReport> {
  const report: SyncReport = {
    genshinDbVersion: GENSHIN_DB_VERSION,
    generatedAt: new Date().toISOString(),
    characters: [],
    weapons: [],
    artifacts: [],
    materials: [],
    unmatchedInDb: { characters: [], weapons: [], artifacts: [], materials: [] },
  };

  // ---------- Load DB ----------
  const [dbChars, dbWeapons, dbArts, dbMats] = await Promise.all([
    prisma.character.findMany(),
    prisma.weapon.findMany(),
    prisma.artifactSet.findMany(),
    prisma.material.findMany(),
  ]);

  const charIndex = buildNameIndex(dbChars);
  const weaponIndex = buildNameIndex(dbWeapons);
  const artIndex = buildNameIndex(dbArts);
  const matIndex = buildNameIndex(dbMats);

  const matchedCharIds = new Set<string>();
  const matchedWeaponIds = new Set<string>();
  const matchedArtIds = new Set<string>();
  const matchedMatIds = new Set<string>();

  // ---------- Characters ----------
  // genshin-db có 2 cặp entry trùng cho nhân vật chính:
  //   Aether/Lumine  ==  Manekin/Manekina (cùng stats, ELEMENT_NONE).
  // DB đặt tên theo Manekin/Manekina -> chỉ sync cặp sau, bỏ cặp trước
  // để tránh 2 nguồn ghi đè tên của nhau mỗi lần chạy.
  const SKIP_DUPLICATE_SOURCES = new Set(['Aether', 'Lumine']);
  for (const name of uniqueNames(allNames((q, o) => genshindb.characters(q, o)))) {
    if (SKIP_DUPLICATE_SOURCES.has(name)) continue;
    const mapped = mapCharacter(name);
    if (!mapped) continue;
    const { source, warnings } = mapped;
    // Match theo tên chuẩn hóa; fallback theo slug ID (Traveler/Aether/Lumine...).
    const slugId = characterSlugId(source.nameEn);
    const dbRow = charIndex.get(normalizeName(source.nameEn)) ||
                  charIndex.get(normalizeName(source.nameVi)) ||
                  dbChars.find(c => c.id === slugId);

    if (!dbRow) {
      report.characters.push({
        action: source.pending ? 'pending' : 'create',
        dbId: slugId,
        sourceName: source.nameEn,
        source,
        changes: [],
        warnings: [...warnings, 'Nhân vật mới — chưa có trong DB'],
      });
      continue;
    }

    matchedCharIds.add(dbRow.id);
    const src: any = { ...source };
    if (!src.descriptionEn) src.descriptionEn = undefined;
    if (!src.descriptionVi) src.descriptionVi = undefined;
    const changes = diffFields(dbRow as any, src as any, [...CHARACTER_GAME_FIELDS]);
    report.characters.push({
      action: changes.length ? 'update' : 'unchanged',
      dbId: dbRow.id,
      sourceName: source.nameEn,
      source,
      changes,
      warnings,
    });
  }

  // ---------- Weapons ----------
  for (const name of uniqueNames(allNames((q, o) => genshindb.weapons(q, o)))) {
    const source = mapWeapon(name);
    if (!source) continue;
    const dbRow = weaponIndex.get(normalizeName(source.nameEn)) ||
                  weaponIndex.get(normalizeName(source.nameVi));

    if (!dbRow) {
      report.weapons.push({
        action: 'create',
        dbId: null, // cần resolve ID yatta trong engine
        sourceName: source.nameEn,
        source,
        changes: [],
        warnings: ['Vũ khí mới — cần tra cứu ID gi.yatta.moe'],
      });
      continue;
    }

    matchedWeaponIds.add(dbRow.id);
    const row = { ...dbRow, type: dbRow.type };
    const src: any = { ...source, type: source.typeVi };
    if (src.iconUrl == null) src.iconUrl = undefined;
    if (src.subStatValue == null) src.subStatValue = undefined;
    if (src.subStat == null) src.subStat = undefined;
    if (src.passiveNameEn == null) src.passiveNameEn = undefined;
    if (src.passiveNameVi == null) src.passiveNameVi = undefined;
    if (src.passiveDescEn == null) src.passiveDescEn = undefined;
    if (src.passiveDescVi == null) src.passiveDescVi = undefined;
    const changes = diffFields(row as any, src as any, [...WEAPON_GAME_FIELDS]);
    report.weapons.push({
      action: changes.length ? 'update' : 'unchanged',
      dbId: dbRow.id,
      sourceName: source.nameEn,
      source,
      changes,
      warnings: [],
    });
  }

  // ---------- Artifact Sets ----------
  for (const name of uniqueNames(allNames((q, o) => genshindb.artifacts(q, o)))) {
    const source = mapArtifact(name);
    if (!source) continue;
    const dbRow = artIndex.get(normalizeName(source.nameEn)) ||
                  artIndex.get(normalizeName(source.nameVi));

    if (!dbRow) {
      report.artifacts.push({
        action: 'create',
        dbId: null,
        sourceName: source.nameEn,
        source,
        changes: [],
        warnings: ['Artifact set mới — cần tra cứu ID gi.yatta.moe'],
      });
      continue;
    }

    matchedArtIds.add(dbRow.id);
    const src: any = { ...source };
    if (src.iconUrl == null) src.iconUrl = undefined;
    if (!src.piece2DescEn) src.piece2DescEn = undefined;
    if (!src.piece2DescVi) src.piece2DescVi = undefined;
    if (!src.piece4DescEn) src.piece4DescEn = undefined;
    if (!src.piece4DescVi) src.piece4DescVi = undefined;
    const changes = diffFields(dbRow as any, src as any, [...ARTIFACT_GAME_FIELDS]);
    report.artifacts.push({
      action: changes.length ? 'update' : 'unchanged',
      dbId: dbRow.id,
      sourceName: source.nameEn,
      source,
      changes,
      warnings: [],
    });
  }

  // ---------- Materials (update + tạo mới khi có ID/rarity đáng tin) ----------
  for (const name of uniqueNames(allNames((q, o) => genshindb.materials(q, o)))) {
    const source = mapMaterial(name);
    if (!source) continue;
    const dbRow = matIndex.get(normalizeName(source.nameEn)) ||
                  matIndex.get(normalizeName(source.nameVi));

    if (!dbRow) {
      report.materials.push({
        action: source.rarity ? 'create' : 'pending',
        dbId: null,
        sourceName: source.nameEn,
        source,
        changes: [],
        warnings: source.rarity
          ? ['Material mới — sẽ tạo với game ID từ genshin-db (type best-effort)']
          : ['Material mới nhưng nguồn thiếu rarity — giữ pending, không tạo (không bịa dữ liệu)'],
      });
      continue;
    }

    matchedMatIds.add(dbRow.id);
    const src: any = { ...source };
    if (src.iconUrl == null) src.iconUrl = undefined;
    if (!src.rarity) src.rarity = undefined;
    const changes = diffFields(dbRow as any, src as any, [...MATERIAL_GAME_FIELDS]);
    report.materials.push({
      action: changes.length ? 'update' : 'unchanged',
      dbId: dbRow.id,
      sourceName: source.nameEn,
      source,
      changes,
      warnings: [],
    });
  }

  // DB records không tìm thấy trong nguồn -> liệt kê để admin xem xét
  // (có thể là dữ liệu thủ công/crossover — KHÔNG xóa).
  report.unmatchedInDb.characters = dbChars
    .filter(c => !matchedCharIds.has(c.id))
    .map(c => `${c.id} (${c.nameEn})`);
  report.unmatchedInDb.weapons = dbWeapons
    .filter(w => !matchedWeaponIds.has(w.id))
    .map(w => `${w.id} (${w.nameEn})`);
  report.unmatchedInDb.artifacts = dbArts
    .filter(a => !matchedArtIds.has(a.id))
    .map(a => `${a.id} (${a.nameEn})`);
  report.unmatchedInDb.materials = dbMats
    .filter(m => !matchedMatIds.has(m.id))
    .map(m => `${m.id} (${m.nameEn})`);

  return report;
}

// Re-export để engine sử dụng
export { mapCharacter, mapWeapon, mapArtifact, mapMaterial };
