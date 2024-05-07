/// <reference types="vite" />
import { defineConfig, mergeConfig } from 'vite';
import dts from 'vite-plugin-dts';

// @ts-ignore
import BaseConfig, { fullName } from './vite.config.base';

const config = defineConfig({
  build: {
    lib: {
      entry: BaseConfig.build.lib.entry,
      fileName: () => `${fullName}.min.js`,
    },
    minify: true,
    sourcemap: true,
  },
  plugins: [
    dts({
      rollupTypes: true,
      exclude: ['src/*.test.ts', 'src/**/*.test.ts'],
    }),
  ],
});

export default mergeConfig(BaseConfig, config);
