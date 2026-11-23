import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createLoaders } from '../../dataloaders';

test('weapon tier DataLoader loads only public rankings and batches by weapon ID', async () => {
  const calls: any[] = [];
  const prisma: any = {
    weaponTierRank: {
      findMany: async (args: any) => {
        calls.push(args);
        return [
          { id: 'r1', weaponId: '11401', tier: 'SS', reviewStatus: 'APPROVED' },
          { id: 'r2', weaponId: '11512', tier: 'S', reviewStatus: 'APPROVED' },
          { id: 'r3', weaponId: '11512', tier: 'S', reviewStatus: 'APPROVED' },
        ];
      },
    },
  };
  const loaders = createLoaders(prisma);
  const [a, b, c] = await Promise.all([
    loaders.weaponTierRanksLoader.load('11401'),
    loaders.weaponTierRanksLoader.load('11512'),
    loaders.weaponTierRanksLoader.load('11401'),
  ]);
  assert.equal(calls.length, 1, 'three loads must collapse to one batched query');
  assert.deepEqual(calls[0].where, {
    weaponId: { in: ['11401', '11512'] },
    derivation: 'INDEPENDENT',
    reviewStatus: 'APPROVED',
    publishRightsVerified: true,
    versionKey: '7.2',
  });
  assert.equal(a.length, 1);
  assert.equal(b.length, 2);
  assert.equal(a, c, 'cached key returns the identical array instance');
});

test('weapon tier DataLoader never exposes drafts; missing weapons return empty arrays', async () => {
  const queries: any[] = [];
  const prisma: any = {
    weaponTierRank: { findMany: async (args: any) => { queries.push(args); return []; } },
  };
  const loaders = createLoaders(prisma);
  assert.deepEqual(await loaders.weaponTierRanksLoader.load('not-ranked'), []);
  assert.deepEqual(queries[0].where.derivation, 'INDEPENDENT');
  assert.deepEqual(queries[0].where.reviewStatus, 'APPROVED');
  assert.equal(queries[0].where.publishRightsVerified, true);
});
