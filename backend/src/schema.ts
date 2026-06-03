export const typeDefs = `#graphql
  type WeaponBuild { id: String!, name: String!, rank: Int!, isF2P: Boolean! }
  type ArtifactBuild { setName: String!, pieces: Int!, sands: [String!]!, goblet: [String!]!, circlet: [String!]!, subStatsPriority: [String!]! }
  type Character { id: String!, name: String!, title: String!, rarity: Int!, element: String!, weapon: String!, region: String!, avatarUrl: String!, splashArtUrl: String!, bestWeapons: [WeaponBuild!]!, bestArtifacts: [ArtifactBuild!]!, talentPriority: [String!]!, bestTeams: [String!]! }
  type Query { characters: [Character!]!, character(id: String!): Character }
`;
