import test from 'node:test';
import assert from 'node:assert/strict';
import {
  REQUIRED_D3_REVIEW_FIELDS,
  assertNoInheritedApproval,
  assertRevisionChecksum,
  buildVersionedReviewPreview,
  evaluateImportEligibility,
  weaponRevisionLink,
} from './versionedReview';

const CID_TIER_CHANGE = 'independent-14302-SUPPORT-R5';
const CID_BLOCKED = 'independent-12401-SUB_DPS-R1';
const CID_PAUSED = 'independent-13501-MAIN_DPS-R1';

test('D3: preview contains 23 in-scope records with stable IDs and all required UI fields', () => {
  const preview = buildVersionedReviewPreview();
  assert.equal(preview.records.length, 23);
  assert.equal(preview.records.filter(r => r.kind === 'CHARACTER').length, 9);
  assert.equal(preview.records.filter(r => r.kind === 'WEAPON').length, 14);
  assert.equal(preview.excludedCharacterDrafts.length, 6);
  assert.equal(new Set(preview.records.map(r => r.candidateId)).size, 23);

  for (const record of preview.records) {
    for (const field of REQUIRED_D3_REVIEW_FIELDS) {
      assert.notEqual((record as any)[field], undefined, `${record.candidateId} missing ${field}`);
    }
    assert.equal(record.previousVersion !== record.currentVersion, true);
    assert.equal(record.versionHistory.length, 2);
    assert.equal(record.versionHistory[0].checksum, record.sourceChecksum);
    assert.equal(record.versionHistory[1].checksum, record.revisedChecksum);
    assert.equal(record.currentChecksum, record.revisedChecksum);
    assert.equal(record.approval.adminDecision, 'PENDING');
    assert.equal(record.approvalCarriedOver, false);
    assert.equal(record.importEligibleNow, false);
  }
});

test('D3: revised version links source checksum to frozen B3.1 and recomputes canonical checksums', () => {
  const preview = buildVersionedReviewPreview();
  for (const record of preview.records) {
    assert.match(record.sourceChecksum, /^[a-f0-9]{64}$/);
    assert.match(record.revisedChecksum, /^[a-f0-9]{64}$/);
    assert.notEqual(record.sourceChecksum, record.revisedChecksum);
    assert.equal(record.sourceChecksum, record.frozenSourceChecksum);
  }
  const link = weaponRevisionLink(CID_TIER_CHANGE);
  const previewRecord = preview.records.find(r => r.candidateId === CID_TIER_CHANGE)!;
  assert.equal(link.sourceChecksum, link.frozenSourceChecksum);
  assert.equal(link.revisedChecksum, previewRecord.revisedChecksum);
});

test('D3: D2 checksums are accepted but old frozen checksums are rejected as superseded', () => {
  const link = weaponRevisionLink(CID_TIER_CHANGE);
  assert.doesNotThrow(() => assertRevisionChecksum(CID_TIER_CHANGE, link.revisedChecksum));
  assert.throws(() => assertRevisionChecksum(CID_TIER_CHANGE, link.sourceChecksum), /SUPERSEDED_VERSION/);
  assert.throws(() => assertRevisionChecksum(CID_TIER_CHANGE, 'f'.repeat(64)), /RECORD_CHECKSUM_MISMATCH/);
});

test('D3: an older persisted approval cannot be inherited by the revised version', () => {
  const link = weaponRevisionLink(CID_TIER_CHANGE);
  assert.doesNotThrow(() => assertNoInheritedApproval(null, link.revisedChecksum));
  assert.doesNotThrow(() => assertNoInheritedApproval({ recordSha256: link.revisedChecksum, decision: 'PENDING' }, link.revisedChecksum));
  assert.throws(() => assertNoInheritedApproval({ recordSha256: link.sourceChecksum, decision: 'APPROVE' }, link.revisedChecksum), /SUPERSEDED_REVIEW_VERSION/);
  assert.throws(() => assertNoInheritedApproval({ recordSha256: link.revisedChecksum, decision: 'APPROVE' }, link.revisedChecksum), /APPROVAL_ALREADY_BOUND/);
});

