"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strict_1 = __importDefault(require("node:assert/strict"));
const node_test_1 = require("node:test");
const weaponTierRanking_service_1 = require("./weaponTierRanking.service");
const adminContext = { user: { isAdmin: true, id: 'admin-7' } };
const publicContext = { user: { isAdmin: false } };
function makePrisma(state = {}) {
    const calls = [];
    const ranks = {
        findMany: async (args) => { calls.push({ op: 'ranks.findMany', args }); return state.findMany ?? []; },
        findFirst: async (args) => { calls.push({ op: 'ranks.findFirst', args }); return state.findFirst ?? null; },
        create: async (args) => {
            calls.push({ op: 'ranks.create', args });
            if (state.createError)
                throw state.createError;
            return { id: 'rank-new', ...args.data };
        },
        updateMany: async (args) => {
            calls.push({ op: 'ranks.updateMany', args });
            if (state.findFirst && state.updateCount === undefined) {
                state.findFirst = { ...state.findFirst, ...args.data };
            }
            return { count: state.updateCount === undefined ? 1 : state.updateCount };
        },
    };
    const weapon = {
        findFirst: async (args) => {
            calls.push({ op: 'weapon.findFirst', args });
            return state.weapon === undefined ? { id: args.where.id, type: 'Sword' } : state.weapon;
        },
    };
    const audit = {
        create: async (args) => { calls.push({ op: 'audit.create', args }); return { id: 'audit-new', ...args.data }; },
        findMany: async (args) => { calls.push({ op: 'audit.findMany', args }); return state.audit ?? []; },
    };
    return { prisma: { weaponTierRank: ranks, weapon, weaponTierAudit: audit }, calls };
}
const evidence = {
    rubric: 'GenshinHub weapon rubric v1',
    primaryEvidence: ['genshin-db://weapons/11401', 'patch-notes://7.2'],
    reviewer: 'admin-7',
    verifiedAt: '2026-11-20',
};
function baseInput(overrides = {}) {
    return {
        weaponId: '11401',
        weaponType: 'Sword',
        role: 'SUPPORT',
        tier: 'SS',
        refinementContext: 'UNSPECIFIED',
        versionKey: '7.2',
        gameVersion: '7.2',
        gameVersionStatus: 'VERIFIED',
        explanationVi: 'Đánh giá độc lập theo rubric của GenshinHub, có bằng chứng và giả định rõ ràng.',
        evidence,
        rubricVersion: 'v1',
        confidence: 'HIGH',
        sourceName: 'GenshinHub independent rubric',
        derivation: 'INDEPENDENT',
        publishRightsVerified: true,
        ...overrides,
    };
}
(0, node_test_1.test)('public query hard-filters to approved independent publishable rows only', async () => {
    const { prisma, calls } = makePrisma();
    await (0, weaponTierRanking_service_1.createWeaponTierRankingService)(prisma).listPublic({
        role: 'SUPPORT', tier: 'SS', gameVersion: '7.2', limit: 999, derivation: 'SOURCE_DERIVED',
        reviewStatus: 'APPROVED',
    });
    const call = calls.find(c => c.op === 'ranks.findMany');
    strict_1.default.deepEqual(call.args.where, {
        reviewStatus: 'APPROVED',
        derivation: 'INDEPENDENT',
        publishRightsVerified: true,
        role: 'SUPPORT',
        tier: 'SS',
        gameVersion: '7.2',
    });
    strict_1.default.equal(call.args.take, 500);
});
(0, node_test_1.test)('public query never fabricates rows for an unranked weapon', async () => {
    const { prisma, calls } = makePrisma({ findMany: [] });
    const service = (0, weaponTierRanking_service_1.createWeaponTierRankingService)(prisma);
    strict_1.default.deepEqual(await service.listForWeapon('99999'), []);
    strict_1.default.equal(calls.some(c => c.op === 'ranks.create'), false);
});
(0, node_test_1.test)('admin listing, audit log and all writes require admin', async () => {
    const { prisma, calls } = makePrisma();
    const service = (0, weaponTierRanking_service_1.createWeaponTierRankingService)(prisma);
    await strict_1.default.rejects(() => service.listAdmin({}, publicContext), /Unauthorized/);
    await strict_1.default.rejects(() => service.listAuditLog('r1', publicContext), /Unauthorized/);
    await strict_1.default.rejects(() => service.upsert(baseInput(), publicContext), /Unauthorized/);
    await strict_1.default.rejects(() => service.approve('r1', publicContext), /Unauthorized/);
    await strict_1.default.rejects(() => service.reject('r1', 'bad', publicContext), /Unauthorized/);
    strict_1.default.equal(calls.length, 0);
});
(0, node_test_1.test)('validation rejects invalid role, tier, refinement and version claims', async () => {
    const { prisma } = makePrisma();
    const service = (0, weaponTierRanking_service_1.createWeaponTierRankingService)(prisma);
    await strict_1.default.rejects(() => service.upsert(baseInput({ role: 'TANK' }), adminContext), /INVALID_ROLE/);
    await strict_1.default.rejects(() => service.upsert(baseInput({ tier: 'Z' }), adminContext), /INVALID_TIER/);
    await strict_1.default.rejects(() => service.upsert(baseInput({ refinementContext: 'R9' }), adminContext), /INVALID_REFINEMENT_CONTEXT/);
    await strict_1.default.rejects(() => service.upsert(baseInput({ refinementContext: 'R5', refinementLevel: 4 }), adminContext), /REFINEMENT_LEVEL_MISMATCH/);
    await strict_1.default.rejects(() => service.upsert(baseInput({ refinementLevel: 5 }), adminContext), /REFINEMENT_LEVEL_NOT_ALLOWED/);
    await strict_1.default.rejects(() => service.upsert(baseInput({ gameVersionStatus: 'SOURCE_MISSING', gameVersion: '7.2' }), adminContext), /SOURCE_MISSING_VERSION_CONFLICT/);
    await strict_1.default.rejects(() => service.upsert(baseInput({ gameVersionStatus: 'SOURCE_MISSING', versionKey: '7.2', gameVersion: null }), adminContext), /SOURCE_MISSING_VERSION_KEY_CONFLICT/);
    await strict_1.default.rejects(() => service.upsert(baseInput({ gameVersion: null }), adminContext), /VERIFIED_VERSION_REQUIRED/);
    await strict_1.default.rejects(() => service.upsert(baseInput({ confidence: 'EXTREME' }), adminContext), /INVALID_CONFIDENCE/);
});
(0, node_test_1.test)('SOURCE_MISSING rows can be stored without being promoted to verified', async () => {
    const { prisma, calls } = makePrisma();
    const service = (0, weaponTierRanking_service_1.createWeaponTierRankingService)(prisma);
    const sourceRow = baseInput({
        derivation: 'SOURCE_DERIVED', gameVersionStatus: 'SOURCE_MISSING', versionKey: 'UNSPECIFIED',
        gameVersion: null, explanationVi: null, evidence: null, publishRightsVerified: false,
        sourceUrl: 'https://example.invalid/research', tier: 'C',
    });
    const result = await service.upsert(sourceRow, adminContext);
    const create = calls.find(c => c.op === 'ranks.create');
    strict_1.default.equal(create.args.data.gameVersionStatus, 'SOURCE_MISSING');
    strict_1.default.equal(create.args.data.gameVersion, null);
    strict_1.default.equal(create.args.data.versionKey, 'UNSPECIFIED');
    strict_1.default.equal(create.args.data.reviewStatus, 'NEEDS_REVIEW');
    strict_1.default.equal(result.approvalStatus === undefined, true);
});
(0, node_test_1.test)('independent derivation requires explanation and structured evidence', async () => {
    const { prisma } = makePrisma();
    const service = (0, weaponTierRanking_service_1.createWeaponTierRankingService)(prisma);
    await strict_1.default.rejects(() => service.upsert(baseInput({ explanationVi: null }), adminContext), /EXPLANATION_REQUIRED/);
    await strict_1.default.rejects(() => service.upsert(baseInput({ evidence: null }), adminContext), /INDEPENDENT_EVIDENCE_REQUIRED/);
    await strict_1.default.rejects(() => service.upsert(baseInput({ evidence: { rubric: 'v1' } }), adminContext), /INDEPENDENT_EVIDENCE_REQUIRED/);
});
(0, node_test_1.test)('source-derived derivation requires a source URL', async () => {
    const { prisma } = makePrisma();
    await strict_1.default.rejects(() => (0, weaponTierRanking_service_1.createWeaponTierRankingService)(prisma).upsert(baseInput({ derivation: 'SOURCE_DERIVED', sourceUrl: null }), adminContext), /SOURCE_URL_REQUIRED/);
});
(0, node_test_1.test)('upsert creates a non-approved independent draft with an audit entry', async () => {
    const { prisma, calls } = makePrisma();
    const result = await (0, weaponTierRanking_service_1.createWeaponTierRankingService)(prisma).upsert(baseInput(), adminContext);
    strict_1.default.equal(result.reviewStatus, 'PENDING_REVIEW');
    strict_1.default.equal(result.derivation, 'INDEPENDENT');
    strict_1.default.equal(result.approvedBy, null);
    strict_1.default.equal(result.reviewedAt, null);
    const create = calls.find(c => c.op === 'ranks.create');
    strict_1.default.equal(create.args.data.reviewStatus, 'PENDING_REVIEW');
    strict_1.default.equal(create.args.data.approvedBy, null);
    const audit = calls.find(c => c.op === 'audit.create');
    strict_1.default.equal(audit.args.data.action, 'CREATED');
    strict_1.default.equal(audit.args.data.actor, 'admin-7');
});
(0, node_test_1.test)('weapon must exist and its DB type must match the input type', async () => {
    const missing = makePrisma({ weapon: null });
    await strict_1.default.rejects(() => (0, weaponTierRanking_service_1.createWeaponTierRankingService)(missing.prisma).upsert(baseInput(), adminContext), /WEAPON_NOT_FOUND/);
    const wrong = makePrisma({ weapon: { id: '11401', type: 'Bow' } });
    await strict_1.default.rejects(() => (0, weaponTierRanking_service_1.createWeaponTierRankingService)(wrong.prisma).upsert(baseInput(), adminContext), /WEAPON_TYPE_MISMATCH/);
});
(0, node_test_1.test)('research row cannot be relabelled as independent or overwrite an approved ranking', async () => {
    const derived = makePrisma({ findFirst: { id: 'r1', derivation: 'SOURCE_DERIVED', reviewStatus: 'NEEDS_REVIEW' } });
    await strict_1.default.rejects(() => (0, weaponTierRanking_service_1.createWeaponTierRankingService)(derived.prisma).upsert(baseInput(), adminContext), /SOURCE_DERIVED_DERIVATION_IMMUTABLE/);
    const approved = makePrisma({ findFirst: { id: 'r1', derivation: 'INDEPENDENT', reviewStatus: 'APPROVED' } });
    await strict_1.default.rejects(() => (0, weaponTierRanking_service_1.createWeaponTierRankingService)(approved.prisma).upsert(baseInput(), adminContext), /APPROVED_RANKING_IMMUTABLE/);
});
(0, node_test_1.test)('stale concurrency token blocks an update', async () => {
    const state = makePrisma({
        findFirst: { id: 'r1', derivation: 'INDEPENDENT', reviewStatus: 'PENDING_REVIEW', updatedAt: '2026-11-20T01:00:00.000Z' },
    });
    await strict_1.default.rejects(() => (0, weaponTierRanking_service_1.createWeaponTierRankingService)(state.prisma).upsert(baseInput({ expectedUpdatedAt: '2026-11-19T01:00:00.000Z' }), adminContext), /CONCURRENT_MODIFICATION/);
});
(0, node_test_1.test)('duplicate unique key race is reported clearly', async () => {
    const { prisma } = makePrisma({ createError: { code: 'P2002', meta: { target: ['key'] } } });
    await strict_1.default.rejects(() => (0, weaponTierRanking_service_1.createWeaponTierRankingService)(prisma).upsert(baseInput(), adminContext), /DUPLICATE_RANKING_KEY/);
});
(0, node_test_1.test)('approval is restricted to independent, explained, rights-verified rows and logs the admin', async () => {
    const derived = makePrisma({ findFirst: { id: 'r1', derivation: 'SOURCE_DERIVED', reviewStatus: 'NEEDS_REVIEW', updatedAt: '2026-11-20T01:00:00.000Z' } });
    await strict_1.default.rejects(() => (0, weaponTierRanking_service_1.createWeaponTierRankingService)(derived.prisma).approve('r1', adminContext), /NON_INDEPENDENT_CANNOT_BE_APPROVED/);
    const noRights = makePrisma({ findFirst: { id: 'r2', derivation: 'INDEPENDENT', reviewStatus: 'PENDING_REVIEW', explanationVi: 'x', publishRightsVerified: false, updatedAt: '2026-11-20T01:00:00.000Z' } });
    await strict_1.default.rejects(() => (0, weaponTierRanking_service_1.createWeaponTierRankingService)(noRights.prisma).approve('r2', adminContext), /PUBLISH_RIGHTS_NOT_VERIFIED/);
    const ok = makePrisma({ findFirst: { id: 'r3', derivation: 'INDEPENDENT', reviewStatus: 'PENDING_REVIEW', explanationVi: 'x', publishRightsVerified: true, updatedAt: '2026-11-20T01:00:00.000Z' } });
    const result = await (0, weaponTierRanking_service_1.createWeaponTierRankingService)(ok.prisma).approve('r3', adminContext);
    strict_1.default.equal(result.reviewStatus, 'APPROVED');
    strict_1.default.equal(result.approvedBy, 'admin-7');
    const update = ok.calls.find(c => c.op === 'ranks.updateMany');
    strict_1.default.equal(update.args.data.reviewStatus, 'APPROVED');
    strict_1.default.equal(update.args.where.reviewStatus, 'PENDING_REVIEW');
    strict_1.default.equal(update.args.data.approvedBy, 'admin-7');
    const audit = ok.calls.find(c => c.op === 'audit.create');
    strict_1.default.equal(audit.args.data.action, 'APPROVED');
    strict_1.default.equal(audit.args.data.actor, 'admin-7');
});
(0, node_test_1.test)('approval also refuses unexplained rows and already approved rows', async () => {
    const unexplained = makePrisma({ findFirst: { id: 'r1', derivation: 'INDEPENDENT', reviewStatus: 'PENDING_REVIEW', explanationVi: null, publishRightsVerified: true, updatedAt: '2026-11-20T01:00:00.000Z' } });
    await strict_1.default.rejects(() => (0, weaponTierRanking_service_1.createWeaponTierRankingService)(unexplained.prisma).approve('r1', adminContext), /EXPLANATION_REQUIRED_FOR_APPROVAL/);
    const already = makePrisma({ findFirst: { id: 'r2', reviewStatus: 'APPROVED', updatedAt: '2026-11-20T01:00:00.000Z' } });
    await strict_1.default.rejects(() => (0, weaponTierRanking_service_1.createWeaponTierRankingService)(already.prisma).approve('r2', adminContext), /ALREADY_APPROVED/);
});
(0, node_test_1.test)('CAS failure during approval is surfaced as concurrent modification', async () => {
    const state = makePrisma({
        findFirst: { id: 'r1', derivation: 'INDEPENDENT', reviewStatus: 'PENDING_REVIEW', explanationVi: 'x', publishRightsVerified: true, updatedAt: '2026-11-20T01:00:00.000Z' },
        updateCount: 0,
    });
    await strict_1.default.rejects(() => (0, weaponTierRanking_service_1.createWeaponTierRankingService)(state.prisma).approve('r1', adminContext), /CONCURRENT_MODIFICATION/);
    strict_1.default.equal(state.calls.some(c => c.op === 'audit.create'), false);
});
(0, node_test_1.test)('reject records reason and acting admin, and cannot rewrite an approved ranking', async () => {
    const state = makePrisma({ findFirst: { id: 'r1', reviewStatus: 'PENDING_REVIEW', updatedAt: '2026-11-20T01:00:00.000Z' } });
    await strict_1.default.rejects(() => (0, weaponTierRanking_service_1.createWeaponTierRankingService)(state.prisma).reject('r1', '', adminContext), /REJECTION_REASON_REQUIRED/);
    const result = await (0, weaponTierRanking_service_1.createWeaponTierRankingService)(state.prisma).reject('r1', 'Evidence insufficient', adminContext);
    strict_1.default.equal(result.reviewStatus, 'REJECTED');
    strict_1.default.equal(result.rejectionReason, 'Evidence insufficient');
    const update = state.calls.find(c => c.op === 'ranks.updateMany');
    strict_1.default.equal(update.args.data.approvedBy, 'admin-7');
    const approved = makePrisma({ findFirst: { id: 'r2', reviewStatus: 'APPROVED', updatedAt: '2026-11-20T01:00:00.000Z' } });
    await strict_1.default.rejects(() => (0, weaponTierRanking_service_1.createWeaponTierRankingService)(approved.prisma).reject('r2', 'late', adminContext), /APPROVED_RANKING_IMMUTABLE/);
});
(0, node_test_1.test)('audit log is admin-only and passes the ranking id through', async () => {
    const { prisma, calls } = makePrisma();
    const service = (0, weaponTierRanking_service_1.createWeaponTierRankingService)(prisma);
    await service.listAuditLog('r1', adminContext, 999);
    const call = calls.find(c => c.op === 'audit.findMany');
    strict_1.default.deepEqual(call.args.where, { rankingId: 'r1' });
    strict_1.default.equal(call.args.take, 200);
});
