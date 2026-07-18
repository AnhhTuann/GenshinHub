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
 * Authenticates via HttpOnly admin_token cookie (never uses localStorage).
 * The ADMIN_PASSWORD secret stays server-side only.
 */
export async function fetchGraphQLAdmin(query: string, variables = {}) {
  // Use the secure server-side proxy instead of direct backend call with localStorage key
  const ADMIN_PROXY = typeof window !== 'undefined'
    ? '/api/admin/graphql'
    : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/graphql`;

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };

  // For server-side admin calls (Server Actions), attach the admin key directly
  if (typeof window === 'undefined') {
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (adminPassword) {
      headers['x-admin-key'] = adminPassword;
    }
    const res = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables }),
      cache: 'no-store',
    });
    const json = await res.json();
    if (json.errors) {
      const msg = json.errors[0].message;
      if (msg.includes('Unauthorized')) {
        throw new Error('Admin access denied. Check ADMIN_PASSWORD configuration.');
      }
      throw new Error('GraphQL Error: ' + msg);
    }
    return json.data ?? {};
  }

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
