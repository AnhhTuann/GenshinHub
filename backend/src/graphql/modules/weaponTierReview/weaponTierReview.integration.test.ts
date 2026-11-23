import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { ApolloServer } from '@apollo/server';
import { PrismaClient } from '@prisma/client';
import { typeDefs, resolvers } from '../../index';
import { createLoaders } from '../../dataloaders';
import { D2_SUFFIX } from './weaponTierReview.sources';
import { weaponRevisionLink } from '../phaseD3/versionedReview';

const target = new URL(process.env.B32_TEST_DATABASE_URL ?? '');
assert.match(target.hostname, /^(127\.0\.0\.1|localhost)$/);
assert.match(target.pathname, /^\/genshinhub_(test_weapon_review_[a-z0-9]+|b32_review_test_97c1)$/);
const TEST_DB = target.pathname.slice(1);
const TEST_URL = target.href;

const prisma = new PrismaClient({ datasourceUrl: TEST_URL });
const server = new ApolloServer({ typeDefs, resolvers });
const ACTOR = 'admin-principal-b32-97c1'; // verified Admin principal, not a person
const OTHER_ACTOR = 'admin-principal-b32-other';
const ROOT = path.resolve(__dirname, '../../../../../');
const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'docs/weapon-tier-independent/freeze-manifest.json'), 'utf8'));
const d2 = JSON.parse(fs.readFileSync(path.join(ROOT, 'docs/tierlist/phase-d2/WEAPON_REVISED_DRAFT.json'), 'utf8'));
const batch = manifest.batchSha256 as string;
const d2Batch = d2.artifactSha256 as string;
const frozenSha = (candidateId: string): string => weaponRevisionLink(candidateId).sourceChecksum;
const revisedSha = (candidateId: string): string => weaponRevisionLink(candidateId).revisedChecksum;
const d2Id = (candidateId: string): string => `${candidateId}${D2_SUFFIX}`;

const CID_A = 'independent-11401-SUPPORT-R1';
const CID_TIER_1 = 'independent-14302-SUPPORT-R5';
const CID_TIER_2 = 'independent-14402-SUB_DPS-R1';
const CID_B = 'independent-12401-SUB_DPS-R1';
const CID_PAUSED = 'independent-13501-MAIN_DPS-R1';
const CID_REJECT = 'independent-13501-MAIN_DPS-R1';

type Ctx = { admin?: boolean; actor?: string };
async function call(query: string, variables: any = {}, opts: Ctx = {}) {
  const admin = opts.admin ?? true;
  const actor = opts.actor ?? ACTOR;
  const result = await server.executeOperation(
    { query, variables },
    {
      contextValue: {
        prisma,
        dataloaders: createLoaders(prisma),
        user: { isAdmin: admin, id: actor },
        isAdmin: admin,
        adminActor: actor,
        userId: null,
      } as any,
    },
  );
  assert.equal(result.body.kind, 'single');
  const response = result.body.singleResult;
  if (response.errors) {
    return { error: response.errors[0].message, data: response.data ?? null };
  }
  return { error: null, data: response.data };
}

const QUEUE = `query Queue($sourceVersion: WeaponTierReviewSource) {
  adminWeaponTierReviewQueue(sourceVersion: $sourceVersion) {
    candidateId stableCandidateId previousCandidateId
    weaponId weaponName weaponType dbWeaponType role refinement refinementLevel
    proposedTier previousTier tierChanged explanationVi gameplayAssumptions exactGameFacts
    evidence confidence approvalChecksum batchSha256 reviewGroup decision decidedBy decidedAt
    rightsStatus rightsVerified rightsVerifiedBy rightsBasis tierChangeConfirmed evidenceAcknowledged
    version blockedReason importEligible
    previousVersion currentVersion sourceChecksum revisedChecksum currentChecksum
    versionDiff versionReviewStatus approvalCarriedOver
  }
}`;

