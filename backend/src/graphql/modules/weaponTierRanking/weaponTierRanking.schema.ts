export const weaponTierRankingTypeDefs = `#graphql
  enum WeaponTierRole {
    MAIN_DPS
    SUB_DPS
    SUPPORT
  }

  enum WeaponRankTier {
    SS
    S
    A
    B
    C
    D
  }

  enum WeaponTierReviewStatus {
    PENDING_REVIEW
    NEEDS_REVIEW
    APPROVED
    REJECTED
    DISPUTED
  }

  enum WeaponTierDerivation {
    INDEPENDENT
    SOURCE_DERIVED
    ADMIN_OVERRIDE
  }

  enum WeaponRefinementContext {
    R1
    R2
    R3
    R4
    R5
    UNSPECIFIED
    SOURCE_MISSING
  }

  enum WeaponVersionStatus {
    VERIFIED
    SOURCE_MISSING
  }

  enum WeaponConfidence {
    HIGH
    MEDIUM
    LOW
  }

  """One approved-or-draft ranking for a weapon, role, version and refinement context."""
  type WeaponTierRank {
    id: String!
    weaponId: String!
    weaponType: String!
    role: WeaponTierRole!
    tier: WeaponRankTier!
    refinementContext: WeaponRefinementContext!
    refinementLevel: Int
    versionKey: String!
    gameVersion: String
    gameVersionStatus: WeaponVersionStatus!
    explanationVi: String
    evidence: JSON
    rubricVersion: String
    confidence: WeaponConfidence
    reviewNotes: String
    sourceUrl: String
    sourceName: String
    sourceId: String
    sourceLocale: String!
    sourceChecksum: String
    publishRightsVerified: Boolean!
    rightsNote: String
    derivation: WeaponTierDerivation!
    reviewStatus: WeaponTierReviewStatus!
    rejectionReason: String
    reviewedAt: String
    approvedBy: String
    createdAt: String!
    updatedAt: String!
  }

  type WeaponTierAudit {
    id: String!
    rankingId: String!
    action: String!
    actor: String!
    changes: JSON
    createdAt: String!
  }

  input WeaponTierRankInput {
    weaponId: String!
    weaponType: String!
    role: WeaponTierRole!
    tier: WeaponRankTier!
    refinementContext: WeaponRefinementContext!
    refinementLevel: Int
    versionKey: String!
    gameVersion: String
    gameVersionStatus: WeaponVersionStatus!
    explanationVi: String
    evidence: JSON
    rubricVersion: String
    confidence: WeaponConfidence
    reviewNotes: String
    sourceUrl: String
    sourceName: String
    sourceId: String
    sourceLocale: String = "en"
    sourceChecksum: String
    publishRightsVerified: Boolean = false
    rightsNote: String
    derivation: WeaponTierDerivation = SOURCE_DERIVED
    """Optimistic concurrency token. Must equal the row's updatedAt when editing an existing rank."""
    expectedUpdatedAt: String
    """Required when resubmitting a REJECTED or NEEDS_REVIEW record."""
    resubmitReason: String
  }

  extend type Query {
    """Public: only APPROVED + INDEPENDENT + publishRightsVerified rankings are visible."""
    weaponTierRanks(
      weaponId: String
      weaponType: String
      role: WeaponTierRole
      tier: WeaponRankTier
      refinementContext: WeaponRefinementContext
      versionKey: String
      gameVersion: String
      limit: Int = 500
    ): [WeaponTierRank!]!

    """Admin-only review queue. Exposes drafts, evidence and provenance."""
    adminWeaponTierRanks(
      weaponId: String
      weaponType: String
      role: WeaponTierRole
      tier: WeaponRankTier
      refinementContext: WeaponRefinementContext
      versionKey: String
      gameVersion: String
      reviewStatus: WeaponTierReviewStatus
      derivation: WeaponTierDerivation
      publishRightsVerified: Boolean
      limit: Int = 500
    ): [WeaponTierRank!]!

    """Admin-only audit trail for one ranking."""
    weaponTierAuditLog(rankingId: String!, limit: Int = 200): [WeaponTierAudit!]!
  }

  extend type Mutation {
    """Admin-only upsert. New rows are never approved and never public by default."""
    upsertWeaponTierRank(input: WeaponTierRankInput!): WeaponTierRank!

    """Admin-only, CAS- and checksum-guarded. Only INDEPENDENT rows can be approved."""
    approveWeaponTierRank(id: String!, expectedUpdatedAt: String, expectedChecksum: String): WeaponTierRank!

    """Admin-only, CAS-guarded. Records reason and acting Admin server-side."""
    rejectWeaponTierRank(id: String!, reason: String!, expectedUpdatedAt: String, expectedChecksum: String): WeaponTierRank!

    """Admin-only REQUEST_CHANGES decision; maps to NEEDS_REVIEW."""
    requestChangesWeaponTierRank(id: String!, reason: String!, expectedUpdatedAt: String, expectedChecksum: String): WeaponTierRank!

    """Explicit Admin rights verification. Automation never calls this mutation."""
    verifyWeaponTierRights(id: String!, verified: Boolean!, note: String, expectedUpdatedAt: String): WeaponTierRank!
  }
`;
