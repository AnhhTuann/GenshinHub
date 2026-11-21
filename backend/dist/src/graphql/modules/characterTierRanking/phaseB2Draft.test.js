"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const strict_1 = __importDefault(require("node:assert/strict"));
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = __importDefault(require("node:fs"));
const node_test_1 = require("node:test");
const graphql_1 = require("graphql");
const schema_1 = require("@graphql-tools/schema");
const client_1 = require("@prisma/client");
const index_1 = require("../../index");
const characterTierRanking_service_1 = require("./characterTierRanking.service");
const draftPath = node_path_1.default.resolve(__dirname, '../../../../../docs/tierlist-v7.2-audit/PHASE_B2_RANKING_DRAFTS.json');
const batch = JSON.parse(node_fs_1.default.readFileSync(draftPath, 'utf8'));
const rankings = batch.rankings;
const admin = { user: { isAdmin: true, id: 'phase-b2-validation' }, userId: 'phase-b2-validation' };
const nonAdmin = { user: { isAdmin: false } };
function toServiceInput(r) {
    return {
        characterId: r.characterId,
        role: r.role,
        tier: r.proposedTier,
        constellation: r.constellation,
        gameVersion: r.gameVersion,
        explanationVi: r.explanationVi,
        sourceUrl: r.sourceUrl,
        sourceName: r.sourceName,
        sourceId: r.sourceId,
        sourceLocale: r.sourceLocale,
        lastReviewedDate: r.lastReviewedDate,
        evidence: r.evidence,
        derivation: r.derivation,
    };
}
(0, node_test_1.test)('Phase B2 batch shape, scope and draft status', () => {
    strict_1.default.equal(batch.gameVersion, '7.2');
    strict_1.default.match(batch.batchId, /^phase-b2-independent-/);
    strict_1.default.match(batch.status, /CHUA DUOC ADMIN PHE DUYET/);
    strict_1.default.ok(rankings.length >= 10 && rankings.length <= 15);
    const required = [
        'characterId', 'characterName', 'role', 'constellation', 'proposedTier',
        'gameVersion', 'explanationVi', 'strengths', 'limitations', 'teamAssumptions',
        'evidence', 'derivation', 'approvalStatus', 'sourceUrl', 'sourceName',
    ];
    for (const r of rankings) {
        for (const key of required)
            strict_1.default.ok(r[key], `${r.characterId}/${r.role}/${r.constellation} missing ${key}`);
        strict_1.default.equal(r.derivation, 'INDEPENDENT');
        strict_1.default.equal(r.approvalStatus, 'PENDING_REVIEW');
        strict_1.default.equal(r.gameVersion, '7.2');
        strict_1.default.equal(typeof r.evidence.confidence, 'string');
        strict_1.default.ok(['HIGH', 'MEDIUM', 'LOW'].includes(r.evidence.confidence));
        strict_1.default.ok(!/genshin-builds/i.test(r.sourceName + r.sourceUrl), 'source must not be Genshin-Builds');
    }
});
(0, node_test_1.test)('Phase B2 enum values and unique ranking keys are valid', () => {
    const roles = new Set(['MAIN_DPS', 'SUB_DPS', 'SUPPORT']);
    const tiers = new Set(['SS', 'S', 'A', 'B', 'C', 'D']);
    const constellations = new Set(['C0', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6']);
    const keys = new Set();
    for (const r of rankings) {
        strict_1.default.ok(roles.has(r.role), `invalid role ${r.role}`);
        strict_1.default.ok(tiers.has(r.proposedTier), `invalid tier ${r.proposedTier}`);
        strict_1.default.ok(constellations.has(r.constellation), `invalid constellation ${r.constellation}`);
        const key = [r.characterId, r.role, r.constellation, r.gameVersion].join('|');
        strict_1.default.equal(keys.has(key), false, `duplicate key ${key}`);
        keys.add(key);
    }
    strict_1.default.equal(keys.size, rankings.length);
    // All three roles are actually covered, and C0/C6 are both represented.
    strict_1.default.deepEqual([...new Set(rankings.map((r) => r.role))].sort(), ['MAIN_DPS', 'SUB_DPS', 'SUPPORT']);
    strict_1.default.ok(rankings.some((r) => r.constellation === 'C0'));
    strict_1.default.ok(rankings.some((r) => r.constellation === 'C6'));
});
(0, node_test_1.test)('Phase B2 explanations answer all five required questions in Vietnamese', () => {
    const markers = ['Đóng góp:', 'Đề xuất', 'Điều kiện:', 'Constellation:', 'Hạn chế:'];
    for (const r of rankings) {
        for (const marker of markers) {
            strict_1.default.ok(r.explanationVi.includes(marker), `${r.characterId} missing ${marker}`);
        }
        strict_1.default.ok(r.explanationVi.length >= 350, `${r.characterId} explanation too short`);
        strict_1.default.ok(/[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(r.explanationVi));
        strict_1.default.ok(r.strengths.length >= 2 && r.limitations.length >= 2);
        strict_1.default.ok(r.teamAssumptions.length >= 2);
    }
});
(0, node_test_1.test)('Phase B2 evidence is complete and independently sourced', () => {
    for (const r of rankings) {
        const e = r.evidence;
        strict_1.default.ok(e.rubric.includes('GenshinHub Tier Rubric'));
        strict_1.default.ok(Array.isArray(e.primaryEvidence) && e.primaryEvidence.length >= 3);
        strict_1.default.ok(e.primaryEvidence.some((p) => p.includes('genshin-db')));
        strict_1.default.ok(e.reviewer.includes('GenshinHub Tier Editorial'));
        strict_1.default.ok(/^\d{4}-\d{2}-\d{2}$/.test(e.verifiedAt));
        for (const key of [
            'rubricScores', 'energyRequirements', 'reactionCompatibility',
            'damageContribution', 'teamUtility', 'constellationEffects',
            'gameplayAssumptions', 'versionNote',
        ]) {
            strict_1.default.ok(e[key], `${r.characterId} missing evidence.${key}`);
        }
        strict_1.default.deepEqual(Object.keys(e.rubricScores).sort(), ['access', 'constellation', 'evidence', 'flex', 'kit']);
    }
});
(0, node_test_1.test)('Phase B2 proposed tiers match the published rubric arithmetic', () => {
    for (const r of rankings) {
        const s = r.evidence.rubricScores;
        const score = +(0.30 * s.kit + 0.25 * s.flex + 0.20 * s.evidence + 0.15 * s.constellation + 0.10 * s.access).toFixed(1);
        strict_1.default.equal(r.rubricScore, score);
        const expected = score >= 86 ? 'SS' : score >= 76 ? 'S' : score >= 66 ? 'A' : score >= 56 ? 'B' : score >= 46 ? 'C' : 'D';
        strict_1.default.equal(r.proposedTier, expected, `${r.characterId}/${r.role}/${r.constellation}`);
    }
});
(0, node_test_1.test)('Phase B2 character IDs exist in the development database (read-only)', async () => {
    const prisma = new client_1.PrismaClient();
    try {
        const ids = [...new Set(rankings.map((r) => r.characterId))];
        const rows = await prisma.character.findMany({ where: { id: { in: ids } }, select: { id: true } });
        strict_1.default.deepEqual(rows.map((r) => r.id).sort(), ids.sort());
        const count = await prisma.characterTierRanking.count();
        strict_1.default.equal(count, 0, 'Phase B2 must not write ranking rows before Admin approval');
    }
    finally {
        await prisma.$disconnect();
    }
});
(0, node_test_1.test)('Phase B2 drafts pass the real service as PENDING_REVIEW and never auto-approve', async () => {
    const created = [];
    const prisma = {
        character: { findFirst: async () => ({ id: 'validated' }) },
        characterTierRanking: {
            findFirst: async () => null,
            create: async ({ data }) => {
                created.push(data);
                return { id: 'mock-' + created.length, ...data };
            },
            update: async () => { throw new Error('UNEXPECTED_UPDATE'); },
        },
    };
    const service = (0, characterTierRanking_service_1.createCharacterTierRankingService)(prisma);
    for (const r of rankings) {
        const saved = await service.upsert(toServiceInput(r), admin);
        strict_1.default.equal(saved.approvalStatus, 'PENDING_REVIEW');
        strict_1.default.equal(saved.derivation, 'INDEPENDENT');
        strict_1.default.equal(saved.approvedBy, null);
        strict_1.default.equal(saved.reviewedAt, null);
        strict_1.default.equal(saved.rejectionReason, null);
    }
    strict_1.default.equal(created.length, rankings.length);
});
(0, node_test_1.test)('Phase B2 draft is rejected for non-admin context', async () => {
    const prisma = {
        character: { findFirst: async () => ({ id: 'validated' }) },
        characterTierRanking: { findFirst: async () => null, create: async () => { throw new Error('UNEXPECTED_WRITE'); } },
    };
    const service = (0, characterTierRanking_service_1.createCharacterTierRankingService)(prisma);
    await strict_1.default.rejects(() => service.upsert(toServiceInput(rankings[0]), nonAdmin), /Unauthorized/);
});
(0, node_test_1.test)('Phase B2 GraphQL surface stays public-safe', async () => {
    const schema = (0, schema_1.makeExecutableSchema)({ typeDefs: index_1.typeDefs, resolvers: index_1.resolvers });
    const gql = await (0, graphql_1.graphql)({ schema, source: (0, graphql_1.getIntrospectionQuery)() });
    strict_1.default.equal(gql.errors, undefined, JSON.stringify(gql.errors));
    const introspection = gql.data;
    const query = introspection.__schema.types.find((t) => t.name === 'Query');
    const publicField = query.fields.find((f) => f.name === 'characterTierRankings');
    const publicArgs = publicField.args.map((a) => a.name);
    strict_1.default.deepEqual(publicArgs, ['characterId', 'role', 'tier', 'constellation', 'gameVersion', 'limit']);
    strict_1.default.equal(publicArgs.includes('approvalStatus'), false);
    strict_1.default.equal(publicArgs.includes('derivation'), false);
    const mutation = introspection.__schema.types.find((t) => t.name === 'Mutation');
    const names = mutation.fields.map((f) => f.name);
    for (const name of ['upsertCharacterTierRanking', 'approveCharacterTierRanking', 'rejectCharacterTierRanking']) {
        strict_1.default.ok(names.includes(name));
    }
    // SDL itself parses standalone for CI schema checks.
    const sdlOnly = (0, graphql_1.buildSchema)(`
    enum TierListRole { MAIN_DPS SUB_DPS SUPPORT }
    enum TierListTier { SS S A B C D }
    enum TierListConstellation { C0 C1 C2 C3 C4 C5 C6 }
    enum TierListApprovalStatus { PENDING_REVIEW NEEDS_REVIEW APPROVED REJECTED }
    enum TierListDerivation { INDEPENDENT SOURCE_DERIVED ADMIN_OVERRIDE }
    scalar JSON
    type Query { _ok: Boolean }
  `);
    strict_1.default.ok(sdlOnly.getQueryType());
});
