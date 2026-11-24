import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createLoaders } from './index';

const weapons = [
  { id: '1', nameEn: 'Alpha', nameVi: 'Anh', rarity: 5 },
  { id: '2', nameEn: 'Beta', nameVi: 'Hai', rarity: 4 },
] as any;

const sets = [
  { id: 's1', nameEn: 'Set A', nameVi: 'Bộ A', rarityList: [4, 5] },
] as any;

test('catalog lookups batch many keys into one query per field', async () => {
  const weaponCalls: string[] = [];
  const setCalls: string[] = [];
  const prisma = {
    weapon: {
      findMany: async ({ where }: any) => {
        const field = where.id ? 'id' : where.nameEn ? 'nameEn' : 'nameVi';
        weaponCalls.push(field);
        const keys = where[field].in as string[];
        return weapons.filter((row: any) => keys.includes(row[field]));
      },
    },
    artifactSet: {
      findMany: async ({ where }: any) => {
        setCalls.push('nameEn');
        const keys = where.nameEn.in as string[];
        return sets.filter((row: any) => keys.includes(row.nameEn));
      },
    },
  } as any;

  const loaders = createLoaders(prisma);
  const [alpha, beta, byId, setA, missing] = await Promise.all([
    loaders.weaponByNameEnLoader.load('Alpha'),
    loaders.weaponByNameEnLoader.load('Beta'),
    loaders.weaponByIdLoader.load('2'),
    loaders.artifactSetByNameLoader.load('Set A'),
    loaders.artifactSetByNameLoader.load('Missing set'),
  ]);

  assert.equal(alpha[0].id, '1');
  assert.equal(beta[0].id, '2');
  assert.equal(byId?.rarity, 4);
  assert.equal(setA?.id, 's1');
  assert.equal(missing, null);
  assert.deepEqual(weaponCalls, ['nameEn', 'id']);
  assert.deepEqual(setCalls, ['nameEn']);
});
