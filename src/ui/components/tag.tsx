import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

/**
 * Tag styling — a monospace chip used for tech labels on project cards.
 *
 * Default is a neutral outlined pill on `--surface-2`. `accent` tints the text
 * and border in `--accent`; `warm` tints in `--warm` for secondary callouts.
 */
const tagVariants = cva(
  'inline-flex items-center rounded font-mono text-[0.72rem] uppercase tracking-[0.14em] px-2 py-0.5 whitespace-nowrap border',
  {
    variants: {
      variant: {
        default: 'bg-surface-2 text-text-muted border-border',
        accent: 'bg-transparent text-accent border-accent-dim',
        warm: 'bg-transparent text-warm border-warm-dim',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

/** Props for the {@link Tag} component. */
export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {}

/**
 * A small monospace tech-label chip. Renders as a `<span>`.
 *
 * @example
 * ```tsx
 * <Tag>ts</Tag>
 * <Tag variant="accent">react</Tag>
 * <Tag variant="warm">wip</Tag>
 * ```
 */
function Tag({ className, variant, ...props }: TagProps) {
  return <span className={cn(tagVariants({ variant }), className)} {...props} />;
}

export { Tag, tagVariants };
