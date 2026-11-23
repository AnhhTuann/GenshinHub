'use strict';

/**
 * Pure, database-free constants and helpers for the weapon tier-list audit.
 * The weapon tier source renders only five labelled tiers (SS..C). Its sixth
 * structured key has no label and is deliberately excluded, never downgraded.
 */

const SOURCE_URL = 'https://genshin-builds.com/en/tier-list-weapons';
const SOURCE_URL_VI = 'https://genshin-builds.com/vi/tier-list-weapons/';
const CROSSCHECK_URL = 'https://gamewith.net/genshin-impact/article/show/22376';

// The Genshin-Builds weapons page does not publish a game version. Do not infer
// 7.2 from the character page or from the GameWith cross-check.
const GAME_VERSION = null;
const GAME_VERSION_STATUS = 'SOURCE_MISSING';

const TIER_LABELS = Object.freeze({ '0': 'SS', '1': 'S', '2': 'A', '3': 'B', '4': 'C' });
const UNLABELLED_TIER_KEY = '5';
const ROLE_LABELS = Object.freeze({ maindps: 'MAIN_DPS', subdps: 'SUB_DPS', support: 'SUPPORT' });
const TYPE_LABELS = Object.freeze({
  sword: 'SWORD', claymore: 'CLAYMORE', polearm: 'POLEARM', bow: 'BOW', catalyst: 'CATALYST',
});

const VALID_TIERS = Object.freeze(['SS', 'S', 'A', 'B', 'C', 'D']);
const VALID_ROLES = Object.freeze(['MAIN_DPS', 'SUB_DPS', 'SUPPORT']);
const VALID_TYPES = Object.freeze(['SWORD', 'CLAYMORE', 'POLEARM', 'BOW', 'CATALYST']);

// DB stores Vietnamese weapon types; never guess from artwork or icon.
const TYPE_TO_DB = Object.freeze({
  SWORD: 'Kiếm Đơn',
  CLAYMORE: 'Trọng Kiếm',
  POLEARM: 'Vũ Khí Cán Dài',
  BOW: 'Cung',
  CATALYST: 'Pháp Khí',
});

// genshin-db weaponType codes -> canonical type.
const GDB_TYPE_TO_TYPE = Object.freeze({
  WEAPON_SWORD_ONE_HAND: 'SWORD',
  WEAPON_CLAYMORE: 'CLAYMORE',
  WEAPON_POLE: 'POLEARM',
  WEAPON_BOW: 'BOW',
  WEAPON_CATALYST: 'CATALYST',
});

const REFINEMENT = Object.freeze({
  value: null,
  assumption: 'UNSPECIFIED',
  note: 'The source publishes no refinement assumption. No R1/R5 default is invented.',
});

function unwrapProps(value) {
  if (Array.isArray(value) && value.length === 2 && (value[0] === 0 || value[0] === 1)) return unwrapProps(value[1]);
  if (Array.isArray(value)) return value.map(unwrapProps);
  if (value && typeof value === 'object') {
    const out = {};
    for (const [key, child] of Object.entries(value)) out[key] = unwrapProps(child);
    return out;
  }
  return value;
}

/** Normalize the embedded Astro props into a source grid plus excluded cells. */
function parseSource(raw) {
  const root = unwrapProps(raw);
  const tierlist = root && root.tierlist;
  const weaponsMap = (root && root.weaponsMap) || {};
  if (!tierlist) throw new Error('Missing tierlist in source props');
  if (!weaponsMap || Object.keys(weaponsMap).length === 0) throw new Error('Missing weaponsMap in source props');

  const grid = [];
  const unranked = [];

  for (const [typeKey, type] of Object.entries(TYPE_LABELS)) {
    const byRole = tierlist[typeKey];
    if (!byRole) throw new Error(`Missing weapon type in source: ${typeKey}`);
    for (const [roleKey, role] of Object.entries(ROLE_LABELS)) {
      const byTier = byRole[roleKey];
      if (!byTier) throw new Error(`Missing role ${roleKey} for ${typeKey}`);
      for (const [key, ids] of Object.entries(byTier)) {
        const list = Array.isArray(ids) ? ids : [];
        if (key === UNLABELLED_TIER_KEY) {
          for (const sourceId of list) {
            const source = weaponsMap[sourceId] || {};
            unranked.push({
              sourceId,
              sourceNameEn: source.name || null,
              weaponType: type,
              role,
              tier: null,
              reason: 'Nguồn có nhóm tier thứ 6 không được gán nhãn SS–C trong giao diện; không suy diễn tier.',
            });
          }
          continue;
        }
        const tier = TIER_LABELS[key];
        if (!tier) throw new Error(`Unexpected tier key ${key} for ${typeKey}/${roleKey}`);
        for (const sourceId of list) {
          const source = weaponsMap[sourceId] || {};
          grid.push({
            sourceId,
            sourceNameEn: source.name || null,
            sourceRarity: Number.isInteger(source.rarity) ? source.rarity : null,
            weaponType: type,
            role,
            tier,
            sourceTierKey: key,
          });
        }
      }
    }
  }

  return {
    sourceUrl: SOURCE_URL,
    sourceUrlVi: SOURCE_URL_VI,
    crosscheckUrl: CROSSCHECK_URL,
    gameVersion: GAME_VERSION,
    gameVersionStatus: GAME_VERSION_STATUS,
    gameVersionNote: 'Trang vũ khí của Genshin-Builds không công bố phiên bản game. Không tự gán 7.2 từ trang nhân vật hoặc từ GameWith.',
    tierLabels: TIER_LABELS,
    unlabelledTierKey: UNLABELLED_TIER_KEY,
    roleLabels: ROLE_LABELS,
    typeLabels: TYPE_LABELS,
    refinement: REFINEMENT,
    grid,
    unranked,
  };
}

/** Logical identity of one ranking. Tier is a value, not part of the key. */
function rankingKey(record) {
  return [
    record.weaponId ?? record.sourceId,
    record.weaponType,
    record.role,
    record.refinement ?? 'UNSPECIFIED',
    record.refinementAssumption ?? REFINEMENT.assumption,
    record.gameVersion ?? 'UNSPECIFIED',
  ].join('|');
}

module.exports = {
  SOURCE_URL, SOURCE_URL_VI, CROSSCHECK_URL, GAME_VERSION, GAME_VERSION_STATUS,
  TIER_LABELS, UNLABELLED_TIER_KEY, ROLE_LABELS, TYPE_LABELS,
  VALID_TIERS, VALID_ROLES, VALID_TYPES, TYPE_TO_DB, GDB_TYPE_TO_TYPE, REFINEMENT,
  unwrapProps, parseSource, rankingKey,
};
