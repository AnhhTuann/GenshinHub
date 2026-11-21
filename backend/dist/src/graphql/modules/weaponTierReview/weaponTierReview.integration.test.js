"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = __importStar(require("node:test"));
const strict_1 = __importDefault(require("node:assert/strict"));
const fs = __importStar(require("node:fs"));
const path = __importStar(require("node:path"));
const server_1 = require("@apollo/server");
const client_1 = require("@prisma/client");
const index_1 = require("../../index");
const dataloaders_1 = require("../../dataloaders");
const weaponTierReview_sources_1 = require("./weaponTierReview.sources");
const versionedReview_1 = require("../phaseD3/versionedReview");
const target = new URL(process.env.B32_TEST_DATABASE_URL ?? '');
strict_1.default.match(target.hostname, /^(127\.0\.0\.1|localhost)$/);
strict_1.default.match(target.pathname, /^\/genshinhub_(test_weapon_review_[a-z0-9]+|b32_review_test_97c1)$/);
const TEST_DB = target.pathname.slice(1);
const TEST_URL = target.href;
const prisma = new client_1.PrismaClient({ datasourceUrl: TEST_URL });
const server = new server_1.ApolloServer({ typeDefs: index_1.typeDefs, resolvers: index_1.resolvers });
const ACTOR = 'admin-principal-b32-97c1'; // verified Admin principal, not a person
const OTHER_ACTOR = 'admin-principal-b32-other';
const ROOT = path.resolve(__dirname, '../../../../../');
const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'docs/weapon-tier-independent/freeze-manifest.json'), 'utf8'));
const d2 = JSON.parse(fs.readFileSync(path.join(ROOT, 'docs/tierlist/phase-d2/WEAPON_REVISED_DRAFT.json'), 'utf8'));
const batch = manifest.batchSha256;
const d2Batch = d2.artifactSha256;
const frozenSha = (candidateId) => (0, versionedReview_1.weaponRevisionLink)(candidateId).sourceChecksum;
const revisedSha = (candidateId) => (0, versionedReview_1.weaponRevisionLink)(candidateId).revisedChecksum;
const d2Id = (candidateId) => `${candidateId}${weaponTierReview_sources_1.D2_SUFFIX}`;
const CID_A = 'independent-11401-SUPPORT-R1';
const CID_TIER_1 = 'independent-14302-SUPPORT-R5';
const CID_TIER_2 = 'independent-14402-SUB_DPS-R1';
const CID_B = 'independent-12401-SUB_DPS-R1';
const CID_PAUSED = 'independent-13501-MAIN_DPS-R1';
const CID_REJECT = 'independent-13501-MAIN_DPS-R1';
async function call(query, variables = {}, opts = {}) {
    const admin = opts.admin ?? true;
    const actor = opts.actor ?? ACTOR;
    const result = await server.executeOperation({ query, variables }, {
        contextValue: {
            prisma,
            dataloaders: (0, dataloaders_1.createLoaders)(prisma),
            user: { isAdmin: admin, id: actor },
            isAdmin: admin,
            adminActor: actor,
            userId: null,
        },
    });
    strict_1.default.equal(result.body.kind, 'single');
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
const rightsArgs = (candidateId, version, sourceVersion = 'D2_REVISED') => ({
    candidateId: sourceVersion === 'D2_REVISED' && !candidateId.endsWith(weaponTierReview_sources_1.D2_SUFFIX) ? d2Id(candidateId) : candidateId,
    batchSha256: sourceVersion === 'D2_REVISED' ? d2Batch : batch,
    recordSha256: sourceVersion === 'D2_REVISED' ? revisedSha(candidateId.replace(weaponTierReview_sources_1.D2_SUFFIX, '')) : frozenSha(candidateId),
    expectedVersion: version,
    independentRanking: true, originalExplanation: true, noGenshinBuildsEditorialCopy: true,
    gameFactsAttributionCorrect: true, evidenceValid: true,
    note: 'Verified independent text, original explanation, no editorial copy, attributed facts and valid evidence.',
    sourceVersion,
});
const decideArgs = (candidateId, decision, version, extra = {}) => {
    const sourceVersion = extra.sourceVersion ?? 'D2_REVISED';
    return {
        candidateId: sourceVersion === 'D2_REVISED' && !candidateId.endsWith(weaponTierReview_sources_1.D2_SUFFIX) ? d2Id(candidateId) : candidateId,
        decision,
        reason: `Explicit admin decision after full review: ${candidateId}.`,
        batchSha256: sourceVersion === 'D2_REVISED' ? d2Batch : batch,
        recordSha256: sourceVersion === 'D2_REVISED' ? revisedSha(candidateId.replace(weaponTierReview_sources_1.D2_SUFFIX, '')) : frozenSha(candidateId),
        expectedVersion: version,
        sourceVersion,
        ...extra,
    };
};
(0, node_test_1.before)(async () => {
    const [identity] = await prisma.$queryRaw `SELECT current_database() AS database`;
    strict_1.default.equal(identity.database, TEST_DB, 'tests must run on the isolated test DB');
    await prisma.weaponTierReviewAudit.deleteMany({});
    await prisma.weaponTierReview.deleteMany({});
    strict_1.default.equal(await prisma.weaponTierRank.count(), 0);
    strict_1.default.equal(await prisma.weaponTierAudit.count(), 0);
});
(0, node_test_1.after)(async () => {
    await prisma.weaponTierReviewAudit.deleteMany({});
    await prisma.weaponTierReview.deleteMany({});
    await prisma.$disconnect();
});
(0, node_test_1.default)('admin login context is required: unauthenticated and fake actors are rejected', async () => {
    const unauth = await call(QUEUE, {}, { admin: false });
    strict_1.default.match(unauth.error ?? '', /Unauthorized: Admin access required/);
    const fake = await call(QUEUE, {}, { admin: true, actor: 'admin-key' });
    strict_1.default.match(fake.error ?? '', /ADMIN_ACTOR_REQUIRED/);
    const mutation = await call(DECIDE, decideArgs(CID_A, 'APPROVE', 0), { admin: false });
    strict_1.default.match(mutation.error ?? '', /Unauthorized: Admin access required/);
});
(0, node_test_1.default)('FROZEN queue still exposes 14 candidates and unchanged checksum binding', async () => {
    const { error, data } = await call(QUEUE);
    strict_1.default.equal(error, null);
    const rows = data.adminWeaponTierReviewQueue;
    strict_1.default.equal(rows.length, 14);
    strict_1.default.equal(rows.filter(r => r.reviewGroup === 'A').length, 13);
    strict_1.default.equal(rows.filter(r => r.reviewGroup === 'B').length, 1);
    strict_1.default.equal(rows.filter(r => r.decision === 'PENDING').length, 14);
    strict_1.default.equal(rows.filter(r => r.importEligible).length, 0);
    for (const r of rows) {
        strict_1.default.ok(r.candidateId && r.weaponId && r.weaponName && r.weaponType && r.dbWeaponType);
        strict_1.default.ok(r.role && r.refinement && r.proposedTier && r.explanationVi);
        strict_1.default.ok(r.evidence && r.evidence.rubric && Array.isArray(r.evidence.primaryEvidence));
        strict_1.default.ok(Array.isArray(r.gameplayAssumptions) && r.gameplayAssumptions.length > 0);
        strict_1.default.ok(Array.isArray(r.exactGameFacts) && r.exactGameFacts.length > 0);
        strict_1.default.ok(['HIGH', 'MEDIUM', 'LOW'].includes(r.confidence));
        strict_1.default.equal(r.approvalChecksum, frozenSha(r.candidateId));
        strict_1.default.equal(r.batchSha256, batch);
        strict_1.default.ok(r.rightsStatus && r.rightsStatus.publishRightsVerified === false);
        strict_1.default.equal(r.rightsVerified, false);
        strict_1.default.equal(r.currentVersion, 'FROZEN');
        strict_1.default.equal(r.approvalCarriedOver, false);
    }
    const tier1 = rows.find(r => r.candidateId === CID_TIER_1);
    strict_1.default.equal(tier1.previousTier, 'SS');
    strict_1.default.equal(tier1.proposedTier, 'S');
    strict_1.default.equal(tier1.tierChanged, true);
    const tier2 = rows.find(r => r.candidateId === CID_TIER_2);
    strict_1.default.equal(tier2.previousTier, 'S');
    strict_1.default.equal(tier2.proposedTier, 'A');
    strict_1.default.equal(tier2.tierChanged, true);
    const b = rows.find(r => r.candidateId === CID_B);
    strict_1.default.equal(b.blockedReason, null);
});
(0, node_test_1.default)('D2_REVISED queue contains 14 fresh versioned candidates with no inherited approval', async () => {
    const { error, data } = await call(QUEUE, { sourceVersion: 'D2_REVISED' });
    strict_1.default.equal(error, null);
    const rows = data.adminWeaponTierReviewQueue;
    strict_1.default.equal(rows.length, 14);
    strict_1.default.ok(rows.every(r => r.candidateId.endsWith(weaponTierReview_sources_1.D2_SUFFIX)));
    strict_1.default.equal(new Set(rows.map(r => r.stableCandidateId)).size, 14);
    strict_1.default.equal(rows.filter(r => r.decision === 'PENDING').length, 14);
    strict_1.default.equal(rows.filter(r => r.importEligible).length, 0);
    for (const r of rows) {
        strict_1.default.equal(r.batchSha256, d2Batch);
        strict_1.default.equal(r.currentVersion, 'D2_REVISED');
        strict_1.default.equal(r.previousVersion, 'B3_1_FROZEN');
        strict_1.default.equal(r.sourceChecksum, frozenSha(r.stableCandidateId));
        strict_1.default.equal(r.revisedChecksum, revisedSha(r.stableCandidateId));
        strict_1.default.equal(r.currentChecksum, r.revisedChecksum);
        strict_1.default.equal(r.approvalChecksum, r.revisedChecksum);
        strict_1.default.equal(r.approvalCarriedOver, false);
        strict_1.default.equal(r.previousCandidateId, r.stableCandidateId);
        strict_1.default.ok(Array.isArray(r.versionDiff));
        strict_1.default.equal(r.rightsVerified, false);
    }
    const changed = rows.find(r => r.stableCandidateId === CID_TIER_1);
    strict_1.default.equal(changed.previousTier, 'SS');
    strict_1.default.equal(changed.proposedTier, 'S');
    strict_1.default.equal(changed.versionReviewStatus, 'MANDATORY_TIER_RE_REVIEW_PENDING');
    strict_1.default.ok(changed.versionDiff.length > 0);
});
(0, node_test_1.default)('checksum mismatch rejects bad hashes, cross-version hashes and tampered sources', async () => {
    const badBatch = await call(DECIDE, { ...decideArgs(CID_A, 'APPROVE', 0), batchSha256: '0'.repeat(64) });
    strict_1.default.match(badBatch.error ?? '', /BATCH_CHECKSUM_MISMATCH/);
    const badRecord = await call(DECIDE, { ...decideArgs(CID_A, 'APPROVE', 0), recordSha256: 'f'.repeat(64) });
    strict_1.default.match(badRecord.error ?? '', /RECORD_CHECKSUM_MISMATCH/);
    const crossVersion = await call(DECIDE, { ...decideArgs(CID_A, 'APPROVE', 0), recordSha256: frozenSha(CID_A) });
    strict_1.default.match(crossVersion.error ?? '', /SUPERSEDED_VERSION/);
    const d2WrongBatch = await call(DECIDE, {
        ...decideArgs(d2Id(CID_A), 'APPROVE', 0, { sourceVersion: 'D2_REVISED' }),
        batchSha256: batch,
    });
    strict_1.default.match(d2WrongBatch.error ?? '', /BATCH_CHECKSUM_MISMATCH/);
    const d2OldChecksum = await call(DECIDE, {
        ...decideArgs(d2Id(CID_A), 'APPROVE', 0, { sourceVersion: 'D2_REVISED' }),
        recordSha256: frozenSha(CID_A),
    });
    strict_1.default.match(d2OldChecksum.error ?? '', /SUPERSEDED_VERSION/);
    strict_1.default.equal(await prisma.weaponTierReview.count(), 0);
});
(0, node_test_1.default)('a D2 row bound to the frozen checksum cannot inherit the older approval', async () => {
    await prisma.weaponTierReview.create({
        data: {
            candidateId: d2Id(CID_A),
            weaponId: '11401',
            batchSha256: d2Batch,
            recordSha256: frozenSha(CID_A),
            reviewGroup: 'A',
            decision: 'APPROVE',
            decidedBy: ACTOR,
            decidedAt: new Date(),
            decisionReason: 'Legacy approval that must not carry over.',
            version: 0,
        },
    });
    const blocked = await call(DECIDE, decideArgs(d2Id(CID_A), 'REQUEST_CHANGES', 0, { sourceVersion: 'D2_REVISED' }));
    strict_1.default.match(blocked.error ?? '', /SUPERSEDED_REVIEW_VERSION/);
    await prisma.weaponTierReviewAudit.deleteMany({});
    await prisma.weaponTierReview.deleteMany({});
});
(0, node_test_1.default)('APPROVE is blocked until rights, evidence and tier re-review are confirmed', async () => {
    const blocked = await call(DECIDE, decideArgs(CID_TIER_1, 'APPROVE', 0, { evidenceAcknowledged: true }));
    strict_1.default.match(blocked.error ?? '', /RIGHTS_NOT_VERIFIED/);
    const row = await prisma.weaponTierReview.findUnique({ where: { candidateId: d2Id(CID_TIER_1) } });
    strict_1.default.equal(row, null, 'failing decision rolls back the review and audit');
    await call(VERIFY_RIGHTS, rightsArgs(CID_TIER_1, 0));
    const noEvidence = await call(DECIDE, decideArgs(CID_TIER_1, 'APPROVE', 1));
    strict_1.default.match(noEvidence.error ?? '', /GAMEPLAY_EVIDENCE_NOT_ACKNOWLEDGED/);
    const confirmed = await prisma.weaponTierReview.findUnique({ where: { candidateId: d2Id(CID_TIER_1) } });
    await call(CONFIRM_TIER, {
        candidateId: d2Id(CID_TIER_1), batchSha256: d2Batch, recordSha256: revisedSha(CID_TIER_1), sourceVersion: 'D2_REVISED',
        expectedVersion: confirmed.version, confirmed: true,
    });
    const finalVersion = (await prisma.weaponTierReview.findUnique({ where: { candidateId: d2Id(CID_TIER_1) } })).version;
    const approved = await call(DECIDE, decideArgs(CID_TIER_1, 'APPROVE', finalVersion, { evidenceAcknowledged: true }));
    strict_1.default.equal(approved.error, null);
    const r = approved.data.adminDecideWeaponTierReview;
    strict_1.default.equal(r.decision, 'APPROVE');
    strict_1.default.equal(r.decidedBy, ACTOR);
    strict_1.default.ok(r.decidedAt);
    strict_1.default.equal(r.importEligible, true);
});
(0, node_test_1.default)('rights verification stores the five grounds, note and server-derived verifier', async () => {
    const result = await call(VERIFY_RIGHTS, rightsArgs(CID_A, 0));
    strict_1.default.equal(result.error, null);
    const r = result.data.adminVerifyWeaponTierReviewRights;
    strict_1.default.equal(r.rightsVerified, true);
    strict_1.default.equal(r.rightsVerifiedBy, ACTOR);
    strict_1.default.ok(r.rightsVerifiedAt);
    for (const field of ['independentRanking', 'originalExplanation', 'noGenshinBuildsEditorialCopy', 'gameFactsAttributionCorrect', 'evidenceValid']) {
        strict_1.default.equal(r.rightsBasis[field], true);
    }
    strict_1.default.match(r.rightsBasis.note, /Verified independent text/);
    strict_1.default.equal(r.rightsBasis.verifiedBy, ACTOR);
    strict_1.default.equal(r.rightsBasis.recordSha256, revisedSha(CID_A));
    const missingGround = await call(VERIFY_RIGHTS, { ...rightsArgs(CID_TIER_2, 0), evidenceValid: false });
    strict_1.default.match(missingGround.error ?? '', /RIGHTS_GROUND_NOT_CONFIRMED:evidenceValid/);
});
(0, node_test_1.default)('tier changes cannot be confirmed on frozen dossiers and each revised tier has its own confirmation', async () => {
    const frozen = await call(CONFIRM_TIER, {
        candidateId: CID_TIER_2, batchSha256: batch, recordSha256: frozenSha(CID_TIER_2),
        expectedVersion: 0, confirmed: true, sourceVersion: 'FROZEN',
    });
    strict_1.default.match(frozen.error ?? '', /FROZEN_REVIEW_READ_ONLY/);
    const wrong = await call(CONFIRM_TIER, {
        candidateId: d2Id(CID_A), batchSha256: d2Batch, recordSha256: revisedSha(CID_A),
        expectedVersion: 1, confirmed: true, sourceVersion: 'D2_REVISED',
    });
    strict_1.default.match(wrong.error ?? '', /NOT_A_TIER_CHANGE/);
    const confirmed = await call(CONFIRM_TIER, {
        candidateId: d2Id(CID_TIER_2), batchSha256: d2Batch, recordSha256: revisedSha(CID_TIER_2),
        expectedVersion: 0, confirmed: true, sourceVersion: 'D2_REVISED',
    });
    strict_1.default.equal(confirmed.error, null);
    strict_1.default.equal(confirmed.data.adminConfirmWeaponTierChange.tierChangeConfirmed, true);
    strict_1.default.equal((await prisma.weaponTierReview.findUniqueOrThrow({ where: { candidateId: d2Id(CID_TIER_2) } })).recordSha256, revisedSha(CID_TIER_2));
});
(0, node_test_1.default)('Favonius Greatsword frozen dossier is historical and cannot be edited', async () => {
    const frozen = await call(VERIFY_RIGHTS, rightsArgs(CID_B, 0, 'FROZEN'));
    strict_1.default.match(frozen.error ?? '', /FROZEN_REVIEW_READ_ONLY/);
    strict_1.default.equal(await prisma.weaponTierReview.findUnique({ where: { candidateId: CID_B } }), null);
});
(0, node_test_1.default)('D2 blocked and paused weapons stay ineligible even after rights and evidence acknowledgement', async () => {
    for (const base of [CID_B, CID_PAUSED]) {
        const id = d2Id(base);
        const rights = await call(VERIFY_RIGHTS, rightsArgs(id, 0, 'D2_REVISED'));
        strict_1.default.equal(rights.error, null);
        const row = (await prisma.weaponTierReview.findUnique({ where: { candidateId: id } }));
        const approve = await call(DECIDE, decideArgs(id, 'APPROVE', row.version, {
            sourceVersion: 'D2_REVISED', evidenceAcknowledged: true,
        }));
        strict_1.default.match(approve.error ?? '', /REVISION_EVIDENCE_INCOMPLETE/);
        strict_1.default.equal((await prisma.weaponTierReview.findUnique({ where: { candidateId: id } })).decision, 'PENDING');
    }
});
(0, node_test_1.default)('a reviewable D2 record can be decided only with its own checksum and fresh state', async () => {
    const id = d2Id(CID_A);
    const rights = await call(VERIFY_RIGHTS, rightsArgs(id, 1, 'D2_REVISED'));
    strict_1.default.equal(rights.error, null);
    strict_1.default.equal(rights.data.adminVerifyWeaponTierReviewRights.rightsBasis.recordSha256, revisedSha(CID_A));
    const row = (await prisma.weaponTierReview.findUnique({ where: { candidateId: id } }));
    const approve = await call(DECIDE, decideArgs(id, 'APPROVE', row.version, {
        sourceVersion: 'D2_REVISED', evidenceAcknowledged: true,
    }));
    strict_1.default.equal(approve.error, null);
    const r = approve.data.adminDecideWeaponTierReview;
    strict_1.default.equal(r.decision, 'APPROVE');
    strict_1.default.equal(r.importEligible, true);
    strict_1.default.equal(await prisma.weaponTierReview.findUnique({ where: { candidateId: CID_A } }), null);
});
(0, node_test_1.default)('REQUEST_CHANGES and REJECT are recorded with a reason and are not import eligible', async () => {
    const rc = await call(DECIDE, decideArgs(CID_REJECT, 'REQUEST_CHANGES', 1));
    strict_1.default.equal(rc.error, null);
    strict_1.default.equal(rc.data.adminDecideWeaponTierReview.decision, 'REQUEST_CHANGES');
    const rej = await call(DECIDE, {
        ...decideArgs('independent-15508-MAIN_DPS-R1', 'REJECT', 0),
        reason: 'Rejected after review: insufficient broad-main-DPS justification for this refinement.',
    });
    strict_1.default.equal(rej.error, null);
    strict_1.default.equal(rej.data.adminDecideWeaponTierReview.decision, 'REJECT');
    const rows = (await call(QUEUE, { sourceVersion: 'D2_REVISED' })).data.adminWeaponTierReviewQueue;
    strict_1.default.equal(rows.find(r => r.candidateId === d2Id(CID_REJECT)).importEligible, false);
    strict_1.default.equal(rows.find(r => r.weaponId === '15508').importEligible, false);
});
(0, node_test_1.default)('stale expectedVersion is rejected (concurrent edit protection)', async () => {
    const cid = 'independent-11403-SUB_DPS-R5';
    const first = await call(DECIDE, decideArgs(cid, 'REQUEST_CHANGES', 0));
    strict_1.default.equal(first.error, null);
    const stale = await call(DECIDE, decideArgs(cid, 'APPROVE', 0));
    strict_1.default.match(stale.error ?? '', /CONCURRENT_MODIFICATION/);
    const current = (await prisma.weaponTierReview.findUnique({ where: { candidateId: d2Id(cid) } }));
    strict_1.default.equal(current.decision, 'REQUEST_CHANGES');
});
(0, node_test_1.default)('different Admin principal cannot overwrite an existing decision', async () => {
    const cid = 'independent-11418-SUPPORT-R1';
    const first = await call(DECIDE, decideArgs(cid, 'APPROVE', 0, { evidenceAcknowledged: true }));
    strict_1.default.match(first.error ?? '', /RIGHTS_NOT_VERIFIED/);
    const rc = await call(DECIDE, decideArgs(cid, 'REQUEST_CHANGES', 0));
    strict_1.default.equal(rc.error, null);
    const current = (await prisma.weaponTierReview.findUnique({ where: { candidateId: d2Id(cid) } }));
    const conflict = await call(DECIDE, decideArgs(cid, 'APPROVE', current.version), { actor: OTHER_ACTOR });
    strict_1.default.match(conflict.error ?? '', /ADMIN_CONFLICT/);
});
(0, node_test_1.default)('audit history is ordered, server-derived and records the D2 lineage', async () => {
    const { error, data } = await call(AUDIT, { candidateId: d2Id(CID_TIER_1), sourceVersion: 'D2_REVISED' });
    strict_1.default.equal(error, null);
    const entries = data.adminWeaponTierReviewAudit;
    strict_1.default.ok(entries.length >= 4);
    strict_1.default.ok(entries.every(e => e.actor === ACTOR));
    const actions = entries.map(e => e.action);
    strict_1.default.ok(actions.includes('REVIEW_CREATED'));
    strict_1.default.ok(actions.includes('RIGHTS_VERIFIED'));
    strict_1.default.ok(actions.includes('TIER_CHANGE_CONFIRMED'));
    strict_1.default.ok(actions.includes('DECISION_RECORDED'));
    const times = entries.map(e => Date.parse(e.createdAt));
    strict_1.default.deepEqual(times, [...times].sort((a, b) => a - b));
    const d2Audit = await call(AUDIT, { candidateId: d2Id(CID_A), sourceVersion: 'D2_REVISED' });
    strict_1.default.equal(d2Audit.error, null);
    const d2Entries = d2Audit.data.adminWeaponTierReviewAudit;
    strict_1.default.ok(d2Entries.some(e => e.changes?.sourceVersion === 'D2_REVISED'));
    strict_1.default.ok(d2Entries.some(e => e.changes?.previousChecksum === frozenSha(CID_A)));
    const unauth = await call(AUDIT, { candidateId: CID_TIER_1 }, { admin: false });
    strict_1.default.match(unauth.error ?? '', /Unauthorized: Admin access required/);
});
(0, node_test_1.default)('public GraphQL still exposes only approved, independent, rights-verified rankings', async () => {
    const result = await server.executeOperation({ query: '{ weaponTierRanks(limit: 500) { id weaponId reviewStatus derivation publishRightsVerified } }' }, { contextValue: { prisma, dataloaders: (0, dataloaders_1.createLoaders)(prisma), user: { isAdmin: false }, isAdmin: false } });
    strict_1.default.equal(result.body.kind, 'single');
    const body = result.body;
    strict_1.default.equal(body.singleResult.errors, undefined);
    strict_1.default.ok(Array.isArray(body.singleResult.data.weaponTierRanks));
    strict_1.default.ok(body.singleResult.data.weaponTierRanks.every((r) => r.reviewStatus === 'APPROVED' && r.derivation === 'INDEPENDENT' && r.publishRightsVerified === true));
    strict_1.default.equal(await prisma.weaponTierRank.count(), 0);
});
