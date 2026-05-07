import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'ui/index': 'src/ui/index.ts',
    // Server-only helpers for the `/next` subpath. Bundles
    // `<ShellRootLayout>` and `fetchAppMeta`; re-exports the client pair
    // from `./client` via the external self-import so the `'use client'`
    // directive on the client entry survives.
    'next/index': 'src/next/index.ts',
    // Client-only entry — keeps the `'use client'` directive intact on the
    // published bundle so Next can establish the client boundary when the
    // server-side `<ShellRootLayout>` imports from `@robscholey/shell-kit/next`.
    'next/client': 'src/next/client.ts',
  },
  format: ['cjs', 'esm'],
  dts: false, // DTS generated separately via tsc (tsup DTS plugin incompatible with TS 6)
  splitting: true,
  clean: true,
  // The self-import path is marked external so the server bundle keeps it
  // as a runtime reference rather than inlining the client implementation
  // (which would strip the leading `'use client'` directive). At runtime
  // the consumer's bundler resolves the import via the package's exports
  // map — no path-extension fragility, no relative-path guessing.
  external: [
    'react',
    'react-dom',
    'next',
    'next/navigation',
    '@robscholey/contracts',
    '@robscholey/shell-kit/next/client',
  ],
  outExtension({ format }) {
    return {
      js: format === 'esm' ? '.mjs' : '.js',
    };
  },
});
