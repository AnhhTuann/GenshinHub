const { test } = require('node:test');
const assert = require('node:assert/strict');
const { audit, normalize, validPopularity } = require('./audit.cjs');

const source = {
  id: 'example', name: 'Example', element: 'Electro', weapon_type: 'Catalyst',
  build: {
    weapons: ['First', 'Alternative'],
    artifacts: [['One'], ['One', 'Two']],
    main_stats: { sands: ['ATK%'], goblet: ['Electro DMG Bonus'], circlet: ['CRIT Rate'] },
    sub_stats: ['CRIT Rate', 'CRIT DMG'],
    talent_priority: ['Skill', 'Burst', 'Normal Attack'],
  },
  teams: [{ name: 'Lineup', characters: ['Example', 'Two', 'Three', 'Four'] }],
};

const character = {
  id: 'example', nameEn: 'Example', element: 'Electro', weapon: 'Catalyst',
  bestWeapons: [{ weaponId: '2' }], bestArtifacts: [], teams: [],
  sands: ['ATK%'], goblet: [], circlet: [], subStatsPriority: [], talentPriority: [],
};
const catalog = {
  characters: [character, ...['Two', 'Three', 'Four'].map(nameEn => ({ id: nameEn.toLowerCase(), nameEn }))],
  weapons: [{ id: '1', nameEn: 'First', type: 'Pháp Khí' }, { id: '2', nameEn: 'Alternative', type: 'Catalyst' }],
  artifacts: [{ id: '1', nameEn: 'One' }, { id: '2', nameEn: 'Two' }],
};

test('preserves editorial order and independent artifact alternatives', () => {
  const data = normalize(source, 'example');
  assert.deepEqual(data.weapons, ['First', 'Alternative']);
  assert.deepEqual(data.artifacts.map(entry => entry.pieces), [[4], [2, 2]]);
  assert.equal(data.statistics.sands[0], 'ATK%');
  assert.equal(data.teams[0].members.length, 4);
});

test('counts matched catalog entries and previews while preserving admin fields', () => {
  const result = audit(normalize(source, 'example'), character, catalog);
  assert.deepEqual(result.matched, { weapons: 2, artifacts: 2, teams: 1 });
  assert.equal(result.fields.bestWeapons, 'PROTECTED_DIFFERENT');
  assert.equal(result.fields.sands, 'PROTECTED_SAME');
  assert.equal(result.fields.teams, 'EMPTY_WITH_CANDIDATES');
  assert.deepEqual(character.bestWeapons, [{ weaponId: '2' }]);
});

test('fails closed on wrong ID, duplicate options, malformed teams and impossible popularity', () => {
  assert.throws(() => normalize(source, 'other'), /identity/);
  assert.throws(() => normalize({ ...source, teams: [{ name: 'Invalid', characters: ['Example', 'Example', 'Three', 'Four'] }] }, 'example'), /team/);
  assert.throws(() => normalize({ ...source, build: { ...source.build, weapons: ['First', 'First'] } }, 'example'), /duplicate/);
  for (const value of [478, -1, null, '52', NaN, Infinity]) assert.equal(validPopularity(value), false);
  for (const value of [0, 52, 100]) assert.equal(validPopularity(value), true);
});

test('unmatched or ambiguous entries require review', () => {
  const result = audit(normalize(source, 'example'), character, {
    ...catalog, weapons: [{ ...catalog.weapons[0], type: 'Sword' }, catalog.weapons[1]],
    artifacts: [...catalog.artifacts, { id: '3', nameEn: 'One' }],
    characters: catalog.characters.slice(0, -1),
  });
  assert.deepEqual(result.matched, { weapons: 1, artifacts: 0, teams: 0 });
  assert.equal(result.review.length, 4);
});

test('the public adapter keeps provenance, validates the response and observes long retry limits', async t => {
  const { lookupCharacter } = require('./genshin-builds.cjs');
  const fetch = t.mock.method(globalThis, 'fetch', async () => Response.json(source, { headers: { ETag: '"fixture"' } }));
  const result = await lookupCharacter('example');
  assert.equal(result.provenance.etag, '"fixture"');
  assert.equal(result.provenance.sourceVersion, null);
  assert.match(result.provenance.sha256, /^[a-f0-9]{64}$/);
  assert.equal(fetch.mock.calls[0].arguments[0].href, 'https://genshin-builds.com/api/genshin/character?id=example&lang=english');
  fetch.mock.mockImplementation(async () => new Response('', { status: 429, headers: { 'Retry-After': '60' } }));
  await assert.rejects(lookupCharacter('example'), /HTTP 429/);
  assert.equal(fetch.mock.callCount(), 2);
  await assert.rejects(lookupCharacter('../example'), /explicit/);
  assert.equal(fetch.mock.callCount(), 2);
});
