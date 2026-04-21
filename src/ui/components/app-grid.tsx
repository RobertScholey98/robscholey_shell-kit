import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { cn } from '../lib/cn';

/** Props for the {@link AppGrid} container. */
export interface AppGridProps extends HTMLAttributes<HTMLElement> {
  /** `<AppCard>` children — or anything that lays out into grid cells. */
  children: ReactNode;
}

/**
 * A responsive grid container for app-launcher tiles. Layout:
 *
 * - 1 column on mobile (default).
 * - 2 columns at `sm:` (≥ 640 px).
 * - 3 columns at `lg:` (≥ 960 px in this codebase's breakpoints) — at which
 *   point any child carrying `[data-size="featured"]` spans two columns so
 *   the hero card sits across the top of the grid.
 *
 * Gap scales with the breakpoint: 14 px mobile, 16 px sm-and-up.
 *
 * Renders a `<section>` so the surrounding copy stays semantically tidy.
 *
 * @example
 * ```tsx
 * <AppGrid aria-label="Available apps">
 *   <AppCard featured accent="teal" title="Portfolio" description="…" />
 *   <AppCard accent="fsgb" title="Admin" description="…" />
 *   <AppCard accent="mono" title="Template" description="…" />
 * </AppGrid>
 * ```
 *
 * @param props - The app-grid props.
 * @returns A grid `<section>` that lays children out across 1-3 columns.
 */
function AppGrid({ className, children, ...props }: AppGridProps): ReactElement {
  return (
    <section
      className={cn(
        'grid grid-cols-1 gap-3.5',
        'sm:grid-cols-2 sm:gap-4',
        'lg:grid-cols-3 lg:[&>[data-size="featured"]]:col-span-2',
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}

export { AppGrid };
