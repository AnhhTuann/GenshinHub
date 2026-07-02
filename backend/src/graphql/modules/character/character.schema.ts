import { buildSchema } from 'graphql';

export const characterTypeDefs = `#graphql
  type CharacterWeapon {
    id: ID!
    weaponId: String!
    nameEn: String!
    nameVi: String!
    rank: Int!
    isF2P: Boolean!
    iconUrl: String
    subStat: String
    passiveDescEn: String
    passiveDescVi: String
    refinement: Int
    constellation: String
    rarity: Int 
  }
  
  type MixSetOption { 
    nameEn: String! 
    nameVi: String! 
    iconUrl: String 
    artifactSetId: String 
  }
  
  type CharacterArtifact {
    id: ID!
    setNameEn: String!
    setNameVi: String!
    pieces: Int!
    order: Int
    constellation: String
    iconUrl: String 
    artifactSetId: String 
    rarity: Int
    mixSets: [MixSetOption!] 
  }
  
  type TeamMemberBuild { 
    id: String!
    characterId: String!
    role: String!
    roleDesc: String!
    weapons: [String!]!
    artifacts: [String!]!
    substats: [String!]! 
    order: Int
  }
  
  type TeamBuild { 
    id: String!
    name: String!
    rank: String!
    description: String!
    order: Int!
    members: [TeamMemberBuild!]! 
  }
  
  type Character { 
    id: String!
    nameEn: String!
    nameVi: String!
    titleEn: String!
    titleVi: String!
    rarity: Int!
    element: String!
    weapon: String!
    region: String!
    birthday: String
    avatarUrl: String!
    splashArtUrl: String! 
    descriptionEn: String!
    descriptionVi: String!
    baseHp: Int!
    baseAtk: Int!
    baseDef: Int!
    fandomUrl: String
    bestWeapons: [CharacterWeapon!]!
    bestArtifacts: [CharacterArtifact!]!
    talentPriority: [String!]!
    signatureWeapons: [Weapon!]
    teams: [TeamBuild!]!
    tier: String
    role: String
    recommendedC: String
    tierNoteEn: [String!]
    tierNoteVi: [String!]
    stats: JSON
    ascensionMats: JSON
    talentMats: JSON
    sands: [String!]!
    goblet: [String!]!
    circlet: [String!]!
    subStatsPriority: [String!]!
  }
  
  type CharacterBasic { 
    id: String!
    nameEn: String!
    nameVi: String!
    element: String!
    rarity: Int!
    avatarUrl: String!
    weapon: String! 
  }

  type Query {
    characters: [Character!]!
    character(id: String!): Character
    charactersByWeaponType(weaponType: String!): [CharacterBasic!]!
  }
  
  input WeaponBuildInput { 
    nameEn: String!
    nameVi: String!
    rank: Int!
    isF2P: Boolean!
    iconUrl: String
    subStat: String
    passiveDescEn: String
    passiveDescVi: String
    refinement: Int
    rarity: Int
    constellation: String 
  }
  
  input ArtifactBuildInput { 
    setNameEn: String!
    setNameVi: String!
    pieces: Int!
    constellation: String 
  }

  input TeamMemberInput { 
    characterId: String!
    role: String!
    roleDesc: String!
    weapons: [String!]!
    artifacts: [String!]!
    substats: [String!]! 
  }
  
  input TeamInput { 
    name: String!
    rank: String!
    description: String!
    members: [TeamMemberInput!]! 
  }
  
  input CharacterInput { 
    id: String!
    nameEn: String!
    nameVi: String!
    titleEn: String
    titleVi: String
    element: String!
    rarity: Int!
    weapon: String!
    region: String
    avatarUrl: String!
    splashArtUrl: String!
    descriptionEn: String
    descriptionVi: String
    baseHp: Int
    baseAtk: Int
    baseDef: Int
    talentPriority: [String!]
    bestWeapons: [WeaponBuildInput!]
    bestArtifacts: [ArtifactBuildInput!]
    signatureWeapons: [String!]
    teams: [TeamInput!]
    tier: String
    role: String
    recommendedC: String
    tierNoteEn: [String!]
    tierNoteVi: [String!]
    stats: JSON
    ascensionMats: JSON
    talentMats: JSON
    sands: [String!]
    goblet: [String!]
    circlet: [String!]
    subStatsPriority: [String!]
  }

  type Mutation {
    upsertCharacter(input: CharacterInput!): Character
    deleteCharacter(id: String!): Boolean
    updateCharacterSplashArt(id: String!, splashArtUrl: String!): Character
    
    addCharacterTeam(characterId: String!, name: String!, rank: String!, description: String!, members: [TeamMemberInput!]!): TeamBuild
    updateCharacterTeam(teamId: String!, name: String!, rank: String!, description: String!, members: [TeamMemberInput!]!): Boolean
    removeCharacterTeam(teamId: String!): Boolean
    reorderCharacterTeams(teamIds: [String!]!): Boolean
    
    reorderCharacterWeapons(weaponIds: [String!]!): Boolean
    reorderCharacterArtifacts(artifactIds: [String!]!): Boolean
    
    updateCharacterTierList(id: String!, tier: String, role: String, recommendedC: String, tierNoteEn: [String!], tierNoteVi: [String!]): Character
    
    addCharacterWeapon(characterId: String!, weaponId: String!, rank: Int!, isF2P: Boolean!, constellation: String, refinement: Int): String
    updateCharacterWeapon(id: String!, rank: Int, isF2P: Boolean, refinement: Int): Boolean
    removeCharacterWeapon(id: String!): Boolean
    
    addCharacterArtifact(characterId: String!, setNameEn: String!, setNameVi: String!, pieces: Int!, constellation: String): Boolean
    removeCharacterArtifact(id: String!): Boolean
    
    updateCharacterTalents(id: String!, talentPriority: [String!]!): Character
    updateCharacterArtifactStats(id: String!, sands: [String!]!, goblet: [String!]!, circlet: [String!]!, subStatsPriority: [String!]!): Boolean
    updateCharacterStats(id: String!, stats: JSON!): Character
    updateCharacterAscensionMats(id: String!, ascensionMats: JSON!): Character
    
    generateCharacterAI(nameEn: String!): Character
  }
`;
