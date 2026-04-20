import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cn } from '../lib/cn';

/**
 * A circular avatar container. Defaults to the tinted `--primary` surface
 * with a `--brand-dim` outline — matching the mono-font initial-cap treatment
 * from the reference design.
 */
function Avatar({ className, ...props }: React.ComponentPropsWithRef<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      className={cn(
        'relative inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-brand-dim bg-primary text-primary-foreground font-mono text-[0.82rem] font-medium',
        className,
      )}
      {...props}
    />
  );
}

/** The image displayed within an avatar. */
function AvatarImage({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image className={cn('aspect-square h-full w-full', className)} {...props} />
  );
}

/** Fallback content shown when the avatar image fails to load. */
function AvatarFallback({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      className={cn(
        'flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-foreground',
        className,
      )}
      {...props}
    />
  );
}

/**
 * Props for {@link AvatarGroup}. Siblings after the first receive a small
 * negative margin to overlap, and a ring in `--background` to punch them
 * apart visually.
 */
export type AvatarGroupProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * A horizontal cluster of overlapping avatars.
 *
 * @example
 * ```tsx
 * <AvatarGroup>
 *   <Avatar>RS</Avatar>
 *   <Avatar>AI</Avatar>
 *   <Avatar>+2</Avatar>
 * </AvatarGroup>
 * ```
 */
function AvatarGroup({ className, ...props }: AvatarGroupProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center [&>*+*]:-ml-2 [&>*+*]:ring-2 [&>*+*]:ring-background',
        className,
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup };
