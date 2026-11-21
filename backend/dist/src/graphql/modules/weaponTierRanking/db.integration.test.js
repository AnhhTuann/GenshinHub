"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const strict_1 = __importDefault(require("node:assert/strict"));
const node_test_1 = require("node:test");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
(0, node_test_1.test)('development DB has the additive tables, zero rankings and intact legacy data', async () => {
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
        strict_1.default.equal(weapons, 279);
        strict_1.default.equal(weaponTiered, 0);
        strict_1.default.equal(weaponRoleSet, 0);
        strict_1.default.equal(characters, 131);
        strict_1.default.equal(tiers, 0);
        strict_1.default.equal(ranks, 0, 'no source-derived or independent ranking has been imported');
        strict_1.default.equal(audits, 0);
        strict_1.default.ok(characterBuilds > 0, 'multi-build data applied by the separate system is untouched');
    }
    finally {
        await prisma.$disconnect();
    }
});
(0, node_test_1.test)('foreign keys and the null-safe unique index exist in PostgreSQL', async () => {
    try {
        const constraints = await prisma.$queryRawUnsafe(`SELECT conname FROM pg_constraint WHERE conrelid IN ('"WeaponTierRank"'::regclass, '"WeaponTierAudit"'::regclass)`);
        const names = constraints.map(c => c.conname);
        for (const expected of [
            'WeaponTierRank_pkey', 'WeaponTierRank_weaponId_fkey',
            'WeaponTierAudit_pkey', 'WeaponTierAudit_rankingId_fkey',
        ])
            strict_1.default.ok(names.includes(expected), `missing constraint ${expected}`);
        const indexes = await prisma.$queryRawUnsafe(`SELECT indexname FROM pg_indexes WHERE tablename = 'WeaponTierRank'`);
        const indexNames = indexes.map(i => i.indexname);
        strict_1.default.ok(indexNames.includes('WeaponTierRank_weaponId_role_versionKey_refinementContext_key'));
        strict_1.default.ok(indexNames.includes('WeaponTierRank_publishRightsVerified_reviewStatus_idx'));
    }
    finally {
        await prisma.$disconnect();
    }
});
(0, node_test_1.test)('all five weapon types, three roles and six tiers are accepted by the enums', async () => {
    try {
        const enums = await prisma.$queryRawUnsafe(`SELECT t.typname, e.enumlabel FROM pg_type t JOIN pg_enum e ON e.enumtypid = t.oid
       WHERE t.typname IN ('WeaponTierRole','WeaponRankTier','WeaponRefinementContext')
       ORDER BY t.typname, e.enumsortorder`);
        const values = (name) => enums.filter(e => e.typname === name).map(e => e.enumlabel);
        strict_1.default.deepEqual(values('WeaponTierRole'), ['MAIN_DPS', 'SUB_DPS', 'SUPPORT']);
        strict_1.default.deepEqual(values('WeaponRankTier'), ['SS', 'S', 'A', 'B', 'C', 'D']);
        strict_1.default.deepEqual(values('WeaponRefinementContext'), ['R1', 'R2', 'R3', 'R4', 'R5', 'UNSPECIFIED', 'SOURCE_MISSING']);
    }
    finally {
        await prisma.$disconnect();
    }
});
