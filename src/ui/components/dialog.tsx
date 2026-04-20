import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '../lib/cn';

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

/** A full-screen overlay behind the dialog. */
function DialogOverlay({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      className={cn('fixed inset-0 z-50 bg-black/80', className)}
      {...props}
    />
  );
}

/**
 * The dialog content panel.
 * On mobile: anchored to bottom as a sheet, full width, scrollable.
 * On desktop: centred modal with max-width.
 *
 * The body is padding-less — {@link DialogHeader}, body content, and
 * {@link DialogFooter} own their own padding so the footer can sit flush
 * against the edges on the `--card-2` surface.
 */
function DialogContent({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<typeof DialogPrimitive.Content>) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        className={cn(
          'fixed inset-x-0 bottom-0 z-50 grid w-full gap-0 border-t border-border bg-background shadow',
          'rounded-t-xl overflow-hidden max-h-[85vh]',
          'sm:inset-auto sm:left-[50%] sm:top-[50%] sm:max-w-lg sm:translate-x-[-50%] sm:translate-y-[-50%] sm:rounded-lg sm:border',
          className,
        )}
        {...props}
      >
        <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-card-2 sm:hidden" />
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring">
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

/** The header area of a dialog. */
function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex flex-col space-y-1.5 px-6 pt-6 pb-3 text-center sm:text-left',
        className,
      )}
      {...props}
    />
  );
}

/**
 * The footer area of a dialog. Stacks vertically on mobile, horizontal on
 * desktop. Rests on `--card-2` with a top border to visually separate
 * actions from the body.
 */
function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex flex-col gap-2 border-t border-border bg-card-2 px-6 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:flex-row sm:justify-end sm:gap-0 sm:space-x-2 sm:pb-4',
        className,
      )}
      {...props}
    />
  );
}

/** The body content area of a dialog. Sits between header and footer with its own padding. */
function DialogBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('px-6 py-3 overflow-y-auto text-sm text-foreground', className)}
      {...props}
    />
  );
}

/** The title of a dialog. */
function DialogTitle({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={cn('text-lg font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  );
}

/** The description text of a dialog. */
function DialogDescription({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
