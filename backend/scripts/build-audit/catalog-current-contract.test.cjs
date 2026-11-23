'use strict';
const assert = require('node:assert/strict');
const { test } = require('node:test');
const { readFileSync } = require('node:fs');
const { audit, select } = require('./catalog-final-review.cjs');

assert.ok(process.env.BUILD_AUDIT_INVENTORY, 'Provide the current read-only development inventory');
const inventory = JSON.parse(readFileSync(process.env.BUILD_AUDIT_INVENTORY, 'utf8'));
const publicStatuses = new Set(['APPROVED', 'LEGACY_IMPORT', 'MAINTENANCE']);

test('current identities have exactly one owned public default', () => {
  assert.deepEqual(inventory.identity, { database: 'genshinhub', mode: 'on' });
  assert.ok(inventory.characters.length > 0);
  assert.equal(new Set(inventory.characters.map(({ id }) => id)).size, inventory.characters.length);
  for (const character of inventory.characters) {
    const defaults = character.builds.filter(build => build.isDefault);
    assert.equal(defaults.length, 1, character.id);
    assert.equal(defaults[0].characterId, character.id);
    assert.ok(publicStatuses.has(defaults[0].reviewStatus), character.id);
  }
});

test('Aino retains the verified support default and resolvable equipment and teams', () => {
  const aino = inventory.characters.find(character => character.id === 'aino');
  const build = aino.builds.find(item => item.isDefault);
  assert.equal(build.id, 'ref-v72-aino');
  assert.ok(build.playstyles.includes('SUPPORT'));
  assert.ok(build.bestWeapons.length && build.bestArtifacts.length && build.teams.length);
  for (const weapon of build.bestWeapons) {
    assert.ok(inventory.weapons.some(item => item.id === weapon.weaponId));
  }
  for (const artifact of build.bestArtifacts) {
    assert.ok(inventory.artifacts.some(item => item.nameEn === artifact.setNameEn));
  }
  for (const team of build.teams) {
    assert.ok(team.members.some(member => member.characterId === 'aino'));
    assert.ok(team.members.every(member => inventory.characters.some(item => item.id === member.characterId)));
  }
});

test('the frozen A01 selection cannot write over current Admin-managed history', () => {
  const original = require('../../../docs/character-builds/final-review/A01_ORIGINAL.json');
  const manifest = { batches: [original.batch] };
  const plan = select(audit(inventory), manifest, 'A01', 'bennett:1');
  assert.equal(plan.candidates[0].outcome, 'ADMIN_MANAGED_HISTORY');
  assert.equal(plan.candidates[0].writeEligible, false);
  assert.equal(plan.writes, 0);
});
