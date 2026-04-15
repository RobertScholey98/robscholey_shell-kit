import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';

const DEFAULT_QUERY_CLIENT = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

/** Props for the {@link ShellQueryProvider} component. */
export interface ShellQueryProviderProps {
  /** Child components that can use TanStack Query hooks. */
  children: ReactNode;
  /** Optional custom QueryClient. Defaults to a pre-configured instance. */
  queryClient?: QueryClient;
}

/**
 * Pre-configured TanStack Query provider for shell-kit sub-apps.
 * Wraps `QueryClientProvider` with sensible defaults (5 min stale time, 1 retry).
 * Sub-apps can override with their own `queryClient` prop.
 *
 * @example
 * ```tsx
 * function App() {
 *   return (
 *     <ShellQueryProvider>
 *       <MyComponent />
 *     </ShellQueryProvider>
 *   );
 * }
 * ```
 */
export function ShellQueryProvider({
  children,
  queryClient = DEFAULT_QUERY_CLIENT,
}: ShellQueryProviderProps) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
