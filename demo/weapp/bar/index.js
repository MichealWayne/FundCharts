/**
 * FundCharts
 * 柱状图
 */

const FundCharts = require('../../FundCharts.min.js');		// 注意拷FundCharts.min.js

const BarChart = FundCharts.bar;

Page({

  onReady() {
    this.drawBar();
  },

  /**
   * 画柱状图
   */
  drawBar() {
    // chart 1
    let bar1 = new BarChart({
      id: 'chartbar1',
      width: 375,
      height: 212,
      xaxis: ['07-11', '08-11', '09-11', '09-22', '10-11', '11-11', '12-11', '12-12'],
      data: [1, 3, 2, 3, 3.2, 4, 5],
    });

    bar1.init();

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
      colors: ['#e00'],
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
        let datasets = bar4.dataset;
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
  },
});
