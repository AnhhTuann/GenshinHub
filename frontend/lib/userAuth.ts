import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const USER_SECRET = new TextEncoder().encode(
  process.env.USER_JWT_SECRET || 'genshinhub-user-secret-change-in-prod'
);

export interface UserSession {
  id: string;
  email: string;
  username: string;
  gender: 'male' | 'female';
}

/**
 * Retrieves the current logged-in user from the cookies.
 * This can only be used in Server Components or Server Actions.
 */
export async function getServerUser(): Promise<UserSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('user_token')?.value;

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, USER_SECRET);
    return payload as unknown as UserSession;
  } catch (err) {
    // Token invalid or expired
    return null;
  }
}

/**
 * Convenience method to check if user is logged in
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getServerUser();
  return !!user;
}
