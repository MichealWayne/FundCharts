/**
 * @module DOM
 * @description dom operate
 * @author Wayne
 * @Date 2022-06-06 10:08:50
 * @LastEditTime 2024-07-19 13:30:02
 */

import { DEFAULT_CANVAS_SIZE } from '../constants';

/**
 * @function getElementSize
 * @description **getElementStyle(el, property)** get DOM style
 * @param {HTMLElement} elem
 * @param {String} property
 * @return {Number}
 * @example
 *  const bodyWidth = getElementStyle(document.querySelector('body'), 'width')
 */
export function getElementSize(elem: HTMLElement, property: string): number {
  // fit IE currentStyle
  const value = (elem as any).currentStyle
    ? (elem as any).currentStyle[property]
    : document.defaultView?.getComputedStyle(elem, null).getPropertyValue(property);
  const matches = value?.match(/^(\d+)(\.\d+)?px$/);
  return matches ? +matches[1] : 0;
}

/**
 * @function appendCanvasElem
 * @description (web)创建并填充canvas元素
 * @param {HTMLElement} elem
 * @param {Options} options
 * @return {HTMLCanvasElement}
 * @example
 *  const canvas = appendCanvasElem(document.querySelector('body'), {
 *    id: 'demo'
 *  })
 */
export function appendCanvasElem(
  elem: HTMLElement,
  {
    id,
    width,
    height,
  }: {
    id: string;
    width?: number;
    height?: number;
  }
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.id = `${id}Canvas`;

  canvas.width = width || getElementSize(elem, 'width') || DEFAULT_CANVAS_SIZE.width;
  canvas.height = height || getElementSize(elem, 'height') || DEFAULT_CANVAS_SIZE.height;

  elem.appendChild(canvas);
  return canvas;
}
