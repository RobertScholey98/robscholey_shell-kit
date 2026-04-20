import { createContext, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';

/** Configuration options for shell-kit. */
export interface ShellKitConfig {
  /** The origin of the shell application. Used for postMessage origin validation. */
  shellOrigin: string;
}

const LOCALHOST_ORIGIN_RE = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;

const ShellKitContext = createContext<ShellKitConfig | null>(null);

/** Props for the {@link ShellKitProvider} component. */
export interface ShellKitProviderProps {
  /** The shell-kit configuration for this sub-tree. */
  config: ShellKitConfig;
  /** Child components that will have access to the configuration. */
  children: ReactNode;
}

/**
 * Provides shell-kit configuration to descendant hooks and components.
 * Wrap your app once, near the root, with the shell origin for the current
 * environment.
 *
 * Also raises a browser `alert()` on mount when the configured `shellOrigin`
 * points at localhost while the page is running on a non-localhost origin —
 * that combination usually means `NEXT_PUBLIC_SHELL_ORIGIN` (or equivalent)
 * was unset at build time. postMessage cross-origin checks would fail
 * silently otherwise, which is how admin-in-iframe bugs slip through. The
 * alert is intentionally loud because the failure mode is otherwise invisible
 * except to developers watching the console.
 *
 * @param props - The provider props.
 * @returns A React element that provides shell-kit config to descendants.
 */
export function ShellKitProvider({ config, children }: ShellKitProviderProps): React.ReactElement {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const providedOrigin = new URL(config.shellOrigin).origin;
      const pageOrigin = window.location.origin;
      if (
        LOCALHOST_ORIGIN_RE.test(providedOrigin) &&
        !LOCALHOST_ORIGIN_RE.test(pageOrigin)
      ) {
        window.alert(
          `[shell-kit] shellOrigin is configured as "${providedOrigin}" but this page is served from "${pageOrigin}". ` +
            `This almost always means the shell origin env var was unset at build time. ` +
            `postMessage to the parent will be rejected by the browser.`,
        );
      }
    } catch {
      window.alert(`[shell-kit] shellOrigin "${config.shellOrigin}" is not a valid URL.`);
    }
    // Boot-time warning: check once on mount, not on every config change.
  }, []);

  return <ShellKitContext.Provider value={config}>{children}</ShellKitContext.Provider>;
}

/**
 * Returns the shell-kit configuration provided by the nearest
 * {@link ShellKitProvider} ancestor. Throws when called outside a provider.
 *
 * @returns The active shell-kit configuration.
 */
export function useShellKitConfig(): ShellKitConfig {
  const config = useContext(ShellKitContext);
  if (config === null) {
    throw new Error('useShellKitConfig must be used within a ShellKitProvider');
  }
  return config;
}
