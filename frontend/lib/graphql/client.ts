const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4000/graphql';

// ISR revalidation: 1 hour for server-side fetches.
const DEFAULT_REVALIDATE = 3600;

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

  const fetchOptions: RequestInit & { next?: { revalidate: number } } = {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
  };

  // Apply ISR revalidation for server-side fetches
  if (typeof window === 'undefined') {
    fetchOptions.next = { revalidate };
  }

  const res = await fetch(GRAPHQL_ENDPOINT, fetchOptions);

  if (!res.ok) {
    throw new Error(`GraphQL HTTP Error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();

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

  const res = await fetch(GRAPHQL_ENDPOINT, {
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
