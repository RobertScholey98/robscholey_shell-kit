import type { ReactElement, ReactNode } from 'react';
import { cn } from '../lib/cn';

/** Props for the {@link CodePanel} component. */
export interface CodePanelProps {
  /** Optional filename rendered in muted text in the head strip. */
  filename?: string;
  /** Optional brand-tinted tag rendered before the filename (e.g. `// shell`). */
  tag?: string;
  /** Pre-formatted code content. Rendered verbatim inside `<pre><code>`. */
  children: ReactNode;
  /** Extra classes applied to the outer container. */
  className?: string;
}

/**
 * A framed code panel — a card-surface outer with a thin `--surface-2` head
 * strip for the filename and a monospace body. No syntax highlighting is
 * applied; consumers can pre-highlight and pass `children` as-is.
 *
 * @example
 * ```tsx
 * <CodePanel tag="// shell" filename="message-bus.ts">
 *   {`export function sendToApp(id, msg) { ... }`}
 * </CodePanel>
 * ```
 */
function CodePanel({ filename, tag, children, className }: CodePanelProps): ReactElement {
  const hasHead = Boolean(filename || tag);
  return (
    <div
      className={cn(
        'overflow-hidden rounded-md border border-border bg-surface',
        className,
      )}
    >
      {hasHead ? (
        <div className="flex gap-2 bg-surface-2 border-b border-border px-3.5 py-2 font-mono text-[0.72rem] text-text-muted">
          {tag ? <span className="text-accent">{tag}</span> : null}
          {filename ? <span>{filename}</span> : null}
        </div>
      ) : null}
      <pre className="m-0 overflow-x-auto border-0 bg-transparent p-3.5 font-mono text-[0.82rem] leading-relaxed">
        <code className="bg-transparent p-0 text-inherit">{children}</code>
      </pre>
    </div>
  );
}

export { CodePanel };
