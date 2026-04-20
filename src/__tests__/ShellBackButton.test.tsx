import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import type { ReactElement } from 'react';
import { ShellBackButton } from '@/ShellBackButton';
import { ShellKitProvider } from '@/ShellKitProvider';

const SHELL_ORIGIN = 'https://robscholey.com';

function renderWithProvider(ui: ReactElement) {
  return render(
    <ShellKitProvider config={{ shellOrigin: SHELL_ORIGIN }}>{ui}</ShellKitProvider>,
  );
}

beforeEach(() => {
  Object.defineProperty(window, 'top', { value: {}, configurable: true });
  Object.defineProperty(window, 'parent', {
    value: { postMessage: vi.fn() },
    configurable: true,
  });
});

afterEach(() => {
  Object.defineProperty(window, 'top', { value: window, configurable: true });
  Object.defineProperty(window, 'parent', { value: window, configurable: true });
});

describe('ShellBackButton', () => {
  it('renders a button when embedded and showBackButton is true', () => {
    const { getByRole } = renderWithProvider(
      <ShellBackButton isEmbedded={true} showBackButton={true} />,
    );
    expect(getByRole('button')).toBeDefined();
  });

  it('renders nothing when not embedded', () => {
    const { container } = renderWithProvider(
      <ShellBackButton isEmbedded={false} showBackButton={true} />,
    );
    expect(container.innerHTML).toBe('');
  });

  it('renders nothing when showBackButton is false', () => {
    const { container } = renderWithProvider(
      <ShellBackButton isEmbedded={true} showBackButton={false} />,
    );
    expect(container.innerHTML).toBe('');
  });

  it('sends navigate-to-shell on click', () => {
    const { getByRole } = renderWithProvider(
      <ShellBackButton isEmbedded={true} showBackButton={true} />,
    );

    fireEvent.click(getByRole('button'));

    expect(window.parent.postMessage).toHaveBeenCalledWith(
      { type: 'navigate-to-shell' },
      SHELL_ORIGIN,
    );
  });

  it('renders custom children', () => {
    const { getByText } = renderWithProvider(
      <ShellBackButton isEmbedded={true} showBackButton={true}>
        Go back
      </ShellBackButton>,
    );
    expect(getByText('Go back')).toBeDefined();
  });

  it('renders child element when asChild is true', () => {
    const { getByRole } = renderWithProvider(
      <ShellBackButton isEmbedded={true} showBackButton={true} asChild>
        <a href="#">Back</a>
      </ShellBackButton>,
    );
    const link = getByRole('link');
    expect(link).toBeDefined();
    expect(link.textContent).toBe('Back');
  });

  it('sends navigate-to-shell when asChild element is clicked', () => {
    const { getByRole } = renderWithProvider(
      <ShellBackButton isEmbedded={true} showBackButton={true} asChild>
        <a href="#">Back</a>
      </ShellBackButton>,
    );

    fireEvent.click(getByRole('link'));

    expect(window.parent.postMessage).toHaveBeenCalledWith(
      { type: 'navigate-to-shell' },
      SHELL_ORIGIN,
    );
  });

  it('calls custom onClick handler alongside navigation', () => {
    const customOnClick = vi.fn();
    const { getByRole } = renderWithProvider(
      <ShellBackButton isEmbedded={true} showBackButton={true} onClick={customOnClick} />,
    );

    fireEvent.click(getByRole('button'));

    expect(customOnClick).toHaveBeenCalled();
    expect(window.parent.postMessage).toHaveBeenCalledWith(
      { type: 'navigate-to-shell' },
      SHELL_ORIGIN,
    );
  });

  it('does not navigate if onClick calls preventDefault', () => {
    const customOnClick = vi.fn((e: React.MouseEvent) => e.preventDefault());
    const { getByRole } = renderWithProvider(
      <ShellBackButton isEmbedded={true} showBackButton={true} onClick={customOnClick} />,
    );

    fireEvent.click(getByRole('button'));

    expect(customOnClick).toHaveBeenCalled();
    expect(window.parent.postMessage).not.toHaveBeenCalledWith(
      { type: 'navigate-to-shell' },
      expect.anything(),
    );
  });
});
