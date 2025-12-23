/*
 * @author Wayne
 * @Date 2022-03-29 13:42:33
 * @LastEditTime 2022-10-10 11:08:51
 */

// document: https://eslint.org/docs/user-guide/configuring
/**
 * @type {import('eslint').ESLint.ConfigData}
 */
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint'],
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'no-trailing-spaces': [0],
    'filenames/match-exported': [0],
    'no-multi-spaces': [0],
    indent: [0],
    'no-console': [0],
    'no-extra-parens': [0],
    'no-unused-vars': [
      2,
      {
        vars: 'local',
        args: 'none',
      },
    ],
    'no-magic-numbers': [0],
    '@typescript-eslint/explicit-module-boundary-types': [0],
  },
};
