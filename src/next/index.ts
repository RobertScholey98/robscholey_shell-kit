// `@robscholey/shell-kit/next` — Next.js App Router helpers that hide the
// per-app boilerplate (SSR meta fetch, root layout chrome) so a new sub-app's
// only per-app surface is its `Dockerfile`, its `appsConfig.json` entry, and
// its actual pages.
//
// Server-only helpers live here directly; the client pair (`<ShellProvider>`,
// `useShell`) is re-exported from the sibling `./client` subpath, which
// carries the `'use client'` directive on its own bundle so Next can
// establish the client boundary correctly when the server-side
// `<ShellRootLayout>` composes `<ShellProvider>` internally.

// Server-side helpers — direct exports, bundled into this entry.
export { fetchAppMeta } from './fetchAppMeta';
export type { AppThemingDefaults, FetchAppMetaOptions } from './fetchAppMeta';

export { ShellRootLayout } from './ShellRootLayout';
export type { ShellRootLayoutProps, ShellFontVariable } from './ShellRootLayout';

// Client surface — re-exported via the package's own subpath so tsup keeps
// it as a runtime import (kept external in tsup.config.ts) instead of
// inlining the implementation, which would strip the `'use client'`
// directive from the served bundle.
export { ShellProvider, useShell } from '@robscholey/shell-kit/next/client';
export type { ShellProviderProps } from '@robscholey/shell-kit/next/client';