const DECIDE = `mutation Decide(
  $candidateId: String!, $decision: WeaponTierDecision!, $reason: String!,
  $batchSha256: String!, $recordSha256: String!, $expectedVersion: Int!,
  $evidenceAcknowledged: Boolean, $evidenceSupplement: JSON,
  $sourceVersion: WeaponTierReviewSource
) {
  adminDecideWeaponTierReview(
    candidateId: $candidateId, decision: $decision, reason: $reason,
    batchSha256: $batchSha256, recordSha256: $recordSha256, expectedVersion: $expectedVersion,
    evidenceAcknowledged: $evidenceAcknowledged, evidenceSupplement: $evidenceSupplement,
    sourceVersion: $sourceVersion
  ) {
    candidateId decision decidedBy decidedAt version importEligible blockedReason decisionReason
  }
}`;

const VERIFY_RIGHTS = `mutation Rights(
  $candidateId: String!, $batchSha256: String!, $recordSha256: String!, $expectedVersion: Int!,
  $independentRanking: Boolean!, $originalExplanation: Boolean!, $noGenshinBuildsEditorialCopy: Boolean!,
  $gameFactsAttributionCorrect: Boolean!, $evidenceValid: Boolean!, $note: String!,
  $sourceVersion: WeaponTierReviewSource
) {
  adminVerifyWeaponTierReviewRights(
    candidateId: $candidateId, batchSha256: $batchSha256, recordSha256: $recordSha256,
    expectedVersion: $expectedVersion, independentRanking: $independentRanking,
    originalExplanation: $originalExplanation, noGenshinBuildsEditorialCopy: $noGenshinBuildsEditorialCopy,
    gameFactsAttributionCorrect: $gameFactsAttributionCorrect, evidenceValid: $evidenceValid, note: $note,
    sourceVersion: $sourceVersion
  ) {
    candidateId rightsVerified rightsVerifiedBy rightsVerifiedAt rightsBasis version
  }
}`;

const CONFIRM_TIER = `mutation Tier(
  $candidateId: String!, $batchSha256: String!, $recordSha256: String!,
  $expectedVersion: Int!, $confirmed: Boolean!, $sourceVersion: WeaponTierReviewSource
) {
  adminConfirmWeaponTierChange(
    candidateId: $candidateId, batchSha256: $batchSha256, recordSha256: $recordSha256,
    expectedVersion: $expectedVersion, confirmed: $confirmed, sourceVersion: $sourceVersion
  ) { candidateId tierChangeConfirmed tierChangeConfirmedBy tierChangeConfirmedAt version }
}`;

const AUDIT = `query Audit($candidateId: String!, $sourceVersion: WeaponTierReviewSource) {
  adminWeaponTierReviewAudit(candidateId: $candidateId, sourceVersion: $sourceVersion) {
    id action actor changes createdAt
  }
}`;

const rightsArgs = (candidateId: string, version: number, sourceVersion = 'D2_REVISED') => ({
  candidateId: sourceVersion === 'D2_REVISED' && !candidateId.endsWith(D2_SUFFIX) ? d2Id(candidateId) : candidateId,
  batchSha256: sourceVersion === 'D2_REVISED' ? d2Batch : batch,
  recordSha256: sourceVersion === 'D2_REVISED' ? revisedSha(candidateId.replace(D2_SUFFIX, '')) : frozenSha(candidateId),
  expectedVersion: version,
  independentRanking: true, originalExplanation: true, noGenshinBuildsEditorialCopy: true,
  gameFactsAttributionCorrect: true, evidenceValid: true,
  note: 'Verified independent text, original explanation, no editorial copy, attributed facts and valid evidence.',
  sourceVersion,
});
const decideArgs = (candidateId: string, decision: string, version: number, extra: any = {}) => {
  const sourceVersion = extra.sourceVersion ?? 'D2_REVISED';
  return {
    candidateId: sourceVersion === 'D2_REVISED' && !candidateId.endsWith(D2_SUFFIX) ? d2Id(candidateId) : candidateId,
    decision,
    reason: `Explicit admin decision after full review: ${candidateId}.`,
    batchSha256: sourceVersion === 'D2_REVISED' ? d2Batch : batch,
    recordSha256: sourceVersion === 'D2_REVISED' ? revisedSha(candidateId.replace(D2_SUFFIX, '')) : frozenSha(candidateId),
    expectedVersion: version,
    sourceVersion,
    ...extra,
  };
};

