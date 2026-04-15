# @robscholey/shell-kit

Shared postMessage protocol, React hooks, and TanStack Query integration for [robscholey.com](https://robscholey.com) sub-apps.

## Installation

```bash
pnpm add @robscholey/shell-kit
```

## Two Entrypoints

### Root (`@robscholey/shell-kit`)

The postMessage protocol — types, hooks, helpers, and TanStack Query integration. Everything a sub-app needs to communicate with the shell.

```tsx
import {
  useShellContext,
  useRouteSync,
  useAuthenticatedQuery,
  ShellBackButton,
  ShellQueryProvider,
  navigateToShell,
  configure,
} from '@robscholey/shell-kit';
```

### UI (`@robscholey/shell-kit/ui`)

Shared shadcn/ui component library with a custom Tailwind theme. Sub-apps import from this path for visual consistency with the shell.

```tsx
import { Button, Card } from '@robscholey/shell-kit/ui';
```

> Components will be added once the design system is defined.

## Configuration

Call `configure()` once at app startup to set the shell origin (defaults to `https://robscholey.com`):

```tsx
import { configure } from '@robscholey/shell-kit';

configure({ shellOrigin: 'http://localhost:3000' }); // for local dev
```

## Hooks

### `useShellContext()`

Manages communication with the shell via postMessage. Listens for context, JWT refresh, and session-ended messages. Sends `request-shell-context` on mount.

```tsx
const { isEmbedded, user, jwt, isSessionValid, subPath, requestJWTRefresh } = useShellContext();
```

### `useRouteSync()`

Syncs the current pathname to the shell via postMessage so the browser URL bar stays in sync. Requires Next.js.

```tsx
// In root layout
useRouteSync();
```

For react-router, send the `route-change` message manually — see the TSDoc on `useRouteSync` for the pattern.

### `useAuthenticatedFetch(jwt, requestJWTRefresh)`

Returns a `fetch` wrapper that attaches the JWT as an Authorization header. On 401, requests a refresh and retries once.

```tsx
const { jwt, requestJWTRefresh } = useShellContext();
const { authenticatedFetch } = useAuthenticatedFetch(jwt, requestJWTRefresh);
const res = await authenticatedFetch('/api/data');
```

### `useAuthenticatedQuery(options)`

TanStack Query hook with built-in JWT authentication. Combines `useShellContext`, `useAuthenticatedFetch`, and `useQuery`.

```tsx
const { data, isLoading } = useAuthenticatedQuery({
  queryKey: ['projects'],
  url: '/api/projects',
});
```

## Components

### `<ShellBackButton />`

Renders a back button that navigates to the shell. Only visible when embedded and the shell requests it.

```tsx
const { isEmbedded, showBackButton } = useShellContext();
<ShellBackButton isEmbedded={isEmbedded} showBackButton={showBackButton} />;
```

### `<ShellQueryProvider />`

Pre-configured TanStack Query provider with sensible defaults (5 min stale time, 1 retry).

```tsx
<ShellQueryProvider>
  <App />
</ShellQueryProvider>
```

## Development

```bash
pnpm install
pnpm dev        # watch mode build
pnpm test       # run tests
pnpm build      # production build
pnpm typecheck  # type check
pnpm lint       # lint
```
