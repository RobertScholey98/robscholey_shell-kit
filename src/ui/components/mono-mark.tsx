import type { HTMLAttributes, ReactElement } from 'react';
import { cn } from '../lib/cn';

/** Size variant — `'md'` is 72 px (default, matches the handoff). */
export type MonoMarkSize = 'sm' | 'md';

/** Outer square size in pixels, keyed by {@link MonoMarkSize}. */
const SIZE_PX: Record<MonoMarkSize, number> = {
  sm: 48,
  md: 72,
};
/** Corner-bracket side length in pixels, keyed by size. */
const CORNER_PX: Record<MonoMarkSize, number> = {
  sm: 8,
  md: 10,
};
/** Centered-letter font size in rem, keyed by size. */
const LETTER_REM: Record<MonoMarkSize, string> = {
  sm: '1.3rem',
  md: '2rem',
};

/** Props for the {@link MonoMark} component. */
export interface MonoMarkProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** The centered mono letter. Defaults to an empty string (brackets only). */
  letter?: string;
  /** Render size. Defaults to `'md'` (72 px). */
  size?: MonoMarkSize;
}

/**
 * A corner-bracketed square with a centered mono letter. Used as the
 * template app's identity visual and available as a generic "tile mark"
 * wherever a minimal branded square is wanted.
 *
 * Brackets are four absolutely-positioned spans with two zeroed borders so
 * each reads as an L-shape. The exposed corner carries a 3 px radius to
 * match the handoff's rounded inner tile.
 *
 * @example
 * ```tsx
 * <MonoMark letter="N" />
 * <MonoMark letter="C" size="sm" />
 * <MonoMark />
 * ```
 *
 * @param props - The mono-mark props.
 * @returns A `<div>` with four corner-bracket spans and a centered letter.
 */
function MonoMark({
  letter = '',
  size = 'md',
  className,
  style,
  ...props
}: MonoMarkProps): ReactElement {
  const px = SIZE_PX[size];
  const cornerPx = CORNER_PX[size];
  const letterRem = LETTER_REM[size];
  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center rounded-xl bg-surface-hi',
        className,
      )}
      style={{ width: `${px}px`, height: `${px}px`, ...style }}
      {...props}
    >
      <Corner position="tl" sizePx={cornerPx} />
      <Corner position="tr" sizePx={cornerPx} />
      <Corner position="bl" sizePx={cornerPx} />
      <Corner position="br" sizePx={cornerPx} />
      {letter ? (
        <span
          className="font-mono font-semibold text-text leading-none"
          style={{ fontSize: letterRem }}
        >
          {letter}
        </span>
      ) : null}
    </div>
  );
}

/** Corner-position discriminant — top/bottom × left/right. */
type CornerPosition = 'tl' | 'tr' | 'bl' | 'br';

/** Per-corner positioning + border silhouette. */
const CORNER_STYLE: Record<
  CornerPosition,
  { anchor: string; zeroed: string; radius: string }
> = {
  tl: {
    anchor: '-top-px -left-px',
    zeroed: 'border-r-0 border-b-0',
    radius: 'rounded-tl-[3px]',
  },
  tr: {
    anchor: '-top-px -right-px',
    zeroed: 'border-l-0 border-b-0',
    radius: 'rounded-tr-[3px]',
  },
  bl: {
    anchor: '-bottom-px -left-px',
    zeroed: 'border-r-0 border-t-0',
    radius: 'rounded-bl-[3px]',
  },
  br: {
    anchor: '-bottom-px -right-px',
    zeroed: 'border-l-0 border-t-0',
    radius: 'rounded-br-[3px]',
  },
};

/** A single corner bracket — two solid sides + one radiused corner. */
function Corner({
  position,
  sizePx,
}: {
  position: CornerPosition;
  sizePx: number;
}): ReactElement {
  const { anchor, zeroed, radius } = CORNER_STYLE[position];
  return (
    <span
      data-corner={position}
      aria-hidden
      className={cn(
        'absolute border-[1.5px] border-accent',
        anchor,
        zeroed,
        radius,
      )}
      style={{ width: `${sizePx}px`, height: `${sizePx}px` }}
    />
  );
}

export { MonoMark };
