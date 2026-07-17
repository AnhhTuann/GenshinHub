"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.materialTypeDefs = void 0;
exports.materialTypeDefs = `#graphql
  type Material {
    id: String!
    nameEn: String!
    nameVi: String!
    type: String!
    rarity: Int!
    iconUrl: String
  }
  
  type Query {
    materials: [Material!]!
  }
  
  input MaterialInput { 
    id: String!
    nameEn: String!
    nameVi: String!
    type: String!
    rarity: Int!
    iconUrl: String 
  }

  type Mutation {
    upsertMaterial(input: MaterialInput!): Boolean
    deleteMaterial(id: String!): Boolean
  }
`;
