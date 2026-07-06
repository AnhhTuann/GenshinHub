// Enka-related GraphQL queries

export const GET_SHOWCASE = `
  query GetShowcase($uid: String!) {
    showcase(uid: $uid) {
      uid
      nickname
      level
      avatarUrl
      characters
      detailedCharacters
    }
  }
`;
