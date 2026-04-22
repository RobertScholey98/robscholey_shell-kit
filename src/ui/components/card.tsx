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
 * The footer section of a card. Flat margin-top + flex action row, no extra
 * surface chrome. Aligns with the design's `.card-footer` rule which sits
 * inside the card's existing 24 px gutter.
 */
function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('mt-[18px] flex items-center justify-end gap-2 px-4 pb-4 sm:px-6 sm:pb-6', className)}
      {...props}
    />
  );
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
