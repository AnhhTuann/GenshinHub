import assert from 'node:assert/strict';
import { test } from 'node:test';
import { WeaponGameDataService } from './weaponGameData.service';

const prisma = {
  weapon: {
    findUnique: async ({ where }: any) => where.id === '15514'
      ? { id: '15514', nameEn: "Astral Vulture's Crimson Plumage", nameVi: 'Vũ Khí' }
      : null,
  },
} as any;

test('weapon game data resolves from the committed snapshot', async () => {
  const service = new WeaponGameDataService(prisma);
  const data = await service.getGameData('15514');
  assert.ok(data, 'snapshot entry should exist');
  assert.equal(data.id, '15514');
  assert.equal(data.sourceId, 15514);
  assert.equal(data.nameEn, "Astral Vulture's Crimson Plumage");
  assert.ok(data.levels.length > 0);
  assert.ok(data.refinements.length > 0);
  assert.ok(data.ascension.length > 0);
});

test('unknown weapon returns null without loading game data', async () => {
  const service = new WeaponGameDataService(prisma);
  assert.equal(await service.getGameData('missing'), null);
});
