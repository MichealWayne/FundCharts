/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * FundCharts
 * 散点图ScatterChart
 */

const FundCharts = require('../../../lib/FundCharts/lib/index.cjs'); // 注意拷FundCharts.min.js

const ScatterChart = FundCharts.scatter;

Page({
  onReady() {
    this.drawScatter();
  },

  drawScatter() {
    // chart 1
    let scatter1 = new ScatterChart({
      id: 'chartscatter1',
      xaxisfunc() {
        return '';
      },
      yaxisfunc() {
        return '';
      },
      noDash: true,
      pointWidths: [5, 3],
      borderRate: 1.5, // 圆点边框
      colors: ['#fe5d4e', '#fe5d4e'],
      datas: [
        [
          [3, 4],
          [3, 6],
          [6, 4],
          [3, 5],
        ],
        [
          [1, 2],
          [2, 5.5],
          [2.5, 5],
          [2, 4],
          [3, 5.5],
          [3.5, 4.4],
          [5, 6],
          [7, 3],
        ],
      ],
      width: 375,
      height: 200,
    });

    scatter1.init();

    // chart 2
    let _arr1 = [],
      _arr2 = [],
      _arr3 = [];
    for (let i = 0; i < 60; i++) {
      if (i % 3 === 0) _arr1.push([Math.random() * 100, Math.random() * 100]);
      if (i % 2 === 0) _arr2.push([Math.random() * 80 + 5, Math.random() * 80 + 5]);
      _arr3.push([Math.random() * 50, Math.random() * 50]);
    }
    let scatter2 = new ScatterChart({
      id: 'chartscatter2',
      yaxisfunc(data) {
        return data.toFixed(0) + '%';
      },
      xaxisfunc(data) {
        return data.toFixed(0) + '天';
      },
      chartTop: 20,
      chartLeft: 30,
      chartRight: 0,
      datas: [_arr1, _arr2, _arr3],
      width: 375,
      height: 200,
    });

    scatter2.init();

    // chart 3
    const scatter3 = new ScatterChart({
      id: 'chartscatter3',
      datas: [_arr1, _arr2, _arr3],
      range: {
        x: [0, 120],
        y: [0, 200],
      },
      grid: {
        showGrid: true, // 刻度线
        color: '#999', // 刻度线颜色
        yTickLength: 8,
        xTickLength: 8,
      },
      dash: {
        length: 1,
      },
      font: {
        color: '#eee',
      },
      noPointSide: true, // 无描边
      chartLeft: 25,
      chartRight: 1,
      backgroundColor: '#000',
      colors: ['#00f', '#0f0', '#f00'],
      pointWidths: [2, 2, 2],
      width: 375,
      height: 200,
    });

    scatter3.init();
  },
});
