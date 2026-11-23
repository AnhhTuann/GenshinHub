import { randomBytes } from 'node:crypto';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { mailerService } from '../services/mailer.service';
import {
  AuthError,
  AuthLocale,
  SESSION_DURATION_SECONDS,
  generateToken,
  hashIdentifier,
  hashToken,
  normalizeEmail,
  normalizeUsername,
  validateEmail,
  validatePassword,
  validateUsername,
} from './security';

export interface AuthMeta {
  ip?: string;
  userAgent?: string;
  locale?: AuthLocale;
}

export interface SessionResult {
  token: string;
  expiresAt: Date;
  maxAge: number;
}

export interface CustomerAuthResult extends SessionResult {
  user: {
    id: string;
    email: string;
    username: string;
    gender: string;
    displayName: string | null;
    avatarUrl: string | null;
    role: string;
    status: string;
  };
}

export interface AdminAuthResult extends SessionResult {
  admin: {
    id: string;
    username: string;
    displayName: string | null;
    role: string;
    status: string;
  };
}

export type ResolvedSession =
  | { kind: 'CUSTOMER'; id: string; isAdmin: false; customer: any; user: any }
  | { kind: 'ADMIN'; id: string; isAdmin: true; admin: any };

const DUMMY_PASSWORD_HASH = bcrypt.hashSync(randomBytes(32).toString('hex'), 12);
const MAX_FAILED_ATTEMPTS = 5;
const RATE_LIMIT_WINDOW_MS = SESSION_DURATION_SECONDS.RATE_LIMIT_WINDOW * 1000;
const LOCK_DURATION_MS = 15 * 60 * 1000;

function rateLimitKey(scope: string, identifier: string, meta: AuthMeta): string {
  return `${scope}:${hashIdentifier(`${identifier}|${meta.ip ?? 'unknown'}`)}`;
}

async function assertNotRateLimited(prisma: PrismaClient, key: string): Promise<void> {
  const record = await prisma.authRateLimit.findUnique({ where: { key } });
  if (!record) return;
  const now = new Date();
  if (record.lockedUntil && record.lockedUntil > now) {
    throw new AuthError('AUTH_RATE_LIMITED', 'Too many attempts');
  }
}

async function recordFailure(prisma: PrismaClient, key: string): Promise<void> {
  const now = new Date();
  const cutoff = new Date(now.getTime() - RATE_LIMIT_WINDOW_MS);
  const lockedUntil = new Date(now.getTime() + LOCK_DURATION_MS);
  await prisma.$executeRaw`
    INSERT INTO "AuthRateLimit" ("key", "failedCount", "firstFailedAt", "updatedAt")
    VALUES (${key}, 1, ${now}, ${now})
    ON CONFLICT ("key") DO UPDATE SET
      "failedCount" = CASE WHEN "AuthRateLimit"."firstFailedAt" <= ${cutoff}
        THEN 1 ELSE "AuthRateLimit"."failedCount" + 1 END,
      "firstFailedAt" = GREATEST("AuthRateLimit"."firstFailedAt",
        CASE WHEN "AuthRateLimit"."firstFailedAt" <= ${cutoff}
          THEN ${now} ELSE "AuthRateLimit"."firstFailedAt" END),
      "lockedUntil" = CASE WHEN "AuthRateLimit"."firstFailedAt" > ${cutoff}
        AND "AuthRateLimit"."failedCount" + 1 >= ${MAX_FAILED_ATTEMPTS}
        THEN ${lockedUntil} ELSE NULL END,
      "updatedAt" = ${now}
  `;
}

async function clearFailures(prisma: PrismaClient, key: string): Promise<void> {
  await prisma.authRateLimit.deleteMany({ where: { key } });
}

async function issueSession(
  prisma: PrismaClient,
  input: {
    subjectType: 'CUSTOMER' | 'ADMIN';
    customerId?: string;
    adminId?: string;
    maxAge: number;
    meta: AuthMeta;
  },
): Promise<SessionResult> {
  const token = generateToken();
  const expiresAt = new Date(Date.now() + input.maxAge * 1000);
  await prisma.authSession.create({
    data: {
      subjectType: input.subjectType,
      customerId: input.customerId,
      adminId: input.adminId,
      tokenHash: hashToken(token),
      expiresAt,
      lastUsedAt: new Date(),
      userAgent: input.meta.userAgent?.slice(0, 300),
      ipAddress: input.meta.ip ? hashIdentifier(input.meta.ip).slice(0, 64) : null,
    },
  });
  return { token, expiresAt, maxAge: input.maxAge };
}

function publicUser(user: any): CustomerAuthResult['user'] {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    gender: user.gender,
    displayName: user.displayName,
    avatarUrl: user.avatarUrl,
    role: user.role,
    status: user.status,
  };
}

function publicAdmin(admin: any): AdminAuthResult['admin'] {
  return {
    id: admin.id,
    username: admin.username,
    displayName: admin.displayName,
    role: admin.role,
    status: admin.status,
  };
}

