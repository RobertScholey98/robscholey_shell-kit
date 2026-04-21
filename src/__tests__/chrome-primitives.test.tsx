import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { BottomNav, BottomNavItem } from '@/ui/components/bottom-nav';

describe('BottomNav', () => {
  it('renders a <nav> with the primary navigation label', () => {
    const { container, getByRole } = render(
      <BottomNav>
        <BottomNavItem icon={<svg data-testid="icon" />}>Home</BottomNavItem>
      </BottomNav>,
    );
    expect(container.querySelector('nav')).not.toBeNull();
    expect(getByRole('navigation').getAttribute('aria-label')).toBe('Primary navigation');
  });

  it('forwards className to the nav element', () => {
    const { container } = render(
      <BottomNav className="custom-nav">
        <BottomNavItem icon={<svg />}>Home</BottomNavItem>
      </BottomNav>,
    );
    expect(container.querySelector('nav.custom-nav')).not.toBeNull();
  });
});

describe('BottomNavItem', () => {
  it('renders as a <button> by default', () => {
    const { getByRole } = render(<BottomNavItem icon={<svg />}>Home</BottomNavItem>);
    const button = getByRole('button');
    expect(button.tagName).toBe('BUTTON');
    expect(button.textContent).toContain('Home');
  });

  it('invokes onClick when the button is pressed', () => {
    const onClick = vi.fn();
    const { getByRole } = render(
      <BottomNavItem icon={<svg />} onClick={onClick}>
        Home
      </BottomNavItem>,
    );
    fireEvent.click(getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('passes through to a slotted child when asChild is true', () => {
    const { container, queryByRole } = render(
      <BottomNavItem asChild icon={<svg />}>
        <a href="/home">Home</a>
      </BottomNavItem>,
    );
    expect(queryByRole('button')).toBeNull();
    const anchor = container.querySelector('a');
    expect(anchor).not.toBeNull();
    expect(anchor?.getAttribute('href')).toBe('/home');
  });

  it('sets aria-current="page" and data-active when active is true', () => {
    const { container } = render(
      <BottomNavItem icon={<svg />} active>
        Home
      </BottomNavItem>,
    );
    const button = container.querySelector('button');
    expect(button?.getAttribute('aria-current')).toBe('page');
    expect(button?.getAttribute('data-active')).toBe('true');
    expect(button?.className).toContain('text-brand');
  });

  it('omits aria-current when not active', () => {
    const { container } = render(<BottomNavItem icon={<svg />}>Home</BottomNavItem>);
    const button = container.querySelector('button');
    expect(button?.getAttribute('aria-current')).toBeNull();
    expect(button?.getAttribute('data-active')).toBeNull();
  });

  it('renders a badge when badge > 0', () => {
    const { getByText } = render(
      <BottomNavItem icon={<svg />} badge={3}>
        Messages
      </BottomNavItem>,
    );
    expect(getByText('3')).toBeDefined();
  });

  it('does not render the badge when badge is 0', () => {
    const { queryByText } = render(
      <BottomNavItem icon={<svg />} badge={0}>
        Messages
      </BottomNavItem>,
    );
    expect(queryByText('0')).toBeNull();
  });

  it('does not render the badge when badge is undefined', () => {
    const { container } = render(<BottomNavItem icon={<svg />}>Messages</BottomNavItem>);
    expect(container.querySelector('.bg-warm')).toBeNull();
  });
});
