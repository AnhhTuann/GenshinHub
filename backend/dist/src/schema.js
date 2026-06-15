"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
exports.typeDefs = `#graphql
  scalar JSON
  
  type WeaponBuild { id: String!, nameEn: String!, nameVi: String!, rank: Int!, isF2P: Boolean!, iconUrl: String, subStat: String, passiveDescEn: String, passiveDescVi: String, refinement: Int, rarity: Int }
  type MixSetOption { nameEn: String!, nameVi: String!, iconUrl: String, artifactSetId: String }
  type ArtifactBuild { id: String!, setNameEn: String!, setNameVi: String!, pieces: Int!, sands: [String!]!, goblet: [String!]!, circlet: [String!]!, subStatsPriority: [String!]!, rarity: Int, iconUrl: String, artifactSetId: String, mixSets: [MixSetOption!] }
  type TeamMemberBuild { id: String!, characterId: String!, role: String!, roleDesc: String!, weapons: [String!]!, artifacts: [String!]!, substats: [String!]! }
  type TeamBuild { id: String!, name: String!, rank: String!, description: String!, members: [TeamMemberBuild!]! }
  type Character { 
    id: String!, nameEn: String!, nameVi: String!, titleEn: String!, titleVi: String!, rarity: Int!, element: String!, weapon: String!, region: String!, birthday: String,
    avatarUrl: String!, splashArtUrl: String!, 
    descriptionEn: String!, descriptionVi: String!, baseHp: Int!, baseAtk: Int!, baseDef: Int!, fandomUrl: String,
    bestWeapons: [WeaponBuild!]!, bestArtifacts: [ArtifactBuild!]!, talentPriority: [String!]!, signatureWeapons: [Weapon!], teams: [TeamBuild!]!, tier: String,
    role: String, recommendedC: String, tierNoteEn: [String!], tierNoteVi: [String!],
    stats: JSON, ascensionMats: JSON
  }
  
  type CharacterBasic { id: String!, nameEn: String!, nameVi: String!, element: String!, rarity: Int!, avatarUrl: String!, weapon: String! }
  type Weapon { id: String!, nameEn: String!, nameVi: String!, rarity: Int!, type: String!, baseAtk: Int!, subStat: String, subStatValue: Float, passiveNameEn: String, passiveNameVi: String, passiveDescEn: String, passiveDescVi: String, iconUrl: String, tier: String }
  type ArtifactSet { id: String!, nameEn: String!, nameVi: String!, rarityList: [Int!]!, piece2DescEn: String, piece2DescVi: String, piece4DescEn: String, piece4DescVi: String, iconUrl: String }
  type Material { id: String!, nameEn: String!, nameVi: String!, type: String!, rarity: Int!, iconUrl: String }
  type EnkaShowcase { uid: String!, nickname: String!, level: Int!, avatarUrl: String, characters: [String!] }
  
  type Query { 
    characters: [Character!]!, 
    character(id: String!): Character,
    weapons: [Weapon!]!,
    weapon(id: String!): Weapon,
    charactersByWeaponType(weaponType: String!): [CharacterBasic!]!,
    artifacts: [ArtifactSet!]!,
    artifactSet(id: String!): ArtifactSet,
    materials: [Material!]!,
    showcase(uid: String!): EnkaShowcase
  }
  
  input WeaponBuildInput { nameEn: String!, nameVi: String!, rank: Int!, isF2P: Boolean!, iconUrl: String, subStat: String, passiveDescEn: String, passiveDescVi: String, refinement: Int, rarity: Int }
  input ArtifactBuildInput { setNameEn: String!, setNameVi: String!, pieces: Int!, sands: [String!]!, goblet: [String!]!, circlet: [String!]!, subStatsPriority: [String!]! }
  
  input WeaponInput { id: String!, nameEn: String!, nameVi: String!, rarity: Int!, type: String!, baseAtk: Int!, subStat: String, subStatValue: Float, passiveNameEn: String, passiveNameVi: String, passiveDescEn: String, passiveDescVi: String, iconUrl: String, tier: String }
  input ArtifactSetInput { id: String!, nameEn: String!, nameVi: String!, rarityList: [Int!]!, piece2DescEn: String, piece2DescVi: String, piece4DescEn: String, piece4DescVi: String, iconUrl: String }
  input MaterialInput { id: String!, nameEn: String!, nameVi: String!, type: String!, rarity: Int!, iconUrl: String }
  
  input TeamMemberInput { characterId: String!, role: String!, roleDesc: String!, weapons: [String!]!, artifacts: [String!]!, substats: [String!]! }
  input TeamInput { name: String!, rank: String!, description: String!, members: [TeamMemberInput!]! }
  
  input CharacterInput { 
    id: String!, nameEn: String!, nameVi: String!, titleEn: String, titleVi: String,
    element: String!, rarity: Int!, weapon: String!, region: String, 
    avatarUrl: String!, splashArtUrl: String!, descriptionEn: String, descriptionVi: String,
    baseHp: Int, baseAtk: Int, baseDef: Int,
    talentPriority: [String!],
    bestWeapons: [WeaponBuildInput!],
    bestArtifacts: [ArtifactBuildInput!],
    signatureWeapons: [String!],
    teams: [TeamInput!],
    tier: String, role: String, recommendedC: String, tierNoteEn: [String!], tierNoteVi: [String!],
    stats: JSON, ascensionMats: JSON
  }

  type Mutation {
    # Generic CRUD (Upsert/Delete)
    upsertWeapon(input: WeaponInput!): Weapon
    deleteWeapon(id: String!): Boolean
    
    upsertArtifactSet(input: ArtifactSetInput!): ArtifactSet
    deleteArtifactSet(id: String!): Boolean
    
    upsertMaterial(input: MaterialInput!): Boolean
    deleteMaterial(id: String!): Boolean
    
    upsertCharacter(input: CharacterInput!): Character
    deleteCharacter(id: String!): Boolean

    # Character Detail Inline Edits
    updateCharacterSplashArt(id: String!, splashArtUrl: String!): Character
    addCharacterTeam(characterId: String!, name: String!, rank: String!, description: String!, members: [TeamMemberInput!]!): Boolean
    updateCharacterTeam(teamId: String!, name: String!, rank: String!, description: String!, members: [TeamMemberInput!]!): Boolean
    removeCharacterTeam(teamId: String!): Boolean
    updateCharacterTierList(id: String!, tier: String, role: String, recommendedC: String, tierNoteEn: [String!], tierNoteVi: [String!]): Character
    updateWeaponTierList(id: String!, tier: String): Weapon
    
    addCharacterWeapon(characterId: String!, weaponId: String!, rank: Int!, isF2P: Boolean!): Boolean
    removeCharacterWeapon(id: String!): Boolean
    
    addCharacterArtifact(characterId: String!, setNameEn: String!, setNameVi: String!, pieces: Int!, sands: [String!]!, goblet: [String!]!, circlet: [String!]!, subStatsPriority: [String!]!): Boolean
    removeCharacterArtifact(id: String!): Boolean
    
    updateCharacterTalents(id: String!, talentPriority: [String!]!): Character
    updateCharacterArtifactStats(id: String!, sands: [String!]!, goblet: [String!]!, circlet: [String!]!, subStatsPriority: [String!]!): Boolean
    
    # Export DB state back to TS seeds
    exportDatabaseToSeeds: Boolean
  }
`;
