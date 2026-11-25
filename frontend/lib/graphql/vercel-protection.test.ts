import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { fetchGraphQL, fetchGraphQLAdmin, fetchGraphQLClient } from '@/lib/graphql/client';
import { authFetch } from '@/lib/auth-api';

const ENV_KEYS = ['VERCEL_AUTOMATION_BYPASS_SECRET', 'NEXT_PUBLIC_GRAPHQL_URL', 'BACKEND_URL'];
const originalEnv: Record<string, string | undefined> = {};

beforeEach(() => {
  for (const key of ENV_KEYS) originalEnv[key] = process.env[key];
  process.env.NEXT_PUBLIC_GRAPHQL_URL = 'https://backend.example.test/graphql';
  process.env.BACKEND_URL = 'https://backend.example.test';
  process.env.VERCEL_AUTOMATION_BYPASS_SECRET = 'test-only-bypass-value';
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({ data: { ok: true } }),
  }));
});

afterEach(() => {
  for (const key of ENV_KEYS) {
    if (originalEnv[key] === undefined) delete process.env[key];
    else process.env[key] = originalEnv[key];
  }
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

function lastHeaders(): HeadersInit {
  const mock = vi.mocked(fetch);
  const call = mock.mock.calls[mock.mock.calls.length - 1];
  return (call[1] as RequestInit).headers as HeadersInit;
}

function headerValue(name: string): string | undefined {
  const headers = lastHeaders();
  if (Array.isArray(headers)) return headers.find(([key]) => key === name)?.[1];
  return (headers as Record<string, string>)[name];
}

test('server-side GraphQL never sends a Vercel bypass header to Render', async () => {
  await fetchGraphQL('{ __typename }');
  expect(headerValue('x-vercel-protection-bypass')).toBeUndefined();
});

test('a backend 401 uses a Render-specific message', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    ok: false,
    status: 401,
    statusText: 'Unauthorized',
  }));
  await expect(fetchGraphQL('{ __typename }')).rejects.toThrow(/Render backend rejected the request credentials/);
});

test('browser GraphQL calls use the same-origin proxy', async () => {
  vi.stubGlobal('window', {});
  await fetchGraphQLClient('{ __typename }');
  expect(vi.mocked(fetch).mock.calls[0][0]).toBe('/api/graphql');
  expect(headerValue('x-vercel-protection-bypass')).toBeUndefined();
});

test('server-side auth requests never send a Vercel bypass header', async () => {
  await authFetch('/auth/session', { token: 'opaque' });
  expect(headerValue('x-vercel-protection-bypass')).toBeUndefined();
  expect(vi.mocked(fetch).mock.calls[0][0]).toBe('https://backend.example.test/auth/session');
});

test('Admin GraphQL fails closed on the server instead of using a shared secret', async () => {
  await expect(fetchGraphQLAdmin('mutation { ok }')).rejects.toThrow(/verified browser session/);
  expect(vi.mocked(fetch)).not.toHaveBeenCalled();
});
