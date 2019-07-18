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
    line1 = new LineChart({
      id: 'chartline1',
      yaxisfunc(data) {     // 处理y轴刻度数值
        return (data).toFixed(0) + '%'
      },
      width: 375,
      height: 212,
      noGradient: true,     // 无渐变面积
      xaxis: ['07-11', '08-11', '09-11', '09-22', '10-11', '11-11', '12-11'],
      data: 
        [1, 2, 3, 4, 3.5, 3, 4]
      
    });
    line1.init();

    // line chart 2
    line2 = new LineChart({
      id: 'chartline2',
      yaxisfunc(data) {
        return data.toFixed(0) + 'w'
      },
      width: 375,
      height: 212,
      noGradient: true,
      chartLeft: 30,        // 图形区域距离左边距离(px)
      lineWidths: [4, 2, 1],     // 折线粗细
      colors: ['#03c', '#0cc', '#fa0'],   // 折线颜色
      pointStyle: '#f00',			// 点边框颜色
      hoverLineColor: 'orange',		// 触控线的颜色
      xaxis: ['07-11', '08-11', '09-11', '09-22', '10-11', '11-11', '12-11'],
      datas: [
        [1, 2, 3, 4, 3.5, 3, 4, 3],
        [4, 3, 4, 2, 3, 5, 6, 5],
        [8, 4, 6, 3, 1, 2, 1, 3.3]
      ]
    });
    line2.init();


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