before(async () => {
  const [identity] = await prisma.$queryRaw`SELECT current_database() AS database` as any[];
  assert.equal(identity.database, TEST_DB, 'tests must run on the isolated test DB');
  await prisma.weaponTierReviewAudit.deleteMany({});
  await prisma.weaponTierReview.deleteMany({});
  assert.equal(await prisma.weaponTierRank.count(), 0);
  assert.equal(await prisma.weaponTierAudit.count(), 0);
});

after(async () => {
  await prisma.weaponTierReviewAudit.deleteMany({});
  await prisma.weaponTierReview.deleteMany({});
  await prisma.$disconnect();
});

test('admin login context is required: unauthenticated and fake actors are rejected', async () => {
  const unauth = await call(QUEUE, {}, { admin: false });
  assert.match(unauth.error ?? '', /Unauthorized: Admin access required/);
  const fake = await call(QUEUE, {}, { admin: true, actor: 'admin-key' });
  assert.match(fake.error ?? '', /ADMIN_ACTOR_REQUIRED/);
  const mutation = await call(DECIDE, decideArgs(CID_A, 'APPROVE', 0), { admin: false });
  assert.match(mutation.error ?? '', /Unauthorized: Admin access required/);
});

test('FROZEN queue still exposes 14 candidates and unchanged checksum binding', async () => {
  const { error, data } = await call(QUEUE);
  assert.equal(error, null);
  const rows = data!.adminWeaponTierReviewQueue as any[];
  assert.equal(rows.length, 14);
  assert.equal(rows.filter(r => r.reviewGroup === 'A').length, 13);
  assert.equal(rows.filter(r => r.reviewGroup === 'B').length, 1);
  assert.equal(rows.filter(r => r.decision === 'PENDING').length, 14);
  assert.equal(rows.filter(r => r.importEligible).length, 0);
  for (const r of rows) {
    assert.ok(r.candidateId && r.weaponId && r.weaponName && r.weaponType && r.dbWeaponType);
    assert.ok(r.role && r.refinement && r.proposedTier && r.explanationVi);
    assert.ok(r.evidence && r.evidence.rubric && Array.isArray(r.evidence.primaryEvidence));
    assert.ok(Array.isArray(r.gameplayAssumptions) && r.gameplayAssumptions.length > 0);
    assert.ok(Array.isArray(r.exactGameFacts) && r.exactGameFacts.length > 0);
    assert.ok(['HIGH', 'MEDIUM', 'LOW'].includes(r.confidence));
    assert.equal(r.approvalChecksum, frozenSha(r.candidateId));
    assert.equal(r.batchSha256, batch);
    assert.ok(r.rightsStatus && r.rightsStatus.publishRightsVerified === false);
    assert.equal(r.rightsVerified, false);
    assert.equal(r.currentVersion, 'FROZEN');
    assert.equal(r.approvalCarriedOver, false);
  }
  const tier1 = rows.find(r => r.candidateId === CID_TIER_1)!;
  assert.equal(tier1.previousTier, 'SS');
  assert.equal(tier1.proposedTier, 'S');
  assert.equal(tier1.tierChanged, true);
  const tier2 = rows.find(r => r.candidateId === CID_TIER_2)!;
  assert.equal(tier2.previousTier, 'S');
  assert.equal(tier2.proposedTier, 'A');
  assert.equal(tier2.tierChanged, true);
  const b = rows.find(r => r.candidateId === CID_B)!;
  assert.equal(b.blockedReason, null);
});

