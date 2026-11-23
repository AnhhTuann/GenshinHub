import { NextResponse } from 'next/server';
import { isSameOriginRequest, authFetch, AuthLocale } from '@/lib/auth-api';

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) return NextResponse.json({ code: 'AUTH_FORBIDDEN' }, { status: 403 });
  try {
    const body = await request.json();
    const locale: AuthLocale = body.locale === 'vi' ? 'vi' : 'en';
    if (!body.email) {
      return NextResponse.json({ error: locale === 'vi' ? 'Email là bắt buộc' : 'Email is required' }, { status: 400 });
    }

    const result = await authFetch('/auth/forgot-password', { email: body.email, locale });
    // Always generic to prevent enumeration.
    if (result.status === 429) {
      return NextResponse.json({ success: true }, { status: 429 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: true });
  }
}
