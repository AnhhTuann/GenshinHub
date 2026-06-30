export const enkaTypeDefs = `#graphql
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
