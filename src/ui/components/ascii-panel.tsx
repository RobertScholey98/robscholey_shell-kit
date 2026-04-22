import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { cn } from '../lib/cn';

/** Props for the {@link AsciiPanel} component. */
export interface AsciiPanelProps extends Omit<HTMLAttributes<HTMLPreElement>, 'children'> {
  /** ASCII art / pre-formatted content. Whitespace is preserved verbatim. */
  children: ReactNode;
}

/**
 * A lightweight ASCII visual — transparent background, no border, `--accent`
 * text. Meant to sit inside an existing container (e.g. an app-card's
 * `.card-visual` surface) without bringing its own framing.
 *
 * Distinct from {@link Diagram}, which is a self-framing block diagram with
 * its own `--surface-2` surface, border, and padding. If you want the ASCII to
 * read as a standalone code-style block, reach for `<Diagram>` instead.
 *
 * @example
 * ```tsx
 * <AsciiPanel>
 * {`┌── users ──┐
 * │ codes  [·]│
 * └───────────┘`}
 * </AsciiPanel>
 * ```
 *
 * @param props - The ascii-panel props.
 * @returns A bare `<pre>` with mono + brand-coloured text.
 */
function AsciiPanel({ className, children, ...props }: AsciiPanelProps): ReactElement {
  return (
    <pre
      className={cn(
        'm-0 bg-transparent font-mono text-[0.78rem] leading-[1.35] text-accent whitespace-pre',
        className,
      )}
      {...props}
    >
      {children}
    </pre>
  );
}

export { AsciiPanel };
