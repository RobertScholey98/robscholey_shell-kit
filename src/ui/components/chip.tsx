import type { ButtonHTMLAttributes, ReactElement, ReactNode } from 'react';
import { cn } from '../lib/cn';

/** Props for the {@link Chip} component. */
export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** When true, the chip renders with the active accent-tinted treatment. */
  active?: boolean;
  /**
   * Optional numeric count rendered as a subtle-foreground suffix after the
   * label. When the chip is active, the count inherits the accent colour.
   */
  count?: number;
  /** Label — typically a short mono filter name. */
  children: ReactNode;
}

/**
 * A filter / tab-row chip. Renders as a `<button>` by default so keyboard
 * interaction and click handlers work with no wrapping. The chip sits on
 * `--surface` with a subtle border; active state tints the background and
 * border in `--accent` while the label shifts to `--accent`.
 *
 * Distinct from `<Tag>` (tech label, uppercase, tracking) and `<Badge>`
 * (inline label, no interaction). Chips carry state and are tappable.
 *
 * @example
 * ```tsx
 * <Chip active count={14}>codes</Chip>
 * <Chip count={11}>users</Chip>
 * <Chip>sessions</Chip>
 * ```
 *
 * @param props - The chip props; forwarded to the underlying `<button>`.
 * @returns A rounded-full interactive button styled for filter rows.
 */
function Chip({
  className,
  active = false,
  count,
  children,
  type = 'button',
  ...props
}: ChipProps): ReactElement {
  return (
    <button
      type={type}
      data-active={active || undefined}
      aria-pressed={active}
      className={cn(
        'inline-flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full border border-border bg-surface px-[11px] py-[5px] font-mono text-[0.72rem] text-text-muted transition-[color,background-color,border-color] duration-150 hover:border-accent-dim hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        active &&
          'border-[color-mix(in_srgb,var(--accent)_35%,var(--border))] bg-[color-mix(in_srgb,var(--accent)_10%,var(--surface-2))] text-accent hover:text-accent',
        className,
      )}
      {...props}
    >
      {children}
      {count !== undefined && (
        <span
          className={cn(
            'text-[0.68rem]',
            active ? 'text-accent opacity-75' : 'text-text-dim',
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
}

export { Chip };