test('D3: Character tiers, Raiden pause, excluded drafts and Weapon special cases stay unchanged', () => {
  const preview = buildVersionedReviewPreview();
  const characters = preview.records.filter(r => r.kind === 'CHARACTER');
  assert.equal(characters.every(r => r.tierChanged === false), true);
  const raiden = characters.find(r => r.candidateId === 'CHAR-TIER-B2-06')!;
  assert.equal(raiden.reviewStatus, 'NEEDS_MORE_COMPARATIVE_EVIDENCE');
  assert.ok(raiden.missingEvidence.length > 0);
  assert.equal(preview.excludedCharacterDrafts.every(r => r.reviewStatus === 'NOT_READY_PENDING_REVIEW' && !r.importEligibleNow), true);

  const blocked = preview.records.find(r => r.candidateId === CID_BLOCKED)!;
  assert.equal(blocked.reviewStatus, 'NEEDS_MORE_EVIDENCE');
  assert.equal(blocked.confidence, 'LOW');
  assert.equal(blocked.missingEvidence.length, 6);
  const paused = preview.records.find(r => r.candidateId === CID_PAUSED)!;
  assert.equal(paused.reviewStatus, 'NEEDS_MORE_COMPARATIVE_EVIDENCE');
  for (const id of [CID_TIER_CHANGE, 'independent-14402-SUB_DPS-R1']) {
    const record = preview.records.find(r => r.candidateId === id)!;
    assert.equal(record.tierChanged, true);
    assert.equal((record.tierReReviewQuestion as any)?.confirmed, false);
    assert.equal(record.approval.tierReReviewConfirmed, false);
  }
});

test('D3: import eligibility rejects PENDING, negative decisions, missing prerequisites and stale versions', () => {
  const preview = buildVersionedReviewPreview();
  const record = preview.records.find(r => r.candidateId === CID_TIER_CHANGE)!;
  const valid = {
    decision: 'APPROVE',
    adminActor: 'admin-principal-real',
    decidedAt: '2026-11-20T00:00:00.000Z',
    reason: 'Explicit Admin approval after full review.',
    rightsVerified: true,
    rightsVerifiedBy: 'admin-principal-real',
    evidenceAcknowledged: true,
    tierReReviewConfirmed: true,
    recordSha256: record.revisedChecksum,
    derivation: 'INDEPENDENT',
  } as any;

  assert.equal(evaluateImportEligibility(record, valid).eligible, true);
  for (const [patch, reason] of [
    [{ decision: 'PENDING' }, 'ADMIN_DECISION_PENDING'],
    [{ decision: 'REQUEST_CHANGES' }, 'DECISION_REQUEST_CHANGES'],
    [{ decision: 'REJECT' }, 'DECISION_REJECT'],
    [{ rightsVerified: false }, 'RIGHTS_NOT_VERIFIED'],
    [{ tierReReviewConfirmed: false }, 'TIER_CHANGE_NOT_CONFIRMED'],
    [{ evidenceAcknowledged: false }, 'GAMEPLAY_EVIDENCE_NOT_ACKNOWLEDGED'],
    [{ recordSha256: record.sourceChecksum }, 'SUPERSEDED_VERSION'],
    [{ derivation: 'SOURCE_DERIVED' }, 'SOURCE_DERIVED_EXCLUDED'],
  ] as Array<[Record<string, unknown>, string]>) {
    const result = evaluateImportEligibility(record, { ...valid, ...patch });
    assert.equal(result.eligible, false);
    assert.ok(result.reasons.includes(reason), `missing ${reason}: ${JSON.stringify(result.reasons)}`);
  }

  const blocked = preview.records.find(r => r.candidateId === CID_BLOCKED)!;
  const paused = preview.records.find(r => r.candidateId === CID_PAUSED)!;
  assert.ok(evaluateImportEligibility(blocked, valid).reasons.includes('EVIDENCE_INCOMPLETE'));
  assert.ok(evaluateImportEligibility(paused, valid).reasons.includes('COMPARATIVE_EVIDENCE_INCOMPLETE'));
});
