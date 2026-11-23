-- CreateEnum
CREATE TYPE "TierListRole" AS ENUM ('MAIN_DPS', 'SUB_DPS', 'SUPPORT');

-- CreateEnum
CREATE TYPE "TierListTier" AS ENUM ('SS', 'S', 'A', 'B', 'C', 'D');

-- CreateEnum
CREATE TYPE "TierListConstellation" AS ENUM ('C0', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6');

-- CreateEnum
CREATE TYPE "TierListApprovalStatus" AS ENUM ('PENDING_REVIEW', 'NEEDS_REVIEW', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "TierListDerivation" AS ENUM ('INDEPENDENT', 'SOURCE_DERIVED', 'ADMIN_OVERRIDE');

-- CreateTable
CREATE TABLE "CharacterTierRanking" (
    "id" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,
    "role" "TierListRole" NOT NULL,
    "tier" "TierListTier" NOT NULL,
    "constellation" "TierListConstellation" NOT NULL,
    "gameVersion" TEXT NOT NULL,
    "explanationVi" TEXT,
    "explanationEn" TEXT,
    "sourceUrl" TEXT NOT NULL,
    "sourceName" TEXT NOT NULL,
    "sourceId" TEXT,
    "sourceLocale" TEXT NOT NULL DEFAULT 'en',
    "sourceGrid" TEXT,
    "sourceTierKey" TEXT,
    "sourceMinConstellation" INTEGER,
    "evidence" JSONB,
    "lastReviewedDate" TIMESTAMP(3),
    "derivation" "TierListDerivation" NOT NULL DEFAULT 'SOURCE_DERIVED',
    "approvalStatus" "TierListApprovalStatus" NOT NULL DEFAULT 'PENDING_REVIEW',
    "rejectionReason" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "approvedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CharacterTierRanking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CharacterTierRanking_characterId_idx" ON "CharacterTierRanking"("characterId");

-- CreateIndex
CREATE INDEX "CharacterTierRanking_role_tier_idx" ON "CharacterTierRanking"("role", "tier");

-- CreateIndex
CREATE INDEX "CharacterTierRanking_gameVersion_approvalStatus_idx" ON "CharacterTierRanking"("gameVersion", "approvalStatus");

-- CreateIndex
CREATE INDEX "CharacterTierRanking_derivation_approvalStatus_idx" ON "CharacterTierRanking"("derivation", "approvalStatus");

-- CreateIndex
CREATE UNIQUE INDEX "CharacterTierRanking_characterId_role_constellation_gameVer_key" ON "CharacterTierRanking"("characterId", "role", "constellation", "gameVersion");

-- AddForeignKey
ALTER TABLE "CharacterTierRanking" ADD CONSTRAINT "CharacterTierRanking_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

