/**
 * @file index.ts - Main entry point for components package
 * @author Wayne
 * @date 2025-07-18
 */

export * from './utils';
export * from './constant';

// Import the components with explicit type annotations
// @ts-ignore - Ignore TypeScript errors for JSX imports
import ReactComponents from './react';
// @ts-ignore - Ignore TypeScript errors for JSX imports
import VueComponents from './vue';

// Define a simple Record type for components
export type ComponentsType = Record<string, unknown>;

// Export the components with explicit type annotations
export { ReactComponents, VueComponents };
