import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { AppCard } from '@/ui/components/app-card';
import { AppGrid } from '@/ui/components/app-grid';
import { AsciiPanel } from '@/ui/components/ascii-panel';
import { BarGrid } from '@/ui/components/bar-grid';
import { Changelog, ChangelogItem } from '@/ui/components/changelog';
import { MetaGrid, MetaRow } from '@/ui/components/meta-grid';
import { MonoMark } from '@/ui/components/mono-mark';
import { StatusDot } from '@/ui/components/status-dot';

describe('StatusDot', () => {
  it('defaults to the live variant', () => {
    const { container } = render(<StatusDot />);
    const dot = container.querySelector('[data-status]');
    expect(dot).not.toBeNull();
    expect(dot?.getAttribute('data-status')).toBe('live');
    expect(dot?.className).toContain('bg-accent');
  });

  it('renders dev with a warm background', () => {
    const { container } = render(<StatusDot status="dev" />);
    const dot = container.querySelector('[data-status="dev"]');
    expect(dot).not.toBeNull();
    expect(dot?.className).toContain('bg-warm');
  });

  it('renders soon with the subtle-foreground background and no halo', () => {
    const { container } = render(<StatusDot status="soon" />);
    const dot = container.querySelector('[data-status="soon"]');
    expect(dot?.className).toContain('bg-text-dim');
    expect(dot?.className).not.toContain('shadow-');
  });

  it('renders paused with the warm-dim background', () => {
    const { container } = render(<StatusDot status="paused" />);
    const dot = container.querySelector('[data-status="paused"]');
    expect(dot?.className).toContain('bg-warm-dim');
  });

  it('forwards HTML attributes to the span', () => {
    const { container } = render(<StatusDot aria-label="running" title="Live" />);
    const dot = container.querySelector('span');
    expect(dot?.getAttribute('aria-label')).toBe('running');
    expect(dot?.getAttribute('title')).toBe('Live');
  });
});

describe('MetaGrid / MetaRow', () => {
  it('renders as a <dl> with <dt>/<dd> row children', () => {
    const { container, getByText } = render(
      <MetaGrid>
        <MetaRow k="tier" v="owner" />
        <MetaRow k="apps" v="3 of 3" />
      </MetaGrid>,
    );
    const dl = container.querySelector('dl');
    expect(dl).not.toBeNull();
    const dts = container.querySelectorAll('dt');
    const dds = container.querySelectorAll('dd');
    expect(dts.length).toBe(2);
    expect(dds.length).toBe(2);
    expect(getByText('tier').tagName).toBe('DT');
    expect(getByText('owner').tagName).toBe('DD');
    expect(getByText('3 of 3').tagName).toBe('DD');
  });

  it('styles the key with subtle-foreground and uppercase tracking', () => {
    const { getByText } = render(
      <MetaGrid>
        <MetaRow k="code" v="valid" />
      </MetaGrid>,
    );
    const dt = getByText('code');
    expect(dt.className).toContain('text-text-dim');
    expect(dt.className).toContain('uppercase');
  });

  it('forwards className to the MetaRow wrapper', () => {
    const { container } = render(
      <MetaGrid>
        <MetaRow k="a" v="b" className="custom-row" />
      </MetaGrid>,
    );
    const row = container.querySelector('.custom-row');
    expect(row).not.toBeNull();
  });
});

