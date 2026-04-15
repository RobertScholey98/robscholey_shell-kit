/**
 * Checks whether the current window is running inside an iframe.
 * Handles cross-origin iframes where accessing `window.top` may throw.
 * @returns `true` if inside an iframe, `false` if at the top level.
 */
export function isInIframe(): boolean {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
}
