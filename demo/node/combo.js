/* eslint-disable @typescript-eslint/no-var-requires */
/*
 * FundCharts-node
 * @description node test
 * @type combo
 * @author Wayne
 * @Date 2022-03-29 13:42:33
 * @LastEditTime 2022-07-19 16:55:00
 */

const fs = require('fs');
const path = require('path');
const Canvas = require('canvas');
const FundCharts = require('../../lib/FundCharts/lib/index.cjs');

// chart 1
let _xaxis1 = [
  '1-1',
  '1-2',
  '1-3',
  '1-4',
  '1-5',
  '1-6',
  '1-7',
  '1-8',
  '1-9',
  '1-10',
  '2-1',
  '2-2',
  '2-3',
  '2-4',
  '2-5',
  '2-6',
  '2-7',
  '2-8',
  '2-9',
  '2-10',
  '3-1',
  '3-2',
  '3-3',
  '3-4',
  '3-5',
  '3-6',
  '3-7',
  '3-8',
  '3-9',
  '3-10',
  '4-1',
  '4-2',
  '4-3',
  '4-4',
  '4-5',
  '4-6',
  '4-7',
  '4-8',
  '4-9',
  '4-10',
  '5-1',
  '5-2',
  '5-3',
  '5-4',
  '5-5',
  '5-6',
  '5-7',
  '5-8',
  '5-9',
  '5-10',
  '6-1',
  '6-2',
  '6-3',
  '6-4',
  '6-5',
  '6-6',
  '6-7',
  '6-8',
  '6-9',
  '6-10',
  '7-1',
  '7-2',
  '7-3',
  '7-4',
  '7-5',
  '7-6',
  '7-7',
  '7-8',
  '7-9',
  '7-10',
  '7-11',
];
let klineData = [
  [2320.26, 2320.26, 2287.3, 2362.94],
  [2300, 2291.3, 2288.26, 2308.38],
  [2295.35, 2346.5, 2295.35, 2346.92],
  [2347.22, 2358.98, 2337.35, 2363.8],
  [2360.75, 2382.48, 2347.89, 2383.76],
  [2383.43, 2385.42, 2371.23, 2391.82],
  [2377.41, 2419.02, 2369.57, 2421.15],
  [2425.92, 2428.15, 2417.58, 2440.38],
  [2411, 2433.13, 2403.3, 2437.42],
  [2432.68, 2434.48, 2427.7, 2441.73],
  [2430.69, 2418.53, 2394.22, 2433.89],
  [2416.62, 2432.4, 2414.4, 2443.03],
  [2441.91, 2421.56, 2415.43, 2444.8],
  [2420.26, 2382.91, 2373.53, 2427.07],
  [2383.49, 2397.18, 2370.61, 2397.94],
  [2378.82, 2325.95, 2309.17, 2378.82],
  [2322.94, 2314.16, 2308.76, 2330.88],
  [2320.62, 2325.82, 2315.01, 2338.78],
  [2313.74, 2293.34, 2289.89, 2340.71],
  [2297.77, 2313.22, 2292.03, 2324.63],
  [2322.32, 2365.59, 2308.92, 2366.16],
  [2364.54, 2359.51, 2330.86, 2369.65],
  [2332.08, 2273.4, 2259.25, 2333.54],
  [2274.81, 2326.31, 2270.1, 2328.14],
  [2333.61, 2347.18, 2321.6, 2351.44],
  [2340.44, 2324.29, 2304.27, 2352.02],
  [2326.42, 2318.61, 2314.59, 2333.67],
  [2314.68, 2310.59, 2296.58, 2320.96],
  [2309.16, 2286.6, 2264.83, 2333.29],
  [2282.17, 2263.97, 2253.25, 2286.33],
  [2255.77, 2270.28, 2253.31, 2276.22],
  [2269.31, 2278.4, 2250, 2312.08],
  [2267.29, 2240.02, 2239.21, 2276.05],
  [2244.26, 2257.43, 2232.02, 2261.31],
  [2257.74, 2317.37, 2257.42, 2317.86],
  [2318.21, 2324.24, 2311.6, 2330.81],
  [2321.4, 2328.28, 2314.97, 2332],
  [2334.74, 2326.72, 2319.91, 2344.89],
  [2318.58, 2297.67, 2281.12, 2319.99],
  [2299.38, 2301.26, 2289, 2323.48],
  [2273.55, 2236.3, 2232.91, 2273.55],
  [2238.49, 2236.62, 2228.81, 2246.87],
  [2229.46, 2234.4, 2227.31, 2243.95],
  [2234.9, 2227.74, 2220.44, 2253.42],
  [2232.69, 2225.29, 2217.25, 2241.34],
  [2196.24, 2211.59, 2180.67, 2212.59],
  [2215.47, 2225.77, 2215.47, 2234.73],
  [2224.93, 2226.13, 2212.56, 2233.04],
  [2236.98, 2219.55, 2217.26, 2242.48],
  [2218.09, 2206.78, 2204.44, 2226.26],
  [2199.91, 2181.94, 2177.39, 2204.99],
  [2169.63, 2194.85, 2165.78, 2196.43],
  [2195.03, 2193.8, 2178.47, 2197.51],
  [2181.82, 2197.6, 2175.44, 2206.03],
  [2201.12, 2244.64, 2200.58, 2250.11],
  [2236.4, 2242.17, 2232.26, 2245.12],
  [2242.62, 2184.54, 2182.81, 2242.62],
  [2187.35, 2218.32, 2184.11, 2226.12],
  [2213.19, 2199.31, 2191.85, 2224.63],
  [2203.89, 2177.91, 2173.86, 2210.58],
  [2170.78, 2174.12, 2161.14, 2179.65],
  [2179.05, 2205.5, 2179.05, 2222.81],
  [2212.5, 2231.17, 2212.5, 2236.07],
  [2227.86, 2235.57, 2219.44, 2240.26],
  [2242.39, 2246.3, 2235.42, 2255.21],
  [2246.96, 2232.97, 2221.38, 2247.86],
  [2228.82, 2246.83, 2225.81, 2247.67],
  [2247.68, 2241.92, 2231.36, 2250.85],
  [2238.9, 2217.01, 2205.87, 2239.93],
  [2217.09, 2224.8, 2213.58, 2225.19],
  [2221.34, 2251.81, 2210.77, 2252.87],
];

