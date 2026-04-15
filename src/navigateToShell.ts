import { getConfig } from './config';
import { isInIframe } from './isInIframe';

/**
 * Sends a navigate-to-shell postMessage to the parent shell.
 * No-op if not running inside an iframe.
 */
export function navigateToShell(): void {
  if (!isInIframe()) return;
  window.parent.postMessage({ type: 'navigate-to-shell' }, getConfig().shellOrigin);
}
