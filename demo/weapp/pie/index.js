/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * FundCharts
 * 饼图/环形图PieCharts
 */

const FundCharts = require('../../../lib/FundCharts/lib/index.cjs'); // 注意拷FundCharts.min.js
const FundChartsToolTips = require('../../../lib/FundChartsToolTips/lib/index.cjs'); // 注意拷fundchart-tooltips.js

const { PieCenterToolTip, PieLabelToolTip } = FundChartsToolTips;

const PieChart = FundCharts.pie;

let pie1 = null;
let pie2 = null;
let pie4 = null;

Page({
  onReady() {
    this.drawPie();
  },

  /**
   * 画饼图、环形图
   */
  drawPie() {
    // chart 1
    pie1 = new PieChart({
      id: 'chartpie1',
      datas: [0.1, 0.2, 0.3, 0.4],
      width: 200,
      height: 200,
      hoverRate: 1.15, // 交互高亮半径
      toolTip: {
        showTip(index) {
          return ['吃饭', '睡觉', '打豆豆', '看书'][index];
        },
      },
    });

    pie1.init();

    setTimeout(() => {
      pie1.update({
        datas: [0.3, 0.4, 0.2, 0.1],
      });
    }, 2000);

    // chart 2
    pie2 = new PieChart({
      id: 'chartpie2',
      datas: [0.1, 0.2, 0.3, 0.4],
      annularRate: 0,
      width: 350,
      height: 200,
      toolTip: {
        showTip(index) {
          return ['吃饭', '睡觉', '打豆豆', '看书'][index];
        },
      },
    });

    pie2.init();

    setTimeout(() => {
      pie2.update({
        datas: [0.5, 0.2, 0.1, 0.2],
      });
    }, 4000);

    // chart 3
    const pie3 = new PieChart({
      id: 'chartpie3',
      annularRate: 0.8,
      lineWidth: 4,
      width: 375,
      height: 200,
      backgroundColor: '#000', // 背景色
      origin: {
        x: 100,
        y: 100,
      },
      datas: [0.5, 0.2, 0.2, 0.1],
      onAnimation: rate => {
        // 跟随动画绘制
        let ctx = pie3.ctx;
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 22px consolas';
        ctx.textAlign = 'center';
        ctx.fillText('FundChart', 100, 90);
        ctx.fillText((rate * 100).toFixed(2) + '%', 100, 120);
        ctx.draw(true);
      },
    });

    pie3.init();

    // chart 4
    pie4 = new PieChart({
      id: 'chartpie4',
      radius: 90, // 半径
      lineWidth: 2,
      width: 375,
      height: 200,
      annularRate: false,
      widthRates: [0.5, 0.6, 0.7, 0.8, 1], // 控制宽度
      datas: [0.05, 0.1, 0.25, 0.3, 0.3],
      toolTip: {
        valColor: '#000',
        showTip(index) {
          return ['A', 'B', 'C', 'D', 'E'][index];
        },
        showValTip(val) {
          return val.toFixed(2) + '%';
        },
      },
    });

    pie4.init();

    // chart 5
    const pie5 = new PieChart({
      id: 'chartpie5',
      annularRate: 0.9,
      colors: ['#f63'],
      backgroundColor: '#000', // 背景色
      datas: [1],
      duration: 4000,
      width: 375,
      height: 200,
      startAngle: -Math.PI,
      onAnimation: rate => {
        let ctx = pie5.ctx,
          _origin = pie5.drawer.origin,
          _radius = pie5.drawer.radiusWhite;

        // draw circle
        ctx.strokeStyle = '#525356';
        ctx.strokeWidth = 1;

        ctx.moveTo(_origin.x, _origin.y);
        ctx.beginPath();
        ctx.arc(_origin.x, _origin.y, _radius - 1, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // draw texts
        ctx.fillStyle = '#f63';
        ctx.font = 'bold 22px consolas';
        ctx.textAlign = 'center';
        ctx.fillText('FundChart', _origin.x, 90);
        ctx.fillText((rate * 100).toFixed(2) + '%', _origin.x, 120);
      },
    });

    setTimeout(() => pie5.init(), 5000);
  },
  // pie 1 chart demo touch start
  chart1Touchstart: function (e) {
    if (e) {
      let event = e.touches[0];
      let index = pie1.drawer.drawHover(event.x, event.y);

      if (index === false) return false;

      PieCenterToolTip.call(pie1, index, [pie1.opts.datas[index]]);
    }
  },
  // pie 1 chart demo touch move
  chart1Touchmove: function (e) {
    if (e) {
      let event = e.touches[0];
      let index = pie1.drawer.drawHover(event.x, event.y);

      if (index === false) return false;

      PieCenterToolTip.call(pie1, index, [pie1.opts.datas[index]]);
    }
  },

  // pie 2 chart demo touch start
  chart2Touchstart: function (e) {
    if (e) {
      let event = e.touches[0];
      let index = pie2.drawer.drawHover(event.x, event.y);

      if (index === false) return false;

      PieLabelToolTip.call(pie2, index, [pie2.opts.datas[index]]);
    }
  },
  // pie 2 chart demo touch move
  chart2Touchmove: function (e) {
    if (e) {
      let event = e.touches[0];
      let index = pie2.drawer.drawHover(event.x, event.y);

      if (index === false) return false;

      PieLabelToolTip.call(pie2, index, [pie2.opts.datas[index]]); // 绘制label
    }
  },

  // pie 4 chart demo touch start
  chart4Touchstart: function (e) {
    if (e) {
      let event = e.touches[0];
      let index = pie4.drawer.drawHover(event.x, event.y);

      if (index === false) return false;

      PieLabelToolTip.call(pie4, index, [pie4.opts.datas[index]]);
    }
  },
  // pie 4 chart demo touch move
  chart4Touchmove: function (e) {
    if (e) {
      let event = e.touches[0];
      let index = pie4.drawer.drawHover(event.x, event.y);

      if (index === false) return false;

      PieLabelToolTip.call(pie4, index, [pie4.opts.datas[index]]); // 绘制label
    }
  },
});
