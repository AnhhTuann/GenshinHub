"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
exports.userSchema = `
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

  type GachaBannerStats {
    pulls: Int!
    pity: Int!
    guaranteed: Boolean
  }

  type GachaStats {
    character: GachaBannerStats!
    weapon: GachaBannerStats!
    standard: GachaBannerStats!
    winRate: Float!
    totalPulls: Int!
  }

  type UserTeam {
    id: String!
    name: String!
    characters: [String!]!
    createdAt: String!
  }

  extend type Query {
    me: User
    myFavorites: [UserFavorite!]!
    myWishlist: [UserWishlistItem!]!
    myTeams: [UserTeam!]!
    isFavorite(characterId: String!): Boolean!
  }

  extend type Mutation {
    register(input: RegisterInput!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    socialLogin(provider: String!, providerId: String!, email: String!, username: String, displayName: String, avatarUrl: String, gender: String): AuthPayload!
    updateProfile(input: UpdateProfileInput!): User!
    syncGachaUrl(url: String!): GachaStats!
    toggleFavorite(characterId: String!): FavoriteResult!
    addToWishlist(characterId: String!, note: String): UserWishlistItem!
    removeFromWishlist(wishlistId: String!): Boolean!
    createTeam(name: String!, characters: [String!]!): UserTeam!
    updateTeam(id: String!, name: String, characters: [String!]): UserTeam!
    deleteTeam(id: String!): Boolean!
  }
`;
