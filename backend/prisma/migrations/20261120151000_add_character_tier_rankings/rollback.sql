-- Manual rollback for Phase B1. Not applied by Prisma Migrate.
-- Drops only the additive tier-ranking objects; legacy Character/TierRank data is untouched.
DROP TABLE IF EXISTS "CharacterTierRanking";
DROP TYPE IF EXISTS "TierListDerivation";
DROP TYPE IF EXISTS "TierListApprovalStatus";
DROP TYPE IF EXISTS "TierListConstellation";
DROP TYPE IF EXISTS "TierListTier";
DROP TYPE IF EXISTS "TierListRole";
