import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchAppMeta } from '../next/fetchAppMeta';

describe('fetchAppMeta', () => {
  const originalFetch = global.fetch;
  const originalAuthUrl = process.env.AUTH_URL;
  const originalNextPublicAuthUrl = process.env.NEXT_PUBLIC_AUTH_URL;

  beforeEach(() => {
    // Set both vars: the resolver picks the server-side `AUTH_URL` when
    // `typeof window === 'undefined'`, otherwise the public mirror. Vitest
    // runs under jsdom (window defined), so `NEXT_PUBLIC_AUTH_URL` is the
    // one actually consulted here — covering it explicitly keeps the test
    // honest if the env-resolution branches change.
    process.env.AUTH_URL = 'http://auth.test';
    process.env.NEXT_PUBLIC_AUTH_URL = 'http://auth.test';
  });

  afterEach(() => {
    global.fetch = originalFetch;
    process.env.AUTH_URL = originalAuthUrl;
    process.env.NEXT_PUBLIC_AUTH_URL = originalNextPublicAuthUrl;
    vi.restoreAllMocks();
  });

  it('hits the configured auth URL with the slug-encoded path', async () => {
    const mock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ defaultTheme: 'dark', defaultAccent: 'warm' }),
    });
    global.fetch = mock as unknown as typeof fetch;

    await fetchAppMeta('portfolio');

    expect(mock).toHaveBeenCalledWith(
      'http://auth.test/api/apps/portfolio/meta',
      expect.objectContaining({ next: { revalidate: 60 } }),
    );
  });

  it('encodes slugs with reserved characters', async () => {
    const mock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ defaultTheme: 'dark', defaultAccent: 'teal' }),
    });
    global.fetch = mock as unknown as typeof fetch;

    await fetchAppMeta('weird/slug');

    expect(mock).toHaveBeenCalledWith(
      'http://auth.test/api/apps/weird%2Fslug/meta',
      expect.anything(),
    );
  });

  it('returns the parsed body when the response is well-formed', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ defaultTheme: 'light', defaultAccent: 'rose' }),
    }) as unknown as typeof fetch;

    const result = await fetchAppMeta('portfolio');

    expect(result).toEqual({ defaultTheme: 'light', defaultAccent: 'rose' });
  });

  it('falls back to the default pair on a non-2xx response', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({}),
    }) as unknown as typeof fetch;

    const result = await fetchAppMeta('portfolio');

    expect(result).toEqual({ defaultTheme: 'dark', defaultAccent: 'teal' });
  });

  it('falls back when the network call rejects', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    global.fetch = vi.fn().mockRejectedValue(new Error('ECONNREFUSED')) as unknown as typeof fetch;

    const result = await fetchAppMeta('portfolio');

    expect(result).toEqual({ defaultTheme: 'dark', defaultAccent: 'teal' });
  });

  it('honours per-call fallback overrides', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    global.fetch = vi.fn().mockRejectedValue(new Error('boom')) as unknown as typeof fetch;

    const result = await fetchAppMeta('admin', {
      fallbackTheme: 'light',
      fallbackAccent: 'fsgb',
    });

    expect(result).toEqual({ defaultTheme: 'light', defaultAccent: 'fsgb' });
  });

  it('rejects unknown enum values from the server and falls back per-field', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ defaultTheme: 'sepia', defaultAccent: 'lime' }),
    }) as unknown as typeof fetch;

    const result = await fetchAppMeta('portfolio', {
      fallbackTheme: 'dark',
      fallbackAccent: 'mono',
    });

    expect(result).toEqual({ defaultTheme: 'dark', defaultAccent: 'mono' });
  });

  it('falls back to defaults when the response body has invalid enum values', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ defaultTheme: 'sepia', defaultAccent: 'pink' }),
    }) as unknown as typeof fetch;

    const result = await fetchAppMeta('portfolio');

    expect(result).toEqual({ defaultTheme: 'dark', defaultAccent: 'teal' });
  });
});
