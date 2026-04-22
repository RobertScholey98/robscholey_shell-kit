import { cn } from '../lib/cn';

/** A pulsing placeholder skeleton for loading states. */
function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-md bg-accent-deep/10', className)} {...props} />;
}

export { Skeleton };
