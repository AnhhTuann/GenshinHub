"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.artifactTypeDefs = void 0;
exports.artifactTypeDefs = `#graphql
  type ArtifactSet { 
    id: String!
    nameEn: String!
    nameVi: String!
    rarityList: [Int!]!
    piece2DescEn: String
    piece2DescVi: String
    piece4DescEn: String
    piece4DescVi: String
    iconUrl: String 
  }
  
  type Query {
    artifacts: [ArtifactSet!]!
    artifactSet(id: String!): ArtifactSet
  }
  
  input ArtifactSetInput { 
    id: String!
    nameEn: String!
    nameVi: String!
    rarityList: [Int!]!
    piece2DescEn: String
    piece2DescVi: String
    piece4DescEn: String
    piece4DescVi: String
    iconUrl: String 
  }

  type Mutation {
    upsertArtifactSet(input: ArtifactSetInput!): ArtifactSet
    deleteArtifactSet(id: String!): Boolean
  }
`;
