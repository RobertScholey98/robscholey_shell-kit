import type { ReactNode } from 'react';
import type { Accent, ShellTheme } from '../messages';
import { fetchAppMeta } from './fetchAppMeta';
// Imported via the package's own subpath (kept external in tsup.config.ts)
// so the bundler resolves to the separately-built client entry at runtime
// — the `'use client'` directive on `./client.ts` survives only when the
// import isn't inlined into this server bundle.
import { ShellProvider } from '@robscholey/shell-kit/next/client';

/** A `next/font` loader output — only the `.variable` slot is consumed. */
export interface ShellFontVariable {
  variable: string;
}

/** Props for {@link ShellRootLayout}. */
export interface ShellRootLayoutProps {
  /** The app id as registered in `appsConfig.json`. */
  appId: string;
  /** The route subtree to render inside `<main>`. */
  children: ReactNode;
  /**
   * `next/font` outputs whose `.variable` className should be merged onto
   * `<html>` so the design tokens (`--font-sans`, `--font-mono`) point at
   * the chosen webfonts.
   */
  fonts?: ReadonlyArray<ShellFontVariable>;
  /** Renders inside `<body>`, before `<main>`. */
  header?: ReactNode;
  /** Renders inside `<body>`, after `<main>`. */
  footer?: ReactNode;
  /**
   * Skip-link target id. Defaults to `'main-content'`. Pass `false` to
   * suppress the link entirely (e.g. when the host renders its own).
   */
  skipLink?: string | false;
  /** Extra className applied to `<body>`. The defaults already cover layout. */
  bodyClassName?: string;
  /** Optional fallback overrides forwarded to {@link fetchAppMeta}. */
  fallback?: { theme?: ShellTheme; accent?: Accent };
}

const DEFAULT_BODY_CLASS = 'min-h-dvh bg-bg text-text';

/**
 * Async server component that bootstraps a Next.js sub-app's root layout:
 *
 *   1. SSR-fetches the admin-configured `defaultTheme` + `defaultAccent`
 *      from the auth-microservice and bakes them into `<html data-theme>` /
 *      `<html data-accent>` so first paint is correct (no flash).
 *   2. Renders the optional skip-link target plus the standard `<main
 *      id="main-content">` container so keyboard users can bypass the
 *      header. Set `skipLink={false}` to opt out.
 *   3. Mounts {@link ShellProvider} once around the tree so descendants
 *      can call {@link useShell} for user / JWT / iframe state.
 *   4. Slots app-specific `header` / `footer` chrome above and below the
 *      main element.
 *
 * Sub-app `layout.tsx` shrinks to ~10 lines passing these props in.
 *
 * @param props - The layout configuration. See {@link ShellRootLayoutProps}.
 * @returns The full `<html>` document for a sub-app route subtree.
 */
export async function ShellRootLayout({
  appId,
  children,
  fonts,
  header,
  footer,
  skipLink = 'main-content',
  bodyClassName,
  fallback,
}: ShellRootLayoutProps) {
  const { defaultTheme, defaultAccent } = await fetchAppMeta(appId, {
    fallbackTheme: fallback?.theme,
    fallbackAccent: fallback?.accent,
  });

  const fontClassName = fonts?.map((f) => f.variable).join(' ') ?? '';
  const bodyClass = bodyClassName ? `${DEFAULT_BODY_CLASS} ${bodyClassName}` : DEFAULT_BODY_CLASS;
  const skipTarget = skipLink === false ? null : skipLink;

  return (
    <html
      lang="en"
      data-theme={defaultTheme}
      data-accent={defaultAccent}
      className={fontClassName}
    >
      <body className={bodyClass}>
        {skipTarget ? (
          <a href={`#${skipTarget}`} className="skip-link">
            Skip to main content
          </a>
        ) : null}
        <ShellProvider>
          {header}
          <main id={skipTarget ?? 'main-content'} className="flex flex-1 flex-col">
            {children}
          </main>
          {footer}
        </ShellProvider>
      </body>
    </html>
  );
}
