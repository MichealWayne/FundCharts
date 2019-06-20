/**
 * FundCharts
 * 雷达图
 */

const FundCharts = require('../../FundCharts.min.js');		// 注意拷FundCharts.min.js

const RadarChart = FundCharts.radar;


Page({

  onReady() {
    this.drawRadar();
  },

  drawRadar() {
    // chart 1
    let radar = new RadarChart({
      id: 'chartradar1',
      data: [1, 2, 3, 4, 3.5, 3],
      width: 375,
      height: 200,
    });

    radar.init();

    // chart 2
    let radar2 = new RadarChart({
      id: 'chartradar2',
      hidePoints: true,   // 无点
      datas: [
        [1, 2, 3, 4, 3.5, 3, 4],
        [4, 3, 3, 4, 3.5, 3, 4]
      ],
      width: 375,
      height: 200,
    });

    radar2.init();

    setTimeout(() => {
      radar2.update({
        datas: [
          [6, 5, 4, 6, 5, 3, 2],
          [4, 3, 3, 4, 3.5, 4, 5]
        ]
      })
    }, 2000);

    // chart 3
    const radar3 = new RadarChart({
      id: 'chartradar3',
      noAnimation: true,   // 无动画
      noFill: true,   // 无填充色
      gridNumber: 2,  // 网格数量
      maxRate: 1,     // 最高比例
      backgroundColor: '#000',    // 背景色
      datas: [
        [1, 2, 3, 4, 3.5, 3, 4],
        [4, 3, 3, 4, 3.5, 3, 4]
      ],
      width: 375,
      height: 200,
    });

    radar3.init();

    // chart 4
    const radar4 = new RadarChart({
      id: 'chartradar4', 
      colors: ['#009966'],
      radius: 70,     // 半径
      origin: {       // 中心
        x: 120,
        y: 100
      },
      data: [1, 2, 3, 4, 3.5],
      onFinish: () => {
        let tits = ['吃', '喝', '住', '睡', '玩'];

        let ctx = radar4.ctx;
        ctx.lineWidth = 1;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '$12px Arial';
        ctx.fillStyle = '#000';
        radar4.drawer.sideArr.map((item, index) => {
          ctx.fillText(
            tits[index],
            radar4.drawer.origin.x + item.x * radar4.drawer.radius * 1.2,
            radar4.drawer.origin.y + item.y * radar4.drawer.radius * 1.2
          );
        });
        ctx.draw(true);
      },
      width: 375,
      height: 200,
    });

    radar4.init();
  }
});
