/**
 * @module BarDraw
 * @description bar chart drawer
 * @author Wayne
 * @createTime 2019-07-15
 * @lastModified 2021-10-10
 */

import { isWeb, isWeapp, getLightfulRgbList, drawRotateText, cloneArray } from 'fundcharts-core';

import Grid from '../factorys/GridFactory';

type BarItem = {
  x: number;
  y: number;
  value: number;
};

export default class BarDraw extends Grid {
  zeroY = 0;

  /**
   * @function BarDraw.setDataset
   * @description 计算参数数据
   */
  // eslint-disable-next-line complexity
  setDataset() {
    const _chartjs = this.chartjs;
    const { opts, pixelRatio } = _chartjs;

    opts.datas = this.formatGridDatas(opts.datas);

    const { datas, range } = opts;
    const yLength = opts.grid.yTickLength;
    const _rangeArr = this.getBasicData(); // extend grid.draw

    let minData = _rangeArr[0];
    let maxData = _rangeArr[1];
    let _range;

    // 没有自定义范围
    if (!range) {
      if (minData < 0) {
        minData = ~~minData;
        maxData = Math.ceil(maxData);
        -maxData < minData ? (minData = -maxData) : (maxData = -minData);
        _range = 2 * maxData;
      } else {
        _range = maxData - minData;

        if (!_range) {
          // 最大最小值相等
          minData = 0;
          _range = 1;
        }

        _range = _range > 5 ? Math.ceil(_range / 5) * 5 : Math.ceil(_range * 1.2);
      }
    } else {
      _range = (range.max || maxData) - (range.min || minData);
    }

    this.yaxis = {
      min: minData,
      max: minData + _range,
      range: _range,
      unit: _range / (yLength - 1),
    };

    const { width, height } = _chartjs._chart;

    // y = yRate * value + yBasic
    const yRate = (this.yRate = (30 - height + opts.chartTop) / this.yaxis.range);
    const yBasic = (this.yBasic = 5 - this.yaxis.max * yRate + opts.chartTop);

    this.zeroY = minData < 0 ? yBasic : height - 24; // 0刻度基准y坐标

    const _ratio = pixelRatio || 1;
    const _xlength = datas[0].length;
    const _paddingX = opts.chartLeft + opts.chartRight;

    let barMargin =
      opts.barMargin ||
      (opts.barWidth &&
        pixelRatio *
          ~~((width - _paddingX) / _xlength - opts.barWidth * (opts.isStack ? 1 : datas.length))) ||
      (_xlength >= 10 && 40 - (_xlength - 10) * _ratio) ||
      opts.bar.margin;

    barMargin = barMargin < 0 ? 0 : barMargin / _ratio;
    this.xaxis = {
      min: 0,
      max: _xlength - 1,
      range: _xlength,
      unit: 1,
    };

    const barWidth = (_chartjs.barWidth =
      opts.barWidth || ~~((width - _paddingX) / _xlength - barMargin));

    _chartjs.datasets = datas.map((item: number[]) =>
      item.map((data, index) => ({
        x: index * barWidth + (index + 0.5) * barMargin + opts.chartLeft,
        y: data * yRate + yBasic,
        value: data,
      }))
    );
  }

  /**
   * @function BarDraw.drawBars
   * @description 折线图——绘制折线
   * @param {Number} process 进度（0~1），默认为1
   * @param {Number | Undefined} hoverIndex 高亮的索引项
   */
  drawBars(process = 1, hoverIndex?: number) {
    const _chartjs = this.chartjs;
    const _opts = _chartjs.opts;
    const { ctx, opts, datasets } = _chartjs;
    const { singleColorful, isStack } = opts;
    const stackRate = isStack ? 0 : 1;
    const _datasets = _chartjs.datasets;
    const _prevDataset = _chartjs.prevDataset;
    const _barWidth = _chartjs.barWidth / (isStack ? 1 : _datasets.length);
    const zeroY = this.zeroY;

    ctx.beginPath();
    ctx.lineWidth = 0;
    ctx.strokeStyle = _opts.backgroundColor;

    // draw
    datasets.forEach((dataSet: BarItem[], index: number) => {
      const _olddata = _prevDataset?.[index];

      dataSet.forEach((data, dataIndex: number) => {
        const lightColor = getLightfulRgbList(
          (data.y > zeroY && _opts.negativeColor) || // options negative color
            _opts.colors[singleColorful ? dataIndex : index] || // single data color or default color
            _opts.colors[index],
          dataIndex === hoverIndex ? _opts.hoverHighlight : 0
        );
        const left = data.x + stackRate * _barWidth * index;

        ctx.fillStyle = `rgb(${lightColor.join(',')})`;
        if (!_olddata?.[dataIndex]) {
          ctx.fillRect(left, zeroY, _barWidth, (data.y - zeroY) * process);
        } else {
          ctx.fillRect(
            left,
            zeroY,
            _barWidth,
            (data.y - _olddata[dataIndex].y) * process + (_olddata[dataIndex].y - zeroY)
          );
        }
      });
      ctx.stroke();
    });

    ctx.save();

    if (process === 1) {
      // clear old datasets
      _chartjs.prevDataset = null;
    }
  }

