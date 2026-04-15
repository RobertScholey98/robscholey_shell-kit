import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { QueryClient } from '@tanstack/react-query';
import { ShellQueryProvider } from '@/ShellQueryProvider';

describe('ShellQueryProvider', () => {
  it('renders children', () => {
    const { getByText } = render(
      <ShellQueryProvider>
        <div>Hello</div>
      </ShellQueryProvider>,
    );
    expect(getByText('Hello')).toBeDefined();
  });

  it('accepts a custom QueryClient', () => {
    const customClient = new QueryClient();
    const { getByText } = render(
      <ShellQueryProvider queryClient={customClient}>
        <div>Custom</div>
      </ShellQueryProvider>,
    );
    expect(getByText('Custom')).toBeDefined();
  });
});
