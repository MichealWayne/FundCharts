/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @class Shape
 * @description shape chart's factory (pie/radar)
 * @author Wayne
 * @createTime 2019-07-15
 * @LastEditTime 2022-07-13 15:24:34
 */
import { isArray, isTransparentColor, setAnimationHooks, AnyObj, AnyFunc } from 'fundcharts-core';

import { setEvents, removeEvents, removeDatas } from './common';

export interface ShapeState {
  chartjs: any;
  setAnimation?: AnyFunc;
}

@setAnimationHooks
export default class Shape implements ShapeState {
  chartjs: any;

  /**
   * @param FundChart FundChart实例
   */
  constructor(FundChart: AnyObj) {
    this.chartjs = FundChart;
  }

  /**
   * @function Grid.formatGridDatas
   * @description 格式化数据
   * @return {Array} datas
   */
  formatGridDatas(datas: any[]) {
    if (!isArray(datas?.[0])) {
      return [datas];
    }
    return datas;
  }

  /**
   * @function Shape.clearCtn
   * @description 清理区域
   */
  clearCtn() {
    const { ctx } = this.chartjs;
    const { backgroundColor } = this.chartjs.opts;

    ctx.beginPath();
    ctx[isTransparentColor(backgroundColor) ? 'clearRect' : 'rect'](0, 0, 100_000, 100_000);
    ctx.fillStyle = backgroundColor;
    ctx.fill();
    ctx.closePath();
  }

  /**
   * @function Shape.drawHover
   * @param {Number} x 触控点x轴坐标
   * @param {Number} y 触控点y轴坐标
   */
  drawHover(x: number, y: number) {
    // chart implement
  }

  /**
   * @function Shape.setEvents
   * @description 设置事件
   */
  setEvents = setEvents;

  /**
   * @function Shape.removeEvents
   * @description 删除事件
   * @returns {Boolean}
   */
  removeEvents = removeEvents;

  /**
   * @function Shape.removeDatas
   * @description 删除数据（destory时调用）
   */
  removeDatas = removeDatas;

  draw(update?: boolean, noAnimate?: boolean) {
    // chart implement
  }
}
