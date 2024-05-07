/// <reference types="vite" />
import { defineConfig, mergeConfig } from 'vite';

// @ts-ignore
import BaseConfig, { fullName } from './vite.config.base';

const config = defineConfig({});

export default mergeConfig(BaseConfig, config);
