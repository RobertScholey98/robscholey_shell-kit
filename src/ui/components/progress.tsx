import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from '../lib/cn';

/** A progress bar. Track on `--card-2`, indicator on `--brand`. */
function Progress({
  className,
  value,
  ...props
}: React.ComponentPropsWithRef<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      className={cn('relative h-1.5 w-full overflow-hidden rounded-full bg-card-2', className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 bg-brand transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
