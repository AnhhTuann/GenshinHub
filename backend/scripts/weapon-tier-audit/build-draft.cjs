'use strict';

/**
 * Build an unreviewed weapon-tier draft from verified source placements,
 * approved internal recommendations and original Vietnamese explanations.
 * No database write. No schema change. No ranking is invented.
 */
const fs = require('node:fs');
const path = require('node:path');
const { openReadOnly } = require('./db.cjs');
const { REFINEMENT, GAME_VERSION, GAME_VERSION_STATUS, SOURCE_URL, rankingKey } = require('./tier-map.cjs');

const ROOT = path.resolve(__dirname, '..', '..', '..');
const DIR = path.join(ROOT, 'docs', 'weapon-tier-audit');
const read = name => JSON.parse(fs.readFileSync(path.join(DIR, name), 'utf8'));

async function build() {
  const source = read('source.json');
  const mapping = read('id-mapping.json');
  const explanations = JSON.parse(fs.readFileSync(path.join(__dirname, 'explanations.vi.json'), 'utf8'));
  const { prisma, target } = openReadOnly();

  const tierCells = new Map();
  const recommendationResolution = { directId: 0, uniqueVietnameseSlug: 0, ambiguous: 0, unmatched: 0 };
  try {
    const [recommendations, weapons] = await Promise.all([
      prisma.characterWeapon.findMany({
        select: { weaponId: true, characterId: true, rank: true, order: true, refinement: true, constellation: true },
        orderBy: [{ weaponId: 'asc' }, { rank: 'asc' }, { order: 'asc' }],
      }),
      prisma.weapon.findMany({ select: { id: true, nameVi: true } }),
    ]);
    const normalize = value => String(value ?? '')
      .normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
      .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const directIds = new Set(weapons.map(w => String(w.id)));
    const byVi = new Map();
    for (const weapon of weapons) {
      const key = normalize(weapon.nameVi);
      byVi.set(key, [...(byVi.get(key) || []), String(weapon.id)]);
    }

    for (const rec of recommendations) {
      const rawId = String(rec.weaponId);
      let weaponId = null;
      let method = null;
      if (directIds.has(rawId)) { weaponId = rawId; method = 'DIRECT_ID'; recommendationResolution.directId += 1; }
      else {
        const candidates = byVi.get(normalize(rawId)) || [];
        if (candidates.length === 1) {
          weaponId = candidates[0]; method = 'UNIQUE_VI_SLUG'; recommendationResolution.uniqueVietnameseSlug += 1;
        } else if (candidates.length > 1) recommendationResolution.ambiguous += 1;
        else recommendationResolution.unmatched += 1;
      }
      if (!weaponId) continue;
      const list = tierCells.get(weaponId) || [];
      list.push({
        characterId: rec.characterId,
        rank: rec.rank,
        order: rec.order,
        refinement: rec.refinement,
        constellation: rec.constellation,
        resolution: method,
      });
      tierCells.set(weaponId, list);
    }
  } finally {
    await prisma.$disconnect();
  }

  // Detect source conflicts: same weapon + role published at two different tiers.
  const tierSets = new Map();
  for (const cell of source.grid) {
    const matched = mapping.matched[cell.sourceId];
    if (!matched) continue;
    const key = `${matched.weaponId}|${cell.role}`;
    const set = tierSets.get(key) || new Set();
    set.add(cell.tier);
    tierSets.set(key, set);
  }

  const records = [];
  for (const cell of source.grid) {
    const matched = mapping.matched[cell.sourceId];
    if (!matched) {
      records.push({
        weaponId: null,
        sourceId: cell.sourceId,
        weaponType: cell.weaponType,
        role: cell.role,
        tier: cell.tier,
        status: 'UNMATCHED',
        flags: ['UNMATCHED', 'NEEDS_REVIEW'],
        explanationVi: null,
      });
      continue;
    }

    const explanationKey = `${matched.weaponId}|${cell.role}`;
    const explanationVi = explanations[explanationKey] || null;
    const conflicted = (tierSets.get(explanationKey)?.size || 0) > 1;
    const flags = [];
    let status = 'PENDING_REVIEW';
    if (conflicted) { flags.push('SOURCE_CONFLICT', 'DISPUTED'); status = 'DISPUTED'; }
    else if (!explanationVi) { flags.push('EXPLANATION_MISSING', 'NEEDS_REVIEW'); status = 'NEEDS_REVIEW'; }
    if (!source.gameVersion) flags.push('SOURCE_MISSING');

    records.push({
      weaponId: matched.weaponId,
      sourceId: cell.sourceId,
      nameEn: matched.nameEn,
      nameVi: matched.nameVi,
      weaponType: matched.weaponType,
      dbType: matched.dbType,
      rarity: matched.rarity,
      role: cell.role,
      tier: cell.tier,
      refinement: REFINEMENT.value,
      refinementAssumption: REFINEMENT.assumption,
      refinementNote: REFINEMENT.note,
      gameVersion: GAME_VERSION,
      gameVersionStatus: GAME_VERSION_STATUS,
      explanationVi,
      sourceUrl: SOURCE_URL,
      reviewStatus: status,
      status,
      flags,
      recommendedCharacters: (tierCells.get(matched.weaponId) || []).slice(0, 5),
      recommendedCharacterSource: 'existing approved CharacterWeapon records (context only, not a ranking input)',
      logicalKey: rankingKey({
        weaponId: matched.weaponId,
        weaponType: matched.weaponType,
        role: cell.role,
        refinement: REFINEMENT.value,
        gameVersion: GAME_VERSION,
      }),
    });
  }

  const draft = {
    description: 'Independent, unreviewed weapon-tier draft. Not applied. No verbatim source editorial text.',
    sourceUrl: SOURCE_URL,
    sourceUrlVi: source.sourceUrlVi,
    crosscheckUrl: source.crosscheckUrl,
    gameVersion: GAME_VERSION,
    gameVersionStatus: GAME_VERSION_STATUS,
    gameVersionNote: source.gameVersionNote,
    rightsVerified: false,
    databaseTarget: target,
    sourceRawChecksum: source.rawChecksum,
    excludedUnlabelledCells: source.unranked.length,
    recommendationResolution,
    recommendationNote: 'Approved CharacterWeapon rows are context only. Most rows store a Vietnamese slug, not a Weapon.id; only unique slug matches were resolved. No ranking was derived from user counts.',
    records,
  };

  const output = path.join(DIR, 'snapshot-weapon-tier.draft.json');
  fs.writeFileSync(output, JSON.stringify(draft, null, 2) + '\n');
  return draft;
}

if (require.main === module) {
  build().then(d => {
    const byStatus = {};
    for (const rec of d.records) byStatus[rec.status] = (byStatus[rec.status] || 0) + 1;
    console.log(JSON.stringify({ records: d.records.length, byStatus, rightsVerified: d.rightsVerified, gameVersion: d.gameVersion }, null, 2));
  }).catch(error => { console.error(error); process.exitCode = 1; });
}

module.exports = { build };
