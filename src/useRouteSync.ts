import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getConfig } from './config';
import { isInIframe } from './isInIframe';
import type { RouteChangeMessage } from './types';

/**
 * Syncs the child app's current pathname to the shell via postMessage.
 * Requires Next.js (`next/navigation`). Call once in the root layout.
 *
 * @example
 * ```tsx
 * // Next.js root layout
 * function RootLayout({ children }: { children: React.ReactNode }) {
 *   useRouteSync();
 *   return <>{children}</>;
 * }
 * ```
 *
 * @example
 * ```tsx
 * // For react-router, use this pattern instead of useRouteSync:
 * import { useLocation } from 'react-router-dom';
 * import { getConfig } from '@robscholey/shell-kit';
 *
 * function RouteSync() {
 *   const { pathname } = useLocation();
 *   useEffect(() => {
 *     if (window.self !== window.top) {
 *       window.parent.postMessage(
 *         { type: 'route-change', path: pathname },
 *         getConfig().shellOrigin,
 *       );
 *     }
 *   }, [pathname]);
 *   return null;
 * }
 * ```
 */
export function useRouteSync(): void {
  const pathname = usePathname();

  useEffect(() => {
    if (!isInIframe()) return;

    const message: RouteChangeMessage = { type: 'route-change', path: pathname };
    window.parent.postMessage(message, getConfig().shellOrigin);
  }, [pathname]);
}
