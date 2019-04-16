const FundCharts = require('../../FundCharts.min.js');

/**
 * 使用方式可参照web demo
 */
const LineChart = FundCharts.line,
  BarChart = FundCharts.bar,
  PieChart = FundCharts.pie,
  RadarChart = FundCharts.radar;
let line = null

Page({
  onReady() {
    this.drawLine();
    this.drawPie();
    this.drawBar();
    this.drawRadar();
  },

  /**
   * 画折线
   */
  drawLine() {
    line = new LineChart({
      id: 'chartline1',
      xaxis: ['09-11', '09-22', '10-11'],
      yaxisfunc(data) {
        return (data * 100).toFixed(2) + '%'
      },
      width: 375,
      height: 212,
      xaxis: ['07-11', '08-11', '09-11', '09-22', '10-11', '11-11', '12-11'],
      datas: [
        [1, 2, 3, 4, 3.5, 3, 4],
        [4, 3, 4, 2, 3, 5, 6]
      ]
    });

    line.init();
  },

  /**
   * 画饼图
   */
  drawPie() {
    let pie = new PieChart({
      id: 'chartpie1',
      datas: [0.1, 0.2, 0.3, 0.4],
      width: 200,
      height: 200,
    });

    pie.init();
  },

  /**
   * 画柱状图
   */
  drawBar() {
    let bar = new BarChart({
      id: 'chartbar1',
      datas: [0.1, 0.2, 0.3, 0.4],
      width: 375,
      height: 212,
      xaxis: ['09-11', '09-22', '10-11', '11-22'],
      series: [
        [1, 2, 3, 4],
        [1, 5, 4, 2],
        [5, 3, 4, 3]
      ],
      barMargin: 20
    });

    bar.init();
  },

  /**
   * 画雷达图（蜘蛛图）
   */
  drawRadar() {
    let radar = new RadarChart({
      id: 'chartradar1',
      datas: [
        [9, 10, 12, 30, 60],
        [43, 16, 40, 25, 20]
      ],
      width: 200,
      height: 200,
    });

    radar.init();
  },

  // line chart demo touch start
  chartTouchstart: function (e) {
    if (e) {
      let event = e.touches[0];
      let index = line.drawer.drawHover(event.x);
      console.log(line.opts.xaxis[index] + ': ' + line.opts.datas[0][index])
    }
  },
  // line chart demo touch move
  chartTouchmove: function (e) {
    if (e) {
      let event = e.touches[0];
      let index = line.drawer.drawHover(event.x);
      console.log(line.opts.xaxis[index] + ': ' + line.opts.datas[0][index])
    }
  }
})