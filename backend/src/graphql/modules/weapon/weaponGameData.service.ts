/**
 * WeaponGameDataService
 * ------------------------------------------------------------------
 * Game facts for a weapon, read from the pinned local genshin-db package
 * (never from an external HTTP API at request time). No Prisma or schema
 * changes are required: the existing Weapon.id already matches genshin-db id.
 *
 * Editorial recommendations stay separate: they come from approved
 * CharacterWeapon rows in the database (see getRecommendedUsers).
 */

import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

// `genshin-db` allocates ~576 MiB at import time, which exceeds the 512 MiB
// Render Free limit. The pinned source values are generated ahead of time into
// data/weapon-game-data.json; nothing loads the package at server runtime.
const MORA_ID = 202;

const LEVEL_PLAN: ReadonlyArray<readonly [number, number]> = [
  [1, 0],
  [20, 0], [20, 1],
  [40, 1], [40, 2],
  [50, 2], [50, 3],
  [60, 3], [60, 4],
  [70, 4], [70, 5],
  [80, 5], [80, 6],
  [90, 6],
];

const ASCENSION_LABELS: Record<string, string> = {
  ascend1: '20/40',
  ascend2: '40/50',
  ascend3: '50/60',
  ascend4: '60/70',
  ascend5: '70/80',
  ascend6: '80/90',
};

export interface WeaponGameLevel {
  level: number;
  ascension: number;
  label: string;
  phase: 'before' | 'after' | null;
  baseAtk: number;
  subStatValue: number;
  subStatDisplay: string;
}

export interface WeaponGameMaterial {
  materialId: string;
  nameEn: string;
  count: number;
}

export interface WeaponGameAscensionStage {
  key: string;
  label: string;
  mora: number;
  items: WeaponGameMaterial[];
}

export interface WeaponGameRefinement {
  rank: number;
  description: string;
  values: string[];
}

export interface WeaponGameData {
  id: string;
  sourceId: number;
  nameEn: string;
  weaponType: string;
  weaponText: string;
  rarity: number;
  description: string | null;
  passiveName: string | null;
  mainStatType: string | null;
  mainStatText: string | null;
  version: string | null;
  levels: WeaponGameLevel[];
  refinements: WeaponGameRefinement[];
  ascension: WeaponGameAscensionStage[];
}

export interface WeaponRecommendedUser {
  id: string;
  nameEn: string;
  nameVi: string;
  element: string;
  rarity: number;
  avatarUrl: string;
  tier: string | null;
  role: string | null;
  rank: number;
  isF2P: boolean;
}

export function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Exact source values only; no invented interpolation or guessed caps. */
export function formatSubStat(value: number, percent: boolean): string {
  if (!Number.isFinite(value)) return '—';
  if (!percent) return String(Math.round(value));
  const scaled = value * 100;
  return `${Number.isInteger(scaled) ? scaled.toFixed(0) : scaled.toFixed(1)}%`;
}

interface GameDataSnapshotEntry {
  sourceId: number;
  aliases: string[];
  data: WeaponGameData;
}

let sourceIndex: Map<string, GameDataSnapshotEntry> | null = null;

function snapshotPath(): string {
  const candidates = [
    path.resolve(process.cwd(), 'data/weapon-game-data.json'),
    path.resolve(__dirname, '../../../../../data/weapon-game-data.json'),
    path.resolve(__dirname, '../../../../data/weapon-game-data.json'),
  ];
  const found = candidates.find(candidate => fs.existsSync(candidate));
  if (!found) throw new Error('Weapon game data snapshot is missing. Run npm run data:weapon-game-data.');
  return found;
}

function getSourceIndex(): Map<string, GameDataSnapshotEntry> {
  if (sourceIndex) return sourceIndex;
  const entries = JSON.parse(fs.readFileSync(snapshotPath(), 'utf8')) as GameDataSnapshotEntry[];
  const index = new Map<string, GameDataSnapshotEntry>();
  for (const entry of entries) {
    index.set(`id:${String(entry.sourceId)}`, entry);
    for (const alias of entry.aliases) index.set(`name:${alias}`, entry);
  }
  sourceIndex = index;
  return index;
}

function resolveSource(weapon: { id: string; nameEn: string; nameVi: string }): GameDataSnapshotEntry | null {
  const index = getSourceIndex();
  return index.get(`id:${weapon.id}`)
    || index.get(`name:${slugify(weapon.nameEn)}`)
    || index.get(`name:${slugify(weapon.nameVi)}`)
    || null;
}

