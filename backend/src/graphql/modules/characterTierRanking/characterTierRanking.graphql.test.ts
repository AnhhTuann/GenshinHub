import 'dotenv/config';
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { graphql } from 'graphql';
import { typeDefs, resolvers } from '../../index';

const schema = makeExecutableSchema({ typeDefs, resolvers });

function context(isAdmin: boolean, calls: any[]) {
  return {
    prisma: {
      characterTierRanking: {
        findMany: async (args: any) => {
          calls.push(args);
          return [];
        },
      },
    },
    dataloaders: {},
    user: { isAdmin },
  };
}

test('GraphQL public query is safe without admin context', async () => {
  const calls: any[] = [];
  const result = await graphql({
    schema,
    source: `{ characterTierRankings(gameVersion: "7.2", role: SUPPORT, constellation: C6) { id role } }`,
    contextValue: context(false, calls),
  });
  assert.equal(result.errors, undefined, JSON.stringify(result.errors));
  assert.deepEqual(calls[0].where, {
    approvalStatus: 'APPROVED',
    derivation: 'INDEPENDENT',
    gameVersion: '7.2',
    role: 'SUPPORT',
    constellation: 'C6',
  });
});

test('GraphQL admin review query rejects non-admin context', async () => {
  const calls: any[] = [];
  const result = await graphql({
    schema,
    source: `{ adminCharacterTierRankings(gameVersion: "7.2") { id approvalStatus } }`,
    contextValue: context(false, calls),
  });
  assert.ok(result.errors?.length);
  assert.match(result.errors[0].message, /Unauthorized/);
  assert.equal(calls.length, 0);
});

test('GraphQL admin review query exposes all statuses to admins', async () => {
  const calls: any[] = [];
  const result = await graphql({
    schema,
    source: `{ adminCharacterTierRankings(approvalStatus: PENDING_REVIEW) { id approvalStatus } }`,
    contextValue: context(true, calls),
  });
  assert.equal(result.errors, undefined, JSON.stringify(result.errors));
  assert.deepEqual(calls[0].where, { approvalStatus: 'PENDING_REVIEW' });
});
