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
    userId: String!
    itemId: String!
    itemType: String!
    createdAt: String!
    # Optional resolved fields depending on itemType
    character: Character
    weapon: Weapon
    artifact: ArtifactSet
  }

  type UserWishlistItem {
    id: String!
    userId: String!
    itemId: String!
    itemType: String!
    note: String
    priority: Int!
    createdAt: String!
    # Optional resolved fields depending on itemType
    character: Character
    weapon: Weapon
    artifact: ArtifactSet
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
    gender: String!
    displayName: String
  }

  input UpdateProfileInput {
    username: String
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
    isFavorite(itemId: String!, itemType: String!): Boolean!
  }

  extend type Mutation {
    register(input: RegisterInput!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    socialLogin(provider: String!, providerId: String!, email: String!, username: String, displayName: String, avatarUrl: String, gender: String): AuthPayload!
    updateProfile(input: UpdateProfileInput!): User!
    syncGachaUrl(url: String!): GachaStats!
    toggleFavorite(itemId: String!, itemType: String!): FavoriteResult!
    addToWishlist(itemId: String!, itemType: String!, note: String): UserWishlistItem!
    removeFromWishlist(wishlistId: String!): Boolean!
    createTeam(name: String!, characters: [String!]!): UserTeam!
    updateTeam(id: String!, name: String, characters: [String!]): UserTeam!
    deleteTeam(id: String!): Boolean!
    changePassword(oldPassword: String!, newPassword: String!): Boolean!
    requestEmailChangeOtp(newEmail: String!): Boolean!
    verifyEmailChangeOtp(newEmail: String!, otp: String!): User!
  }
`;
