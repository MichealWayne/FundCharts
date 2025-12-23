/**
 * @module KlineChart
 * @description k线图构造器
 * @author Wayne
 * @Date 2021-03-18 11:16:14
 * @LastEditTime 2022-07-19 14:15:52
 */

import InitCore from './factorys/InitCore';
import Kline from './charts/kline';

export default class KlineChart extends InitCore {
  init() {
    this.initContext();
    this.drawer = new Kline(this);
    (this.drawer as Kline).init();
  }
}
