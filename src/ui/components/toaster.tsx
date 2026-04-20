'use client';

import { Toaster as SonnerToaster, type ToasterProps } from 'sonner';

/**
 * A pre-styled wrapper around sonner's `<Toaster>`.
 *
 * Applies the rs. design-system palette via `toastOptions.classNames` so
 * toasts sit on `--card` with a `--border` outline and gain a 4 px left-border
 * tint for success (brand), warning (warm), error (destructive), and info
 * (brand) variants. Theme resolves from the `data-theme` attribute managed by
 * `ShellKitProvider`.
 *
 * Consumers import this instead of sonner's `<Toaster>` directly so the
 * styling stays consistent across apps.
 *
 * @example
 * ```tsx
 * import { Toaster, toast } from '@robscholey/shell-kit/ui';
 *
 * <Toaster />
 * toast.success('Saved.');
 * ```
 */
export function Toaster(props: ToasterProps) {
  return (
    <SonnerToaster
      theme="system"
      toastOptions={{
        classNames: {
          toast: 'bg-card border-border text-foreground shadow',
          title: 'font-medium',
          description: 'text-muted-foreground',
          actionButton: 'bg-brand text-primary-foreground',
          cancelButton: 'bg-card-2 text-foreground',
          closeButton: 'bg-card-2 border-border',
          success: 'border-l-4 border-l-brand',
          error: 'border-l-4 border-l-destructive',
          warning: 'border-l-4 border-l-warm',
          info: 'border-l-4 border-l-brand',
        },
      }}
      {...props}
    />
  );
}

export type { ToasterProps };
