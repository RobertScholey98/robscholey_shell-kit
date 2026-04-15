import { Slot } from '@radix-ui/react-slot';
import { navigateToShell } from './navigateToShell';

/** Props for the {@link ShellBackButton} component. */
export interface ShellBackButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Whether the app is embedded in the shell. */
  isEmbedded: boolean;
  /** Whether the shell wants a back button shown. */
  showBackButton: boolean;
  /** When true, renders the child element directly instead of wrapping in a `<button>`. */
  asChild?: boolean;
}

/**
 * Navigates back to the shell when clicked. Only renders when the app is embedded
 * and the shell requests a back button.
 *
 * Use `asChild` to compose with your own button element:
 *
 * @example
 * ```tsx
 * // Default — renders a <button>
 * <ShellBackButton isEmbedded={true} showBackButton={true}>
 *   Back
 * </ShellBackButton>
 *
 * // With asChild — merges behaviour onto your element
 * <ShellBackButton isEmbedded={true} showBackButton={true} asChild>
 *   <MyCustomButton variant="ghost" size="sm">
 *     ← Back to robscholey.com
 *   </MyCustomButton>
 * </ShellBackButton>
 * ```
 */
export function ShellBackButton({
  isEmbedded,
  showBackButton,
  asChild,
  onClick,
  children = '\u2190 Back to robscholey.com',
  ...rest
}: ShellBackButtonProps): React.ReactElement | null {
  if (!isEmbedded || !showBackButton) return null;

  const Component = asChild ? Slot : 'button';

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(e);
    if (!e.defaultPrevented) {
      navigateToShell();
    }
  }

  return (
    <Component type={asChild ? undefined : 'button'} onClick={handleClick} {...rest}>
      {children}
    </Component>
  );
}
