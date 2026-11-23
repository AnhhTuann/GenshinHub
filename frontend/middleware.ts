import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { verifyCustomerSession } from './lib/auth-api';
import { getAdminSession } from './lib/adminSession';

const intlMiddleware = createMiddleware(routing);
const localesPattern = '(en|vi|zh|ja|ko|es|fr|ru|th|de|id|pt|it|tr)';
const loopbackHosts = new Set(['localhost', '127.0.0.1', '::1', '[::1]']);

/**
 * Keep redirects on the browser's origin. Next's NextURL rewrites 127.0.0.1 to
 * localhost, which loses cookies and breaks RSC fetches during local testing.
 * The request Host header carries the origin the browser actually used.
 */
function redirectUrl(request: NextRequest, path: string): URL {
  const fallbackUrl = new URL(request.nextUrl.origin);
  const protocol = request.headers.get('x-forwarded-proto')?.split(',')[0].trim()
    || fallbackUrl.protocol.slice(0, -1);

  for (const header of ['host', 'x-forwarded-host']) {
    const host = request.headers.get(header);
    if (!host) continue;
    try {
      const url = new URL(`${protocol}://${host}`);
      const hostname = url.hostname.toLowerCase();
      if (hostname === fallbackUrl.hostname
        || (loopbackHosts.has(hostname) && loopbackHosts.has(fallbackUrl.hostname))) {
        return new URL(path, url.origin);
      }
    } catch {
      // Try the next header.
    }
  }
  return new URL(path, fallbackUrl);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const match = pathname.match(new RegExp(`^/(${localesPattern})(/|$)`));
  const locale = match ? match[1] : 'en';
  const localizedPath = match ? pathname.slice(match[1].length + 1) : pathname;

  const isAdminRoute = localizedPath === '/admin' || localizedPath.startsWith('/admin/');
  const isAdminLogin = localizedPath === '/admin/login' || localizedPath === '/admin/login/';
  const isProfileRoute = new RegExp(`^/${localesPattern}/profile(/.*)?$`).test(pathname);
  const isAuthRoute = new RegExp(`^/${localesPattern}/auth(/.*)?$`).test(pathname);

  if (isAdminRoute) {
    const token = request.cookies.get('admin_token')?.value;
    const admin = await getAdminSession(token);

    if (!isAdminLogin && !admin) {
      const location = redirectUrl(request, token
        ? `/${locale}/admin/login?expired=1`
        : `/${locale}/admin/login`);
      const response = NextResponse.redirect(location);
      response.headers.set('Location', location.toString());
      if (token) response.cookies.delete('admin_token');
      return response;
    }
    // Authenticated admins are allowed to see the sign-in page. Redirecting an
    // RSC refresh of this page here races with the server action that sets the
    // cookie and can send the browser to Next's normalized localhost origin.
  }

  if (isProfileRoute || isAuthRoute) {
    const token = request.cookies.get('user_token')?.value;
    const validCustomer = await verifyCustomerSession(token);

    if (isProfileRoute && !validCustomer) {
      const location = redirectUrl(request, token
        ? `/${locale}/auth/login?expired=1`
        : `/${locale}/auth/login`);
      const response = NextResponse.redirect(location);
      response.headers.set('Location', location.toString());
      if (token) response.cookies.delete('user_token');
      return response;
    }
    if (isAuthRoute && validCustomer) {
      const location = redirectUrl(request, `/${locale}/profile`);
      const response = NextResponse.redirect(location);
      response.headers.set('Location', location.toString());
      return response;
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
