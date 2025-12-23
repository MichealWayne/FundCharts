/**
 * @class Core
 * @description initial core class. options handle, set context.
 * @author Wayne
 * @Date 2022-03-03 21:02:46
 * @LastEditTime 2024-07-13 14:37:57
 */

import {
  isWeb,
  isObject,
  throwError,
  cloneObjDeep,
  retinaScale,
  setEnvContext,
  AnyObj,
} from 'fundcharts-core';

import Config from '../config';
import Grid from './GridFactory';
import Shape from './ShapeFactory';

interface Options {
  // DOM container id or id
  id?: string;

  // display colors
  colors?: string[];

  // other options
  [propName: string]: unknown;
}

interface UpdateOptions {
  [propName: string]: unknown;
}

export default class InitCore {
  $el: HTMLElement | null = null;
  opts!: Options;
  drawer!: Grid | Shape;
  canvas: AnyObj | null = null;

  ctx!: CanvasRenderingContext2D;
  pixelRatio = 1;

  /**
   * @param {object} options chart options
   */
  constructor(options: Options) {
    const { id, colors, datas } = options;

    if (!id || !datas) {
      throwError('no container id or datas in options', 'setConfig');
      return;
    }

    if (isWeb) {
      this.$el = document.getElementById(id) || document.querySelector(id);
      if (!this.$el) {
        throwError('no container element', 'setConfig');
        return;
      }
    }

    if (colors) {
      options.colors = colors.concat(Config.colors);
    }
    const opts = cloneObjDeep(Config, options) as Options;

    this.opts = opts;
  }

  /**
   * @function Core.update
   * @description update chart
   * @param {object} options chart options
   */
  public update(options: UpdateOptions): void {
    if (!isObject(options)) {
      throwError(' options must be an object', 'update');
      return;
    }
    if (options) {
      this.opts = cloneObjDeep(this.opts, options);
    }

    this.drawer.draw(true, this.opts.noAnimation as boolean);
  }

  /**
   * @function Core.destory
   * @description 实例销毁
   */
  public destory(): void {
    this.drawer.removeEvents();
    this.drawer.removeDatas();
  }

  /**
   * @function Core.initContext
   * @description set context
   * @private
   */
  public initContext() {
    setEnvContext(this);
    if (isWeb) {
      // web mobile fit
      this.pixelRatio = retinaScale(this.canvas as HTMLCanvasElement, this.ctx);
    }
  }
}
