import { describe, it, expect, vi, beforeEach } from 'vitest';
import { navigateToShell } from '@/navigateToShell';
import { configure, _testResetConfig } from '@/config';

beforeEach(() => {
  _testResetConfig();
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

    configure({ shellOrigin: 'https://robscholey.com' });
    navigateToShell();

    expect(postMessageSpy).toHaveBeenCalledWith(
      { type: 'navigate-to-shell' },
      'https://robscholey.com',
    );

    // Restore
    Object.defineProperty(window, 'top', { value: window, configurable: true });
    Object.defineProperty(window, 'parent', { value: window, configurable: true });
  });

  it('does nothing when not in iframe', () => {
    Object.defineProperty(window, 'top', { value: window, configurable: true });
    const postMessageSpy = vi.spyOn(window.parent, 'postMessage');

    navigateToShell();

    expect(postMessageSpy).not.toHaveBeenCalled();
  });
});
