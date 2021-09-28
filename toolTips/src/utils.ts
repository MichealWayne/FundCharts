/**
 * FundCharts.ToolTips
 * @module Utils
 * @time 2020.06
 */

import CONFIG from './config';
import { PointsMap, PointDrawParams, WeappCanvasRenderingContext2D } from './types';
const { isWeapp, circularAngle } = CONFIG;

export const emptyFunc = () => '';

/**
 * @function half
 * @param {Number} num
 * @return {Number}
 */
export function half(num: number) {
  // tslint:disable-next-line:no-bitwise
  return ~~(num / 2);
}

/**
 * @function isUndefined
 * @param {any} value
 * @return {Boolean}
 */
export function isUndefined(value: unknown) {
  return typeof value === 'undefined';
}

/**
 * @function isFunction
 * @param {any} func
 * @return {Boolean}
 */
export function isFunction(value: unknown) {
  return typeof value === 'function';
}

/**
 * @function isFunction
 * @param {any} func
 * @return {Boolean}
 */
export function isString(value: unknown) {
  return typeof value === 'string';
}

/*------------------------------------*\
  value handle functions
\*------------------------------------*/

/**
 * @function handleShowValTipsStr
 * @param showValTipFunc
 * @param defaltValue
 * @returns {String | false}
 */
export function handleShowValTipsStr(
  showValTipFunc: (...args: any[]) => string,
  dealValue: string,
  defaultValue?: string
) {
  if (isFunction(showValTipFunc)) return showValTipFunc(dealValue);
  if (isString(showValTipFunc)) return showValTipFunc;
  return isUndefined(defaultValue) ? dealValue : defaultValue;
}

/**
 * @function getLimitedVal
 * @param {Number} val
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 */
export function getLimitedVal(val: number, min: number, max: number) {
  if (val < min) return min;
  if (val > max) return max;
  return val;
}

/*------------------------------------*\
  canvas draw handle functions
\*------------------------------------*/

/**
 * @function handleWeappDraw
 * @description weapp canvas and web canvas are not the same
 * @param {Function|Undefined} ctx
 * @return {Function}
 */
export const handleWeappDraw = isWeapp
  ? (ctx: WeappCanvasRenderingContext2D) => isFunction(ctx.draw) && ctx.draw(true)
  : emptyFunc;

/**
 * @function handleArguments
 * @param {number} index
 * @param {number[]} values
 * @param {string[]} xaxis
 * @param {number} x
 * @param {number} y
 * @return {Function}
 */
export function handleArguments(fn: (opts: any) => any) {
  return function (index: number, values: number[], xaxis: string[], x: number, y: number) {
    if (!this.ctx) {
      throw Error('canvas `ctx` is not find. Please check `this` point.(FundChartsToolTip)');
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
 * @function drawTriangle
 * @description draw triangle shape
 * @param {CanvasRenderingContext2D} ctx
 * @param {[{x: number, y: number} * 3]} points
 * @return {boolean}
 */
export function drawTriangle(ctx: CanvasRenderingContext2D, points: PointsMap) {
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
 * @function drawPoint
 * @description draw point
 * @param {canvas object} ctx canvas context
 * @param {number} x center of circle position x
 * @param {number} y center of circle position y
 * @param {string} color fill color
 * @param {string} strokeColor circle side color
 * @param {number} width radius
 * @param {number} strokeWidth circle side width
 */
export function drawPoint({ ctx, x, y, color, strokeColor, width, strokeWidth }: PointDrawParams) {
  ctx.beginPath();
  ctx.lineWidth = 0;
  ctx.strokeStyle = strokeColor || '#fff';
  ctx.lineWidth = (isUndefined(strokeWidth) && 1) || strokeWidth;
  ctx.arc(x, y, width, 0, circularAngle, true);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();

  if (strokeWidth) ctx.stroke();
}
