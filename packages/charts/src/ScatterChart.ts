/**
 * @module ScatterChart
 * @description 散点图构造器
 * @author Wayne
 * @Date 2021-03-18 11:16:06
 * @LastEditTime 2022-07-19 14:16:28
 */

import InitCore from './factorys/InitCore';
import Scatter from './charts/scatter';

export default class ScatterChart extends InitCore {
  init() {
    this.initContext();
    this.drawer = new Scatter(this);
    (this.drawer as Scatter).init();
  }
}
