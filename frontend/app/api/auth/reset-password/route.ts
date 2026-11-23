import { NextResponse } from 'next/server';
import { isSameOriginRequest, authFetch, AuthLocale } from '@/lib/auth-api';

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) return NextResponse.json({ code: 'AUTH_FORBIDDEN' }, { status: 403 });
  try {
    const body = await request.json();
    const locale: AuthLocale = body.locale === 'vi' ? 'vi' : 'en';
    const token = typeof body.token === 'string' ? body.token : typeof body.otp === 'string' ? body.otp : '';
    const newPassword = typeof body.newPassword === 'string' ? body.newPassword : '';

    if (!token || !newPassword) {
      return NextResponse.json(
        { error: locale === 'vi' ? 'Thiếu thông tin đặt lại mật khẩu' : 'Missing reset information' },
        { status: 400 },
      );
    }

    const result = await authFetch('/auth/reset-password', { token, newPassword, locale });
    if (!result.ok) {
      return NextResponse.json({ error: result.data?.error ?? 'Reset failed' }, { status: result.status });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
