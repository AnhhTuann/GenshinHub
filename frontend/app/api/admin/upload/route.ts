import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAdminSession } from '@/lib/adminSession';
import { getAuthBackendUrl, isSameOriginRequest } from '@/lib/auth-api';

const BACKEND_URL = getAuthBackendUrl();

export async function POST(request: NextRequest) {
  if (!isSameOriginRequest(request)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const cookieStore = await cookies();
  const adminToken = cookieStore.get('admin_token')?.value;

  if (!adminToken || !await verifyAdminSession(adminToken)) {
    return NextResponse.json({ error: 'Unauthorized: Admin session required' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const bypassSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
    const headers: Record<string, string> = { 'x-admin-session': adminToken };
    if (bypassSecret) headers['x-vercel-protection-bypass'] = bypassSecret;
    const backendRes = await fetch(`${BACKEND_URL}/upload`, {
      method: 'POST',
      headers,
      body: formData,
      cache: 'no-store',
    });
    const data = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
  } catch (error) {
    console.error('[Admin Upload Proxy Error]', error instanceof Error ? error.message : 'unknown');
    return NextResponse.json({ error: 'Failed to reach backend' }, { status: 502 });
  }
}
