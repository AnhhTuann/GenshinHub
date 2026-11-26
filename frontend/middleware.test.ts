import { NextRequest } from 'next/server.js';
import { expect, test, vi } from 'vitest';

vi.mock('next-intl/middleware', () => ({
  default: () => () => new Response(null, { status: 200 }),
}));
vi.mock('./i18n/routing', () => ({
  routing: { locales: ['en', 'vi'], defaultLocale: 'en' },
}));
vi.mock('./lib/auth-api', () => ({
  verifyCustomerSession: async () => null,
}));
vi.mock('./lib/adminSession', () => ({
  getAdminSession: async () => null,
}));

const { config, middleware } = await import('./middleware');

test('API routes are matched by middleware', () => {
  expect(config.matcher).toContain('/api/:path*');
});

test('API responses are private and never publicly cacheable', async () => {
  const request = new NextRequest('https://genshinhub-staging.vercel.app/api/auth/me');
  const response = await middleware(request);
  expect(response.headers.get('cache-control')).toBe('private, no-store');
});
