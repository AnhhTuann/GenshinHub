-- Phase B1: additive weapon tier infrastructure (development only).
-- No DROP / ALTER of any legacy table, column, enum, or row.
-- Generated from prisma migrate diff on an isolated weapon-only datamodel
-- so the unapplied CharacterBuild / Multi-Build work is NOT included.

-- CreateEnum
CREATE TYPE "WeaponTierRole" AS ENUM ('MAIN_DPS', 'SUB_DPS', 'SUPPORT');

-- CreateEnum
CREATE TYPE "WeaponRankTier" AS ENUM ('SS', 'S', 'A', 'B', 'C', 'D');

-- CreateEnum
CREATE TYPE "WeaponTierReviewStatus" AS ENUM ('PENDING_REVIEW', 'NEEDS_REVIEW', 'APPROVED', 'REJECTED', 'DISPUTED');

-- CreateEnum
CREATE TYPE "WeaponTierDerivation" AS ENUM ('INDEPENDENT', 'SOURCE_DERIVED', 'ADMIN_OVERRIDE');

-- CreateEnum
CREATE TYPE "WeaponRefinementContext" AS ENUM ('R1', 'R2', 'R3', 'R4', 'R5', 'UNSPECIFIED', 'SOURCE_MISSING');

-- CreateEnum
CREATE TYPE "WeaponVersionStatus" AS ENUM ('VERIFIED', 'SOURCE_MISSING');

-- CreateEnum
CREATE TYPE "WeaponConfidence" AS ENUM ('HIGH', 'MEDIUM', 'LOW');

-- CreateTable
CREATE TABLE "WeaponTierRank" (
    "id" TEXT NOT NULL,
    "weaponId" TEXT NOT NULL,
    "weaponType" TEXT NOT NULL,
    "role" "WeaponTierRole" NOT NULL,
    "tier" "WeaponRankTier" NOT NULL,
    "refinementContext" "WeaponRefinementContext" NOT NULL,
    "refinementLevel" INTEGER,
    "versionKey" TEXT NOT NULL,
    "gameVersion" TEXT,
    "gameVersionStatus" "WeaponVersionStatus" NOT NULL,
    "explanationVi" TEXT,
    "evidence" JSONB,
    "rubricVersion" TEXT,
    "confidence" "WeaponConfidence",
    "reviewNotes" TEXT,
    "sourceUrl" TEXT,
    "sourceName" TEXT,
    "sourceId" TEXT,
    "sourceLocale" TEXT NOT NULL DEFAULT 'en',
    "sourceChecksum" TEXT,
    "publishRightsVerified" BOOLEAN NOT NULL DEFAULT false,
    "rightsNote" TEXT,
    "derivation" "WeaponTierDerivation" NOT NULL DEFAULT 'SOURCE_DERIVED',
    "reviewStatus" "WeaponTierReviewStatus" NOT NULL DEFAULT 'PENDING_REVIEW',
    "rejectionReason" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "approvedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WeaponTierRank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeaponTierAudit" (
    "id" TEXT NOT NULL,
    "rankingId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "actor" TEXT NOT NULL,
    "changes" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WeaponTierAudit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex

-- CreateIndex

-- CreateIndex

-- CreateIndex
CREATE INDEX "WeaponTierRank_weaponId_idx" ON "WeaponTierRank"("weaponId");

-- CreateIndex
CREATE INDEX "WeaponTierRank_weaponType_role_idx" ON "WeaponTierRank"("weaponType", "role");

-- CreateIndex
CREATE INDEX "WeaponTierRank_role_tier_idx" ON "WeaponTierRank"("role", "tier");

-- CreateIndex
CREATE INDEX "WeaponTierRank_versionKey_reviewStatus_idx" ON "WeaponTierRank"("versionKey", "reviewStatus");

-- CreateIndex
CREATE INDEX "WeaponTierRank_derivation_reviewStatus_idx" ON "WeaponTierRank"("derivation", "reviewStatus");

-- CreateIndex
CREATE INDEX "WeaponTierRank_publishRightsVerified_reviewStatus_idx" ON "WeaponTierRank"("publishRightsVerified", "reviewStatus");

-- CreateIndex
CREATE UNIQUE INDEX "WeaponTierRank_weaponId_role_versionKey_refinementContext_key" ON "WeaponTierRank"("weaponId", "role", "versionKey", "refinementContext");

-- CreateIndex
CREATE INDEX "WeaponTierAudit_rankingId_createdAt_idx" ON "WeaponTierAudit"("rankingId", "createdAt");

-- AddForeignKey
ALTER TABLE "WeaponTierRank" ADD CONSTRAINT "WeaponTierRank_weaponId_fkey" FOREIGN KEY ("weaponId") REFERENCES "Weapon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeaponTierAudit" ADD CONSTRAINT "WeaponTierAudit_rankingId_fkey" FOREIGN KEY ("rankingId") REFERENCES "WeaponTierRank"("id") ON DELETE CASCADE ON UPDATE CASCADE;
