import { describe, it, expect, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { ThemeCandy } from '@/ThemeCandy';

beforeEach(() => {
  delete document.documentElement.dataset.theme;
  delete document.documentElement.dataset.accent;
});

describe('ThemeCandy', () => {
  it('renders a display-contents wrapper with data-accent', () => {
    const { container } = render(
      <ThemeCandy variant="warm">
        <span data-testid="child">child</span>
      </ThemeCandy>,
    );

    const wrapper = container.querySelector('[data-accent="warm"]');
    expect(wrapper).not.toBeNull();
    expect(wrapper?.classList.contains('contents')).toBe(true);
  });

  it('does not mutate <html>', () => {
    render(
      <ThemeCandy variant="fsgb">
        <span />
      </ThemeCandy>,
    );

    // Scope-local by design — cross-cutting shell chrome stays bound to
    // whatever accent the page-level <PageTheme> (or layout default) set.
    expect(document.documentElement.dataset.accent).toBeUndefined();
  });

  it('nests — nearest wrapper wins via CSS specificity', () => {
    const { getByText } = render(
      <ThemeCandy variant="fsgb">
        <ThemeCandy variant="betway">
          <span>inner</span>
        </ThemeCandy>
      </ThemeCandy>,
    );

    // The inner element is a descendant of both wrappers, but its
    // nearest ancestor with data-accent is the 'betway' one. CSS
    // [data-accent] rules resolve against the inherited cascade, so
    // any `[data-accent="betway"] *` rule applies to 'inner'.
    const inner = getByText('inner');
    const innerWrapper = inner.parentElement;
    expect(innerWrapper?.getAttribute('data-accent')).toBe('betway');
  });
});
