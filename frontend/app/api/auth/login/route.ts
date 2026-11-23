import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { isSameOriginRequest, authFetch, AuthLocale, toCustomerView } from '@/lib/auth-api';

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) return NextResponse.json({ code: 'AUTH_FORBIDDEN' }, { status: 403 });
  try {
    const body = await request.json();
    const locale: AuthLocale = body.locale === 'vi' ? 'vi' : 'en';
    const result = await authFetch('/auth/login', {
      email: body.email,
      password: body.password,
      rememberMe: body.rememberMe === true,
      locale,
    });

    if (!result.ok || !result.data?.token) {
      return NextResponse.json(
        { error: result.data?.error ?? 'Login failed' },
        { status: result.status },
      );
    }

    const cookieStore = await cookies();
    cookieStore.set('user_token', result.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: result.data.maxAge,
      path: '/',
    });

    return NextResponse.json({ user: toCustomerView(result.data.user) });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
