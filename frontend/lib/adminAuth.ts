"use server";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { authFetch, AuthLocale } from './auth-api';
import { getAdminSession } from './adminSession';

const ADMIN_SESSION_COOKIE = 'admin_token';

export async function loginAdmin(
  username: string,
  password: string,
  locale: AuthLocale = 'en',
): Promise<{ error?: string }> {
  const result = await authFetch('/auth/admin/login', { username, password, locale });
  if (!result.ok || !result.data?.token) {
    return { error: result.data?.error ?? (locale === 'vi' ? 'Đăng nhập Admin thất bại.' : 'Admin sign-in failed.') };
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, result.data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: typeof result.data.maxAge === 'number' ? result.data.maxAge : 8 * 60 * 60,
    path: '/',
  });
  return {};
}

export async function logoutAdmin(locale: AuthLocale = 'en', shouldRedirect: boolean = true) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (token && !(await authFetch('/auth/logout', { token, locale })).ok) {
    throw new Error('Unable to revoke Admin session');
  }
  cookieStore.delete(ADMIN_SESSION_COOKIE);
  if (shouldRedirect) redirect(`/${locale}/admin/login`);
}

export async function checkAdminStatus(): Promise<boolean> {
  const cookieStore = await cookies();
  return (await getAdminSession(cookieStore.get(ADMIN_SESSION_COOKIE)?.value)) !== null;
}
