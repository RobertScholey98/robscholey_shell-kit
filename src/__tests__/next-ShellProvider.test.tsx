import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, renderHook, screen, act } from '@testing-library/react';

const SHELL_ORIGIN = 'https://robscholey.com';

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => '/',
}));

// Import after the mock so the module under test resolves the mocked router.
const { ShellProvider, useShell } = await import('@/next/ShellProvider');

beforeEach(() => {
  Object.defineProperty(window, 'top', { value: {}, configurable: true });
  Object.defineProperty(window, 'parent', {
    value: { postMessage: vi.fn() },
    configurable: true,
  });
  mockPush.mockClear();
});

afterEach(() => {
  Object.defineProperty(window, 'top', { value: window, configurable: true });
  Object.defineProperty(window, 'parent', { value: window, configurable: true });
  vi.restoreAllMocks();
});

function dispatchShellMessage(data: Record<string, unknown>) {
  const event = new MessageEvent('message', { data, origin: SHELL_ORIGIN });
  window.dispatchEvent(event);
}

function ShellConsumer() {
  const shell = useShell();
  return (
    <div>
      <span data-testid="jwt">{shell.jwt ?? 'no-jwt'}</span>
      <span data-testid="user">{shell.user?.name ?? 'no-user'}</span>
      <span data-testid="embedded">{String(shell.isEmbedded)}</span>
    </div>
  );
}

describe('<ShellProvider>', () => {
  it('exposes drained shell context state to a useShell() consumer', () => {
    render(
      <ShellProvider shellOrigin={SHELL_ORIGIN}>
        <ShellConsumer />
      </ShellProvider>,
    );

    act(() => {
      dispatchShellMessage({
        type: 'shell-context',
        protocolVersion: 2,
        isEmbedded: true,
        showBackButton: false,
        shellOrigin: SHELL_ORIGIN,
        jwt: 'integration-jwt',
        user: { id: '1', name: 'Rob', type: 'owner' },
        subPath: null,
      });
    });

    expect(screen.getByTestId('jwt').textContent).toBe('integration-jwt');
    expect(screen.getByTestId('user').textContent).toBe('Rob');
    expect(screen.getByTestId('embedded').textContent).toBe('true');
  });

  it('routes navigate-to-path messages through useRouter().push', () => {
    render(
      <ShellProvider shellOrigin={SHELL_ORIGIN}>
        <ShellConsumer />
      </ShellProvider>,
    );

    act(() => {
      dispatchShellMessage({
        type: 'navigate-to-path',
        protocolVersion: 2,
        path: '/projects/789',
      });
    });

    expect(mockPush).toHaveBeenCalledWith('/projects/789');
  });

  it('falls back to "/" when navigate-to-path arrives with an empty path', () => {
    render(
      <ShellProvider shellOrigin={SHELL_ORIGIN}>
        <ShellConsumer />
      </ShellProvider>,
    );

    act(() => {
      dispatchShellMessage({
        type: 'navigate-to-path',
        protocolVersion: 2,
        path: '',
      });
    });

    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('throws a clear error when useShell() is called outside <ShellProvider>', () => {
    // Suppress React's error-boundary console noise for this expected throw.
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => renderHook(() => useShell())).toThrow(
      /useShell must be used within a <ShellProvider>/,
    );

    errorSpy.mockRestore();
  });
});
