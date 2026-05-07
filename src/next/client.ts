'use client';

// Client surface for the `/next` subpath. Lives as its own bundle entry so
// the `'use client'` directive at the top of this file flows into the
// published artifact intact — without the split, tsup inlines the client
// implementations into the server-only barrel and the directive can't be
// hoisted (a single output file can't be both an async server component
// AND a client boundary).

export { ShellProvider, useShell } from './ShellProvider';
export type { ShellProviderProps } from './ShellProvider';
