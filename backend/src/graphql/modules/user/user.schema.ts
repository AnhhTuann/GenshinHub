export const userSchema = `
  type User {
    id: String!
    username: String!
    email: String!
    gender: String!
    displayName: String
    avatarUrl: String
    bio: String
    createdAt: String!
    # Computed: travelerCharId based on gender
    travelerCharId: String!
    favoritesCount: Int!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type FavoriteResult {
    added: Boolean!
    characterId: String!
  }

  type UserFavorite {
    id: String!
    characterId: String!
    createdAt: String!
  }

  type UserWishlistItem {
    id: String!
    characterId: String!
    note: String
    priority: Int!
    createdAt: String!
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
    gender: String!
    displayName: String
  }

  input UpdateProfileInput {
    displayName: String
    bio: String
    avatarUrl: String
  }

  extend type Query {
    me: User
    myFavorites: [UserFavorite!]!
    myWishlist: [UserWishlistItem!]!
    isFavorite(characterId: String!): Boolean!
  }

  extend type Mutation {
    register(input: RegisterInput!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    updateProfile(input: UpdateProfileInput!): User!
    toggleFavorite(characterId: String!): FavoriteResult!
    addToWishlist(characterId: String!, note: String): UserWishlistItem!
    removeFromWishlist(wishlistId: String!): Boolean!
  }
`;
