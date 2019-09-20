/**
 * FundCharts
 * 饼图/环形图PieCharts
 */

const FundCharts = require('../../FundCharts.min.js');		// 注意拷FundCharts.min.js

const PieChart = FundCharts.pie;


let pie1 = null;
function drawLabel (chart, index, values) {
  let ctx = chart.ctx,
    _origin = chart.drawer.origin;

  // draw texts
  ctx.fillStyle = chart.opts.colors[index];
  ctx.font = 'bold 22px consolas';
  ctx.textAlign = 'center';
  ctx.fillText('第' + (index + 1) + '项', _origin.x, 90);

  ctx.fillStyle = '#666';
  ctx.fillText((values * 100).toFixed(1) + '%', _origin.x, 120);
  ctx.draw(true);
}
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
      hoverRate: 1.15,  // 交互高亮半径
    });

    pie1.init();

    setTimeout(() => {
      pie1.update({
        datas: [0.3, 0.4, 0.2, 0.1]
      })
    }, 2000);


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
        datas: [0.5, 0.2, 0.1, 0.2]
      })
    }, 4000);

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

    // chart 5
    const pie5 = new PieChart({
      id: 'chartpie5',
      annularRate: 0.9,
      colors: ['#f63'],
      backgroundColor: '#000',	// 背景色
      datas: [1],
      duration: 4000,
      width: 375,
      height: 200,
      datas: [1],
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
      }
    });

    setTimeout(() => pie5.init(), 5000)
  },
  // pie 1 chart demo touch start
  chart1Touchstart: function (e) {
    if (e) {
      let event = e.touches[0];
      let index = pie1.drawer.drawHover(event.x, event.y);

      if (index === false) return false;

      drawLabel(pie1, index, pie1.opts.datas[index]);    // 绘制label
    }
  },
  // pie 1 chart demo touch move
  chart1Touchmove: function (e) {
    if (e) {
      let event = e.touches[0];
      let index = pie1.drawer.drawHover(event.x, event.y);

      if (index === false) return false;

      drawLabel(pie1, index, pie1.opts.datas[index]);    // 绘制label
    }
  },
});
