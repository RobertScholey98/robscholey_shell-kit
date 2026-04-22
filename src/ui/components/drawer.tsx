import { Drawer as DrawerPrimitive } from 'vaul';
import { cn } from '../lib/cn';

/** A mobile-friendly bottom sheet drawer built on Vaul. */
const Drawer = ({
  shouldScaleBackground = false,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />
);

/** The element that triggers the drawer to open. */
const DrawerTrigger = DrawerPrimitive.Trigger;

/** Portal for rendering drawer content outside the DOM hierarchy. */
const DrawerPortal = DrawerPrimitive.Portal;

/** A button that closes the drawer. */
const DrawerClose = DrawerPrimitive.Close;

/** The overlay behind the drawer. */
function DrawerOverlay({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay className={cn('fixed inset-0 z-50 bg-black/80', className)} {...props} />
  );
}

/** The drawer content panel — slides up from the bottom. */
function DrawerContent({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<typeof DrawerPrimitive.Content>) {
  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        className={cn(
          'fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto max-h-[85dvh] flex-col rounded-t-xl border bg-bg',
          className,
        )}
        {...props}
      >
        <div className="mx-auto mt-4 h-1.5 w-12 rounded-full bg-bg-soft" aria-hidden="true" />
        <div className="overflow-y-auto p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
          {children}
        </div>
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
}

/** The header area of a drawer. */
function DrawerHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props} />;
}

/** The footer area of a drawer. */
function DrawerFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mt-auto flex flex-col gap-2', className)} {...props} />;
}

/** The title of a drawer. */
function DrawerTitle({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      className={cn('text-lg font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  );
}

/** The description text of a drawer. */
function DrawerDescription({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      className={cn('text-sm text-text-muted', className)}
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
