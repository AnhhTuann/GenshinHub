import { afterEach, expect, test, vi } from 'vitest';
import { authFetch } from './auth-api';
import { getAdminSession, verifyAdminSession } from './adminSession';

vi.mock('./auth-api', () => ({ authFetch: vi.fn() }));

const mockedFetch = vi.mocked(authFetch);

afterEach(() => vi.resetAllMocks());

test('accepts only a valid active Admin backend session', async () => {
  mockedFetch.mockResolvedValue({
    ok: true,
    status: 200,
    data: {
      valid: true,
      kind: 'ADMIN',
      subject: { id: 'admin-1', username: 'owner', role: 'OWNER', status: 'ACTIVE' },
    },
  });

  expect(await verifyAdminSession('opaque-token')).toBe(true);
  expect(await getAdminSession('opaque-token')).toMatchObject({ id: 'admin-1', role: 'OWNER' });
  expect(mockedFetch).toHaveBeenCalledWith('/auth/session', { token: 'opaque-token' });
});

test('rejects customer sessions, revoked sessions, and missing tokens', async () => {
  mockedFetch.mockResolvedValueOnce({
    ok: true,
    status: 200,
    data: { valid: true, kind: 'CUSTOMER', subject: { id: 'user-1' } },
  });
  expect(await verifyAdminSession('customer-token')).toBe(false);

  mockedFetch.mockResolvedValueOnce({ ok: false, status: 401, data: { valid: false } });
  expect(await verifyAdminSession('revoked-token')).toBe(false);

  expect(await verifyAdminSession(null)).toBe(false);
  expect(mockedFetch).toHaveBeenCalledTimes(2);
});
