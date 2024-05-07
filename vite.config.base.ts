/// <reference types="vitest" />
import { resolve } from 'path';
import pkg from './package.json' assert { type: 'json' };

const { name, version } = pkg;

export const fullName = `${name}-${version}`;

/** @type {import('vite').UserConfig} */
export default {
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'GBIEventCounter',
      fileName: () => `${fullName}.js`,
      formats: ['umd'],
    },
    minify: false,
  },
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
};
