import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const ADMIN_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || 'genshinhub-admin-secret-key-change-in-prod'
);

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function POST(request: NextRequest) {
  // 1. Verify admin_token cookie
  const cookieStore = await cookies();
  const adminToken = cookieStore.get('admin_token')?.value;

  if (!adminToken) {
    return NextResponse.json({ error: 'Unauthorized: Admin token required' }, { status: 401 });
  }

  try {
    await jwtVerify(adminToken, ADMIN_SECRET);
  } catch {
    return NextResponse.json({ error: 'Unauthorized: Invalid or expired admin token' }, { status: 401 });
  }

  // 2. Get admin password from server env
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  // 3. Forward request to backend upload endpoint
  try {
    const formData = await request.formData();
    const backendRes = await fetch(`${BACKEND_URL}/upload`, {
      method: 'POST',
      headers: {
        'x-admin-key': adminPassword,
        // Don't set Content-Type here; fetch will automatically set it to multipart/form-data with boundary
      },
      body: formData,
      cache: 'no-store',
    });

    const data = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
  } catch (error: any) {
    console.error('[Admin Upload Proxy Error]', error.message);
    return NextResponse.json({ error: 'Failed to reach backend' }, { status: 502 });
  }
}
