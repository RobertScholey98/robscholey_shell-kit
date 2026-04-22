import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

/**
 * Typography scale aligned with the rs. design-system.
 *
 * - `display` / `h1` / `h2` / `h3` are the heading tiers, tuned for tight
 *   letter-spacing and moderate weight (600). The display variant leads
 *   landing pages; `h1` carries section hero copy; `h2` / `h3` chunk content.
 * - `body` and `small` are the two paragraph tiers.
 * - `mono-label` is the eyebrow / section-label treatment — JetBrains Mono,
 *   uppercase, wide tracking, brand-coloured. Also replaces the old `label`
 *   variant at call sites.
 * - `code` is inline monospace at body scale.
 *
 * `withAccent` adds a 32 px × 1 px leading bar in `--brand` above heading
 * variants, implemented as a `::before` pseudo. It's a no-op on body / small
 * / mono-label / code.
 */
// Every variant zeroes browser-default margins so spacing is parent-controlled
// (flex/grid gap, surrounding `mb-*`, etc.). The design's stylesheet does the
// same via `p { margin: 0 0 1.1em }` and `h1-h4 { margin: 0 0 0.6em }` resets;
// here we keep it scoped to the component so consumers don't need a global
// reset to get the design's rendering.
const typographyVariants = cva('m-0', {
  variants: {
    variant: {
      display:
        'text-[2.9rem] font-semibold tracking-[-0.028em] leading-[1.08]',
      h1: 'text-[2.6rem] font-semibold tracking-[-0.022em] leading-[1.1]',
      h2: 'text-[1.4rem] font-semibold leading-tight',
      h3: 'text-[1.05rem] font-semibold leading-snug',
      body: 'text-base leading-[1.65]',
      small: 'text-[0.88rem] text-muted-foreground',
      'mono-label':
        'font-mono text-[0.72rem] uppercase tracking-[0.14em] text-brand',
      code: 'font-mono text-[0.82rem]',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
    withAccent: {
      true: 'relative pt-[0.7em] before:content-[""] before:absolute before:left-0 before:top-0 before:w-8 before:h-px before:bg-brand',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'body',
    align: 'left',
    withAccent: false,
  },
});

/** HTML element names that Typography can render as. */
type TypographyElement =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'div'
  | 'label'
  | 'code';

/** Variants that represent visual headings and therefore accept the accent bar. */
const headingVariants = new Set<string>(['display', 'h1', 'h2', 'h3']);

const defaultElements: Record<
  NonNullable<VariantProps<typeof typographyVariants>['variant']>,
  TypographyElement
> = {
  display: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  body: 'p',
  small: 'p',
  'mono-label': 'span',
  code: 'code',
};

/** Props for the {@link Typography} component. */
export interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    VariantProps<typeof typographyVariants> {
  /** Override the default HTML element for this variant. */
  as?: TypographyElement;
}

/**
 * A typography component with the rs. design-system type scale.
 * Renders the appropriate HTML element based on the variant (h1→`<h1>`, body→`<p>`, etc.).
 * Override with the `as` prop when semantics differ from visuals.
 *
 * Headings accept an optional `withAccent` prop that renders a leading bar in
 * `--brand` above the text — matches the `ds-eyebrow` treatment used on the
 * reference design.
 *
 * @example
 * ```tsx
 * <Typography variant="display">Rob Scholey</Typography>
 * <Typography variant="mono-label">Software / Shell</Typography>
 * <Typography variant="h2" withAccent>Capabilities</Typography>
 * <Typography variant="small">Some muted caption</Typography>
 * ```
 */
export function Typography({
  variant,
  align,
  withAccent,
  as,
  className,
  ...props
}: TypographyProps) {
  const resolvedVariant = variant ?? 'body';
  const accent = withAccent && headingVariants.has(resolvedVariant);
  const Component = as ?? defaultElements[resolvedVariant];
  return (
    <Component
      className={cn(
        typographyVariants({ variant: resolvedVariant, align, withAccent: accent }),
        className,
      )}
      {...props}
    />
  );
}

export { typographyVariants };
