import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

/**
 * Button styling ramp aligned with the rs. design-system button scale.
 *
 * - `brand` is the loudest call-to-action: solid `--brand` fill with
 *   `--background` text for max contrast. Hover dims via filter brightness.
 *   Use sparingly (one per view).
 * - `primary` is the default tinted CTA: dark `--primary` fill with bright
 *   `--primary-foreground` text and a `--brand-dim` border that lightens to
 *   `--brand` on hover.
 * - `secondary` is the workhorse bordered button: `--card` surface with an
 *   `--input` border that warms to `--brand-dim` on hover.
 * - `ghost` is borderless and transparent until hover, when it picks up
 *   `--card-2` background and a quiet `--border` outline.
 * - `destructive` stays red for irreversible actions; hover dims via filter.
 *
 * Every variant gets the same hover lift (-1px translate) and focus
 * affordance (3 px `--ring` outline + `--brand-glow` halo), so the
 * interaction language stays consistent as the accent rotates.
 */
const buttonVariants = cva(
  'inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md border text-sm font-medium transition-[color,background-color,border-color,transform,filter,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-px motion-reduce:hover:translate-y-0 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:shadow-[0_0_0_6px_var(--brand-glow)] disabled:pointer-events-none disabled:opacity-50 disabled:hover:translate-y-0 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        brand: 'border-brand bg-brand text-background hover:brightness-[0.92]',
        primary: 'border-brand-dim bg-primary text-primary-foreground hover:border-brand',
        secondary: 'border-input bg-card text-foreground hover:border-brand-dim',
        ghost:
          'border-transparent bg-transparent text-foreground hover:border-border hover:bg-card-2',
        destructive:
          'border-destructive bg-destructive text-destructive-foreground hover:brightness-[0.95]',
      },
      size: {
        // 36 px compact — dense toolbars and inline actions.
        sm: 'h-9 rounded-md px-3 text-xs',
        // 42 px default — the workhorse form-control height.
        default: 'h-[2.625rem] px-4 py-2',
        // 48 px emphasis — hero CTAs and single primary actions.
        lg: 'h-12 rounded-md px-8 text-base',
        // Square icon button — matches the default height for alignment.
        icon: 'h-[2.625rem] w-[2.625rem]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
);

/** Props for the {@link Button} component. */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** When true, renders the child element directly instead of wrapping in a `<button>`. */
  asChild?: boolean;
}

/**
 * A button component with five visual variants and four sizes.
 * Variant scale: `brand` · `primary` (default) · `secondary` · `ghost` · `destructive`.
 */
function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
