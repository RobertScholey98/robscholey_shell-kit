import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { cn } from '../lib/cn';

/** Props for the {@link MetaGrid} container. */
export interface MetaGridProps extends HTMLAttributes<HTMLDListElement> {
  /** `<MetaRow>` children — one per key/value pair. */
  children: ReactNode;
}

/**
 * A compact key/value display used for session-meta sidebars and similar
 * "here are three facts" surfaces. Renders a semantic `<dl>`; consumers
 * place {@link MetaRow} children inside.
 *
 * Minimum width (200 px) keeps rows from collapsing when the container is
 * narrow; the handoff's session-meta sidebar relies on this to read as a
 * fixed column next to the intro copy.
 *
 * @example
 * ```tsx
 * <MetaGrid>
 *   <MetaRow k="tier" v="owner" />
 *   <MetaRow k="code" v="valid · 14d left" />
 *   <MetaRow k="apps" v="3 of 3" />
 * </MetaGrid>
 * ```
 *
 * @param props - The meta-grid props.
 * @returns A `<dl>` styled as a bordered card panel.
 */
function MetaGrid({ className, children, ...props }: MetaGridProps): ReactElement {
  return (
    <dl
      className={cn(
        'm-0 grid gap-1.5 rounded-md border border-border bg-card px-3.5 py-3 font-mono text-[0.74rem] min-w-[200px]',
        className,
      )}
      {...props}
    >
      {children}
    </dl>
  );
}

/** Props for the {@link MetaRow} component. */
export interface MetaRowProps {
  /** The key — rendered uppercase in subtle-foreground colour. */
  k: ReactNode;
  /** The value — rendered in the primary foreground. */
  v: ReactNode;
  /** Extra classes applied to the row container. */
  className?: string;
}

/**
 * A single key/value row inside a {@link MetaGrid}. Renders a `<dt>`/`<dd>`
 * pair wrapped in a flex row so the label sits on the left and the value
 * on the right with `space-between` justify.
 *
 * The key is rendered with uppercase tracking against `--subtle-foreground`;
 * the value uses `--foreground` so it reads as the primary information.
 *
 * @param props - The meta-row props.
 * @returns A flex-row wrapper containing `<dt>` + `<dd>` elements.
 */
function MetaRow({ k, v, className }: MetaRowProps): ReactElement {
  return (
    <div className={cn('flex items-baseline justify-between gap-3.5', className)}>
      <dt className="m-0 uppercase tracking-[0.08em] text-subtle-foreground">{k}</dt>
      <dd className="m-0 text-foreground">{v}</dd>
    </div>
  );
}

export { MetaGrid, MetaRow };
