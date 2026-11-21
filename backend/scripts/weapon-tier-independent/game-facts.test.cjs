'use strict';

/**
 * Game-fact regression tests. All assertions are read-only: local genshin-db,
 * the generated fact artifact and the corrected independent drafts.
 */
const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const gdb = require('genshin-db');
const { WEAPONS } = require('./build-game-facts.cjs');

const ROOT = path.resolve(__dirname, '..', '..', '..');
const facts = require(path.join(ROOT, 'docs', 'weapon-tier-independent', 'game-facts.json'));
const candidates = require(path.join(ROOT, 'docs', 'weapon-tier-independent', 'independent-candidates.json'));
const factById = new Map(facts.records.map(r => [r.weaponId, r]));
const candidateById = new Map(candidates.records.map(r => [r.weaponId, r]));

test('game-facts artifact matches the installed genshin-db exactly', () => {
  assert.equal(facts.source, 'genshin-db@5.2.15 local package');
  assert.equal(facts.records.length, 14);
  assert.equal(Object.keys(WEAPONS).length, 14);
  for (const [id, name] of Object.entries(WEAPONS)) {
    const live = gdb.weapons(name);
    const stored = factById.get(id);
    assert.ok(stored, `missing fact record ${id}`);
    assert.equal(String(live.id), id);
    assert.equal(stored.name, live.name);
    assert.equal(stored.effectName, live.effectName);
    assert.equal(stored.subStatType, live.mainStatType);
    assert.deepEqual(stored.r1.values, live.r1.values);
    assert.deepEqual(stored.r5.values, live.r5.values);
    assert.equal(stored.r1.description, String(live.r1.description).replace(/\s+/g, ' ').trim());
    assert.equal(stored.r5.description, String(live.r5.description).replace(/\s+/g, ' ').trim());
  }
});

test('REGRESSION — Prototype Amber R5 does NOT restore Energy for the whole party', () => {
  const fact = factById.get('14406');
  assert.equal(fact.name, 'Prototype Amber');
  assert.equal(fact.effectName, 'Gilding');
  assert.deepEqual(fact.r5.values, ['6', '6%']);
  assert.match(fact.r5.description, /regenerates 6 Energy every 2s for 6s/);
  assert.match(fact.r5.description, /All party members will regenerate 6% HP every 2s/);
  const [energyClause, hpClause] = fact.r5.description.split('. ');
  assert.doesNotMatch(energyClause, /party members/i, 'Energy clause must not mention the party');
  assert.match(hpClause, /All party members/i, 'only the HP clause is party-wide');

  const draft = candidateById.get('14406');
  assert.equal(draft.refinementContext, 'R5');
  assert.match(draft.explanationVi, /6 Năng Lượng mỗi 2s trong 6s cho riêng người cầm/);
  assert.match(draft.explanationVi, /tổng 18 Năng Lượng/);
  assert.match(draft.explanationVi, /6% Max HP của chính họ mỗi 2s/);
  assert.match(draft.explanationVi, /tổng 18% Max HP mỗi thành viên/);
  assert.doesNotMatch(draft.explanationVi, /hồi năng lượng.*toàn đội|energy cho cả đội/i);
  assert.ok(draft.evidence.exactFacts.some(f => /18 Energy total/i.test(f)));
  assert.ok(draft.evidence.exactFacts.some(f => /their own Max HP/i.test(f)));
  assert.ok(draft.evidence.exactFacts.some(f => /No team-wide Energy regeneration/i.test(f)));
  assert.ok(draft.gameplayConditions.some(c => /người cầm/.test(c)));
});

test('REGRESSION — Aqua Simulacra R1 requires nearby opponents (inverted-condition guard)', () => {
  const fact = factById.get('15508');
  assert.equal(fact.name, 'Aqua Simulacra');
  assert.equal(fact.subStatType, 'FIGHT_PROP_CRITICAL_HURT');
  assert.equal(fact.effectName, 'The Cleansing Form');
  assert.deepEqual(fact.r1.values, ['16%', '20%']);
  assert.match(fact.r1.description, /HP is increased by 16%/);
  assert.match(fact.r1.description, /When there are opponents nearby/);
  assert.match(fact.r1.description, /increased by 20%/);
  assert.match(fact.r1.description, /whether the character is on-field or not/);
  assert.doesNotMatch(fact.r1.description, /no opponents|not surrounded|without opponents|away from opponents/i);

  const draft = candidateById.get('15508');
  assert.equal(draft.refinementContext, 'R1');
  assert.match(draft.explanationVi, /khi có kẻ địch ở gần/);
  assert.match(draft.explanationVi, /ngoài sân/);
  assert.match(draft.explanationVi, /20% sát thương/);
  assert.doesNotMatch(draft.explanationVi, /không có địch|không bị bao vây|khi không có kẻ địch/);
  assert.ok(draft.evidence.exactFacts.some(f => /when opponents are nearby/i.test(f)));
  assert.ok(draft.evidence.exactFacts.some(f => /NOT a 'no enemies nearby' condition/i.test(f)));
});

test('every draft cites resolvable evidence and at least one value from its own refinement', () => {
  for (const draft of candidates.records) {
    const id = draft.weaponId;
    const fact = factById.get(id);
    assert.ok(fact, `no fact record for ${id}`);
    assert.ok(draft.evidence.primaryEvidence.includes(`genshin-db://weapons/${id}`), `${id} missing primary evidence`);
    assert.ok(draft.evidence.primaryEvidence.includes(`game-facts.json#${id}`), `${id} missing local fact evidence`);
    const values = draft.refinementLevel === 5 ? fact.r5.values : fact.r1.values;
    const factsText = draft.evidence.exactFacts.join(' ');
    assert.ok(values.some(v => factsText.includes(v)), `${id} R${draft.refinementLevel} value absent from exactFacts`);
    assert.ok(draft.evidence.exactFacts.length >= 2, `${id} needs more than one exact fact`);
  }
});

test('passive trigger conditions are explicit for every conditional weapon', () => {
  const required = {
    '11401': /bạo kích|CRIT/i,
    '11403': /trúng địch|damage|80%|16s/i,
    '11418': /Tinh Thông|EM/i,
    '11512': /đòn thường|normal attack/i,
    '12401': /bạo kích|CRIT/i,
    '12502': /30% HP/i,
    '13407': /bạo kích|CRIT/i,
    '13501': /50% HP/i,
    '14302': /swap|đổi|vào sân|incoming/i,
    '14402': /ngẫu nhiên|random/i,
    '14406': /Burst|Năng Lượng Nạp/i,
    '14509': /kỹ năng|Elemental Skill/i,
    '15402': /kỹ năng|Skill/i,
    '15508': /địch|opponent/i,
  };
  for (const [id, pattern] of Object.entries(required)) {
    const draft = candidateById.get(id);
    const text = [draft.explanationVi, draft.evidence.exactFacts.join(' '), draft.gameplayConditions.join(' ')].join(' ');
    assert.match(text, pattern, `${id} passive condition not recorded`);
  }
});
