-- One-time, non-destructive baseline reconciliation for a Neon staging branch
-- that contains the legacy 8-table catalog schema but no Prisma migration history.
--
-- Target: the schema produced by
--   backend/prisma/migrations/20261120000000_legacy_baseline/migration.sql
-- Invariants:
--   * No DROP TABLE / DROP COLUMN / DELETE / TRUNCATE / UPDATE of existing rows.
--   * Legacy CharacterArtifact.sands/goblet/circlet/subStatsPriority are KEPT.
--     They contain real data in staging and are intentionally retained as
--     tolerated drift after the full migration set is applied.
--   * Safe to re-run: IF NOT EXISTS guards on columns, indexes and constraints.
--
-- Run only on an isolated staging/validation branch. Never on production.

BEGIN;
SET LOCAL lock_timeout = '5s';

-- ---------------------------------------------------------------------------
-- Existing tables: add only columns/indexes/constraints missing from baseline.
-- ---------------------------------------------------------------------------

ALTER TABLE "Character"
  ADD COLUMN IF NOT EXISTS "talentMats" JSONB,
  ADD COLUMN IF NOT EXISTS "sands" TEXT[],
  ADD COLUMN IF NOT EXISTS "goblet" TEXT[],
  ADD COLUMN IF NOT EXISTS "circlet" TEXT[],
  ADD COLUMN IF NOT EXISTS "subStatsPriority" TEXT[];

CREATE INDEX IF NOT EXISTS "Character_tier_idx" ON "Character"("tier");

ALTER TABLE "CharacterWeapon"
  ADD COLUMN IF NOT EXISTS "constellation" TEXT DEFAULT 'C0',
  ADD COLUMN IF NOT EXISTS "order" INTEGER NOT NULL DEFAULT 0;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'CharacterWeapon_characterId_fkey') THEN
    ALTER TABLE "CharacterWeapon" ADD CONSTRAINT "CharacterWeapon_characterId_fkey"
      FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
  END IF;
END $$;

-- Keep the four legacy artifact stat columns untouched: staging relies on them.
ALTER TABLE "CharacterArtifact"
  ADD COLUMN IF NOT EXISTS "order" INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS "constellation" TEXT DEFAULT 'C0';

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'CharacterArtifact_characterId_fkey') THEN
    ALTER TABLE "CharacterArtifact" ADD CONSTRAINT "CharacterArtifact_characterId_fkey"
      FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
  END IF;
END $$;

ALTER TABLE "CharacterTeam"
  ADD COLUMN IF NOT EXISTS "order" INTEGER NOT NULL DEFAULT 0;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'CharacterTeam_characterId_fkey') THEN
    ALTER TABLE "CharacterTeam" ADD CONSTRAINT "CharacterTeam_characterId_fkey"
      FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
  END IF;
END $$;

ALTER TABLE "TeamMember"
  ADD COLUMN IF NOT EXISTS "order" INTEGER NOT NULL DEFAULT 0;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'TeamMember_teamId_fkey') THEN
    ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_teamId_fkey"
      FOREIGN KEY ("teamId") REFERENCES "CharacterTeam"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

ALTER TABLE "Weapon"
  ADD COLUMN IF NOT EXISTS "role" TEXT;

CREATE INDEX IF NOT EXISTS "Weapon_rarity_idx" ON "Weapon"("rarity");
CREATE INDEX IF NOT EXISTS "Weapon_type_idx" ON "Weapon"("type");
CREATE INDEX IF NOT EXISTS "Weapon_tier_idx" ON "Weapon"("tier");

CREATE INDEX IF NOT EXISTS "Material_type_idx" ON "Material"("type");
CREATE INDEX IF NOT EXISTS "Material_rarity_idx" ON "Material"("rarity");

-- ---------------------------------------------------------------------------
-- Tables that exist in the baseline but are absent from the legacy staging DB.
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS "TierRank" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "colorBase" TEXT NOT NULL DEFAULT 'amber',
    CONSTRAINT "TierRank_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "TierRank_name_key" ON "TierRank"("name");

CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "provider" TEXT NOT NULL DEFAULT 'local',
    "providerId" TEXT,
    "gender" TEXT NOT NULL,
    "displayName" TEXT,
    "avatarUrl" TEXT,
    "bio" TEXT,
    "gachaStats" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX IF NOT EXISTS "User_providerId_key" ON "User"("providerId");
CREATE INDEX IF NOT EXISTS "User_email_idx" ON "User"("email");
CREATE INDEX IF NOT EXISTS "User_username_idx" ON "User"("username");

CREATE TABLE IF NOT EXISTS "UserFavorite" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "itemType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UserFavorite_pkey" PRIMARY KEY ("id")
);
CREATE INDEX IF NOT EXISTS "UserFavorite_userId_idx" ON "UserFavorite"("userId");
CREATE UNIQUE INDEX IF NOT EXISTS "UserFavorite_userId_itemId_itemType_key"
  ON "UserFavorite"("userId", "itemId", "itemType");
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'UserFavorite_userId_fkey') THEN
    ALTER TABLE "UserFavorite" ADD CONSTRAINT "UserFavorite_userId_fkey"
      FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS "UserWishlist" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "itemType" TEXT NOT NULL,
    "note" TEXT,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UserWishlist_pkey" PRIMARY KEY ("id")
);
CREATE INDEX IF NOT EXISTS "UserWishlist_userId_idx" ON "UserWishlist"("userId");
CREATE UNIQUE INDEX IF NOT EXISTS "UserWishlist_userId_itemId_itemType_key"
  ON "UserWishlist"("userId", "itemId", "itemType");
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'UserWishlist_userId_fkey') THEN
    ALTER TABLE "UserWishlist" ADD CONSTRAINT "UserWishlist_userId_fkey"
      FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS "UserTeam" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "characters" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "UserTeam_pkey" PRIMARY KEY ("id")
);
CREATE INDEX IF NOT EXISTS "UserTeam_userId_idx" ON "UserTeam"("userId");
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'UserTeam_userId_fkey') THEN
    ALTER TABLE "UserTeam" ADD CONSTRAINT "UserTeam_userId_fkey"
      FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS "Otp" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Otp_pkey" PRIMARY KEY ("id")
);
CREATE INDEX IF NOT EXISTS "Otp_email_idx" ON "Otp"("email");

COMMIT;
