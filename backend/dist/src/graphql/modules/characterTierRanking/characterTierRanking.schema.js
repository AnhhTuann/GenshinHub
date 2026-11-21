"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.characterTierRankingTypeDefs = void 0;
exports.characterTierRankingTypeDefs = `#graphql
  enum TierListRole {
    MAIN_DPS
    SUB_DPS
    SUPPORT
  }

  enum TierListTier {
    SS
    S
    A
    B
    C
    D
  }

  enum TierListConstellation {
    C0
    C1
    C2
    C3
    C4
    C5
    C6
  }

  enum TierListApprovalStatus {
    PENDING_REVIEW
    NEEDS_REVIEW
    APPROVED
    REJECTED
  }

  enum TierListDerivation {
    INDEPENDENT
    SOURCE_DERIVED
    ADMIN_OVERRIDE
  }

  """One per-character, per-role, per-constellation ranking for a game version."""
  type CharacterTierRanking {
    id: String!
    characterId: String!
    role: TierListRole!
    tier: TierListTier!
    constellation: TierListConstellation!
    gameVersion: String!
    explanationVi: String
    explanationEn: String
    sourceUrl: String!
    sourceName: String!
    sourceId: String
    sourceLocale: String!
    sourceGrid: String
    sourceTierKey: String
    sourceMinConstellation: Int
    evidence: JSON
    lastReviewedDate: String
    derivation: TierListDerivation!
    approvalStatus: TierListApprovalStatus!
    rejectionReason: String
    reviewedAt: String
    approvedBy: String
    createdAt: String
    updatedAt: String
  }

  input CharacterTierRankingInput {
    characterId: String!
    role: TierListRole!
    tier: TierListTier!
    constellation: TierListConstellation!
    gameVersion: String!
    explanationVi: String
    explanationEn: String
    sourceUrl: String!
    sourceName: String!
    sourceId: String
    sourceLocale: String = "en"
    sourceGrid: String
    sourceTierKey: String
    sourceMinConstellation: Int
    evidence: JSON
    lastReviewedDate: String
    derivation: TierListDerivation = SOURCE_DERIVED
    """Optimistic concurrency token for edits to an existing ranking."""
    expectedUpdatedAt: String
    """Frozen content checksum; required by the D1 review workflow."""
    expectedChecksum: String
    """Required when resubmitting a REJECTED or NEEDS_REVIEW record."""
    resubmitReason: String
  }

  """Server-derived review trail stored with the ranking."""
  type CharacterTierAuditEntry {
    action: String!
    actor: String!
    at: String!
    reason: String
  }

  extend type Query {
    """Public query: only approved, independently derived rankings are returned."""
    characterTierRankings(
      characterId: String
      role: TierListRole
      tier: TierListTier
      constellation: TierListConstellation
      gameVersion: String
      limit: Int = 500
    ): [CharacterTierRanking!]!

    """Admin-only review queue; drafts and source-derived records stay here."""
    adminCharacterTierRankings(
      characterId: String
      role: TierListRole
      tier: TierListTier
      constellation: TierListConstellation
      gameVersion: String
      approvalStatus: TierListApprovalStatus
      derivation: TierListDerivation
      limit: Int = 500
    ): [CharacterTierRanking!]!

    """Admin-only review trail for one character ranking."""
    characterTierAuditLog(rankingId: String!, limit: Int = 200): [CharacterTierAuditEntry!]!
  }

  extend type Mutation {
    """Admin-only draft/upsert. New records always start as PENDING_REVIEW."""
    upsertCharacterTierRanking(input: CharacterTierRankingInput!): CharacterTierRanking!

    """Admin-only, CAS- and checksum-guarded. Only INDEPENDENT rankings can be approved."""
    approveCharacterTierRanking(id: String!, expectedUpdatedAt: String, expectedChecksum: String): CharacterTierRanking!

    """Admin-only. Records reason and acting Admin server-side."""
    rejectCharacterTierRanking(id: String!, reason: String!, expectedUpdatedAt: String, expectedChecksum: String): CharacterTierRanking!

    """Admin-only. Maps to NEEDS_REVIEW; the acting Admin is server-derived."""
    requestChangesCharacterTierRanking(id: String!, reason: String!, expectedUpdatedAt: String, expectedChecksum: String): CharacterTierRanking!

    """Explicit Admin rights verification. Automation never calls this mutation."""
    verifyCharacterTierRights(id: String!, verified: Boolean!, note: String, expectedUpdatedAt: String): CharacterTierRanking!
  }
`;
