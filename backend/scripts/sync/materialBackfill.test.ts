import assert from 'node:assert/strict';
import { assertLocalWriteAllowed, costsToRows, isMoraOnlyCosts, isNewerVersion, resolveSource } from './materialBackfill';

const cost = (id: number, name: string, count: number) => ({ id, name, count });

const ascensionCosts = {
  ascend1: [cost(202, 'Mora', 20000), cost(104171, 'Prithiva Topaz Sliver', 1), cost(100023, 'Cecilia', 3)],
  ascend2: [cost(202, 'Mora', 40000), cost(104172, 'Prithiva Topaz Fragment', 3), cost(100023, 'Cecilia', 10)],
  ascend3: [cost(202, 'Mora', 60000), cost(104172, 'Prithiva Topaz Fragment', 6), cost(100023, 'Cecilia', 20)],
  ascend4: [cost(202, 'Mora', 80000), cost(104173, 'Prithiva Topaz Chunk', 3), cost(100023, 'Cecilia', 30)],
  ascend5: [cost(202, 'Mora', 100000), cost(104173, 'Prithiva Topaz Chunk', 6), cost(100023, 'Cecilia', 45)],
  ascend6: [cost(202, 'Mora', 120000), cost(104174, 'Prithiva Topaz Gemstone', 6), cost(100023, 'Cecilia', 60)],
};

const talentCosts = {
  lvl2: [cost(202, 'Mora', 12500), cost(104301, 'Teachings of Ballad', 3), cost(112008, 'Divining Scroll', 6)],
  lvl3: [cost(202, 'Mora', 17500), cost(104302, 'Guide to Ballad', 2), cost(112009, 'Sealed Scroll', 3)],
  lvl4: [cost(202, 'Mora', 25000), cost(104302, 'Guide to Ballad', 4), cost(112009, 'Sealed Scroll', 4)],
  lvl5: [cost(202, 'Mora', 30000), cost(104302, 'Guide to Ballad', 6), cost(112009, 'Sealed Scroll', 6)],
  lvl6: [cost(202, 'Mora', 37500), cost(104302, 'Guide to Ballad', 9), cost(112009, 'Sealed Scroll', 9)],
  lvl7: [cost(202, 'Mora', 120000), cost(104303, 'Philosophies of Ballad', 4), cost(112010, 'Forbidden Curse Scroll', 4), cost(113013, 'Tusk of Monoceros Caeli', 1)],
  lvl8: [cost(202, 'Mora', 260000), cost(104303, 'Philosophies of Ballad', 6), cost(112010, 'Forbidden Curse Scroll', 6), cost(113013, 'Tusk of Monoceros Caeli', 1)],
  lvl9: [cost(202, 'Mora', 450000), cost(104303, 'Philosophies of Ballad', 12), cost(112010, 'Forbidden Curse Scroll', 9), cost(113013, 'Tusk of Monoceros Caeli', 2)],
  lvl10: [cost(202, 'Mora', 700000), cost(104303, 'Philosophies of Ballad', 16), cost(112010, 'Forbidden Curse Scroll', 12), cost(113013, 'Tusk of Monoceros Caeli', 2), cost(104319, 'Crown of Insight', 1)],
};

const asc = costsToRows(ascensionCosts, 'ascension');
assert.ok(asc);
assert.equal(asc.length, 6);
assert.deepEqual(asc.map(row => row.level), ['Lv.40', 'Lv.50', 'Lv.60', 'Lv.70', 'Lv.80', 'Lv.90']);
assert.equal(asc[0].mora, 20000);
assert.deepEqual(asc[0].items[0], { materialId: '104171', count: 1 });
assert.ok(!asc[0].items.some(item => item.materialId === '202'), 'Mora must be a separate field');

const tal = costsToRows(talentCosts, 'talent');
assert.ok(tal);
assert.equal(tal.length, 9);
assert.deepEqual(tal.map(row => row.level), ['Lv.2', 'Lv.3', 'Lv.4', 'Lv.5', 'Lv.6', 'Lv.7', 'Lv.8', 'Lv.9', 'Lv.10']);
assert.equal(tal[8].mora, 700000);
assert.ok(tal[8].items.some(item => item.materialId === '104319' && item.count === 1), 'Crown must be kept at Lv.10');

const moraOnly = Object.fromEntries(
  Object.keys(ascensionCosts).map(key => [key, [cost(202, 'Mora', 20000)]]),
);
assert.equal(costsToRows(moraOnly, 'ascension'), null, 'Mora-only ascension is not usable data');
assert.equal(costsToRows(undefined, 'talent'), null);

// Manekin/Manekina: Mora-only with no `count` is a verified no-materials state,
// not merely incomplete source data.
const noMaterialsCosts = Object.fromEntries(
  Object.keys(ascensionCosts).map(key => [key, [{ id: 202, name: 'Mora' }]]),
);
assert.equal(isMoraOnlyCosts(noMaterialsCosts), true);
assert.equal(isMoraOnlyCosts(moraOnly), false, 'Mora with a count is real data, not the no-materials state');
assert.equal(isMoraOnlyCosts(ascensionCosts), false);
assert.equal(isMoraOnlyCosts(undefined), false);

assert.equal(isNewerVersion('7.2', '7.2'), false);
assert.equal(isNewerVersion('7.3', '7.2'), true);
assert.equal(isNewerVersion(null, '7.2'), false);

const charNames = ['Aether', 'Albedo', 'Manekin'];
const talentNames = ['Traveler (Anemo)', 'Traveler (Geo)', 'Albedo'];
assert.deepEqual(
  resolveSource({ id: 'traveler', nameEn: 'Traveler' }, charNames, talentNames),
  { asc: 'Aether', tal: 'Traveler (Anemo)', note: expectTravelerNote() },
);
const elemental = resolveSource({ id: 'traveler-geo', nameEn: 'Traveler (Geo)' }, charNames, talentNames);
assert.equal(elemental.asc, 'Aether');
assert.equal(elemental.tal, 'Traveler (Geo)');
const direct = resolveSource({ id: 'albedo', nameEn: 'Albedo' }, charNames, talentNames);
assert.deepEqual({ asc: direct.asc, tal: direct.tal }, { asc: 'Albedo', tal: 'Albedo' });

function expectTravelerNote(): string {
  return 'Hồ sơ Traveler legacy dùng chung chi phí đột phá Aether và chi phí thiên phú Anemo theo quy ước của dự án.';
}

const originalDbUrl = process.env.DATABASE_URL;
try {
  process.env.DATABASE_URL = 'postgresql://user:pass@prod.example.com:5432/genshinhub';
  assert.throws(() => assertLocalWriteAllowed(), /loopback/);
  process.env.DATABASE_URL = 'postgresql://user:pass@127.0.0.1:5432/genshinhub';
  assert.doesNotThrow(() => assertLocalWriteAllowed());
} finally {
  if (originalDbUrl === undefined) delete process.env.DATABASE_URL;
  else process.env.DATABASE_URL = originalDbUrl;
}

console.log('✅ materialBackfill tests passed');
