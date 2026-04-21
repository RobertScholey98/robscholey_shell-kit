import type { HTMLAttributes, ReactElement } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

/** Status variants surfaced by the shell's app selector. */
export type StatusVariant = 'live' | 'dev' | 'soon' | 'paused';

/**
 * Dot styling — 8 px circle, halo per variant.
 *
 * `live` and `dev` carry a soft ring around the dot (the "pulse target"
 * silhouette). `soon` and `paused` are dim tokens with no halo — intentional,
 * they're visual cues that the target isn't launchable.
 *
 * The warm halo on `dev` uses `color-mix` against the warm token rather than
 * the usual `--brand-glow`, because `--brand-glow` already follows the active
 * accent and `dev` should read "in-progress" regardless of which accent the
 * parent card is using.
 */
const statusDotVariants = cva('inline-block h-2 w-2 rounded-full shrink-0', {
  variants: {
    status: {
      live: 'bg-brand shadow-[0_0_0_3px_var(--brand-glow)]',
      dev: 'bg-warm shadow-[0_0_0_3px_color-mix(in_srgb,var(--warm)_25%,transparent)]',
      soon: 'bg-subtle-foreground',
      paused: 'bg-warm-dim',
    },
  },
  defaultVariants: {
    status: 'live',
  },
});

/** Props for the {@link StatusDot} component. */
export interface StatusDotProps
  extends HTMLAttributes<HTMLSpanElement>,
    Omit<VariantProps<typeof statusDotVariants>, 'status'> {
  /** Semantic status for the dot. Defaults to `'live'`. */
  status?: StatusVariant;
}

/**
 * Small coloured dot used in app-card heads and similar status cues. Reads
 * colour + halo from the {@link StatusVariant}. Purely decorative — if the
 * status needs to be announced, give the enclosing element an `aria-label`
 * or `title` rather than the dot itself.
 *
 * @example
 * ```tsx
 * <StatusDot status="live" aria-hidden />
 * <StatusDot status="soon" />
 * ```
 *
 * @param props - The status-dot props.
 * @returns A `<span>` coloured per status with a 3 px halo where applicable.
 */
function StatusDot({ className, status = 'live', ...props }: StatusDotProps): ReactElement {
  return (
    <span
      data-status={status}
      className={cn(statusDotVariants({ status }), className)}
      {...props}
    />
  );
}

export { StatusDot, statusDotVariants };
