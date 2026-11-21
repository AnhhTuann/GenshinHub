const assert = require('node:assert/strict');
const { test } = require('node:test');
const { approve, verifyApproval, prepare, plan, rollbackFields, writeTarget } = require('./apply.cjs');

const draft = {
  status: 'PENDING_REVIEW', characterId: 'example', playstyle: 'Support',
  source: { kind: 'INDEPENDENT', reference: 'Internal build review 42' },
  weapons: [{ id: 'w1', isF2P: false }],
  artifacts: [['a1'], ['a1', 'a2']],
  sands: ['Energy Recharge'], goblet: ['ATK%'], circlet: ['Healing Bonus'],
  subStatsPriority: ['Energy Recharge'], talentPriority: ['Burst', 'Skill', 'Normal Attack'],
  teams: [{ name: 'Example lineup', description: 'C0 Support. Experimental lineup.', members: ['example', 'b', 'c', 'd'].map(characterId => ({ characterId })) }],
};
const catalog = {
  character: { id: 'example', weapon: 'Catalyst' },
  weapons: [{ id: 'w1', type: 'Pháp Khí', nameEn: 'Weapon', nameVi: 'Weapon VI', iconUrl: '/assets/weapons/example.webp' }],
  artifacts: ['a1', 'a2'].map(id => ({ id, nameEn: id, nameVi: id })),
  characters: ['example', 'b', 'c', 'd'].map(id => ({ id })),
};
const empty = Object.fromEntries(['bestWeapons', 'bestArtifacts', 'sands', 'goblet', 'circlet', 'subStatsPriority', 'talentPriority', 'teams'].map(field => [field, []]));

test('explicit approval binds the reviewed payload and rights reference', () => {
  assert.throws(() => verifyApproval(draft), /approval/i);
  assert.throws(() => approve(draft, 'reviewer', ''), /rights/);
  const approved = approve(draft, 'reviewer', 'Original work declaration');
  assert.equal(verifyApproval(approved).draft.playstyle, 'Support');
  assert.throws(() => verifyApproval({ ...approved, draft: { ...draft, playstyle: 'Main DPS' } }), /checksum/);
});

test('maps all fields, preserves 2+2 format and leaves unsourced tier blank', () => {
  const approved = approve(draft, 'reviewer', 'Original work declaration');
  const candidate = prepare(approved, catalog);
  assert.deepEqual(Object.keys(candidate).sort(), Object.keys(empty).sort());
  assert.equal(candidate.bestWeapons[0].iconUrl, '/assets/weapons/example.webp');
  assert.equal(candidate.bestArtifacts[1].setNameEn, 'Mix 2-Piece a1 & 2-Piece a2');
  assert.equal(candidate.teams[0].rank, '');
  assert.equal(candidate.teams[0].description, 'C0 Support. Experimental lineup.');
  assert.equal(candidate.teams[0].members.length, 4);
  assert.throws(() => prepare(approved, { ...catalog, weapons: [] }), /weapon/i);
});

test('apply is idempotent, conflicts with protected content and rollback preserves later edits', () => {
  const candidate = prepare(approve(draft, 'reviewer', 'Original work declaration'), catalog);
  assert.equal(plan(empty, candidate).changes.length, 8);
  assert.deepEqual(plan(candidate, candidate), { changes: [], protectedFields: [] });
  assert.deepEqual(plan({ ...empty, sands: ['HP%'] }, candidate).protectedFields, ['sands']);
  assert.deepEqual(rollbackFields(empty, empty, candidate), []);
  assert.equal(rollbackFields(candidate, empty, candidate).length, 8);
  assert.throws(() => rollbackFields({ ...candidate, sands: ['HP%'] }, empty, candidate), /changed/i);
});

test('write target rejects remote, unsafe options, production and mismatched DB names', () => {
  assert.throws(() => writeTarget('postgres://x@neon.tech/dev', 'dev'), /loopback/);
  assert.throws(() => writeTarget('postgres://x@localhost/dev?host=remote', 'dev'), /loopback/);
  assert.throws(() => writeTarget('postgres://x@localhost/dev', 'other'), /database/);
  assert.throws(() => writeTarget('postgres://x@localhost/prod', 'prod'), /production/);
  assert.throws(() => writeTarget('postgres://x@localhost/dev', 'dev', 'production'), /production/);
  assert.equal(writeTarget('postgres://x@localhost:5434/genshinhub', 'genshinhub').database, 'genshinhub');
});
