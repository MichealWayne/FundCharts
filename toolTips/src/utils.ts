/**
 * FundCharts.ToolTips
 * @module Utils
 * @time 2020.06
 */

import CONFIG from './config';
import { PointsMap } from './types';
const { isWeapp } = CONFIG;

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
 * @function isFunction
 * @param {any} func
 * @return {Boolean}
 */
export function isFunction(func: any) {
  return typeof func === 'function';
}

export const handleWeappDraw = isWeapp
  ? (ctx: any) => isFunction(ctx.draw) && ctx.draw(true)
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
  if (points && points.length === 3) {
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    ctx.lineTo(points[1].x, points[1].y);
    ctx.lineTo(points[2].x, points[2].y);
    ctx.closePath();
    ctx.fill();
    return true;
  } else {
    return false;
  }
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
export function drawPoint(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string,
  strokeColor: string,
  width: number,
  strokeWidth: number
) {
  ctx.beginPath();
  ctx.lineWidth = 0;
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = strokeWidth !== undefined ? strokeWidth : 1;
  ctx.arc(x, y, width, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();

  if (strokeWidth) ctx.stroke();
}
