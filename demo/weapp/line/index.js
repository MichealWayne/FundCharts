/**
 * FundCharts
 * 折线图LineCharts
 */

const FundCharts = require('../../FundCharts.min.js');		// 注意拷FundCharts.min.js

const LineChart = FundCharts.line;

let line1 = null,
    line2 = null;

/**
 * @function drawLabel
 * @description 绘制canvas提示框（实例的再次绘制） 
 * @param {Object} chart LineChart实例
 * @param {Number} eventx 触控x轴距离
 * @param {String} text 绘制文案
 */
function drawLabel (chart, eventx, text) {
  let _x = Number(eventx);
  // rect
  let ctx = chart.ctx;
  ctx.fillStyle = '#9d9d9d';
  let _rectX = _x - 32;
  _rectX = _rectX < 50 ? 50 : _rectX > 300 ? 300 : _rectX;
  ctx.fillRect(_rectX, 0, 68, 15);

  // text
  ctx.fillStyle = '#fff';
  ctx.font = '10px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(text, _rectX + 32, 9);
  ctx.closePath();
  ctx.stroke();
  ctx.draw(true);
}

Page({
  data: {
    // line 1 values
    line1Time: '--',
    line1Sy: '--',

    // line 2 values
    line2Time1: '--',
    line2Sy1: '--',
    line2Time2: '--',
    line2Sy2: '--',
    line2Time3: '--',
    line2Sy3: '--'
  },

  onReady() {
    this.drawLine();
  },

  /**
   * 画折线图、面积图
   */
  drawLine() {
    // line chart 1
    let line1data = [1, 2, 3, 4, 3.5, 3, 4];
    let line1xaxis = ['1-11', '2-11', '3-11', '4-22', '5-11', '6-11', '7-11']
    line1 = new LineChart({
      id: 'chartline1',
      yaxisfunc(data) {     // 处理y轴刻度数值
        return (data).toFixed(0) + '%'
      },
      font: {
        color: '#eee'
      },
      width: 375,
      height: 212,
      noGradient: true,     // 无渐变面积
      xaxis: line1xaxis,
      data: line1data
      
    });
    line1.init();

    let line1timer = setInterval(() => {
      line1xaxis.push(++line1xaxis[line1xaxis.length - 1].split('-')[0] + '-11');
      line1data.push(Math.round(10 * Math.random()));

      line1.update({
        xaxis: line1xaxis,
        data: line1data
      })
    }, 2000);

    setTimeout(() => {
      clearInterval(line1timer);
    }, 8000)

    // line chart 2
    line2 = new LineChart({
      id: 'chartline2',
      yaxisfunc(data) {
        return data.toFixed(0) + 'w'
      },
      width: 375,
      height: 212,
      noGradient: true,
      grid: {
        yTickLength: 7, // y轴刻度数量
        xTickLength: 5  // x轴刻度数量
      },
      chartLeft: 30,        // 图形区域距离左边距离(px)
      lineWidths: [4, 2, 1],     // 折线粗细
      colors: ['#03c', '#0cc', '#fa0'],   // 折线颜色
      pointStyle: '#f00',			// 点边框颜色
      hoverLineColor: 'orange',		// 触控线的颜色
      xaxis: ['07-11', '08-11', '09-11', '09-22', '10-11', '11-11', '12-11', '01-11', '02-11', '03-11', '04-11', '05-11', '06-11', '07-11'],
      datas: [
        [2, 2, 3, 4, 3.5, 3, 4, 3],
        [2, 3, 4, 2, 3, 5, 6, 5],
        [2, 4, 6, 3, 1, 2, 1, 3.3]
      ]
    });
    line2.init();

    setTimeout(() => {
      line2.update({
        datas: [
          [2, 5, 6, 2, 1, 2, 3, 2, 5, 5, 7, 8, 9, 10],
          [2, 4, 6, 5, 7, 7, 3, 4, 5, 3, 2, 1, 0, 1],
          [2, 8, 7, 5, 7, 3, 5, 7, 4, 4, 6, 9, 10, 11]
        ]
      })
    }, 5000);


    // line chart 3
    let xArr = ['07-11', '08-11', '09-11', '09-22', '10-11', '11-11', '12-11'];
    let line3 = new LineChart({
      id: 'chartline3',
      width: 375,
      height: 212,
      allGradient: true,    // 设置面积渐变
      xaxis: xArr,
      
      handleTextX: (ctx, xaxis) => {      // 处理x轴文字
        // 增加x轴刻度
        let _chartWidth = line3.canvas.width - line3.opts.chartLeft - line3.opts.chartRight;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '10px Arial';
        ctx.fillStyle = '#333';
        for (let i in xArr) {
          ctx.fillText(xArr[i], (_chartWidth / (xArr.length - 1) * i) + line3.opts.chartLeft, line3.canvas.height - 13);
        }
      },
      datas: [
        [1, 2, 3, 4, 3.5, 3, 4, 8, 4],
        [4, 3, 4, 2, 3, 5, 6, 3, 5]
      ]
    });
    
    line3.init();

    // line chart 4
    let line4 = new LineChart({
      id: 'chartline4',
      yaxisfunc(data) {     // 处理y轴刻度数值
        return (data).toFixed(2)
      },
      font: {
        color: '#eee'
      },
      colors: ['#eff'],
      width: 375,
      height: 212,
      curveLine: true,     // 曲线
      xaxis: ['1-11', '2-11', '3-11', '4-22', '5-11', '6-11', '7-11'],
      data: [4, 2, 3, 4, 3.5, 3, 4]

    });
    line4.init();

    // line chart 5
    let line5 = new LineChart({
      id: 'chartline5',
      width: 375,
      height: 212,
      chartTop: 1,
      xaxis: ['03-11', '04-11', '05-11', '06-11', '07-11', '08-11', '09-11', '09-22', '10-11', '11-11', '12-11'],
      data: [4, 3, 4, 2, 1, 2, 3, 4, 3.5, 3, 4],

      grid: {
        showGrid: true,
        color: '#aaa',
        xTickLength: 11
      },
      handleTextX: (ctx, xArr) => {      // 处理x轴文字
        // 增加x轴刻度
        let _chartWidth = line5._chart.width - line5.opts.chartLeft - line5.opts.chartRight;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '10px Arial';
        ctx.fillStyle = '#333';

        for (let i in xArr) {
          ctx.fillText(xArr[i], (_chartWidth / (xArr.length - 1) * i) + line5.opts.chartLeft, line5._chart.height - 10);
        }
      },

      onAnimation(process) {
        let ctx = line5.ctx,
          chartLeft = line5.opts.chartLeft,
          datasets = line5.datasets[0];

        ctx.save()
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#fff';
        ctx.fillStyle = '#ffa61b';

        datasets.map(data => {
          ctx.beginPath();
          ctx.arc(data.x, data.y, 4 * process, 0, Math.PI * 2, true);
          ctx.closePath();

          ctx.fill();

          ctx.stroke();
          ctx.font = 13 * process + 'px Arial';
          ctx.textAlign = 'center';
          let x = data.x - 10 < chartLeft ? chartLeft + 10 : data.x;
          ctx.fillText(data.value.toFixed(2), x, data.y - 10);
        });

        ctx.restore();
      }
    });
    line5.init();
  },

  // line 1 chart demo touch start
  chart1Touchstart: function (e) {
    if (e) {
      let event = e.touches[0];
      let index = line1.drawer.drawHover(event.x);
      if (index === false) return false;

      let _x = line1.opts.xaxis[index],
          _y = (line1.opts.datas[0][index]).toFixed(2) + '%';

      this.setData({
        line1Time: _x,
        line1Sy: _y
      });

      drawLabel(line1, event.x, _x + ': ' + _y);    // 绘制label
    }
  },
  // line 1 chart demo touch move
  chart1Touchmove: function (e) {
    if (e) {
      let event = e.touches[0];
      let index = line1.drawer.drawHover(event.x);
      if (index === false) return false;
      let _x = line1.opts.xaxis[index],
          _y = (line1.opts.datas[0][index]).toFixed(2) + '%';

      this.setData({
        line1Time: _x,
        line1Sy: _y
      });

      drawLabel(line1, event.x, _x + ': ' + _y);    // 绘制label
    }
  },

  // line 2 chart demo touch start
  chart2Touchstart: function (e) {
    if (e) {
      let event = e.touches[0];
      let index = line2.drawer.drawHover(event.x);
      if (index === false) return false;

      let _x = line2.opts.xaxis[index],
          _yArr = line2.opts.datas;

      this.setData({
        line2Time1: _x,
        line2Sy1: _yArr[0][index].toFixed(0) + 'w',
        line2Time2: _x,
        line2Sy2: _yArr[1][index].toFixed(0) + 'w',
        line2Time3: _x,
        line2Sy3: _yArr[2][index].toFixed(0) + 'w'
      })
    }
  },
  // line 2 chart demo touch move
  chart2Touchmove: function (e) {
    if (e) {
      let event = e.touches[0];
      let index = line2.drawer.drawHover(event.x);
      if (!index) return false;

      let _x = line2.opts.xaxis[index],
        _yArr = line2.opts.datas;

      this.setData({
        line2Time1: _x,
        line2Sy1: _yArr[0][index].toFixed(0) + 'w',
        line2Time2: _x,
        line2Sy2: _yArr[1][index].toFixed(0) + 'w',
        line2Time3: _x,
        line2Sy3: _yArr[2][index].toFixed(0) + 'w'
      })
    }
  }
});
