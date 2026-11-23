import * as fs from 'node:fs';
import * as path from 'node:path';
import { GraphQLContext } from '../../context';
import { requireAdminActor, weaponRankingContentChecksum } from '../tierReviewSecurity';
import {
  buildD2Store,
  D2_SUFFIX,
  parseSourceVersion,
  ReviewCandidate,
  ReviewStore,
  SourceVersion,
  trackedCandidateSha256,
} from './weaponTierReview.sources';

// Authoritative freeze verifier: recomputes every record, file and batch hash
// from source artifacts and rejects any tampering with the frozen dossier.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const freeze = require(findRepoFile('backend/scripts/weapon-tier-independent/freeze.cjs')) as {
  verify: () => { ok: boolean; issues: string[]; manifest: any };
};

/**
 * Phase B3.2 / D3 — real Admin review workflow. FROZEN and D2_REVISED are two
 * checksum-bound candidate versions served by the SAME tables and mutations.
 * A D2 candidate always has a new `${candidateId}::D2` identity and a fresh
 * review row, so APPROVE / rights / tier confirmations are never inherited.
 * Only publish() materializes a WeaponTierRank from a reviewed revision.
 */
type Frozen = ReviewStore;

const GROUP_B_ID = 'independent-12401-SUB_DPS-R1';
const GROUP_B_FIELDS = [
  'critRateAssumptions',
  'passiveProcConditions',
  'rotation',
  'fieldTimeRequirements',
  'energyGenerationAssumptions',
  'rubricJustification',
] as const;
const RIGHTS_GROUNDS = [
  'independentRanking',
  'originalExplanation',
  'noGenshinBuildsEditorialCopy',
  'gameFactsAttributionCorrect',
  'evidenceValid',
] as const;
const AUDIT_ACTIONS = new Set([
  'REVIEW_CREATED', 'EVIDENCE_SUPPLEMENTED', 'DECISION_RECORDED', 'DECISION_CHANGED',
  'RIGHTS_VERIFIED', 'TIER_CHANGE_CONFIRMED', 'PUBLISHED',
]);
const publishedAudit = { where: { action: 'PUBLISHED' }, select: { id: true }, take: 1 };
const SHA256 = /^[a-f0-9]{64}$/;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
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
  throw new Error(`FROZEN_SOURCE_NOT_FOUND:${relative}`);
}

function readJson(relative: string): any {
  return JSON.parse(fs.readFileSync(findRepoFile(relative), 'utf8'));
}

