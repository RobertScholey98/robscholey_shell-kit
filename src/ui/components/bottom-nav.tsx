import type { ComponentPropsWithoutRef, ElementType, HTMLAttributes, ReactElement, ReactNode } from 'react';
import { Slot, Slottable } from '@radix-ui/react-slot';
import { cn } from '../lib/cn';

/** Props for the {@link BottomNav} container. */
export type BottomNavProps = HTMLAttributes<HTMLElement>;

/**
 * A fixed footer navigation bar for mobile-first sub-apps. Renders a
 * semantic `<nav>` pinned to the bottom of the viewport with a blurred
 * translucent fill, a top border, and `safe-area-inset-bottom` padding for
 * notched devices. Consumers place {@link BottomNavItem} children inside.
 *
 * Inner container caps at 900 px to match the admin-chrome max-width so the
 * nav aligns with the sticky header above it. The inner element uses
 * `display: flex` with equal flex on each item — any number of children lay
 * out without a fixed column count.
 *
 * @example
 * ```tsx
 * <BottomNav>
 *   <BottomNavItem asChild active icon={<HomeIcon />}>
 *     <Link href="/">Home</Link>
 *   </BottomNavItem>
 *   <BottomNavItem asChild icon={<MessageIcon />} badge={3}>
 *     <Link href="/messages">Messages</Link>
 *   </BottomNavItem>
 * </BottomNav>
 * ```
 *
 * @param props - The bottom-nav props.
 * @returns A `<nav>` positioned `fixed` at the bottom of the viewport.
 */
function BottomNav({ className, children, ...props }: BottomNavProps): ReactElement {
  return (
    <nav
      aria-label="Primary navigation"
      className={cn(
        'fixed inset-x-0 bottom-0 z-[60] border-t border-border bg-[color-mix(in_srgb,var(--bg)_92%,transparent)] pb-[env(safe-area-inset-bottom)] backdrop-blur-[14px]',
        className,
      )}
      {...props}
    >
      {/* Grid with `auto-cols-fr` flowing along the column axis gives every
          child an exactly-equal column width regardless of label length —
          flex-1 distributes free space but lets a longer label stretch its
          column wider, breaking visual rhythm across uneven labels. */}
      <div className="mx-auto grid max-w-[900px] grid-flow-col auto-cols-fr gap-1 px-2 py-2">
        {children}
      </div>
    </nav>
  );
}

/** Base shape for a {@link BottomNavItem}. */
interface BottomNavItemBaseProps {
  /** Icon rendered above the label — typically a lucide or SVG element. */
  icon: ReactNode;
  /** When true, the item is styled as the current route. */
  active?: boolean;
  /** Numeric badge shown at the top-right of the icon. */
  badge?: number;
  /**
   * When true, renders the child element directly instead of wrapping in a
   * `<button>`. Use with a Next.js `<Link>` to get client-side navigation.
   */
  asChild?: boolean;
  /** Label text and/or supplementary children after the icon. */
  children?: ReactNode;
  /** Extra classes applied to the rendered root element. */
  className?: string;
}

/**
 * Props for {@link BottomNavItem}. Forwards remaining props to the rendered
 * `<button>` (or to the slotted child when `asChild` is set).
 */
export type BottomNavItemProps = BottomNavItemBaseProps &
  Omit<ComponentPropsWithoutRef<'button'>, keyof BottomNavItemBaseProps | 'ref'>;

/**
 * A single entry in a {@link BottomNav}. Renders as a `<button>` by default
 * or passes through to a slotted child (e.g. a Next.js `<Link>`) when
 * `asChild` is set.
 *
 * Active state tints the label in `--accent` and lifts the icon frame with
 * a tinted `--surface-2` fill; the frame is otherwise transparent so the item
 * reads as flat until hovered or activated.
 *
 * @param props - The bottom-nav-item props.
 * @returns A column-flex item with icon + label + optional badge.
 */
function BottomNavItem({
  icon,
  active = false,
  badge,
  asChild = false,
  className,
  children,
  ...props
}: BottomNavItemProps): ReactElement {
  const Comp: ElementType = asChild ? Slot : 'button';
  return (
    <Comp
      data-active={active || undefined}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'relative flex cursor-pointer flex-col items-center gap-0.5 rounded-md border-0 bg-transparent px-1 py-1.5 font-mono text-[0.66rem] text-text-dim transition-colors hover:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        active && 'text-accent hover:text-accent',
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          'relative inline-flex h-7 w-7 items-center justify-center rounded-lg border border-transparent transition-colors [&_svg]:h-[18px] [&_svg]:w-[18px]',
          active && 'border-accent bg-[color-mix(in_srgb,var(--accent)_10%,var(--surface-2))]',
        )}
      >
        {icon}
        {badge !== undefined && badge > 0 && (
          <span
            aria-hidden
            className="absolute -right-1.5 -top-1 inline-flex h-[14px] min-w-[14px] items-center justify-center rounded-full bg-warm px-1 font-mono text-[0.6rem] font-semibold text-bg"
          >
            {badge}
          </span>
        )}
      </span>
      <Slottable>{children}</Slottable>
    </Comp>
  );
}

export { BottomNav, BottomNavItem };
