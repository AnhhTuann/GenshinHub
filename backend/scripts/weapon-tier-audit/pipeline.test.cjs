'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { validateDraft } = require('./validate.cjs');
const { buildRows, HEADERS } = require('./diff.cjs');
const { REFINEMENT } = require('./tier-map.cjs');

const DIR = path.resolve(__dirname, '..', '..', '..', 'docs', 'weapon-tier-audit');
const read = name => JSON.parse(fs.readFileSync(path.join(DIR, name), 'utf8'));
const draft = read('snapshot-weapon-tier.draft.json');
const currentDb = read('current-db.json');
const mapping = read('id-mapping.json');

test('all nine required test cases map to verified local weapon IDs', () => {
  const expected = {
    light_of_foliar_incision: '11512',
    summit_shaper: '11504',
    xiphos_moonlight: '11418',
    favonius_sword: '11401',
    sacrificial_sword: '11403',
    thrilling_tales_of_dragon_slayers: '14302',
    staff_of_homa: '13501',
    aqua_simulacra: '15508',
    the_widsith: '14402',
  };
  for (const [sourceId, weaponId] of Object.entries(expected)) {
    assert.equal(mapping.matched[sourceId]?.weaponId, weaponId, sourceId);
  }
  assert.equal(mapping.unmatched.length, 0);
});

test('draft has no invented tier D, no invented refinement, no claimed version', () => {
  assert.equal(draft.records.some(r => r.tier === 'D'), false);
  assert.ok(draft.records.every(r => r.refinement === REFINEMENT.value));
  assert.ok(draft.records.every(r => r.refinementAssumption === 'UNSPECIFIED'));
  assert.ok(draft.records.every(r => r.gameVersion === null));
  assert.equal(draft.rightsVerified, false);
});

test('validation detects invalid data and admin conflicts without touching the DB', () => {
  const base = {
    weaponId: '11512', sourceId: 'light_of_foliar_incision', nameEn: 'Light of Foliar Incision',
    weaponType: 'SWORD', dbType: 'Kiếm Đơn', rarity: 5, role: 'MAIN_DPS', tier: 'S',
    refinement: null, refinementAssumption: 'UNSPECIFIED', gameVersion: null,
    explanationVi: 'Giải thích gốc.', reviewStatus: 'PENDING_REVIEW',
    logicalKey: '11512|SWORD|MAIN_DPS|null|UNSPECIFIED|UNSPECIFIED', flags: ['PENDING_REVIEW'],
  };
  const fakeDb = { weapons: [{ id: '11512', type: 'Kiếm Đơn', rarity: 5, tier: null, role: null }] };
  const clean = validateDraft({ records: [base] }, fakeDb);
  assert.equal(clean.counts.INVALID_TYPE, undefined);
  assert.equal(clean.counts.ADMIN_CONFLICT, undefined);

  const bad = validateDraft({
    records: [
      { ...base, weaponType: 'SWORD', dbType: 'Cung', tier: 'Z', role: 'TANK', refinement: 7, gameVersion: '7.2' },
      { ...base, logicalKey: base.logicalKey },
    ],
  }, { weapons: [{ id: '11512', type: 'Kiếm Đơn', rarity: 5, tier: 'SS', role: 'Main DPS' }] });
  for (const code of ['TYPE_MISMATCH', 'INVALID_TIER', 'INVALID_ROLE', 'INVALID_REFINEMENT', 'UNVERIFIED_VERSION', 'DUPLICATE_RANKING', 'ADMIN_CONFLICT']) {
    assert.ok(bad.counts[code] >= 1, code);
  }
});

test('diff uses required columns and flags source conflicts and missing explanations', () => {
  assert.deepEqual(HEADERS, ['Weapon', 'Type', 'Role', 'Current Tier', 'Proposed Tier', 'Refinement', 'Source', 'Status']);
  const rows = buildRows(draft, currentDb);
  assert.equal(rows.length, 296);
  const drill = rows.filter(r => r.Weapon === "Prospector's Drill");
  assert.equal(drill.length, 4);
  assert.ok(drill.every(r => r.Status.includes('SOURCE_CONFLICT') && r.Status.includes('DISPUTED')));
  assert.ok(rows.every(r => r.Status.includes('SOURCE_MISSING')));
  assert.equal(rows.every(r => r['Current Tier'] === ''), true);
  assert.ok(rows.every(r => r['Proposed Tier'] !== 'D'));
});

test('curated explanations are role-specific and never copied wholesale', () => {
  const explained = draft.records.filter(r => r.explanationVi);
  assert.equal(explained.length, 38);
  assert.ok(explained.every(r => r.explanationVi.length >= 100));
  const unique = new Set(explained.map(r => r.explanationVi));
  assert.equal(unique.size, explained.length);
  assert.ok(explained.some(r => r.role === 'SUPPORT'));
  assert.ok(explained.some(r => r.role === 'SUB_DPS'));
  assert.ok(explained.some(r => r.role === 'MAIN_DPS'));
});
