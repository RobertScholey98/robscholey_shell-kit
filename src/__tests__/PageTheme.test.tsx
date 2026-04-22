import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/react';
import type { ReactNode } from 'react';
import { PageTheme } from '@/PageTheme';
import { ShellKitProvider } from '@/ShellKitProvider';
import { PROTOCOL_VERSION } from '@/messages';

const SHELL_ORIGIN = 'https://shell.test';

/** Provider wrapper used only by tests that need to exercise the postMessage origin path. */
function WithProvider({ children }: { children: ReactNode }) {
  return <ShellKitProvider config={{ shellOrigin: SHELL_ORIGIN }}>{children}</ShellKitProvider>;
}

beforeEach(() => {
  delete document.documentElement.dataset.theme;
  delete document.documentElement.dataset.accent;
  window.localStorage.clear();
  // Default to not-in-iframe so PageTheme doesn't try to postMessage
  // unless a specific test opts in.
  Object.defineProperty(window, 'top', { value: window, configurable: true });
  Object.defineProperty(window, 'parent', { value: window, configurable: true });
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('PageTheme', () => {
  it('mirrors variant + theme onto <html> on mount', () => {
    document.documentElement.dataset.accent = 'warm';
    document.documentElement.dataset.theme = 'dark';

    render(
      <PageTheme variant="betway" theme="light">
        <span />
      </PageTheme>,
    );

    expect(document.documentElement.dataset.accent).toBe('betway');
    expect(document.documentElement.dataset.theme).toBe('light');
  });

  it('renders a display-contents wrapper with the data-attrs', () => {
    const { container } = render(
      <PageTheme variant="warm">
        <span data-testid="child">child</span>
      </PageTheme>,
    );

    const wrapper = container.querySelector('[data-accent="warm"]');
    expect(wrapper).not.toBeNull();
    expect(wrapper?.classList.contains('contents')).toBe(true);
  });

  it('restores the previous <html> values on unmount', () => {
    document.documentElement.dataset.accent = 'warm';
    document.documentElement.dataset.theme = 'dark';

    const { unmount } = render(
      <PageTheme variant="betway">
        <span />
      </PageTheme>,
    );
    expect(document.documentElement.dataset.accent).toBe('betway');

    unmount();
    expect(document.documentElement.dataset.accent).toBe('warm');
    expect(document.documentElement.dataset.theme).toBe('dark');
  });

  it('is a no-op when neither variant nor theme is set', () => {
    document.documentElement.dataset.accent = 'warm';
    const postMessageSpy = vi.spyOn(window.parent, 'postMessage');

    render(
      <PageTheme>
        <span />
      </PageTheme>,
    );

    // html stays exactly what the layout rendered — PageTheme doesn't
    // touch it when both props are absent.
    expect(document.documentElement.dataset.accent).toBe('warm');
    // And no page-theme message is sent.
    const pageThemeCalls = postMessageSpy.mock.calls.filter(
      (call) =>
        typeof call[0] === 'object' &&
        call[0] !== null &&
        (call[0] as { type?: string }).type === 'page-theme',
    );
    expect(pageThemeCalls).toHaveLength(0);
  });

  it('posts a page-theme message to the shell when inside an iframe', () => {
    const parent = { postMessage: vi.fn() } as unknown as Window;
    Object.defineProperty(window, 'top', { value: parent, configurable: true });
    Object.defineProperty(window, 'parent', { value: parent, configurable: true });

    render(
      <WithProvider>
        <PageTheme variant="fsgb" theme="light">
          <span />
        </PageTheme>
      </WithProvider>,
    );

    const pageThemeCalls = (parent.postMessage as ReturnType<typeof vi.fn>).mock.calls.filter(
      (call) =>
        typeof call[0] === 'object' &&
        call[0] !== null &&
        (call[0] as { type?: string }).type === 'page-theme',
    );
    expect(pageThemeCalls).toHaveLength(1);
    expect(pageThemeCalls[0]).toEqual([
      {
        type: 'page-theme',
        protocolVersion: PROTOCOL_VERSION,
        theme: 'light',
        accent: 'fsgb',
      },
      SHELL_ORIGIN,
    ]);
  });

  it('does not post when outside an iframe', () => {
    const postMessageSpy = vi.spyOn(window.parent, 'postMessage');

    render(
      <WithProvider>
        <PageTheme variant="rose">
          <span />
        </PageTheme>
      </WithProvider>,
    );

    const pageThemeCalls = postMessageSpy.mock.calls.filter(
      (call) =>
        typeof call[0] === 'object' &&
        call[0] !== null &&
        (call[0] as { type?: string }).type === 'page-theme',
    );
    expect(pageThemeCalls).toHaveLength(0);
  });

  it('does not post when rendered outside a ShellKitProvider', () => {
    // No provider → no shellOrigin → no postMessage, even if somehow in an iframe.
    const parent = { postMessage: vi.fn() } as unknown as Window;
    Object.defineProperty(window, 'top', { value: parent, configurable: true });
    Object.defineProperty(window, 'parent', { value: parent, configurable: true });

    render(
      <PageTheme variant="rose">
        <span />
      </PageTheme>,
    );

    expect((parent.postMessage as ReturnType<typeof vi.fn>).mock.calls).toHaveLength(0);
    // But html is still mirrored — the CSS-cascade half works without a provider.
    expect(document.documentElement.dataset.accent).toBe('rose');
  });

  it('nests — later-mounted inner PageTheme wins while mounted, outer restored on inner unmount', () => {
    function Harness({ show }: { show: boolean }) {
      return (
        <PageTheme variant="fsgb">
          <span>outer</span>
          {show ? (
            <PageTheme variant="betway">
              <span>inner</span>
            </PageTheme>
          ) : null}
        </PageTheme>
      );
    }

    const { rerender } = render(<Harness show={false} />);
    expect(document.documentElement.dataset.accent).toBe('fsgb');

    rerender(<Harness show={true} />);
    // Inner mounted after outer — its html write lands later, so it wins.
    expect(document.documentElement.dataset.accent).toBe('betway');

    rerender(<Harness show={false} />);
    // Inner unmounted — its restore reinstates what <html> had right
    // before inner mounted, which was outer's 'fsgb' write.
    expect(document.documentElement.dataset.accent).toBe('fsgb');
  });
});
