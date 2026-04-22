import type { ReactElement, ReactNode } from 'react';
import type { Accent } from '../../messages';
import { cn } from '../lib/cn';
import { StatusDot, type StatusVariant } from './status-dot';

/** Visual height of the card's upper visual slot, in pixels. */
const VISUAL_HEIGHT_PX = 130;

/** Props for the {@link AppCard} component. */
export interface AppCardProps {
  /** The app name, rendered as an `<h2>` in the card head. */
  title: string;
  /** Short description shown below the head. */
  description: string;
  /** Status indicator in the card head. Defaults to `'live'`. */
  status?: StatusVariant;
  /** Per-card accent — applied as `data-accent` on the card root. */
  accent?: Accent;
  /** Marks the card as "featured" — spans two columns in an {@link AppGrid}. */
  featured?: boolean;
  /** Renders the card as a non-interactive "coming soon" tile. */
  placeholder?: boolean;
  /** The identity visual rendered in the card's top slot. */
  visual?: ReactNode;
  /**
   * Small mono label rendered in the visual's top-left corner
   * (e.g. `"rs."` on the portfolio card).
   */
  visualMark?: string;
  /** Tag row — typically a cluster of `<Tag>` components. */
  tags?: ReactNode;
  /** Meta text in the card foot (e.g. `"v0.3 · 2d ago"`). */
  meta?: string;
  /** Arrow text in the card foot. Defaults to `"enter →"`. */
  arrow?: string;
  /** Render the card as an anchor when provided. */
  href?: string;
  /** Render the card as a button when `href` is absent. */
  onClick?: () => void;
  /** Extra classes applied to the card root. */
  className?: string;
  /** Optional body override — when provided, replaces the default description + tags + foot. */
  children?: ReactNode;
}

/** Shared card-root classes — applied to `<a>`, `<button>` or `<div>`. */
const cardRootClasses =
  'group relative flex flex-col overflow-hidden rounded-lg border border-border bg-surface text-left text-text no-underline transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-[3px] hover:border-accent-dim hover:shadow-[0_18px_40px_-24px_var(--accent-glow),0_0_0_1px_var(--accent-glow)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent';

/** Placeholder-only overrides: dim, non-interactive, no hover lift. */
const placeholderOverrides =
  'opacity-[0.55] cursor-not-allowed pointer-events-none hover:translate-y-0 hover:border-border hover:shadow-none';

/** Diagonal-stripe background for the placeholder visual slot. */
const placeholderStripeStyle = {
  background:
    'repeating-linear-gradient(45deg, var(--surface-2), var(--surface-2) 8px, var(--surface) 8px, var(--surface) 16px)',
};

/**
 * A slotted card used by the shell's app selector. Each card carries its own
 * accent via `data-accent`, a visual header slot, a title + status head, a
 * description paragraph, an optional tag row, and a mono foot with meta text
 * + an arrow CTA that widens its letter-spacing on hover.
 *
 * Resolution:
 * - `href` renders an `<a>`.
 * - `onClick` without `href` renders a `<button>`.
 * - Neither renders a non-interactive `<div>`.
 * - `placeholder` always renders a `<div>` with `aria-disabled="true"` and
 *   `pointer-events: none`, regardless of `href`/`onClick`.
 *
 * The accent prop is surfaced as `data-accent` on the card root so the
 * `[data-accent]` rules in `theme.css` re-scope the accent token trio to
 * the card subtree — every descendant that reads `--accent` etc. pulls the
 * card's accent rather than the document root's.
 *
 * @example
 * ```tsx
 * <AppCard
 *   href="/portfolio"
 *   title="Portfolio"
 *   description="Narrative site — selected work."
 *   accent="teal"
 *   featured
 *   status="live"
 *   visual={<BarGrid />}
 *   visualMark="rs."
 *   tags={<><Tag>ts</Tag><Tag variant="accent">next.js</Tag></>}
 *   meta="v0.3 · 2d ago"
 * />
 * ```
 *
 * @param props - The app-card props.
 * @returns An `<a>`, `<button>`, or `<div>` depending on props.
 */
function AppCard({
  title,
  description,
  status = 'live',
  accent,
  featured = false,
  placeholder = false,
  visual,
  visualMark,
  tags,
  meta,
  arrow = 'enter →',
  href,
  onClick,
  className,
  children,
}: AppCardProps): ReactElement {
  const dataAttrs = {
    'data-accent': accent,
    'data-size': featured ? 'featured' : undefined,
  };

  const body = (
    <>
      <div
        className="relative flex items-center justify-center overflow-hidden border-b border-border bg-surface-2"
        style={{ height: `${VISUAL_HEIGHT_PX}px`, ...(placeholder ? placeholderStripeStyle : {}) }}
        aria-hidden
      >
        {placeholder ? (
          <span className="font-mono text-[1.8rem] text-text-dim">+</span>
        ) : (
          <>
            {visual ?? null}
            {visualMark ? (
              <span className="absolute top-3.5 left-[18px] font-mono text-[0.72rem] font-semibold tracking-[0.04em] text-accent">
                {visualMark}
              </span>
            ) : null}
            <span
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(60% 80% at 50% 110%, var(--accent-glow), transparent 70%)',
              }}
            />
          </>
        )}
      </div>

      {children ?? (
        <div className="flex flex-1 flex-col gap-3 px-5 pt-[18px] pb-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="m-0 text-[1.2rem] font-semibold tracking-[-0.01em]">{title}</h2>
            <StatusDot status={status} aria-hidden />
          </div>
          <p className="m-0 text-[0.88rem] leading-relaxed text-text-muted">
            {description}
          </p>
          {tags ? <div className="flex flex-wrap gap-1.5">{tags}</div> : null}
          <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-3 font-mono text-[0.72rem]">
            <span className="text-text-dim">
              {placeholder ? 'not yet available' : (meta ?? '')}
            </span>
            {placeholder ? null : (
              <span className="text-accent transition-[letter-spacing] duration-200 group-hover:tracking-[0.04em]">
                {arrow}
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );

  const rootClasses = cn(cardRootClasses, placeholder && placeholderOverrides, className);

  if (placeholder) {
    return (
      <div {...dataAttrs} aria-disabled="true" className={rootClasses}>
        {body}
      </div>
    );
  }
  if (href) {
    return (
      <a {...dataAttrs} href={href} className={rootClasses}>
        {body}
      </a>
    );
  }
  if (onClick) {
    return (
      <button {...dataAttrs} type="button" onClick={onClick} className={cn(rootClasses, 'cursor-pointer')}>
        {body}
      </button>
    );
  }
  return (
    <div {...dataAttrs} className={rootClasses}>
      {body}
    </div>
  );
}

export { AppCard };
