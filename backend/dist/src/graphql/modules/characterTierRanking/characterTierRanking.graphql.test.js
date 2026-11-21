"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const strict_1 = __importDefault(require("node:assert/strict"));
const node_test_1 = require("node:test");
const schema_1 = require("@graphql-tools/schema");
const graphql_1 = require("graphql");
const index_1 = require("../../index");
const schema = (0, schema_1.makeExecutableSchema)({ typeDefs: index_1.typeDefs, resolvers: index_1.resolvers });
function context(isAdmin, calls) {
    return {
        prisma: {
            characterTierRanking: {
                findMany: async (args) => {
                    calls.push(args);
                    return [];
                },
            },
        },
        dataloaders: {},
        user: { isAdmin },
    };
}
(0, node_test_1.test)('GraphQL public query is safe without admin context', async () => {
    const calls = [];
    const result = await (0, graphql_1.graphql)({
        schema,
        source: `{ characterTierRankings(gameVersion: "7.2", role: SUPPORT, constellation: C6) { id role } }`,
        contextValue: context(false, calls),
    });
    strict_1.default.equal(result.errors, undefined, JSON.stringify(result.errors));
    strict_1.default.deepEqual(calls[0].where, {
        approvalStatus: 'APPROVED',
        derivation: 'INDEPENDENT',
        gameVersion: '7.2',
        role: 'SUPPORT',
        constellation: 'C6',
    });
});
(0, node_test_1.test)('GraphQL admin review query rejects non-admin context', async () => {
    const calls = [];
    const result = await (0, graphql_1.graphql)({
        schema,
        source: `{ adminCharacterTierRankings(gameVersion: "7.2") { id approvalStatus } }`,
        contextValue: context(false, calls),
    });
    strict_1.default.ok(result.errors?.length);
    strict_1.default.match(result.errors[0].message, /Unauthorized/);
    strict_1.default.equal(calls.length, 0);
});
(0, node_test_1.test)('GraphQL admin review query exposes all statuses to admins', async () => {
    const calls = [];
    const result = await (0, graphql_1.graphql)({
        schema,
        source: `{ adminCharacterTierRankings(approvalStatus: PENDING_REVIEW) { id approvalStatus } }`,
        contextValue: context(true, calls),
    });
    strict_1.default.equal(result.errors, undefined, JSON.stringify(result.errors));
    strict_1.default.deepEqual(calls[0].where, { approvalStatus: 'PENDING_REVIEW' });
});
