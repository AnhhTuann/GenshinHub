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
