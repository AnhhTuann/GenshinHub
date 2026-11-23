import { authFetch } from './auth-api';

export interface AdminSessionInfo {
  id: string;
  username: string;
  role: 'OWNER' | 'ADMIN';
  status: 'ACTIVE' | 'SUSPENDED' | 'DISABLED';
  displayName?: string | null;
}

/**
 * Admin sessions are opaque DB-backed tokens. Verification always goes to the
 * backend so revocation, role and status changes take effect immediately.
 */
export async function verifyAdminSession(token: string | null | undefined): Promise<boolean> {
  return (await getAdminSession(token)) !== null;
}

export async function getAdminSession(token: string | null | undefined): Promise<AdminSessionInfo | null> {
  if (!token) return null;
  const result = await authFetch('/auth/session', { token });
  if (!result.ok || !result.data?.valid || result.data.kind !== 'ADMIN') return null;
  const subject = result.data.subject;
  return {
    id: subject.id,
    username: subject.username,
    role: subject.role,
    status: subject.status,
    displayName: subject.displayName,
  };
}
