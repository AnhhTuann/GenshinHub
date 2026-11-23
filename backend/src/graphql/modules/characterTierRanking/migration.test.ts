import 'dotenv/config';
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const migrationDir = path.resolve(__dirname, '../../../../prisma/migrations/20261120151000_add_character_tier_rankings');
const sql = readFileSync(path.join(migrationDir, 'migration.sql'), 'utf8');
const lock = readFileSync(path.resolve(__dirname, '../../../../prisma/migrations/migration_lock.toml'), 'utf8');

test('migration is additive and stays inside the approved scope', () => {
  assert.ok(lock.includes('provider = "postgresql"'));
  const forbidden = [
    /\bDROP\s+(TABLE|TYPE|INDEX|COLUMN)\b/i,
    /^\s*DELETE\s+FROM\b/im,
    /^\s*UPDATE\s+/im,
    /\bTRUNCATE\b/i,
    /ALTER\s+TABLE\s+"Character"/i,
    /ALTER\s+TABLE\s+"TierRank"/i,
  ];
  for (const pattern of forbidden) {
    assert.equal(pattern.test(sql), false, `forbidden SQL matched: ${pattern}`);
  }
});

test('migration creates exactly the approved ranking objects', () => {
  for (const fragment of [
    'CREATE TYPE "TierListRole"',
    'CREATE TYPE "TierListTier"',
    'CREATE TYPE "TierListConstellation"',
    'CREATE TYPE "TierListApprovalStatus"',
    'CREATE TYPE "TierListDerivation"',
    'CREATE TABLE "CharacterTierRanking"',
    '"CharacterTierRanking_characterId_role_constellation_gameVer_key"',
    '"CharacterTierRanking_characterId_fkey"',
    'CREATE INDEX "CharacterTierRanking_gameVersion_approvalStatus_idx"',
  ]) {
    assert.ok(sql.includes(fragment), `missing migration fragment: ${fragment}`);
  }
});
