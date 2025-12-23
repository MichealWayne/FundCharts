/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * FundCharts
 * 雷达图RadarChart
 */

const FundCharts = require('../../../lib/FundCharts/lib/index.cjs'); // 注意拷FundCharts.min.js
const FundChartsToolTips = require('../../../lib/FundChartsToolTips/lib/index.cjs'); // 注意拷fundchart-tooltips.js

const { LabelsToolTip } = FundChartsToolTips;

const RadarChart = FundCharts.radar;

let radar1 = null;
let radar2 = null;

Page({
  onReady() {
    this.drawRadar();
  },

  drawRadar() {
    // chart 1
    radar1 = new RadarChart({
      id: 'chartradar1',
      datas: [1, 2, 3, 4, 3.5, 3],
      width: 375,
      height: 200,
      toolTip: {
        showTip(index) {
          return 'data' + (index + 1);
        },
      },
    });

    radar1.init();

    setTimeout(() => {
      radar1.update({
        datas: [6, 5, 4, 3, 2, 1],
      });
    }, 2000);

    // chart 2
    radar2 = new RadarChart({
      id: 'chartradar2',
      hidePoints: true, // 无点
      datas: [
        [1, 2, 3, 4, 3.5, 3, 4],
        [4, 3, 3, 4, 3.5, 3, 4],
      ],
      width: 375,
      height: 200,
      toolTip: {
        valColor: '#000',
        showTip(index) {
          return 'data' + (index + 1);
        },
        showValTip(data) {
          return ~~data + '个';
        },
      },
    });

    radar2.init();

    setTimeout(() => {
      radar2.update({
        datas: [
          [6, 5, 4, 6, 5, 3, 2],
          [4, 3, 3, 4, 3.5, 4, 5],
        ],
      });
    }, 4000);

    // chart 3
    const radar3 = new RadarChart({
      id: 'chartradar3',
      noAnimation: true, // 无动画
      noFill: true, // 无填充色
      gridNumber: 2, // 网格数量
      maxRate: 1, // 最高比例
      backgroundColor: '#000', // 背景色
      datas: [
        [1, 2, 3, 4, 3.5, 3, 4],
        [4, 3, 3, 4, 3.5, 3, 4],
      ],
      width: 375,
      height: 200,
    });

    radar3.init();

    // chart 4
    const radar4 = new RadarChart({
      id: 'chartradar4',
      colors: ['#009966'],
      fillGrid: '#f00', // 填充背景
      radius: 70, // 半径
      origin: {
        // 中心
        x: 120,
        y: 100,
      },
      datas: [1, 2, 3, 4, 3.5],
      onAnimation: () => {
        let tits = ['吃', '喝', '住', '睡', '玩'];

        let ctx = radar4.ctx;
        ctx.lineWidth = 1;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '12px Arial';
        ctx.fillStyle = '#000';
        radar4.drawer.sideArr.map((item, index) => {
          ctx.fillText(
            tits[index],
            radar4.drawer.origin.x + item.x * radar4.drawer.radius * 1.2,
            radar4.drawer.origin.y - item.y * radar4.drawer.radius * 1.2
          );
        });
      },
      width: 375,
      height: 200,
    });

    radar4.init();
  },
  // radar 1 chart demo touch start
  chart1Touchstart: function (e) {
    if (e) {
      let event = e.touches[0];
      let index = radar1.drawer.drawHover(event.x, event.y);

      if (index === false) return false;
      LabelsToolTip.call(radar1, index, [radar1.opts.datas[0][index]]);
    }
  },
  // radar 1 chart demo touch move
  chart1Touchmove: function (e) {
    if (e) {
      let event = e.touches[0];
      let index = radar1.drawer.drawHover(event.x, event.y);

      if (index === false) return false;
      LabelsToolTip.call(radar1, index, [radar1.opts.datas[0][index]]);
    }
  },
  // radar 2 chart demo touch start
  chart2Touchstart: function (e) {
    if (e) {
      let event = e.touches[0];
      let index = radar2.drawer.drawHover(event.x, event.y);

      if (index === false) return false;
      LabelsToolTip.call(
        radar2,
        index,
        radar2.opts.datas.map(item => item[index])
      );
    }
  },
  // radar 2 chart demo touch move
  chart2Touchmove: function (e) {
    if (e) {
      let event = e.touches[0];
      let index = radar2.drawer.drawHover(event.x, event.y);

      if (index === false) return false;
      LabelsToolTip.call(
        radar2,
        index,
        radar2.opts.datas.map(item => item[index])
      );
    }
  },
});
