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
const graphql_1 = require("graphql");
const characterTierRanking_service_1 = require("./characterTierRanking.service");
const characterTierRanking_schema_1 = require("./characterTierRanking.schema");
const index_1 = require("../../index");
const adminContext = { user: { isAdmin: true }, userId: 'admin-7' };
const publicContext = { user: { isAdmin: false } };
function makePrisma(state = {}) {
    const calls = [];
    const ranking = {
        findMany: async (args) => {
            calls.push({ op: 'findMany', args });
            return state.findMany ?? [];
        },
        findFirst: async (args) => {
            calls.push({ op: 'findFirst', args });
            return state.findFirst ?? null;
        },
        create: async (args) => {
            calls.push({ op: 'create', args });
            if (state.createError)
                throw state.createError;
            return { id: 'new-id', ...args.data };
        },
        updateMany: async (args) => {
            calls.push({ op: 'updateMany', args });
            state.findFirst = { ...state.findFirst, ...args.data };
            return { count: 1 };
        },
    };
    const character = {
        findFirst: async (args) => {
            calls.push({ op: 'character.findFirst', args });
            return state.character === undefined ? { id: args.where.id } : state.character;
        },
    };
    return { prisma: { characterTierRanking: ranking, character }, calls };
}
function baseInput(overrides = {}) {
    return {
        characterId: 'mitya',
        role: 'SUPPORT',
        tier: 'S',
        constellation: 'C6',
        gameVersion: '7.2',
        explanationVi: 'Đánh giá độc lập từ rubric và bằng chứng nội bộ.',
        sourceUrl: 'https://genshinhub.local/rubric/7.2',
        sourceName: 'GenshinHub independent rubric',
        derivation: 'SOURCE_DERIVED',
        ...overrides,
    };
}
const independentEvidence = {
    rubric: 'GenshinHub v7.2 rubric v1',
    primaryEvidence: ['genshin-db://characters/mitya', 'patch-notes://7.2'],
    reviewer: 'admin-7',
    verifiedAt: '2026-11-20',
};
(0, node_test_1.test)('Prisma schema contains the approved additive model, enums and unique key', () => {
    const schema = (0, node_fs_1.readFileSync)(node_path_1.default.resolve(__dirname, '../../../../prisma/schema.prisma'), 'utf8').replace(/\s+/g, ' ');
    for (const fragment of [
        'enum TierListRole',
        'enum TierListTier',
        'enum TierListConstellation',
        'enum TierListApprovalStatus',
        'enum TierListDerivation',
        'model CharacterTierRanking',
        'tierRankings CharacterTierRanking[]',
        '@@unique([characterId, role, constellation, gameVersion])',
    ]) {
        strict_1.default.ok(schema.includes(fragment), `missing schema fragment: ${fragment}`);
    }
});
(0, node_test_1.test)('GraphQL surface is wired and public query does not accept review filters', () => {
    strict_1.default.ok(characterTierRanking_schema_1.characterTierRankingTypeDefs.includes('type CharacterTierRanking'));
    const sdl = (0, graphql_1.print)(index_1.typeDefs);
    strict_1.default.ok(sdl.includes('characterTierRankings('));
    strict_1.default.ok(sdl.includes('adminCharacterTierRankings('));
    strict_1.default.ok(sdl.includes('approveCharacterTierRanking('));
    strict_1.default.ok(sdl.includes('enum TierListDerivation'));
});
(0, node_test_1.test)('public query hard-filters to approved independent rankings only', async () => {
    const { prisma, calls } = makePrisma();
    const service = (0, characterTierRanking_service_1.createCharacterTierRankingService)(prisma);
    await service.listPublic({
        characterId: 'mitya',
        role: 'SUPPORT',
        tier: 'S',
        constellation: 'C6',
        gameVersion: '7.2',
        limit: 999,
    });
    const call = calls.find(c => c.op === 'findMany');
    strict_1.default.ok(call);
    strict_1.default.deepEqual(call.args.where, {
        approvalStatus: 'APPROVED',
        derivation: 'INDEPENDENT',
        characterId: 'mitya',
        role: 'SUPPORT',
        tier: 'S',
        constellation: 'C6',
        gameVersion: '7.2',
    });
    strict_1.default.equal(call.args.take, 500);
    strict_1.default.equal(calls.some(c => c.op.startsWith('character.')), false);
});
(0, node_test_1.test)('public query never fabricates rows for unranked characters', async () => {
    const { prisma, calls } = makePrisma({ findMany: [] });
    const service = (0, characterTierRanking_service_1.createCharacterTierRankingService)(prisma);
    strict_1.default.deepEqual(await service.listPublic({ characterId: 'not-ranked' }), []);
    strict_1.default.equal(calls.filter(c => c.op === 'create').length, 0);
});
(0, node_test_1.test)('admin listings and all writes require admin context', async () => {
    const { prisma, calls } = makePrisma();
    const service = (0, characterTierRanking_service_1.createCharacterTierRankingService)(prisma);
    await strict_1.default.rejects(() => service.listAdmin({}, publicContext), /Unauthorized/);
    await strict_1.default.rejects(() => service.upsert(baseInput(), publicContext), /Unauthorized/);
    await strict_1.default.rejects(() => service.approve('rank-1', publicContext), /Unauthorized/);
    await strict_1.default.rejects(() => service.reject('rank-1', 'bad', publicContext), /Unauthorized/);
    strict_1.default.equal(calls.length, 0);
});
(0, node_test_1.test)('upsert creates a non-approved SOURCE_DERIVED draft', async () => {
    const { prisma, calls } = makePrisma();
    const service = (0, characterTierRanking_service_1.createCharacterTierRankingService)(prisma);
    const result = await service.upsert(baseInput(), adminContext);
    strict_1.default.equal(result.approvalStatus, 'PENDING_REVIEW');
    strict_1.default.equal(result.derivation, 'SOURCE_DERIVED');
    strict_1.default.equal(result.approvedBy, null);
    strict_1.default.equal(result.reviewedAt, null);
    const create = calls.find(c => c.op === 'create');
    strict_1.default.equal(create.args.data.approvalStatus, 'PENDING_REVIEW');
    strict_1.default.equal(create.args.data.approvedBy, null);
});
(0, node_test_1.test)('upsert rejects unsupported constellation for version 7.2', async () => {
    const { prisma } = makePrisma();
    const service = (0, characterTierRanking_service_1.createCharacterTierRankingService)(prisma);
    await strict_1.default.rejects(() => service.upsert(baseInput({ constellation: 'C3' }), adminContext), /UNSUPPORTED_CONSTELLATION/);
});
(0, node_test_1.test)('upsert requires structured evidence for INDEPENDENT derivation', async () => {
    const { prisma } = makePrisma();
    const service = (0, characterTierRanking_service_1.createCharacterTierRankingService)(prisma);
    await strict_1.default.rejects(() => service.upsert(baseInput({ derivation: 'INDEPENDENT', evidence: undefined }), adminContext), /INDEPENDENT_EVIDENCE_REQUIRED/);
    const result = await service.upsert(baseInput({ derivation: 'INDEPENDENT', evidence: independentEvidence }), adminContext);
    strict_1.default.equal(result.derivation, 'INDEPENDENT');
    strict_1.default.equal(result.approvalStatus, 'PENDING_REVIEW');
});
(0, node_test_1.test)('upsert cannot relabel a SOURCE_DERIVED row as INDEPENDENT', async () => {
    const { prisma } = makePrisma({
        findFirst: {
            id: 'rank-1',
            approvalStatus: 'NEEDS_REVIEW',
            derivation: 'SOURCE_DERIVED',
        },
    });
    const service = (0, characterTierRanking_service_1.createCharacterTierRankingService)(prisma);
    await strict_1.default.rejects(() => service.upsert(baseInput({ derivation: 'INDEPENDENT', evidence: independentEvidence }), adminContext), /SOURCE_DERIVED_DERIVATION_IMMUTABLE/);
});
(0, node_test_1.test)('research draft cannot overwrite an approved ranking', async () => {
    const { prisma } = makePrisma({
        findFirst: {
            id: 'rank-1',
            approvalStatus: 'APPROVED',
            derivation: 'INDEPENDENT',
        },
    });
    const service = (0, characterTierRanking_service_1.createCharacterTierRankingService)(prisma);
    await strict_1.default.rejects(() => service.upsert(baseInput(), adminContext), /APPROVED_RANKING_IMMUTABLE/);
});
(0, node_test_1.test)('approval requires independent pending content and explicit concurrency and checksum inputs', async () => {
    const source = makePrisma({ findFirst: { id: 'rank-1', derivation: 'SOURCE_DERIVED' } });
    await strict_1.default.rejects(() => (0, characterTierRanking_service_1.createCharacterTierRankingService)(source.prisma).approve('rank-1', adminContext), /SOURCE_DERIVED_CANNOT_BE_APPROVED/);
    const updatedAt = new Date('2026-11-20T01:00:00Z');
    const independent = makePrisma({ findFirst: {
            id: 'rank-2', derivation: 'INDEPENDENT', approvalStatus: 'PENDING_REVIEW', updatedAt,
        } });
    const service = (0, characterTierRanking_service_1.createCharacterTierRankingService)(independent.prisma);
    await strict_1.default.rejects(() => service.approve('rank-2', adminContext), /CONCURRENCY_TOKEN_REQUIRED/);
    await strict_1.default.rejects(() => service.approve('rank-2', adminContext, updatedAt.toISOString()), /APPROVAL_CHECKSUM_REQUIRED/);
    strict_1.default.equal(independent.calls.some(call => call.op === 'updateMany'), false);
});
(0, node_test_1.test)('reject stores reason and acting admin, not a request-supplied actor', async () => {
    const { prisma, calls } = makePrisma({ findFirst: { id: 'rank-3', derivation: 'INDEPENDENT', approvalStatus: 'PENDING_REVIEW', updatedAt: new Date('2026-11-20T01:00:00Z') } });
    const service = (0, characterTierRanking_service_1.createCharacterTierRankingService)(prisma);
    const result = await service.reject('rank-3', 'Evidence insufficient', adminContext);
    strict_1.default.equal(result.approvalStatus, 'REJECTED');
    strict_1.default.equal(result.rejectionReason, 'Evidence insufficient');
    strict_1.default.equal(result.approvedBy, 'admin-7');
    const update = calls.find(c => c.op === 'updateMany');
    strict_1.default.equal(update.args.data.approvedBy, 'admin-7');
});
(0, node_test_1.test)('unique-key race is reported as a clear duplicate error', async () => {
    const { prisma } = makePrisma({ createError: { code: 'P2002', meta: { target: ['key'] } } });
    const service = (0, characterTierRanking_service_1.createCharacterTierRankingService)(prisma);
    await strict_1.default.rejects(() => service.upsert(baseInput(), adminContext), /DUPLICATE_RANKING_KEY/);
});
