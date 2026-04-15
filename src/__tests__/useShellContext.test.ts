import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useShellContext } from '@/useShellContext';
import { configure, _testResetConfig } from '@/config';

const SHELL_ORIGIN = 'https://robscholey.com';

beforeEach(() => {
  _testResetConfig();
  configure({ shellOrigin: SHELL_ORIGIN });
  // Simulate being in an iframe
  Object.defineProperty(window, 'top', { value: {}, configurable: true });
  Object.defineProperty(window, 'parent', {
    value: { postMessage: vi.fn() },
    configurable: true,
  });
});

afterEach(() => {
  Object.defineProperty(window, 'top', { value: window, configurable: true });
  Object.defineProperty(window, 'parent', { value: window, configurable: true });
});

function dispatchShellMessage(data: Record<string, unknown>) {
  const event = new MessageEvent('message', {
    data,
    origin: SHELL_ORIGIN,
  });
  window.dispatchEvent(event);
}

describe('useShellContext', () => {
  it('sends request-shell-context on mount when in iframe', () => {
    renderHook(() => useShellContext());

    expect(window.parent.postMessage).toHaveBeenCalledWith(
      { type: 'request-shell-context' },
      SHELL_ORIGIN,
    );
  });

  it('processes shell-context messages', () => {
    const { result } = renderHook(() => useShellContext());

    act(() => {
      dispatchShellMessage({
        type: 'shell-context',
        isEmbedded: true,
        showBackButton: true,
        shellOrigin: SHELL_ORIGIN,
        jwt: 'test-jwt',
        user: { id: '1', name: 'Rob', type: 'owner' },
        subPath: '/projects/123',
      });
    });

    expect(result.current.isEmbedded).toBe(true);
    expect(result.current.showBackButton).toBe(true);
    expect(result.current.jwt).toBe('test-jwt');
    expect(result.current.user).toEqual({ id: '1', name: 'Rob', type: 'owner' });
    expect(result.current.subPath).toBe('/projects/123');
    expect(result.current.isSessionValid).toBe(true);
  });

  it('rejects messages from invalid origins', () => {
    const { result } = renderHook(() => useShellContext());

    act(() => {
      const event = new MessageEvent('message', {
        data: {
          type: 'shell-context',
          isEmbedded: true,
          showBackButton: true,
          shellOrigin: 'https://evil.com',
          jwt: 'evil-jwt',
          user: null,
          subPath: null,
        },
        origin: 'https://evil.com',
      });
      window.dispatchEvent(event);
    });

    expect(result.current.isEmbedded).toBe(false);
    expect(result.current.jwt).toBeNull();
  });

  it('updates jwt on jwt-refresh message', () => {
    const { result } = renderHook(() => useShellContext());

    act(() => {
      dispatchShellMessage({
        type: 'shell-context',
        isEmbedded: true,
        showBackButton: false,
        shellOrigin: SHELL_ORIGIN,
        jwt: 'old-jwt',
        user: null,
        subPath: null,
      });
    });

    act(() => {
      dispatchShellMessage({ type: 'jwt-refresh', jwt: 'new-jwt' });
    });

    expect(result.current.jwt).toBe('new-jwt');
  });

  it('clears session on session-ended message', () => {
    const { result } = renderHook(() => useShellContext());

    act(() => {
      dispatchShellMessage({
        type: 'shell-context',
        isEmbedded: true,
        showBackButton: false,
        shellOrigin: SHELL_ORIGIN,
        jwt: 'test-jwt',
        user: { id: '1', name: 'Rob', type: 'owner' },
        subPath: null,
      });
    });

    act(() => {
      dispatchShellMessage({ type: 'session-ended' });
    });

    expect(result.current.isSessionValid).toBe(false);
    expect(result.current.jwt).toBeNull();
    expect(result.current.user).toBeNull();
  });

  it('requestJWTRefresh sends postMessage', () => {
    const { result } = renderHook(() => useShellContext());

    act(() => {
      result.current.requestJWTRefresh();
    });

    expect(window.parent.postMessage).toHaveBeenCalledWith(
      { type: 'request-jwt-refresh' },
      SHELL_ORIGIN,
    );
  });

  it('calls onNavigateToPath when shell sends navigate-to-path', () => {
    const onNavigate = vi.fn();
    renderHook(() => useShellContext(onNavigate));

    act(() => {
      dispatchShellMessage({ type: 'navigate-to-path', path: '/projects/456' });
    });

    expect(onNavigate).toHaveBeenCalledWith('/projects/456');
  });

  it('ignores messages that are not valid shell messages', () => {
    const { result } = renderHook(() => useShellContext());

    act(() => {
      const event = new MessageEvent('message', {
        data: 'not an object',
        origin: SHELL_ORIGIN,
      });
      window.dispatchEvent(event);
    });

    expect(result.current.isEmbedded).toBe(false);
  });
});
