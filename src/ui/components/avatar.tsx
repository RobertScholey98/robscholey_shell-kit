import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cn } from '../lib/cn';

/** Presence variants surfaced as a small dot overlay on {@link Avatar}. */
export type AvatarPresence = 'live' | 'idle' | 'off';

/** Props accepted by {@link Avatar}. */
export type AvatarProps = React.ComponentPropsWithRef<typeof AvatarPrimitive.Root> & {
  /**
   * Optional presence indicator overlaid on the bottom-right of the avatar.
   * - `live` — brand-coloured dot with a halo (active now).
   * - `idle` — warm-coloured dot (recently active).
   * - `off` — muted grey dot (offline).
   *
   * Omit (or pass `undefined`) to render no overlay.
   */
  presence?: AvatarPresence;
};

/**
 * A circular avatar container. Defaults to the tinted `--accent-deep` surface
 * with a `--accent-dim` outline — matching the mono-font initial-cap treatment
 * from the reference design. Accepts an optional `presence` prop that
 * overlays a status dot on the bottom-right.
 */
function Avatar({ className, children, presence, ...props }: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      className={cn(
        'relative inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-visible rounded-full border border-accent-dim bg-accent-deep text-accent font-mono text-[0.82rem] font-medium',
        className,
      )}
      {...props}
    >
      <span className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full">
        {children}
      </span>
      {presence !== undefined && (
        <span
          aria-hidden
          data-presence={presence}
          className={cn(
            'absolute bottom-0 right-0 h-[10px] w-[10px] rounded-full ring-2 ring-background',
            presence === 'live' &&
              'bg-accent shadow-[0_0_0_3px_var(--accent-glow)]',
            presence === 'idle' && 'bg-warm',
            presence === 'off' && 'bg-text-dim',
          )}
        />
      )}
    </AvatarPrimitive.Root>
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
        'flex h-full w-full items-center justify-center rounded-full bg-accent-deep text-accent',
        className,
      )}
      {...props}
    />
  );
}

/**
 * Props for {@link AvatarGroup}. Siblings after the first receive a small
 * negative margin to overlap, and a ring in `--bg` to punch them
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
