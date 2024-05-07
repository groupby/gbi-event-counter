/// <reference types="vite" />
import { mergeConfig } from 'vite';
import terser from '@rollup/plugin-terser';

// @ts-ignore
import BaseConfig, { fullName } from './vite.config.base';

/** @type {import('vite').UserConfig} */
const config = {
  build: {
    lib: {
      entry: BaseConfig.build.lib.entry,
    },
    rollupOptions: {
      output: [
        {
          name: BaseConfig.build.lib.name,
          entryFileNames: `${fullName}.js`,
          format: 'umd',
        },
        {
          name: BaseConfig.build.lib.name,
          entryFileNames: `${fullName}.min.js`,
          plugins: [terser()],
          format: 'umd',
        },
      ],
    },
  },
};

export default mergeConfig(BaseConfig, config);
