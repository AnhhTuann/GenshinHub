'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { verify, canonical, sha, batchHash, assertStable, FROZEN_FILES } = require('./freeze.cjs');

const ROOT = path.resolve(__dirname, '..', '..', '..');
const SHEET = path.join(ROOT, 'docs', 'weapon-tier-independent', 'decision-sheet.json');
const DECISIONS = path.join(__dirname, 'admin-decisions.input.json');

test('freeze verify passes with stable inputs and zero ranking rows', () => {
  const result = verify();
  assert.equal(result.ok, true);
  assert.deepEqual(result.issues, []);
  assert.equal(result.manifest.records.length, 14);
  assert.equal(Object.keys(result.manifest.files).length, 7);
  assert.match(result.manifest.batchSha256, /^[a-f0-9]{64}$/);
});

test('every frozen file has a sha256, size and mtime', () => {
  const { manifest } = verify();
  for (const file of FROZEN_FILES) {
    const rel = path.relative(ROOT, file);
    assert.ok(manifest.files[rel], `missing ${rel}`);
    assert.match(manifest.files[rel].sha256, /^[a-f0-9]{64}$/);
    assert.ok(manifest.files[rel].size > 0);
    assert.ok(manifest.files[rel].mtimeMs > 0);
  }
});

test('per-record hashes are unique, sorted and reproduce the batch hash', () => {
  const { manifest } = verify();
  const hashes = manifest.records.map(r => r.sha256);
  assert.equal(new Set(hashes).size, 14);
  const sorted = [...manifest.records].sort((a, b) => a.candidateId.localeCompare(b.candidateId));
  assert.deepEqual(manifest.records, sorted);
  assert.equal(batchHash(manifest.records), manifest.batchSha256);
});

test('canonical hashing is key-order independent', () => {
  assert.equal(canonical({ b: 1, a: 2 }), canonical({ a: 2, b: 1 }));
  assert.equal(sha(canonical({ b: 1, a: 2 })), sha(canonical({ a: 2, b: 1 })));
});

test('two-pass guard detects concurrent modification of any frozen file', () => {
  const before = { 'a.json': { sha256: 'a', mtimeMs: 1, size: 10 }, 'b.json': { sha256: 'b', mtimeMs: 2, size: 20 } };
  assert.equal(assertStable(before, JSON.parse(JSON.stringify(before))), true);
  const changedHash = JSON.parse(JSON.stringify(before));
  changedHash['a.json'].sha256 = 'different';
  assert.throws(() => assertStable(before, changedHash), /UNSTABLE_INPUT:a\.json/);
  const changedMtime = JSON.parse(JSON.stringify(before));
  changedMtime['b.json'].mtimeMs = 99;
  assert.throws(() => assertStable(before, changedMtime), /UNSTABLE_INPUT:b\.json/);
  const removed = { 'a.json': before['a.json'] };
  assert.throws(() => assertStable(before, removed), /FILE_SET_CHANGED/);
});

test('decision sheet contains every required B3 field and no real approval', () => {
  const sheet = JSON.parse(fs.readFileSync(SHEET, 'utf8'));
  assert.equal(sheet.records.length, 14);
  assert.equal(sheet.rightsPolicy.autoVerified, false);
  for (const r of sheet.records) {
    assert.match(r.recordSha256, /^[a-f0-9]{64}$/);
    assert.equal(r.rightsStatus.publishRightsVerified, false);
    assert.equal(r.rightsStatus.externalEditorialTextCopied, false);
    assert.equal(r.rightsStatus.originalExplanation, true);
    assert.equal(r.adminDecision, 'PENDING');
    assert.equal(r.adminActionRequired.length > 10, true);
    assert.ok(['APPROVE', 'REQUEST_CHANGES'].includes(r.reviewRecommendation));
    assert.ok(Array.isArray(r.exactGameplayAssumptions) && r.exactGameplayAssumptions.length > 0);
    assert.ok(r.tierJustification && r.tierJustification.length > 10);
    assert.ok(r.explanationVi && r.explanationVi.length > 40);
    assert.ok(r.evidence && r.evidence.rubric);
    assert.ok(r.versionKey && r.refinementLevel);
  }
});

test('decision input template has one PENDING row per frozen record', () => {
  const decisions = JSON.parse(fs.readFileSync(DECISIONS, 'utf8'));
  const { manifest } = verify();
  const frozen = new Map(manifest.records.map(r => [r.candidateId, r.sha256]));
  assert.equal(decisions.records.length, 14);
  assert.deepEqual(decisions.allowedDecisions, ['APPROVE', 'REQUEST_CHANGES', 'REJECT', 'PENDING']);
  assert.equal(decisions.decidedBy, null);
  assert.equal(decisions.decidedAt, null);
  for (const r of decisions.records) {
    assert.equal(r.decision, 'PENDING');
    assert.equal(r.adminActor, null);
    assert.equal(r.rightsVerified, false);
    assert.equal(r.tierReReviewConfirmed, false);
    assert.equal(r.recordSha256, frozen.get(r.candidateId));
  }
});
