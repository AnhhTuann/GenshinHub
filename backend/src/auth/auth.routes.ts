import type { Express, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import type { PrismaClient } from '@prisma/client';
import { authService } from './auth.service';
import {
  AuthError,
  AuthLocale,
  getClientIp,
  isSameOrigin,
  localizeAuthError,
  parseLocale,
} from './security';

type AuthRequest = Request;

function requestMeta(req: AuthRequest) {
  const locale = parseLocale(req.body?.locale ?? req.headers['x-locale']);
  return {
    locale,
    ip: getClientIp(req as any),
    userAgent: typeof req.headers['user-agent'] === 'string' ? req.headers['user-agent'] : undefined,
  };
}

/**
 * Cookie-carrying requests must declare the expected browser origin. Pure
 * server-to-server calls (no Origin header) still require possession of the
 * opaque token, so they do not gain ambient authority.
 */
function assertSameOrigin(req: AuthRequest): void {
  const origin = req.headers.origin as string | undefined;
  if (origin && !isSameOrigin(origin, req.headers.host ?? 'localhost')) {
    throw new AuthError('AUTH_FORBIDDEN', 'Cross-origin request rejected');
  }
}

function tokenFrom(req: AuthRequest): string | undefined {
  const bodyToken = req.body?.token;
  if (typeof bodyToken === 'string' && bodyToken.length > 0) return bodyToken;
  const headerToken = req.headers['x-session-token'];
  if (typeof headerToken === 'string' && headerToken.length > 0) return headerToken;
  const authorization = req.headers.authorization;
  if (authorization?.startsWith('Bearer ')) return authorization.substring(7);
  return undefined;
}

function statusFor(code: string): number {
  if (code === 'AUTH_RATE_LIMITED') return 429;
  if (code === 'AUTH_INVALID_CREDENTIALS' || code === 'AUTH_UNAUTHORIZED') return 401;
  if (code === 'AUTH_EMAIL_TAKEN' || code === 'AUTH_USERNAME_TAKEN' || code === 'AUTH_ADMIN_EXISTS') return 409;
  if (code === 'AUTH_ACCOUNT_DISABLED' || code === 'AUTH_FORBIDDEN') return 403;
  return 400;
}

function sendError(res: Response, error: unknown, locale: AuthLocale): void {
  if (error instanceof AuthError) {
    res.status(statusFor(error.code)).json({
      error: localizeAuthError(error.code, locale),
      code: error.code,
    });
    return;
  }
  console.error('[Auth] Unexpected authentication failure');
  res.status(500).json({
    error: localizeAuthError('AUTH_CONFIGURATION', locale),
    code: 'AUTH_INTERNAL',
  });
}

export function registerAuthRoutes(app: Express, prisma: PrismaClient): void {
  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 120,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many authentication requests', code: 'AUTH_RATE_LIMITED' },
  });

  app.post('/auth/register', authLimiter, async (req: AuthRequest, res) => {
    const meta = requestMeta(req);
    try {
      const result = await authService.registerCustomer(prisma, req.body as any, meta);
      res.status(201).json(result);
    } catch (error) {
      sendError(res, error, meta.locale);
    }
  });

  app.post('/auth/login', authLimiter, async (req: AuthRequest, res) => {
    const meta = requestMeta(req);
    try {
      const result = await authService.loginCustomer(prisma, req.body as any, meta);
      res.json(result);
    } catch (error) {
      sendError(res, error, meta.locale);
    }
  });

  app.post('/auth/admin/login', authLimiter, async (req: AuthRequest, res) => {
    const meta = requestMeta(req);
    try {
      const result = await authService.loginAdmin(prisma, req.body as any, meta);
      res.json(result);
    } catch (error) {
      sendError(res, error, meta.locale);
    }
  });

  app.post('/auth/logout', authLimiter, async (req: AuthRequest, res) => {
    const meta = requestMeta(req);
    try {
      assertSameOrigin(req);
      await authService.logout(prisma, tokenFrom(req));
      res.json({ success: true });
    } catch (error) {
      sendError(res, error, meta.locale);
    }
  });

  app.post('/auth/session', async (req: AuthRequest, res) => {
    try {
      const session = await authService.resolveSession(prisma, tokenFrom(req));
      if (!session) {
        res.status(401).json({ valid: false });
        return;
      }
      const subject = session.kind === 'ADMIN'
        ? {
            id: session.admin.id,
            username: session.admin.username,
            role: session.admin.role,
            status: session.admin.status,
            displayName: session.admin.displayName,
          }
        : {
            id: session.customer.id,
            email: session.customer.email,
            username: session.customer.username,
            role: session.customer.role,
            status: session.customer.status,
          };
      res.json({ valid: true, kind: session.kind, isAdmin: session.isAdmin, subject });
    } catch (error) {
      sendError(res, error, 'en');
    }
  });

  app.post('/auth/forgot-password', authLimiter, async (req: AuthRequest, res) => {
    const meta = requestMeta(req);
    try {
      await authService.requestPasswordReset(prisma, req.body?.email ?? '', meta);
      // Deliberately generic for existing and unknown accounts.
      res.json({ success: true });
    } catch (error) {
      // Still generic to prevent enumeration; rate limits are keyed by IP.
      if (error instanceof AuthError && error.code === 'AUTH_RATE_LIMITED') {
        res.status(429).json({ success: true, error: 'Please wait before trying again' });
        return;
      }
      // Log only that delivery failed; never log the email, token, or link.
      if (!(error instanceof AuthError)) console.error('[Auth] password reset delivery failed');
      res.json({ success: true });
    }
  });

  app.post('/auth/reset-password', authLimiter, async (req: AuthRequest, res) => {
    const meta = requestMeta(req);
    try {
      await authService.resetPassword(prisma, req.body?.token ?? '', req.body?.newPassword ?? '', meta);
      res.json({ success: true });
    } catch (error) {
      sendError(res, error, meta.locale);
    }
  });
}
