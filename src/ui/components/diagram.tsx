import type { ReactElement, ReactNode } from 'react';
import { cn } from '../lib/cn';

/** Props for the {@link Diagram} container. */
export interface DiagramProps {
  /** ASCII / pre-formatted content. Whitespace is preserved verbatim. */
  children: ReactNode;
  /** Extra classes. */
  className?: string;
}

/**
 * A monospace container for ASCII diagrams. Preserves whitespace, scrolls
 * horizontally when content overflows, and sits on the `--surface-2` surface so
 * it visually separates from surrounding prose.
 *
 * Inline emphasis is available via {@link DiagramAccent}, {@link DiagramWarm},
 * {@link DiagramDim}.
 *
 * @example
 * ```tsx
 * <Diagram>
 * {`┌──────────┐
 * │ <DiagramAccent>SHELL</DiagramAccent> │
 * └──────────┘`}
 * </Diagram>
 * ```
 */
function Diagram({ children, className }: DiagramProps): ReactElement {
  return (
    <pre
      className={cn(
        'm-0 overflow-x-auto whitespace-pre rounded-md border border-border bg-surface-2 p-5 font-mono text-[0.82rem] leading-[1.4] text-text',
        className,
      )}
    >
      {children}
    </pre>
  );
}

/** Brand-coloured inline emphasis for diagram content. */
function DiagramAccent({ children }: { children: ReactNode }): ReactElement {
  return <span className="text-accent">{children}</span>;
}

/** Warm-secondary inline emphasis for diagram content. */
function DiagramWarm({ children }: { children: ReactNode }): ReactElement {
  return <span className="text-warm">{children}</span>;
}

/** Subtle / dimmed inline emphasis for diagram content. */
function DiagramDim({ children }: { children: ReactNode }): ReactElement {
  return <span className="text-text-dim">{children}</span>;
}

export { Diagram, DiagramAccent, DiagramWarm, DiagramDim };
