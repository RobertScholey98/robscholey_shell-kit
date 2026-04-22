import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import type { Accent } from '../../messages';
import { cn } from '../lib/cn';

/** Props for the {@link Changelog} container. */
export interface ChangelogProps extends HTMLAttributes<HTMLOListElement> {
  /** `<ChangelogItem>` children — one per entry. */
  children: ReactNode;
}

/**
 * A cross-app activity feed used in the shell's selector. Renders an `<ol>`
 * styled as a bordered card panel with per-row dividers; items are siblings
 * and lay themselves out as a 4-column grid on wide viewports, reflowing to
 * a 2-row grid under 560 px.
 *
 * @example
 * ```tsx
 * <Changelog>
 *   <ChangelogItem accent="teal" app="portfolio" when="2d">
 *     Design system page — 7 accent variants.
 *   </ChangelogItem>
 *   <ChangelogItem accent="fsgb" app="admin" when="5h">
 *     Audit log — per-session filter, CSV export.
 *   </ChangelogItem>
 * </Changelog>
 * ```
 *
 * @param props - The changelog props.
 * @returns An `<ol>` styled as a bordered panel with item dividers.
 */
function Changelog({ className, children, ...props }: ChangelogProps): ReactElement {
  return (
    <ol
      className={cn(
        'm-0 flex list-none flex-col overflow-hidden rounded-md border border-border bg-surface p-0',
        className,
      )}
      {...props}
    >
      {children}
    </ol>
  );
}

/** Props for the {@link ChangelogItem} component. */
export interface ChangelogItemProps {
  /** Accent applied to the dot — re-scopes the accent token trio to the item. */
  accent?: Accent;
  /** Originating app label — rendered in lowercase mono. */
  app: string;
  /** Message body — the shipped-work summary. */
  children: ReactNode;
  /** Relative timestamp (e.g. `"2d"`, `"5h"`). */
  when: string;
  /** Extra classes applied to the `<li>` root. */
  className?: string;
}

/**
 * A single entry inside a {@link Changelog}. Layout:
 *
 * - Wide (≥ 560 px): four-column grid — `dot · app · message · when`.
 * - Narrow (< 560 px): 3-column header row (`dot · app · when`) above a
 *   full-width message row.
 *
 * The accent dot reads its colour from `--accent`; `data-accent` on the dot
 * re-scopes the accent token trio to that element so the dot's colour is
 * driven by the same cascade the rest of the design system uses (no
 * hardcoded hex table as in the raw handoff CSS).
 *
 * @param props - The changelog-item props.
 * @returns A `<li>` that lays itself out responsively into 3 or 4 cells.
 */
function ChangelogItem({
  accent,
  app,
  children,
  when,
  className,
}: ChangelogItemProps): ReactElement {
  return (
    <li
      className={cn(
        'grid items-center gap-3.5 border-t border-border px-4 py-3 text-[0.86rem] first:border-t-0',
        // Wide: dot · app · message · when
        'max-[559px]:grid-cols-[auto_auto_1fr] max-[559px]:[grid-template-areas:"dot_app_when""msg_msg_msg"]',
        'min-[560px]:grid-cols-[auto_auto_1fr_auto]',
        className,
      )}
    >
      <span
        data-accent={accent}
        aria-hidden
        className="h-2 w-2 rounded-full bg-accent max-[559px]:[grid-area:dot]"
      />
      <span className="font-mono text-[0.74rem] text-text-muted lowercase min-w-[72px] max-[559px]:[grid-area:app]">
        {app}
      </span>
      <span className="text-text leading-snug max-[559px]:[grid-area:msg] max-[559px]:text-[0.82rem]">
        {children}
      </span>
      <span className="font-mono text-[0.72rem] text-text-dim max-[559px]:[grid-area:when]">
        {when}
      </span>
    </li>
  );
}

export { Changelog, ChangelogItem };
