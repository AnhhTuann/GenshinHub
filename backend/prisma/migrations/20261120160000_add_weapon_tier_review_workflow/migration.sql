-- B3.2 Admin review workflow.
-- Additive only: creates decision + audit tables. No ranking row is created or changed.

-- CreateEnum
CREATE TYPE "WeaponTierDecision" AS ENUM ('PENDING', 'APPROVE', 'REQUEST_CHANGES', 'REJECT');

-- CreateTable
CREATE TABLE "WeaponTierReview" (
    "id" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "weaponId" TEXT NOT NULL,
    "batchSha256" TEXT NOT NULL,
    "recordSha256" TEXT NOT NULL,
    "reviewGroup" TEXT NOT NULL,
    "decision" "WeaponTierDecision" NOT NULL DEFAULT 'PENDING',
    "decisionReason" TEXT,
    "decidedAt" TIMESTAMP(3),
    "decidedBy" TEXT,
    "rightsVerified" BOOLEAN NOT NULL DEFAULT false,
    "rightsBasis" JSONB,
    "rightsVerifiedAt" TIMESTAMP(3),
    "rightsVerifiedBy" TEXT,
    "tierChangeConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "tierChangeConfirmedAt" TIMESTAMP(3),
    "tierChangeConfirmedBy" TEXT,
    "evidenceAcknowledged" BOOLEAN NOT NULL DEFAULT false,
    "evidenceSupplement" JSONB,
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WeaponTierReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeaponTierReviewAudit" (
    "id" TEXT NOT NULL,
    "reviewId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "actor" TEXT NOT NULL,
    "changes" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WeaponTierReviewAudit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WeaponTierReview_candidateId_key" ON "WeaponTierReview"("candidateId");

-- CreateIndex
CREATE INDEX "WeaponTierReview_decision_idx" ON "WeaponTierReview"("decision");

-- CreateIndex
CREATE INDEX "WeaponTierReview_weaponId_idx" ON "WeaponTierReview"("weaponId");

-- CreateIndex
CREATE INDEX "WeaponTierReviewAudit_reviewId_createdAt_idx" ON "WeaponTierReviewAudit"("reviewId", "createdAt");

-- AddForeignKey
ALTER TABLE "WeaponTierReviewAudit" ADD CONSTRAINT "WeaponTierReviewAudit_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "WeaponTierReview"("id") ON DELETE CASCADE ON UPDATE CASCADE;