export const authService = {
  async registerCustomer(
    prisma: PrismaClient,
    input: {
      username: string;
      email: string;
      password: string;
      confirmPassword?: string;
      gender: string;
      displayName?: string;
      role?: string;
      status?: string;
    },
    meta: AuthMeta = {},
  ): Promise<CustomerAuthResult> {
    validateUsername(input.username);
    validateEmail(input.email);
    validatePassword(input.password);
    if (input.confirmPassword !== undefined && input.confirmPassword !== input.password) {
      throw new AuthError('AUTH_PASSWORD_MISMATCH', 'Passwords do not match');
    }
    if (input.gender !== 'male' && input.gender !== 'female') {
      throw new AuthError('AUTH_INVALID_GENDER', 'Invalid gender');
    }

    const username = normalizeUsername(input.username);
    const email = normalizeEmail(input.email);
    const existing = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username: { equals: username, mode: 'insensitive' } },
        ],
      },
    });
    if (existing) {
      if (normalizeEmail(existing.email) === email) {
        throw new AuthError('AUTH_EMAIL_TAKEN', 'Email already registered');
      }
      throw new AuthError('AUTH_USERNAME_TAKEN', 'Username already taken');
    }

    // Client-supplied role/status are intentionally ignored. Registration can
    // never create an Admin or a disabled account.
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: await bcrypt.hash(input.password, 12),
        gender: input.gender,
        displayName: normalizeUsername(input.displayName)?.slice(0, 50) || username,
        provider: 'local',
        role: 'CUSTOMER',
        status: 'ACTIVE',
      },
    });

    const session = await issueSession(prisma, {
      subjectType: 'CUSTOMER',
      customerId: user.id,
      maxAge: SESSION_DURATION_SECONDS.CUSTOMER,
      meta,
    });
    return { ...session, user: publicUser(user) };
  },

  async loginCustomer(
    prisma: PrismaClient,
    input: { email: string; password: string; rememberMe?: boolean },
    meta: AuthMeta = {},
  ): Promise<CustomerAuthResult> {
    const email = normalizeEmail(input.email);
    const key = rateLimitKey('customer-login', email, meta);
    await assertNotRateLimited(prisma, key);

    const user = await prisma.user.findUnique({ where: { email } });
    const passwordMatches = await bcrypt.compare(input.password ?? '', user?.password ?? DUMMY_PASSWORD_HASH);
    if (!user || !user.password || user.role !== 'CUSTOMER' || user.status !== 'ACTIVE' || !passwordMatches) {
      await recordFailure(prisma, key);
      throw new AuthError('AUTH_INVALID_CREDENTIALS', 'Incorrect email or password');
    }

    await clearFailures(prisma, key);
    const maxAge = input.rememberMe ? SESSION_DURATION_SECONDS.CUSTOMER_REMEMBER : SESSION_DURATION_SECONDS.CUSTOMER;
    const session = await issueSession(prisma, {
      subjectType: 'CUSTOMER',
      customerId: user.id,
      maxAge,
      meta,
    });
    return { ...session, user: publicUser(user) };
  },

  async loginAdmin(
    prisma: PrismaClient,
    input: { username: string; password: string },
    meta: AuthMeta = {},
  ): Promise<AdminAuthResult> {
    const username = normalizeUsername(input.username);
    const key = rateLimitKey('admin-login', username.toLowerCase(), meta);
    await assertNotRateLimited(prisma, key);

    const admin = await prisma.admin.findUnique({ where: { username } });
    const passwordMatches = await bcrypt.compare(input.password ?? '', admin?.passwordHash ?? DUMMY_PASSWORD_HASH);
    if (!admin || !passwordMatches) {
      await recordFailure(prisma, key);
      if (admin) {
        await prisma.admin.update({
          where: { id: admin.id },
          data: { failedLoginCount: { increment: 1 } },
        });
      }
      throw new AuthError('AUTH_INVALID_CREDENTIALS', 'Incorrect username or password');
    }
    if (admin.status !== 'ACTIVE') {
      throw new AuthError('AUTH_ACCOUNT_DISABLED', 'Admin account unavailable');
    }

    await clearFailures(prisma, key);
    await prisma.admin.update({
      where: { id: admin.id },
      data: { failedLoginCount: 0, lockedUntil: null, lastLoginAt: new Date() },
    });
    const session = await issueSession(prisma, {
      subjectType: 'ADMIN',
      adminId: admin.id,
      maxAge: SESSION_DURATION_SECONDS.ADMIN,
      meta,
    });
    return { ...session, admin: publicAdmin(admin) };
  },

  async logout(prisma: PrismaClient, token: string | undefined | null): Promise<boolean> {
    if (!token) return true;
    await prisma.authSession.updateMany({
      where: { tokenHash: hashToken(token), revokedAt: null },
      data: { revokedAt: new Date() },
    });
    return true;
  },

  async resolveSession(prisma: PrismaClient, token: string | undefined | null): Promise<ResolvedSession | null> {
    if (!token) return null;
    const session = await prisma.authSession.findUnique({ where: { tokenHash: hashToken(token) } });
    if (!session || session.revokedAt || session.expiresAt.getTime() <= Date.now()) return null;
    await prisma.authSession.update({ where: { id: session.id }, data: { lastUsedAt: new Date() } });

    if (session.subjectType === 'CUSTOMER') {
      if (!session.customerId) return null;
      const customer = await prisma.user.findUnique({ where: { id: session.customerId } });
      if (!customer || customer.status !== 'ACTIVE' || customer.role === 'ADMIN') return null;
      return { kind: 'CUSTOMER', id: customer.id, isAdmin: false, customer, user: customer };
    }

    if (!session.adminId) return null;
    const admin = await prisma.admin.findUnique({ where: { id: session.adminId } });
    if (!admin || admin.status !== 'ACTIVE' || (admin.role !== 'OWNER' && admin.role !== 'ADMIN')) return null;
    return { kind: 'ADMIN', id: admin.id, isAdmin: true, admin };
  },

  async requestPasswordReset(
    prisma: PrismaClient,
    email: string,
    meta: AuthMeta = {},
  ): Promise<boolean> {
    const normalized = normalizeEmail(email);
    validateEmail(normalized);
    const key = rateLimitKey('password-reset', normalized, meta);
    if (await prisma.authRateLimit.findUnique({ where: { key } }).then((record) => record?.lockedUntil && record.lockedUntil > new Date())) return true;

    const user = await prisma.user.findUnique({ where: { email: normalized } });
    await recordFailure(prisma, key);
    if (!user || !user.password || user.role !== 'CUSTOMER' || user.status !== 'ACTIVE') {
      return true; // generic response prevents account enumeration
    }

    const token = generateToken();
    await prisma.$transaction([
      prisma.passwordResetToken.updateMany({
        where: { userId: user.id, usedAt: null },
        data: { usedAt: new Date() },
      }),
      prisma.passwordResetToken.create({
        data: {
          userId: user.id,
          tokenHash: hashToken(token),
          expiresAt: new Date(Date.now() + SESSION_DURATION_SECONDS.PASSWORD_RESET * 1000),
        },
      }),
    ]);

    try {
      await mailerService.sendPasswordResetEmail(normalized, token, meta.locale ?? 'en');
    } catch {
      console.error('[Auth] Password reset delivery failed');
    }
    return true;
  },

  async resetPassword(
    prisma: PrismaClient,
    token: string,
    newPassword: string,
    meta: AuthMeta = {},
  ): Promise<boolean> {
    validatePassword(newPassword);
    if (!token) throw new AuthError('AUTH_INVALID_TOKEN', 'Invalid reset token');

    const tokenHash = hashToken(token);
    const key = rateLimitKey('password-reset-use', tokenHash, meta);
    await assertNotRateLimited(prisma, key);

    const record = await prisma.passwordResetToken.findUnique({ where: { tokenHash } });
    if (!record || record.usedAt || record.expiresAt.getTime() <= Date.now()) {
      await recordFailure(prisma, key);
      throw new AuthError('AUTH_INVALID_TOKEN', 'Invalid or expired reset token');
    }

    const password = await bcrypt.hash(newPassword, 12);
    await prisma.$transaction(async (tx) => {
      const now = new Date();
      const consumed = await tx.passwordResetToken.updateMany({
        where: { id: record.id, usedAt: null, expiresAt: { gt: now } },
        data: { usedAt: now },
      });
      if (consumed.count !== 1) {
        throw new AuthError('AUTH_INVALID_TOKEN', 'Invalid or expired reset token');
      }
      const updated = await tx.user.updateMany({
        where: { id: record.userId, role: 'CUSTOMER', status: 'ACTIVE' },
        data: { password },
      });
      if (updated.count !== 1) {
        throw new AuthError('AUTH_INVALID_TOKEN', 'Invalid or expired reset token');
      }
      await tx.authSession.updateMany({
        where: { customerId: record.userId, revokedAt: null },
        data: { revokedAt: now },
      });
    });
    await clearFailures(prisma, key);
    return true;
  },

  async loginSocial(_prisma: PrismaClient, _input: unknown): Promise<CustomerAuthResult> {
    throw new AuthError('AUTH_FORBIDDEN', 'Social login is unavailable');
  },

  /** One-time owner bootstrap. Refuses to run when any Admin already exists. */
  async bootstrapOwner(
    prisma: PrismaClient,
    input: { username: string; email?: string; password: string; displayName?: string },
  ): Promise<{ id: string; username: string }> {
    validateUsername(input.username);
    validatePassword(input.password);
    if (input.email) validateEmail(input.email);

    const passwordHash = await bcrypt.hash(input.password, 12);
    const admin = await prisma.$transaction(async (tx) => {
      if (await tx.admin.count()) {
        throw new AuthError('AUTH_ADMIN_EXISTS', 'An Admin identity already exists');
      }
      return tx.admin.create({
        data: {
          username: normalizeUsername(input.username),
          email: input.email ? normalizeEmail(input.email) : null,
          displayName: normalizeUsername(input.displayName).slice(0, 50) || null,
          passwordHash,
          role: 'OWNER',
          status: 'ACTIVE',
        },
      });
    }, { isolationLevel: 'Serializable' });
    return { id: admin.id, username: admin.username };
  },
};
