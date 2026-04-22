import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { Tag } from '@/ui/components/tag';
import { Kbd } from '@/ui/components/kbd';
import { SessionPill } from '@/ui/components/session-pill';
import { ProjectCard } from '@/ui/components/project-card';
import { CodePanel } from '@/ui/components/code-panel';
import { Diagram, DiagramAccent, DiagramWarm, DiagramDim } from '@/ui/components/diagram';

describe('Tag', () => {
  it('renders the default variant with neutral classes', () => {
    const { getByText } = render(<Tag>ts</Tag>);
    const el = getByText('ts');
    expect(el.tagName).toBe('SPAN');
    expect(el.className).toContain('bg-surface-2');
    expect(el.className).toContain('text-text-muted');
  });

  it('applies accent variant classes', () => {
    const { getByText } = render(<Tag variant="accent">react</Tag>);
    expect(getByText('react').className).toContain('text-accent');
  });

  it('applies warm variant classes', () => {
    const { getByText } = render(<Tag variant="warm">wip</Tag>);
    expect(getByText('wip').className).toContain('text-warm');
  });
});

describe('Kbd', () => {
  it('renders as a semantic <kbd> element', () => {
    const { getByText } = render(<Kbd>⌘K</Kbd>);
    const el = getByText('⌘K');
    expect(el.tagName).toBe('KBD');
    expect(el.className).toContain('font-mono');
    expect(el.className).toContain('border-b-2');
  });
});

describe('SessionPill', () => {
  it('renders the default status with a brand dot', () => {
    const { container, getByText } = render(<SessionPill>teal / dark</SessionPill>);
    expect(getByText('teal / dark')).toBeDefined();
    const dot = container.querySelector('[data-status]');
    expect(dot).not.toBeNull();
    expect(dot?.getAttribute('data-status')).toBe('default');
    expect(dot?.className).toContain('bg-accent');
  });

  it('renders the paused status with a warm dot', () => {
    const { container } = render(<SessionPill status="paused">draft</SessionPill>);
    const dot = container.querySelector('[data-status]');
    expect(dot?.getAttribute('data-status')).toBe('paused');
    expect(dot?.className).toContain('bg-warm');
  });

  it('renders the active status with a brand dot', () => {
    const { container } = render(<SessionPill status="active">live</SessionPill>);
    const dot = container.querySelector('[data-status]');
    expect(dot?.getAttribute('data-status')).toBe('active');
    expect(dot?.className).toContain('bg-accent');
  });
});

describe('ProjectCard', () => {
  it('renders title, status, description, tags and arrow', () => {
    const { getByText, getByRole } = render(
      <ProjectCard
        href="/canopy"
        title="Canopy"
        status="Live · 2026"
        statusVariant="live"
        description="Headless content layer."
        tags={
          <>
            <Tag>ts</Tag>
            <Tag variant="accent">react</Tag>
          </>
        }
        arrow="Read more"
      />,
    );
    const link = getByRole('link');
    expect(link.tagName).toBe('A');
    expect(link.getAttribute('href')).toBe('/canopy');
    expect(getByText('Canopy')).toBeDefined();
    expect(getByText('Live · 2026')).toBeDefined();
    expect(getByText('Headless content layer.')).toBeDefined();
    expect(getByText('ts')).toBeDefined();
    expect(getByText('react')).toBeDefined();
    expect(getByText('Read more')).toBeDefined();
  });

  it('renders as a <button> when only onClick is provided', () => {
    const onClick = vi.fn();
    const { getByRole } = render(
      <ProjectCard title="Demo" onClick={onClick} description="Test" />,
    );
    const btn = getByRole('button');
    expect(btn.tagName).toBe('BUTTON');
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('falls back to a <div> when neither href nor onClick is provided', () => {
    const { getByText } = render(<ProjectCard title="Static" description="No link" />);
    const title = getByText('Static');
    const card = title.closest('div');
    expect(card?.tagName).toBe('DIV');
  });

  it('applies hover-lift transform classes on the container', () => {
    const { getByRole } = render(<ProjectCard title="Canopy" href="/x" />);
    const link = getByRole('link');
    expect(link.className).toContain('hover:-translate-y-0.5');
    expect(link.className).toContain('hover:border-accent-dim');
  });

  it('renders children in place of description when both provided', () => {
    const { getByText, queryByText } = render(
      <ProjectCard title="Canopy" description="Fallback">
        <p>Custom body</p>
      </ProjectCard>,
    );
    expect(getByText('Custom body')).toBeDefined();
    expect(queryByText('Fallback')).toBeNull();
  });
});

describe('CodePanel', () => {
  it('renders tag, filename and body', () => {
    const { getByText, container } = render(
      <CodePanel tag="// shell" filename="message-bus.ts">
        export const x = 1;
      </CodePanel>,
    );
    expect(getByText('// shell')).toBeDefined();
    expect(getByText('message-bus.ts')).toBeDefined();
    const pre = container.querySelector('pre');
    expect(pre).not.toBeNull();
    expect(pre?.textContent).toContain('export const x = 1;');
    const code = pre?.querySelector('code');
    expect(code).not.toBeNull();
  });

  it('omits the head strip when neither filename nor tag is provided', () => {
    const { container } = render(<CodePanel>raw</CodePanel>);
    const head = container.querySelector('.bg-surface-2');
    expect(head).toBeNull();
    expect(container.querySelector('pre')?.textContent).toContain('raw');
  });

  it('applies the brand class to the tag only', () => {
    const { getByText } = render(
      <CodePanel tag="// shell" filename="file.ts">
        body
      </CodePanel>,
    );
    expect(getByText('// shell').className).toContain('text-accent');
    expect(getByText('file.ts').className).not.toContain('text-accent');
  });
});

describe('Diagram', () => {
  it('renders as a <pre> with mono + card-2 classes', () => {
    const { container } = render(<Diagram>{'hello'}</Diagram>);
    const pre = container.querySelector('pre');
    expect(pre).not.toBeNull();
    expect(pre?.className).toContain('font-mono');
    expect(pre?.className).toContain('bg-surface-2');
    expect(pre?.className).toContain('whitespace-pre');
  });

  it('renders accent / warm / dim helpers with the right colour classes', () => {
    const { getByText } = render(
      <Diagram>
        <DiagramAccent>shell</DiagramAccent>
        <DiagramWarm>warn</DiagramWarm>
        <DiagramDim>dim</DiagramDim>
      </Diagram>,
    );
    expect(getByText('shell').className).toContain('text-accent');
    expect(getByText('warn').className).toContain('text-warm');
    expect(getByText('dim').className).toContain('text-text-dim');
  });
});
