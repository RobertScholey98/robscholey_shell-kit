import { describe, it, expect, beforeEach } from 'vitest';
import { configure, getConfig, _testResetConfig } from '@/config';

beforeEach(() => {
  _testResetConfig();
});

describe('config', () => {
  it('returns default config', () => {
    expect(getConfig().shellOrigin).toBe('https://robscholey.com');
  });

  it('overrides shellOrigin via configure()', () => {
    configure({ shellOrigin: 'http://localhost:3000' });
    expect(getConfig().shellOrigin).toBe('http://localhost:3000');
  });

  it('resets to defaults via _testResetConfig()', () => {
    configure({ shellOrigin: 'http://localhost:3000' });
    _testResetConfig();
    expect(getConfig().shellOrigin).toBe('https://robscholey.com');
  });

  it('merges partial config without overwriting other fields', () => {
    const before = getConfig();
    configure({});
    expect(getConfig()).toEqual(before);
  });
});
