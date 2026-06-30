export const weaponTypeDefs = `#graphql
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
  }
  
  type Query {
    weapons: [Weapon!]!
    weapon(id: String!): Weapon
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
