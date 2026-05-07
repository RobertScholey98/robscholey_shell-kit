import { describe, it, expect } from 'vitest';
import { waitForJwtChange } from '@/util/waitForJwtChange';

describe('waitForJwtChange', () => {
  it('resolves to the new value when the getter changes between polls', async () => {
    const values = ['old', 'old', 'new'];
    let index = 0;
    const getter = (): string | null => values[index++] ?? 'new';

    const result = await waitForJwtChange('old', {
      getter,
      cancelled: () => false,
      schedule: (_ms, fn) => {
        fn();
        return () => {};
      },
      clock: () => 0,
    });

    expect(result).toBe('new');
  });

  it('resolves to null when cancelled() becomes true between polls', async () => {
    let pollCount = 0;
    const getter = (): string => 'old';
    const cancelled = (): boolean => pollCount++ >= 2;

    const result = await waitForJwtChange('old', {
      getter,
      cancelled,
      schedule: (_ms, fn) => {
        fn();
        return () => {};
      },
      clock: () => 0,
    });

    expect(result).toBeNull();
  });

  it('resolves to null when the timeout elapses without a getter change', async () => {
    let now = 0;
    const clock = (): number => now;
    const getter = (): string => 'old';

    const result = await waitForJwtChange('old', {
      getter,
      cancelled: () => false,
      schedule: (ms, fn) => {
        now += ms;
        fn();
        return () => {};
      },
      clock,
      timeoutMs: 100,
      pollIntervalMs: 25,
    });

    expect(result).toBeNull();
  });

  it('resolves to null immediately when cancelled() is true on first call', async () => {
    let scheduleCalls = 0;

    const result = await waitForJwtChange('old', {
      getter: () => 'old',
      cancelled: () => true,
      schedule: (_ms, fn) => {
        scheduleCalls++;
        fn();
        return () => {};
      },
      clock: () => 0,
    });

    expect(result).toBeNull();
    expect(scheduleCalls).toBe(0);
  });

  it('resolves immediately with the current value when the getter already differs', async () => {
    let scheduleCalls = 0;

    const result = await waitForJwtChange('old', {
      getter: () => 'new',
      cancelled: () => false,
      schedule: (_ms, fn) => {
        scheduleCalls++;
        fn();
        return () => {};
      },
      clock: () => 0,
    });

    expect(result).toBe('new');
    expect(scheduleCalls).toBe(0);
  });
});
