import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const ADMIN_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || 'genshinhub-admin-secret-key-change-in-prod'
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /[locale]/admin/* routes (but NOT /admin/login)
  const isAdminRoute = /^\/(vi|en)\/admin(\/(?!login).*)?$/.test(pathname);
  const isLoginPage  = /^\/(vi|en)\/admin\/login$/.test(pathname);

  if (!isAdminRoute || isLoginPage) return NextResponse.next();

  const token = request.cookies.get('admin_token')?.value;

  if (!token) {
    const locale = pathname.startsWith('/en') ? 'en' : 'vi';
    return NextResponse.redirect(new URL(`/${locale}/admin/login`, request.url));
  }

  try {
    await jwtVerify(token, ADMIN_SECRET);
    return NextResponse.next();
  } catch {
    const locale = pathname.startsWith('/en') ? 'en' : 'vi';
    const response = NextResponse.redirect(new URL(`/${locale}/admin/login`, request.url));
    response.cookies.delete('admin_token');
    return response;
  }
}

export const config = {
  matcher: ['/(vi|en)/admin/:path*'],
};
