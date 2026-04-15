/** A user identity provided by the shell. */
export interface ShellUser {
  /** Unique user identifier. */
  id: string;
  /** Display name. */
  name: string;
  /** The authentication level of the user. */
  type: 'owner' | 'named' | 'anonymous';
}

/** Sent by the shell to provide the embedding context to a child app. */
export interface ShellContextMessage {
  type: 'shell-context';
  isEmbedded: true;
  showBackButton: boolean;
  shellOrigin: string;
  jwt: string | null;
  user: ShellUser | null;
  subPath: string | null;
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
  | NavigateToPathMessage;

/** Union of all messages child apps send to the shell. */
export type ChildToShellMessage =
  | NavigateToShellMessage
  | JWTRefreshRequestMessage
  | RequestShellContextMessage
  | RouteChangeMessage;
