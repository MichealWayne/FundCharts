/**
 * @module PieChart
 * @description 饼图/环形图构造器
 * @author Wayne
 * @Date 2021-03-18 11:16:10
 * @LastEditTime 2022-07-19 14:16:15
 */

import InitCore from './factorys/InitCore';
import Pie from './charts/pie';

export default class PieChart extends InitCore {
  init() {
    this.initContext();
    this.drawer = new Pie(this);
    (this.drawer as Pie).init();
  }
}