test('D2_REVISED queue contains 14 fresh versioned candidates with no inherited approval', async () => {
  const { error, data } = await call(QUEUE, { sourceVersion: 'D2_REVISED' });
  assert.equal(error, null);
  const rows = data!.adminWeaponTierReviewQueue as any[];
  assert.equal(rows.length, 14);
  assert.ok(rows.every(r => r.candidateId.endsWith(D2_SUFFIX)));
  assert.equal(new Set(rows.map(r => r.stableCandidateId)).size, 14);
  assert.equal(rows.filter(r => r.decision === 'PENDING').length, 14);
  assert.equal(rows.filter(r => r.importEligible).length, 0);
  for (const r of rows) {
    assert.equal(r.batchSha256, d2Batch);
    assert.equal(r.currentVersion, 'D2_REVISED');
    assert.equal(r.previousVersion, 'B3_1_FROZEN');
    assert.equal(r.sourceChecksum, frozenSha(r.stableCandidateId));
    assert.equal(r.revisedChecksum, revisedSha(r.stableCandidateId));
    assert.equal(r.currentChecksum, r.revisedChecksum);
    assert.equal(r.approvalChecksum, r.revisedChecksum);
    assert.equal(r.approvalCarriedOver, false);
    assert.equal(r.previousCandidateId, r.stableCandidateId);
    assert.ok(Array.isArray(r.versionDiff));
    assert.equal(r.rightsVerified, false);
  }
  const changed = rows.find(r => r.stableCandidateId === CID_TIER_1)!;
  assert.equal(changed.previousTier, 'SS');
  assert.equal(changed.proposedTier, 'S');
  assert.equal(changed.versionReviewStatus, 'MANDATORY_TIER_RE_REVIEW_PENDING');
  assert.ok(changed.versionDiff.length > 0);
});

test('checksum mismatch rejects bad hashes, cross-version hashes and tampered sources', async () => {
  const badBatch = await call(DECIDE, { ...decideArgs(CID_A, 'APPROVE', 0), batchSha256: '0'.repeat(64) });
  assert.match(badBatch.error ?? '', /BATCH_CHECKSUM_MISMATCH/);
  const badRecord = await call(DECIDE, { ...decideArgs(CID_A, 'APPROVE', 0), recordSha256: 'f'.repeat(64) });
  assert.match(badRecord.error ?? '', /RECORD_CHECKSUM_MISMATCH/);
  const crossVersion = await call(DECIDE, { ...decideArgs(CID_A, 'APPROVE', 0), recordSha256: frozenSha(CID_A) });
  assert.match(crossVersion.error ?? '', /SUPERSEDED_VERSION/);
  const d2WrongBatch = await call(DECIDE, {
    ...decideArgs(d2Id(CID_A), 'APPROVE', 0, { sourceVersion: 'D2_REVISED' }),
    batchSha256: batch,
  });
  assert.match(d2WrongBatch.error ?? '', /BATCH_CHECKSUM_MISMATCH/);
  const d2OldChecksum = await call(DECIDE, {
    ...decideArgs(d2Id(CID_A), 'APPROVE', 0, { sourceVersion: 'D2_REVISED' }),
    recordSha256: frozenSha(CID_A),
  });
  assert.match(d2OldChecksum.error ?? '', /SUPERSEDED_VERSION/);
  assert.equal(await prisma.weaponTierReview.count(), 0);
});

test('a D2 row bound to the frozen checksum cannot inherit the older approval', async () => {
  await prisma.weaponTierReview.create({
    data: {
      candidateId: d2Id(CID_A),
      weaponId: '11401',
      batchSha256: d2Batch,
      recordSha256: frozenSha(CID_A),
      reviewGroup: 'A',
      decision: 'APPROVE' as any,
      decidedBy: ACTOR,
      decidedAt: new Date(),
      decisionReason: 'Legacy approval that must not carry over.',
      version: 0,
    },
  });
  const blocked = await call(DECIDE, decideArgs(d2Id(CID_A), 'REQUEST_CHANGES', 0, { sourceVersion: 'D2_REVISED' }));
  assert.match(blocked.error ?? '', /SUPERSEDED_REVIEW_VERSION/);
  await prisma.weaponTierReviewAudit.deleteMany({});
  await prisma.weaponTierReview.deleteMany({});
});

