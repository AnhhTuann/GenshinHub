import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { mailerService } from '../../../services/mailer.service';
import { authService } from '../../../auth/auth.service';
import { AuthError, validatePassword } from '../../../auth/security';

// ─── Input Sanitization ───────────────────────────────
function sanitize(str: string | undefined | null): string {
  if (!str) return '';
  return str
    .trim()
    .replace(/<[^>]*>/g, '') // Strip HTML tags
    .replace(/[\x00-\x08\x0b-\x0c\x0e-\x1f\x7f]/g, ''); // Strip control chars
}

function validateUsername(username: string): void {
  if (!username || username.length < 3) throw new Error('Tên đăng nhập phải có ít nhất 3 ký tự');
  if (username.length > 20) throw new Error('Tên đăng nhập không được quá 20 ký tự');
  if (!/^[a-zA-Z0-9_]+$/.test(username)) throw new Error('Tên đăng nhập chỉ được chứa chữ cái, số, và dấu gạch dưới');
}

function validateEmail(email: string): void {
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Email không hợp lệ');
  if (email.length > 254) throw new Error('Email quá dài');
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
    return authService.registerCustomer(prisma, input);
  },

  async login(prisma: PrismaClient, email: string, password: string) {
    return authService.loginCustomer(prisma, { email, password });
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
    return authService.loginSocial(prisma, input);
  },

  // ─── Profile ───────────────────────────────────────────────

  async updateProfile(prisma: PrismaClient, userId: string, input: {
    username?: string;
    displayName?: string;
    bio?: string;
    avatarUrl?: string;
  }) {
    const updateData: any = {};

    if (input.username !== undefined) {
      validateUsername(input.username);
      updateData.username = sanitize(input.username);

      const existing = await prisma.user.findFirst({
        where: { username: updateData.username, id: { not: userId } }
      });
      if (existing) throw new Error('Tên đăng nhập đã được sứ dụng');
    }

    if (input.displayName !== undefined) {
      const clean = sanitize(input.displayName);
      if (clean.length > 50) throw new Error('Display name không được quá 50 ký tự');
      updateData.displayName = clean;
    }

    if (input.bio !== undefined) {
      const clean = sanitize(input.bio);
      if (clean.length > 200) throw new Error('Bio không được quá 200 ký tự');
      updateData.bio = clean;
    }

    if (input.avatarUrl !== undefined) {
      // Basic URL validation
      if (input.avatarUrl && !/^https?:\/\//.test(input.avatarUrl)) {
        throw new Error('Avatar URL không hợp lệ');
      }
      updateData.avatarUrl = input.avatarUrl;
    }

    return prisma.user.update({
      where: { id: userId },
      data: { ...updateData, updatedAt: new Date() },
    });
  },

  async changePassword(prisma: PrismaClient, userId: string, oldPassword: string, newPassword: string) {
    validatePassword(newPassword);
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new AuthError('AUTH_UNAUTHORIZED', 'Account not found');
    if (!user.password) throw new AuthError('AUTH_ACCOUNT_DISABLED', 'Social accounts have no local password');

    const valid = await bcrypt.compare(oldPassword, user.password);
    if (!valid) throw new AuthError('AUTH_INVALID_CREDENTIALS', 'Current password is incorrect');

    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: { password: await bcrypt.hash(newPassword, 12), updatedAt: new Date() },
      }),
      prisma.authSession.updateMany({
        where: { customerId: userId, revokedAt: null },
        data: { revokedAt: new Date() },
      }),
    ]);

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

  // ─── Forgot / Reset Password ───────────────────────────────

  async forgotPassword(prisma: PrismaClient, email: string) {
    return authService.requestPasswordReset(prisma, email);
  },

  async resetPassword(prisma: PrismaClient, token: string, newPassword: string) {
    return authService.resetPassword(prisma, token, newPassword);
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
