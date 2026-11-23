import * as fs from 'node:fs';
import * as path from 'node:path';
import { createHash } from 'node:crypto';

/**
 * Phase D3 — read-safe version bridge from the Phase D2 revised dossiers to the
 * existing Admin review workflow.
 *
 * This module NEVER writes Prisma rows and NEVER approves content. It computes
 * the canonical link B3.1/B2 source checksum -> D2 revised checksum, exposes the
 * per-version review state needed by the Admin UI, and supplies the guards used
 * by the B3.2 service and importer. Keeping source/revision metadata here avoids
 * a Prisma migration: the existing review table already stores the active
 * checksum and version token, while the complete history stays in the D2
 * artifacts plus the existing audit table.
 */

export const REQUIRED_D3_REVIEW_FIELDS = [
  'candidateId',
  'previousVersion',
  'currentVersion',
  'targetId',
  'role',
  'conditionValue',
  'proposedTier',
  'explanation',
  'evidence',
  'gameplayConditions',
  'confidence',
  'diff',
  'currentChecksum',
  'reviewStatus',
  'rightsStatus',
] as const;

const SHA256 = /^[a-f0-9]{64}$/;
export const REVIEWABLE_STATUSES = new Set([
  'REVISED_PENDING_ADMIN_REVIEW',
  'REVISION_READY_FOR_ADMIN_REVIEW',
  'MANDATORY_TIER_RE_REVIEW_PENDING',
]);

export type VersionedApproval = {
  adminDecision: string;
  decidedBy: string | null;
  decidedAt: string | null;
  reason: string | null;
  rightsVerified: boolean;
  rightsVerifiedBy: string | null;
  evidenceAcknowledged: boolean;
  tierReReviewConfirmed: boolean;
};

export type VersionHistoryEntry = {
  version: string;
  checksum: string;
  reviewStatus: string;
  approval: string;
  importEligible: false;
};

export type VersionedReviewRecord = {
  kind: 'CHARACTER' | 'WEAPON';
  candidateId: string;
  recordId: string;
  previousVersion: string;
  currentVersion: 'D2_REVISED';
  targetId: string;
  targetName: string;
  role: string;
  conditionLabel: 'Constellation' | 'Refinement';
  conditionValue: string;
  previousTier: string;
  proposedTier: string;
  tierChanged: boolean;
  explanation: string;
  evidence: unknown;
  gameplayConditions: unknown;
  confidence: string;
  diff: unknown[];
  changeReason: string;
  sourceChecksum: string;
  frozenSourceChecksum: string;
  revisedChecksum: string;
  currentChecksum: string;
  reviewStatus: string;
  missingEvidence: string[];
  rightsStatus: Record<string, unknown>;
  approval: VersionedApproval;
  approvalCarriedOver: false;
  importEligibleNow: false;
  versionHistory: VersionHistoryEntry[];
  tierReReviewQuestion: unknown | null;
};

export type D3Preview = {
  artifactSha256: { character: string; weapon: string };
  counts: {
    inScope: number;
    character: number;
    weapon: number;
    excludedCharacterDrafts: number;
    pendingApprovals: number;
    importableNow: number;
  };
  records: VersionedReviewRecord[];
  excludedCharacterDrafts: Array<{
    candidateId: string;
    recordKey: string;
    category: string;
    reason: string;
    reviewStatus: string;
    importEligibleNow: false;
  }>;
};

export type RevisionLink = {
  candidateId: string;
  sourceVersion: 'B3_1_FROZEN';
  currentVersion: 'D2_REVISED';
  sourceChecksum: string;
  frozenSourceChecksum: string;
  revisedChecksum: string;
  artifactSha256: string;
  reviewStatus: string;
  changedFields: unknown[];
};

function sha(value: string | Buffer): string {
  return createHash('sha256').update(value).digest('hex');
}

