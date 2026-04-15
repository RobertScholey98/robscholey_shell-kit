/** A user identity provided by the shell. */
export interface ShellUser {
  /** Unique user identifier. */
  id: string;
  /** Display name. */
  name: string;
  /** The authentication level of the user. */
  type: 'owner' | 'named' | 'anonymous';
}

/** The active colour theme. */
export type ShellTheme = 'light' | 'dark';

/** Sent by the shell to provide the embedding context to a child app. */
export interface ShellContextMessage {
  type: 'shell-context';
  isEmbedded: true;
  showBackButton: boolean;
  shellOrigin: string;
  jwt: string | null;
  user: ShellUser | null;
  subPath: string | null;
  theme: ShellTheme;
}

/** Sent by the shell when a JWT has been refreshed. */
export interface JWTRefreshMessage {
  type: 'jwt-refresh';
  jwt: string;
}

/** Sent by the shell when the user's session has ended. */
export interface SessionEndedMessage {
  type: 'session-ended';
}

/** Sent by the shell to tell the child app to navigate to a specific path (browser back/forward). */
export interface NavigateToPathMessage {
  type: 'navigate-to-path';
  path: string;
}

/** Sent by the shell when the theme changes (user toggle or system preference change). */
export interface ThemeUpdateMessage {
  type: 'theme-update';
  theme: ShellTheme;
}

/** Sent by a child app to navigate back to the shell's root. */
export interface NavigateToShellMessage {
  type: 'navigate-to-shell';
}

/** Sent by a child app to request a fresh JWT from the shell. */
export interface JWTRefreshRequestMessage {
  type: 'request-jwt-refresh';
}

/** Sent by a child app to request the shell context on mount. */
export interface RequestShellContextMessage {
  type: 'request-shell-context';
}

/** Sent by a child app to request a theme change. The shell is the source of truth. */
export interface ThemeChangeMessage {
  type: 'theme-change';
  theme: ShellTheme;
}

/** Sent by a child app when its internal route changes. */
export interface RouteChangeMessage {
  type: 'route-change';
  path: string;
}

/** Union of all messages the shell sends to child apps. */
export type ShellToChildMessage =
  | ShellContextMessage
  | JWTRefreshMessage
  | SessionEndedMessage
  | NavigateToPathMessage
  | ThemeUpdateMessage;

/** Union of all messages child apps send to the shell. */
export type ChildToShellMessage =
  | NavigateToShellMessage
  | JWTRefreshRequestMessage
  | RequestShellContextMessage
  | RouteChangeMessage
  | ThemeChangeMessage;
