import { describe, it, expectTypeOf } from 'vitest';
import type {
  ShellUser,
  ShellContextMessage,
  ShellToChildMessage,
  ChildToShellMessage,
} from '@/types';

describe('types', () => {
  it('ShellUser has correct shape', () => {
    expectTypeOf<ShellUser>().toHaveProperty('id');
    expectTypeOf<ShellUser>().toHaveProperty('name');
    expectTypeOf<ShellUser>().toHaveProperty('type');
  });

  it('ShellContextMessage includes subPath', () => {
    expectTypeOf<ShellContextMessage>().toHaveProperty('subPath');
  });

  it('ShellToChildMessage discriminates on type field', () => {
    const msg: ShellToChildMessage = {
      type: 'shell-context',
      isEmbedded: true,
      showBackButton: false,
      shellOrigin: 'https://robscholey.com',
      jwt: null,
      user: null,
      subPath: null,
      theme: 'light',
    };
    if (msg.type === 'shell-context') {
      expectTypeOf(msg.shellOrigin).toBeString();
      expectTypeOf(msg.subPath).toEqualTypeOf<string | null>();
    }
  });

  it('ChildToShellMessage discriminates on type field', () => {
    const msg: ChildToShellMessage = { type: 'route-change', path: '/foo' };
    if (msg.type === 'route-change') {
      expectTypeOf(msg.path).toBeString();
    }
  });
});
