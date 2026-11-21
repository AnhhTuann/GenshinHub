'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { validateCandidate, sentenceCount, ISSUE_CODES } = require('./build-independent.cjs');

const ROOT = path.resolve(__dirname, '..', '..', '..');
const ARTIFACT = JSON.parse(fs.readFileSync(path.join(ROOT, 'docs', 'weapon-tier-independent', 'independent-candidates.json'), 'utf8'));

const weapon = { id: '11401', nameEn: 'Favonius Sword', type: 'Kiếm Đơn', rarity: 4, tier: null, role: null };
const weapons = new Map([[weapon.id, weapon]]);
const base = {
  weaponId: '11401',
  role: 'SUPPORT',
  tier: 'SS',
  oldTier: 'SS',
  tierReason: 'SS giữ nguyên vì sinh hạt ER hoạt động ngay ở R1.',
  gameplayConditions: ['có tỷ lệ bạo kích đủ dùng', 'phải ra sân để gây bạo kích'],
  sensitivity: 'Nếu không đạt crit rate thì giá trị giảm.',
  refinementContext: 'R1',
  refinementLevel: 1,
  gameVersion: '7.2',
  explanationVi: 'Câu một đủ ý. Câu hai nêu cơ chế. Câu ba nêu điều kiện.',
  evidence: { rubric: 'v1', primaryEvidence: ['genshin-db://weapons/11401'], reviewer: 'admin', verifiedAt: '2026-11-20' },
  sourceName: 'GenshinHub independent rubric',
  sourceUrl: null,
  reviewStatus: 'PENDING_REVIEW',
  derivation: 'INDEPENDENT',
  publishRightsVerified: false,
};
const codesFor = (overrides = {}, opts = {}) => validateCandidate(
  { ...base, ...overrides }, weapons, new Set(), '7.2', 'Kiếm Đơn', opts.auditCount ?? 0,
).map(i => i.code);

test('validation covers all nineteen required rules', () => {
  assert.equal(ISSUE_CODES.length, 19);
  assert.deepEqual(codesFor(), []);
  assert.ok(codesFor({ weaponId: '99999' }).includes('WEAPON_ID_MISSING'));
  assert.ok(codesFor({ weaponId: '99999' }).includes('ORPHAN_RECORD'));
  assert.ok(codesFor({}, { auditCount: 1 }).includes('AUDIT_LOG_INCONSISTENT'));
  assert.ok(codesFor({ weaponType: 'BOW' }).includes('TYPE_MISMATCH') === false); // type comes from expectedType, not candidate
  assert.ok(codesFor({ role: 'TANK' }).includes('INVALID_ROLE'));
  assert.ok(codesFor({ tier: 'Z' }).includes('INVALID_TIER'));
  assert.ok(codesFor({ refinementContext: 'R6' }).includes('INVALID_REFINEMENT'));
  assert.ok(codesFor({ refinementContext: 'R5', refinementLevel: 4 }).includes('INVALID_REFINEMENT'));
  assert.ok(codesFor({ gameVersion: '7.1' }).includes('INVALID_VERSION'));
  assert.ok(codesFor({ reviewStatus: 'APPROVED' }).includes('BAD_APPROVAL_STATUS'));
  assert.ok(codesFor({ sourceName: null }).includes('SOURCE_PROVENANCE_MISSING'));
  assert.ok(codesFor({ publishRightsVerified: true }).includes('PUBLIC_VISIBILITY_LEAK'));
  assert.ok(codesFor({ explanationVi: 'Một câu duy nhất.' }).includes('EXPLANATION_INCOMPLETE'));
  assert.ok(codesFor({ derivation: 'SOURCE_DERIVED' }).includes('NOT_INDEPENDENT'));
  assert.ok(codesFor({ sourceUrl: 'https://genshin-builds.com/en/tier-list-weapons' }).includes('NOT_INDEPENDENT'));
  assert.ok(codesFor({ oldTier: 'Z' }).includes('INVALID_OLD_TIER'));
  assert.ok(codesFor({ tierReason: '' }).includes('TIER_REASON_MISSING'));
  assert.ok(codesFor({ gameplayConditions: [] }).includes('GAMEPLAY_CONDITIONS_MISSING'));
  assert.ok(codesFor({ sensitivity: '' }).includes('SENSITIVITY_MISSING'));
});

