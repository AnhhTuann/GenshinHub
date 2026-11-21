"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const strict_1 = __importDefault(require("node:assert/strict"));
const node_test_1 = require("node:test");
const client_1 = require("@prisma/client");
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
(0, node_test_1.test)('PostgreSQL integration: additive table, unique key, rollback and legacy integrity', async () => {
    const url = process.env.DATABASE_URL || '';
    strict_1.default.match(url, /127\.0\.0\.1:5434\/genshinhub/, 'refusing to run outside development database');
    const prisma = new client_1.PrismaClient();
    const ROLLBACK = Symbol('rollback');
    try {
        const before = await prisma.$queryRawUnsafe(LEGACY_CHECKSUM_SQL);
        const countBefore = await prisma.characterTierRanking.count();
        const tierRankBefore = await prisma.tierRank.count();
        try {
            await prisma.$transaction(async (tx) => {
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
                const created = await tx.characterTierRanking.create({ data });
                strict_1.default.equal(created.approvalStatus, 'PENDING_REVIEW');
                strict_1.default.equal(created.derivation, 'SOURCE_DERIVED');
                // Same character may have multiple roles and separate C0/C6 rows.
                const otherRole = await tx.characterTierRanking.create({
                    data: { ...data, role: 'MAIN_DPS' },
                });
                const otherConstellation = await tx.characterTierRanking.create({
                    data: { ...data, constellation: 'C0' },
                });
                strict_1.default.notEqual(otherRole.id, created.id);
                strict_1.default.notEqual(otherConstellation.id, created.id);
                await strict_1.default.rejects(() => tx.characterTierRanking.create({ data }), (error) => error?.code === 'P2002', 'duplicate characterId+role+constellation+gameVersion must fail');
                throw ROLLBACK;
            }, { timeout: 10000 });
        }
        catch (error) {
            if (error !== ROLLBACK)
                throw error;
        }
        const after = await prisma.$queryRawUnsafe(LEGACY_CHECKSUM_SQL);
        strict_1.default.equal(after[0].checksum, before[0].checksum, 'legacy Character admin fields changed');
        strict_1.default.equal(await prisma.characterTierRanking.count(), countBefore, 'probe row was not rolled back');
        strict_1.default.equal(await prisma.tierRank.count(), tierRankBefore, 'TierRank changed');
    }
    finally {
        await prisma.$disconnect();
    }
});
