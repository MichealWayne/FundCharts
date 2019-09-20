/**
 * FundCharts
 * 柱状图BarChart
 */

const FundCharts = require('../../FundCharts.min.js');		// 注意拷FundCharts.min.js

const BarChart = FundCharts.bar;
let bar1 = null;

function drawLabel (chart, index, yValue) {
  let ctx = chart.ctx;
  let datasets = chart.datasets[0];

  ctx.lineWidth = 1;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '12px Arial';
  ctx.fillStyle = '#333';
  
  ctx.fillText(
    yValue.toFixed(2),
    datasets[index].x + 10,
    datasets[index].y - 10
  );
  ctx.draw(true);
}

Page({

  onReady() {
    this.drawBar();
  },

  /**
   * 画柱状图
   */
  drawBar() {
    // chart 1
    bar1 = new BarChart({
      id: 'chartbar1',
      width: 375,
      height: 212,
      xaxis: ['07-11', '08-11', '09-11', '09-22', '10-11', '11-11', '12-11', '12-12'],
      data: [1, 3, 2, 3, 3.2, 4, 5],
    });

    bar1.init();

    setTimeout(() => {
      bar1.update({
        data: [8, 7, 4, 2, 5, 5, 4]
      })
    }, 2000);

    // chart 2
    let bar2 = new BarChart({
      id: 'chartbar2',
      width: 375,
      height: 212,
      xaxis: ['07-11', '08-11', '09-11', '09-22', '10-11', '11-11', '12-11', '12-12', '12-13', '12-14', '12-15', '12-16', '12-17', '12-18', '12-19', '12-20'],
      datas: [
        [1, 3, 2, 3, 3.2, 4, 5, 6, 3, 5, 3, 2, 3, 3.2, 4, 5],
        [2, 3, 5, 1, 2, 3, 6, 7, 3, 4, 2, 4, 3, 3.2, 4, 5],
        [4, 2, 1, 1, 1, 4, 7, 5, 5, 3, 2, 2, 4, 4, 3, 2]
      ]
    });

    bar2.init();

    setTimeout(() => {
      bar2.update({
        datas: [
          [8, 6, 7, 7, 2, 5, 5, 3, 3, 5, 6, 3, 3, 6, 2, 8],
          [6, 5, 5, 4, 1, 5, 6, 3, 3, 4, 6, 4, 3, 4, 4, 8],
          [7, 5, 5, 6, 4, 5, 7, 5, 5, 3, 5, 5, 4, 2, 6, 8]
        ]
      })
    }, 5000);

    // chart 3
    let bar3 = new BarChart({
      id: 'chartbar3',
      width: 375,
      height: 212,
      xaxis: ['07-11', '08-11', '09-11', '09-22', '10-11', '11-11', '12-11', '12-12', '12-13', '12-14', '12-15', '12-16', '12-17', '12-18', '12-19', '12-20'],
      datas: [
        [1, 3, 2, 3, 3.2, 4, 5, -6.1, -3, -5, 3, 2, 3, 3.2, 4, 5]
      ],
      font: {
        color: '#fff'
      },
      colors: ['#6892df'],
      negativeColor: '#88dd4c',   // 负值指定颜色
      noAnimation: true, // 没有动画
      backgroundColor: '#333'	// 背景色
    });

    bar3.init();

    // chart 4
    let timeArr = ['07-11', '08-11', '09-11', '09-22', '10-11', '11-11', '12-11', '12-12'],
      valArr = [1, 3, 2, 3, 3.2, 4, 5, -3];
    let bar4 = new BarChart({
      id: 'chartbar4',
      width: 375,
      height: 212,
      xaxis: timeArr,
      range: {
        min: -10,
        max: 10
      },
      data: valArr,
      onFinish: () => {     // 添加文案
        let ctx = bar4.ctx;
        let datasets = bar4.datasets[0];
        let _zero = bar4.drawer.zeroY;

        ctx.lineWidth = 1;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '10px Arial';
        ctx.fillStyle = '#000';
        datasets.map((item, index) => {
          ctx.fillText(
            valArr[index].toFixed(2),
            item.x - 10,
            item.y + 10 * (item.y > _zero && 1 || -1)
          );
        });
        ctx.draw(true);
      }
    });

    setTimeout(() => bar4.init(), 1000);

    // chart 5
    let bar5 = new BarChart({
      id: 'chartbar5',
      width: 375,
      height: 212,
      xaxis: ['07-11', '08-11', '09-11', '09-22', '10-11', '11-11', '12-11', '12-12', '12-13', '12-14', '12-15', '12-16', '12-17', '12-18', '12-19', '12-20'],
      datas: [
        [1, 3, 2, 3, 3.2, 4, 5, -6.1, -3, -5, 3, 2, 3, 3.2, 4, 5]
      ],
      colors: ['#09f', '#0fc', '#cf0'],
      singleColorful: true, // 单项多色
      grid: {
        showGrid: true,   // 展示轴线
      }
    });

    bar5.init();
  },

  // bar 1 chart demo touch start
  chart1Touchstart: function (e) {
    if (e) {
      let event = e.touches[0];
      let index = bar1.drawer.drawHover(event.x);
      
      if (index === undefined) return false;

      drawLabel(bar1, index, bar1.opts.datas[0][index]);    // 绘制label
    }
  },
  // bar 1 chart demo touch move
  chart1Touchmove: function (e) {
    if (e) {
      let event = e.touches[0];
      let index = bar1.drawer.drawHover(event.x);
      if (!index === undefined) return false;
      
      drawLabel(bar1, index, bar1.opts.datas[0][index]);    // 绘制label
    }
  },
});
