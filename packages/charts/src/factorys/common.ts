/**
 * @author Wayne
 * @Date 2022-07-20 21:24:23
 * @LastEditTime 2022-07-22 13:46:18
 */
import { __DEV__, isWeb, AnyObj } from 'fundcharts-core';

import Grid from './GridFactory';
import Shape from './ShapeFactory';

/**
 * @function setEvents
 * @description 设置 Grid/Shape 事件监听
 * @param this
 * @returns
 */
export function setEvents(this: Grid | Shape) {
  const $canvas = this.chartjs.canvas;
  const { events } = this.chartjs.opts;

  if (!events || !isWeb) return false;

  const eventsCallbacks: AnyObj = {};
  events.forEach((eventName: string) => {
    const eventCallback = (e: TouchEvent | MouseEvent) => {
      const event = ~eventName.indexOf('touch') ? (e as TouchEvent).touches[0] : (e as MouseEvent);
      const target = event.target as HTMLElement;

      if (__DEV__)
        console.log(
          'event target pos: ',
          event.clientX - target.offsetLeft,
          event.pageY - target.offsetTop
        );

      this.drawHover(event.clientX - target.offsetLeft, event.pageY - target.offsetTop);
      return false;
    };
    $canvas.addEventListener(eventName, eventCallback, false);
    eventsCallbacks[eventName] = eventCallback;
  });
  this.chartjs.opts.eventsCallbacks = eventsCallbacks;
}

/**
 * @function removeEvents
 * @description 取消 Grid/Shape 事件监听
 * @param this
 * @returns
 */
export function removeEvents(this: Grid | Shape) {
  const $canvas = this.chartjs.canvas;
  const { events, eventsCallbacks } = this.chartjs.opts;

  if (!events || !isWeb) return false;

  events.forEach((eventName: string) => {
    const eventCallback = eventsCallbacks[eventName];
    $canvas.removeEventListener(eventName, eventCallback);
    eventsCallbacks[eventName] = null;
  });
  this.chartjs.opts.eventsCallbacks = null;
  return true;
}

/**
 * @function removeDatas
 * @description 删除 Grid/Shape 实例数据
 * @param this
 * @returns
 */
export function removeDatas(this: Grid | Shape) {
  const opts = this.chartjs.opts;
  for (const i in opts) {
    opts[i] = null;
    delete opts[i];
  }
  for (const i in this.chartjs) {
    this.chartjs[i] = null;
    delete this.chartjs[i];
  }
  this.chartjs = null;
}
