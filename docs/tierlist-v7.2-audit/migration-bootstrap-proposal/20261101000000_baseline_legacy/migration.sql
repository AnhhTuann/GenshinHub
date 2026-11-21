-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "nameVi" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleVi" TEXT NOT NULL,
    "rarity" INTEGER NOT NULL,
    "element" TEXT NOT NULL,
    "weapon" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL,
    "splashArtUrl" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "descriptionVi" TEXT NOT NULL,
    "baseHp" INTEGER NOT NULL,
    "baseAtk" INTEGER NOT NULL,
    "baseDef" INTEGER NOT NULL,
    "fandomUrl" TEXT,
    "birthday" TEXT,
    "tier" TEXT,
    "role" TEXT,
    "recommendedC" TEXT,
    "tierNoteEn" TEXT[],
    "tierNoteVi" TEXT[],
    "talentPriority" TEXT[],
    "signatureWeapons" TEXT[],
    "stats" JSONB,
    "ascensionMats" JSONB,
    "talentMats" JSONB,
    "sands" TEXT[],
    "goblet" TEXT[],
    "circlet" TEXT[],
    "subStatsPriority" TEXT[],

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterWeapon" (
    "id" TEXT NOT NULL,
    "weaponId" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "nameVi" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "isF2P" BOOLEAN NOT NULL,
    "iconUrl" TEXT,
    "subStat" TEXT,
    "passiveDescEn" TEXT,
    "passiveDescVi" TEXT,
    "refinement" INTEGER DEFAULT 1,
    "constellation" TEXT DEFAULT 'C0',
    "order" INTEGER NOT NULL DEFAULT 0,
    "characterId" TEXT NOT NULL,

    CONSTRAINT "CharacterWeapon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterArtifact" (
    "id" TEXT NOT NULL,
    "setNameEn" TEXT NOT NULL,
    "setNameVi" TEXT NOT NULL,
    "pieces" INTEGER NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "constellation" TEXT DEFAULT 'C0',
    "characterId" TEXT NOT NULL,

    CONSTRAINT "CharacterArtifact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterTeam" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rank" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "characterId" TEXT NOT NULL,

    CONSTRAINT "CharacterTeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamMember" (
    "id" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "roleDesc" TEXT NOT NULL,
    "weapons" TEXT[],
    "artifacts" TEXT[],
    "substats" TEXT[],
    "order" INTEGER NOT NULL DEFAULT 0,
    "teamId" TEXT NOT NULL,

    CONSTRAINT "TeamMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Weapon" (
    "id" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "nameVi" TEXT NOT NULL,
    "rarity" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "baseAtk" INTEGER NOT NULL,
    "subStat" TEXT,
    "subStatValue" DOUBLE PRECISION,
    "passiveNameEn" TEXT,
    "passiveNameVi" TEXT,
    "passiveDescEn" TEXT,
    "passiveDescVi" TEXT,
    "iconUrl" TEXT,
    "tier" TEXT,
    "role" TEXT,

    CONSTRAINT "Weapon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArtifactSet" (
    "id" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "nameVi" TEXT NOT NULL,
    "rarityList" INTEGER[],
    "piece2DescEn" TEXT NOT NULL,
    "piece2DescVi" TEXT NOT NULL,
    "piece4DescEn" TEXT NOT NULL,
    "piece4DescVi" TEXT NOT NULL,
    "iconUrl" TEXT,

    CONSTRAINT "ArtifactSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Material" (
    "id" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "nameVi" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "rarity" INTEGER NOT NULL,
    "iconUrl" TEXT,

    CONSTRAINT "Material_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TierRank" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "colorBase" TEXT NOT NULL DEFAULT 'amber',

    CONSTRAINT "TierRank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
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

-- CreateTable
CREATE TABLE "UserFavorite" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "itemType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserFavorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserWishlist" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "itemType" TEXT NOT NULL,
    "note" TEXT,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserWishlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTeam" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "characters" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserTeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Otp" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Otp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Character_element_idx" ON "Character"("element");

-- CreateIndex
CREATE INDEX "Character_rarity_idx" ON "Character"("rarity");

-- CreateIndex
CREATE INDEX "Character_weapon_idx" ON "Character"("weapon");

-- CreateIndex
CREATE INDEX "Character_region_idx" ON "Character"("region");

-- CreateIndex
CREATE INDEX "Character_tier_idx" ON "Character"("tier");

-- CreateIndex
CREATE INDEX "CharacterWeapon_characterId_idx" ON "CharacterWeapon"("characterId");

-- CreateIndex
CREATE INDEX "CharacterArtifact_characterId_idx" ON "CharacterArtifact"("characterId");

-- CreateIndex
CREATE INDEX "CharacterTeam_characterId_idx" ON "CharacterTeam"("characterId");

-- CreateIndex
CREATE INDEX "TeamMember_teamId_idx" ON "TeamMember"("teamId");

-- CreateIndex
CREATE INDEX "Weapon_rarity_idx" ON "Weapon"("rarity");

-- CreateIndex
CREATE INDEX "Weapon_type_idx" ON "Weapon"("type");

-- CreateIndex
CREATE INDEX "Weapon_tier_idx" ON "Weapon"("tier");

-- CreateIndex
CREATE INDEX "Material_type_idx" ON "Material"("type");

-- CreateIndex
CREATE INDEX "Material_rarity_idx" ON "Material"("rarity");

-- CreateIndex
CREATE UNIQUE INDEX "TierRank_name_key" ON "TierRank"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_providerId_key" ON "User"("providerId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_username_idx" ON "User"("username");

-- CreateIndex
CREATE INDEX "UserFavorite_userId_idx" ON "UserFavorite"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserFavorite_userId_itemId_itemType_key" ON "UserFavorite"("userId", "itemId", "itemType");

-- CreateIndex
CREATE INDEX "UserWishlist_userId_idx" ON "UserWishlist"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserWishlist_userId_itemId_itemType_key" ON "UserWishlist"("userId", "itemId", "itemType");

-- CreateIndex
CREATE INDEX "UserTeam_userId_idx" ON "UserTeam"("userId");

-- CreateIndex
CREATE INDEX "Otp_email_idx" ON "Otp"("email");

-- AddForeignKey
ALTER TABLE "CharacterWeapon" ADD CONSTRAINT "CharacterWeapon_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterArtifact" ADD CONSTRAINT "CharacterArtifact_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterTeam" ADD CONSTRAINT "CharacterTeam_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "CharacterTeam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavorite" ADD CONSTRAINT "UserFavorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWishlist" ADD CONSTRAINT "UserWishlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTeam" ADD CONSTRAINT "UserTeam_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

