import 'dotenv/config';
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { graphql } from 'graphql';
import { PrismaClient } from '@prisma/client';
import { typeDefs, resolvers } from '../../index';
import { createLoaders } from '../../dataloaders';

const schema = makeExecutableSchema({ typeDefs, resolvers });
const prisma = new PrismaClient();

function publicContext() {
  return { prisma, dataloaders: createLoaders(prisma), user: null };
}

test('Phase C1 GraphQL smoke: Mitya still has two builds and one default', async () => {
  const result = await graphql({
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
  assert.equal(result.errors, undefined, JSON.stringify(result.errors));
  const data: any = result.data;
  assert.equal(data.character.id, 'mitya');
  assert.equal(data.character.builds.length, 2);
  const names = data.character.builds.map((b: any) => b.name).sort();
  assert.deepEqual(names, ['C0 Off-Field Support / Sub DPS', 'C0 On-Field Main DPS']);
  assert.equal(data.character.builds.filter((b: any) => b.isDefault).length, 1);
  assert.equal(data.character.defaultBuild.id, 'legacy-mitya');
  assert.equal(data.characterBuilds.length, 2);
  assert.ok(data.character.builds.every((b: any) => b.reviewStatus === 'APPROVED'));
});

test('Phase C1 GraphQL smoke: public tier lists stay empty', async () => {
  const result = await graphql({
    schema,
    source: `{ characterTierRankings(gameVersion: "7.2") { id } weaponTierRanks { id } }`,
    contextValue: publicContext(),
  });
  assert.equal(result.errors, undefined, JSON.stringify(result.errors));
  const data: any = result.data;
  assert.deepEqual(data.characterTierRankings, []);
  assert.deepEqual(data.weaponTierRanks, []);
});

test('Phase C1 database remains write-free for rankings', async () => {
  const characterTier = await (prisma as any).characterTierRanking.count();
  const weaponTier = await (prisma as any).weaponTierRank.count();
  assert.equal(characterTier, 0);
  assert.equal(weaponTier, 0);
  await prisma.$disconnect();
});
