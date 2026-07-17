import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { mailerService } from '../../../services/mailer.service';

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
    if (!user || !user.password) throw new Error('Email hoặc mật khẩu không đúng');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Email hoặc mật khẩu không đúng');

    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username, gender: user.gender },
      USER_JWT_SECRET,
      { expiresIn: '30d' }
    );

    return { token, user };
  },

  async socialLogin(prisma: PrismaClient, input: {
    provider: string;
    providerId: string;
    email: string;
    username?: string;
    displayName?: string;
    avatarUrl?: string;
    gender?: string;
  }) {
    let user = await prisma.user.findUnique({ where: { email: input.email } });

    if (user) {
      // Link provider if not set
      if (!user.providerId || user.provider === 'local') {
        user = await prisma.user.update({
          where: { id: user.id },
          data: { provider: input.provider, providerId: input.providerId, avatarUrl: user.avatarUrl || input.avatarUrl }
        });
      }
    } else {
      // Create new social user
      user = await prisma.user.create({
        data: {
          email: input.email,
          username: input.username || `user_${Date.now()}`,
          gender: input.gender || 'male',
          displayName: input.displayName || input.username || 'Traveler',
          avatarUrl: input.avatarUrl,
          provider: input.provider,
          providerId: input.providerId,
        }
      });
    }

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
    username?: string;
    displayName?: string;
    bio?: string;
    avatarUrl?: string;
  }) {
    if (input.username) {
      const existing = await prisma.user.findFirst({
        where: { username: input.username, id: { not: userId } }
      });
      if (existing) throw new Error('Tên đăng nhập đã được sử dụng');
    }

    return prisma.user.update({
      where: { id: userId },
      data: { ...input, updatedAt: new Date() },
    });
  },

  async changePassword(prisma: PrismaClient, userId: string, oldPassword: string, newPassword: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('Không tìm thấy người dùng');
    if (!user.password) throw new Error('Tài khoản này đăng nhập qua mạng xã hội, không có mật khẩu');

    const valid = await bcrypt.compare(oldPassword, user.password);
    if (!valid) throw new Error('Mật khẩu hiện tại không đúng');

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword, updatedAt: new Date() },
    });

    return true;
  },

  async requestEmailChangeOtp(prisma: PrismaClient, userId: string, newEmail: string) {
    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
      throw new Error('Email không hợp lệ');
    }

    const existingUser = await prisma.user.findUnique({ where: { email: newEmail } });
    if (existingUser) throw new Error('Email này đã được sử dụng');

    // Rate limiting: 60s cooldown
    const recentOtp = await prisma.otp.findFirst({
      where: { email: newEmail, purpose: 'EMAIL_CHANGE' },
      orderBy: { createdAt: 'desc' }
    });

    if (recentOtp && Date.now() - recentOtp.createdAt.getTime() < 60000) {
      throw new Error('Vui lòng đợi 60 giây trước khi yêu cầu mã mới');
    }

    // Generate 6 digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    await prisma.otp.create({
      data: {
        email: newEmail,
        code,
        purpose: 'EMAIL_CHANGE',
        expiresAt,
      }
    });

    await mailerService.sendOtpEmail(newEmail, code, 'EMAIL_CHANGE');
    return true;
  },

  async verifyEmailChangeOtp(prisma: PrismaClient, userId: string, newEmail: string, otpCode: string) {
    const otpRecord = await prisma.otp.findFirst({
      where: { email: newEmail, code: otpCode, purpose: 'EMAIL_CHANGE' },
      orderBy: { createdAt: 'desc' }
    });

    if (!otpRecord) throw new Error('Mã OTP không đúng');
    if (otpRecord.expiresAt < new Date()) throw new Error('Mã OTP đã hết hạn');

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { email: newEmail, updatedAt: new Date() },
    });

    // Clean up OTPs for this email
    await prisma.otp.deleteMany({
      where: { email: newEmail, purpose: 'EMAIL_CHANGE' }
    });

    return updatedUser;
  },

  // ─── Favorites ─────────────────────────────────────────────

  async toggleFavorite(prisma: PrismaClient, userId: string, itemId: string, itemType: string) {
    const existing = await prisma.userFavorite.findUnique({
      where: { userId_itemId_itemType: { userId, itemId, itemType } },
    });

    if (existing) {
      await prisma.userFavorite.delete({ where: { id: existing.id } });
      return { added: false, itemId, itemType };
    } else {
      await prisma.userFavorite.create({ data: { userId, itemId, itemType } });
      return { added: true, itemId, itemType };
    }
  },

  async getFavorites(prisma: PrismaClient, userId: string) {
    return prisma.userFavorite.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  },

  // ─── Wishlist ──────────────────────────────────────────────

  async addToWishlist(prisma: PrismaClient, userId: string, itemId: string, itemType: string, note?: string) {
    return prisma.userWishlist.create({
      data: { userId, itemId, itemType, note },
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
