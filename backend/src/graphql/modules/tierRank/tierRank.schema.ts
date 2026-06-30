export const tierRankTypeDefs = `#graphql
  type TierRank {
    id: String!
    name: String!
    order: Int!
    colorBase: String!
  }
  
  type Query {
    tierRanks: [TierRank!]!
  }
  
  type Mutation {
    addTierRank(name: String!, colorBase: String!): TierRank!
    updateTierRank(id: String!, name: String, colorBase: String): TierRank!
    deleteTierRank(id: String!): Boolean!
    reorderTierRanks(tierIds: [String!]!): Boolean!
  }
`;
