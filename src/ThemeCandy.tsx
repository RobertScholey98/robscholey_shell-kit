import type { ReactElement, ReactNode } from 'react';
import type { Accent } from './messages';

/** Props for the {@link ThemeCandy} component. */
export interface ThemeCandyProps {
  /** The accent this subtree should render in. */
  variant: Accent;
  /** Subtree receiving the accent override. */
  children: ReactNode;
}

/**
 * Scope-local accent override. Wraps `children` in a `display: contents`
 * element that carries `data-accent={variant}`, so every CSS rule under
 * `[data-accent='X']` in shell-kit's token cascade re-binds for the subtree.
 *
 * This is the subtree-only counterpart to {@link PageTheme}:
 * - Pure CSS cascade — no effects, no postMessage, safe to server-render.
 * - Does NOT mirror to `<html>` — so cross-cutting shell chrome (chat
 *   bubble, messaging surface, anything the shell paints over the iframe)
 *   stays matched to the *page*-level accent rather than whatever section
 *   of the page the user is scrolled through.
 * - Multiple instances nest naturally; the nearest wrapper wins for its
 *   subtree via standard CSS specificity.
 *
 * Use this when a section of a page wants to read in a different accent —
 * e.g. a "warm" callout inside a "betway" project page — without changing
 * the page's identity. For whole-page accent declaration, reach for
 * {@link PageTheme} instead.
 *
 * @example
 * ```tsx
 * <section>
 *   <h2>Mostly betway</h2>
 *   <ThemeCandy variant="warm">
 *     <aside>This aside is warm-tinted, the surrounding page isn't.</aside>
 *   </ThemeCandy>
 * </section>
 * ```
 *
 * @param props - The theme-candy props.
 * @returns A `display: contents` wrapper with the accent applied to its subtree.
 */
export function ThemeCandy({ variant, children }: ThemeCandyProps): ReactElement {
  return (
    <div className="contents" data-accent={variant}>
      {children}
    </div>
  );
}
