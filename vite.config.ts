/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import pkg from './package.json' assert { type: 'json' };

const { name, version } = pkg;

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'GBIEventCounter',
      formats: ['umd'],
      fileName: () => `${name}-${version}.min.js`,
    },
    sourcemap: true,
    minify: true,
  },
  plugins: [
    dts({
      rollupTypes: true,
      exclude: ['src/*.test.ts', 'src/**/*.test.ts'],
    }),
  ],
  define: {
    GBI__LIB_NAME: `"${name}"`,
    GBI__LIB_VERSION: `"${version}"`,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  test: {
    environment: 'jsdom',
  },
});
