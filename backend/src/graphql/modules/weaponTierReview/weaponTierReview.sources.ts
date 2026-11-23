import * as crypto from 'node:crypto';
import * as fs from 'node:fs';
import * as path from 'node:path';

/**
 * Phase D3 — versioned source registry for the authoritative B3.2 weapon
 * review workflow.
 *
 * There is no new approval system here. Both versions are served by the SAME
 * WeaponTierReviewService / WeaponTierReview tables and the SAME mutations.
 * A version is only a different, checksum-bound candidate identity:
 *   FROZEN     -> candidateId (14 B3.2 frozen candidates)
 *   D2_REVISED -> `${candidateId}::D2` (14 Phase D2 revised candidates)
 *
 * A D2 candidate is always a fresh WeaponTierReview row: APPROVE, rights and
 * tier confirmation are never copied from the frozen version.
 */

export type SourceVersion = 'FROZEN' | 'D2_REVISED';

export type ReviewCandidate = {
  candidateId: string;
  stableCandidateId: string;
  sourceVersion: SourceVersion;
  previousCandidateId: string | null;
  previousChecksum: string | null;
  changeReason: string | null;
  changedFields: unknown[];
  revisionStatus: string;
  weaponId: string;
  weaponName: string;
  weaponType: string;
  dbWeaponType: string;
  role: string;
  refinement: string;
  refinementLevel: number | null;
  oldTier: string | null;
  proposedTier: string;
  tierChanged: boolean;
  tierJustification: string | null;
  explanationVi: string;
  exactGameplayAssumptions: string[];
  exactFacts: string[];
  evidence: Record<string, unknown>;
  confidence: string;
  gameVersion?: string;
  rubricVersion?: string;
  sourceName?: string;
  sourceLocale?: string;
  independent?: boolean;
  rightsStatus: unknown;
  recordSha256: string;
  reviewStatus: string;
  requiredSupplementFields: string[];
  requiredResolvedCount: number;
  evidenceBlockers: string[];
};

export type ReviewStore = {
  sourceVersion: SourceVersion;
  batchSha256: string;
  candidates: Map<string, ReviewCandidate>;
  groupOf: Map<string, 'A' | 'B'>;
  previousByStableId: Map<string, { candidateId: string; recordSha256: string }>;
};

const SHA256 = /^[a-f0-9]{64}$/;
export const D2_SUFFIX = '::D2';