test('APPROVE is blocked until rights, evidence and tier re-review are confirmed', async () => {
  const blocked = await call(DECIDE, decideArgs(CID_TIER_1, 'APPROVE', 0, { evidenceAcknowledged: true }));
  assert.match(blocked.error ?? '', /RIGHTS_NOT_VERIFIED/);
  const row = await prisma.weaponTierReview.findUnique({ where: { candidateId: d2Id(CID_TIER_1) } });
  assert.equal(row, null, 'failing decision rolls back the review and audit');

  await call(VERIFY_RIGHTS, rightsArgs(CID_TIER_1, 0));
  const noEvidence = await call(DECIDE, decideArgs(CID_TIER_1, 'APPROVE', 1));
  assert.match(noEvidence.error ?? '', /GAMEPLAY_EVIDENCE_NOT_ACKNOWLEDGED/);
  const confirmed = await prisma.weaponTierReview.findUnique({ where: { candidateId: d2Id(CID_TIER_1) } });
  await call(CONFIRM_TIER, {
    candidateId: d2Id(CID_TIER_1), batchSha256: d2Batch, recordSha256: revisedSha(CID_TIER_1), sourceVersion: 'D2_REVISED',
    expectedVersion: confirmed!.version, confirmed: true,
  });
  const finalVersion = (await prisma.weaponTierReview.findUnique({ where: { candidateId: d2Id(CID_TIER_1) } }))!.version;
  const approved = await call(DECIDE, decideArgs(CID_TIER_1, 'APPROVE', finalVersion, { evidenceAcknowledged: true }));
  assert.equal(approved.error, null);
  const r = approved.data!.adminDecideWeaponTierReview as any;
  assert.equal(r.decision, 'APPROVE');
  assert.equal(r.decidedBy, ACTOR);
  assert.ok(r.decidedAt);
  assert.equal(r.importEligible, true);
});

test('rights verification stores the five grounds, note and server-derived verifier', async () => {
  const result = await call(VERIFY_RIGHTS, rightsArgs(CID_A, 0));
  assert.equal(result.error, null);
  const r = result.data!.adminVerifyWeaponTierReviewRights as any;
  assert.equal(r.rightsVerified, true);
  assert.equal(r.rightsVerifiedBy, ACTOR);
  assert.ok(r.rightsVerifiedAt);
  for (const field of ['independentRanking', 'originalExplanation', 'noGenshinBuildsEditorialCopy', 'gameFactsAttributionCorrect', 'evidenceValid']) {
    assert.equal(r.rightsBasis[field], true);
  }
  assert.match(r.rightsBasis.note, /Verified independent text/);
  assert.equal(r.rightsBasis.verifiedBy, ACTOR);
  assert.equal(r.rightsBasis.recordSha256, revisedSha(CID_A));

  const missingGround = await call(VERIFY_RIGHTS, { ...rightsArgs(CID_TIER_2, 0), evidenceValid: false });
  assert.match(missingGround.error ?? '', /RIGHTS_GROUND_NOT_CONFIRMED:evidenceValid/);
});

test('tier changes cannot be confirmed on frozen dossiers and each revised tier has its own confirmation', async () => {
  const frozen = await call(CONFIRM_TIER, {
    candidateId: CID_TIER_2, batchSha256: batch, recordSha256: frozenSha(CID_TIER_2),
    expectedVersion: 0, confirmed: true, sourceVersion: 'FROZEN',
  });
  assert.match(frozen.error ?? '', /FROZEN_REVIEW_READ_ONLY/);
  const wrong = await call(CONFIRM_TIER, {
    candidateId: d2Id(CID_A), batchSha256: d2Batch, recordSha256: revisedSha(CID_A),
    expectedVersion: 1, confirmed: true, sourceVersion: 'D2_REVISED',
  });
  assert.match(wrong.error ?? '', /NOT_A_TIER_CHANGE/);
  const confirmed = await call(CONFIRM_TIER, {
    candidateId: d2Id(CID_TIER_2), batchSha256: d2Batch, recordSha256: revisedSha(CID_TIER_2),
    expectedVersion: 0, confirmed: true, sourceVersion: 'D2_REVISED',
  });
  assert.equal(confirmed.error, null);
  assert.equal((confirmed.data!.adminConfirmWeaponTierChange as any).tierChangeConfirmed, true);
  assert.equal((await prisma.weaponTierReview.findUniqueOrThrow({ where: { candidateId: d2Id(CID_TIER_2) } })).recordSha256, revisedSha(CID_TIER_2));
});

