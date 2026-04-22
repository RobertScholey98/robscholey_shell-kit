import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

/** Dot styling — colour driven by the pill's status. */
const dotVariants = cva('h-1.5 w-1.5 rounded-full animate-pulse', {
  variants: {
    status: {
      default: 'bg-accent',
      active: 'bg-accent',
      paused: 'bg-warm',
    },
  },
  defaultVariants: {
    status: 'default',
  },
});

/** Props for the {@link SessionPill} component. */
export interface SessionPillProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof dotVariants> {}

/**
 * A rounded mono-font pill used to surface a session / accent / mode indicator
 * in the site header. Renders an animated coloured dot followed by the
 * children as free-form label content.
 *
 * @example
 * ```tsx
 * <SessionPill>
 *   <span>teal / dark</span>
 * </SessionPill>
 *
 * <SessionPill status="paused">
 *   <span>draft</span>
 * </SessionPill>
 * ```
 */
function SessionPill({ className, status, children, ...props }: SessionPillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-3 py-1 bg-surface-2 border border-border font-mono text-[0.72rem] uppercase tracking-[0.1em] text-text-dim whitespace-nowrap',
        className,
      )}
      {...props}
    >
      <span data-status={status ?? 'default'} className={cn(dotVariants({ status }))} aria-hidden />
      {children}
    </span>
  );
}

export { SessionPill };
