/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @class Grid
 * @description grid chart's factory.(line/bar/scatter/kline)
 * @author Wayne
 * @createTime 2019-07-15
 * @lastModified 2021-10-10
 */

import {
  isUndefined,
  isArray,
  throwError,
  each,
  isTransparentColor,
  getListExtremum,
  drawLine,
  drawDashLine,
  drawPoint,
  setAnimationHooks,
  AnyFunc,
} from 'fundcharts-core';

import { setEvents, removeEvents, removeDatas } from './common';

export interface GridState {
  chartjs: any;
  yaxis: {
    min: number;
    max?: number;
    unit: number;
    [propName: string]: any;
  };
  xaxis?: null | {
    [propName: string]: any;
  };
  xRate: number;
  xBasic: number;
  yRate: number;
  yBasic: number;
  _dealHoverEvent?: AnyFunc;
  setAnimation?: AnyFunc;
}

@setAnimationHooks
export default class Grid implements GridState {
  chartjs: any; // chart instance
  yaxis = {
    // y axis data
    min: 0,
    max: 0,
    range: 0,
    unit: 0,
  };
  xaxis = {
    // x axis data
    min: 0,
    max: 0,
    range: 0,
    unit: 0,
  };
  xRate!: number; // x coordinate = xRate * xvalue + xBasic
  xBasic!: number;
  yRate!: number; // y coordinate = yRate * yvalue + yBasic
  yBasic!: number;

  /**
   * @param chart FundChart实例
   */
  constructor(chart: any) {
    this.chartjs = chart;
  }

  /**
   * @function Grid.formatGridDatas
   * @description 格式化数据
   * @return {Array} datas
   */
  formatGridDatas(datas: any[]) {
    if (!isArray(datas?.[0])) {
      return [datas];
    }
    return datas;
  }

  /**
   * @function Grid.getBasicData
   * @description 获取范围等基础数据
   * @param {Array} datas 数据数组，可选
   * @return {number[]} 极值
   */
  getBasicData(datas?: any[]) {
    const { opts } = this.chartjs;
    const _datas = datas || opts.datas;

    let minData = Infinity;
    let maxData = -Infinity;
    const _setRange = opts.range;

    if (!_setRange) {
      _datas?.length &&
        each(_datas, (item: number[]) => {
          const { max, min } = getListExtremum(item);

          minData = Math.min(minData, min);
          maxData = Math.max(maxData, max);
        });
    } else {
      // 自定义范围
      if (isUndefined(_setRange.min) || isUndefined(_setRange.max)) {
        throwError('param range need params "min" and "max"', 'setConfig');
      }
      minData = _setRange.min;
      maxData = _setRange.max;
    }

    return [minData || 0, maxData || 0];
  }

  /**
   * @function Grid.clearCtn
   * @description 清理区域
   * @param {Boolean} isCleanShape 是否只清理折线图形区域，可选
   */
  clearCtn(isCleanShape?: boolean) {
    const _chartjs = this.chartjs;
    const _opts = _chartjs.opts;
    const { backgroundColor } = _opts;
    const { ctx } = _chartjs;

    ctx.beginPath();
    const ctxClear = ctx[isTransparentColor(backgroundColor) ? 'clearRect' : 'rect'].bind(ctx);

    if (isCleanShape) {
      const { width, height } = _chartjs._chart;
      ctxClear(_opts.chartLeft - 4, _opts.chartTop - 5, width + 1, height - 16 - _opts.chartTop);
    } else {
      // 保证全清除
      ctxClear(0, 0, 100_000, 100_000);
    }
    ctx.fillStyle = backgroundColor;
    ctx.fill();
    ctx.closePath();
  }

  /**
   * @function Grid.drawPoint
   * @description 画圆点，同drawer.js画点方法
   */
  drawPoint = drawPoint;