function canonical(value: unknown): string {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`;
  const object = value as Record<string, unknown>;
  return `{${Object.keys(object).sort().map(key => `${JSON.stringify(key)}:${canonical(object[key])}`).join(',')}}`;
}

function findRepoFile(relative: string): string {
  const starts = [__dirname, process.cwd(), path.resolve(process.cwd(), 'backend')];
  for (const start of starts) {
    let dir = start;
    for (let i = 0; i < 10; i += 1) {
      const candidate = path.join(dir, relative);
      if (fs.existsSync(candidate)) return candidate;
      const parent = path.dirname(dir);
      if (parent === dir) break;
      dir = parent;
    }
  }
  throw new Error(`D3_SOURCE_NOT_FOUND:${relative}`);
}

function readJson(relative: string): any {
  return JSON.parse(fs.readFileSync(findRepoFile(relative), 'utf8'));
}

function assertArtifact(records: any[], expected: string, label: string): void {
  if (!SHA256.test(String(expected))) throw new Error(`D2_ARTIFACT_CHECKSUM_INVALID:${label}`);
  if (sha(canonical(records)) !== expected) throw new Error(`D2_ARTIFACT_CHANGED:${label}`);
  for (const record of records) {
    const { newChecksum, ...rest } = record;
    if (!SHA256.test(String(newChecksum)) || sha(canonical(rest)) !== newChecksum) {
      throw new Error(`D2_RECORD_CHECKSUM_CHANGED:${record.candidateId ?? record.recordId}`);
    }
    if (!SHA256.test(String(record.oldChecksum)) || record.oldChecksum === newChecksum) {
      throw new Error(`D2_SOURCE_LINK_INVALID:${record.candidateId ?? record.recordId}`);
    }
  }
}

function normalizeApproval(record: any): VersionedApproval {
  const approval = record.approval ?? {};
  return {
    adminDecision: approval.adminDecision ?? 'PENDING',
    decidedBy: approval.decidedBy ?? null,
    decidedAt: approval.decidedAt ?? null,
    reason: approval.reason ?? null,
    rightsVerified: approval.rightsVerified === true,
    rightsVerifiedBy: approval.rightsVerifiedBy ?? null,
    evidenceAcknowledged: approval.evidenceAcknowledged === true,
    tierReReviewConfirmed: approval.tierReReviewConfirmed === true,
  };
}

function sourceStatus(record: any): string {
  const diff = (record.changedFields ?? []).find((entry: any) => entry?.field === 'reviewStatus');
  return String(diff?.before ?? 'READY_FOR_ADMIN_REVIEW');
}

function missingEvidence(record: any): string[] {
  const review = record.d2Review ?? {};
  const blocked = Array.isArray(review.blockedEvidence)
    ? review.blockedEvidence.filter((item: any) => item?.present === false).map((item: any) => String(item.name ?? item.field ?? ''))
    : [];
  return [...blocked, ...(Array.isArray(review.missingEvidence) ? review.missingEvidence.map(String) : [])].filter(Boolean);
}

function toRecord(kind: 'CHARACTER' | 'WEAPON', record: any, frozenSourceChecksum: string, sourceVersion: string): VersionedReviewRecord {
  const isCharacter = kind === 'CHARACTER';
  const approval = normalizeApproval(record);
  const rightsStatus: Record<string, unknown> = isCharacter
    ? {
      publishRightsVerified: approval.rightsVerified,
      sourceDerivedResearchUsedAsRanking: false,
      verifiedByAdmin: approval.rightsVerifiedBy,
    }
    : { ...(record.rightsStatus ?? {}), publishRightsVerified: Boolean(record.rightsStatus?.publishRightsVerified) };
  return {
    kind,
    candidateId: isCharacter ? record.recordId : record.candidateId,
    recordId: record.recordId,
    previousVersion: sourceVersion,
    currentVersion: 'D2_REVISED',
    targetId: isCharacter ? record.characterId : record.weaponId,
    targetName: isCharacter ? record.characterName : record.weaponName,
    role: record.role,
    conditionLabel: isCharacter ? 'Constellation' : 'Refinement',
    conditionValue: isCharacter ? record.constellation : record.refinement,
    previousTier: record.oldTier,
    proposedTier: record.proposedTier,
    tierChanged: record.tierChanged === true,
    explanation: String(record.explanationVi ?? record.explanation ?? ''),
    evidence: record.evidence,
    gameplayConditions: record.gameplayAssumptions,
    confidence: record.confidence,
    diff: Array.isArray(record.changedFields) ? record.changedFields : [],
    changeReason: String(record.changeReason ?? ''),
    sourceChecksum: record.oldChecksum,
    frozenSourceChecksum,
    revisedChecksum: record.newChecksum,
    currentChecksum: record.newChecksum,
    reviewStatus: record.reviewStatus,
    missingEvidence: missingEvidence(record),
    rightsStatus,
    approval,
    approvalCarriedOver: false,
    importEligibleNow: false,
    versionHistory: [
      {
        version: sourceVersion,
        checksum: record.oldChecksum,
        reviewStatus: sourceStatus(record),
        approval: 'PENDING',
        importEligible: false,
      },
      {
        version: 'D2_REVISED',
        checksum: record.newChecksum,
        reviewStatus: record.reviewStatus,
        approval: 'PENDING',
        importEligible: false,
      },
    ],
    tierReReviewQuestion: record.d2Review?.tierReviewQuestion ?? null,
  };
}

let cachedPreview: D3Preview | null = null;

/** Builds the 23-record read-only preview. Results are cached in-process. */
export function buildVersionedReviewPreview(fresh = false): D3Preview {
  if (!fresh && cachedPreview) return cachedPreview;

  const character = readJson('docs/tierlist/phase-d2/CHARACTER_REVISED_DRAFT.json');
  const weapon = readJson('docs/tierlist/phase-d2/WEAPON_REVISED_DRAFT.json');
  assertArtifact(character.records, character.artifactSha256, 'CHARACTER');
  assertArtifact(weapon.records, weapon.artifactSha256, 'WEAPON');

  const characterSheet = readJson('docs/tierlist-v7.2-audit/PHASE_D_CHARACTER_APPROVAL_SHEET.json');
  const weaponDecision = readJson('docs/weapon-tier-independent/decision-sheet.json');
  const charChecksums = new Map<string, string>(characterSheet.records.map((row: any) => [row.recordKey, row.recordSha256]));
  const weaponChecksums = new Map<string, string>(weaponDecision.records.map((row: any) => [row.candidateId, row.recordSha256]));

  const characterRecords = character.records.map((record: any) => {
    const frozen = charChecksums.get(record.recordKey);
    if (!frozen || frozen !== record.oldChecksum) throw new Error(`D2_SOURCE_CHECKSUM_MISMATCH:${record.recordKey}`);
    return toRecord('CHARACTER', record, frozen, 'B2_FROZEN');
  });
  const weaponRecords = weapon.records.map((record: any) => {
    const frozen = weaponChecksums.get(record.candidateId);
    if (!frozen || frozen !== record.oldChecksum) throw new Error(`D2_SOURCE_CHECKSUM_MISMATCH:${record.candidateId}`);
    return toRecord('WEAPON', record, frozen, 'B3_1_FROZEN');
  });

  cachedPreview = {
    artifactSha256: { character: character.artifactSha256, weapon: weapon.artifactSha256 },
    counts: {
      inScope: characterRecords.length + weaponRecords.length,
      character: characterRecords.length,
      weapon: weaponRecords.length,
      excludedCharacterDrafts: character.excludedUnchangedDrafts.length,
      pendingApprovals: characterRecords.length + weaponRecords.length,
      importableNow: 0,
    },
    records: [...characterRecords, ...weaponRecords],
    excludedCharacterDrafts: character.excludedUnchangedDrafts.map((draft: any) => ({
      candidateId: `EXCLUDED-${draft.characterId}-${draft.role}-${draft.constellation}`,
      recordKey: draft.recordKey,
      category: draft.category,
      reason: draft.reason,
      reviewStatus: 'NOT_READY_PENDING_REVIEW',
      importEligibleNow: false,
    })),
  };
  return cachedPreview;
}

/** Returns the D2 revised record used to surface current content in the review UI. */
export function weaponRevisionRecord(candidateId: string): VersionedReviewRecord {
  const record = buildVersionedReviewPreview().records.find(r => r.candidateId === candidateId && r.kind === 'WEAPON');
  if (!record) throw new Error('CANDIDATE_NOT_FOUND');
  return record;
}

/** Returns the weapon source/revision link used by B3.2 mutation guards. */
export function weaponRevisionLink(candidateId: string): RevisionLink {
  const weapon = readJson('docs/tierlist/phase-d2/WEAPON_REVISED_DRAFT.json');
  assertArtifact(weapon.records, weapon.artifactSha256, 'WEAPON');
  const record = weapon.records.find((row: any) => row.candidateId === candidateId);
  if (!record) throw new Error('CANDIDATE_NOT_FOUND');
  const decision = readJson('docs/weapon-tier-independent/decision-sheet.json');
  const frozen = decision.records.find((row: any) => row.candidateId === candidateId)?.recordSha256;
  if (frozen !== record.oldChecksum) throw new Error(`D2_SOURCE_CHECKSUM_MISMATCH:${candidateId}`);
  return {
    candidateId,
    sourceVersion: 'B3_1_FROZEN',
    currentVersion: 'D2_REVISED',
    sourceChecksum: record.oldChecksum,
    frozenSourceChecksum: frozen,
    revisedChecksum: record.newChecksum,
    artifactSha256: weapon.artifactSha256,
    reviewStatus: record.reviewStatus,
    changedFields: record.changedFields ?? [],
  };
}

/**
 * All new decisions must bind to the D2 revised checksum. Supplying a B3.1
 * frozen checksum is a superseded version, not merely a bad hash.
 */
export function assertRevisionChecksum(candidateId: string, checksum: string): void {
  const link = weaponRevisionLink(candidateId);
  if (!SHA256.test(String(checksum))) throw new Error('INVALID_CHECKSUM');
  if (checksum === link.sourceChecksum) throw new Error('SUPERSEDED_VERSION');
  if (checksum !== link.revisedChecksum) throw new Error('RECORD_CHECKSUM_MISMATCH');
}

/** Blocks inherited approvals from a row bound to an older content version. */
export function assertNoInheritedApproval(row: any, activeChecksum: string): void {
  if (!row) return;
  if (row.recordSha256 !== activeChecksum) throw new Error('SUPERSEDED_REVIEW_VERSION');
  if (row.decision === 'APPROVE') throw new Error('APPROVAL_ALREADY_BOUND');
}

/** Pure import-preparation guard. No writes and no network calls. */
export function evaluateImportEligibility(record: VersionedReviewRecord, decision: any): { eligible: boolean; reasons: string[] } {
  const reasons: string[] = [];
  if (!decision || typeof decision !== 'object') return { eligible: false, reasons: ['DECISION_MISSING'] };
  if (decision.decision === 'PENDING') reasons.push('ADMIN_DECISION_PENDING');
  if (decision.decision === 'REQUEST_CHANGES') reasons.push('DECISION_REQUEST_CHANGES');
  if (decision.decision === 'REJECT') reasons.push('DECISION_REJECT');
  if (!['APPROVE', 'REQUEST_CHANGES', 'REJECT', 'PENDING'].includes(decision.decision)) reasons.push('INVALID_DECISION');
  if (typeof decision.adminActor !== 'string' || decision.adminActor.trim().length < 3 || /^(admin|admin-key|system|automation|test|agent|auto|script|ci|unknown)$/i.test(decision.adminActor.trim())) {
    reasons.push('FAKE_OR_MISSING_ACTOR');
  }
  if (typeof decision.decidedAt !== 'string' || Number.isNaN(Date.parse(decision.decidedAt))) reasons.push('MISSING_DECIDED_AT');
  if (typeof decision.reason !== 'string' || decision.reason.trim().length < 10) reasons.push('MISSING_DECISION_REASON');
  if (decision.rightsVerified !== true || typeof decision.rightsVerifiedBy !== 'string' || decision.rightsVerifiedBy.trim().length < 3) {
    reasons.push('RIGHTS_NOT_VERIFIED');
  }
  if (decision.evidenceAcknowledged !== true) reasons.push('GAMEPLAY_EVIDENCE_NOT_ACKNOWLEDGED');
  if (record.tierChanged && decision.tierReReviewConfirmed !== true) reasons.push('TIER_CHANGE_NOT_CONFIRMED');
  if (record.missingEvidence.length > 0) {
    reasons.push(record.reviewStatus === 'NEEDS_MORE_COMPARATIVE_EVIDENCE' ? 'COMPARATIVE_EVIDENCE_INCOMPLETE' : 'EVIDENCE_INCOMPLETE');
  }
  if (decision.recordSha256 === record.sourceChecksum) reasons.push('SUPERSEDED_VERSION');
  else if (decision.recordSha256 !== record.revisedChecksum) reasons.push('CHECKSUM_MISMATCH');
  if (decision.derivation && decision.derivation !== 'INDEPENDENT') reasons.push('SOURCE_DERIVED_EXCLUDED');
  return { eligible: reasons.length === 0, reasons };
}
