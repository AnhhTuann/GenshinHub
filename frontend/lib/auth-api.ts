export type AuthLocale = 'en' | 'vi';

export function getAuthBackendUrl(): string {
  return (process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000').replace(/\/$/, '');
}

export interface AuthFetchResult {
  ok: boolean;
  status: number;
  data: Record<string, any>;
}

/** Server-side call to the single backend authentication service. */
function getVercelProtectionHeaders(): Record<string, string> {
  const bypassSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
  if (!bypassSecret) return {};
  return { 'x-vercel-protection-bypass': bypassSecret };
}

export async function authFetch(path: string, body: Record<string, unknown>): Promise<AuthFetchResult> {
  try {
    const response = await fetch(`${getAuthBackendUrl()}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getVercelProtectionHeaders() },
      body: JSON.stringify(body),
      cache: 'no-store',
    });
    let data: Record<string, any> = {};
    try {
      data = await response.json();
    } catch {
      data = {};
    }
    return { ok: response.ok, status: response.status, data };
  } catch (error) {
    console.error('[Auth] backend request failed:', error instanceof Error ? error.message : 'unknown');
    return { ok: false, status: 502, data: { code: 'AUTH_CONFIGURATION' } };
  }
}

export async function verifyCustomerSession(token: string | null | undefined): Promise<boolean> {
  if (!token) return false;
  const result = await authFetch('/auth/session', { token });
  return result.ok && result.data?.valid === true && result.data.kind === 'CUSTOMER';
}

export function toCustomerView(user: Record<string, any>): Record<string, any> {
  return {
    ...user,
    travelerCharId: user.gender === 'female' ? 'traveler-girl' : 'traveler-boy',
    favoritesCount: typeof user.favoritesCount === 'number' ? user.favoritesCount : 0,
  };
}

export function errorMessage(result: AuthFetchResult, locale: AuthLocale, fallback: string): string {
  const generic = locale === 'vi' ? 'Yêu cầu không thành công. Vui lòng thử lại.' : 'Request failed. Please try again.';
  return typeof result.data?.error === 'string' ? result.data.error : (fallback || generic);
}


export function isSameOriginRequest(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return request.headers.get('sec-fetch-site') !== 'cross-site';
  try {
    const expected = new URL(request.url);
    const host = request.headers.get('host');
    if (expected.hostname === 'localhost' && host === `127.0.0.1:${expected.port}`) {
      expected.host = host;
    }
    return new URL(origin).origin === expected.origin;
  } catch {
    return false;
  }
}
