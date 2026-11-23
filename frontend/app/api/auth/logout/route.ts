import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { isSameOriginRequest, authFetch } from '@/lib/auth-api';

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) return NextResponse.json({ code: 'AUTH_FORBIDDEN' }, { status: 403 });
  const cookieStore = await cookies();
  const token = cookieStore.get('user_token')?.value;
  if (token && !(await authFetch('/auth/logout', { token })).ok) {
    return NextResponse.json({ code: 'AUTH_UNAVAILABLE' }, { status: 503 });
  }
  cookieStore.delete('user_token');
  return NextResponse.json({ success: true });
}
