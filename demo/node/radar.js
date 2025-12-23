/* eslint-disable @typescript-eslint/no-var-requires */
/*
 * FundCharts-node
 * @description node test
 * @type bar
 * @author Wayne
 * @Date 2022-03-29 13:42:33
 * @LastEditTime 2022-07-19 17:04:00
 */

const fs = require('fs');
const path = require('path');
const Canvas = require('canvas');
const FundCharts = require('../../lib/FundCharts/lib/index.cjs');

let RadarChart = FundCharts.radar;

// chart 1
const chart1 = new RadarChart({
  id: 'radar1',
  datas: [
    [20, 30, 40, 50, 60, 70],
    [30, 25, 20, 40, 50, 50],
  ],
  Canvas: Canvas,
  handleOut: canvas => {
    let out = fs.createWriteStream(path.join(__dirname, './radar1.jpg')),
      stream = canvas.createJPEGStream();

    stream.on('data', function (chunk) {
      out.write(chunk);
    });
  },
});

chart1.init();

// chart 2
const chart2 = new RadarChart({
  id: 'radar2',
  data: [30, 25, 20, 40, 50, 50],
  Canvas: Canvas,
  radius: 150,
  gridNumber: 1,
  backgroundColor: '#000',
  handleOut: canvas => {
    let out = fs.createWriteStream(path.join(__dirname, './radar2.jpg')),
      stream = canvas.createJPEGStream();

    stream.on('data', function (chunk) {
      out.write(chunk);
    });
  },
});

chart2.init();

// chart 3
const chart3 = new RadarChart({
  id: 'radar3',
  data: [30, 25, 20, 40, 50, 50],
  Canvas: Canvas,
  radius: 150,
  fillGrid: '#00f',
  backgroundColor: '#fff',
  handleOut: canvas => {
    let out = fs.createWriteStream(path.join(__dirname, './radar3.jpg')),
      stream = canvas.createJPEGStream();

    stream.on('data', function (chunk) {
      out.write(chunk);
    });
  },
});

chart3.init();
