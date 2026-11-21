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
const client_1 = require("@prisma/client");
const index_1 = require("../../index");
const dataloaders_1 = require("../../dataloaders");
const schema = (0, schema_1.makeExecutableSchema)({ typeDefs: index_1.typeDefs, resolvers: index_1.resolvers });
const prisma = new client_1.PrismaClient();
function publicContext() {
    return { prisma, dataloaders: (0, dataloaders_1.createLoaders)(prisma), user: null };
}
(0, node_test_1.test)('Phase C1 GraphQL smoke: Mitya still has two builds and one default', async () => {
    const result = await (0, graphql_1.graphql)({
        schema,
        source: `{
      character(id: "mitya") {
        id nameEn
        builds { id name isDefault reviewStatus }
        defaultBuild { id name }
      }
      characterBuilds(characterId: "mitya") { id }
    }`,
        contextValue: publicContext(),
    });
    strict_1.default.equal(result.errors, undefined, JSON.stringify(result.errors));
    const data = result.data;
    strict_1.default.equal(data.character.id, 'mitya');
    strict_1.default.equal(data.character.builds.length, 2);
    const names = data.character.builds.map((b) => b.name).sort();
    strict_1.default.deepEqual(names, ['C0 Off-Field Support / Sub DPS', 'C0 On-Field Main DPS']);
    strict_1.default.equal(data.character.builds.filter((b) => b.isDefault).length, 1);
    strict_1.default.equal(data.character.defaultBuild.id, 'legacy-mitya');
    strict_1.default.equal(data.characterBuilds.length, 2);
    strict_1.default.ok(data.character.builds.every((b) => b.reviewStatus === 'APPROVED'));
});
(0, node_test_1.test)('Phase C1 GraphQL smoke: public tier lists stay empty', async () => {
    const result = await (0, graphql_1.graphql)({
        schema,
        source: `{ characterTierRankings(gameVersion: "7.2") { id } weaponTierRanks { id } }`,
        contextValue: publicContext(),
    });
    strict_1.default.equal(result.errors, undefined, JSON.stringify(result.errors));
    const data = result.data;
    strict_1.default.deepEqual(data.characterTierRankings, []);
    strict_1.default.deepEqual(data.weaponTierRanks, []);
});
(0, node_test_1.test)('Phase C1 database remains write-free for rankings', async () => {
    const characterTier = await prisma.characterTierRanking.count();
    const weaponTier = await prisma.weaponTierRank.count();
    strict_1.default.equal(characterTier, 0);
    strict_1.default.equal(weaponTier, 0);
    await prisma.$disconnect();
});
