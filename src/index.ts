// Configuration
export { configure, getConfig } from './config';
export type { ShellKitConfig } from './config';

// Types
export type {
  ShellUser,
  ShellTheme,
  ShellContextMessage,
  JWTRefreshMessage,
  SessionEndedMessage,
  NavigateToPathMessage,
  ThemeUpdateMessage,
  NavigateToShellMessage,
  JWTRefreshRequestMessage,
  RequestShellContextMessage,
  RouteChangeMessage,
  ThemeChangeMessage,
  ShellToChildMessage,
  ChildToShellMessage,
} from './types';

// Hooks
export { useShellContext } from './useShellContext';
export type { ShellContextState, NavigateToPathHandler } from './useShellContext';
export { useRouteSync } from './useRouteSync';
export { useAuthenticatedFetch } from './useAuthenticatedFetch';
export { useAuthenticatedQuery } from './useAuthenticatedQuery';
export type { AuthenticatedQueryOptions } from './useAuthenticatedQuery';

// Components
export { ShellBackButton } from './ShellBackButton';
export type { ShellBackButtonProps } from './ShellBackButton';
export { ShellQueryProvider } from './ShellQueryProvider';
export type { ShellQueryProviderProps } from './ShellQueryProvider';

// Utilities
export { navigateToShell } from './navigateToShell';
export { isInIframe } from './isInIframe';
