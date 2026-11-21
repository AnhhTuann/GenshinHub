"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const strict_1 = __importDefault(require("node:assert/strict"));
const node_test_1 = require("node:test");
const node_fs_1 = require("node:fs");
const node_path_1 = __importDefault(require("node:path"));
const dir = node_path_1.default.resolve(__dirname, '../../../../prisma/migrations/20261120153500_add_weapon_tier_rankings');
const sql = (0, node_fs_1.readFileSync)(node_path_1.default.join(dir, 'migration.sql'), 'utf8');
const rollback = (0, node_fs_1.readFileSync)(node_path_1.default.join(dir, 'rollback.sql'), 'utf8');
const schema = (0, node_fs_1.readFileSync)(node_path_1.default.resolve(__dirname, '../../../../prisma/schema.prisma'), 'utf8');
const lock = (0, node_fs_1.readFileSync)(node_path_1.default.resolve(__dirname, '../../../../prisma/migrations/migration_lock.toml'), 'utf8');
const codeOnly = sql.split('\n').filter(line => !line.trimStart().startsWith('--')).join('\n');
(0, node_test_1.test)('migration is additive and stays strictly inside weapon-tier scope', () => {
    strict_1.default.ok(lock.includes('provider = "postgresql"'));
    const forbidden = [
        /\bDROP\b/i,
        /\bTRUNCATE\b/i,
        /^\s*(DELETE|UPDATE\s+"\w+"\s+SET|INSERT)\s+/im,
        /ALTER\s+TABLE\s+"(Weapon|Character|TierRank|CharacterWeapon|CharacterArtifact|CharacterTeam|TeamMember|User|Otp|ArtifactSet|Material|CharacterBuild|CharacterTierRanking)"/i,
        /CharacterBuild|CharacterTierRanking/,
    ];
    for (const pattern of forbidden) {
        strict_1.default.equal(pattern.test(codeOnly), false, `forbidden SQL matched: ${pattern}`);
    }
    const alters = [...codeOnly.matchAll(/ALTER\s+TABLE\s+"([^"]+)"\s+ADD\s+CONSTRAINT/gi)].map(m => m[1]);
    strict_1.default.deepEqual(alters, ['WeaponTierRank', 'WeaponTierAudit']);
});
(0, node_test_1.test)('migration creates exactly the approved weapon objects and a null-safe unique key', () => {
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
    ])
        strict_1.default.ok(sql.includes(fragment), `missing migration fragment: ${fragment}`);
    strict_1.default.ok(sql.includes("('SS', 'S', 'A', 'B', 'C', 'D')"), 'tier D supported in schema');
    strict_1.default.ok(sql.includes("'SOURCE_MISSING'"), 'source-missing refinement context supported');
    strict_1.default.ok(sql.includes("'DISPUTED'"), 'disputed review status supported');
});
(0, node_test_1.test)('schema mirrors the migration and preserves legacy Weapon tier fields', () => {
    for (const fragment of [
        'enum WeaponTierRole', 'enum WeaponRankTier', 'enum WeaponTierReviewStatus',
        'enum WeaponTierDerivation', 'enum WeaponRefinementContext', 'enum WeaponVersionStatus',
        'enum WeaponConfidence', 'model WeaponTierRank', 'model WeaponTierAudit',
        '@@unique([weaponId, role, versionKey, refinementContext])',
        'tierRanks WeaponTierRank[]',
    ])
        strict_1.default.ok(schema.includes(fragment), `missing schema fragment: ${fragment}`);
    const weaponModel = schema.slice(schema.indexOf('model Weapon {'), schema.indexOf('model ArtifactSet {'));
    strict_1.default.match(weaponModel, /\btier\s+String\?/);
    strict_1.default.match(weaponModel, /\brole\s+String\?/);
});
(0, node_test_1.test)('rollback removes only the new objects and leaves every legacy table untouched', () => {
    for (const fragment of [
        'DROP TABLE IF EXISTS "WeaponTierAudit"',
        'DROP TABLE IF EXISTS "WeaponTierRank"',
        'DROP TYPE IF EXISTS "WeaponTierRole"',
        'DROP TYPE IF EXISTS "WeaponRankTier"',
    ])
        strict_1.default.ok(rollback.includes(fragment), `missing rollback fragment: ${fragment}`);
    for (const table of ['Weapon', 'Character', 'TierRank', 'CharacterBuild']) {
        strict_1.default.equal(new RegExp(`DROP\\s+TABLE[^;]*"${table}"`, 'i').test(rollback), false, `rollback touches ${table}`);
    }
});
(0, node_test_1.test)('preflight record documents backup, target and migration isolation', () => {
    const preflight = JSON.parse((0, node_fs_1.readFileSync)(node_path_1.default.resolve(__dirname, '../../../../../docs/weapon-tier-audit/phase-b1-preflight.json'), 'utf8'));
    strict_1.default.equal(preflight.ok, true);
    strict_1.default.equal(preflight.target, '127.0.0.1:5434/genshinhub');
    strict_1.default.equal(preflight.failures.length, 0);
    strict_1.default.ok(preflight.backup.sha256.length === 64);
    strict_1.default.ok(preflight.warnings.some((w) => /Multi-Build/.test(w.name)));
});
