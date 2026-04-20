import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { ShellKitProvider } from '@/ShellKitProvider';

const SHELL_ORIGIN = 'https://robscholey.com';

// Mock next/navigation before importing useRouteSync
const mockUsePathname = vi.fn().mockReturnValue('/projects/123');
vi.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}));

// Import after mock
const { useRouteSync } = await import('@/useRouteSync');

function Wrapper({ children }: { children: ReactNode }) {
  return <ShellKitProvider config={{ shellOrigin: SHELL_ORIGIN }}>{children}</ShellKitProvider>;
}

beforeEach(() => {
  Object.defineProperty(window, 'top', { value: {}, configurable: true });
  Object.defineProperty(window, 'parent', {
    value: { postMessage: vi.fn() },
    configurable: true,
  });
});

afterEach(() => {
  Object.defineProperty(window, 'top', { value: window, configurable: true });
  Object.defineProperty(window, 'parent', { value: window, configurable: true });
  vi.restoreAllMocks();
});

describe('useRouteSync', () => {
  it('sends route-change postMessage with current pathname', () => {
    mockUsePathname.mockReturnValue('/projects/123');
    renderHook(() => useRouteSync(), { wrapper: Wrapper });

    expect(window.parent.postMessage).toHaveBeenCalledWith(
      { type: 'route-change', path: '/projects/123' },
      SHELL_ORIGIN,
    );
  });

  it('does nothing when not in iframe', () => {
    Object.defineProperty(window, 'top', { value: window, configurable: true });
    mockUsePathname.mockReturnValue('/projects/123');

    renderHook(() => useRouteSync(), { wrapper: Wrapper });

    expect(window.parent.postMessage).not.toHaveBeenCalled();
  });
});
