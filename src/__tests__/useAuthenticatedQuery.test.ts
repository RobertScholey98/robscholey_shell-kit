import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createElement } from 'react';
import type { ReactNode } from 'react';
import { useAuthenticatedQuery } from '@/useAuthenticatedQuery';

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return function Wrapper({ children }: { children: ReactNode }) {
    return createElement(QueryClientProvider, { client: queryClient }, children);
  };
}

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('useAuthenticatedQuery', () => {
  it('fetches data with JWT auth and returns it', async () => {
    const mockData = { items: [1, 2, 3] };
    const mockFetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(mockData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    vi.stubGlobal('fetch', mockFetch);

    const { result } = renderHook(
      () =>
        useAuthenticatedQuery({
          queryKey: ['test'],
          url: '/api/test',
          jwt: 'test-jwt',
          requestJWTRefresh: vi.fn(),
          isSessionValid: true,
        }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockData);
    const headers = mockFetch.mock.calls[0][1].headers;
    expect(headers.get('Authorization')).toBe('Bearer test-jwt');
  });

  it('disables query when session is invalid', () => {
    const mockFetch = vi.fn();
    vi.stubGlobal('fetch', mockFetch);

    const { result } = renderHook(
      () =>
        useAuthenticatedQuery({
          queryKey: ['test'],
          url: '/api/test',
          jwt: null,
          requestJWTRefresh: vi.fn(),
          isSessionValid: false,
        }),
      { wrapper: createWrapper() },
    );

    expect(result.current.fetchStatus).toBe('idle');
    expect(mockFetch).not.toHaveBeenCalled();
  });
});
