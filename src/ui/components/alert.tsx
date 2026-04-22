import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

/**
 * Alert container styling — a `--card` surface with a 3 px tinted left border.
 * The tint drives off the variant and is re-used by the companion `AlertIcon`.
 */
const alertVariants = cva(
  'relative flex w-full items-start gap-[14px] rounded-md border border-border border-l-[3px] bg-card px-[18px] py-[14px] text-sm',
  {
    variants: {
      variant: {
        default: 'border-l-brand',
        warm: 'border-l-warm',
        destructive: 'border-l-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const alertIconVariants = cva(
  'mt-[2px] inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-[1.5px] font-mono text-[0.72rem]',
  {
    variants: {
      variant: {
        default: 'border-brand text-brand',
        warm: 'border-warm text-warm',
        destructive: 'border-destructive text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

/** Props for the {@link Alert} container. */
export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

/** A styled alert container. Use with {@link AlertIcon}, {@link AlertTitle}, {@link AlertDescription}. */
function Alert({ className, variant, ...props }: AlertProps) {
  return <div role="alert" className={cn(alertVariants({ variant }), className)} {...props} />;
}

/** Props for the {@link AlertIcon} slot. */
export interface AlertIconProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof alertIconVariants> {}

/**
 * The circular icon slot on the left of an alert. Defaults to the brand
 * colour; pass `variant="warm"` or `variant="destructive"` to match the
 * parent `Alert` tint.
 */
function AlertIcon({ className, variant, children, ...props }: AlertIconProps) {
  return (
    <span className={cn(alertIconVariants({ variant }), className)} aria-hidden {...props}>
      {children}
    </span>
  );
}

/** The bold title line of an alert. */
function AlertTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <div className={cn('text-[0.92rem] font-semibold leading-tight mb-0.5', className)} {...props} />
  );
}

/** The muted description body of an alert. */
function AlertDescription({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('text-[0.88rem] text-muted-foreground [&_p]:leading-relaxed', className)} {...props} />
  );
}

export { Alert, AlertIcon, AlertTitle, AlertDescription, alertVariants };
