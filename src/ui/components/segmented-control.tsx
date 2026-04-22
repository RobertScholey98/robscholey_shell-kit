'use client';

import type { ReactElement } from 'react';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { cn } from '../lib/cn';

/** Props for the {@link SegmentedControl} container. */
export interface SegmentedControlProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>,
    'type' | 'defaultValue' | 'value' | 'onValueChange'
  > {
  /** Controlled value — the `value` of the currently-selected item. */
  value?: string;
  /** Uncontrolled default value — the `value` of the initially-selected item. */
  defaultValue?: string;
  /** Change handler — fires when the selected item changes. */
  onValueChange?: (value: string) => void;
}

/**
 * A small pill-row where one item is active at a time. Renders a Radix
 * `ToggleGroup` in single-select mode with a rounded-full bordered shell
 * and children spaced inside.
 *
 * Intended for binary or short switches — presence toggles, tab-lite
 * filters, layout mode pickers. Prefer {@link Chip} for filter-style
 * rows where multiple values and counts need to read clearly.
 *
 * @example
 * ```tsx
 * <SegmentedControl value={presence} onValueChange={setPresence}>
 *   <SegmentedControlItem value="avail">available</SegmentedControlItem>
 *   <SegmentedControlItem value="away">away</SegmentedControlItem>
 * </SegmentedControl>
 * ```
 *
 * @param props - The segmented-control props; forwarded to the
 * Radix root aside from the selection API.
 * @returns A `<div role="group">` containing toggle-group items.
 */
function SegmentedControl({
  className,
  children,
  value,
  defaultValue,
  onValueChange,
  ...props
}: SegmentedControlProps): ReactElement {
  return (
    <ToggleGroupPrimitive.Root
      type="single"
      value={value}
      defaultValue={defaultValue}
      onValueChange={(v) => {
        // Radix emits `""` when the user deselects; collapse to a no-op so
        // consumers always receive a non-empty value for a "one must be
        // active" control.
        if (v && onValueChange) onValueChange(v);
      }}
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-border bg-bg p-1',
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Root>
  );
}

/** Props for the {@link SegmentedControlItem} component. */
export type SegmentedControlItemProps = React.ComponentPropsWithoutRef<
  typeof ToggleGroupPrimitive.Item
>;

/**
 * A single item inside a {@link SegmentedControl}. Active state is driven
 * by Radix data attributes (`data-state="on"`) and styled via a `--surface-2`
 * fill and an inset ring so the active pill reads as pressed.
 *
 * @param props - The item props.
 * @returns A toggle-group item rendered as a rounded-full button.
 */
function SegmentedControlItem({
  className,
  children,
  ...props
}: SegmentedControlItemProps): ReactElement {
  return (
    <ToggleGroupPrimitive.Item
      className={cn(
        'inline-flex cursor-pointer items-center gap-1.5 rounded-full border-0 bg-transparent px-3 py-1.5 font-mono text-[0.72rem] text-text-muted transition-colors hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[state=on]:bg-surface-2 data-[state=on]:text-text data-[state=on]:shadow-[inset_0_0_0_1px_var(--border)]',
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
}

export { SegmentedControl, SegmentedControlItem };
