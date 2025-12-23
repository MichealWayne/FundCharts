/**
 * @file components.ts - Type definitions for React and Vue components
 * @author Wayne
 * @date 2025-07-18
 */

import { AnyObj } from '../utils';

/**
 * Base chart props interface that applies to all chart components
 */
export interface ChartProps {
  /** Chart container height */
  height?: string;
  /** Custom ID prefix */
  prefix?: string;
  /** Chart configuration options */
  options?: AnyObj;
  /** Additional props passed to the chart */
  [key: string]: unknown;
}

/**
 * React component type definition
 */
export interface ReactComponentType {
  (props: ChartProps): JSX.Element;
}

/**
 * Vue component type definition
 */
export interface VueComponentType {
  template: string;
  data(): { charter: any; id: string };
  props: {
    prefix: { type: StringConstructor };
    height: { type: StringConstructor; default: string };
    options: { type: ObjectConstructor; default: () => AnyObj };
  };
  watch: { options: (newVal: AnyObj) => void };
  beforeMount(): void;
  mounted(): void;
  unmounted(): void;
}

/**
 * Type for a collection of React components
 */
export interface ReactComponentsType {
  [key: string]: ReactComponentType;
}

/**
 * Type for a collection of Vue components
 */
export interface VueComponentsType {
  [key: string]: VueComponentType;
}