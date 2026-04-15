import { useState, useEffect, useCallback } from 'react';
import { getConfig } from './config';
import { isInIframe } from './isInIframe';
import type { ShellUser, ShellToChildMessage } from './types';

/** The state returned by the {@link useShellContext} hook. */
export interface ShellContextState {
  /** Whether the app is running inside the shell iframe. */
  isEmbedded: boolean;
  /** Whether the shell wants the child to show a back button. */
  showBackButton: boolean;
  /** The current authenticated user, or null. */
  user: ShellUser | null;
  /** The current JWT, or null if unauthenticated. */
  jwt: string | null;
  /** Whether the session is still valid (becomes false on session-ended). */
  isSessionValid: boolean;
  /** The sub-path the shell wants the child to navigate to on mount. */
  subPath: string | null;
  /** Sends a request-jwt-refresh message to the shell. */
  requestJWTRefresh: () => void;
}

/** Callback invoked when the shell tells the child to navigate to a specific path. */
export type NavigateToPathHandler = (path: string) => void;

/** Type guard for messages from the shell. */
function isShellMessage(data: unknown): data is ShellToChildMessage {
  return (
    typeof data === 'object' &&
    data !== null &&
    'type' in data &&
    typeof (data as Record<string, unknown>).type === 'string'
  );
}

/**
 * Hook that manages communication with the robscholey.com shell via postMessage.
 * Listens for `shell-context`, `jwt-refresh`, `session-ended`, and `navigate-to-path` messages.
 * Sends `request-shell-context` on mount when running inside an iframe.
 * Validates message origins against the configured shell origin.
 *
 * @param onNavigateToPath - Optional callback invoked when the shell sends a `navigate-to-path` message (browser back/forward).
 */
export function useShellContext(onNavigateToPath?: NavigateToPathHandler): ShellContextState {
  const [isEmbedded, setIsEmbedded] = useState(false);
  const [showBackButton, setShowBackButton] = useState(false);
  const [user, setUser] = useState<ShellUser | null>(null);
  const [jwt, setJwt] = useState<string | null>(null);
  const [isSessionValid, setIsSessionValid] = useState(true);
  const [subPath, setSubPath] = useState<string | null>(null);

  useEffect(() => {
    const inIframe = isInIframe();

    function handleMessage(event: MessageEvent) {
      if (event.origin !== getConfig().shellOrigin) return;
      if (!isShellMessage(event.data)) return;

      const data = event.data;

      if (data.type === 'shell-context') {
        setIsEmbedded(true);
        setShowBackButton(data.showBackButton ?? false);
        setUser(data.user ?? null);
        setJwt(data.jwt ?? null);
        setIsSessionValid(true);
        setSubPath(data.subPath ?? null);
      }

      if (data.type === 'jwt-refresh') {
        setJwt(data.jwt);
      }

      if (data.type === 'session-ended') {
        setIsSessionValid(false);
        setJwt(null);
        setUser(null);
      }

      if (data.type === 'navigate-to-path') {
        onNavigateToPath?.(data.path);
      }
    }

    window.addEventListener('message', handleMessage);

    if (inIframe) {
      window.parent.postMessage({ type: 'request-shell-context' }, getConfig().shellOrigin);
    }

    return () => window.removeEventListener('message', handleMessage);
  }, [onNavigateToPath]);

  const requestJWTRefresh = useCallback(() => {
    if (isInIframe()) {
      window.parent.postMessage({ type: 'request-jwt-refresh' }, getConfig().shellOrigin);
    }
  }, []);

  return {
    isEmbedded,
    showBackButton,
    user,
    jwt,
    isSessionValid,
    subPath,
    requestJWTRefresh,
  };
}
