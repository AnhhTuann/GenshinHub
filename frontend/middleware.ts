import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { jwtVerify } from 'jose';

const ADMIN_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || 'genshinhub-admin-secret-key-change-in-prod'
);

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Admin Authentication Check
  const isAdminRoute = /^\/(vi|en)\/admin(\/(?!login).*)?$/.test(pathname);
  
  if (isAdminRoute) {
    const token = request.cookies.get('admin_token')?.value;
    
    if (!token) {
      const locale = pathname.startsWith('/en') ? 'en' : 'vi';
      return NextResponse.redirect(new URL(`/${locale}/admin/login`, request.url));
    }
    
    try {
      await jwtVerify(token, ADMIN_SECRET);
      // Auth passed, proceed to intl middleware
    } catch {
      const locale = pathname.startsWith('/en') ? 'en' : 'vi';
      const response = NextResponse.redirect(new URL(`/${locale}/admin/login`, request.url));
      response.cookies.delete('admin_token');
      return response;
    }
  }

  // 2. Run Internationalization Middleware
  // This handles redirecting `/` to `/en` or `/vi` automatically!
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except api, _next, static files
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
