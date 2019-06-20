/**
 * FundCharts
 * 饼图/环形图
 */

const FundCharts = require('../../FundCharts.min.js');		// 注意拷FundCharts.min.js

const PieChart = FundCharts.pie;


Page({

  onReady() {
    this.drawPie();
  },

  /**
   * 画饼图、环形图
   */
  drawPie() {
    // chart 1
    let pie1 = new PieChart({
      id: 'chartpie1',
      datas: [0.1, 0.2, 0.3, 0.4],
      width: 200,
      height: 200,
    });

    pie1.init();

    // chart 2
    let pie2 = new PieChart({
      id: 'chartpie2',
      datas: [0.1, 0.2, 0.3, 0.4],
      annularRate: 0,
      width: 200,
      height: 200,
    });

    pie2.init();

    setTimeout(() => {
      pie2.update({
        datas: [0.3, 0.2, 0.1, 0.4]
      })
    }, 2000);

    // chart 3
    const pie3 = new PieChart({
      id: 'chartpie3',
      annularRate: 0.8,
      lineWidth: 4,
      width: 375,
      height: 200,
      backgroundColor: '#000',	// 背景色
      origin: {
        x: 100,
        y: 100
      },
      datas: [0.5, 0.2, 0.2, 0.1],
      onAnimation: rate => {    // 跟随动画绘制
        let ctx = pie3.ctx;
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 22px consolas';
        ctx.textAlign = 'center';
        ctx.fillText('FundChart', 100, 90);
        ctx.fillText((rate * 100).toFixed(2) + '%', 100, 120);
        ctx.draw(true)
      }
    });

    pie3.init();

    // chart 4
    const pie4 = new PieChart({
      id: 'chartpie4',
      radius: 90,       // 半径
      lineWidth: 2,
      width: 375,
      height: 200,
      annularRate: false,
      widthRates: [0.5, 0.6, 0.7, 0.8, 1],     // 控制宽度
      datas: [0.05, 0.1, 0.25, 0.3, 0.3]
    });

    pie4.init();
  }
});
