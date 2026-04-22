import { cn } from '../lib/cn';

/** Props for the {@link Kbd} component. */
export type KbdProps = React.HTMLAttributes<HTMLElement>;

/**
 * A keyboard-key chip rendered as a semantic `<kbd>` element. The 2 px
 * bottom border gives the tactile "key" silhouette from the reference design.
 *
 * @example
 * ```tsx
 * <Kbd>⌘K</Kbd>
 * ```
 */
function Kbd({ className, ...props }: KbdProps) {
  return (
    <kbd
      className={cn(
        'inline-flex items-center font-mono text-[0.72rem] bg-surface-2 text-text border border-border border-b-2 rounded-sm px-1.5 py-0.5',
        className,
      )}
      {...props}
    />
  );
}

export { Kbd };
