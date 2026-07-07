const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4000/graphql';

// Default ISR revalidation time (set to 0 for admin to see fresh data instantly)
const DEFAULT_REVALIDATE = 0;

/**
 * Server-side GraphQL fetch with ISR revalidation.
 * Use this in Server Components for data that can be cached.
 */
export async function fetchGraphQL(query: string, variables = {}, revalidate: number = DEFAULT_REVALIDATE, token?: string) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Attach admin key if running in the browser (client component context)
  if (typeof window !== 'undefined') {
    const adminKey = localStorage.getItem('admin_key');
    if (adminKey) {
      headers['x-admin-key'] = adminKey;
    }
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
 * Client-side GraphQL fetch with no caching.
 * Use this in Client Components for mutations and fresh data.
 */
export async function fetchGraphQLClient(query: string, variables = {}, token?: string) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (typeof window !== 'undefined') {
    const adminKey = localStorage.getItem('admin_key');
    if (adminKey) {
      headers['x-admin-key'] = adminKey;
    }
  }

  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
    cache: 'no-store',
  });
  const json = await res.json();

  if (json.errors) {
    const errorMessage = json.errors[0].message;
    if (errorMessage.includes('Unauthorized')) {
      throw new Error('Bạn chưa đăng nhập Admin! Hãy click nút "⚙️ Admin" ở góc phải bên dưới và nhập mật khẩu.');
    }
    throw new Error('GraphQL Error: ' + errorMessage);
  }
  if (!json.data) {
    return {};
  }
  return json.data;
}
