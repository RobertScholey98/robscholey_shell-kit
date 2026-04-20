import { describe, it, expect, vi, beforeEach } from 'vitest';
import { navigateToShell } from '@/navigateToShell';

const SHELL_ORIGIN = 'https://robscholey.com';

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('navigateToShell', () => {
  it('sends navigate-to-shell postMessage when in iframe', () => {
    const postMessageSpy = vi.fn();
    Object.defineProperty(window, 'top', { value: {}, configurable: true });
    Object.defineProperty(window, 'parent', {
      value: { postMessage: postMessageSpy },
      configurable: true,
    });

    navigateToShell(SHELL_ORIGIN);

    expect(postMessageSpy).toHaveBeenCalledWith({ type: 'navigate-to-shell' }, SHELL_ORIGIN);

    // Restore
    Object.defineProperty(window, 'top', { value: window, configurable: true });
    Object.defineProperty(window, 'parent', { value: window, configurable: true });
  });

  it('does nothing when not in iframe', () => {
    Object.defineProperty(window, 'top', { value: window, configurable: true });
    const postMessageSpy = vi.spyOn(window.parent, 'postMessage');

    navigateToShell(SHELL_ORIGIN);

    expect(postMessageSpy).not.toHaveBeenCalled();
  });
});
