// Shell-kit configuration. Theme + accent ownership moved out of the
// provider in Phase I.6 — pages declare via <PageTheme> / <ThemeCandy>,
// sub-app layouts render the admin-configured default into <html data-*>.
export { ShellKitProvider, useShellKitConfig } from './ShellKitProvider';
export type { ShellKitConfig, ShellKitProviderProps } from './ShellKitProvider';

// Page + subtree theming primitives. Pages declare their accent + theme
// in markup; these express the contract through the React tree.
export { PageTheme } from './PageTheme';
export type { PageThemeProps } from './PageTheme';
export { ThemeCandy } from './ThemeCandy';
export type { ThemeCandyProps } from './ThemeCandy';

// Protocol version and message parsers
export { PROTOCOL_VERSION, parseShellMessage, parseChildMessage, ACCENTS } from './messages';

// Message schemas (exported so consumers can compose / validate externally if needed)
export {
  shellUserSchema,
  shellThemeSchema,
  accentSchema,
  shellContextMessageSchema,
  jwtRefreshMessageSchema,
  sessionEndedMessageSchema,
  navigateToPathMessageSchema,
  navigateToShellMessageSchema,
  jwtRefreshRequestMessageSchema,
  requestShellContextMessageSchema,
  routeChangeMessageSchema,
  pageThemeMessageSchema,
  shellToChildMessageSchema,
  childToShellMessageSchema,
} from './messages';

// Types
export type {
  ShellUser,
  ShellTheme,
  Accent,
  ShellContextMessage,
  JWTRefreshMessage,
  SessionEndedMessage,
  NavigateToPathMessage,
  NavigateToShellMessage,
  JWTRefreshRequestMessage,
  RequestShellContextMessage,
  RouteChangeMessage,
  PageThemeMessage,
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
export {
  waitForJwtChange,
  JWT_CHANGE_TIMEOUT_MS,
  JWT_CHANGE_POLL_INTERVAL_MS,
} from './util/waitForJwtChange';
export type { WaitForJwtChangeOptions } from './util/waitForJwtChange';