function toIso(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  const date = value instanceof Date ? value : new Date(String(value));
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

export class WeaponTierReviewService {
  constructor(private readonly prisma: any) {}

  /** Actor is always derived from the verified backend auth context. */
  private actor(context: GraphQLContext): string {
    return requireAdminActor(context);
  }

  /** Re-reads and re-verifies the frozen sources on every API call. */
  private frozen(): Frozen {
    const verification = freeze.verify();
    if (!verification.ok) throw new Error(`FROZEN_CONTENT_CHANGED:${verification.issues.join(',')}`);
    const manifest = verification.manifest;
    if (!Array.isArray(manifest.records) || manifest.records.length !== 14) throw new Error('FREEZE_RECORD_COUNT_INVALID');
    if (!SHA256.test(String(manifest.batchSha256))) throw new Error('FREEZE_BATCH_INVALID');

    const sheet = readJson('docs/weapon-tier-independent/admin-review-sheet.json');
    if (sheet.freeze?.batchSha256 !== manifest.batchSha256 ||
        sheet.freeze?.decisionSheetSha256 !== manifest.decisionSheetSha256) {
      throw new Error('FROZEN_CONTENT_CHANGED');
    }
    const decisions = readJson('docs/weapon-tier-independent/decision-sheet.json');
    if (!Array.isArray(decisions.records) || decisions.records.length !== 14) throw new Error('FROZEN_CONTENT_CHANGED');

    const checksums = new Map<string, string>(manifest.records.map((r: any) => [r.candidateId, r.sha256]));
    const candidates = new Map<string, ReviewCandidate>();
    const groupOf = new Map<string, 'A' | 'B'>();
    const previousByStableId = new Map<string, { candidateId: string; recordSha256: string }>();
    for (const record of decisions.records) {
      const expected = checksums.get(record.candidateId);
      if (!expected || expected !== record.recordSha256) throw new Error('FROZEN_CONTENT_CHANGED');
      const needsEvidence = record.reviewStatus === 'NEEDS_MORE_EVIDENCE' ||
        record.reviewRecommendation === 'REQUEST_CHANGES';
      groupOf.set(record.candidateId, needsEvidence ? 'B' : 'A');
      previousByStableId.set(record.candidateId, { candidateId: record.candidateId, recordSha256: record.recordSha256 });
      candidates.set(record.candidateId, {
        candidateId: record.candidateId,
        stableCandidateId: record.candidateId,
        sourceVersion: 'FROZEN',
        previousCandidateId: null,
        previousChecksum: null,
        changeReason: null,
        changedFields: [],
        revisionStatus: record.reviewStatus,
        weaponId: record.weaponId,
        weaponName: record.weaponName,
        weaponType: record.weaponType,
        dbWeaponType: record.dbWeaponType,
        role: record.role,
        refinement: record.refinement,
        refinementLevel: record.refinementLevel ?? null,
        oldTier: record.oldTier ?? null,
        proposedTier: record.proposedTier,
        tierChanged: record.tierChanged === true,
        tierJustification: record.tierJustification ?? null,
        explanationVi: record.explanationVi,
        exactGameplayAssumptions: record.exactGameplayAssumptions ?? [],
        exactFacts: record.exactFacts ?? [],
        evidence: record.evidence ?? {},
        confidence: record.confidence,
        rightsStatus: record.rightsStatus,
        recordSha256: record.recordSha256,
        reviewStatus: record.reviewStatus,
        requiredSupplementFields: needsEvidence ? [...GROUP_B_FIELDS] : [],
        requiredResolvedCount: 0,
        evidenceBlockers: [],
      });
    }
    const groupB = [...groupOf.entries()].filter(([, group]) => group === 'B').map(([id]) => id);
    if (groupOf.size !== 14 || groupB.length !== 1 || groupB[0] !== GROUP_B_ID) {
      throw new Error('FROZEN_CONTENT_CHANGED');
    }
    return {
      sourceVersion: 'FROZEN',
      batchSha256: manifest.batchSha256,
      candidates,
      groupOf,
      previousByStableId,
    };
  }

  /** One authoritative service, two checksum-bound candidate versions. */
  private storeFor(value: unknown): Frozen {
    const version = parseSourceVersion(value);
    const frozen = this.frozen();
    return version === 'D2_REVISED' ? buildD2Store() : frozen;
  }

  private candidate(store: Frozen, candidateId: string): ReviewCandidate {
    const record = store.candidates.get(candidateId);
    if (!record) throw new Error('CANDIDATE_NOT_FOUND');
    return record;
  }

  private assertChecksums(store: Frozen, candidate: ReviewCandidate, batchSha256: string, recordSha256Value: string): void {
    if (!SHA256.test(String(batchSha256)) || !SHA256.test(String(recordSha256Value))) throw new Error('INVALID_CHECKSUM');
    if (batchSha256 !== store.batchSha256) throw new Error('BATCH_CHECKSUM_MISMATCH');
    const tracked = trackedCandidateSha256().get(recordSha256Value);
    if (tracked && tracked.candidateId !== candidate.candidateId) {
      throw new Error('SUPERSEDED_VERSION');
    }
    if (recordSha256Value !== candidate.recordSha256) throw new Error('RECORD_CHECKSUM_MISMATCH');
    if (candidate.sourceVersion === 'D2_REVISED' && !candidate.candidateId.endsWith(D2_SUFFIX)) {
      throw new Error('INVALID_REVISION_IDENTITY');
    }
  }

  private lineageAuditFields(candidate: ReviewCandidate): Record<string, unknown> {
    return {
      sourceVersion: candidate.sourceVersion,
      stableCandidateId: candidate.stableCandidateId,
      previousCandidateId: candidate.previousCandidateId,
      previousChecksum: candidate.previousChecksum,
      recordSha256: candidate.recordSha256,
      currentChecksum: candidate.recordSha256,
      changedFields: candidate.changedFields,
      revisionStatus: candidate.revisionStatus,
    };
  }

  private async getRow(candidateId: string): Promise<any> {
    return this.prisma.weaponTierReview.findUnique({ where: { candidateId }, include: { audits: publishedAudit } });
  }

  /**
   * No persisted row is presented as version 0. The first mutation creates the
   * row at v0; every later mutation must carry the current version. Existing
   * rows bound to another checksum are rejected so approval can never migrate.
   */
  private async ensureRow(store: Frozen, candidateId: string, actor: string, expectedVersion: number): Promise<any> {
    const existing = await this.getRow(candidateId);
    if (existing) {
      const candidate = this.candidate(store, candidateId);
      if (existing.batchSha256 !== store.batchSha256 || existing.recordSha256 !== candidate.recordSha256) throw new Error('SUPERSEDED_REVIEW_VERSION');
      if (existing.version !== expectedVersion) throw new Error('CONCURRENT_MODIFICATION');
      if (existing.audits?.length) throw new Error('CANDIDATE_ALREADY_PUBLISHED');
      return existing;
    }
    if (expectedVersion !== 0) throw new Error('CONCURRENT_MODIFICATION');
    const candidate = this.candidate(store, candidateId);
    try {
      const created = await this.prisma.weaponTierReview.create({
        data: {
          candidateId,
          weaponId: candidate.weaponId,
          batchSha256: store.batchSha256,
          recordSha256: candidate.recordSha256,
          reviewGroup: store.groupOf.get(candidateId) ?? 'A',
          version: 0,
        },
      });
      await this.audit(created.id, 'REVIEW_CREATED', actor, {
        candidateId,
        ...this.lineageAuditFields(candidate),
      });
      return created;
    } catch (error: any) {
      if (error?.code === 'P2002') throw new Error('CONCURRENT_MODIFICATION');
      throw error;
    }
  }

  private async audit(reviewId: string, action: string, actor: string, changes: unknown): Promise<void> {
    if (!AUDIT_ACTIONS.has(action)) throw new Error('INVALID_AUDIT_ACTION');
    await this.prisma.weaponTierReviewAudit.create({
      data: { reviewId, action, actor, changes: changes ?? null },
    });
  }

  private async updateWithVersion(row: any, expectedVersion: number, data: Record<string, unknown>): Promise<any> {
    const updated = await this.prisma.weaponTierReview.updateMany({
      where: { id: row.id, version: expectedVersion },
      data: { ...data, version: { increment: 1 } },
    });
    if (updated.count !== 1) throw new Error('CONCURRENT_MODIFICATION');
    return this.getRow(row.candidateId);
  }

  private supplementFields(candidate: ReviewCandidate): readonly string[] {
    if (candidate.sourceVersion === 'D2_REVISED' && candidate.requiredSupplementFields.length > 0) {
      return candidate.requiredSupplementFields;
    }
    return GROUP_B_FIELDS;
  }

  private supplementMissing(candidate: ReviewCandidate, supplement: any): string[] {
    const value = supplement && typeof supplement === 'object' ? supplement : {};
    return this.supplementFields(candidate).filter(field =>
      !isNonEmptyString((value as any)[field]) || String((value as any)[field]).trim().length < 10);
  }

  private present(store: Frozen, row: any | null, candidate: ReviewCandidate): any {
    const missing = row?.reviewGroup === 'B' ? this.supplementMissing(candidate, row.evidenceSupplement) : [];
    const revisionEvidenceGap = candidate.sourceVersion === 'D2_REVISED' && candidate.evidenceBlockers.length > 0;
    // D2 evidence gaps are a property of the revision artifact, not of a
    // persisted review row. Surface them so the Admin UI can render the
    // blocker before any decision/rights state exists. Frozen blockers keep
    // their original GROUP_B supplement semantics.
    const blockedReason = revisionEvidenceGap
      ? `D2_EVIDENCE_INCOMPLETE:${candidate.evidenceBlockers.join(',')}`
      : (missing.length ? `GROUP_B_EVIDENCE_INCOMPLETE:${missing.join(',')}` : null);
    const importEligible = Boolean(
      candidate.sourceVersion === 'D2_REVISED' && candidate.independent && candidate.gameVersion &&
      row && !row.audits?.length && row.decision === 'APPROVE' && this.hasRights(row, store, candidate) &&
      row.evidenceAcknowledged === true && (!candidate.tierChanged || row.tierChangeConfirmed === true) &&
      row.batchSha256 === store.batchSha256 && row.recordSha256 === candidate.recordSha256 &&
      row.weaponId === candidate.weaponId && row.reviewGroup === store.groupOf.get(candidate.candidateId) &&
      !revisionEvidenceGap && missing.length === 0,
    );
    return {
      candidateId: candidate.candidateId,
      stableCandidateId: candidate.stableCandidateId,
      previousCandidateId: candidate.previousCandidateId,
      weaponId: candidate.weaponId,
      weaponName: candidate.weaponName,
      weaponType: candidate.weaponType,
      dbWeaponType: candidate.dbWeaponType,
      role: candidate.role,
      refinement: candidate.refinement,
      refinementLevel: candidate.refinementLevel ?? null,
      proposedTier: candidate.proposedTier,
      previousTier: candidate.oldTier ?? null,
      tierChanged: candidate.tierChanged,
      tierJustification: candidate.tierJustification,
      explanationVi: candidate.explanationVi,
      gameplayAssumptions: candidate.exactGameplayAssumptions ?? [],
      exactGameFacts: candidate.exactFacts ?? [],
      evidence: candidate.evidence ?? {},
      confidence: candidate.confidence,
      approvalChecksum: candidate.recordSha256,
      batchSha256: store.batchSha256,
      reviewGroup: store.groupOf.get(candidate.candidateId) ?? 'A',
      draftRecommendation: candidate.revisionStatus,
      rightsStatus: candidate.rightsStatus,
      decision: row?.decision ?? 'PENDING',
      decisionReason: row?.decisionReason ?? null,
      decidedAt: toIso(row?.decidedAt),
      decidedBy: row?.decidedBy ?? null,
      rightsVerified: Boolean(row?.rightsVerified),
      rightsVerifiedAt: toIso(row?.rightsVerifiedAt),
      rightsVerifiedBy: row?.rightsVerifiedBy ?? null,
      rightsBasis: row?.rightsBasis ?? null,
      tierChangeConfirmed: Boolean(row?.tierChangeConfirmed),
      tierChangeConfirmedAt: toIso(row?.tierChangeConfirmedAt),
      tierChangeConfirmedBy: row?.tierChangeConfirmedBy ?? null,
      evidenceAcknowledged: Boolean(row?.evidenceAcknowledged),
      evidenceSupplement: row?.evidenceSupplement ?? null,
      version: row?.version ?? 0,
      previousVersion: candidate.sourceVersion === 'D2_REVISED' ? 'B3_1_FROZEN' : 'B2_FROZEN',
      currentVersion: candidate.sourceVersion,
      sourceChecksum: candidate.previousChecksum ?? candidate.recordSha256,
      revisedChecksum: candidate.recordSha256,
      currentChecksum: candidate.recordSha256,
      versionDiff: candidate.changedFields,
      versionReviewStatus: candidate.revisionStatus,
      approvalCarriedOver: Boolean(row && candidate.previousChecksum && row.recordSha256 === candidate.previousChecksum),
      blockedReason,
      importEligible,
      published: Boolean(row?.audits?.length),
    };
  }

  async queue(context: GraphQLContext, sourceVersion?: SourceVersion): Promise<any[]> {
    this.actor(context);
    const store = this.storeFor(sourceVersion);
    const rows = await this.prisma.weaponTierReview.findMany({ include: { audits: publishedAudit } });
    const byId = new Map<string, any>(rows.map((r: any) => [r.candidateId, r]));
    const order = [...store.candidates.keys()].sort();
    return order.map(id => this.present(store, byId.get(id) ?? null, this.candidate(store, id)));
  }

  async one(candidateId: string, context: GraphQLContext, sourceVersion?: SourceVersion): Promise<any> {
    this.actor(context);
    const store = this.storeFor(sourceVersion);
    return this.present(store, await this.getRow(candidateId), this.candidate(store, candidateId));
  }

  async auditLog(candidateId: string, context: GraphQLContext, limit = 200, sourceVersion?: SourceVersion): Promise<any[]> {
    this.actor(context);
    const store = this.storeFor(sourceVersion);
    this.candidate(store, candidateId);
    const row = await this.getRow(candidateId);
    if (!row) return [];
    const take = Math.min(Math.max(Math.trunc(Number(limit) || 200), 1), 200);
    const entries = await this.prisma.weaponTierReviewAudit.findMany({
      where: { reviewId: row.id },
      orderBy: [{ createdAt: 'asc' }, { id: 'asc' }],
      take,
    });
    return entries.map((e: any) => ({
      id: e.id,
      action: e.action,
      actor: e.actor,
      changes: e.changes ?? null,
      createdAt: toIso(e.createdAt),
    }));
  }

  private hasRights(row: any, store: Frozen, candidate: ReviewCandidate): boolean {
    const basis = row.rightsBasis;
    return row.rightsVerified === true && Boolean(row.rightsVerifiedAt) &&
      isNonEmptyString(row.rightsVerifiedBy) && isNonEmptyString(basis?.note) &&
      basis.verifiedBy === row.rightsVerifiedBy && basis.sourceVersion === candidate.sourceVersion &&
      basis.batchSha256 === store.batchSha256 && basis.recordSha256 === candidate.recordSha256 &&
      RIGHTS_GROUNDS.every(field => basis[field] === true);
  }

  private async reviewTransaction<T>(args: any, context: GraphQLContext, work: (service: WeaponTierReviewService) => Promise<T>): Promise<T> {
    this.actor(context);
    if (args.sourceVersion !== 'D2_REVISED') throw new Error('FROZEN_REVIEW_READ_ONLY');
    return this.prisma.$transaction((tx: any) => work(new WeaponTierReviewService(tx)));
  }

  async decide(args: any, context: GraphQLContext): Promise<any> {
    return this.reviewTransaction(args, context, service => service.recordDecision(args, context));
  }

  async verifyRights(args: any, context: GraphQLContext): Promise<any> {
    return this.reviewTransaction(args, context, service => service.recordRights(args, context));
  }

  async confirmTierChange(args: any, context: GraphQLContext): Promise<any> {
    return this.reviewTransaction(args, context, service => service.recordTierConfirmation(args, context));
  }

  async publish(args: any, context: GraphQLContext): Promise<any> {
    try {
      return await this.reviewTransaction(args, context, service => service.publishReviewed(args, context));
    } catch (error: any) {
      if (error?.code === 'P2002') throw new Error('RANKING_KEY_ALREADY_EXISTS');
      throw error;
    }
  }

  private async publishReviewed(args: any, context: GraphQLContext): Promise<any> {
    const actor = this.actor(context);
    if (args.expectedDatabase != null) {
      const [identity] = await this.prisma.$queryRaw`SELECT current_database() AS database`;
      if (identity.database !== args.expectedDatabase) throw new Error('PUBLICATION_DATABASE_MISMATCH');
    }
    const { candidateId, batchSha256, recordSha256, expectedVersion } = args;
    const store = this.storeFor(args.sourceVersion);
    const candidate = this.candidate(store, candidateId);
    this.assertChecksums(store, candidate, batchSha256, recordSha256);
    const row = await this.getRow(candidateId);
    if (!row || row.version !== expectedVersion) throw new Error('CONCURRENT_MODIFICATION');
    if (row.audits?.length) throw new Error('CANDIDATE_ALREADY_PUBLISHED');
    if (!this.present(store, row, candidate).importEligible || !isNonEmptyString(row.decidedBy) ||
        !row.decidedAt || !isNonEmptyString(row.decisionReason)) throw new Error('CANDIDATE_NOT_IMPORT_ELIGIBLE');

    const history = await this.prisma.weaponTierReviewAudit.findMany({ where: { reviewId: row.id } });
    const boundEvent = (event: any) => event.changes?.recordSha256 === recordSha256 &&
      event.changes?.sourceVersion === candidate.sourceVersion;
    if (!history.some((event: any) => boundEvent(event) && event.action === 'RIGHTS_VERIFIED' &&
          event.actor === row.rightsVerifiedBy && event.changes.basis?.batchSha256 === batchSha256) ||
        !history.some((event: any) => boundEvent(event) && event.changes.decision === 'APPROVE' &&
          event.actor === row.decidedBy && event.changes.batchSha256 === batchSha256) ||
        (candidate.tierChanged && (!row.tierChangeConfirmedAt || !row.tierChangeConfirmedBy ||
          !history.some((event: any) => boundEvent(event) && event.action === 'TIER_CHANGE_CONFIRMED' &&
            event.changes.confirmed === true && event.actor === row.tierChangeConfirmedBy)))) {
      throw new Error('CANDIDATE_AUDIT_INCOMPLETE');
    }

    // Updating the exact reviewed revision serializes against concurrent review mutations and retries.
    const locked = await this.prisma.weaponTierReview.updateMany({
      where: { id: row.id, version: expectedVersion, decision: 'APPROVE', batchSha256, recordSha256 },
      data: { version: { increment: 1 } },
    });
    if (locked.count !== 1) throw new Error('CONCURRENT_MODIFICATION');

    const weapon = await this.prisma.weapon.findUnique({ where: { id: candidate.weaponId } });
    if (!weapon || weapon.type !== candidate.dbWeaponType || weapon.tier || weapon.role) {
      throw new Error('WEAPON_CATALOG_CONFLICT');
    }
    const lineage = { ...this.lineageAuditFields(candidate), candidateId, batchSha256, reviewVersion: expectedVersion };
    const data = {
      weaponId: candidate.weaponId,
      weaponType: candidate.dbWeaponType,
      role: candidate.role,
      tier: candidate.proposedTier,
      refinementContext: candidate.refinement,
      refinementLevel: candidate.refinementLevel,
      versionKey: candidate.gameVersion,
      gameVersion: candidate.gameVersion,
      gameVersionStatus: 'VERIFIED',
      explanationVi: candidate.explanationVi,
      evidence: { ...candidate.evidence, ...lineage },
      rubricVersion: candidate.rubricVersion,
      confidence: candidate.confidence,
      sourceName: candidate.sourceName,
      sourceLocale: candidate.sourceLocale,
      sourceChecksum: recordSha256,
      derivation: 'INDEPENDENT',
      reviewStatus: 'APPROVED',
      publishRightsVerified: true,
      rightsNote: row.rightsBasis.note,
      reviewNotes: row.decisionReason,
      reviewedAt: row.decidedAt,
      approvedBy: row.decidedBy,
    };
    const rank = await this.prisma.weaponTierRank.create({
      data: { ...data, evidence: { ...data.evidence, approvalChecksum: weaponRankingContentChecksum(data) } },
    });
    await this.prisma.weaponTierAudit.create({
      data: { rankingId: rank.id, action: 'PUBLISHED', actor, changes: { ...lineage, approvedBy: row.decidedBy, rightsVerifiedBy: row.rightsVerifiedBy } },
    });
    await this.audit(row.id, 'PUBLISHED', actor, { ...lineage, rankingId: rank.id });
    return rank;
  }

  private async recordDecision(args: any, context: GraphQLContext): Promise<any> {
    const actor = this.actor(context);
    const { candidateId, decision, reason, batchSha256, recordSha256, expectedVersion } = args;
    if (!['APPROVE', 'REQUEST_CHANGES', 'REJECT'].includes(decision)) throw new Error('INVALID_DECISION');
    if (!isNonEmptyString(reason) || reason.trim().length < 10) throw new Error('DECISION_REASON_REQUIRED');
    if (!Number.isInteger(expectedVersion) || expectedVersion < 0) throw new Error('INVALID_CONCURRENCY_TOKEN');

    const store = this.storeFor(args.sourceVersion);
    const candidate = this.candidate(store, candidateId);
    this.assertChecksums(store, candidate, batchSha256, recordSha256);
    const row = await this.ensureRow(store, candidateId, actor, expectedVersion);
    if (row.decision !== 'PENDING' && row.decidedBy !== actor) throw new Error('ADMIN_CONFLICT');
    if (row.decision === 'APPROVE' && decision !== 'APPROVE') throw new Error('APPROVED_DECISION_IMMUTABLE');

    let evidenceSupplement = row.evidenceSupplement ?? null;
    if (args.evidenceSupplement !== null && args.evidenceSupplement !== undefined) {
      if (typeof args.evidenceSupplement !== 'object' || Array.isArray(args.evidenceSupplement)) {
        throw new Error('INVALID_EVIDENCE_SUPPLEMENT');
      }
      evidenceSupplement = {
        ...args.evidenceSupplement,
        supplementedBy: actor,
        supplementedAt: new Date().toISOString(),
      };
    }
    const evidenceAcknowledged = args.evidenceAcknowledged === true || row.evidenceAcknowledged === true;

    if (decision === 'APPROVE') {
      if (!this.hasRights(row, store, candidate)) {
        throw new Error('RIGHTS_NOT_VERIFIED');
      }
      if (!evidenceAcknowledged) throw new Error('GAMEPLAY_EVIDENCE_NOT_ACKNOWLEDGED');
      if (candidate.tierChanged === true && row.tierChangeConfirmed !== true) throw new Error('TIER_CHANGE_NOT_CONFIRMED');
      if (candidate.sourceVersion === 'D2_REVISED' && candidate.evidenceBlockers.length > 0) {
        throw new Error(`REVISION_EVIDENCE_INCOMPLETE:${candidate.evidenceBlockers.join(',')}`);
      }
      if (row.reviewGroup === 'B' && this.supplementMissing(candidate, evidenceSupplement).length) {
        throw new Error('GROUP_B_EVIDENCE_INCOMPLETE');
      }
    }

    const updated = await this.updateWithVersion(row, row.version, {
      decision,
      decisionReason: reason.trim(),
      decidedAt: new Date(),
      decidedBy: actor,
      evidenceAcknowledged,
      evidenceSupplement,
    });
    await this.audit(row.id, row.decision === 'PENDING' ? 'DECISION_RECORDED' : 'DECISION_CHANGED', actor, {
      candidateId,
      previousDecision: row.decision,
      decision,
      reason: reason.trim(),
      batchSha256,
      recordSha256,
      ...this.lineageAuditFields(candidate),
    });
    if (args.evidenceSupplement && row.reviewGroup === 'B') {
      await this.audit(row.id, 'EVIDENCE_SUPPLEMENTED', actor, {
        candidateId,
        fields: Object.keys(args.evidenceSupplement),
        ...this.lineageAuditFields(candidate),
      });
    }
    return this.present(store, updated, candidate);
  }

  private async recordRights(args: any, context: GraphQLContext): Promise<any> {
    const actor = this.actor(context);
    const { candidateId, batchSha256, recordSha256, expectedVersion, note } = args;
    if (!Number.isInteger(expectedVersion) || expectedVersion < 0) throw new Error('INVALID_CONCURRENCY_TOKEN');
    if (!isNonEmptyString(note) || note.trim().length < 10) throw new Error('RIGHTS_NOTE_REQUIRED');
    for (const field of RIGHTS_GROUNDS) {
      if (args[field] !== true) throw new Error(`RIGHTS_GROUND_NOT_CONFIRMED:${field}`);
    }
    const store = this.storeFor(args.sourceVersion);
    const candidate = this.candidate(store, candidateId);
    this.assertChecksums(store, candidate, batchSha256, recordSha256);
    const row = await this.ensureRow(store, candidateId, actor, expectedVersion);
    if (row.decision === 'APPROVE') throw new Error('RIGHTS_IMMUTABLE_AFTER_APPROVAL');

    const basis = {
      ...Object.fromEntries(RIGHTS_GROUNDS.map(field => [field, true])),
      note: note.trim(),
      verifiedBy: actor,
      verifiedAt: new Date().toISOString(),
      recordSha256,
      batchSha256,
      sourceVersion: candidate.sourceVersion,
      stableCandidateId: candidate.stableCandidateId,
      previousChecksum: candidate.previousChecksum,
    };
    const updated = await this.updateWithVersion(row, row.version, {
      rightsVerified: true,
      rightsVerifiedAt: new Date(),
      rightsVerifiedBy: actor,
      rightsBasis: basis,
    });
    await this.audit(row.id, 'RIGHTS_VERIFIED', actor, {
      candidateId,
      basis,
      ...this.lineageAuditFields(candidate),
    });
    return this.present(store, updated, candidate);
  }

  private async recordTierConfirmation(args: any, context: GraphQLContext): Promise<any> {
    const actor = this.actor(context);
    const { candidateId, batchSha256, recordSha256, expectedVersion, confirmed } = args;
    if (typeof confirmed !== 'boolean') throw new Error('TIER_CONFIRMATION_REQUIRED');
    if (!Number.isInteger(expectedVersion) || expectedVersion < 0) throw new Error('INVALID_CONCURRENCY_TOKEN');
    const store = this.storeFor(args.sourceVersion);
    const candidate = this.candidate(store, candidateId);
    if (candidate.tierChanged !== true) throw new Error('NOT_A_TIER_CHANGE');
    this.assertChecksums(store, candidate, batchSha256, recordSha256);
    const row = await this.ensureRow(store, candidateId, actor, expectedVersion);
    if (row.decision === 'APPROVE' && !confirmed) throw new Error('TIER_CONFIRMATION_IMMUTABLE_AFTER_APPROVAL');

    const updated = await this.updateWithVersion(row, row.version, {
      tierChangeConfirmed: confirmed,
      tierChangeConfirmedAt: confirmed ? new Date() : null,
      tierChangeConfirmedBy: confirmed ? actor : null,
    });
    await this.audit(row.id, 'TIER_CHANGE_CONFIRMED', actor, {
      candidateId,
      confirmed,
      change: `${candidate.oldTier} → ${candidate.proposedTier}`,
      ...this.lineageAuditFields(candidate),
    });
    return this.present(store, updated, candidate);
  }
}

export function createWeaponTierReviewService(prisma: any): WeaponTierReviewService {
  return new WeaponTierReviewService(prisma);
}
