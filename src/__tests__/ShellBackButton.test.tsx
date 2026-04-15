import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { ShellBackButton } from '@/ShellBackButton';
import { configure, _testResetConfig } from '@/config';

beforeEach(() => {
  _testResetConfig();
  configure({ shellOrigin: 'https://robscholey.com' });
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
    const { getByRole } = render(
      <ShellBackButton isEmbedded={true} showBackButton={true} />,
    );
    expect(getByRole('button')).toBeDefined();
  });

  it('renders nothing when not embedded', () => {
    const { container } = render(
      <ShellBackButton isEmbedded={false} showBackButton={true} />,
    );
    expect(container.innerHTML).toBe('');
  });

  it('renders nothing when showBackButton is false', () => {
    const { container } = render(
      <ShellBackButton isEmbedded={true} showBackButton={false} />,
    );
    expect(container.innerHTML).toBe('');
  });

  it('sends navigate-to-shell on click', () => {
    const { getByRole } = render(
      <ShellBackButton isEmbedded={true} showBackButton={true} />,
    );

    fireEvent.click(getByRole('button'));

    expect(window.parent.postMessage).toHaveBeenCalledWith(
      { type: 'navigate-to-shell' },
      'https://robscholey.com',
    );
  });

  it('renders custom children', () => {
    const { getByText } = render(
      <ShellBackButton isEmbedded={true} showBackButton={true}>
        Go back
      </ShellBackButton>,
    );
    expect(getByText('Go back')).toBeDefined();
  });

  it('renders child element when asChild is true', () => {
    const { getByRole } = render(
      <ShellBackButton isEmbedded={true} showBackButton={true} asChild>
        <a href="#">Back</a>
      </ShellBackButton>,
    );
    const link = getByRole('link');
    expect(link).toBeDefined();
    expect(link.textContent).toBe('Back');
  });

  it('sends navigate-to-shell when asChild element is clicked', () => {
    const { getByRole } = render(
      <ShellBackButton isEmbedded={true} showBackButton={true} asChild>
        <a href="#">Back</a>
      </ShellBackButton>,
    );

    fireEvent.click(getByRole('link'));

    expect(window.parent.postMessage).toHaveBeenCalledWith(
      { type: 'navigate-to-shell' },
      'https://robscholey.com',
    );
  });

  it('calls custom onClick handler alongside navigation', () => {
    const customOnClick = vi.fn();
    const { getByRole } = render(
      <ShellBackButton
        isEmbedded={true}
        showBackButton={true}
        onClick={customOnClick}
      />,
    );

    fireEvent.click(getByRole('button'));

    expect(customOnClick).toHaveBeenCalled();
    expect(window.parent.postMessage).toHaveBeenCalledWith(
      { type: 'navigate-to-shell' },
      'https://robscholey.com',
    );
  });

  it('does not navigate if onClick calls preventDefault', () => {
    const customOnClick = vi.fn((e: React.MouseEvent) => e.preventDefault());
    const { getByRole } = render(
      <ShellBackButton
        isEmbedded={true}
        showBackButton={true}
        onClick={customOnClick}
      />,
    );

    fireEvent.click(getByRole('button'));

    expect(customOnClick).toHaveBeenCalled();
    expect(window.parent.postMessage).not.toHaveBeenCalledWith(
      { type: 'navigate-to-shell' },
      expect.anything(),
    );
  });
});
