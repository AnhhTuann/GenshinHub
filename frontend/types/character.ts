export type Element = 'Pyro' | 'Hydro' | 'Anemo' | 'Electro' | 'Dendro' | 'Cryo' | 'Geo' | 'None';
export type WeaponType = 'Sword' | 'Claymore' | 'Polearm' | 'Bow' | 'Catalyst';
export type Rarity = 4 | 5;
export type Region = 'Mondstadt' | 'Liyue' | 'Inazuma' | 'Sumeru' | 'Fontaine' | 'Natlan' | 'Snezhnaya' | 'Other';

export interface WeaponBuild {
  id: string; nameEn: string; nameVi: string; rank: number; isF2P: boolean;
  iconUrl?: string; subStat?: string; passiveDescEn?: string; passiveDescVi?: string; refinement?: number; rarity?: number;
}

export interface ArtifactBuild {
  setNameEn: string; setNameVi: string; pieces: number; sands: string[]; goblet: string[]; circlet: string[]; subStatsPriority: string[];
  rarity?: number; iconUrl?: string; artifactSetId?: string;
  mixSets?: { nameEn: string; nameVi: string; iconUrl?: string; artifactSetId?: string; }[];
}

export interface CharacterData {
  id: string; nameEn: string; nameVi: string; titleEn: string; titleVi: string; rarity: Rarity; element: Element; weapon: WeaponType; region: Region; birthday?: string;
  avatarUrl: string; splashArtUrl: string; bestWeapons: WeaponBuild[]; bestArtifacts: ArtifactBuild[];
  talentPriority: string[]; bestTeams: string[];
  descriptionEn: string; descriptionVi: string;
  baseHp: number;
  baseAtk: number;
  baseDef: number;
  fandomUrl?: string;
}
