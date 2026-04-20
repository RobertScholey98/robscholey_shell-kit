import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '../lib/cn';

const Tabs = TabsPrimitive.Root;

/**
 * The horizontal list of tab triggers — a segmented control sitting on the
 * `--card-2` mid-surface with a thin border. Triggers raise to `--background`
 * when active.
 */
function TabsList({ className, ...props }: React.ComponentPropsWithRef<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn(
        'inline-flex items-center justify-center rounded-md border border-border bg-card-2 p-0.5 text-muted-foreground',
        className,
      )}
      {...props}
    />
  );
}

/** A single tab trigger button. Inactive sits on card-2; active raises to background. */
function TabsTrigger({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-[inset_0_0_0_1px_var(--border)]',
        className,
      )}
      {...props}
    />
  );
}

/** The content panel for a specific tab. */
function TabsContent({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      className={cn(
        'mt-3 rounded-md border border-border bg-card p-4 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className,
      )}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
