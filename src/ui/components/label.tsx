import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

/**
 * Two label patterns the design uses:
 *
 * - `inline` — sans, 0.92rem, default colour. Wraps a checkbox/radio/switch
 *   so the row reads as a single label-control unit. Default.
 * - `mono` — JetBrains Mono, 0.72rem, uppercase, 0.1em tracking,
 *   `--text-muted`. The dominant form-field-label treatment in the design
 *   (`design-system.css` `.field label`).
 */
const labelVariants = cva(
  'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  {
    variants: {
      variant: {
        inline: 'text-[0.92rem]',
        mono: 'font-mono text-[0.72rem] uppercase tracking-[0.1em] text-text-muted',
      },
    },
    defaultVariants: { variant: 'inline' },
  },
);

/** Props for the {@link Label} component. */
export interface LabelProps
  extends React.ComponentPropsWithRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {}

/** A styled label built on Radix Label. Defaults to the inline checkbox/radio look. */
function Label({ className, variant, ...props }: LabelProps) {
  return <LabelPrimitive.Root className={cn(labelVariants({ variant }), className)} {...props} />;
}

export { Label, labelVariants };
