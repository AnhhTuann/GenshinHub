export type Element = 'Pyro' | 'Hydro' | 'Anemo' | 'Electro' | 'Dendro' | 'Cryo' | 'Geo';
export type WeaponType = 'Sword' | 'Claymore' | 'Polearm' | 'Bow' | 'Catalyst';
export type Rarity = 4 | 5;
export type Region = 'Mondstadt' | 'Liyue' | 'Inazuma' | 'Sumeru' | 'Fontaine' | 'Natlan' | 'Snezhnaya' | 'Other';

export interface WeaponGuideline {
  name: string;
  rank: number; // 1 for Best, 2 for Alternative, 3 for F2P option, etc.
  refinement: number;
  notes?: string;
}

export interface ArtifactGuideline {
  rank: number;
  sets: string[]; // ['Emblem of Severed Fate', 'Emblem of Severed Fate'] for 4-piece, or mix
  notes?: string;
}

export interface StatPriorities {
  sands: string[];
  goblet: string[];
  circlet: string[];
  subStats: string[];
}

export interface TeamComp {
  name: string;
  characters: string[]; // List of character names
  description?: string;
}

export interface CharacterItem {
  id: string;
  name: string;
  rarity: Rarity;
  element: Element;
  weapon: WeaponType;
  region: Region;
  splashArtUrl?: string; // Optional field for character artwork
  avatarUrl?: string; // Optional field for character icon
  title: string;
  description: string;
  baseStats?: {
    hp: number;
    atk: number;
    def: number;
  };
  best_weapons: WeaponGuideline[];
  best_artifacts: ArtifactGuideline[];
  stat_priorities: StatPriorities;
  team_comps: TeamComp[];
  talentsPriority: string[]; // e.g. ["Elemental Burst", "Elemental Skill", "Normal Attack"]
  ascensionMaterials: string[];
}