  /**
   * @function BarDraw.drawXaxisTexts
   * @description 绘制x轴文案
   * @param {CanvasRenderingContext2D} ctx 画布
   * @param {Array} _xaxis x轴数据
   */
  drawXaxisTexts(ctx: CanvasRenderingContext2D, _xaxis: readonly string[]) {
    const _chartjs = this.chartjs;
    const bottom = _chartjs._chart.height - 10;
    const left = _chartjs.barWidth;
    const xaxisLen = _xaxis.length;
    const _data = _chartjs.datasets[0];

    const _rotateAngle: number = xaxisLen > 30 ? 90 : xaxisLen > 10 ? xaxisLen * 3 : 0;
    ctx.textAlign = 'center';

    _data.forEach((item: BarItem, index: number) => {
      const axisText = _xaxis[index];
      if (axisText) {
        if (!_rotateAngle) {
          ctx.fillText(axisText, item.x + left, bottom);
        } else {
          drawRotateText(ctx, { x: item.x + left, y: bottom }, _rotateAngle, axisText);
        }
      }
    });
  }

  /**
   * @function BarDraw.draw
   * @description 柱状图——总控
   * @param {Boolean} onlyClearShapes 是否只清理柱状图形区域
   * @param {Boolean} noAnimate 是否不需要动画
   * @param {Boolean} noBar 是否不需要画柱状图
   */
  override draw(onlyClearShapes?: boolean, noAnimate?: boolean, noBar?: boolean) {
    const _chartjs = this.chartjs;
    const { opts, datasets } = _chartjs;

    this.clearCtn(!onlyClearShapes);
    this.drawDashs();

    if (onlyClearShapes) {
      // for data update animate, animate end will destroy
      if (datasets) _chartjs.prevDataset = cloneArray([], datasets);
      this.setDataset();
      this.drawTexts(this.drawXaxisTexts.bind(this));
    }

    if (noBar) return;

    if (noAnimate || (!isWeb && !isWeapp)) {
      // nodejs
      this.drawBars(1);
      if (opts.onFinish) opts.onFinish();
    } else {
      (this as any).setAnimation((process: number) => {
        this.clearCtn(true);
        this.drawDashs();
        this.drawBars(process);
        if (opts.onAnimation) opts.onAnimation.call(this, process);
        if (isWeapp) _chartjs.ctx.draw(true);
      });
    }
  }

  /**
   * @function BarDraw.drawHover
   * @description 折线图——交互——事件交互展示
   * @param {Number} x x轴位置坐标
   * @param {Number} y y轴位置坐标
   * @return {Number | Boolean} 索引或离开
   */
  override drawHover(x: number, y: number): number | false {
    const _chartjs = this.chartjs;
    const { opts, datasets } = _chartjs;

    // 还在动画过渡
    if (_chartjs.prevDataset) return false;

    // out of content
    if (x > _chartjs._chart.width - opts.chartRight || x < opts.chartLeft) return false;

    let selectIndex = -1;
    const _barWidth = Math.abs(_chartjs.barWidth); // for weapp
    const _datasLen = datasets.length;
    const _dataset = datasets[0];

    for (let i = 0, len = _dataset.length; i < len; i++) {
      const _item = _dataset[i];
      if (x >= _item.x && x <= _item.x + _barWidth * _datasLen) {
        selectIndex = i;
        break;
      }
    }
    if (selectIndex < 0) return false;

    const _values: number[] = datasets.map((dataSet: BarItem[]) => dataSet[selectIndex].value);

    this.draw(false, true, true);
    this.drawBars(1, selectIndex);

    if (opts.hover) {
      opts.hover.call(_chartjs, selectIndex, _values, opts.xaxis[selectIndex], x, y);
    }

    if (isWeapp) _chartjs.canvas.draw(true);
    return selectIndex;
  }

  /**
   * @function BarDraw.init
   * @description 初始化注入
   */
  init() {
    const { noAnimation, noHoverEvent } = this.chartjs.opts;
    this.draw(true, noAnimation);
    if (isWeb && !isWeapp && !noHoverEvent) this.setEvents();
    if (isWeapp) this.chartjs.canvas.draw();
  }
}
