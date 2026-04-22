import type { CSSProperties, HTMLAttributes, ReactElement } from 'react';
import { cn } from '../lib/cn';

/** Default bar heights (0-100) — matches the handoff's portfolio visual. */
const DEFAULT_BARS: readonly number[] = [35, 55, 80, 100, 70, 50, 30];

/** Bar width in pixels — calibrated against the 130 px card-visual height. */
const BAR_WIDTH_PX = 14;
/** Per-bar animation delay in milliseconds — stagger for the rising ramp. */
const BAR_DELAY_MS = 60;

/** Props for the {@link BarGrid} component. */
export interface BarGridProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Heights for each bar on a 0-100 scale. Length determines the bar count.
   * Defaults to a seven-bar ascending-then-descending ramp.
   */
  bars?: readonly number[];
  /**
   * Whether bars animate rising from zero on mount. Ignored when the viewer
   * has `prefers-reduced-motion: reduce` set. Defaults to `true`.
   */
  animate?: boolean;
}

/**
 * An animated ascending-bar visual used as the portfolio app-card identity.
 * Reads `--accent` for colour and applies a per-bar opacity ramp so the
 * shortest bar is faintest and the tallest reads as a highlight.
 *
 * The rise animation is keyframe-driven (`bar-rise`) and uses `scaleY` from
 * the bottom origin. The keyframe is declared inline as a scoped `<style>`
 * block so the component is drop-in without touching `theme.css`.
 *
 * @example
 * ```tsx
 * <BarGrid />
 * <BarGrid bars={[10, 40, 60, 90]} animate={false} />
 * ```
 *
 * @param props - The bar-grid props.
 * @returns A flex row of bars sized by the `bars` array.
 */
function BarGrid({
  bars = DEFAULT_BARS,
  animate = true,
  className,
  ...props
}: BarGridProps): ReactElement {
  return (
    <div
      className={cn(
        'flex h-[70%] w-full items-end justify-center gap-1.5 px-[18px]',
        className,
      )}
      {...props}
    >
      <style>{BAR_RISE_KEYFRAMES}</style>
      {bars.map((height, index) => {
        // `--d` drives both the opacity ramp and the stagger — same
        // convention the handoff CSS uses. Cast through `CSSProperties`
        // because `--d` isn't in React's typed style index but is a valid
        // custom property.
        const style: CSSProperties = {
          ['--d' as string]: index,
          height: `${height}%`,
          width: `${BAR_WIDTH_PX}px`,
          opacity: `calc(0.35 + var(--d) * 0.09)`,
          animationDelay: animate ? `${index * BAR_DELAY_MS}ms` : '0ms',
        };
        return (
          <div
            key={index}
            data-bar-index={index}
            className={cn(
              'bg-accent rounded-t-sm',
              animate
                ? 'motion-safe:[animation:bar-rise_700ms_cubic-bezier(.2,.8,.2,1)_both]'
                : null,
            )}
            style={style}
          />
        );
      })}
    </div>
  );
}

/**
 * Keyframes scoped to the component so it ships without a global CSS
 * dependency. `prefers-reduced-motion` is handled by the `motion-safe:`
 * Tailwind variant on the bar elements themselves.
 */
const BAR_RISE_KEYFRAMES = `
@keyframes bar-rise {
  from { transform: scaleY(0.1); transform-origin: bottom; opacity: 0; }
  to   { transform: scaleY(1);   transform-origin: bottom; opacity: 1; }
}
`;

export { BarGrid };
