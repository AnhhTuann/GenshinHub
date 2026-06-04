export type Element = 'Pyro' | 'Hydro' | 'Anemo' | 'Electro' | 'Dendro' | 'Cryo' | 'Geo';
export type WeaponType = 'Sword' | 'Claymore' | 'Polearm' | 'Bow' | 'Catalyst';
export type Rarity = 4 | 5;
export type Region = 'Mondstadt' | 'Liyue' | 'Inazuma' | 'Sumeru' | 'Fontaine' | 'Natlan' | 'Snezhnaya' | 'Other';

export interface WeaponBuild {
  id: string; name: string; rank: number; isF2P: boolean;
  iconUrl?: string; subStat?: string; passiveDesc?: string; refinement?: number; rarity?: number;
}

export interface ArtifactBuild {
  setName: string; pieces: number; sands: string[]; goblet: string[]; circlet: string[]; subStatsPriority: string[];
  rarity?: number; iconUrl?: string;
}

export interface CharacterData {
  id: string; name: string; title: string; rarity: Rarity; element: Element; weapon: WeaponType; region: Region;
  avatarUrl: string; splashArtUrl: string; bestWeapons: WeaponBuild[]; bestArtifacts: ArtifactBuild[];
  talentPriority: string[]; bestTeams: string[];
  description: string;
  baseHp: number;
  baseAtk: number;
  baseDef: number;
  fandomUrl?: string;
}
