import 'dotenv/config';
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { PrismaClient } from '@prisma/client';

const LEGACY_CHECKSUM_SQL = `
  select md5(coalesce(string_agg(row_json::text, E'\\n' order by id), '')) as checksum
  from (
    select id,
      json_build_object(
        'id', id,
        'tier', tier,
        'role', role,
        'recommendedC', "recommendedC",
        'tierNoteEn', "tierNoteEn",
        'tierNoteVi', "tierNoteVi"
      ) as row_json
    from "Character"
    order by id
  ) c
`;

test('PostgreSQL integration: additive table, unique key, rollback and legacy integrity', async () => {
  const url = process.env.DATABASE_URL || '';
  assert.match(url, /127\.0\.0\.1:5434\/genshinhub/, 'refusing to run outside development database');

  const prisma = new PrismaClient();
  const ROLLBACK = Symbol('rollback');
  try {
    const before = await prisma.$queryRawUnsafe<{ checksum: string }[]>(LEGACY_CHECKSUM_SQL);
    const countBefore = await (prisma as any).characterTierRanking.count();
    const tierRankBefore = await prisma.tierRank.count();

    try {
      await prisma.$transaction(async tx => {
        const data = {
          characterId: 'mitya',
          role: 'SUPPORT',
          tier: 'S',
          constellation: 'C6',
          gameVersion: 'TEST-ROLLBACK-7.2',
          explanationVi: 'integration rollback probe',
          sourceUrl: 'https://genshinhub.local/integration-test',
          sourceName: 'GenshinHub integration test',
          derivation: 'SOURCE_DERIVED',
          approvalStatus: 'PENDING_REVIEW',
        };
        const created = await (tx as any).characterTierRanking.create({ data });
        assert.equal(created.approvalStatus, 'PENDING_REVIEW');
        assert.equal(created.derivation, 'SOURCE_DERIVED');

        // Same character may have multiple roles and separate C0/C6 rows.
        const otherRole = await (tx as any).characterTierRanking.create({
          data: { ...data, role: 'MAIN_DPS' },
        });
        const otherConstellation = await (tx as any).characterTierRanking.create({
          data: { ...data, constellation: 'C0' },
        });
        assert.notEqual(otherRole.id, created.id);
        assert.notEqual(otherConstellation.id, created.id);

        await assert.rejects(
          () => (tx as any).characterTierRanking.create({ data }),
          (error: any) => error?.code === 'P2002',
          'duplicate characterId+role+constellation+gameVersion must fail',
        );

        throw ROLLBACK;
      }, { timeout: 10000 });
    } catch (error) {
      if (error !== ROLLBACK) throw error;
    }

    const after = await prisma.$queryRawUnsafe<{ checksum: string }[]>(LEGACY_CHECKSUM_SQL);
    assert.equal(after[0].checksum, before[0].checksum, 'legacy Character admin fields changed');
    assert.equal(await (prisma as any).characterTierRanking.count(), countBefore, 'probe row was not rolled back');
    assert.equal(await prisma.tierRank.count(), tierRankBefore, 'TierRank changed');
  } finally {
    await prisma.$disconnect();
  }
});
