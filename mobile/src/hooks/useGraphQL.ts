import { useState, useEffect, useRef, useCallback } from 'react';
import { fetchGraphQL } from '@/lib/graphql';

interface UseGraphQLOptions {
  /** Skip the fetch on mount (useful for lazy loading) */
  skip?: boolean;
  /** Cache the result in memory keyed by the query string */
  cache?: boolean;
}

interface UseGraphQLResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

// In-memory request cache shared across hook instances
const memCache = new Map<string, any>();

export function useGraphQL<T = any>(
  query: string,
  variables?: Record<string, any>,
  options?: UseGraphQLOptions
): UseGraphQLResult<T> {
  const { skip = false, cache = true } = options || {};

  const cacheKey = cache ? JSON.stringify({ query, variables }) : null;

  const [data, setData] = useState<T | null>(() => {
    if (cacheKey && memCache.has(cacheKey)) {
      return memCache.get(cacheKey) as T;
    }
    return null;
  });
  const [loading, setLoading] = useState<boolean>(!data && !skip);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);
  const fetchCountRef = useRef(0);

  const doFetch = useCallback(async () => {
    if (skip) return;

    // Check cache first
    if (cacheKey && memCache.has(cacheKey)) {
      setData(memCache.get(cacheKey) as T);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    const currentFetch = ++fetchCountRef.current;

    try {
      const result = await fetchGraphQL(query, variables || {});
      if (!mountedRef.current || currentFetch !== fetchCountRef.current) return;

      if (cacheKey) memCache.set(cacheKey, result);
      setData(result as T);
    } catch (err: any) {
      if (!mountedRef.current || currentFetch !== fetchCountRef.current) return;
      setError(err.message || 'Lỗi tải dữ liệu');
    } finally {
      if (mountedRef.current && currentFetch === fetchCountRef.current) {
        setLoading(false);
      }
    }
  }, [query, JSON.stringify(variables), skip, cacheKey]);

  useEffect(() => {
    mountedRef.current = true;
    doFetch();
    return () => {
      mountedRef.current = false;
    };
  }, [doFetch]);

  const refetch = useCallback(() => {
    if (cacheKey) memCache.delete(cacheKey);
    doFetch();
  }, [doFetch, cacheKey]);

  return { data, loading, error, refetch };
}

/** Clear the in-memory cache (e.g. on logout or pull-to-refresh) */
export function clearGraphQLCache() {
  memCache.clear();
}
