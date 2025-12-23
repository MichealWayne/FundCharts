/**
 * @module KlineDraw
 * @description k-line chart drawer
 * @author Wayne
 * @createTime 2019-07-15
 * @lastModified 2021-10-10
 */

import { isWeb, isWeapp, each, getAxisLimit, drawLine } from 'fundcharts-core';

import Grid from '../factorys/GridFactory';

type KlinePoint = {
  x: number;
  ymin: number;
  ystart: number;
  yend: number;
  ymax: number;
  value: number[];
};

export default class KlineDraw extends Grid {
  /**
   * @function KlineDraw.setDataset
   * @description 计算参数数据
   */
  setDataset() {
    const _chartjs = this.chartjs;
    const { opts } = _chartjs;
    const { datas } = opts;
    const yLength = opts.grid.yTickLength;

    let minData = Infinity;
    let maxData = -Infinity;
    let hasValue = false;
    each(datas, (item: number[]) => {
      for (let i = 0, len = item.length; i < len; i++) {
        const value = item[i];
        if (value < minData) minData = value;
        if (value > maxData) maxData = value;
        hasValue = true;
      }
    });
    if (!hasValue) {
      minData = 0;
      maxData = 0;
    }

    let _min;
    let _range;
    const _setRange = opts.range;
    if (!_setRange) {
      _range = getAxisLimit(maxData - minData);

      _min = _range > 2 ? Math.floor(minData) : minData;
      if (_min + _range < maxData) _min = minData;
    } else {
      // 自定义范围
      _min = minData;
      _range = maxData - minData;
    }

    this.yaxis = {
      min: _min,
      max: _min + _range,
      range: _range,
      unit: _range / (yLength - 1),
    };

    // y = yRate * value + yBasic
    const _yRate = (this.yRate = (30 - _chartjs._chart.height + opts.chartTop) / _range);
    const _yBasic = (this.yBasic = 5 - this.yaxis.max * _yRate + opts.chartTop);

    let _xlength = datas.length;
    _xlength = _xlength > 1 ? _xlength : 2;
    this.xaxis = {
      min: 0,
      max: _xlength - 1,
      range: _xlength,
      unit: 1,
    };

    // x = xRate * index + 50;
    const _xBasic = (this.xBasic = opts.chartLeft + 10);
    const _xRate = (this.xRate =
      (_chartjs._chart.width - opts.chartLeft - opts.chartRight - 20) / (_xlength - 1));

    const _dataset: KlinePoint[] = [];
    if (datas.length === 1) datas[1] = datas[0];
    each(datas, (item: number[], i: number) => {
      _dataset.push({
        x: i * _xRate + _xBasic,
        ymin: item[2] * _yRate + _yBasic,
        ystart: item[0] * _yRate + _yBasic,
        yend: item[1] * _yRate + _yBasic,
        ymax: item[3] * _yRate + _yBasic,
        value: item,
      });
    });

    _chartjs.dataset = _dataset;

    // barWidth
    if (!opts.barWidth) {
      opts.barWidth = _xlength < 10 ? 20 : ~~(this.xRate * 0.6);
      if (opts.barWidth < 1) opts.barWidth = 1;
    }
  }

  /**
   * @function KlineDraw.drawUnit
   * @description 画k线
   * @param {CanvasRenderingContext2D} ctx 画布
   * @param {Object} data 单元数据
   * @param {Array} colors 颜色
   * @param {Number} width 宽度
   * @param {Boolean | Undefined} upHollow 增长是否空心
   */
  drawUnit(
    ctx: CanvasRenderingContext2D,
    data: KlinePoint,
    colors: readonly string[],
    width: number,
    upHollow?: boolean
  ) {
    let _color;
    let _min;
    let _max;
    let _upbool = false;
    if (data.yend < data.ystart) {
      // up
      if (upHollow) _upbool = true;
      _color = colors[0];
      _min = data.ystart;
      _max = data.yend;
    } else {
      // down
      _color = colors[4];
      _min = data.yend;
      _max = data.ystart;
    }

    ctx.fillStyle = ctx.strokeStyle = _color;

    drawLine(ctx, { x: data.x, y: data.ymin }, { x: data.x, y: _min });
    drawLine(ctx, { x: data.x, y: data.ymax }, { x: data.x, y: _max });

    ctx.beginPath();
    ctx[_upbool ? 'rect' : 'fillRect'](data.x - width / 2, _max, width, _min - _max);
    ctx.closePath();

    ctx.stroke();
  }

