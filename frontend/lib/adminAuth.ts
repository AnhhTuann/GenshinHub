"use server";
import { cookies } from 'next/headers';
import { SignJWT } from 'jose';
import { redirect } from 'next/navigation';

const ADMIN_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || 'genshinhub-admin-secret-key-change-in-prod'
);

export async function loginAdmin(password: string): Promise<{ error?: string }> {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return { error: 'Admin password not configured on server.' };
  if (password !== adminPassword) return { error: 'Incorrect password.' };

  const token = await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .setIssuedAt()
    .sign(ADMIN_SECRET);

  const cookieStore = await cookies();
  cookieStore.set('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/',
  });

  return {};
}

export async function logoutAdmin(locale: string = 'vi', shouldRedirect: boolean = true) {
  const cookieStore = await cookies();
  cookieStore.delete('admin_token');
  if (shouldRedirect) {
    redirect(`/${locale}/admin/login`);
  }
}

export async function getAdminToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get('admin_token')?.value ?? null;
}

export async function checkAdminStatus(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  if (!token) return false;
  
  try {
    const { jwtVerify } = await import('jose');
    await jwtVerify(token, ADMIN_SECRET);
    return true;
  } catch {
    return false;
  }
}
