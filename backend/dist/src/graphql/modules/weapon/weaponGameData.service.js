"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeaponGameDataService = void 0;
const genshinDb = __importStar(require("genshin-db"));
const gdb = genshinDb;
const MORA_ID = 202;
const LEVEL_PLAN = [
    [1, 0],
    [20, 0], [20, 1],
    [40, 1], [40, 2],
    [50, 2], [50, 3],
    [60, 3], [60, 4],
    [70, 4], [70, 5],
    [80, 5], [80, 6],
    [90, 6],
];
const ASCENSION_LABELS = {
    ascend1: '20/40',
    ascend2: '40/50',
    ascend3: '50/60',
    ascend4: '60/70',
    ascend5: '70/80',
    ascend6: '80/90',
};
function slugify(value) {
    return value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}
/** Exact source values only; no invented interpolation or guessed caps. */
function formatSubStat(value, percent) {
    if (!Number.isFinite(value))
        return '—';
    if (!percent)
        return String(Math.round(value));
    const scaled = value * 100;
    return `${Number.isInteger(scaled) ? scaled.toFixed(0) : scaled.toFixed(1)}%`;
}
let sourceIndex = null;
function getSourceIndex() {
    if (sourceIndex)
        return sourceIndex;
    const index = new Map();
    const names = gdb.weapons('names', { matchCategories: true }) || [];
    for (const name of names) {
        const record = gdb.weapons(name, { matchName: 'equal' });
        if (!record)
            continue;
        index.set(`id:${String(record.id)}`, record);
        index.set(`name:${slugify(record.name)}`, record);
        index.set(`name:${slugify(record.id + '')}`, record);
    }
    sourceIndex = index;
    return index;
}
function resolveSource(weapon) {
    const index = getSourceIndex();
    return index.get(`id:${weapon.id}`)
        || index.get(`name:${slugify(weapon.nameEn)}`)
        || index.get(`name:${slugify(weapon.nameVi)}`)
        || null;
}
function buildLevels(source) {
    const ascensionsByLevel = new Map();
    for (const [level, ascension] of LEVEL_PLAN) {
        const list = ascensionsByLevel.get(level) || [];
        list.push(ascension);
        ascensionsByLevel.set(level, list);
    }
    const levels = [];
    for (const [level, ascension] of LEVEL_PLAN) {
        const stats = source.stats(level, ascension);
        if (!stats)
            continue;
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
function buildRefinements(source) {
    const ranks = [];
    for (let rank = 1; rank <= 5; rank++) {
        const raw = source[`r${rank}`];
        if (!raw)
            continue;
        ranks.push({
            rank,
            description: String(raw.description || ''),
            values: Array.isArray(raw.values) ? raw.values.map(String) : [],
        });
    }
    return ranks;
}
function buildAscension(source) {
    const stages = [];
    for (const key of Object.keys(ASCENSION_LABELS)) {
        const costs = source.costs?.[key];
        if (!Array.isArray(costs) || costs.length === 0)
            continue;
        let mora = 0;
        const items = [];
        for (const cost of costs) {
            const count = Number(cost.count);
            if (!Number.isInteger(count) || count <= 0)
                continue;
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
class WeaponGameDataService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getGameData(weaponId) {
        const weapon = await this.prisma.weapon.findUnique({
            where: { id: weaponId },
            select: { id: true, nameEn: true, nameVi: true },
        });
        if (!weapon)
            return null;
        const source = resolveSource(weapon);
        if (!source)
            return null;
        return {
            id: weapon.id,
            sourceId: Number(source.id),
            nameEn: String(source.name || weapon.nameEn),
            weaponType: String(source.weaponType || ''),
            weaponText: String(source.weaponText || ''),
            rarity: Number(source.rarity) || 0,
            description: source.description ? String(source.description) : null,
            passiveName: source.effectName ? String(source.effectName) : null,
            mainStatType: source.mainStatType ? String(source.mainStatType) : null,
            mainStatText: source.mainStatText ? String(source.mainStatText) : null,
            version: source.version ? String(source.version) : null,
            levels: buildLevels(source),
            refinements: buildRefinements(source),
            ascension: buildAscension(source),
        };
    }
    /**
     * Approved internal recommendations only: admin-managed CharacterWeapon rows.
     * Matching uses exact localized names plus a diacritic-insensitive weapon slug,
     * because legacy rows store Vietnamese slugs instead of game weapon IDs.
     */
    async getRecommendedUsers(weaponId) {
        const weapon = await this.prisma.weapon.findUnique({
            where: { id: weaponId },
            select: { id: true, nameEn: true, nameVi: true },
        });
        if (!weapon)
            return [];
        const names = [weapon.nameEn, weapon.nameVi].filter(Boolean);
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
        const best = new Map();
        for (const row of rows) {
            const current = best.get(row.characterId);
            if (!current || row.rank < current.rank || (row.rank === current.rank && row.isF2P && !current.isF2P)) {
                best.set(row.characterId, { rank: row.rank, isF2P: row.isF2P });
            }
        }
        if (best.size === 0)
            return [];
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
            rank: best.get(character.id).rank,
            isF2P: best.get(character.id).isF2P,
        }))
            .sort((a, b) => a.rank - b.rank || a.nameEn.localeCompare(b.nameEn));
    }
}
exports.WeaponGameDataService = WeaponGameDataService;
