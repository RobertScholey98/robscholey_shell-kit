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
 * - 3 columns at ≥ 960 px (the design's canonical app-grid breakpoint) —
 *   at which point any child carrying `[data-size="featured"]` spans two
 *   columns so the hero card sits across the top of the grid.
 *
 * Gap scales with the breakpoint: 14 px mobile, 16 px sm-and-up.
 *
 * Renders a `<section>` so the surrounding copy stays semantically tidy.
 *
 * The 3-column breakpoint uses an arbitrary `min-[960px]:` selector rather
 * than `lg:` because Tailwind v4's default `lg` is 1024 px and the design's
 * `.app-grid { @media (min-width: 960px) }` uses 960 px. Bumping the
 * project-wide `lg` token would affect every consumer; scoping the override
 * to this component keeps the change local.
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
        'min-[960px]:grid-cols-3 min-[960px]:*:data-[size="featured"]:col-span-2',
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}

export { AppGrid };
