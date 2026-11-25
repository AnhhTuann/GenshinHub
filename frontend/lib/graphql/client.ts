const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4000/graphql';
const PUBLIC_GRAPHQL_PROXY = '/api/graphql';

// ISR revalidation: 1 hour for server-side fetches.
const DEFAULT_REVALIDATE = 3600;

function getVercelProtectionHeaders(): Record<string, string> {
  const bypassSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
  if (!bypassSecret) return {};
  return { 'x-vercel-protection-bypass': bypassSecret };
}

function getClientEndpoint(): string {
  return typeof window === 'undefined' ? GRAPHQL_ENDPOINT : PUBLIC_GRAPHQL_PROXY;
}

/**
 * Server-side GraphQL fetch with ISR revalidation.
 * Use this in Server Components for data that can be cached.
 * @param revalidate - seconds to cache. Pass 0 to disable caching.
 */
export async function fetchGraphQL(query: string, variables = {}, revalidate: number = DEFAULT_REVALIDATE, token?: string) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const isServer = typeof window === 'undefined';
  if (isServer) {
    Object.assign(headers, getVercelProtectionHeaders());
  }

  const fetchOptions: RequestInit & { next?: { revalidate: number } } = {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
  };

  // Apply ISR revalidation for server-side fetches
  if (isServer) {
    fetchOptions.next = { revalidate };
  }

  // Render Free can occasionally return a truncated response body during a
  // build's concurrent prerender requests. Retry transparently so one flaky
  // response cannot fail the entire static generation. Successful responses
  // still use Next's ISR cache via fetchOptions.next.revalidate.
  let json: any;
  let lastError: unknown;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(getClientEndpoint(), fetchOptions);

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error(
            'GraphQL HTTP Error: 401. The backend is protected by Vercel Deployment Protection. ' +
            'Set VERCEL_AUTOMATION_BYPASS_SECRET as a server-side (non-NEXT_PUBLIC_) environment ' +
            'variable in the frontend project, available both at build time and runtime.'
          );
        }
        throw new Error(`GraphQL HTTP Error: ${res.status} ${res.statusText}`);
      }

      json = await res.json();
      const transientError = json.errors?.some?.((e: any) =>
        /internal server error|timeout|timed out|truncat|unexpected end|socket hang up/i.test(e.message ?? '')
      );
      if (transientError && attempt < 2) {
        throw new Error('GraphQL Error: ' + json.errors[0].message);
      }
      lastError = undefined;
      break;
    } catch (error) {
      lastError = error;
      if (attempt < 2) {
        // A malformed body can be cached by Next's persistent fetch cache.
        // Force a fresh network read on retries.
        fetchOptions.cache = 'no-store';
        delete fetchOptions.next;
        await new Promise(resolve => setTimeout(resolve, 250 * (attempt + 1)));
      }
    }
  }

  if (lastError) throw lastError;

  if (json.errors) {
    throw new Error('GraphQL Error: ' + json.errors[0].message);
  }
  if (!json.data) {
    return {};
  }
  return json.data;
}

/**
 * Client-side GraphQL fetch with no caching.
 * Use this in Client Components for user mutations (favorites, wishlist, etc.)
 */
export async function fetchGraphQLClient(query: string, variables = {}, token?: string) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(PUBLIC_GRAPHQL_PROXY, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`GraphQL HTTP Error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();

  if (json.errors) {
    const errorMessage = json.errors[0].message;
    throw new Error('GraphQL Error: ' + errorMessage);
  }
  if (!json.data) {
    return {};
  }
  return json.data;
}

/**
 * Admin GraphQL fetch — routes through /api/admin/graphql proxy.
 * Authenticates via the HttpOnly admin_token cookie, verified against the
 * backend's database-backed admin session store. Never uses a shared secret.
 */
export async function fetchGraphQLAdmin(query: string, variables = {}) {
  if (typeof window === 'undefined') {
    // Server-side callers have no browser cookie; fail closed instead of using
    // a universal key. Client components use the secure proxy below.
    throw new Error('Admin GraphQL requires a verified browser session');
  }

  const ADMIN_PROXY = '/api/admin/graphql';
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };

  // For client-side admin calls — use the secure proxy route
  const res = await fetch(ADMIN_PROXY, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
    cache: 'no-store',
    credentials: 'same-origin', // Include the admin_token HttpOnly cookie automatically
  });

  if (res.status === 401) {
    throw new Error('Bạn chưa đăng nhập Admin! Hãy đăng nhập lại tại /admin/login');
  }

  if (!res.ok) {
    throw new Error(`Admin GraphQL HTTP Error: ${res.status}`);
  }

  const json = await res.json();

  if (json.errors) {
    throw new Error('GraphQL Error: ' + json.errors[0].message);
  }
  return json.data ?? {};
}
