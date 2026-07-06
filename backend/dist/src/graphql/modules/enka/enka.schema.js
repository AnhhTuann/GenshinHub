"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enkaTypeDefs = void 0;
exports.enkaTypeDefs = `#graphql
  type EnkaShowcase { 
    uid: String!
    nickname: String!
    level: Int!
    avatarUrl: String
    characters: [String!]
    detailedCharacters: JSON 
  }
  
  type Query {
    showcase(uid: String!): EnkaShowcase
  }
`;
