import type { Preview, Decorator } from '@storybook/react-vite';
import './preview-styles.css';

/**
 * Toolbar global: write `data-theme` and `data-accent` onto the preview's
 * `<html>` element. shell-kit's `theme.css` keys both surfaces and the
 * brand triad off these attributes, so flipping them at the toolbar
 * re-tokens every component live.
 */
const themeAccentDecorator: Decorator = (Story, context) => {
  const { theme, accent } = context.globals;
  if (typeof document !== 'undefined') {
    document.documentElement.dataset.theme = theme as string;
    document.documentElement.dataset.accent = accent as string;
  }
  return Story();
};

const preview: Preview = {
  parameters: {
    // Storybook's default checker-pattern background fights the design's
    // tokenised surfaces. Disable in favour of the page-level `--bg`.
    backgrounds: { disable: true },
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Colour theme (mirrors shell-kit data-theme)',
      defaultValue: 'dark',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'dark', title: 'Dark' },
          { value: 'light', title: 'Light' },
        ],
        dynamicTitle: true,
      },
    },
    accent: {
      name: 'Accent',
      description: 'Brand accent (mirrors shell-kit data-accent)',
      defaultValue: 'teal',
      toolbar: {
        icon: 'circle',
        items: [
          { value: 'teal', title: 'Teal' },
          { value: 'warm', title: 'Warm' },
          { value: 'mono', title: 'Mono' },
          { value: 'rose', title: 'Rose' },
          { value: 'indigo', title: 'Indigo' },
          { value: 'betway', title: 'Betway' },
          { value: 'fsgb', title: 'FSGB' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [themeAccentDecorator],
};

export default preview;