  /**
   * @function KlineDraw.drawLine
   * @description 绘制k线
   * @param {Number} 动画进度0~1
   */
  drawLine(process = 1) {
    const _chartjs = this.chartjs;
    const { opts, ctx, dataset } = _chartjs;

    ctx.lineWidth = 1;

    for (let i = 0, _len = process * dataset.length; i < _len; i++) {
      const item = dataset[i];
      this.drawUnit(ctx, item, opts.colors, opts.barWidth, opts.upHollow);
    }

    ctx.save();
  }

  /**
   * @function KlineDraw.draw
   * @description 折线图——总控
   * @param {Boolean} onlyClearShapes 是否只清理折线图形区域
   * @param {Boolean}  noAnimate 是否不需要动画
   */
  override draw(onlyClearShapes?: boolean, noAnimate?: boolean) {
    const _opts = this.chartjs.opts;
    this.clearCtn(!onlyClearShapes);
    this.drawDashs();

    if (onlyClearShapes) {
      this.setDataset();
      this.drawTexts();
    }

    if (noAnimate || (!isWeb && !isWeapp)) {
      // nodejs
      this.drawLine(1);
      if (_opts.onFinish) _opts.onFinish();
    } else {
      (this as any).setAnimation((process: number) => {
        this.clearCtn(true);
        this.drawDashs();
        this.drawLine(process);
        if (_opts.onAnimation) _opts.onAnimation.call(this, process);
        if (isWeapp) this.chartjs.ctx.draw(true);
      });
    }
  }

  /**
   * @function KlineDraw.drawHover
   * @description 折线图——交互——事件交互展示
   * @param {Number} x x轴位置坐标
   * @param {Number} y y轴位置坐标
   * @return {Number | Boolean} 索引或离开
   */
  override drawHover(x: number, y: number) {
    const _chartjs = this.chartjs;
    const { ctx, opts } = _chartjs;
    this.draw(isWeapp, true);

    // out of content
    if (
      x > _chartjs._chart.width - opts.chartRight ||
      x < opts.chartLeft ||
      y < opts.chartTop ||
      y > _chartjs._chart.height - (35 - opts.chartTop)
    ) {
      return false;
    }
    const _index = Math.round((x - this.xBasic) / this.xRate);

    if (!_chartjs.dataset[_index]) return false;

    const _x = Math.round(_chartjs.dataset[_index].x) + 0.3;
    ctx.save();
    ctx.strokeStyle = opts.hoverLineColor;
    ctx.lineWidth = 0.5;

    drawLine(ctx, { x: opts.chartLeft + 0.3, y }, { x: _chartjs._chart.width - 14.7, y });
    drawLine(ctx, { x: _x, y: 6 + opts.chartTop }, { x: _x, y: _chartjs._chart.height - 25 });
    if (opts.hover) {
      opts.hover.call(_chartjs, _index, [opts.datas[_index]], opts.xaxis[_index], x, y);
    }
    ctx.restore();
    if (isWeapp) _chartjs.canvas.draw(true);

    return _index;
  }

  /**
   * @function KlineDraw.init
   * @description 初始化
   */
  init() {
    const { noAnimation } = this.chartjs.opts;
    this.draw(true, noAnimation);
    this.setEvents();

    if (isWeapp) this.chartjs.canvas.draw();
  }
}
