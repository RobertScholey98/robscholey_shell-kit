import type { ButtonHTMLAttributes, ReactElement } from 'react';
import { cn } from '../lib/cn';

/** Props for the {@link FAB} component. */
export type FABProps = ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * A small floating action button anchored to the bottom-right of its
 * containing viewport. Positioned above any {@link BottomNav} via a
 * `calc(86px + env(safe-area-inset-bottom))` offset so the two don't
 * overlap on notched devices.
 *
 * The button is `brand` filled with `--accent-deep` text — high contrast
 * when the accent is teal/warm/indigo, and still legible on the darker
 * accents. A `--accent-glow` drop-shadow plus a 1-px brand-tinted outline
 * keep the FAB readable against the blurred bottom-nav behind it.
 *
 * Consumers are responsible for `aria-label` (the content is typically a
 * decorative glyph like `+`).
 *
 * @example
 * ```tsx
 * <FAB onClick={openSheet} aria-label="Mint a new code">+</FAB>
 * ```
 *
 * @param props - The FAB props; forwarded to the underlying `<button>`.
 * @returns A fixed-position brand-coloured circular button.
 */
function FAB({ className, type = 'button', ...props }: FABProps): ReactElement {
  return (
    <button
      type={type}
      className={cn(
        'fixed right-[18px] bottom-[calc(86px+env(safe-area-inset-bottom))] z-[45] inline-flex h-[52px] w-[52px] cursor-pointer items-center justify-center rounded-full border-0 bg-accent text-[1.6rem] font-medium text-accent-deep shadow-[0_12px_30px_-8px_var(--accent-glow),0_0_0_1px_color-mix(in_srgb,var(--accent)_40%,transparent)] transition-transform duration-150 hover:scale-[1.04] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring',
        className,
      )}
      {...props}
    />
  );
}

export { FAB };
