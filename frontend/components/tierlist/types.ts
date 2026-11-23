export type TierCharacter = {
  id: string;
  nameEn: string;
  nameVi: string;
  avatarUrl: string;
  rarity: number;
  element: string;
  tier: string | null;
  role: string | null;
  recommendedC: string | null;
  tierNoteEn: string[];
  tierNoteVi: string[];
};

export type TierWeapon = {
  id: string;
  nameEn: string;
  nameVi: string;
  iconUrl: string | null;
  rarity: number;
  type: string;
  tier: string | null;
  role: string | null;
};

/**
 * One APPROVED + INDEPENDENT character ranking row. A character may have several
 * rows (one per role/constellation); `rankingId` is the React key while `id`
 * stays the character id so detail navigation is unchanged.
 */
export type ApprovedCharacterRanking = TierCharacter & {
  rankingId: string;
  characterId: string;
  roleEnum: string;
  constellation: string;
  gameVersion: string;
  explanationVi: string | null;
  sourceName: string | null;
};

/** One APPROVED + INDEPENDENT + rights-verified weapon ranking row. */
export type ApprovedWeaponRanking = TierWeapon & {
  rankingId: string;
  weaponId: string;
  roleEnum: string;
  refinementContext: string;
  gameVersion: string | null;
  explanationVi: string | null;
  confidence: string | null;
};
