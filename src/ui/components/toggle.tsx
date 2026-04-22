import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

// Active state mirrors the design's `.tabs-list button.active` /
// `.mode-seg button.active`: neutral `--surface-2` lift with an inset 1 px
// `--border` ring — NOT an accent tint. The mechanical H.2 sweep landed
// `bg-accent-deep` here because pre-rebrand shell-kit's `bg-accent` aliased
// to the brand-deep tint; the design wants neutral so it's re-pointed.
const toggleVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-[5px] text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-surface-2 data-[state=on]:text-text data-[state=on]:shadow-[inset_0_0_0_1px_var(--border)] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-transparent text-text-muted',
        outline:
          'border border-input bg-transparent text-text-muted shadow-sm',
      },
      size: {
        default: 'h-9 px-3.5 min-w-9',
        sm: 'h-8 px-2.5 min-w-8',
        lg: 'h-10 px-4 min-w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

/** A toggle button component. */
function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentPropsWithRef<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root className={cn(toggleVariants({ variant, size, className }))} {...props} />
  );
}

export { Toggle, toggleVariants };
