import 'dotenv/config';
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const dir = path.resolve(__dirname, '../../../../prisma/migrations/20261120153500_add_weapon_tier_rankings');
const sql = readFileSync(path.join(dir, 'migration.sql'), 'utf8');
const rollback = readFileSync(path.join(dir, 'rollback.sql'), 'utf8');
const schema = readFileSync(path.resolve(__dirname, '../../../../prisma/schema.prisma'), 'utf8');
const lock = readFileSync(path.resolve(__dirname, '../../../../prisma/migrations/migration_lock.toml'), 'utf8');
const codeOnly = sql.split('\n').filter(line => !line.trimStart().startsWith('--')).join('\n');

test('migration is additive and stays strictly inside weapon-tier scope', () => {
  assert.ok(lock.includes('provider = "postgresql"'));
  const forbidden = [
    /\bDROP\b/i,
    /\bTRUNCATE\b/i,
    /^\s*(DELETE|UPDATE\s+"\w+"\s+SET|INSERT)\s+/im,
    /ALTER\s+TABLE\s+"(Weapon|Character|TierRank|CharacterWeapon|CharacterArtifact|CharacterTeam|TeamMember|User|Otp|ArtifactSet|Material|CharacterBuild|CharacterTierRanking)"/i,
    /CharacterBuild|CharacterTierRanking/,
  ];
  for (const pattern of forbidden) {
    assert.equal(pattern.test(codeOnly), false, `forbidden SQL matched: ${pattern}`);
  }
  const alters = [...codeOnly.matchAll(/ALTER\s+TABLE\s+"([^"]+)"\s+ADD\s+CONSTRAINT/gi)].map(m => m[1]);
  assert.deepEqual(alters, ['WeaponTierRank', 'WeaponTierAudit']);
});

test('migration creates exactly the approved weapon objects and a null-safe unique key', () => {
  for (const fragment of [
    'CREATE TYPE "WeaponTierRole"',
    'CREATE TYPE "WeaponRankTier"',
    'CREATE TYPE "WeaponTierReviewStatus"',
    'CREATE TYPE "WeaponTierDerivation"',
    'CREATE TYPE "WeaponRefinementContext"',
    'CREATE TYPE "WeaponVersionStatus"',
    'CREATE TABLE "WeaponTierRank"',
    'CREATE TABLE "WeaponTierAudit"',
    '"refinementContext" "WeaponRefinementContext" NOT NULL',
    '"versionKey" TEXT NOT NULL',
    'CREATE UNIQUE INDEX "WeaponTierRank_weaponId_role_versionKey_refinementContext_key"',
    '"WeaponTierRank_weaponId_fkey" FOREIGN KEY ("weaponId") REFERENCES "Weapon"("id")',
    '"WeaponTierAudit_rankingId_fkey" FOREIGN KEY ("rankingId") REFERENCES "WeaponTierRank"("id")',
  ]) assert.ok(sql.includes(fragment), `missing migration fragment: ${fragment}`);

  assert.ok(sql.includes("('SS', 'S', 'A', 'B', 'C', 'D')"), 'tier D supported in schema');
  assert.ok(sql.includes("'SOURCE_MISSING'"), 'source-missing refinement context supported');
  assert.ok(sql.includes("'DISPUTED'"), 'disputed review status supported');
});

test('schema mirrors the migration and preserves legacy Weapon tier fields', () => {
  for (const fragment of [
    'enum WeaponTierRole', 'enum WeaponRankTier', 'enum WeaponTierReviewStatus',
    'enum WeaponTierDerivation', 'enum WeaponRefinementContext', 'enum WeaponVersionStatus',
    'enum WeaponConfidence', 'model WeaponTierRank', 'model WeaponTierAudit',
    '@@unique([weaponId, role, versionKey, refinementContext])',
    'tierRanks WeaponTierRank[]',
  ]) assert.ok(schema.includes(fragment), `missing schema fragment: ${fragment}`);
  const weaponModel = schema.slice(schema.indexOf('model Weapon {'), schema.indexOf('model ArtifactSet {'));
  assert.match(weaponModel, /\btier\s+String\?/);
  assert.match(weaponModel, /\brole\s+String\?/);
});

test('rollback removes only the new objects and leaves every legacy table untouched', () => {
  for (const fragment of [
    'DROP TABLE IF EXISTS "WeaponTierAudit"',
    'DROP TABLE IF EXISTS "WeaponTierRank"',
    'DROP TYPE IF EXISTS "WeaponTierRole"',
    'DROP TYPE IF EXISTS "WeaponRankTier"',
  ]) assert.ok(rollback.includes(fragment), `missing rollback fragment: ${fragment}`);
  for (const table of ['Weapon', 'Character', 'TierRank', 'CharacterBuild']) {
    assert.equal(new RegExp(`DROP\\s+TABLE[^;]*"${table}"`, 'i').test(rollback), false, `rollback touches ${table}`);
  }
});

test('preflight record documents backup, target and migration isolation', () => {
  const preflight = JSON.parse(readFileSync(
    path.resolve(__dirname, '../../../../../docs/weapon-tier-audit/phase-b1-preflight.json'), 'utf8',
  ));
  assert.equal(preflight.ok, true);
  assert.equal(preflight.target, '127.0.0.1:5434/genshinhub');
  assert.equal(preflight.failures.length, 0);
  assert.ok(preflight.backup.sha256.length === 64);
  assert.ok(preflight.warnings.some((w: any) => /Multi-Build/.test(w.name)));
});
