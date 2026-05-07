/**
 * Default polling deadline for {@link waitForJwtChange}, in milliseconds.
 * After this elapses without the getter changing, the helper resolves to null.
 */
export const JWT_CHANGE_TIMEOUT_MS = 2000;

/**
 * Default per-poll wait for {@link waitForJwtChange}, in milliseconds.
 * The helper rechecks the getter after this delay between polls.
 */
export const JWT_CHANGE_POLL_INTERVAL_MS = 50;

/**
 * Options controlling {@link waitForJwtChange}.
 *
 * The helper is plain TypeScript with no React dependency: callers adapt
 * their state source (refs, atoms, observables) into the supplied getter
 * and cancellation predicate.
 */
export interface WaitForJwtChangeOptions {
  /** Reads the current JWT. Polled until it differs from `previous`. */
  getter: () => string | null;
  /** Returns true if the caller has lost interest (e.g. component unmounted). */
  cancelled: () => boolean;
  /** Schedules `fn` after `ms` milliseconds. Default: setTimeout-backed. */
  schedule?: (ms: number, fn: () => void) => () => void;
  /** Returns the current millisecond clock reading. Default: Date.now. */
  clock?: () => number;
  /** Total polling deadline. Defaults to {@link JWT_CHANGE_TIMEOUT_MS}. */
  timeoutMs?: number;
  /** Per-poll wait. Defaults to {@link JWT_CHANGE_POLL_INTERVAL_MS}. */
  pollIntervalMs?: number;
}

/**
 * Polls a getter for a JWT value change within a timeout.
 *
 * Resolves with the new value as soon as `getter()` returns something other
 * than `previous`. Resolves with `null` if the cancellation predicate becomes
 * true or the timeout elapses without a change.
 *
 * @param previous - The JWT value to compare against. Polling continues while
 * the getter keeps returning this value.
 * @param options - Getter, cancellation predicate, and optional schedule /
 * clock / timing overrides.
 * @returns A promise resolving to the new JWT value, or `null` on cancellation
 * or timeout.
 */
export async function waitForJwtChange(
  previous: string,
  options: WaitForJwtChangeOptions,
): Promise<string | null> {
  const {
    getter,
    cancelled,
    schedule = defaultSchedule,
    clock = Date.now,
    timeoutMs = JWT_CHANGE_TIMEOUT_MS,
    pollIntervalMs = JWT_CHANGE_POLL_INTERVAL_MS,
  } = options;

  return new Promise((resolve) => {
    const start = clock();

    function poll(): void {
      if (cancelled()) {
        resolve(null);
        return;
      }
      const current = getter();
      if (current !== previous) {
        resolve(current);
        return;
      }
      if (clock() - start > timeoutMs) {
        resolve(null);
        return;
      }
      schedule(pollIntervalMs, poll);
    }

    poll();
  });
}

function defaultSchedule(ms: number, fn: () => void): () => void {
  const handle = setTimeout(fn, ms);
  return () => clearTimeout(handle);
}
