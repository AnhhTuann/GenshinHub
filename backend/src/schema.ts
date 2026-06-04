export const typeDefs = `#graphql
  type WeaponBuild { id: String!, name: String!, rank: Int!, isF2P: Boolean!, iconUrl: String, subStat: String, passiveDesc: String, refinement: Int, rarity: Int }
  type ArtifactBuild { setName: String!, pieces: Int!, sands: [String!]!, goblet: [String!]!, circlet: [String!]!, subStatsPriority: [String!]! }
  type Character { 
    id: String!, name: String!, title: String!, rarity: Int!, element: String!, weapon: String!, region: String!, 
    avatarUrl: String!, splashArtUrl: String!, 
    description: String!, baseHp: Int!, baseAtk: Int!, baseDef: Int!, fandomUrl: String,
    bestWeapons: [WeaponBuild!]!, bestArtifacts: [ArtifactBuild!]!, talentPriority: [String!]!, bestTeams: [String!]! 
  }
  
  type Weapon { id: String!, name: String!, rarity: Int!, type: String!, baseAtk: Int!, subStat: String, iconUrl: String }
  type EnkaShowcase { uid: String!, nickname: String!, level: Int!, avatarUrl: String, characters: [String!] }
  
  type Query { 
    characters: [Character!]!, 
    character(id: String!): Character,
    weapons: [Weapon!]!,
    showcase(uid: String!): EnkaShowcase
  }
`;