function stableStringify(value: unknown): string {
  if (value === null || typeof value !== 'object') return JSON.stringify(value ?? null);
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`;
  const obj = value as Record<string, unknown>;
  return `{${Object.keys(obj).sort().map(k => `${JSON.stringify(k)}:${stableStringify(obj[k])}`).join(',')}}`;
}

export function canonicalSha256(value: unknown): string {
  return crypto.createHash('sha256').update(stableStringify(value)).digest('hex');
}

function findRepoFile(relative: string): string {
  const startPoints = [__dirname, process.cwd(), path.resolve(process.cwd(), 'backend')];
  for (const start of startPoints) {
    let dir = start;
    for (let i = 0; i < 10; i += 1) {
      const candidate = path.join(dir, relative);
      if (fs.existsSync(candidate)) return candidate;
      const parent = path.dirname(dir);
      if (parent === dir) break;
      dir = parent;
    }
  }
  throw new Error(`REVIEW_SOURCE_NOT_FOUND:${relative}`);
}

function readJson(relative: string): any {
  return JSON.parse(fs.readFileSync(findRepoFile(relative), 'utf8'));
}

/** Frozen B3.2 dossier, used as the lineage source for D2 revised records. */
function frozenDecisionSheet(): { manifest: any; sheet: any; byId: Map<string, any> } {
  const manifest = readJson('docs/weapon-tier-independent/freeze-manifest.json');
  const sheet = readJson('docs/weapon-tier-independent/decision-sheet.json');
  if (!Array.isArray(manifest.records) || manifest.records.length !== 14) throw new Error('FROZEN_RECORD_COUNT_INVALID');
  if (!Array.isArray(sheet.records) || sheet.records.length !== 14) throw new Error('FROZEN_SHEET_COUNT_INVALID');
  const byId = new Map<string, any>(sheet.records.map((r: any) => [r.candidateId, r]));
  const checksums = new Map<string, string>(manifest.records.map((r: any) => [r.candidateId, r.sha256]));
  for (const record of sheet.records) {
    if (checksums.get(record.candidateId) !== record.recordSha256) throw new Error('FROZEN_LINEAGE_CHECKSUM_MISMATCH');
  }
  return { manifest, sheet, byId };
}

/**
 * Build the D2_REVISED store. Every checksum is recomputed from the artifact;
 * a hand-edited checksum or explanation fails closed.
 */
export function buildD2Store(): ReviewStore {
  const d2 = readJson('docs/tierlist/phase-d2/WEAPON_REVISED_DRAFT.json');
  if (!Array.isArray(d2.records) || d2.records.length !== 14) throw new Error('D2_RECORD_COUNT_INVALID');
  if (!SHA256.test(String(d2.artifactSha256))) throw new Error('D2_ARTIFACT_CHECKSUM_INVALID');
  if (canonicalSha256(d2.records) !== d2.artifactSha256) throw new Error('D2_ARTIFACT_CHECKSUM_MISMATCH');

  const frozen = frozenDecisionSheet();
  const manifestById = new Map<string, string>(frozen.manifest.records.map((r: any) => [r.candidateId, r.sha256]));
  const candidates = new Map<string, ReviewCandidate>();
  const groupOf = new Map<string, 'A' | 'B'>();
  const previousByStableId = new Map<string, { candidateId: string; recordSha256: string }>();

  for (const record of d2.records) {
    const { newChecksum, ...rest } = record;
    if (!SHA256.test(String(newChecksum)) || canonicalSha256(rest) !== newChecksum) {
      throw new Error(`D2_RECORD_CHECKSUM_MISMATCH:${record.candidateId}`);
    }
    if (!SHA256.test(String(record.oldChecksum)) || manifestById.get(record.candidateId) !== record.oldChecksum) {
      throw new Error(`D2_LINEAGE_CHECKSUM_MISMATCH:${record.candidateId}`);
    }
    const base = frozen.byId.get(record.candidateId);
    if (!base) throw new Error(`D2_LINEAGE_RECORD_MISSING:${record.candidateId}`);

    const review = record.d2Review ?? {};
    const blockedFields = Array.isArray(review.blockedEvidence)
      ? review.blockedEvidence.map((entry: any) => String(entry?.field ?? '')).filter(Boolean)
      : [];
    const missing = Array.isArray(review.missingEvidence) ? review.missingEvidence.length : 0;
    const blockers = [
      ...(Array.isArray(review.missingEvidence) ? review.missingEvidence : []),
      ...(Array.isArray(review.blockedEvidence)
        ? review.blockedEvidence.map((entry: any) => String(entry?.label ?? entry?.field ?? '')) : []),
    ].filter(Boolean);
    const candidateId = `${record.candidateId}${D2_SUFFIX}`;
    const needsEvidence = record.reviewStatus === 'NEEDS_MORE_EVIDENCE' ||
      record.reviewStatus === 'NEEDS_MORE_COMPARATIVE_EVIDENCE' || blockers.length > 0;
    groupOf.set(candidateId, needsEvidence ? 'B' : 'A');
    previousByStableId.set(record.candidateId, { candidateId: record.candidateId, recordSha256: record.oldChecksum });

    candidates.set(candidateId, {
      candidateId,
      stableCandidateId: record.candidateId,
      sourceVersion: 'D2_REVISED',
      previousCandidateId: record.candidateId,
      previousChecksum: record.oldChecksum,
      changeReason: record.changeReason ?? null,
      changedFields: Array.isArray(record.changedFields) ? record.changedFields : [],
      revisionStatus: record.reviewStatus,
      weaponId: String(record.weaponId ?? base.weaponId),
      weaponName: base.weaponName,
      weaponType: base.weaponType,
      dbWeaponType: base.dbWeaponType,
      role: record.role ?? base.role,
      refinement: record.refinement ?? base.refinement,
      refinementLevel: base.refinementLevel ?? null,
      oldTier: record.oldTier ?? base.oldTier ?? null,
      proposedTier: record.proposedTier ?? base.proposedTier,
      tierChanged: record.tierChanged === true,
      tierJustification: base.tierJustification ?? null,
      explanationVi: record.explanationVi ?? base.explanationVi,
      exactGameplayAssumptions: Array.isArray(record.gameplayAssumptions)
        ? record.gameplayAssumptions : (base.exactGameplayAssumptions ?? []),
      exactFacts: Array.isArray(base.exactFacts) ? base.exactFacts : [],
      evidence: {
        ...(base.evidence ?? {}),
        d2Evidence: record.evidence,
        d2Review: review,
        changedFields: record.changedFields ?? [],
      },
      confidence: record.confidence ?? base.confidence,
      gameVersion: base.gameVersionStatus === 'VERIFIED' && base.versionKey === base.gameVersion ? base.gameVersion : undefined,
      rubricVersion: base.rubricVersion,
      sourceName: base.sourceName,
      sourceLocale: base.sourceLocale,
      independent: record.rightsStatus?.sourceDerivedResearchUsedAsRanking === false &&
        base.rightsStatus?.independentTier === true,
      rightsStatus: record.rightsStatus ?? base.rightsStatus,
      recordSha256: newChecksum,
      reviewStatus: record.reviewStatus,
      requiredSupplementFields: blockedFields,
      requiredResolvedCount: missing,
      evidenceBlockers: blockers,
    });
  }
  return {
    sourceVersion: 'D2_REVISED',
    batchSha256: d2.artifactSha256,
    candidates,
    groupOf,
    previousByStableId,
  };
}

/** Checksums that belong to a tracked B3.2 or D2 candidate. */
export function trackedCandidateSha256(): Map<string, { candidateId: string; sourceVersion: SourceVersion }> {
  const map = new Map<string, { candidateId: string; sourceVersion: SourceVersion }>();
  const frozen = readJson('docs/weapon-tier-independent/freeze-manifest.json');
  for (const record of frozen.records ?? []) {
    if (SHA256.test(String(record.sha256))) {
      map.set(record.sha256, { candidateId: record.candidateId, sourceVersion: 'FROZEN' });
    }
  }
  const d2 = readJson('docs/tierlist/phase-d2/WEAPON_REVISED_DRAFT.json');
  for (const record of d2.records ?? []) {
    if (SHA256.test(String(record.newChecksum))) {
      map.set(record.newChecksum, { candidateId: `${record.candidateId}${D2_SUFFIX}`, sourceVersion: 'D2_REVISED' });
    }
  }
  return map;
}

export function parseSourceVersion(value: unknown): SourceVersion {
  if (value === undefined || value === null || value === '' || value === 'FROZEN') return 'FROZEN';
  if (value === 'D2_REVISED') return value;
  throw new Error('INVALID_SOURCE_VERSION');
}
