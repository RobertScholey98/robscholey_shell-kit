import { cn } from '../lib/cn';

/** Props for the {@link Textarea} component. */
export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

/** A styled textarea. Uses 16px font to prevent iOS zoom. Focus halo matches {@link Input}. */
function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        'flex min-h-[90px] w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground transition-colors placeholder:text-subtle-foreground focus:outline-none focus:border-ring focus:shadow-[0_0_0_3px_var(--brand-glow)] disabled:cursor-not-allowed disabled:opacity-50 sm:text-[0.92rem]',
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
