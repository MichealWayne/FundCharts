/**
 * @module RadarChart
 * @description 雷达图（蜘蛛图）构造器
 * @author Wayne
 * @Date 2021-03-18 11:16:08
 * @LastEditTime 2022-07-19 14:16:22
 */

import InitCore from './factorys/InitCore';
import Radar from './charts/radar';

export default class RadarChart extends InitCore {
  init() {
    this.initContext();
    this.drawer = new Radar(this);
    (this.drawer as Radar).init();
  }
}
