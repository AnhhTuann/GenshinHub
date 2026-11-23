import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';

/**
 * Stable, machine-readable authentication errors.
 * UI layers map `code` to localized copy; raw database details never cross
 * the API boundary.
 */
export class AuthError extends Error {
  readonly code: string;
  readonly extensions: { code: string };

  constructor(code: string, message: string) {
    super(message);
    this.name = 'AuthError';
    this.code = code;
    this.extensions = { code };
  }
}

/** Finite session lifetimes, in seconds. Remember Me is bounded, never forever. */
export const SESSION_DURATION_SECONDS = {
  CUSTOMER: 12 * 60 * 60,
  CUSTOMER_REMEMBER: 30 * 24 * 60 * 60,
  ADMIN: 8 * 60 * 60,
  PASSWORD_RESET: 15 * 60,
  RATE_LIMIT_WINDOW: 15 * 60,
} as const;

const EMAIL_MAX_LENGTH = 254;
const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 20;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_BYTES = 72;

export function normalizeEmail(value: string | undefined | null): string {
  return (typeof value === 'string' ? value : '').trim().toLowerCase();
}

export function normalizeUsername(value: string | undefined | null): string {
  return (typeof value === 'string' ? value : '').trim();
}

export function validateEmail(value: string): void {
  const email = normalizeEmail(value);
  if (!email || email.length > EMAIL_MAX_LENGTH) {
    throw new AuthError('AUTH_INVALID_EMAIL', 'Invalid email address');
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new AuthError('AUTH_INVALID_EMAIL', 'Invalid email address');
  }
}

export function validateUsername(value: string): void {
  const username = normalizeUsername(value);
  if (
    username.length < USERNAME_MIN_LENGTH ||
    username.length > USERNAME_MAX_LENGTH ||
    !/^[a-zA-Z0-9_]+$/.test(username)
  ) {
    throw new AuthError('AUTH_INVALID_USERNAME', 'Invalid username');
  }
}

export function validatePassword(value: string): void {
  if (
    typeof value !== 'string' ||
    value.length < PASSWORD_MIN_LENGTH ||
    Buffer.byteLength(value, 'utf8') > PASSWORD_MAX_BYTES ||
    !/[a-z]/.test(value) ||
    !/[A-Z]/.test(value) ||
    !/[0-9]/.test(value) ||
    !/[^A-Za-z0-9]/.test(value)
  ) {
    throw new AuthError('AUTH_WEAK_PASSWORD', 'Password does not meet strength requirements');
  }
}

/** URL-safe random opaque session/reset token. Only its hash is persisted. */
export function generateToken(): string {
  return randomBytes(32).toString('base64url');
}

export function hashToken(token: string): string {
  return createHash('sha256').update(token, 'utf8').digest('hex');
}

export function hashIdentifier(value: string): string {
  return createHash('sha256').update(value, 'utf8').digest('hex');
}

/** Constant-time comparison of two hashed strings. */
export function safeCompare(left: string, right: string): boolean {
  const a = createHash('sha256').update(left).digest();
  const b = createHash('sha256').update(right).digest();
  return timingSafeEqual(a, b);
}

/** Origin allow-list helper for CSRF-sensitive routes. */
export function isSameOrigin(origin: string | undefined, host: string): boolean {
  if (!origin) return false;
  try {
    const parsed = new URL(origin);
    if (!['http:', 'https:'].includes(parsed.protocol)) return false;
    return host.includes(':') ? parsed.host === host : parsed.hostname === host;
  } catch {
    return false;
  }
}

export function getClientIp(req: { headers: Record<string, unknown>; ip?: string }): string {
  return req.ip ?? 'unknown';
}

const SUPPORTED_LOCALES = new Set(['en', 'vi']);

export function parseLocale(value: unknown): 'en' | 'vi' {
  return typeof value === 'string' && SUPPORTED_LOCALES.has(value) ? (value as 'en' | 'vi') : 'en';
}

const AUTH_MESSAGES = {
  en: {
    AUTH_INVALID_CREDENTIALS: 'Incorrect email or password.',
    AUTH_ACCOUNT_DISABLED: 'This account is unavailable.',
    AUTH_RATE_LIMITED: 'Too many attempts. Please try again later.',
    AUTH_INVALID_EMAIL: 'Enter a valid email address.',
    AUTH_INVALID_USERNAME: 'Use 3–20 letters, numbers, or underscores.',
    AUTH_INVALID_GENDER: 'Choose a valid gender.',
    AUTH_PASSWORD_MISMATCH: 'Passwords do not match.',
    AUTH_WEAK_PASSWORD: 'Use 8 or more characters (up to 72 UTF-8 bytes) with upper/lower case, a number, and a symbol.',
    AUTH_EMAIL_TAKEN: 'That email is already registered.',
    AUTH_USERNAME_TAKEN: 'That username is already taken.',
    AUTH_INVALID_TOKEN: 'This link is invalid or has expired.',
    AUTH_TOKEN_USED: 'This link has already been used.',
    AUTH_UNAUTHORIZED: 'Please sign in to continue.',
    AUTH_FORBIDDEN: 'You do not have permission to do that.',
    AUTH_CONFIGURATION: 'Authentication is not configured on the server.',
    AUTH_ADMIN_EXISTS: 'An Admin identity already exists.',
  },
  vi: {
    AUTH_INVALID_CREDENTIALS: 'Email hoặc mật khẩu không đúng.',
    AUTH_ACCOUNT_DISABLED: 'Tài khoản này hiện không khả dụng.',
    AUTH_RATE_LIMITED: 'Quá nhiều lần thử. Vui lòng thử lại sau.',
    AUTH_INVALID_EMAIL: 'Vui lòng nhập email hợp lệ.',
    AUTH_INVALID_USERNAME: 'Tên đăng nhập dùng 3–20 chữ cái, số hoặc dấu gạch dưới.',
    AUTH_INVALID_GENDER: 'Vui lòng chọn giới tính hợp lệ.',
    AUTH_PASSWORD_MISMATCH: 'Mật khẩu xác nhận không khớp.',
    AUTH_WEAK_PASSWORD: 'Mật khẩu tối thiểu 8 ký tự (tối đa 72 byte UTF-8), gồm chữ hoa, chữ thường, số và ký tự đặc biệt.',
    AUTH_EMAIL_TAKEN: 'Email này đã được đăng ký.',
    AUTH_USERNAME_TAKEN: 'Tên đăng nhập này đã được sử dụng.',
    AUTH_INVALID_TOKEN: 'Liên kết không hợp lệ hoặc đã hết hạn.',
    AUTH_TOKEN_USED: 'Liên kết này đã được sử dụng.',
    AUTH_UNAUTHORIZED: 'Vui lòng đăng nhập để tiếp tục.',
    AUTH_FORBIDDEN: 'Bạn không có quyền thực hiện thao tác này.',
    AUTH_CONFIGURATION: 'Máy chủ chưa cấu hình xác thực.',
    AUTH_ADMIN_EXISTS: 'Đã tồn tại tài khoản Admin.',
  },
} as const;

export type AuthLocale = keyof typeof AUTH_MESSAGES;

export function localizeAuthError(code: string, locale: AuthLocale = 'en'): string {
  return AUTH_MESSAGES[locale][code as keyof (typeof AUTH_MESSAGES)['en']] ?? AUTH_MESSAGES[locale].AUTH_UNAUTHORIZED;
}
