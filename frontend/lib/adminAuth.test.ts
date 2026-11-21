import { randomBytes } from 'node:crypto';
import { afterEach, expect, test, vi } from 'vitest';
import { checkAdminStatus, loginAdmin } from './adminAuth';

const cookieStore = vi.hoisted(() => ({ get: vi.fn(), set: vi.fn() }));
vi.mock('next/headers', () => ({ cookies: async () => cookieStore }));

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetAllMocks();
});

test('login cannot set a cookie when signing configuration is missing', async () => {
  const password = randomBytes(32).toString('hex');
  vi.stubEnv('ADMIN_PASSWORD', password);
  vi.stubEnv('ADMIN_JWT_SECRET', undefined);
  expect(await loginAdmin(password)).toHaveProperty('error');
  expect(cookieStore.set).not.toHaveBeenCalled();
});

test('configured login sets a verified HttpOnly Admin session only after checking the password', async () => {
  const password = randomBytes(32).toString('hex');
  vi.stubEnv('ADMIN_PASSWORD', password);
  vi.stubEnv('ADMIN_JWT_SECRET', randomBytes(32).toString('hex'));
  expect(await loginAdmin('invalid')).toHaveProperty('error');
  expect(cookieStore.set).not.toHaveBeenCalled();

  expect(await loginAdmin(password)).toEqual({});
  expect(cookieStore.set).toHaveBeenCalledWith('admin_token', expect.any(String),
    expect.objectContaining({ httpOnly: true, sameSite: 'strict', path: '/' }));
  cookieStore.get.mockReturnValue({ value: cookieStore.set.mock.calls[0][1] });
  expect(await checkAdminStatus()).toBe(true);
});
