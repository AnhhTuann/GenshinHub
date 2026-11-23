import assert from 'node:assert/strict';
import { test } from 'node:test';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { graphql, print } from 'graphql';
import { typeDefs, resolvers } from '../../index';
import { weaponTierRankingTypeDefs } from './weaponTierRanking.schema';

const schema = makeExecutableSchema({ typeDefs, resolvers });

function context(isAdmin: boolean) {
  const calls: any[] = [];
  const prisma = {
    weaponTierRank: {
      findMany: async (args: any) => { calls.push({ op: 'findMany', args }); return []; },
      findFirst: async (args: any) => { calls.push({ op: 'findFirst', args }); return null; },
    },
    weaponTierAudit: {
      findMany: async (args: any) => { calls.push({ op: 'audit.findMany', args }); return []; },
    },
  };
  return {
    calls,
    value: {
      prisma,
      user: { isAdmin },
      dataloaders: {
        weaponTierRanksLoader: { load: async (id: string) => { calls.push({ op: 'loader', id }); return []; } },
      },
    },
  };
}

test('GraphQL surface is merged and exposes the approved query/filter set', () => {
  const sdl = print(typeDefs);
  assert.ok(weaponTierRankingTypeDefs.includes('type WeaponTierRank'));
  for (const fragment of [
    'weaponTierRanks(', 'adminWeaponTierRanks(', 'weaponTierAuditLog(',
    'upsertWeaponTierRank(', 'approveWeaponTierRank(', 'rejectWeaponTierRank(',
    'enum WeaponRankTier', 'enum WeaponRefinementContext', 'tierRanks: [WeaponTierRank!]!',
  ]) assert.ok(sdl.includes(fragment), `missing SDL fragment: ${fragment}`);
  assert.ok(typeof (resolvers as any).Weapon.tierRanks === 'function');
  assert.ok(typeof (resolvers as any).Query.weaponTierRanks === 'function');
  assert.ok(typeof (resolvers as any).Mutation.approveWeaponTierRank === 'function');

  const publicField: any = schema.getQueryType()?.getFields().weaponTierRanks;
  const names = publicField.args.map((a: any) => a.name);
  assert.equal(names.includes('reviewStatus'), false);
  assert.equal(names.includes('derivation'), false);
  assert.equal(names.includes('publishRightsVerified'), false);
  const adminNames = schema.getQueryType()?.getFields().adminWeaponTierRanks.args.map(a => a.name) ?? [];
  assert.ok(adminNames.includes('reviewStatus') && adminNames.includes('derivation'));
});

test('public weaponTierRanks query resolves with only approved independent filters', async () => {
  const ctx = context(false);
  const result = await graphql({
    schema, source: `{ weaponTierRanks(weaponId: "11401", role: SUPPORT, tier: SS) { weaponId tier reviewStatus derivation } }`,
    contextValue: ctx.value,
  });
  assert.equal(result.errors, undefined);
  const call = ctx.calls.find(c => c.op === 'findMany');
  assert.deepEqual(call.args.where, {
    reviewStatus: 'APPROVED',
    derivation: 'INDEPENDENT',
    publishRightsVerified: true,
    versionKey: '7.2',
    weaponId: '11401',
    role: 'SUPPORT',
    tier: 'SS',
  });
});

test('admin review queue is rejected for a non-admin context', async () => {
  const ctx = context(false);
  const result = await graphql({
    schema, source: `{ adminWeaponTierRanks { id reviewStatus } }`, contextValue: ctx.value,
  });
  assert.ok(result.errors && /Unauthorized/.test(result.errors[0].message));
  assert.equal(ctx.calls.length, 0);
});

test('Weapon.tierRanks uses its own DataLoader and never calls the ranking table directly', async () => {
  const ctx = context(false);
  const result = await graphql({
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
  assert.equal(result.errors, undefined);
  assert.deepEqual(ctx.calls.filter(c => c.op === 'loader').map(c => c.id), ['11401']);
  assert.equal(ctx.calls.some(c => c.op === 'findMany'), false);
});

test('approval mutation is authorization-gated at the resolver layer', async () => {
  const ctx = context(false);
  const result = await graphql({
    schema,
    source: `mutation { approveWeaponTierRank(id: "r1") { id reviewStatus } }`,
    contextValue: ctx.value,
  });
  assert.ok(result.errors && /Unauthorized/.test(result.errors[0].message));
  assert.equal(ctx.calls.length, 0);
});
