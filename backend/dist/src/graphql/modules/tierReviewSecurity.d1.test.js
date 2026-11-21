"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strict_1 = __importDefault(require("node:assert/strict"));
const node_test_1 = require("node:test");
const tierReviewSecurity_1 = require("./tierReviewSecurity");
const characterTierRanking_service_1 = require("./characterTierRanking/characterTierRanking.service");
const weaponTierRanking_service_1 = require("./weaponTierRanking/weaponTierRanking.service");
const realAdmin = { user: { isAdmin: true }, adminActor: 'operator-42', isAdmin: true };
(0, node_test_1.test)('D1: actor is derived from the server context, never from JSON actor fields', () => {
    strict_1.default.equal((0, tierReviewSecurity_1.requireAdminActor)(realAdmin), 'operator-42');
    for (const fake of ['admin', 'admin-key', 'system', 'automation', 'anonymous', '']) {
        strict_1.default.throws(() => (0, tierReviewSecurity_1.requireAdminActor)({ isAdmin: true, adminActor: fake }), /ADMIN_ACTOR_REQUIRED/);
    }
    strict_1.default.throws(() => (0, tierReviewSecurity_1.requireAdminActor)({ user: { isAdmin: false } }), /Unauthorized/);
    strict_1.default.throws(() => (0, tierReviewSecurity_1.requireAdminActor)({}), /Unauthorized/);
});
(0, node_test_1.test)('D1: content checksums are stable under key order and ignore review metadata', () => {
    const a = { b: 2, a: [1, { z: 3, y: 4 }] };
    const b = { a: [1, { y: 4, z: 3 }], b: 2 };
    strict_1.default.equal((0, tierReviewSecurity_1.canonicalSha256)(a), (0, tierReviewSecurity_1.canonicalSha256)(b));
    const row = {
        characterId: 'xiangling', role: 'SUB_DPS', tier: 'S', constellation: 'C0',
        gameVersion: '7.2', explanationVi: 'x', derivation: 'INDEPENDENT',
        evidence: { rubric: 'r', primaryEvidence: ['e'], auditLog: [{ action: 'APPROVED' }], rightsVerified: true, rightsNote: 'n' },
    };
    const withAudit = (0, tierReviewSecurity_1.characterRankingContentChecksum)(row);
    const withoutAudit = (0, tierReviewSecurity_1.characterRankingContentChecksum)({
        ...row,
        evidence: { rubric: 'r', primaryEvidence: ['e'] },
    });
    strict_1.default.equal(withAudit, withoutAudit, 'audit/rights metadata must not change the content checksum');
    strict_1.default.notEqual(withAudit, (0, tierReviewSecurity_1.characterRankingContentChecksum)({ ...row, tier: 'SS' }));
});
(0, node_test_1.test)('D1: character approve refuses content changed after review', async () => {
    const stored = {
        id: 'r1', approvalStatus: 'PENDING_REVIEW', derivation: 'INDEPENDENT',
        explanationVi: 'vi explanation', updatedAt: new Date('2026-11-20T01:00:00Z'),
        evidence: { checksum: 'expected', rubric: 'r', primaryEvidence: ['e'] },
    };
    const prisma = {
        characterTierRanking: {
            findFirst: async () => ({ ...stored, tier: 'SS' }), // tier drift vs recorded checksum
        },
    };
    await strict_1.default.rejects(() => (0, characterTierRanking_service_1.createCharacterTierRankingService)(prisma).approve('r1', realAdmin, '2026-11-20T01:00:00.000Z', 'expected'), /CONTENT_CHANGED_AFTER_REVIEW/);
});
(0, node_test_1.test)('D1: weapon approve refuses content changed after review', async () => {
    const row = {
        id: 'w1', reviewStatus: 'PENDING_REVIEW', derivation: 'INDEPENDENT',
        explanationVi: 'vi', publishRightsVerified: true, sourceChecksum: 'a'.repeat(64),
        updatedAt: new Date('2026-11-20T01:00:00Z'),
        evidence: { approvalChecksum: 'stored', rubric: 'r', primaryEvidence: ['e'] },
    };
    const prisma = { weaponTierRank: { findFirst: async () => ({ ...row, tier: 'A' }) } };
    // Recompute stored checksum to the CURRENT content so only the expectedChecksum
    // binding is under test; then corrupt content and verify CONTENT_CHANGED fires.
    const currentChecksum = (0, tierReviewSecurity_1.weaponRankingContentChecksum)(row);
    const corrupted = { ...row, tier: 'A', evidence: { ...row.evidence, approvalChecksum: currentChecksum } };
    const prisma2 = { weaponTierRank: { findFirst: async () => corrupted } };
    await strict_1.default.rejects(() => (0, weaponTierRanking_service_1.createWeaponTierRankingService)(prisma2).approve('w1', realAdmin, '2026-11-20T01:00:00.000Z', 'a'.repeat(64)), /CONTENT_CHANGED_AFTER_REVIEW/);
    // keep prisma referenced so the first mock is not dead code in lint
    strict_1.default.ok(prisma);
});
