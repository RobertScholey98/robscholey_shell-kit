'use client';

import { useContext, useLayoutEffect, useRef, type ReactElement, type ReactNode } from 'react';
import { isInIframe } from './isInIframe';
import { PROTOCOL_VERSION } from './messages';
import type { Accent, ShellTheme } from './messages';
import { ShellKitContext } from './ShellKitProvider';

/** Props for the {@link PageTheme} component. */
export interface PageThemeProps {
  /** Override accent for this page. Omit to inherit the layout-level default. */
  variant?: Accent;
  /** Override theme for this page. Omit to inherit the layout-level default. */
  theme?: ShellTheme;
  /** Subtree rendered in the overridden theme + accent. */
  children: ReactNode;
}

/**
 * Page-level theme + accent override. Wraps a route's content and:
 *
 * 1. Renders a `display: contents` wrapper carrying `data-accent` /
 *    `data-theme` so the subtree's CSS cascade resolves immediately
 *    without waiting for an effect.
 * 2. On mount (and on every prop change), mirrors the overrides onto
 *    `<html>` via `useLayoutEffect` — synchronous before paint, so
 *    anything portal'd outside the subtree (modals, toasts) and anything
 *    that reads the root dataset picks up the new values on the same
 *    frame as the route transition.
 * 3. Sends a one-way `page-theme` message to the shell (parent window) so
 *    cross-cutting shell chrome — chat bubble, messaging surfaces, any
 *    future chrome the shell paints over the iframe — can re-theme to
 *    match the active page.
 * 4. On unmount or prop clear, restores the previous `<html>` value.
 *    Symmetrical to mount, so removing the wrapper (route unmount, modal
 *    close) doesn't strand a stale override.
 *
 * Per-element flair (a warm callout inside a betway page) should use
 * {@link ThemeCandy} instead — that stays scope-local and doesn't change
 * cross-cutting chrome.
 *
 * A layout that does NOT wrap its tree in `<PageTheme>` inherits the
 * admin-configured default rendered into `<html>` by the layout's SSR
 * fetch. Opt in only when a specific route needs to override.
 *
 * @example
 * ```tsx
 * // portfolio/src/app/projects/betway/page.tsx
 * export default function BetwayPage() {
 *   return (
 *     <PageTheme variant="betway">
 *       <ProjectHeader ... />
 *       <ProjectBody ... />
 *     </PageTheme>
 *   );
 * }
 * ```
 *
 * @param props - The page-theme props.
 * @returns A `display: contents` wrapper with side-effects on mount.
 */
export function PageTheme({ variant, theme, children }: PageThemeProps): ReactElement {
  // Read the shell origin from the nearest ShellKitProvider when present,
  // but don't require one — consumer tests and pre-provider usage should
  // still work. The postMessage is a no-op outside an iframe anyway, so
  // the origin only matters when we actually have a shell to talk to.
  const ctx = useContext(ShellKitContext);
  const shellOrigin = ctx?.config.shellOrigin;
  const snapshotRef = useRef<{ accent: string | undefined; theme: string | undefined }>({
    accent: undefined,
    theme: undefined,
  });

  useLayoutEffect(() => {
    // No overrides declared — nothing to mirror, nothing to post. The
    // wrapper is still rendered for tree-identity symmetry but is
    // otherwise inert.
    if (variant === undefined && theme === undefined) return;

    const html = document.documentElement;
    snapshotRef.current = {
      accent: html.dataset.accent,
      theme: html.dataset.theme,
    };
    if (variant !== undefined) html.dataset.accent = variant;
    if (theme !== undefined) html.dataset.theme = theme;

    if (isInIframe() && shellOrigin !== undefined) {
      window.parent.postMessage(
        {
          type: 'page-theme',
          protocolVersion: PROTOCOL_VERSION,
          theme: theme ?? null,
          accent: variant ?? null,
        },
        shellOrigin,
      );
    }

    return () => {
      // Restore exactly what was on <html> before we touched it —
      // symmetrical unmount so a nested <PageTheme> that wraps back to
      // "no override" doesn't leave the inner value stuck on the root.
      if (variant !== undefined) {
        if (snapshotRef.current.accent !== undefined) {
          html.dataset.accent = snapshotRef.current.accent;
        } else {
          delete html.dataset.accent;
        }
      }
      if (theme !== undefined) {
        if (snapshotRef.current.theme !== undefined) {
          html.dataset.theme = snapshotRef.current.theme;
        } else {
          delete html.dataset.theme;
        }
      }
    };
  }, [variant, theme, shellOrigin]);

  return (
    <div
      className="contents"
      {...(variant !== undefined ? { 'data-accent': variant } : {})}
      {...(theme !== undefined ? { 'data-theme': theme } : {})}
    >
      {children}
    </div>
  );
}
