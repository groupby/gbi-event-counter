import globals from 'globals';
import pluginJs from '@eslint/js';
import tsEslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    languageOptions: { globals: globals['browser'] },
  },
  pluginJs['configs']['recommended'],
  ...tsEslint['configs']['recommended'],
  eslintConfigPrettier,
  {
    rules: {
      semi: 'error',
    },
  },
  {
    ignores: [
      'coverage',
      'public',
      'dist',
      'pnpm-lock.yaml',
      '.husky',
      'scripts',
      'vite.config.*.ts',
    ],
  },
];
