import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

/**
 * Badge ramp aligned with the rs. design-system `.badge` styles.
 *
 * - `default` is the neutral pill (card-2 surface, muted text) — used for
 *   passive status labels.
 * - `solid` / `subtle` / `outline` are the brand-tinted variants.
 * - `warm` is the single secondary hue used for "heads up" states.
 * - `destructive` keeps the red transparent pill.
 */
const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border px-[10px] py-[3px] font-mono text-[0.72rem] uppercase tracking-[0.1em] transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-border bg-card text-muted-foreground',
        solid: 'border-brand bg-brand text-background',
        subtle: 'border-brand-dim bg-primary text-primary-foreground',
        outline: 'border-brand-dim bg-transparent text-brand',
        warm: 'border-warm-dim bg-transparent text-warm',
        destructive: 'border-destructive bg-transparent text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

/** Props for the {@link Badge} component. */
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

/** A small status indicator badge. */
function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
