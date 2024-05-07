/// <reference types="vite" />
import { defineConfig, mergeConfig } from 'vite';
import terser from '@rollup/plugin-terser';

// @ts-ignore
import BaseConfig, { fullName } from './vite.config.base';

const config = defineConfig({
  build: {
    lib: {
      entry: BaseConfig.build.lib.entry,
    },
    rollupOptions: {
      output: [
        {
          entryFileNames: `${fullName}.js`,
        },
        {
          entryFileNames: `${fullName}.min.js`,
          plugins: [terser()],
        },
      ],
    },
  },
});

export default mergeConfig(BaseConfig, config);
