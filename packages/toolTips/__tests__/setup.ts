/**
 * @file setup.ts
 * @description Jest setup file for toolTips package
 * @note This file extends the root Jest configuration
 */

// Additional mocks specific to toolTips package
// Note: jest-canvas-mock is already configured in the root Jest config

// Mock WeChat Mini Program environment for toolTips specific tests
Object.defineProperty(global, 'wx', {
  value: {
    getSystemInfoSync: jest.fn(() => ({ pixelRatio: 2 })),
  },
  writable: true,
});

// Mock devicePixelRatio for toolTips specific tests
Object.defineProperty(window, 'devicePixelRatio', {
  value: 2,
  writable: true,
});
