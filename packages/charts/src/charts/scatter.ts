/**
 * @module ScatterDraw
 * @description radar chart drawer
 * @author Wayne
 * @createTime 2019-07-15
 * @lastModified 2021-10-10
 */

import { isWeb, isWeapp, each, getColorRgba, getAxisLimit } from 'fundcharts-core';

import Grid from '../factorys/GridFactory';

type ScatterPointData = {
  x: number;
  y: number;
  value: number;
};

export default class ScatterDraw extends Grid {
  /**
   * @function ScatterDraw.setDataset
   * @description 设置数据点
   */
  setDataset() {
    const _chartjs = this.chartjs;
    const _opts = _chartjs.opts;
    const { datas } = _opts;
    const _setRange = _opts.range;
    const yLength = _opts.grid.yTickLength;

    let minData = null; // x,y
    let maxData = null; // x,y
    let xRange;
    let yRange;

    if (!_setRange) {
      let minX = Infinity;
      let maxX = -Infinity;
      let minY = Infinity;
      let maxY = -Infinity;
      let hasPoint = false;

      each(datas, (data: [number, number][]) => {
        each(data, item => {
          const x = item[0];
          const y = item[1];
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
          hasPoint = true;
        });
      });

      if (!hasPoint) {
        minX = 0;
        maxX = 0;
        minY = 0;
        maxY = 0;
      }

      minData = { x: minX, y: minY };
      maxData = { x: maxX, y: maxY };

      xRange = getAxisLimit(maxData.x - minData.x);
      minData.x = xRange > 2 ? Math.floor(minData.x) : minData.x;
      yRange = getAxisLimit(maxData.y - minData.y);
      minData.y = yRange > 2 ? Math.floor(minData.y) : minData.y;
    } else {
      // set
      minData = {
        x: _setRange.x[0],
        y: _setRange.y[0],
      };
      maxData = {
        x: _setRange.x[1],
        y: _setRange.y[1],
      };
      xRange = maxData.x - minData.x;
      yRange = maxData.y - minData.y;
    }

    // 控制X轴显示
    const _getShowValue = _opts.formatXaxisText || _opts.xaxisfunc;
    if (_getShowValue) {
      _opts.xaxis = [_getShowValue(minData.x), _getShowValue(maxData.x)];
    } else {
      _opts.xaxis = [minData.x.toFixed(2), maxData.x.toFixed(2)];
    }

    this.yaxis = {
      min: minData.y,
      max: minData.y + yRange,
      range: yRange,
      unit: yRange / (yLength - 1),
    };

    // y = yRate * value + yBasic
    const _yRate = (this.yRate = (30 - _chartjs._chart.height + _opts.chartTop) / yRange);
    const _yBasic = (this.yBasic = 5 - this.yaxis.max * _yRate + _opts.chartTop);

    this.xaxis = {
      min: minData.x,
      max: minData.x + xRange,
      range: xRange,
      unit: xRange / 4,
    };

    // x = xRate * value + xBasic
    const _xRate = (this.xRate =
      (_chartjs._chart.width - (_opts.chartLeft + _opts.chartRight)) / xRange);
    const _xBasic = (this.xBasic = _opts.chartLeft);

    _chartjs.datasets = datas.map((item: number[][]) =>
      item.map((data: number[]) => ({
        x: data[0] * _xRate + _xBasic,
        y: data[1] * _yRate + _yBasic,
        value: data,
      }))
    ) as ScatterPointData[][];
  }

  /**
   * @function ScatterDraw.drawPoints
   * @description 画散点
   * @param {Number} 动画进度0~1
   */
  drawPoints(process = 1) {
    const _chartjs = this.chartjs;
    const { borderRate = 0.8, colors, pointWidths } = _chartjs.opts;

    const _datasets = _chartjs.datasets;
    const rgbaCache = new Map<string, string>();

    each(_datasets, (data: ScatterPointData[], index: number) => {
      const baseColor = colors[index];
      let _color = rgbaCache.get(baseColor);
      if (!_color) {
        _color = getColorRgba(baseColor, 0.3);
        rgbaCache.set(baseColor, _color);
      }
      const _width = (pointWidths?.[index] || 6 - (4 * index) / _datasets.length) * process;
      const _strokeWidth = _width * borderRate;

      each(data, (item: ScatterPointData) => {
        this.drawPoint(
          _chartjs.ctx,
          { x: item.x, y: item.y },
          baseColor,
          _color,
          _width,
          _strokeWidth
        );
      });
    });
  }

  /**
   * @function ScatterDraw.draw
   * @description 散点图——总控
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

    const CANNOT_ANIMATE = noAnimate || (!isWeb && !isWeapp);
    if (CANNOT_ANIMATE) {
      // nodejs
      this.drawPoints();
      if (_opts.onFinish) _opts.onFinish();
    } else {
      (this as any).setAnimation((process: number) => {
        this.clearCtn(true);
        this.drawDashs();
        this.drawPoints(process);
        if (_opts.onAnimation) _opts.onAnimation.call(this, process);
        if (isWeapp) this.chartjs.ctx.draw(true);
      });
    }
  }

  /**
   * @function ScatterDraw.init
   * @description 初始化
   */
  init() {
    const { noAnimation } = this.chartjs.opts;
    this.draw(true, noAnimation);

    if (isWeapp) this.chartjs.canvas.draw();
  }
}
