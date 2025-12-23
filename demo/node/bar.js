/* eslint-disable @typescript-eslint/no-var-requires */
/*
 * FundCharts-node
 * @description node test
 * @type bar
 * @author Wayne
 * @Date 2022-03-29 13:42:33
 * @LastEditTime 2022-07-19 16:58:57
 */

const fs = require('fs');
const path = require('path');
const Canvas = require('canvas');
const FundCharts = require('../../lib/FundCharts/lib/index.cjs');

let BarChart = FundCharts.bar;

// chart 1
const chart1 = new BarChart({
  id: 'bar1',
  xaxis: ['07-11', '08-11', '09-11', '09-22', '10-11', '11-11', '12-11', '12-12'],
  datas: [[1, 3, 2, 3, 3.2, 4, 5]],
  width: 750,
  height: 375,
  backgroundColor: '#fff',
  Canvas: Canvas,
  handleOut: canvas => {
    let out = fs.createWriteStream(path.join(__dirname, './bar1.jpg')),
      stream = canvas.createJPEGStream();

    stream.on('data', function (chunk) {
      out.write(chunk);
    });
  },
});

chart1.init();

// chart 2
const chart2 = new BarChart({
  id: 'bar2',
  xaxis: [
    '07-11',
    '08-11',
    '09-11',
    '09-22',
    '10-11',
    '11-11',
    '12-11',
    '12-12',
    '12-13',
    '12-14',
    '12-15',
    '12-16',
    '12-17',
    '12-18',
    '12-19',
    '12-20',
  ],
  datas: [
    [1, 3, 2, 3, 3.2, 4, 5, 6, 3, 5, 3, 2, 3, 3.2, 4, 5],
    [2, 3, 5, 1, 2, 3, 6, 7, 3, 4, 2, 4, 3, 3.2, 4, 5],
    [4, 2, 1, 1, 1, 4, 7, 5, 5, 3, 2, 2, 4, 4, 3, 2],
  ],
  Canvas: Canvas,
  width: 750,
  height: 375,
  backgroundColor: '#fff',
  handleOut: canvas => {
    let out = fs.createWriteStream(path.join(__dirname, './bar2.jpg')),
      stream = canvas.createJPEGStream();

    stream.on('data', function (chunk) {
      out.write(chunk);
    });
  },
});

chart2.init();

// chart 3
const chart3 = new BarChart({
  id: 'bar3',
  xaxis: ['07-11', '08-11', '09-11', '09-22', '10-11', '11-11', '12-11', '12-12'],
  datas: [[5, 4, 3, 2, -1, -2, 3]],
  singleColorful: true,
  grid: {
    showGrid: true,
  },
  backgroundColor: '#fff',
  width: 750,
  height: 375,
  Canvas: Canvas,
  handleOut: canvas => {
    let out = fs.createWriteStream(path.join(__dirname, './bar3.jpg')),
      stream = canvas.createJPEGStream();

    stream.on('data', function (chunk) {
      out.write(chunk);
    });
  },
});

chart3.init();
