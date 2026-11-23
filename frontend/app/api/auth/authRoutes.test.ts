import { afterEach, expect, test, vi } from 'vitest';
import { authFetch } from '@/lib/auth-api';

const cookieStore = vi.hoisted(() => ({ set: vi.fn(), get: vi.fn(), delete: vi.fn() }));

vi.mock('next/headers', () => ({ cookies: async () => cookieStore }));
vi.mock('@/lib/auth-api', async () => {
  const actual = await vi.importActual<typeof import('@/lib/auth-api')>('@/lib/auth-api');
  return { ...actual, authFetch: vi.fn() };
});

const mockedFetch = vi.mocked(authFetch);
const jsonRequest = (body: Record<string, unknown>) =>
  new Request('http://localhost/api/auth/test', { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } });

afterEach(() => {
  vi.resetAllMocks();
  cookieStore.get.mockReturnValue(undefined);
});

test('customer login stores a finite HttpOnly SameSite cookie from the backend session', async () => {
  const { POST } = await import('./login/route');
  mockedFetch.mockResolvedValue({
    ok: true,
    status: 200,
    data: {
      token: 'opaque-customer-token',
      maxAge: 43200,
      user: { id: 'user-1', email: 'a@example.com', username: 'traveler', gender: 'male' },
    },
  });

  const response = await POST(jsonRequest({ email: 'a@example.com', password: 'Password1!', rememberMe: false }));
  expect(response.status).toBe(200);
  expect(cookieStore.set).toHaveBeenCalledWith('user_token', 'opaque-customer-token', expect.objectContaining({
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 43200,
    path: '/',
  }));
  const body = await response.json();
  expect(body.user.travelerCharId).toBe('traveler-boy');
});

test('forgot-password returns the same generic success for known and unknown emails', async () => {
  const { POST } = await import('./forgot-password/route');
  mockedFetch
    .mockResolvedValueOnce({ ok: true, status: 200, data: { success: true } })
    .mockResolvedValueOnce({ ok: true, status: 200, data: { success: true } });

  const first = await POST(jsonRequest({ email: 'known@example.com' }));
  const second = await POST(jsonRequest({ email: 'unknown@example.com' }));
  expect(first.status).toBe(200);
  const firstBody = await first.json();
  const secondBody = await second.json();
  expect(firstBody).toEqual(secondBody);
  expect(JSON.stringify(firstBody).includes('token')).toBe(false);
});

test('logout revokes the backend session before deleting the cookie', async () => {
  const { POST } = await import('./logout/route');
  cookieStore.get.mockReturnValue({ name: 'user_token', value: 'opaque-customer-token' });
  mockedFetch.mockResolvedValue({ ok: true, status: 200, data: { success: true } });

  await POST(jsonRequest({}));
  expect(mockedFetch).toHaveBeenCalledWith('/auth/logout', { token: 'opaque-customer-token' });
  expect(cookieStore.delete).toHaveBeenCalledWith('user_token');
});

test('cross-origin logout does not touch the session', async () => {
  const { POST } = await import('./logout/route');
  const request = new Request('http://localhost/api/auth/logout', {
    method: 'POST',
    headers: { Origin: 'https://other.example' },
  });
  expect((await POST(request)).status).toBe(403);
  expect(mockedFetch).not.toHaveBeenCalled();
});

test('failed revocation retains the cookie so logout can be retried', async () => {
  const { POST } = await import('./logout/route');
  cookieStore.get.mockReturnValue({ value: 'opaque-customer-token' });
  mockedFetch.mockResolvedValue({ ok: false, status: 502, data: {} });
  expect((await POST(jsonRequest({}))).status).toBe(503);
  expect(cookieStore.delete).not.toHaveBeenCalled();
});
