"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.weaponTierReviewTypeDefs = void 0;
exports.weaponTierReviewTypeDefs = `
  enum WeaponTierDecision {
    PENDING
    APPROVE
    REQUEST_CHANGES
    REJECT
  }

  """Checksum-bound candidate version. D2 rows never inherit B3 review state."""
  enum WeaponTierReviewSource {
    FROZEN
    D2_REVISED
  }

  """One versioned candidate plus its persisted Admin decision state."""
  type WeaponTierReviewCandidate {
    candidateId: String!
    stableCandidateId: String!
    previousCandidateId: String
    weaponId: String!
    weaponName: String!
    weaponType: String!
    dbWeaponType: String!
    role: String!
    refinement: String!
    refinementLevel: Int
    proposedTier: String!
    previousTier: String
    tierChanged: Boolean!
    tierJustification: String
    explanationVi: String!
    gameplayAssumptions: [String!]!
    exactGameFacts: [String!]!
    evidence: JSON!
    confidence: String!
    approvalChecksum: String!
    batchSha256: String!
    reviewGroup: String!
    draftRecommendation: String
    rightsStatus: JSON
    decision: WeaponTierDecision!
    decisionReason: String
    decidedAt: String
    decidedBy: String
    rightsVerified: Boolean!
    rightsVerifiedAt: String
    rightsVerifiedBy: String
    rightsBasis: JSON
    tierChangeConfirmed: Boolean!
    tierChangeConfirmedAt: String
    tierChangeConfirmedBy: String
    evidenceAcknowledged: Boolean!
    evidenceSupplement: JSON
    version: Int!
    blockedReason: String
    importEligible: Boolean!
    published: Boolean!

    """Phase D3 version bridge: B3.1 frozen source -> D2 revised dossier."""
    previousVersion: String!
    currentVersion: String!
    sourceChecksum: String!
    revisedChecksum: String!
    currentChecksum: String!
    versionDiff: JSON!
    versionReviewStatus: String!
    approvalCarriedOver: Boolean!
  }

  type WeaponTierReviewAuditEntry {
    id: String!
    action: String!
    actor: String!
    changes: JSON
    createdAt: String!
  }

  extend type Query {
    """Admin-only: 14 checksum-bound candidates for the selected version."""
    adminWeaponTierReviewQueue(sourceVersion: WeaponTierReviewSource = FROZEN): [WeaponTierReviewCandidate!]!

    """Admin-only: one candidate by versioned candidateId."""
    adminWeaponTierReview(candidateId: String!, sourceVersion: WeaponTierReviewSource = FROZEN): WeaponTierReviewCandidate

    """Admin-only: server-derived audit history for one candidate."""
    adminWeaponTierReviewAudit(candidateId: String!, limit: Int = 200, sourceVersion: WeaponTierReviewSource = FROZEN): [WeaponTierReviewAuditEntry!]!
  }

  extend type Mutation {
    """Materialize the current approved D2 candidate and its publication audit atomically."""
    adminPublishWeaponTierReview(candidateId: String!, batchSha256: String!, recordSha256: String!,
      expectedVersion: Int!, sourceVersion: WeaponTierReviewSource!, expectedDatabase: String): WeaponTierRank!

    """
    Admin-only decision. Actor, timestamp and audit actor are derived from the
    verified backend session; client-supplied actor fields are never accepted.
    """
    adminDecideWeaponTierReview(
      candidateId: String!
      decision: WeaponTierDecision!
      reason: String!
      batchSha256: String!
      recordSha256: String!
      expectedVersion: Int!
      evidenceAcknowledged: Boolean
      evidenceSupplement: JSON
      sourceVersion: WeaponTierReviewSource = FROZEN
    ): WeaponTierReviewCandidate!

    """
    Admin-only, separate publish-rights confirmation. This is the ONLY way a
    review record becomes rights-verified; no script sets the flag directly.
    """
    adminVerifyWeaponTierReviewRights(
      candidateId: String!
      batchSha256: String!
      recordSha256: String!
      expectedVersion: Int!
      independentRanking: Boolean!
      originalExplanation: Boolean!
      noGenshinBuildsEditorialCopy: Boolean!
      gameFactsAttributionCorrect: Boolean!
      evidenceValid: Boolean!
      note: String!
      sourceVersion: WeaponTierReviewSource = FROZEN
    ): WeaponTierReviewCandidate!

    """Admin-only separate confirmation for the two changed tiers."""
    adminConfirmWeaponTierChange(
      candidateId: String!
      batchSha256: String!
      recordSha256: String!
      expectedVersion: Int!
      confirmed: Boolean!
      sourceVersion: WeaponTierReviewSource = FROZEN
    ): WeaponTierReviewCandidate!
  }
`;
