import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from '../lib/cn';

/** A progress bar. Track on `--surface-2`, indicator on `--accent`. */
function Progress({
  className,
  value,
  ...props
}: React.ComponentPropsWithRef<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      className={cn('relative h-1.5 w-full overflow-hidden rounded-full bg-surface-2', className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 bg-accent transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
