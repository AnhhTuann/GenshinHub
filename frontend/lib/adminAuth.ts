"use server";
import { cookies } from 'next/headers';
import { issueAdminSession, verifyAdminSession } from './adminSession';
import { redirect } from 'next/navigation';

export async function loginAdmin(password: string): Promise<{ error?: string }> {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return { error: 'Admin password not configured on server.' };
  if (password !== adminPassword) return { error: 'Incorrect password.' };

  const token = await issueAdminSession();
  if (!token) return { error: 'Admin authentication is not configured on server.' };

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
  return verifyAdminSession(token);
}