test('Favonius Greatsword frozen dossier is historical and cannot be edited', async () => {
  const frozen = await call(VERIFY_RIGHTS, rightsArgs(CID_B, 0, 'FROZEN'));
  assert.match(frozen.error ?? '', /FROZEN_REVIEW_READ_ONLY/);
  assert.equal(await prisma.weaponTierReview.findUnique({ where: { candidateId: CID_B } }), null);
});

test('D2 blocked and paused weapons stay ineligible even after rights and evidence acknowledgement', async () => {
  for (const base of [CID_B, CID_PAUSED]) {
    const id = d2Id(base);
    const rights = await call(VERIFY_RIGHTS, rightsArgs(id, 0, 'D2_REVISED'));
    assert.equal(rights.error, null);
    const row = (await prisma.weaponTierReview.findUnique({ where: { candidateId: id } }))!;
    const approve = await call(DECIDE, decideArgs(id, 'APPROVE', row.version, {
      sourceVersion: 'D2_REVISED', evidenceAcknowledged: true,
    }));
    assert.match(approve.error ?? '', /REVISION_EVIDENCE_INCOMPLETE/);
    assert.equal((await prisma.weaponTierReview.findUnique({ where: { candidateId: id } }))!.decision, 'PENDING');
  }
});

test('a reviewable D2 record can be decided only with its own checksum and fresh state', async () => {
  const id = d2Id(CID_A);
  const rights = await call(VERIFY_RIGHTS, rightsArgs(id, 1, 'D2_REVISED'));
  assert.equal(rights.error, null);
  assert.equal((rights.data!.adminVerifyWeaponTierReviewRights as any).rightsBasis.recordSha256, revisedSha(CID_A));
  const row = (await prisma.weaponTierReview.findUnique({ where: { candidateId: id } }))!;
  const approve = await call(DECIDE, decideArgs(id, 'APPROVE', row.version, {
    sourceVersion: 'D2_REVISED', evidenceAcknowledged: true,
  }));
  assert.equal(approve.error, null);
  const r = approve.data!.adminDecideWeaponTierReview as any;
  assert.equal(r.decision, 'APPROVE');
  assert.equal(r.importEligible, true);
  assert.equal(await prisma.weaponTierReview.findUnique({ where: { candidateId: CID_A } }), null);
});

test('REQUEST_CHANGES and REJECT are recorded with a reason and are not import eligible', async () => {
  const rc = await call(DECIDE, decideArgs(CID_REJECT, 'REQUEST_CHANGES', 1));
  assert.equal(rc.error, null);
  assert.equal((rc.data!.adminDecideWeaponTierReview as any).decision, 'REQUEST_CHANGES');
  const rej = await call(DECIDE, {
    ...decideArgs('independent-15508-MAIN_DPS-R1', 'REJECT', 0),
    reason: 'Rejected after review: insufficient broad-main-DPS justification for this refinement.',
  });
  assert.equal(rej.error, null);
  assert.equal((rej.data!.adminDecideWeaponTierReview as any).decision, 'REJECT');
  const rows = (await call(QUEUE, { sourceVersion: 'D2_REVISED' })).data!.adminWeaponTierReviewQueue as any[];
  assert.equal(rows.find(r => r.candidateId === d2Id(CID_REJECT))!.importEligible, false);
  assert.equal(rows.find(r => r.weaponId === '15508')!.importEligible, false);
});

