import 'dotenv/config';
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

test('development DB has the additive tables, zero rankings and intact legacy data', async () => {
  try {
    const [weapons, weaponTiered, weaponRoleSet, characters, characterBuilds, tiers, ranks, audits] = await prisma.$transaction([
      prisma.weapon.count(),
      prisma.weapon.count({ where: { tier: { not: null } } }),
      prisma.weapon.count({ where: { role: { not: null } } }),
      prisma.character.count(),
      prisma.characterBuild.count(),
      prisma.tierRank.count(),
      prisma.weaponTierRank.count(),
      prisma.weaponTierAudit.count(),
    ]);
    assert.equal(weapons, 279);
    assert.equal(weaponTiered, 0);
    assert.equal(weaponRoleSet, 0);
    assert.equal(characters, 131);
    assert.equal(tiers, 0);
    assert.equal(ranks, 0, 'no source-derived or independent ranking has been imported');
    assert.equal(audits, 0);
    assert.ok(characterBuilds > 0, 'multi-build data applied by the separate system is untouched');
  } finally {
    await prisma.$disconnect();
  }
});

test('foreign keys and the null-safe unique index exist in PostgreSQL', async () => {
  try {
    const constraints = await prisma.$queryRawUnsafe<Array<{ conname: string }>>(
      `SELECT conname FROM pg_constraint WHERE conrelid IN ('"WeaponTierRank"'::regclass, '"WeaponTierAudit"'::regclass)`,
    );
    const names = constraints.map(c => c.conname);
    for (const expected of [
      'WeaponTierRank_pkey', 'WeaponTierRank_weaponId_fkey',
      'WeaponTierAudit_pkey', 'WeaponTierAudit_rankingId_fkey',
    ]) assert.ok(names.includes(expected), `missing constraint ${expected}`);

    const indexes = await prisma.$queryRawUnsafe<Array<{ indexname: string }>>(
      `SELECT indexname FROM pg_indexes WHERE tablename = 'WeaponTierRank'`,
    );
    const indexNames = indexes.map(i => i.indexname);
    assert.ok(indexNames.includes('WeaponTierRank_weaponId_role_versionKey_refinementContext_key'));
    assert.ok(indexNames.includes('WeaponTierRank_publishRightsVerified_reviewStatus_idx'));
  } finally {
    await prisma.$disconnect();
  }
});

test('all five weapon types, three roles and six tiers are accepted by the enums', async () => {
  try {
    const enums = await prisma.$queryRawUnsafe<Array<{ typname: string; enumlabel: string }>>(
      `SELECT t.typname, e.enumlabel FROM pg_type t JOIN pg_enum e ON e.enumtypid = t.oid
       WHERE t.typname IN ('WeaponTierRole','WeaponRankTier','WeaponRefinementContext')
       ORDER BY t.typname, e.enumsortorder`,
    );
    const values = (name: string) => enums.filter(e => e.typname === name).map(e => e.enumlabel);
    assert.deepEqual(values('WeaponTierRole'), ['MAIN_DPS', 'SUB_DPS', 'SUPPORT']);
    assert.deepEqual(values('WeaponRankTier'), ['SS', 'S', 'A', 'B', 'C', 'D']);
    assert.deepEqual(values('WeaponRefinementContext'), ['R1', 'R2', 'R3', 'R4', 'R5', 'UNSPECIFIED', 'SOURCE_MISSING']);
  } finally {
    await prisma.$disconnect();
  }
});
