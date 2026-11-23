import { cookies } from 'next/headers';
import { authFetch } from './auth-api';

export interface UserSession {
  id: string;
  email: string;
  username: string;
  gender?: 'male' | 'female';
  role?: string;
  status?: string;
}

/**
 * Reads the current customer from the HttpOnly cookie and verifies it against
 * the backend session store. Revoked/expired sessions are never accepted.
 */
export async function getServerUser(): Promise<UserSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('user_token')?.value;
  if (!token) return null;

  const result = await authFetch('/auth/session', { token });
  if (!result.ok || !result.data?.valid || result.data.kind !== 'CUSTOMER') return null;
  return result.data.subject as UserSession;
}

export async function isAuthenticated(): Promise<boolean> {
  return (await getServerUser()) !== null;
}
