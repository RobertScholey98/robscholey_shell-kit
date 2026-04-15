import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useAuthenticatedFetch } from './useAuthenticatedFetch';

/** Options for the {@link useAuthenticatedQuery} hook. */
export interface AuthenticatedQueryOptions<TData> extends Omit<UseQueryOptions<TData>, 'queryFn'> {
  /** The URL to fetch. */
  url: string;
  /** Optional fetch init options (method, body, etc.). Defaults to GET. */
  fetchOptions?: RequestInit;
  /** The current JWT string, or null if unauthenticated. */
  jwt: string | null;
  /** Function to request a fresh JWT from the shell. */
  requestJWTRefresh: () => void;
  /** Whether the session is still valid. Disables the query when false. */
  isSessionValid: boolean;
}

/**
 * TanStack Query hook with built-in JWT authentication.
 * Uses `useAuthenticatedFetch` for the fetch wrapper and `useQuery` for caching and state management.
 * Accepts JWT and session state as props — pair with `useShellContext` at the call site.
 *
 * @example
 * ```tsx
 * const { jwt, requestJWTRefresh, isSessionValid } = useShellContext();
 * const { data, isLoading } = useAuthenticatedQuery({
 *   queryKey: ['projects'],
 *   url: '/api/projects',
 *   jwt,
 *   requestJWTRefresh,
 *   isSessionValid,
 * });
 * ```
 *
 * @param options - Query options including the URL, JWT, and optional fetch config.
 * @returns The standard TanStack Query result object.
 */
export function useAuthenticatedQuery<TData = unknown>(
  options: AuthenticatedQueryOptions<TData>,
): UseQueryResult<TData> {
  const { url, fetchOptions, jwt, requestJWTRefresh, isSessionValid, ...queryOptions } = options;
  const { authenticatedFetch } = useAuthenticatedFetch(jwt, requestJWTRefresh);

  return useQuery<TData>({
    ...queryOptions,
    enabled: isSessionValid && (queryOptions.enabled ?? true),
    queryFn: async () => {
      const response = await authenticatedFetch(url, fetchOptions);
      if (!response.ok) {
        throw new Error(`Request failed: ${response.status} ${response.statusText}`);
      }
      return response.json() as Promise<TData>;
    },
  });
}
