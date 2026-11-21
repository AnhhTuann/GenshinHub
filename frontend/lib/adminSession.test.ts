import { randomBytes } from 'node:crypto';
import { SignJWT } from 'jose';
import { afterEach, expect, test, vi } from 'vitest';
import { issueAdminSession, verifyAdminSession } from './adminSession';

afterEach(() => vi.unstubAllEnvs());

test('missing signing configuration disables issuing and verifying sessions', async () => {
  vi.stubEnv('ADMIN_JWT_SECRET', undefined);
  expect(await issueAdminSession()).toBeNull();
  expect(await verifyAdminSession('invalid')).toBe(false);
});

test('rejects invalid signatures and a signed token without Admin session claims', async () => {
  vi.stubEnv('ADMIN_JWT_SECRET', randomBytes(32).toString('hex'));
  const token = await issueAdminSession();
  expect(token).toBeTruthy();
  vi.stubEnv('ADMIN_JWT_SECRET', randomBytes(32).toString('hex'));
  expect(await verifyAdminSession(token)).toBe(false);
  expect(await verifyAdminSession('invalid')).toBe(false);
  const foreignToken = await new SignJWT({ role: 'user' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuer('genshinhub')
    .setAudience('genshinhub-admin')
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(new TextEncoder().encode(process.env.ADMIN_JWT_SECRET));
  expect(await verifyAdminSession(foreignToken)).toBe(false);
});

test('accepts a valid Admin session only with the configured signing key', async () => {
  vi.stubEnv('ADMIN_JWT_SECRET', randomBytes(32).toString('hex'));
  const token = await issueAdminSession();
  expect(await verifyAdminSession(token)).toBe(true);
  vi.stubEnv('ADMIN_JWT_SECRET', '');
  expect(await verifyAdminSession(token)).toBe(false);
});
