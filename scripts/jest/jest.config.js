/**
 * @author Wayne
 * @see https://www.jestjs.cn/docs/configuration
 * @Date 2022-04-14 16:37:44
 * @LastEditTime 2022-04-18 13:37:41
 */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

// only run tests for someone API that config from environment
let { TEST_API } = process.env;

TEST_API = TEST_API || '';

module.exports = {
  verbose: false,
  rootDir: path.join(__dirname, '../../'),
  preset: 'ts-jest',
  setupFiles: ['jest-canvas-mock'],
  // Performance optimizations
  maxWorkers: '50%', // Use half of available CPU cores
  cache: true,
  cacheDirectory: '<rootDir>/node_modules/.cache/jest',
  clearMocks: true,
  resetMocks: false,
  restoreMocks: false,
  globals: {
    // handle TypeScript
    'ts-jest': {
      tsconfig: {
        target: 'es6',
        sourceMap: true,
      },
      // Performance: skip type checking for tests
      isolatedModules: true,
    },
  },
  transform: {
    '\\.(ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    // ...genNpmAliasMapper(),
    'fundcharts-core': '<rootDir>/packages/core/src/index.ts',
  },
  testMatch: [
    TEST_API ? `**/${TEST_API}/__tests__/*.test.{ts,tsx}` : '**/__tests__/**/*.test.{ts,tsx}',
  ],
  // Exclude problematic files from test discovery
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/lib/',
    '/coverage/',
  ],
  collectCoverage: !TEST_API,
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: [
    'packages/**/src/**/*.{ts,tsx}',

    // exclude
    '!packages/**/src/types.{ts,tsx}',
    '!packages/**/device/**/*.{ts,tsx}',
    '!packages/**/dist/**/*',
    '!packages/interactive/{background,keyboard}/**/*.{ts,tsx}',
    // Exclude type definition files
    '!packages/**/src/**/*.d.ts',
    '!packages/components/src/types/**',
  ],
  coverageReporters: ['text', 'html'],
  // Performance: reduce memory usage
  logHeapUsage: false,
  // Faster test runs
  bail: false,
  // Error reporting
  errorOnDeprecated: false,
};