describe('AppCard', () => {
  it('renders as an <a> when href is provided', () => {
    const { getByRole } = render(
      <AppCard href="/x" title="Admin" description="Platform admin." />,
    );
    const link = getByRole('link');
    expect(link.tagName).toBe('A');
    expect(link.getAttribute('href')).toBe('/x');
  });

  it('renders as a <button> when only onClick is provided', () => {
    const onClick = vi.fn();
    const { getByRole } = render(
      <AppCard title="Admin" description="Platform admin." onClick={onClick} />,
    );
    const btn = getByRole('button');
    expect(btn.tagName).toBe('BUTTON');
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('falls back to a <div> when neither href nor onClick is provided', () => {
    const { getByText } = render(<AppCard title="Static" description="No link." />);
    const card = getByText('Static').closest('[data-size], div');
    expect(card?.tagName).toBe('DIV');
  });

  it('renders the default "enter →" arrow in the foot', () => {
    const { getByText } = render(
      <AppCard href="/x" title="Admin" description="Platform admin." meta="v0.2" />,
    );
    expect(getByText('enter →')).toBeDefined();
    expect(getByText('v0.2')).toBeDefined();
  });

  it('allows overriding the arrow text', () => {
    const { getByText } = render(
      <AppCard href="/x" title="Admin" description="d" arrow="open" />,
    );
    expect(getByText('open')).toBeDefined();
  });

  it('renders the visual in the top slot', () => {
    const { getByTestId } = render(
      <AppCard
        href="/x"
        title="Admin"
        description="d"
        visual={<div data-testid="visual-probe">visual</div>}
      />,
    );
    expect(getByTestId('visual-probe').textContent).toBe('visual');
  });

  it('renders the visualMark when provided', () => {
    const { getByText } = render(
      <AppCard href="/x" title="Portfolio" description="d" visualMark="rs." />,
    );
    expect(getByText('rs.')).toBeDefined();
  });

  it('applies data-accent when accent is set', () => {
    const { container } = render(
      <AppCard href="/x" title="Admin" description="d" accent="fsgb" />,
    );
    const card = container.querySelector('[data-accent]');
    expect(card?.getAttribute('data-accent')).toBe('fsgb');
  });

  it('applies data-size="featured" when featured is true', () => {
    const { container } = render(
      <AppCard href="/x" title="Portfolio" description="d" featured />,
    );
    const card = container.querySelector('[data-size]');
    expect(card?.getAttribute('data-size')).toBe('featured');
  });

  it('forces a <div> with aria-disabled when placeholder is true', () => {
    const { container } = render(
      <AppCard
        href="/should-be-ignored"
        onClick={() => {}}
        title="Canopy"
        description="soon."
        placeholder
      />,
    );
    const card = container.querySelector('[aria-disabled="true"]');
    expect(card).not.toBeNull();
    expect(card?.tagName).toBe('DIV');
    expect(container.querySelector('a')).toBeNull();
    expect(container.querySelector('button')).toBeNull();
  });

  it('renders "not yet available" meta and hides the arrow when placeholder', () => {
    const { getByText, queryByText } = render(
      <AppCard title="Canopy" description="soon." placeholder meta="ignored" />,
    );
    expect(getByText('not yet available')).toBeDefined();
    expect(queryByText('enter →')).toBeNull();
    expect(queryByText('ignored')).toBeNull();
  });

  it('renders the status dot matching the status prop', () => {
    const { container } = render(
      <AppCard href="/x" title="Template" description="d" status="dev" />,
    );
    const dot = container.querySelector('[data-status]');
    expect(dot?.getAttribute('data-status')).toBe('dev');
  });

  it('defaults the status dot to live', () => {
    const { container } = render(<AppCard href="/x" title="x" description="d" />);
    const dot = container.querySelector('[data-status]');
    expect(dot?.getAttribute('data-status')).toBe('live');
  });

  it('renders tags when provided', () => {
    const { getByText } = render(
      <AppCard
        href="/x"
        title="Admin"
        description="d"
        tags={
          <>
            <span>ts</span>
            <span>postgres</span>
          </>
        }
      />,
    );
    expect(getByText('ts')).toBeDefined();
    expect(getByText('postgres')).toBeDefined();
  });
});

describe('AppGrid', () => {
  it('renders a <section> with the grid class', () => {
    const { container } = render(
      <AppGrid>
        <div data-testid="a">a</div>
        <div data-testid="b">b</div>
      </AppGrid>,
    );
    const section = container.querySelector('section');
    expect(section).not.toBeNull();
    expect(section?.className).toContain('grid');
  });

  it('renders children verbatim', () => {
    const { getByTestId } = render(
      <AppGrid>
        <div data-testid="child">ok</div>
      </AppGrid>,
    );
    expect(getByTestId('child').textContent).toBe('ok');
  });
});

describe('Changelog / ChangelogItem', () => {
  it('renders as an <ol>', () => {
    const { container } = render(
      <Changelog>
        <ChangelogItem accent="teal" app="portfolio" when="2d">
          one
        </ChangelogItem>
      </Changelog>,
    );
    const ol = container.querySelector('ol');
    expect(ol).not.toBeNull();
  });

  it('renders each item with an accent-bearing dot, app label, message and when', () => {
    const { container, getByText } = render(
      <Changelog>
        <ChangelogItem accent="fsgb" app="admin" when="5h">
          Audit log — per-session filter.
        </ChangelogItem>
      </Changelog>,
    );
    expect(getByText('admin')).toBeDefined();
    expect(getByText('Audit log — per-session filter.')).toBeDefined();
    expect(getByText('5h')).toBeDefined();
    const dot = container.querySelector('[data-accent="fsgb"]');
    expect(dot).not.toBeNull();
  });

  it('renders multiple items as <li> siblings', () => {
    const { container } = render(
      <Changelog>
        <ChangelogItem accent="teal" app="portfolio" when="2d">
          a
        </ChangelogItem>
        <ChangelogItem accent="mono" app="template" when="3w">
          b
        </ChangelogItem>
      </Changelog>,
    );
    const items = container.querySelectorAll('li');
    expect(items.length).toBe(2);
  });
});

describe('BarGrid', () => {
  it('renders seven bars by default', () => {
    const { container } = render(<BarGrid />);
    const bars = container.querySelectorAll('[data-bar-index]');
    expect(bars.length).toBe(7);
  });

  it('renders a bar per entry in the bars array', () => {
    const { container } = render(<BarGrid bars={[10, 20, 30, 40]} />);
    const bars = container.querySelectorAll('[data-bar-index]');
    expect(bars.length).toBe(4);
  });

  it('sets bar height from the input percentage', () => {
    const { container } = render(<BarGrid bars={[25, 75]} animate={false} />);
    const bars = container.querySelectorAll<HTMLDivElement>('[data-bar-index]');
    expect(bars[0].style.height).toBe('25%');
    expect(bars[1].style.height).toBe('75%');
  });

  it('emits the bar-rise keyframes in an inline style block', () => {
    const { container } = render(<BarGrid />);
    const styleTag = container.querySelector('style');
    expect(styleTag?.textContent).toContain('@keyframes bar-rise');
  });
});

describe('MonoMark', () => {
  it('renders four corner brackets', () => {
    const { container } = render(<MonoMark letter="N" />);
    const corners = container.querySelectorAll('[data-corner]');
    expect(corners.length).toBe(4);
    const positions = Array.from(corners).map((c) => c.getAttribute('data-corner'));
    expect(positions).toEqual(expect.arrayContaining(['tl', 'tr', 'bl', 'br']));
  });

  it('renders the centered letter', () => {
    const { getByText } = render(<MonoMark letter="N" />);
    expect(getByText('N')).toBeDefined();
  });

  it('renders without a letter when not provided', () => {
    const { container } = render(<MonoMark />);
    const corners = container.querySelectorAll('[data-corner]');
    expect(corners.length).toBe(4);
    expect(container.textContent).toBe('');
  });

  it('sizes the outer square at 72px for the md default', () => {
    const { container } = render(<MonoMark letter="N" />);
    const outer = container.firstChild as HTMLElement;
    expect(outer.style.width).toBe('72px');
    expect(outer.style.height).toBe('72px');
  });

  it('sizes the outer square at 48px for sm', () => {
    const { container } = render(<MonoMark letter="N" size="sm" />);
    const outer = container.firstChild as HTMLElement;
    expect(outer.style.width).toBe('48px');
    expect(outer.style.height).toBe('48px');
  });
});

describe('AsciiPanel', () => {
  it('renders as a <pre> with mono + brand-coloured text', () => {
    const { container } = render(<AsciiPanel>{'┌──┐\n│  │\n└──┘'}</AsciiPanel>);
    const pre = container.querySelector('pre');
    expect(pre).not.toBeNull();
    expect(pre?.className).toContain('font-mono');
    expect(pre?.className).toContain('text-accent');
    expect(pre?.className).toContain('bg-transparent');
    expect(pre?.textContent).toContain('┌──┐');
  });

  it('preserves whitespace via whitespace-pre', () => {
    const { container } = render(<AsciiPanel>  a  b  </AsciiPanel>);
    const pre = container.querySelector('pre');
    expect(pre?.className).toContain('whitespace-pre');
  });
});
