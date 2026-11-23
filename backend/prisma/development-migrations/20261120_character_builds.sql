BEGIN;
SET LOCAL lock_timeout = '5s';
-- CreateEnum
CREATE TYPE "CharacterBuildPlaystyle" AS ENUM ('MAIN_DPS', 'SUB_DPS', 'SUPPORT');

-- CreateEnum
CREATE TYPE "CharacterBuildReviewStatus" AS ENUM ('DRAFT', 'PENDING_REVIEW', 'APPROVED', 'REJECTED', 'LEGACY_IMPORT');

-- CreateEnum
CREATE TYPE "CharacterTeamReviewStatus" AS ENUM ('VERIFIED', 'EXPERIMENTAL');

-- AlterTable
ALTER TABLE "CharacterWeapon" ADD COLUMN     "buildId" TEXT;

-- AlterTable
ALTER TABLE "CharacterArtifact" ADD COLUMN     "buildId" TEXT;

-- AlterTable
ALTER TABLE "CharacterTeam" ADD COLUMN     "buildId" TEXT,
ADD COLUMN     "reviewStatus" "CharacterTeamReviewStatus";

-- CreateTable
CREATE TABLE "CharacterBuild" (
    "id" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "playstyles" "CharacterBuildPlaystyle"[],
    "constellationAssumptions" TEXT[],
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "reviewStatus" "CharacterBuildReviewStatus" NOT NULL DEFAULT 'PENDING_REVIEW',
    "source" TEXT,
    "approvalChecksum" TEXT,
    "version" INTEGER NOT NULL DEFAULT 1,
    "notesEn" TEXT,
    "notesVi" TEXT,
    "talentPriority" TEXT[],
    "signatureWeapons" TEXT[],
    "sands" TEXT[],
    "goblet" TEXT[],
    "circlet" TEXT[],
    "subStatsPriority" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CharacterBuild_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterBuildAudit" (
    "id" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,
    "buildId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "actor" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "changes" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CharacterBuildAudit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CharacterBuild_approvalChecksum_key" ON "CharacterBuild"("approvalChecksum");

-- CreateIndex
CREATE INDEX "CharacterBuild_characterId_idx" ON "CharacterBuild"("characterId");

-- CreateIndex
CREATE UNIQUE INDEX "CharacterBuild_characterId_name_key" ON "CharacterBuild"("characterId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "CharacterBuild_id_characterId_key" ON "CharacterBuild"("id", "characterId");

-- CreateIndex
CREATE INDEX "CharacterBuildAudit_buildId_idx" ON "CharacterBuildAudit"("buildId");

-- CreateIndex
CREATE INDEX "CharacterBuildAudit_characterId_createdAt_idx" ON "CharacterBuildAudit"("characterId", "createdAt");

-- CreateIndex
CREATE INDEX "CharacterWeapon_buildId_characterId_idx" ON "CharacterWeapon"("buildId", "characterId");

-- CreateIndex
CREATE INDEX "CharacterArtifact_buildId_characterId_idx" ON "CharacterArtifact"("buildId", "characterId");

-- CreateIndex
CREATE INDEX "CharacterTeam_buildId_characterId_idx" ON "CharacterTeam"("buildId", "characterId");

-- AddForeignKey
ALTER TABLE "CharacterWeapon" ADD CONSTRAINT "CharacterWeapon_buildId_characterId_fkey" FOREIGN KEY ("buildId", "characterId") REFERENCES "CharacterBuild"("id", "characterId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterArtifact" ADD CONSTRAINT "CharacterArtifact_buildId_characterId_fkey" FOREIGN KEY ("buildId", "characterId") REFERENCES "CharacterBuild"("id", "characterId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterTeam" ADD CONSTRAINT "CharacterTeam_buildId_characterId_fkey" FOREIGN KEY ("buildId", "characterId") REFERENCES "CharacterBuild"("id", "characterId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterBuild" ADD CONSTRAINT "CharacterBuild_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterBuildAudit" ADD CONSTRAINT "CharacterBuildAudit_buildId_characterId_fkey" FOREIGN KEY ("buildId", "characterId") REFERENCES "CharacterBuild"("id", "characterId") ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE UNIQUE INDEX "CharacterBuild_one_default_per_character" ON "CharacterBuild"("characterId") WHERE "isDefault";
COMMIT;
