'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { parseSource, rankingKey, TIER_LABELS, ROLE_LABELS, TYPE_LABELS, GAME_VERSION, GAME_VERSION_STATUS } = require('./tier-map.cjs');

const RAW = path.resolve(__dirname, '..', '..', '..', 'docs', 'weapon-tier-audit', 'source-raw.json');

test('source grid has 296 ranked cells and 30 unlabelled cells excluded', () => {
  const parsed = parseSource(JSON.parse(fs.readFileSync(RAW, 'utf8')));
  assert.equal(parsed.grid.length, 296);
  assert.equal(parsed.unranked.length, 30);
  assert.ok(parsed.unranked.every(cell => cell.tier === null));
});

test('source publishes five labelled tiers, never D, and three roles', () => {
  assert.deepEqual(TIER_LABELS, { '0': 'SS', '1': 'S', '2': 'A', '3': 'B', '4': 'C' });
  assert.deepEqual(Object.values(ROLE_LABELS), ['MAIN_DPS', 'SUB_DPS', 'SUPPORT']);
  assert.deepEqual(Object.values(TYPE_LABELS), ['SWORD', 'CLAYMORE', 'POLEARM', 'BOW', 'CATALYST']);
  const parsed = parseSource(JSON.parse(fs.readFileSync(RAW, 'utf8')));
  assert.deepEqual([...new Set(parsed.grid.map(cell => cell.tier))], ['SS', 'S', 'A', 'B', 'C']);
  assert.equal(parsed.grid.some(cell => cell.tier === 'D'), false);
});

test('weapons page has no published game version and is not assigned 7.2', () => {
  const parsed = parseSource(JSON.parse(fs.readFileSync(RAW, 'utf8')));
  assert.equal(parsed.gameVersion, GAME_VERSION);
  assert.equal(parsed.gameVersion, null);
  assert.equal(parsed.gameVersionStatus, GAME_VERSION_STATUS);
});

test('ranking key uses weapon, type, role, refinement and version but not tier', () => {
  const key = rankingKey({ weaponId: '11512', weaponType: 'SWORD', role: 'MAIN_DPS', refinement: null, gameVersion: null });
  assert.equal(key, '11512|SWORD|MAIN_DPS|UNSPECIFIED|UNSPECIFIED|UNSPECIFIED');
  assert.equal(key, rankingKey({ weaponId: '11512', weaponType: 'SWORD', role: 'MAIN_DPS', tier: 'S', refinement: null, gameVersion: null }));
});
