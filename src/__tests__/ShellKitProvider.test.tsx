import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { ShellKitProvider, useShellKitConfig } from '@/ShellKitProvider';

function withPageOrigin(origin: string, fn: () => void): void {
  const descriptor = Object.getOwnPropertyDescriptor(window, 'location');
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: { ...window.location, origin },
  });
  try {
    fn();
  } finally {
    if (descriptor) Object.defineProperty(window, 'location', descriptor);
  }
}

function wrapperFor(shellOrigin: string) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return <ShellKitProvider config={{ shellOrigin }}>{children}</ShellKitProvider>;
  };
}

describe('useShellKitConfig', () => {
  it('returns the config from the nearest provider', () => {
    const { result } = renderHook(() => useShellKitConfig(), {
      wrapper: wrapperFor('http://localhost:3000'),
    });
    expect(result.current.shellOrigin).toBe('http://localhost:3000');
  });

  it('throws when used outside a provider', () => {
    // Silence React's error-boundary console noise for the expected throw.
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    try {
      expect(() => renderHook(() => useShellKitConfig())).toThrow(
        /useShellKitConfig must be used within a ShellKitProvider/,
      );
    } finally {
      errorSpy.mockRestore();
    }
  });
});

describe('ShellKitProvider mismatched-origin alert', () => {
  let alertSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    alertSpy.mockRestore();
  });

  it('alerts when shellOrigin is localhost but page is not', () => {
    withPageOrigin('https://admin.robscholey.com', () => {
      render(
        <ShellKitProvider config={{ shellOrigin: 'http://localhost:3000' }}>
          <span />
        </ShellKitProvider>,
      );
    });
    expect(alertSpy).toHaveBeenCalledOnce();
    expect(alertSpy.mock.calls[0][0]).toMatch(/http:\/\/localhost:3000/);
    expect(alertSpy.mock.calls[0][0]).toMatch(/https:\/\/admin\.robscholey\.com/);
  });

  it('stays quiet when both the origin and shellOrigin are localhost', () => {
    withPageOrigin('http://localhost:3000', () => {
      render(
        <ShellKitProvider config={{ shellOrigin: 'http://localhost:3000' }}>
          <span />
        </ShellKitProvider>,
      );
    });
    expect(alertSpy).not.toHaveBeenCalled();
  });

  it('stays quiet when both the origin and shellOrigin are production', () => {
    withPageOrigin('https://admin.robscholey.com', () => {
      render(
        <ShellKitProvider config={{ shellOrigin: 'https://robscholey.com' }}>
          <span />
        </ShellKitProvider>,
      );
    });
    expect(alertSpy).not.toHaveBeenCalled();
  });

  it('alerts when shellOrigin is not a valid URL', () => {
    render(
      <ShellKitProvider config={{ shellOrigin: 'not a url' }}>
        <span />
      </ShellKitProvider>,
    );
    expect(alertSpy).toHaveBeenCalledOnce();
    expect(alertSpy.mock.calls[0][0]).toMatch(/not a valid URL/);
  });

  it('fires the alert once per mount, not on every re-render', () => {
    const { rerender } = render(
      <ShellKitProvider config={{ shellOrigin: 'not a url' }}>
        <span />
      </ShellKitProvider>,
    );
    rerender(
      <ShellKitProvider config={{ shellOrigin: 'not a url' }}>
        <span>different child</span>
      </ShellKitProvider>,
    );
    expect(alertSpy).toHaveBeenCalledOnce();
  });
});
