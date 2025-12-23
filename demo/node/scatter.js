/* eslint-disable @typescript-eslint/no-var-requires */
/*
 * FundCharts-node
 * @description node test
 * @type bar
 * @author Wayne
 * @Date 2022-03-29 13:42:33
 * @LastEditTime 2022-07-19 17:03:46
 */

const fs = require('fs');
const path = require('path');
const Canvas = require('canvas');
const FundCharts = require('../../lib/FundCharts/lib/index.cjs');

// chart 1
const chart1 = new FundCharts.scatter({
  id: 'scatter1',
  width: 750,
  height: 375,
  data: [
    [1, 3],
    [2, 4],
    [5, 6],
    [3, 5],
    [6, 6],
    [7, 5],
    [8, 3],
    [3, 4],
  ],
  backgroundColor: '#fff',
  Canvas: Canvas,
  handleOut: canvas => {
    let out = fs.createWriteStream(path.join(__dirname, './scatter1.jpg')),
      stream = canvas.createJPEGStream();

    stream.on('data', function (chunk) {
      out.write(chunk);
    });
  },
});

chart1.init();

// chart 1
const chart2 = new FundCharts.scatter({
  id: 'scatter2',
  width: 750,
  height: 375,
  datas: [
    [
      [1, 3],
      [2, 4],
      [5, 6],
      [3, 5],
      [6, 6],
      [7, 5],
      [8, 3],
      [3, 4],
      [7, 3],
      [8, 4],
    ],
    [
      [3, 4.2],
      [4.2, 5.2],
      [3.3, 3.4],
      [0.3, 0, 6],
    ],
    [
      [6.1, 6.2],
      [9.2, 7.2],
      [4.3, 5.4],
      [3.6, 5, 6],
    ],
  ],
  Canvas: Canvas,
  handleOut: canvas => {
    let out = fs.createWriteStream(path.join(__dirname, './scatter2.jpg')),
      stream = canvas.createJPEGStream();

    stream.on('data', function (chunk) {
      out.write(chunk);
    });
  },
});

chart2.init();

// chart 3
const chart3 = new FundCharts.scatter({
  id: 'scatter3',
  width: 750,
  height: 375,
  backgroundColor: '#000',
  font: {
    color: '#eee',
  },
  grid: {
    xTickLength: 5,
  },
  dash: {
    color: '#eee',
  },
  datas: [
    [
      [1, 3],
      [2, 4],
      [5, 6],
      [3, 5],
      [6, 6],
      [7, 5],
      [8, 3],
      [3, 4],
      [7, 3],
      [8, 4],
    ],
    [
      [3, 4.2],
      [4.2, 5.2],
      [3.3, 3.4],
      [0.3, 0, 6],
    ],
    [
      [6.1, 6.2],
      [9.2, 7.2],
      [4.3, 5.4],
      [3.6, 5, 6],
    ],
  ],
  Canvas: Canvas,
  handleOut: canvas => {
    let out = fs.createWriteStream(path.join(__dirname, './scatter3.jpg')),
      stream = canvas.createJPEGStream();

    stream.on('data', function (chunk) {
      out.write(chunk);
    });
  },
});

chart3.init();
