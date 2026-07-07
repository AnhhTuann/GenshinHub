import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const USER_JWT_SECRET = process.env.USER_JWT_SECRET || 'genshinhub-user-secret-change-in-prod';

export interface UserPayload {
  id: string;
  email: string;
  username: string;
  gender: string;
}

export const userService = {
  // ─── Auth ──────────────────────────────────────────────────

  async register(prisma: PrismaClient, input: {
    username: string;
    email: string;
    password: string;
    gender: 'male' | 'female';
    displayName?: string;
  }) {
    const existing = await prisma.user.findFirst({
      where: { OR: [{ email: input.email }, { username: input.username }] },
    });
    if (existing) {
      if (existing.email === input.email) throw new Error('Email đã được sử dụng');
      throw new Error('Username đã được sử dụng');
    }

    const hashedPassword = await bcrypt.hash(input.password, 12);
    const user = await prisma.user.create({
      data: {
        username: input.username,
        email: input.email,
        password: hashedPassword,
        gender: input.gender,
        displayName: input.displayName || input.username,
      },
    });

    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username, gender: user.gender },
      USER_JWT_SECRET,
      { expiresIn: '30d' }
    );

    return { token, user };
  },

  async login(prisma: PrismaClient, email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('Email hoặc mật khẩu không đúng');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Email hoặc mật khẩu không đúng');

    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username, gender: user.gender },
      USER_JWT_SECRET,
      { expiresIn: '30d' }
    );

    return { token, user };
  },

  verifyToken(token: string): UserPayload {
    return jwt.verify(token, USER_JWT_SECRET) as UserPayload;
  },

  // ─── Profile ───────────────────────────────────────────────

  async updateProfile(prisma: PrismaClient, userId: string, input: {
    displayName?: string;
    bio?: string;
    avatarUrl?: string;
  }) {
    return prisma.user.update({
      where: { id: userId },
      data: { ...input, updatedAt: new Date() },
    });
  },

  // ─── Favorites ─────────────────────────────────────────────

  async toggleFavorite(prisma: PrismaClient, userId: string, characterId: string) {
    const existing = await prisma.userFavorite.findUnique({
      where: { userId_characterId: { userId, characterId } },
    });

    if (existing) {
      await prisma.userFavorite.delete({ where: { id: existing.id } });
      return { added: false, characterId };
    } else {
      await prisma.userFavorite.create({ data: { userId, characterId } });
      return { added: true, characterId };
    }
  },

  async getFavorites(prisma: PrismaClient, userId: string) {
    return prisma.userFavorite.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  },

  // ─── Wishlist ──────────────────────────────────────────────

  async addToWishlist(prisma: PrismaClient, userId: string, characterId: string, note?: string) {
    return prisma.userWishlist.create({
      data: { userId, characterId, note },
    });
  },

  async removeFromWishlist(prisma: PrismaClient, userId: string, wishlistId: string) {
    await prisma.userWishlist.deleteMany({
      where: { id: wishlistId, userId },
    });
    return true;
  },

  async getWishlist(prisma: PrismaClient, userId: string) {
    return prisma.userWishlist.findMany({
      where: { userId },
      orderBy: { priority: 'desc' },
    });
  },
};