test('duplicate logical key and admin override are detected', () => {
  const seen = new Set([`11401|SUPPORT|7.2|R1`]);
  assert.ok(validateCandidate(base, weapons, seen, '7.2', 'Kiếm Đơn', 0).some(i => i.code === 'DUPLICATE_RANKING'));
  const overridden = new Map([['11401', { ...weapon, tier: 'SS' }]]);
  assert.ok(validateCandidate(base, overridden, new Set(), '7.2', 'Kiếm Đơn', 0).some(i => i.code === 'ADMIN_CONFLICT'));
});

test('sentence counter reads Vietnamese punctuation', () => {
  assert.equal(sentenceCount('Một. Hai. Ba.'), 3);
  assert.equal(sentenceCount(''), 0);
});

test('artifact is a small independent, unapproved, non-public batch', () => {
  assert.ok(ARTIFACT.records.length >= 10 && ARTIFACT.records.length <= 15);
  assert.equal(ARTIFACT.validation.ok, true);
  assert.ok(ARTIFACT.records.every(r => r.derivation === 'INDEPENDENT'));
  assert.ok(ARTIFACT.records.every(r => r.reviewStatus === 'PENDING_REVIEW'));
  assert.ok(ARTIFACT.records.every(r => r.publishRightsVerified === false));
  assert.ok(ARTIFACT.records.every(r => r.sourceUrl === null));
  assert.ok(ARTIFACT.records.every(r => r.approvedBy === null && r.reviewedAt === null));
  assert.equal(new Set(ARTIFACT.records.map(r => r.logicalKey)).size, ARTIFACT.records.length);
  assert.ok(new Set(ARTIFACT.records.map(r => r.weaponType)).size === 5);
  assert.ok(new Set(ARTIFACT.records.map(r => r.role)).size === 3);
  assert.ok(ARTIFACT.records.some(r => r.refinementContext === 'R5'));
  assert.ok(ARTIFACT.records.every(r => r.tier !== 'D'));
  assert.equal(ARTIFACT.records.some(r => r.weaponId === '13427'), false, 'disputed Prospector Drill excluded');
});

test('every candidate stores oldTier, a reason, gameplay conditions and sensitivity', () => {
  for (const record of ARTIFACT.records) {
    assert.ok(['SS', 'S', 'A', 'B', 'C', 'D'].includes(record.oldTier), `${record.id} has no oldTier`);
    assert.ok(record.tierReason.length > 20, `${record.id} has no tier reason`);
    assert.ok(Array.isArray(record.gameplayConditions) && record.gameplayConditions.length > 0);
    assert.ok(record.sensitivity.length > 20, `${record.id} has no sensitivity analysis`);
    assert.equal(record.tierChanged, record.oldTier !== record.tier);
  }
  const changed = ARTIFACT.records.filter(r => r.tierChanged).map(r => `${r.weaponId}:${r.oldTier}->${r.tier}`);
  assert.deepEqual(changed.sort(), ['14302:SS->S', '14402:S->A']);
  assert.equal(ARTIFACT.counts.tierChanges, 2);
});

test('no candidate is a relabelled research record', () => {
  const research = JSON.parse(fs.readFileSync(path.join(ROOT, 'docs', 'weapon-tier-audit', 'snapshot-weapon-tier.draft.json'), 'utf8'));
  const researchTexts = new Set(research.records.map(r => r.explanationVi).filter(Boolean));
  for (const record of ARTIFACT.records) {
    assert.equal(researchTexts.has(record.explanationVi), false);
    assert.ok(!/genshin-builds|source.?derived/i.test(record.explanationVi));
  }
});
