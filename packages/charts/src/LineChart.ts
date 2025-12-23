/**
 * @module LineChart
 * @description 折线图构造器
 * @author Wayne
 * @Date 2021-03-18 11:16:12
 * @LastEditTime 2022-07-20 20:35:08
 */

import InitCore from './factorys/InitCore';
import Line from './charts/line';

export default class LineChart extends InitCore {
  /**
   * @param {Boolean} lazyDraw for content lazy load
   */
  init(lazyDraw?: boolean) {
    if (!lazyDraw) this.initContext();
    this.drawer = new Line(this);
    if (!lazyDraw) (this.drawer as Line).init();
  }
}
