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
const migrationDir = node_path_1.default.resolve(__dirname, '../../../../prisma/migrations/20261120151000_add_character_tier_rankings');
const sql = (0, node_fs_1.readFileSync)(node_path_1.default.join(migrationDir, 'migration.sql'), 'utf8');
const lock = (0, node_fs_1.readFileSync)(node_path_1.default.resolve(__dirname, '../../../../prisma/migrations/migration_lock.toml'), 'utf8');
(0, node_test_1.test)('migration is additive and stays inside the approved scope', () => {
    strict_1.default.ok(lock.includes('provider = "postgresql"'));
    const forbidden = [
        /\bDROP\s+(TABLE|TYPE|INDEX|COLUMN)\b/i,
        /^\s*DELETE\s+FROM\b/im,
        /^\s*UPDATE\s+/im,
        /\bTRUNCATE\b/i,
        /ALTER\s+TABLE\s+"Character"/i,
        /ALTER\s+TABLE\s+"TierRank"/i,
    ];
    for (const pattern of forbidden) {
        strict_1.default.equal(pattern.test(sql), false, `forbidden SQL matched: ${pattern}`);
    }
});
(0, node_test_1.test)('migration creates exactly the approved ranking objects', () => {
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
        strict_1.default.ok(sql.includes(fragment), `missing migration fragment: ${fragment}`);
    }
});
