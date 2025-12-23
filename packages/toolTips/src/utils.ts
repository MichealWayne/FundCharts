/**
 * FundCharts.ToolTips
 * @module Utils
 * @description Utility functions for ToolTip rendering
 * @time 2020.06
 */

import CONFIG from './config';
import {
  PointsMap,
  PointDrawParams,
  WeappCanvasRenderingContext2D,
  ToolTipData,
} from './types';

const { isWeapp, circularAngle } = CONFIG;

/**
 * No-operation function
 * @returns Empty string
 */
export const NOOP = (): string => '';

/**
 * Calculate half of a number using bitwise operation
 * @param num - The number to halve
 * @returns Half of the input number
 * @example
 * half(10); // 5
 * half(7);  // 3
 */
export function half(num: number): number {
  // tslint:disable-next-line:no-bitwise
  return ~~(num / 2);
}

/**
 * Check if a value is undefined
 * @param val - The value to check
 * @returns True if the value is undefined
 * @example
 * isUndefined(undefined); // true
 * isUndefined(null);      // false
 * isUndefined(0);         // false
 */
export function isUndefined(val?: unknown): val is undefined {
  // eslint-disable-next-line no-undefined
  return val === undefined;
}

/**
 * Check if a value is a function
 * @param val - The value to check
 * @returns True if the value is a function
 * @example
 * isFunction(() => {});   // true
 * isFunction('function'); // false
 */
export function isFunction(val?: unknown): val is (...args: unknown[]) => unknown {
  return typeof val === 'function';
}

/**
 * Check if a value is a string
 * @param val - The value to check
 * @returns True if the value is a string
 * @example
 * isString('hello'); // true
 * isString(123);     // false
 */
export function isString(val?: unknown): val is string {
  return typeof val === 'string';
}

/*------------------------------------*\
  Value handling functions
\*------------------------------------*/

/**
 * Handle tooltip value display string
 * @param showValTipFunc - Function to format the value
 * @param dealValue - The value to format
 * @param defaultValue - Default value if formatting fails
 * @returns Formatted string or default value
 * @example
 * handleShowValTipsStr((val) => `Value: ${val}`, '100', 'N/A'); // 'Value: 100'
 * handleShowValTipsStr('Fixed Text', '100', 'N/A');            // 'Fixed Text'
 * handleShowValTipsStr(null, '100', 'N/A');                    // 'N/A'
 */
export function handleShowValTipsStr(
  showValTipFunc: ((value: string) => string) | string | null | undefined,
  dealValue: string,
  defaultValue?: string
): string {
  if (typeof showValTipFunc === 'function') {
    return showValTipFunc(dealValue);
  }
  if (isString(showValTipFunc)) {
    return showValTipFunc;
  }
  return isUndefined(defaultValue) ? dealValue : defaultValue;
}

/**
 * Limit a value between minimum and maximum bounds
 * @param val - The value to limit
 * @param min - Minimum allowed value
 * @param max - Maximum allowed value
 * @returns The limited value
 * @example
 * handleLimitedVal(5, 0, 10);  // 5
 * handleLimitedVal(-1, 0, 10); // 0
 * handleLimitedVal(15, 0, 10); // 10
 */
export function handleLimitedVal(
  val: number,
  min: number,
  max: number
): number {
  if (val < min) return min;
  if (val > max) return max;
  return val;
}

/*------------------------------------*\
  Canvas drawing functions
\*------------------------------------*/

/**
 * Handle WeChat Mini Program canvas drawing
 * @param ctx - The canvas context
 * @returns Function to trigger drawing or NOOP for web
 */
export const handleWeappDraw = isWeapp
  ? (ctx: WeappCanvasRenderingContext2D): void => {
      if (isFunction(ctx.draw)) {
        ctx.draw(true);
      }
    }
  : NOOP;

/**
 * Create a tooltip options handler
 * @param fn - The tooltip rendering function
 * @returns Function that handles tooltip options
 * @throws {Error} When canvas context is not found
 */
export function handleToolTipOptions(fn: (opts: ToolTipData) => void) {
  return function (
    index: number,
    values: number[],
    xaxis: string[],
    x: number,
    y: number
  ): void {
    if (!this.ctx) {
      throw new Error(
        'canvas `ctx` is not found. Please check `this` point.(FundChartsToolTip)'
      );
    }
    fn.call(this, {
      xData: xaxis,
      yDatas: values,
      xPos: x,
      yPos: y,
      index,
    });
  };
}

/**
 * Draw a triangle shape on canvas
 * @param ctx - The canvas context
 * @param points - Array of three points defining the triangle
 * @returns True if triangle was drawn successfully, false otherwise
 * @example
 * drawTriangle(ctx, [
 *   { x: 0, y: 0 },
 *   { x: 10, y: 0 },
 *   { x: 5, y: 10 }
 * ]);
 */
export function drawTriangle(
  ctx: CanvasRenderingContext2D,
  points: PointsMap
): boolean {
  if (points?.length === 3) {
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    ctx.lineTo(points[1].x, points[1].y);
    ctx.lineTo(points[2].x, points[2].y);
    ctx.closePath();
    ctx.fill();
    return true;
  }
  return false;
}

/**
 * Draw a point (circle) on canvas
 * @param options - Point drawing parameters
 * @example
 * drawPoint({
 *   ctx,
 *   x: 100,
 *   y: 100,
 *   color: '#ff0000',
 *   strokeColor: '#000000',
 *   width: 5,
 *   strokeWidth: 1
 * });
 */
export function drawPoint({
  ctx,
  x,
  y,
  color,
  strokeColor,
  width,
  strokeWidth,
}: PointDrawParams): void {
  ctx.beginPath();
  ctx.lineWidth = 0;
  ctx.strokeStyle = strokeColor || '#fff';
  ctx.lineWidth = (isUndefined(strokeWidth) && 1) || strokeWidth;
  ctx.arc(x, y, width, 0, circularAngle, true);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();

  if (strokeWidth) {
    ctx.stroke();
  }
}
