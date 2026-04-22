import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { BottomNav, BottomNavItem } from '@/ui/components/bottom-nav';
import { FAB } from '@/ui/components/fab';
import { SegmentedControl, SegmentedControlItem } from '@/ui/components/segmented-control';
import { Chip } from '@/ui/components/chip';
import { Avatar, AvatarFallback } from '@/ui/components/avatar';

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
    expect(button?.className).toContain('text-accent');
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

describe('FAB', () => {
  it('renders as a <button type="button"> by default', () => {
    const { getByRole } = render(<FAB aria-label="New">+</FAB>);
    const button = getByRole('button');
    expect(button.tagName).toBe('BUTTON');
    expect(button.getAttribute('type')).toBe('button');
    expect(button.textContent).toBe('+');
  });

  it('invokes onClick when pressed', () => {
    const onClick = vi.fn();
    const { getByRole } = render(
      <FAB aria-label="New" onClick={onClick}>
        +
      </FAB>,
    );
    fireEvent.click(getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('applies fixed positioning and brand colours', () => {
    const { getByRole } = render(<FAB aria-label="New">+</FAB>);
    const button = getByRole('button');
    expect(button.className).toContain('fixed');
    expect(button.className).toContain('bg-accent');
    expect(button.className).toContain('text-accent-deep');
  });

  it('forwards arbitrary HTML attributes', () => {
    const { getByRole } = render(
      <FAB aria-label="Mint" data-testid="fab-probe">
        +
      </FAB>,
    );
    const button = getByRole('button');
    expect(button.getAttribute('data-testid')).toBe('fab-probe');
    expect(button.getAttribute('aria-label')).toBe('Mint');
  });
});

describe('SegmentedControl', () => {
  it('renders items and reflects the default value via data-state="on"', () => {
    const { getByText } = render(
      <SegmentedControl defaultValue="avail">
        <SegmentedControlItem value="avail">available</SegmentedControlItem>
        <SegmentedControlItem value="away">away</SegmentedControlItem>
      </SegmentedControl>,
    );
    const avail = getByText('available').closest('button');
    const away = getByText('away').closest('button');
    expect(avail?.getAttribute('data-state')).toBe('on');
    expect(away?.getAttribute('data-state')).toBe('off');
  });

  it('fires onValueChange with the newly-selected value', () => {
    const onValueChange = vi.fn();
    const { getByText } = render(
      <SegmentedControl defaultValue="avail" onValueChange={onValueChange}>
        <SegmentedControlItem value="avail">available</SegmentedControlItem>
        <SegmentedControlItem value="away">away</SegmentedControlItem>
      </SegmentedControl>,
    );
    fireEvent.click(getByText('away'));
    expect(onValueChange).toHaveBeenCalledWith('away');
  });

  it('ignores deselect events so one item stays active', () => {
    const onValueChange = vi.fn();
    const { getByText } = render(
      <SegmentedControl defaultValue="avail" onValueChange={onValueChange}>
        <SegmentedControlItem value="avail">available</SegmentedControlItem>
        <SegmentedControlItem value="away">away</SegmentedControlItem>
      </SegmentedControl>,
    );
    // Clicking the currently-active item triggers a deselect in Radix; we
    // suppress it so the control never enters an empty state.
    fireEvent.click(getByText('available'));
    expect(onValueChange).not.toHaveBeenCalled();
  });
});

describe('Chip', () => {
  it('renders a <button type="button"> with the label', () => {
    const { getByRole } = render(<Chip>codes</Chip>);
    const btn = getByRole('button');
    expect(btn.tagName).toBe('BUTTON');
    expect(btn.getAttribute('type')).toBe('button');
    expect(btn.textContent).toContain('codes');
  });

  it('renders the count suffix when provided', () => {
    const { getByText } = render(<Chip count={14}>codes</Chip>);
    expect(getByText('14')).toBeDefined();
  });

  it('omits the count suffix when count is undefined', () => {
    const { container } = render(<Chip>codes</Chip>);
    const spans = container.querySelectorAll('span');
    expect(spans.length).toBe(0);
  });

  it('tints text and border in --brand when active', () => {
    const { getByRole } = render(<Chip active>codes</Chip>);
    const btn = getByRole('button');
    expect(btn.getAttribute('data-active')).toBe('true');
    expect(btn.getAttribute('aria-pressed')).toBe('true');
    expect(btn.className).toContain('text-accent');
  });

  it('sets aria-pressed="false" when not active', () => {
    const { getByRole } = render(<Chip>codes</Chip>);
    const btn = getByRole('button');
    expect(btn.getAttribute('aria-pressed')).toBe('false');
  });

  it('invokes onClick when pressed', () => {
    const onClick = vi.fn();
    const { getByRole } = render(<Chip onClick={onClick}>codes</Chip>);
    fireEvent.click(getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });
});

describe('Avatar presence', () => {
  it('renders no presence dot when presence is undefined', () => {
    const { container } = render(
      <Avatar>
        <AvatarFallback>RS</AvatarFallback>
      </Avatar>,
    );
    expect(container.querySelector('[data-presence]')).toBeNull();
  });

  it('renders a live presence dot with brand colour and halo', () => {
    const { container } = render(
      <Avatar presence="live">
        <AvatarFallback>RS</AvatarFallback>
      </Avatar>,
    );
    const dot = container.querySelector('[data-presence="live"]');
    expect(dot).not.toBeNull();
    expect(dot?.className).toContain('bg-accent');
    expect(dot?.className).toContain('shadow-');
  });

  it('renders an idle presence dot with warm colour', () => {
    const { container } = render(
      <Avatar presence="idle">
        <AvatarFallback>RS</AvatarFallback>
      </Avatar>,
    );
    const dot = container.querySelector('[data-presence="idle"]');
    expect(dot?.className).toContain('bg-warm');
  });

  it('renders an off presence dot with subtle-foreground colour', () => {
    const { container } = render(
      <Avatar presence="off">
        <AvatarFallback>RS</AvatarFallback>
      </Avatar>,
    );
    const dot = container.querySelector('[data-presence="off"]');
    expect(dot?.className).toContain('bg-text-dim');
  });
});
