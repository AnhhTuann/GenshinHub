-- Rollback for Phase B1 weapon tier infrastructure.
-- Lossless: touches only the new objects. Legacy Weapon / TierRank / Character data is never referenced.
-- Run manually only after an approved rollback decision; this file is not applied by Prisma.

DROP TABLE IF EXISTS "WeaponTierAudit";
DROP TABLE IF EXISTS "WeaponTierRank";

DROP TYPE IF EXISTS "WeaponConfidence";
DROP TYPE IF EXISTS "WeaponVersionStatus";
DROP TYPE IF EXISTS "WeaponRefinementContext";
DROP TYPE IF EXISTS "WeaponTierDerivation";
DROP TYPE IF EXISTS "WeaponTierReviewStatus";
DROP TYPE IF EXISTS "WeaponRankTier";
DROP TYPE IF EXISTS "WeaponTierRole";
