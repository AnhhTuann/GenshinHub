import { afterEach, expect, test, vi } from 'vitest';
import { authFetch } from './auth-api';
import { loginAdmin, logoutAdmin } from './adminAuth';

const cookieStore = vi.hoisted(() => ({ get: vi.fn(), set: vi.fn(), delete: vi.fn() }));

vi.mock('next/headers', () => ({ cookies: async () => cookieStore }));
vi.mock('./auth-api', () => ({ authFetch: vi.fn() }));

const mockedFetch = vi.mocked(authFetch);

afterEach(() => {
  vi.resetAllMocks();
  cookieStore.get.mockReturnValue(undefined);
});

test('successful backend Admin login sets an HttpOnly session cookie', async () => {
  mockedFetch.mockResolvedValue({
    ok: true,
    status: 200,
    data: { token: 'opaque-admin-token', maxAge: 28800, admin: { username: 'owner' } },
  });

  expect(await loginAdmin('owner', 'correct-password', 'en')).toEqual({});
  expect(cookieStore.set).toHaveBeenCalledWith('admin_token', 'opaque-admin-token', expect.objectContaining({
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 28800,
  }));
});

test('failed backend Admin login never sets a cookie', async () => {
  mockedFetch.mockResolvedValue({
    ok: false,
    status: 401,
    data: { error: 'Incorrect username or password.', code: 'AUTH_INVALID_CREDENTIALS' },
  });

  expect(await loginAdmin('owner', 'wrong-password', 'en')).toHaveProperty('error');
  expect(cookieStore.set).not.toHaveBeenCalled();
});

test('logout revokes the backend session and deletes the cookie', async () => {
  cookieStore.get.mockReturnValue({ name: 'admin_token', value: 'opaque-admin-token' });
  mockedFetch.mockResolvedValue({ ok: true, status: 200, data: { success: true } });

  await logoutAdmin('en', false);
  expect(mockedFetch).toHaveBeenCalledWith('/auth/logout', { token: 'opaque-admin-token', locale: 'en' });
  expect(cookieStore.delete).toHaveBeenCalledWith('admin_token');
});
