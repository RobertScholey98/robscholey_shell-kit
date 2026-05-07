import { useRef, useCallback, useEffect } from 'react';
import { waitForJwtChange } from './util/waitForJwtChange';

/**
 * Returns a fetch wrapper that attaches the current JWT as an Authorization header.
 * On 401 responses, requests a JWT refresh from the shell and retries the request once.
 *
 * @param jwt - The current JWT string, or null if unauthenticated.
 * @param requestJWTRefresh - Function to request a fresh JWT from the shell.
 * @returns An object containing `authenticatedFetch`, a drop-in replacement for `fetch`.
 */
export function useAuthenticatedFetch(
  jwt: string | null,
  requestJWTRefresh: () => void,
): { authenticatedFetch: typeof fetch } {
  const jwtRef = useRef(jwt);
  const cancelledRef = useRef(false);

  useEffect(() => {
    jwtRef.current = jwt;
  }, [jwt]);

  useEffect(() => {
    cancelledRef.current = false;
    return () => {
      cancelledRef.current = true;
    };
  }, []);

  const authenticatedFetch = useCallback(
    async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
      const headers = new Headers(init?.headers);
      if (jwtRef.current) {
        headers.set('Authorization', `Bearer ${jwtRef.current}`);
      }

      const response = await fetch(input, { ...init, headers });

      if (response.status === 401 && jwtRef.current) {
        const previousJwt = jwtRef.current;
        requestJWTRefresh();

        const newJwt = await waitForJwtChange(previousJwt, {
          getter: () => jwtRef.current,
          cancelled: () => cancelledRef.current,
        });
        if (newJwt && newJwt !== previousJwt && !cancelledRef.current) {
          const retryHeaders = new Headers(init?.headers);
          retryHeaders.set('Authorization', `Bearer ${newJwt}`);
          return fetch(input, { ...init, headers: retryHeaders });
        }
      }

      return response;
    },
    [requestJWTRefresh],
  );

  return { authenticatedFetch };
}
