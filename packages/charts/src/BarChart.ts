/**
 * @module BarChart
 * @description 柱状图构造器
 * @author Wayne
 * @Date 2021-03-18 11:16:26
 * @LastEditTime 2022-06-07 11:13:29
 */

import InitCore from './factorys/InitCore';
import Bar from './charts/bar';

export default class BarChart extends InitCore {
  init() {
    this.initContext();
    this.drawer = new Bar(this);
    (this.drawer as Bar).init();
  }
}