  /**
   * @function Grid.drawDashs
   * @description 画网格虚线
   * @param {Number} y 画特殊线
   */
  // eslint-disable-next-line complexity
  drawDashs(y?: number) {
    const _chartjs = this.chartjs;
    const _opts = _chartjs.opts;
    const { grid } = _opts;
    const { dash } = _opts;
    const solidDash = dash.isSolid;
    const dashColor = _opts.dash.color;
    const { showGrid } = grid;
    const xLength = grid.xTickLength;
    const yLength = grid.yTickLength;

    const { ctx } = _chartjs;

    ctx.save();

    const width = _chartjs._chart.width - _opts.chartRight + 2;
    const { height } = _chartjs._chart;

    const _yunit = (height - _opts.chartTop - 30) / (yLength - 1);
    const _xunit = (width - 2 - _opts.chartLeft) / (xLength - 1);

    // bottom y
    const endY = (yLength - 1) * _yunit + _opts.chartTop + 5.5; // 5 + 0.5

    if (!_opts.noDash) {
      // 有网格虚线
      ctx.strokeStyle = dashColor;

      ctx.lineWidth = 1;
      const ylineWidth = solidDash ? width - 2 : width;

      if (solidDash) {
        ctx.beginPath();
        // draw y solid lines
        for (let i = 0; i < yLength; i++) {
          const _y = y || i * _yunit + 5 + _opts.chartTop;
          ctx.moveTo(_opts.chartLeft, _y);
          ctx.lineTo(ylineWidth, _y);
          ctx.lineTo(_opts.chartLeft, _y);
        }

        // draw x solid lines
        if (xLength) {
          const startY = _opts.chartTop + 5;
          for (let i = 0; i < xLength; i++) {
            const _x = i * _xunit + _opts.chartLeft - 0.5;
            ctx.moveTo(_x, endY);
            ctx.lineTo(_x, startY);
            ctx.lineTo(_x, endY);
          }
        }
        ctx.stroke();
      } else {
        ctx.beginPath();
        const _drawer = drawDashLine;

        // draw y dash lines
        for (let i = 0; i < yLength; i++) {
          const _y = y || i * _yunit + 5 + _opts.chartTop;
          _drawer(ctx, { x: _opts.chartLeft, y: _y }, { x: ylineWidth, y: _y }, dash.length);
        }

        // draw x dash lines
        if (xLength) {
          const startY = _opts.chartTop + 5;

          for (let i = 0; i < xLength; i++) {
            const _x = i * _xunit + _opts.chartLeft - 0.5;
            _drawer(ctx, { x: _x, y: endY }, { x: _x, y: startY }, dash.length);
          }
        }
      }
    }

    if (showGrid) {
      // 有刻度线
      if (grid.color) ctx.strokeStyle = grid.color;
      const gridLeft = _opts.chartLeft - 0.5;
      const baseY = _chartjs.drawer.zeroY || endY;

      drawLine(ctx, { x: gridLeft, y: _opts.chartTop }, { x: gridLeft, y: endY });
      drawLine(ctx, { x: gridLeft, y: baseY }, { x: width - 2, y: baseY });
      ctx.stroke();
    }

    ctx.strokeStyle = dashColor;

    ctx.restore();
  }

  /**
   * @function Grid.drawTexts
   * @description 绘制文案
   * @param {Function} handleAxisX x轴文案处理
   * @param {Function} hadnleAxisY y轴文案处理
   */
  drawTexts(handleAxisX?: AnyFunc, hadnleAxisY?: AnyFunc) {
    const _chartjs = this.chartjs;
    const _opt = _chartjs.opts;
    const yLength = _opt.grid.yTickLength;
    const _font = _opt.font;

    const { ctx } = _chartjs;
    const _xaxis = _opt.xaxis;
    const { width, height } = _chartjs._chart;

    if (_opt.handleTextX) handleAxisX = _opt.handleTextX;
    if (_opt.handleTextY) hadnleAxisY = _opt.handleTextY;

    ctx.lineWidth = 1;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.font = `${_font.fontSize.x} ${_font.fontFamily}`;
    ctx.fillStyle = _font.color;

    // x titles
    if (!handleAxisX) {
      const _top = height - 10;
      ctx.fillText(_xaxis[_xaxis.length - 1], width - _opt.chartRight, _top);
      ctx.textAlign = 'left';
      ctx.fillText(_xaxis[0], _opt.chartLeft, _top);
    } else {
      handleAxisX(ctx, _xaxis);
    }

    // y titles
    ctx.font = `${_font.fontSize.y} ${_font.fontFamily}`;
    ctx.textAlign = 'right';

    const _yaxis = this.yaxis;
    if (!hadnleAxisY) {
      const _txtLeft = _opt.chartLeft - 5;
      const _getShowValue =
        _opt.formatYaxisText ||
        _opt.yaxisfunc || // 兼容v1之前版本
        function (val: number) {
          return val.toFixed(2);
        };

      for (let i = 0; i < yLength; i++) {
        const _val = _yaxis.min + i * _yaxis.unit;
        ctx.fillText(_getShowValue(_val), _txtLeft, this.yRate * _val + this.yBasic);
      }
    } else {
      hadnleAxisY(ctx, _yaxis);
    }
  }

  /**
   * @function Grid.drawHover
   * @param {Number} x 触控点x轴坐标
   * @param {Number} y 触控点y轴坐标
   */
  drawHover(x: number, y: number) {
    // nothing
  }

  /**
   * @function Grid.setEvents
   * @description 设置事件
   */
  setEvents = setEvents;

  /**
   * @function Grid.removeEvents
   * @description 删除事件
   * @returns {Boolean}
   */
  removeEvents = removeEvents;

  /**
   * @function Grid.removeDatas
   * @description 删除数据（destroy时调用）
   */
  removeDatas = removeDatas;

  draw(update?: boolean, noAnimate?: boolean) {
    // chart implement
  }
}
