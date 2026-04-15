/** Configuration options for shell-kit. */
export interface ShellKitConfig {
  /** The origin of the shell application. Used for postMessage origin validation. */
  shellOrigin: string;
}

const DEFAULT_CONFIG: ShellKitConfig = {
  shellOrigin: 'https://robscholey.com',
};

let currentConfig: ShellKitConfig = { ...DEFAULT_CONFIG };

/**
 * Configures shell-kit with custom settings. Call once at app startup.
 * @param config - Partial configuration; unset fields retain defaults.
 */
export function configure(config: Partial<ShellKitConfig>): void {
  currentConfig = { ...currentConfig, ...config };
}

/**
 * Returns the current shell-kit configuration.
 * @returns The active configuration object.
 */
export function getConfig(): ShellKitConfig {
  return currentConfig;
}

/** Resets configuration to defaults. Test-only — not part of the public API. */
export function _testResetConfig(): void {
  currentConfig = { ...DEFAULT_CONFIG };
}
