"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = __importDefault(require("node:test"));
const strict_1 = __importDefault(require("node:assert/strict"));
const versionedReview_1 = require("./versionedReview");
const CID_TIER_CHANGE = 'independent-14302-SUPPORT-R5';
const CID_BLOCKED = 'independent-12401-SUB_DPS-R1';
const CID_PAUSED = 'independent-13501-MAIN_DPS-R1';
(0, node_test_1.default)('D3: preview contains 23 in-scope records with stable IDs and all required UI fields', () => {
    const preview = (0, versionedReview_1.buildVersionedReviewPreview)();
    strict_1.default.equal(preview.records.length, 23);
    strict_1.default.equal(preview.records.filter(r => r.kind === 'CHARACTER').length, 9);
    strict_1.default.equal(preview.records.filter(r => r.kind === 'WEAPON').length, 14);
    strict_1.default.equal(preview.excludedCharacterDrafts.length, 6);
    strict_1.default.equal(new Set(preview.records.map(r => r.candidateId)).size, 23);
    for (const record of preview.records) {
        for (const field of versionedReview_1.REQUIRED_D3_REVIEW_FIELDS) {
            strict_1.default.notEqual(record[field], undefined, `${record.candidateId} missing ${field}`);
        }
        strict_1.default.equal(record.previousVersion !== record.currentVersion, true);
        strict_1.default.equal(record.versionHistory.length, 2);
        strict_1.default.equal(record.versionHistory[0].checksum, record.sourceChecksum);
        strict_1.default.equal(record.versionHistory[1].checksum, record.revisedChecksum);
        strict_1.default.equal(record.currentChecksum, record.revisedChecksum);
        strict_1.default.equal(record.approval.adminDecision, 'PENDING');
        strict_1.default.equal(record.approvalCarriedOver, false);
        strict_1.default.equal(record.importEligibleNow, false);
    }
});
(0, node_test_1.default)('D3: revised version links source checksum to frozen B3.1 and recomputes canonical checksums', () => {
    const preview = (0, versionedReview_1.buildVersionedReviewPreview)();
    for (const record of preview.records) {
        strict_1.default.match(record.sourceChecksum, /^[a-f0-9]{64}$/);
        strict_1.default.match(record.revisedChecksum, /^[a-f0-9]{64}$/);
        strict_1.default.notEqual(record.sourceChecksum, record.revisedChecksum);
        strict_1.default.equal(record.sourceChecksum, record.frozenSourceChecksum);
    }
    const link = (0, versionedReview_1.weaponRevisionLink)(CID_TIER_CHANGE);
    const previewRecord = preview.records.find(r => r.candidateId === CID_TIER_CHANGE);
    strict_1.default.equal(link.sourceChecksum, link.frozenSourceChecksum);
    strict_1.default.equal(link.revisedChecksum, previewRecord.revisedChecksum);
});
(0, node_test_1.default)('D3: D2 checksums are accepted but old frozen checksums are rejected as superseded', () => {
    const link = (0, versionedReview_1.weaponRevisionLink)(CID_TIER_CHANGE);
    strict_1.default.doesNotThrow(() => (0, versionedReview_1.assertRevisionChecksum)(CID_TIER_CHANGE, link.revisedChecksum));
    strict_1.default.throws(() => (0, versionedReview_1.assertRevisionChecksum)(CID_TIER_CHANGE, link.sourceChecksum), /SUPERSEDED_VERSION/);
    strict_1.default.throws(() => (0, versionedReview_1.assertRevisionChecksum)(CID_TIER_CHANGE, 'f'.repeat(64)), /RECORD_CHECKSUM_MISMATCH/);
});
(0, node_test_1.default)('D3: an older persisted approval cannot be inherited by the revised version', () => {
    const link = (0, versionedReview_1.weaponRevisionLink)(CID_TIER_CHANGE);
    strict_1.default.doesNotThrow(() => (0, versionedReview_1.assertNoInheritedApproval)(null, link.revisedChecksum));
    strict_1.default.doesNotThrow(() => (0, versionedReview_1.assertNoInheritedApproval)({ recordSha256: link.revisedChecksum, decision: 'PENDING' }, link.revisedChecksum));
    strict_1.default.throws(() => (0, versionedReview_1.assertNoInheritedApproval)({ recordSha256: link.sourceChecksum, decision: 'APPROVE' }, link.revisedChecksum), /SUPERSEDED_REVIEW_VERSION/);
    strict_1.default.throws(() => (0, versionedReview_1.assertNoInheritedApproval)({ recordSha256: link.revisedChecksum, decision: 'APPROVE' }, link.revisedChecksum), /APPROVAL_ALREADY_BOUND/);
});
(0, node_test_1.default)('D3: Character tiers, Raiden pause, excluded drafts and Weapon special cases stay unchanged', () => {
    const preview = (0, versionedReview_1.buildVersionedReviewPreview)();
    const characters = preview.records.filter(r => r.kind === 'CHARACTER');
    strict_1.default.equal(characters.every(r => r.tierChanged === false), true);
    const raiden = characters.find(r => r.candidateId === 'CHAR-TIER-B2-06');
    strict_1.default.equal(raiden.reviewStatus, 'NEEDS_MORE_COMPARATIVE_EVIDENCE');
    strict_1.default.ok(raiden.missingEvidence.length > 0);
    strict_1.default.equal(preview.excludedCharacterDrafts.every(r => r.reviewStatus === 'NOT_READY_PENDING_REVIEW' && !r.importEligibleNow), true);
    const blocked = preview.records.find(r => r.candidateId === CID_BLOCKED);
    strict_1.default.equal(blocked.reviewStatus, 'NEEDS_MORE_EVIDENCE');
    strict_1.default.equal(blocked.confidence, 'LOW');
    strict_1.default.equal(blocked.missingEvidence.length, 6);
    const paused = preview.records.find(r => r.candidateId === CID_PAUSED);
    strict_1.default.equal(paused.reviewStatus, 'NEEDS_MORE_COMPARATIVE_EVIDENCE');
    for (const id of [CID_TIER_CHANGE, 'independent-14402-SUB_DPS-R1']) {
        const record = preview.records.find(r => r.candidateId === id);
        strict_1.default.equal(record.tierChanged, true);
        strict_1.default.equal(record.tierReReviewQuestion?.confirmed, false);
        strict_1.default.equal(record.approval.tierReReviewConfirmed, false);
    }
});
(0, node_test_1.default)('D3: import eligibility rejects PENDING, negative decisions, missing prerequisites and stale versions', () => {
    const preview = (0, versionedReview_1.buildVersionedReviewPreview)();
    const record = preview.records.find(r => r.candidateId === CID_TIER_CHANGE);
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
    };
    strict_1.default.equal((0, versionedReview_1.evaluateImportEligibility)(record, valid).eligible, true);
    for (const [patch, reason] of [
        [{ decision: 'PENDING' }, 'ADMIN_DECISION_PENDING'],
        [{ decision: 'REQUEST_CHANGES' }, 'DECISION_REQUEST_CHANGES'],
        [{ decision: 'REJECT' }, 'DECISION_REJECT'],
        [{ rightsVerified: false }, 'RIGHTS_NOT_VERIFIED'],
        [{ tierReReviewConfirmed: false }, 'TIER_CHANGE_NOT_CONFIRMED'],
        [{ evidenceAcknowledged: false }, 'GAMEPLAY_EVIDENCE_NOT_ACKNOWLEDGED'],
        [{ recordSha256: record.sourceChecksum }, 'SUPERSEDED_VERSION'],
        [{ derivation: 'SOURCE_DERIVED' }, 'SOURCE_DERIVED_EXCLUDED'],
    ]) {
        const result = (0, versionedReview_1.evaluateImportEligibility)(record, { ...valid, ...patch });
        strict_1.default.equal(result.eligible, false);
        strict_1.default.ok(result.reasons.includes(reason), `missing ${reason}: ${JSON.stringify(result.reasons)}`);
    }
    const blocked = preview.records.find(r => r.candidateId === CID_BLOCKED);
    const paused = preview.records.find(r => r.candidateId === CID_PAUSED);
    strict_1.default.ok((0, versionedReview_1.evaluateImportEligibility)(blocked, valid).reasons.includes('EVIDENCE_INCOMPLETE'));
    strict_1.default.ok((0, versionedReview_1.evaluateImportEligibility)(paused, valid).reasons.includes('COMPARATIVE_EVIDENCE_INCOMPLETE'));
});
