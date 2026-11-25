/**
 * Public GraphQL proxy for browser-side reads/mutations.
 *
 * Browser calls stay same-origin so no backend CORS or deployment-protection
 * bypass credential is required. Backend auth behavior is preserved (Admin
 * still requires a verified x-admin-session token; anonymous/public requests
 * pass through unchanged).
 */
import { NextRequest, NextResponse } from 'next/server';
import { getAuthBackendUrl, isSameOriginRequest } from '@/lib/auth-api';

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_URL || `${getAuthBackendUrl()}/graphql`;

export async function POST(request: NextRequest) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ errors: [{ message: 'Forbidden' }] }, { status: 403 });
  }

  try {
    const body = await request.text();
    const backendRes = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
      cache: 'no-store',
    });

    const text = await backendRes.text();
    return new NextResponse(text, {
      status: backendRes.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[Public GraphQL proxy]', error instanceof Error ? error.message : 'unknown');
    return NextResponse.json({ errors: [{ message: 'Unable to reach backend' }] }, { status: 502 });
  }
}
