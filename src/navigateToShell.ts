import { isInIframe } from './isInIframe';

/**
 * Sends a navigate-to-shell postMessage to the parent shell.
 * No-op if not running inside an iframe.
 *
 * @param shellOrigin - The shell origin to post the message to. Read from
 *   {@link useShellKitConfig} at the call site and pass through.
 */
export function navigateToShell(shellOrigin: string): void {
  if (!isInIframe()) return;
  window.parent.postMessage({ type: 'navigate-to-shell' }, shellOrigin);
}
