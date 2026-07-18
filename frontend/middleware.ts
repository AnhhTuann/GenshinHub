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

  const localesPattern = '(en|vi|zh|ja|ko|es|fr|ru|th|de|id|pt|it|tr)';
  
  // Extract locale safely
  const match = pathname.match(new RegExp(`^/(${localesPattern})(/|$)`));
  const locale = match ? match[1] : 'en';

  // 1. Admin Authentication Check
  const isAdminRoute = new RegExp(`^/${localesPattern}/admin(/(?!login).*)?$`).test(pathname);
  
  if (isAdminRoute) {
    const token = request.cookies.get('admin_token')?.value;
    
    if (!token) {
      return NextResponse.redirect(new URL(`/${locale}/admin/login`, request.url));
    }
    
    try {
      await jwtVerify(token, ADMIN_SECRET);
      // Auth passed, proceed to intl middleware
    } catch {
      const response = NextResponse.redirect(new URL(`/${locale}/admin/login`, request.url));
      response.cookies.delete('admin_token');
      return response;
    }
  }

  // 2. User Profile Authentication Check
  const isProfileRoute = new RegExp(`^/${localesPattern}/profile(/.*)?$`).test(pathname);
  const isAuthRoute = new RegExp(`^/${localesPattern}/auth(/.*)?$`).test(pathname);

  if (isProfileRoute || isAuthRoute) {
    const token = request.cookies.get('user_token')?.value;
    const USER_SECRET = new TextEncoder().encode(
      process.env.USER_JWT_SECRET || 'genshinhub-user-secret-change-in-prod'
    );
    
    let isValidToken = false;
    if (token) {
      try {
        await jwtVerify(token, USER_SECRET);
        isValidToken = true;
      } catch {
        // Token invalid or expired
      }
    }

    if (isProfileRoute && !isValidToken) {
      const response = NextResponse.redirect(new URL(`/${locale}/auth/login`, request.url));
      response.cookies.delete('user_token');
      return response;
    }

    if (isAuthRoute && isValidToken) {
      return NextResponse.redirect(new URL(`/${locale}/profile`, request.url));
    }
  }

  // 3. Run Internationalization Middleware
  // This handles redirecting `/` to `/en` or `/vi` automatically!
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except api, _next, static files
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
