import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAuthenticatedFetch } from '@/useAuthenticatedFetch';

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('useAuthenticatedFetch', () => {
  it('attaches JWT as Authorization header', async () => {
    const mockFetch = vi.fn().mockResolvedValue(new Response('ok', { status: 200 }));
    vi.stubGlobal('fetch', mockFetch);

    const { result } = renderHook(() => useAuthenticatedFetch('test-jwt', vi.fn()));

    await act(async () => {
      await result.current.authenticatedFetch('/api/data');
    });

    const headers = mockFetch.mock.calls[0][1].headers;
    expect(headers.get('Authorization')).toBe('Bearer test-jwt');
  });

  it('does not set Authorization when jwt is null', async () => {
    const mockFetch = vi.fn().mockResolvedValue(new Response('ok', { status: 200 }));
    vi.stubGlobal('fetch', mockFetch);

    const { result } = renderHook(() => useAuthenticatedFetch(null, vi.fn()));

    await act(async () => {
      await result.current.authenticatedFetch('/api/data');
    });

    const headers = mockFetch.mock.calls[0][1].headers;
    expect(headers.has('Authorization')).toBe(false);
  });

  it('requests JWT refresh and retries on 401', async () => {
    const requestRefresh = vi.fn();
    let callCount = 0;
    const mockFetch = vi.fn().mockImplementation(() => {
      callCount++;
      if (callCount === 1) {
        return Promise.resolve(new Response('Unauthorized', { status: 401 }));
      }
      return Promise.resolve(new Response('ok', { status: 200 }));
    });
    vi.stubGlobal('fetch', mockFetch);

    const { result, rerender } = renderHook(
      ({ jwt }) => useAuthenticatedFetch(jwt, requestRefresh),
      { initialProps: { jwt: 'old-jwt' } },
    );

    // Start the fetch — it will get 401, call requestRefresh, and start polling jwtRef
    let responsePromise: Promise<Response>;
    act(() => {
      responsePromise = result.current.authenticatedFetch('/api/data');
    });

    // Simulate the JWT refresh arriving (shell sends jwt-refresh, parent re-renders with new jwt)
    await act(async () => {
      rerender({ jwt: 'new-jwt' });
    });

    const response = await act(() => responsePromise);

    expect(requestRefresh).toHaveBeenCalled();
    expect(mockFetch).toHaveBeenCalledTimes(2);
    expect(response!.status).toBe(200);
  });

  it('returns 401 if JWT does not refresh within timeout', async () => {
    const mockFetch = vi.fn().mockResolvedValue(new Response('Unauthorized', { status: 401 }));
    vi.stubGlobal('fetch', mockFetch);

    const { result } = renderHook(() => useAuthenticatedFetch('stale-jwt', vi.fn()));

    let response: Response | undefined;
    await act(async () => {
      response = await result.current.authenticatedFetch('/api/data');
    });

    // JWT didn't change, so original 401 is returned
    expect(response!.status).toBe(401);
  });
});