test('stale expectedVersion is rejected (concurrent edit protection)', async () => {
  const cid = 'independent-11403-SUB_DPS-R5';
  const first = await call(DECIDE, decideArgs(cid, 'REQUEST_CHANGES', 0));
  assert.equal(first.error, null);
  const stale = await call(DECIDE, decideArgs(cid, 'APPROVE', 0));
  assert.match(stale.error ?? '', /CONCURRENT_MODIFICATION/);
  const current = (await prisma.weaponTierReview.findUnique({ where: { candidateId: d2Id(cid) } }))!;
  assert.equal(current.decision, 'REQUEST_CHANGES');
});

test('different Admin principal cannot overwrite an existing decision', async () => {
  const cid = 'independent-11418-SUPPORT-R1';
  const first = await call(DECIDE, decideArgs(cid, 'APPROVE', 0, { evidenceAcknowledged: true }));
  assert.match(first.error ?? '', /RIGHTS_NOT_VERIFIED/);
  const rc = await call(DECIDE, decideArgs(cid, 'REQUEST_CHANGES', 0));
  assert.equal(rc.error, null);
  const current = (await prisma.weaponTierReview.findUnique({ where: { candidateId: d2Id(cid) } }))!;
  const conflict = await call(DECIDE, decideArgs(cid, 'APPROVE', current.version), { actor: OTHER_ACTOR });
  assert.match(conflict.error ?? '', /ADMIN_CONFLICT/);
});

test('audit history is ordered, server-derived and records the D2 lineage', async () => {
  const { error, data } = await call(AUDIT, { candidateId: d2Id(CID_TIER_1), sourceVersion: 'D2_REVISED' });
  assert.equal(error, null);
  const entries = data!.adminWeaponTierReviewAudit as any[];
  assert.ok(entries.length >= 4);
  assert.ok(entries.every(e => e.actor === ACTOR));
  const actions = entries.map(e => e.action);
  assert.ok(actions.includes('REVIEW_CREATED'));
  assert.ok(actions.includes('RIGHTS_VERIFIED'));
  assert.ok(actions.includes('TIER_CHANGE_CONFIRMED'));
  assert.ok(actions.includes('DECISION_RECORDED'));
  const times = entries.map(e => Date.parse(e.createdAt));
  assert.deepEqual(times, [...times].sort((a, b) => a - b));
  const d2Audit = await call(AUDIT, { candidateId: d2Id(CID_A), sourceVersion: 'D2_REVISED' });
  assert.equal(d2Audit.error, null);
  const d2Entries = d2Audit.data!.adminWeaponTierReviewAudit as any[];
  assert.ok(d2Entries.some(e => e.changes?.sourceVersion === 'D2_REVISED'));
  assert.ok(d2Entries.some(e => e.changes?.previousChecksum === frozenSha(CID_A)));
  const unauth = await call(AUDIT, { candidateId: CID_TIER_1 }, { admin: false });
  assert.match(unauth.error ?? '', /Unauthorized: Admin access required/);
});

test('public GraphQL still exposes only approved, independent, rights-verified rankings', async () => {
  const result = await server.executeOperation(
    { query: '{ weaponTierRanks(limit: 500) { id weaponId reviewStatus derivation publishRightsVerified } }' },
    { contextValue: { prisma, dataloaders: createLoaders(prisma), user: { isAdmin: false }, isAdmin: false } as any },
  );
  assert.equal(result.body.kind, 'single');
  const body = result.body as any;
  assert.equal(body.singleResult.errors, undefined);
  assert.ok(Array.isArray(body.singleResult.data.weaponTierRanks));
  assert.ok(body.singleResult.data.weaponTierRanks.every((r: any) =>
    r.reviewStatus === 'APPROVED' && r.derivation === 'INDEPENDENT' && r.publishRightsVerified === true));
  assert.equal(await prisma.weaponTierRank.count(), 0);
});
