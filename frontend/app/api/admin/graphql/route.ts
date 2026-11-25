/**
 * Admin GraphQL proxy.
 *
 * The HttpOnly admin_token cookie is verified against the backend's database-
 * backed session service. Only a valid, active Admin session is forwarded;
 * no shared password is ever forwarded or exposed to the browser.
 */
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAdminSession } from '@/lib/adminSession';
import { getAuthBackendUrl, isSameOriginRequest } from '@/lib/auth-api';

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_URL || `${getAuthBackendUrl()}/graphql`;

export async function POST(request: NextRequest) {
  if (!isSameOriginRequest(request)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const cookieStore = await cookies();
  const adminToken = cookieStore.get('admin_token')?.value;

  if (!adminToken) {
    return NextResponse.json({ errors: [{ message: 'Unauthorized: Admin session required' }] }, { status: 401 });
  }
  if (!await verifyAdminSession(adminToken)) {
    const response = NextResponse.json(
      { errors: [{ message: 'Unauthorized: Admin session expired' }] },
      { status: 401 },
    );
    response.cookies.delete('admin_token');
    return response;
  }

  try {
    const body = await request.text();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'x-admin-session': adminToken,
    };

    const backendRes = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers,
      body,
      cache: 'no-store',
    });
    const text = await backendRes.text();
    return new NextResponse(text, {
      status: backendRes.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[Admin GraphQL proxy]', error instanceof Error ? error.message : 'unknown');
    return NextResponse.json({ errors: [{ message: 'Unable to reach backend' }] }, { status: 502 });
  }
}
