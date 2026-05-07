'use client';

import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { ShellKitProvider } from '../ShellKitProvider';
import { useShellContext } from '../useShellContext';
import type { ShellContextState } from '../useShellContext';
import { useRouteSync } from '../useRouteSync';

const Ctx = createContext<ShellContextState | null>(null);

/** Props for {@link ShellProvider}. */
export interface ShellProviderProps {
  children: ReactNode;
  /**
   * Override for the shell's origin. Defaults to
   * `process.env.NEXT_PUBLIC_SHELL_ORIGIN` (set per app at build time) and
   * falls back to `http://localhost:3000` for the default dev shell port.
   */
  shellOrigin?: string;
}

/**
 * The standard sub-app shell-kit wiring promoted out of every per-app
 * `components/ShellProvider.tsx`. Composes:
 *
 *   1. `<ShellKitProvider>` with the shell origin env var.
 *   2. `useShellContext(...)` to drain the postMessage protocol — the
 *      callback routes the sub-app on `navigate-to-path` (browser
 *      back / forward in the shell).
 *   3. `useRouteSync()` to mirror sub-app navigation back up to the shell
 *      so the URL bar stays bookmarkable.
 *   4. A React context that exposes the resulting {@link ShellContextState}
 *      to anything beneath via {@link useShell}.
 *
 * Sub-apps render this once near the root of their `<body>`. The
 * surrounding `<ShellRootLayout>` already does that — bare consumers only
 * mount `<ShellProvider>` directly when composing a custom layout.
 */
export function ShellProvider({ children, shellOrigin }: ShellProviderProps) {
  const resolvedOrigin =
    shellOrigin ?? process.env.NEXT_PUBLIC_SHELL_ORIGIN ?? 'http://localhost:3000';
  return (
    <ShellKitProvider config={{ shellOrigin: resolvedOrigin }}>
      <ShellProviderInner>{children}</ShellProviderInner>
    </ShellKitProvider>
  );
}

// `ShellProviderInner` is split from `ShellProvider` so its hooks
// (`useShellContext`, `useRouteSync`) resolve against the surrounding
// `<ShellKitProvider>` rendered above. Inlining the body would call those
// hooks at the same level as the provider element — the context would be
// `null` on first render and `useShellKitConfig()` would throw.
function ShellProviderInner({ children }: { children: ReactNode }) {
  const router = useRouter();
  const shell = useShellContext((path) => {
    router.push(path || '/');
  });
  useRouteSync();
  return <Ctx.Provider value={shell}>{children}</Ctx.Provider>;
}

/**
 * Returns the shell context state (user, JWT, embedded status, …).
 *
 * Throws when called outside a {@link ShellProvider} subtree — typically
 * indicates the caller forgot to mount `<ShellRootLayout>` or `<ShellProvider>`
 * at the app root.
 */
export function useShell(): ShellContextState {
  const ctx = useContext(Ctx);
  if (!ctx) {
    throw new Error('useShell must be used within a <ShellProvider>');
  }
  return ctx;
}
