"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strict_1 = __importDefault(require("node:assert/strict"));
const node_test_1 = require("node:test");
const schema_1 = require("@graphql-tools/schema");
const graphql_1 = require("graphql");
const index_1 = require("../../index");
const weaponTierRanking_schema_1 = require("./weaponTierRanking.schema");
const schema = (0, schema_1.makeExecutableSchema)({ typeDefs: index_1.typeDefs, resolvers: index_1.resolvers });
function context(isAdmin) {
    const calls = [];
    const prisma = {
        weaponTierRank: {
            findMany: async (args) => { calls.push({ op: 'findMany', args }); return []; },
            findFirst: async (args) => { calls.push({ op: 'findFirst', args }); return null; },
        },
        weaponTierAudit: {
            findMany: async (args) => { calls.push({ op: 'audit.findMany', args }); return []; },
        },
    };
    return {
        calls,
        value: {
            prisma,
            user: { isAdmin },
            dataloaders: {
                weaponTierRanksLoader: { load: async (id) => { calls.push({ op: 'loader', id }); return []; } },
            },
        },
    };
}
(0, node_test_1.test)('GraphQL surface is merged and exposes the approved query/filter set', () => {
    const sdl = (0, graphql_1.print)(index_1.typeDefs);
    strict_1.default.ok(weaponTierRanking_schema_1.weaponTierRankingTypeDefs.includes('type WeaponTierRank'));
    for (const fragment of [
        'weaponTierRanks(', 'adminWeaponTierRanks(', 'weaponTierAuditLog(',
        'upsertWeaponTierRank(', 'approveWeaponTierRank(', 'rejectWeaponTierRank(',
        'enum WeaponRankTier', 'enum WeaponRefinementContext', 'tierRanks: [WeaponTierRank!]!',
    ])
        strict_1.default.ok(sdl.includes(fragment), `missing SDL fragment: ${fragment}`);
    strict_1.default.ok(typeof index_1.resolvers.Weapon.tierRanks === 'function');
    strict_1.default.ok(typeof index_1.resolvers.Query.weaponTierRanks === 'function');
    strict_1.default.ok(typeof index_1.resolvers.Mutation.approveWeaponTierRank === 'function');
    const publicField = schema.getQueryType()?.getFields().weaponTierRanks;
    const names = publicField.args.map((a) => a.name);
    strict_1.default.equal(names.includes('reviewStatus'), false);
    strict_1.default.equal(names.includes('derivation'), false);
    strict_1.default.equal(names.includes('publishRightsVerified'), false);
    const adminNames = schema.getQueryType()?.getFields().adminWeaponTierRanks.args.map(a => a.name) ?? [];
    strict_1.default.ok(adminNames.includes('reviewStatus') && adminNames.includes('derivation'));
});
(0, node_test_1.test)('public weaponTierRanks query resolves with only approved independent filters', async () => {
    const ctx = context(false);
    const result = await (0, graphql_1.graphql)({
        schema, source: `{ weaponTierRanks(weaponId: "11401", role: SUPPORT, tier: SS) { weaponId tier reviewStatus derivation } }`,
        contextValue: ctx.value,
    });
    strict_1.default.equal(result.errors, undefined);
    const call = ctx.calls.find(c => c.op === 'findMany');
    strict_1.default.deepEqual(call.args.where, {
        reviewStatus: 'APPROVED',
        derivation: 'INDEPENDENT',
        publishRightsVerified: true,
        versionKey: '7.2',
        weaponId: '11401',
        role: 'SUPPORT',
        tier: 'SS',
    });
});
(0, node_test_1.test)('admin review queue is rejected for a non-admin context', async () => {
    const ctx = context(false);
    const result = await (0, graphql_1.graphql)({
        schema, source: `{ adminWeaponTierRanks { id reviewStatus } }`, contextValue: ctx.value,
    });
    strict_1.default.ok(result.errors && /Unauthorized/.test(result.errors[0].message));
    strict_1.default.equal(ctx.calls.length, 0);
});
(0, node_test_1.test)('Weapon.tierRanks uses its own DataLoader and never calls the ranking table directly', async () => {
    const ctx = context(false);
    const result = await (0, graphql_1.graphql)({
        schema,
        source: `{ weapon(id: "11401") { id tier tierRanks { weaponId reviewStatus } } }`,
        contextValue: {
            ...ctx.value,
            prisma: {
                weapon: { findUnique: async () => ({ id: '11401', tier: null }) },
                weaponTierRank: { findMany: async () => { throw new Error('must not query directly'); } },
            },
        },
    });
    strict_1.default.equal(result.errors, undefined);
    strict_1.default.deepEqual(ctx.calls.filter(c => c.op === 'loader').map(c => c.id), ['11401']);
    strict_1.default.equal(ctx.calls.some(c => c.op === 'findMany'), false);
});
(0, node_test_1.test)('approval mutation is authorization-gated at the resolver layer', async () => {
    const ctx = context(false);
    const result = await (0, graphql_1.graphql)({
        schema,
        source: `mutation { approveWeaponTierRank(id: "r1") { id reviewStatus } }`,
        contextValue: ctx.value,
    });
    strict_1.default.ok(result.errors && /Unauthorized/.test(result.errors[0].message));
    strict_1.default.equal(ctx.calls.length, 0);
});
