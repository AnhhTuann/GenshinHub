// Tier Rank-related GraphQL queries & mutations

export const GET_TIER_RANKS = `
  query GetTierRanks {
    tierRanks {
      id name order colorBase
    }
  }
`;

export const ADD_TIER_RANK = `
  mutation AddTierRank($name: String!, $colorBase: String!) {
    addTierRank(name: $name, colorBase: $colorBase) { id name order colorBase }
  }
`;

export const UPDATE_TIER_RANK = `
  mutation UpdateTierRank($id: String!, $name: String, $colorBase: String) {
    updateTierRank(id: $id, name: $name, colorBase: $colorBase) { id name order colorBase }
  }
`;

export const DELETE_TIER_RANK = `
  mutation DeleteTierRank($id: String!) {
    deleteTierRank(id: $id)
  }
`;

export const REORDER_TIER_RANKS = `
  mutation ReorderTierRanks($tierIds: [String!]!) {
    reorderTierRanks(tierIds: $tierIds)
  }
`;
