/**
 * @file inde.ts
 * @author Wayne
 * @Date 2021-04-07 13:00:52
 * @LastEditTime 2024-07-19 13:42:56
 */

import { CHART_LIST, VERSION } from './constants';
import InitCore from './factorys/InitCore';

import Line from './charts/line';
import Bar from './charts/bar';
import Scatter from './charts/scatter';
import Kline from './charts/kline';
import Pie from './charts/pie';
import Radar from './charts/radar';
import Sankey from './charts/sankey';

const CHART_CONSTRUCTORS = [
  { chart: Line, name: CHART_LIST.LINE },
  { chart: Bar, name: CHART_LIST.BAR },
  { chart: Scatter, name: CHART_LIST.SCATTER },
  { chart: Kline, name: CHART_LIST.KLINE },
  { chart: Pie, name: CHART_LIST.PIE },
  { chart: Radar, name: CHART_LIST.RADAR },
  { chart: Sankey, name: CHART_LIST.SANKEY },
];

const FundCharts = {
  version: VERSION,
};

CHART_CONSTRUCTORS.forEach(charter => {
  Object.defineProperty(FundCharts, charter.name, {
    configurable: false,
    enumerable: true,
    get() {
      const Drawer = charter.chart;
      class Chart extends InitCore {
        /**
         * @description 是否取消init渲染画布处理（延迟渲染场景）
         * @param bool
         */
        init(renderLate?: boolean) {
          if (!renderLate) this.initContext();
          this.drawer = new Drawer(this);
          if (!renderLate) {
            const drawer = this.drawer as { init?: () => void };
            if (drawer.init) drawer.init();
          }
        }
      }
      return Chart;
    },
  });
});

export default FundCharts;
