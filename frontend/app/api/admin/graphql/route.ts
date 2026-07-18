/**
 * Secure Admin GraphQL Proxy Route
 * 
 * Instead of exposing ADMIN_PASSWORD to the browser via localStorage,
 * this route:
 * 1. Verifies the HttpOnly admin_token cookie (server-side, safe from XSS)
 * 2. Forwards the GraphQL request with x-admin-key to the backend
 * 3. Returns the result to the client
 * 
 * The actual ADMIN_PASSWORD never leaves the server.
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const ADMIN_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || 'genshinhub-admin-secret-key-change-in-prod'
);

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4000/graphql';

export async function POST(request: NextRequest) {
  // 1. Verify admin_token cookie
  const cookieStore = await cookies();
  const adminToken = cookieStore.get('admin_token')?.value;

  if (!adminToken) {
    return NextResponse.json({ errors: [{ message: 'Unauthorized: Admin token required' }] }, { status: 401 });
  }

  try {
    await jwtVerify(adminToken, ADMIN_SECRET);
  } catch {
    return NextResponse.json({ errors: [{ message: 'Unauthorized: Invalid or expired admin token' }] }, { status: 401 });
  }

  // 2. Get admin password from server env (never exposed to browser)
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return NextResponse.json({ errors: [{ message: 'Server configuration error' }] }, { status: 500 });
  }

  // 3. Forward request to backend with admin key
  try {
    const body = await request.json();
    const backendRes = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-key': adminPassword,
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    const data = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
  } catch (error: any) {
    console.error('[Admin GraphQL Proxy Error]', error.message);
    return NextResponse.json({ errors: [{ message: 'Failed to reach backend' }] }, { status: 502 });
  }
}
