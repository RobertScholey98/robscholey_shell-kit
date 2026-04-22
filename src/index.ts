// Configuration + theme/accent state
export { ShellKitProvider, useShellKitConfig, useTheme, useAccent } from './ShellKitProvider';
export type {
  ShellKitConfig,
  ShellKitProviderProps,
  UseThemeResult,
  UseAccentResult,
} from './ShellKitProvider';

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
  themeUpdateMessageSchema,
  accentUpdateMessageSchema,
  navigateToShellMessageSchema,
  jwtRefreshRequestMessageSchema,
  requestShellContextMessageSchema,
  routeChangeMessageSchema,
  themeChangeMessageSchema,
  accentChangeMessageSchema,
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
  ThemeUpdateMessage,
  AccentUpdateMessage,
  NavigateToShellMessage,
  JWTRefreshRequestMessage,
  RequestShellContextMessage,
  RouteChangeMessage,
  ThemeChangeMessage,
  AccentChangeMessage,
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
