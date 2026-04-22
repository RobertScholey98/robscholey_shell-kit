import { cn } from '../lib/cn';

/** Props for the {@link Input} component. */
export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

/**
 * A styled text input. Uses 16px font to prevent iOS zoom. Focus ring is a
 * 3 px `--ring` plus a soft `--brand-glow` halo, shared with textarea and
 * select triggers.
 */
function Input({ className, type, ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        'flex min-h-[44px] w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground transition-colors placeholder:text-subtle-foreground file:border-0 file:bg-transparent file:text-base file:font-medium file:text-foreground focus:outline-none focus:border-ring focus:shadow-[0_0_0_3px_var(--brand-glow)] disabled:cursor-not-allowed disabled:opacity-50 sm:text-[0.92rem]',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