export function buildLevels(source: any): WeaponGameLevel[] {
  const ascensionsByLevel = new Map<number, number[]>();
  for (const [level, ascension] of LEVEL_PLAN) {
    const list = ascensionsByLevel.get(level) || [];
    list.push(ascension);
    ascensionsByLevel.set(level, list);
  }

  const levels: WeaponGameLevel[] = [];
  for (const [level, ascension] of LEVEL_PLAN) {
    const stats = source.stats(level, ascension);
    if (!stats) continue;
    const percent = typeof source.baseStatText === 'string' && source.baseStatText.includes('%');
    const subStatValue = Number(stats.specialized) || 0;
    const ascensions = ascensionsByLevel.get(level) || [];
    const phase = ascensions.length < 2
      ? null
      : ascension === Math.min(...ascensions) ? 'before' : 'after';
    levels.push({
      level,
      ascension,
      label: `Lv.${level}`,
      phase,
      baseAtk: Math.round(Number(stats.attack) || 0),
      subStatValue,
      subStatDisplay: formatSubStat(subStatValue, percent),
    });
  }
  return levels;
}

export function buildRefinements(source: any): WeaponGameRefinement[] {
  const ranks: WeaponGameRefinement[] = [];
  for (let rank = 1; rank <= 5; rank++) {
    const raw = source[`r${rank}`];
    if (!raw) continue;
    ranks.push({
      rank,
      description: String(raw.description || ''),
      values: Array.isArray(raw.values) ? raw.values.map(String) : [],
    });
  }
  return ranks;
}

export function buildAscension(source: any): WeaponGameAscensionStage[] {
  const stages: WeaponGameAscensionStage[] = [];
  for (const key of Object.keys(ASCENSION_LABELS)) {
    const costs = source.costs?.[key];
    if (!Array.isArray(costs) || costs.length === 0) continue;
    let mora = 0;
    const items: WeaponGameMaterial[] = [];
    for (const cost of costs) {
      const count = Number(cost.count);
      if (!Number.isInteger(count) || count <= 0) continue;
      if (Number(cost.id) === MORA_ID) {
        mora += count;
        continue;
      }
      items.push({ materialId: String(cost.id), nameEn: String(cost.name || ''), count });
    }
    stages.push({ key, label: ASCENSION_LABELS[key], mora, items });
  }
  return stages;
}

export class WeaponGameDataService {
  constructor(private prisma: PrismaClient) {}

  async getGameData(weaponId: string): Promise<WeaponGameData | null> {
    const weapon = await this.prisma.weapon.findUnique({
      where: { id: weaponId },
      select: { id: true, nameEn: true, nameVi: true },
    });
    if (!weapon) return null;

    const source = resolveSource(weapon);
    if (!source) return null;

    return {
      ...source.data,
      id: weapon.id,
      nameEn: String(source.data.nameEn || weapon.nameEn),
    };
  }

  /**
   * Approved internal recommendations only: admin-managed CharacterWeapon rows.
   * Matching uses exact localized names plus a diacritic-insensitive weapon slug,
   * because legacy rows store Vietnamese slugs instead of game weapon IDs.
   */
  async getRecommendedUsers(weaponId: string): Promise<WeaponRecommendedUser[]> {
    const weapon = await this.prisma.weapon.findUnique({
      where: { id: weaponId },
      select: { id: true, nameEn: true, nameVi: true },
    });
    if (!weapon) return [];

    const names = [weapon.nameEn, weapon.nameVi].filter(Boolean) as string[];
    const slugs = names.map(slugify).filter(Boolean);
    const nameFilters = names.flatMap(name => [{ nameEn: name }, { nameVi: name }]);

    const rows = await this.prisma.characterWeapon.findMany({
      where: {
        OR: [
          { weaponId },
          ...nameFilters,
          ...slugs.map(slug => ({ weaponId: slug })),
        ],
      },
      select: {
        characterId: true,
        rank: true,
        isF2P: true,
      },
    });

    const best = new Map<string, { rank: number; isF2P: boolean }>();
    for (const row of rows) {
      const current = best.get(row.characterId);
      if (!current || row.rank < current.rank || (row.rank === current.rank && row.isF2P && !current.isF2P)) {
        best.set(row.characterId, { rank: row.rank, isF2P: row.isF2P });
      }
    }
    if (best.size === 0) return [];

    const characters = await this.prisma.character.findMany({
      where: { id: { in: [...best.keys()] } },
      select: {
        id: true,
        nameEn: true,
        nameVi: true,
        element: true,
        rarity: true,
        avatarUrl: true,
        tier: true,
        role: true,
      },
    });

    return characters
      .map(character => ({
        id: character.id,
        nameEn: character.nameEn,
        nameVi: character.nameVi,
        element: character.element,
        rarity: character.rarity,
        avatarUrl: character.avatarUrl,
        tier: character.tier,
        role: character.role,
        rank: best.get(character.id)!.rank,
        isF2P: best.get(character.id)!.isF2P,
      }))
      .sort((a, b) => a.rank - b.rank || a.nameEn.localeCompare(b.nameEn));
  }
}
