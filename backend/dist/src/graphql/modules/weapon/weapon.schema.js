"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.weaponTypeDefs = void 0;
exports.weaponTypeDefs = `#graphql
  type Weapon { 
    id: String!
    nameEn: String!
    nameVi: String!
    rarity: Int!
    type: String!
    baseAtk: Int!
    subStat: String
    subStatValue: Float
    passiveNameEn: String
    passiveNameVi: String
    passiveDescEn: String
    passiveDescVi: String
    iconUrl: String
    tier: String
    role: String
    """Public approved rankings only; legacy tier/role fields are untouched."""
    tierRanks: [WeaponTierRank!]!
  }
  
  type WeaponGameLevel {
    level: Int!
    ascension: Int!
    label: String!
    phase: String
    baseAtk: Int!
    subStatValue: Float!
    subStatDisplay: String!
  }

  type WeaponGameMaterial {
    materialId: String!
    nameEn: String!
    count: Int!
  }

  type WeaponGameAscensionStage {
    key: String!
    label: String!
    mora: Int!
    items: [WeaponGameMaterial!]!
  }

  type WeaponGameRefinement {
    rank: Int!
    description: String!
    values: [String!]!
  }

  type WeaponGameData {
    id: String!
    sourceId: Int!
    nameEn: String!
    weaponType: String!
    weaponText: String!
    rarity: Int!
    description: String
    passiveName: String
    mainStatType: String
    mainStatText: String
    version: String
    levels: [WeaponGameLevel!]!
    refinements: [WeaponGameRefinement!]!
    ascension: [WeaponGameAscensionStage!]!
  }

  type WeaponRecommendedUser {
    id: String!
    nameEn: String!
    nameVi: String!
    element: String!
    rarity: Int!
    avatarUrl: String!
    tier: String
    role: String
    rank: Int!
    isF2P: Boolean!
  }

  type Query {
    weapons: [Weapon!]!
    weapon(id: String!): Weapon
    weaponGameData(id: String!): WeaponGameData
    weaponRecommendedUsers(id: String!): [WeaponRecommendedUser!]!
  }
  
  input WeaponInput { 
    id: String!
    nameEn: String!
    nameVi: String!
    rarity: Int!
    type: String!
    baseAtk: Int!
    subStat: String
    subStatValue: Float
    passiveNameEn: String
    passiveNameVi: String
    passiveDescEn: String
    passiveDescVi: String
    iconUrl: String
    tier: String 
  }

  type Mutation {
    upsertWeapon(input: WeaponInput!): Weapon
    deleteWeapon(id: String!): Boolean
    updateWeaponTierList(id: String!, tier: String, role: String): Weapon
  }
`;
