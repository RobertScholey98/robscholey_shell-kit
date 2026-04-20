import { cn } from '../lib/cn';

/** A card container with rounded corners, card surface, and token-driven border. */
function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-lg border border-border bg-card text-foreground shadow-sm',
        className,
      )}
      {...props}
    />
  );
}

/** The header section of a card. Tighter padding on mobile. */
function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col space-y-1.5 p-4 sm:p-6', className)} {...props} />;
}

/** The title within a card header. */
function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('font-semibold leading-none tracking-tight', className)} {...props} />;
}

/** The description within a card header. */
function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('text-sm text-muted-foreground', className)} {...props} />;
}

/** The main content area of a card. */
function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-4 pt-0 sm:p-6 sm:pt-0', className)} {...props} />;
}

/**
 * The footer section of a card. Sits on the mid-surface `--card-2` tier to
 * visually separate actions from the body content.
 */
function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-b-lg border-t border-border bg-card-2 p-4 sm:p-6',
        className,
      )}
      {...props}
    />
  );
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
