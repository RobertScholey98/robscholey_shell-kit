import type { ReactElement, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

/**
 * Status label styling. Design's `.pc-status` is bare mono text in a
 * variant-keyed colour — no pill chrome, no background, no border. The
 * colour is the only signal.
 */
const statusVariants = cva(
  'font-mono text-[0.7rem] uppercase tracking-[0.1em] shrink-0 whitespace-nowrap',
  {
    variants: {
      statusVariant: {
        default: 'text-subtle-foreground',
        live: 'text-brand',
        work: 'text-muted-foreground',
        paused: 'text-warm',
      },
    },
    defaultVariants: {
      statusVariant: 'default',
    },
  },
);

type StatusVariant = NonNullable<VariantProps<typeof statusVariants>['statusVariant']>;

/** Props for the {@link ProjectCard} component. */
export interface ProjectCardProps {
  /** Card title rendered as an `<h3>`. */
  title: string;
  /** Optional status label rendered top-right. */
  status?: string;
  /** Visual treatment for the status label. */
  statusVariant?: StatusVariant;
  /** Short description. Overridden by `children` if both are provided. */
  description?: ReactNode;
  /** Tag row content — typically a cluster of `<Tag>` components. */
  tags?: ReactNode;
  /** Footer arrow / call-to-action text. Defaults to nothing. */
  arrow?: ReactNode;
  /** Render the card as an anchor when provided. */
  href?: string;
  /** Render the card as a button when `href` is absent. */
  onClick?: () => void;
  /** Extra classes. */
  className?: string;
  /** Overrides `description` when provided. */
  children?: ReactNode;
}

/** Shared card container classes. Applied to `<a>`, `<button>` or `<div>`. */
const cardClasses =
  'group relative flex flex-col gap-3 overflow-hidden rounded-lg border border-border bg-card p-6 text-left text-foreground shadow-sm transition-[border-color,background-color,transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-brand-dim hover:bg-card-hi hover:shadow-[0_8px_24px_-20px_var(--brand-glow)]';

/**
 * The flagship project-card component — card surface, title + status row,
 * description, tag row, and an arrow CTA whose spacing widens on hover.
 *
 * When `href` is provided, the card renders as a semantic `<a>`. When only
 * `onClick` is provided it becomes a `<button>`. With neither, it falls back
 * to a static `<div>`.
 *
 * @example
 * ```tsx
 * <ProjectCard
 *   href="/canopy"
 *   title="Canopy"
 *   status="Live · 2026"
 *   statusVariant="live"
 *   description="A headless content layer for multi-tenant sites."
 *   tags={<>
 *     <Tag>ts</Tag>
 *     <Tag>postgres</Tag>
 *     <Tag variant="accent">react</Tag>
 *   </>}
 *   arrow="Read more"
 * />
 * ```
 */
function ProjectCard({
  title,
  status,
  statusVariant = 'default',
  description,
  tags,
  arrow,
  href,
  onClick,
  className,
  children,
}: ProjectCardProps): ReactElement {
  const body = (
    <>
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-[1.15rem] font-semibold m-0">{title}</h3>
        {status ? <span className={cn(statusVariants({ statusVariant }))}>{status}</span> : null}
      </div>
      {children ?? (
        description ? (
          <p className="m-0 text-[0.92rem] text-muted-foreground leading-relaxed">{description}</p>
        ) : null
      )}
      {tags ? <div className="flex flex-wrap gap-1.5">{tags}</div> : null}
      {arrow ? (
        <span className="mt-auto inline-flex items-center gap-1.5 font-mono text-[0.85rem] text-brand transition-all group-hover:gap-2.5">
          {arrow}
        </span>
      ) : null}
    </>
  );

  if (href) {
    return (
      <a href={href} className={cn(cardClasses, 'no-underline', className)}>
        {body}
      </a>
    );
  }
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={cn(cardClasses, 'cursor-pointer', className)}>
        {body}
      </button>
    );
  }
  return <div className={cn(cardClasses, className)}>{body}</div>;
}

export { ProjectCard };
