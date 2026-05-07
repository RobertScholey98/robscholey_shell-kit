// Pulls in Next's `RequestInit.next` augmentation so the `next.revalidate`
// option below typechecks. Shell-kit isn't a Next app so Next's generated
// `next-env.d.ts` (which normally references this file) doesn't exist here.
/// <reference types="next/types/global" />

import { appMetaSchema } from '@robscholey/contracts';
import type { Accent, ShellTheme } from '../messages';

/**
 * The minimal shape `<ShellRootLayout>` needs from the auth-microservice's
 * `/api/apps/:slug/meta` endpoint. Sub-apps that want the full `AppMeta`
 * shape (name, iconUrl, …) should fetch it themselves and parse against
 * `@robscholey/contracts`'s `appMetaSchema`.
 */
export interface AppThemingDefaults {
  /** Admin-configured default theme for this app, mirrored to `<html data-theme>`. */
  defaultTheme: ShellTheme;
  /** Admin-configured default accent for this app, mirrored to `<html data-accent>`. */
  defaultAccent: Accent;
}

/** Per-call override for the cosmetic fallback applied on fetch failure. */
export interface FetchAppMetaOptions {
  /** Theme to fall back to when the meta endpoint is unreachable. Defaults to `'dark'`. */
  fallbackTheme?: ShellTheme;
  /** Accent to fall back to when the meta endpoint is unreachable. Defaults to `'teal'`. */
  fallbackAccent?: Accent;
}

// Narrow `appMetaSchema` to the two fields the SSR root layout actually
// needs. Picking off the contracts schema means a new theme/accent enum
// value lands here without a code change — the schema is the single
// source of truth for the accepted enum sets.
const themingDefaultsSchema = appMetaSchema.pick({
  defaultTheme: true,
  defaultAccent: true,
});

/**
 * Resolves the auth-microservice base URL. Server-side prefers the
 * container-internal `AUTH_URL`; falls through to `NEXT_PUBLIC_AUTH_URL`
 * (browser-shared) and the `localhost:3001` dev default.
 */
function resolveAuthUrl(): string {
  const raw =
    typeof window === 'undefined'
      ? (process.env.AUTH_URL ?? process.env.NEXT_PUBLIC_AUTH_URL)
      : process.env.NEXT_PUBLIC_AUTH_URL;
  return raw ?? 'http://localhost:3001';
}

/**
 * SSR-side fetch for a sub-app's admin-configured theming defaults. Hits the
 * unauthenticated `/api/apps/:slug/meta` endpoint on the auth-microservice so
 * the root layout can render `<html data-theme>` / `<html data-accent>` with
 * the right values baked into the SSR HTML — no postMessage round-trip, no
 * flash on first paint.
 *
 * Cached for 60 s on the Next.js data layer so client-side route changes
 * within the sub-app don't re-hit the network. Falls soft on failure (cold
 * start, network, malformed body) and returns the supplied fallback pair —
 * layouts can't throw without breaking the page; a cosmetic default is
 * acceptable degradation.
 *
 * @param slug - The app id as registered in `appsConfig.json`.
 * @param options - Optional fallback overrides.
 * @returns The admin-configured theme + accent defaults, or the fallback pair.
 */
export async function fetchAppMeta(
  slug: string,
  options: FetchAppMetaOptions = {},
): Promise<AppThemingDefaults> {
  const fallback: AppThemingDefaults = {
    defaultTheme: options.fallbackTheme ?? 'dark',
    defaultAccent: options.fallbackAccent ?? 'teal',
  };
  try {
    const res = await fetch(`${resolveAuthUrl()}/api/apps/${encodeURIComponent(slug)}/meta`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      console.warn(
        `[shell-kit/next] /apps/${slug}/meta returned ${res.status}; falling back to ${fallback.defaultTheme}/${fallback.defaultAccent}`,
      );
      return fallback;
    }
    const body: unknown = await res.json();
    const parsed = themingDefaultsSchema.safeParse(body);
    if (!parsed.success) {
      console.warn(
        `[shell-kit/next] /apps/${slug}/meta body failed schema validation; falling back to ${fallback.defaultTheme}/${fallback.defaultAccent}`,
      );
      return fallback;
    }
    return parsed.data;
  } catch (err) {
    console.warn(
      `[shell-kit/next] /apps/${slug}/meta failed (${err instanceof Error ? err.message : 'unknown'}); falling back to ${fallback.defaultTheme}/${fallback.defaultAccent}`,
    );
    return fallback;
  }
}
