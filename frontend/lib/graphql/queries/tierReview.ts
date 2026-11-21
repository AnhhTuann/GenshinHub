

/** Public: the server hard-filters APPROVED + INDEPENDENT (+ rights for weapons). */
export const GET_CHARACTER_TIER_RANKINGS = `
  query GetCharacterTierRankings($characterId: String, $role: TierListRole, $tier: TierListTier, $constellation: TierListConstellation, $gameVersion: String, $limit: Int) {
    characterTierRankings(characterId: $characterId, role: $role, tier: $tier, constellation: $constellation, gameVersion: $gameVersion, limit: $limit) {
      id
      characterId
      role
      tier
      constellation
      gameVersion
      explanationVi
      evidence
      derivation
      approvalStatus
      reviewedAt
      sourceName
      sourceUrl
    }
  }
`;

export const GET_WEAPON_TIER_RANKS = `
  query GetWeaponTierRanks($weaponId: String, $weaponType: String, $role: WeaponTierRole, $tier: WeaponRankTier, $refinementContext: WeaponRefinementContext, $versionKey: String, $limit: Int) {
    weaponTierRanks(weaponId: $weaponId, weaponType: $weaponType, role: $role, tier: $tier, refinementContext: $refinementContext, versionKey: $versionKey, limit: $limit) {
      id
      weaponId
      weaponType
      role
      tier
      refinementContext
      refinementLevel
      versionKey
      gameVersion
      explanationVi
      evidence
      confidence
      rubricVersion
      sourceChecksum
      publishRightsVerified
      reviewStatus
      derivation
      reviewedAt
      sourceName
    }
  }
`;

export const GET_ADMIN_CHARACTER_TIER_RANKINGS = `
  query GetAdminCharacterTierRankings($approvalStatus: TierListApprovalStatus, $derivation: TierListDerivation, $limit: Int) {
    adminCharacterTierRankings(approvalStatus: $approvalStatus, derivation: $derivation, limit: $limit) {
      id
      characterId
      role
      tier
      constellation
      gameVersion
      explanationVi
      evidence
      derivation
      approvalStatus
      rejectionReason
      reviewedAt
      approvedBy
      sourceName
      sourceUrl
      createdAt
      updatedAt
    }
  }
`;

export const GET_ADMIN_WEAPON_TIER_RANKS = `
  query GetAdminWeaponTierRanks($reviewStatus: WeaponTierReviewStatus, $derivation: WeaponTierDerivation, $limit: Int) {
    adminWeaponTierRanks(reviewStatus: $reviewStatus, derivation: $derivation, limit: $limit) {
      id
      weaponId
      weaponType
      role
      tier
      refinementContext
      refinementLevel
      versionKey
      gameVersion
      gameVersionStatus
      explanationVi
      evidence
      rubricVersion
      confidence
      reviewNotes
      sourceName
      sourceUrl
      sourceChecksum
      publishRightsVerified
      rightsNote
      derivation
      reviewStatus
      rejectionReason
      reviewedAt
      approvedBy
      createdAt
      updatedAt
    }
  }
`;

export const GET_CHARACTER_TIER_AUDIT = `
  query GetCharacterTierAudit($rankingId: String!) {
    characterTierAuditLog(rankingId: $rankingId) { action actor at reason }
  }
`;

export const GET_WEAPON_TIER_AUDIT = `
  query GetWeaponTierAudit($rankingId: String!) {
    weaponTierAuditLog(rankingId: $rankingId) { id action actor changes createdAt }
  }
`;

export const UPSERT_CHARACTER_TIER_RANKING = `
  mutation UpsertCharacterTierRanking($input: CharacterTierRankingInput!) {
    upsertCharacterTierRanking(input: $input) { id approvalStatus evidence }
  }
`;

export const UPSERT_WEAPON_TIER_RANK = `
  mutation UpsertWeaponTierRank($input: WeaponTierRankInput!) {
    upsertWeaponTierRank(input: $input) { id reviewStatus sourceChecksum updatedAt publishRightsVerified }
  }
`;

export const APPROVE_CHARACTER_TIER_RANKING = `
  mutation ApproveCharacterTierRanking($id: String!, $expectedUpdatedAt: String, $expectedChecksum: String) {
    approveCharacterTierRanking(id: $id, expectedUpdatedAt: $expectedUpdatedAt, expectedChecksum: $expectedChecksum) { id approvalStatus approvedBy }
  }
`;

export const APPROVE_WEAPON_TIER_RANK = `
  mutation ApproveWeaponTierRank($id: String!, $expectedUpdatedAt: String, $expectedChecksum: String) {
    approveWeaponTierRank(id: $id, expectedUpdatedAt: $expectedUpdatedAt, expectedChecksum: $expectedChecksum) { id reviewStatus approvedBy }
  }
`;

export const REQUEST_CHANGES_CHARACTER_TIER_RANKING = `
  mutation RequestChangesCharacterTierRanking($id: String!, $reason: String!, $expectedUpdatedAt: String, $expectedChecksum: String) {
    requestChangesCharacterTierRanking(id: $id, reason: $reason, expectedUpdatedAt: $expectedUpdatedAt, expectedChecksum: $expectedChecksum) { id approvalStatus }
  }
`;

export const REQUEST_CHANGES_WEAPON_TIER_RANK = `
  mutation RequestChangesWeaponTierRank($id: String!, $reason: String!, $expectedUpdatedAt: String, $expectedChecksum: String) {
    requestChangesWeaponTierRank(id: $id, reason: $reason, expectedUpdatedAt: $expectedUpdatedAt, expectedChecksum: $expectedChecksum) { id reviewStatus }
  }
`;

export const REJECT_CHARACTER_TIER_RANKING = `
  mutation RejectCharacterTierRanking($id: String!, $reason: String!, $expectedUpdatedAt: String, $expectedChecksum: String) {
    rejectCharacterTierRanking(id: $id, reason: $reason, expectedUpdatedAt: $expectedUpdatedAt, expectedChecksum: $expectedChecksum) { id approvalStatus }
  }
`;

export const REJECT_WEAPON_TIER_RANK = `
  mutation RejectWeaponTierRank($id: String!, $reason: String!, $expectedUpdatedAt: String, $expectedChecksum: String) {
    rejectWeaponTierRank(id: $id, reason: $reason, expectedUpdatedAt: $expectedUpdatedAt, expectedChecksum: $expectedChecksum) { id reviewStatus }
  }
`;

export const VERIFY_CHARACTER_TIER_RIGHTS = `
  mutation VerifyCharacterTierRights($id: String!, $verified: Boolean!, $note: String, $expectedUpdatedAt: String) {
    verifyCharacterTierRights(id: $id, verified: $verified, note: $note, expectedUpdatedAt: $expectedUpdatedAt) { id evidence }
  }
`;

export const VERIFY_WEAPON_TIER_RIGHTS = `
  mutation VerifyWeaponTierRights($id: String!, $verified: Boolean!, $note: String, $expectedUpdatedAt: String) {
    verifyWeaponTierRights(id: $id, verified: $verified, note: $note, expectedUpdatedAt: $expectedUpdatedAt) { id publishRightsVerified updatedAt }
  }
`;
