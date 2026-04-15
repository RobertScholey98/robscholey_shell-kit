import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'ui/index': 'src/ui/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: false, // DTS generated separately via tsc (tsup DTS plugin incompatible with TS 6)
  splitting: true,
  clean: true,
  external: ['react', 'react-dom', 'next', 'next/navigation'],
  outExtension({ format }) {
    return {
      js: format === 'esm' ? '.mjs' : '.js',
    };
  },
});