// 制造假的折线数据
let line1Data = [],
  _val = 2300;
for (let i = 0, len = klineData.length; i < len; i++) {
  line1Data.push((_val += ~~((Math.random() - 0.55) * 20)));
}

const CHART1_COMMON = {
  chartTop: 10,
  chartLeft: 30,
  chartRight: 10,
};
const chart1 = new FundCharts.kline({
  id: 'kline1',
  xaxis: _xaxis1,
  datas: klineData,

  ...CHART1_COMMON,
  upHollow: true,
  backgroundColor: '#000', // 背景色
  font: {
    color: '#eee', // 文字颜色
  },
  Canvas: Canvas,
  width: 750,
  height: 375,
  handleOut: canvas => {
    let out = fs.createWriteStream(path.join(__dirname, './combo1.jpg')),
      stream = canvas.createJPEGStream();

    stream.on('data', function (chunk) {
      out.write(chunk);
    });
  },
  yaxisfunc(val) {
    return val.toFixed(1);
  },
});
chart1.init();
let drawer = chart1.drawer,
  yaxis = drawer.yaxis;
let _chart2 = new FundCharts.line({
  id: 'kline1Canvas',
  xaxis: _xaxis1,
  ...CHART1_COMMON,
  noGradient: true,
  noAnimation: true,
  range: {
    min: yaxis.min,
    max: yaxis.max,
  },
  data: line1Data,
  colors: ['#71b7f9'],
});

_chart2.init(true);
_chart2._chart = chart1._chart;
_chart2.$el = chart1.$el;
_chart2.canvas = chart1.canvas;
_chart2.ctx = chart1.ctx;
_chart2.drawer.setDataset();
_chart2.drawer.drawLine();

chart1._chart2 = _chart2;

// chart 2
let _xaxis2 = ['07-11', '08-11', '09-11', '09-22', '10-11', '11-11', '12-11'];
let bardata = [1, 2, 3, 4, 3.5, 3, 4];

const CHART2_COMMON = {
  chartTop: 10,
  chartLeft: 30,
  chartRight: 10,
};
const chart2 = new FundCharts.bar({
  id: 'bar1',
  ...CHART2_COMMON,
  grid: {
    showGrid: true,
  },
  xaxis: _xaxis2,
  data: bardata,
  Canvas: Canvas,
  width: 750,
  height: 375,
  backgroundColor: '#fff',
  handleOut: canvas => {
    let out = fs.createWriteStream(path.join(__dirname, './combo2.jpg')),
      stream = canvas.createJPEGStream();

    stream.on('data', function (chunk) {
      out.write(chunk);
    });
  },
});
chart2.init();

(function () {
  let drawer2 = chart2.drawer,
    yaxis2 = drawer2.yaxis;
  let _chart2 = new FundCharts.line({
    id: 'bar1Canvas',
    xaxis: _xaxis2,
    ...CHART2_COMMON,
    chartLeft: 85,
    chartRight: 60,
    noGradient: true,
    noAnimation: true,
    range: {
      min: yaxis2.min,
      max: yaxis2.max,
    },
    data: bardata,
    colors: ['#71b7f9'],
    backgroundColor: '#fff',
  });

  _chart2.init(true);
  _chart2._chart = chart2._chart;
  _chart2.$el = chart2.$el;
  _chart2.canvas = chart2.canvas;
  _chart2.ctx = chart2.ctx;
  _chart2.drawer.setDataset();
  _chart2.drawer.drawLine();

  let datasets = _chart2.datasets[0];
  let ctx = _chart2.ctx,
    chartLeft = CHART2_COMMON.chartLeft;
  ctx.save();
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#fff';
  ctx.fillStyle = '#ffa61b';

  datasets.map(data => {
    ctx.beginPath();
    ctx.arc(data.x, data.y, 4, 0, Math.PI * 2, true);
    ctx.closePath();

    ctx.fill();

    ctx.stroke();
    ctx.font = '13px Arial';
    ctx.textAlign = 'center';
    let x = data.x - 10 < chartLeft ? chartLeft + 10 : data.x;
    ctx.fillText(data.value.toFixed(2), x, data.y - 10);
  });
  ctx.restore();
  chart2._chart2 = _chart2;
})();
