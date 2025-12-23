/**
 * @module PieDraw
 * @description pie chart drawer
 * @author Wayne
 * @createTime 2019-07-15
 * @lastModified 2021-10-10
 */

import {
  isWeb,
  isWeapp,
  isUndefined,
  each,
  getColorRgba,
  cloneArray,
  isTransparentColor,
  getPointsAngle,
  getPointsDistance,
  drawPoint,
  clearArc,
} from 'fundcharts-core';

import Shape from '../factorys/ShapeFactory';

type PieOrigin = {
  x: number;
  y: number;
};

export default class PieDraw extends Shape {
  origin: PieOrigin = { x: 0, y: 0 }; // circle center position
  centerArr!: number[]; // each center angle

  /**
   * @function PieDraw.drawPie
   * @description 画饼图
   * @param {Number} annularRate 圆心比例0~1
   * @param {Number} process 动画进度0~1
   * @param {Number} hoverIndex 被覆盖的索引
   */
  drawPie(annularRate = 0.6, process = 1, hoverIndex?: number) {
    annularRate = Math.min(annularRate, 0.9); // annular rate limit
    const _chartjs = this.chartjs;
    const _opts = _chartjs.opts;
    const _rates = _opts.widthRates; // fan radius rate
    const _drawer = _chartjs.drawer;
    const { origin, backgroundColor, colors, datas } = _opts;

    const _oldDataset = _chartjs.oldDataset;

    this.clearCtn();

    const { ctx } = _chartjs;
    const { width, height } = _chartjs._chart;

    const radius = _opts.radius || height / 2 - 20; // 半径  options.radius or height/2-20
    const radiusWhite = radius * annularRate; // 白色覆盖半径
    const _origin = {
      x: width / 2,
      y: radius + 20,
      ...origin,
    };
    const ox = _origin.x;
    const oy = _origin.y;

    this.origin = _origin;
    _drawer.radius = radius;
    _drawer.radiusWhite = radiusWhite;

    let startAngle = _opts.startAngle || -0.5 * Math.PI;
    let endAngle = startAngle;

    ctx.save();
    ctx.lineWidth = _opts.lineWidth;
    ctx.strokeStyle = backgroundColor;

    const _centerArr: number[] = [];
    const IS_ANIMATE_FINISHED = process === 1;

    // eslint-disable-next-line complexity
    each(datas, (_: number, index: number) => {
      const isSelected = hoverIndex === index;
      endAngle +=
        2 *
        Math.PI *
        (IS_ANIMATE_FINISHED || !_oldDataset
          ? datas[index] * process
          : (datas[index] - _oldDataset[index]) * process + _oldDataset[index]);

      if (isSelected && _opts.hoverRate) {
        ctx.fillStyle = !isSelected ? colors[index] : getColorRgba(colors[index], 0.6);
        ctx.beginPath();
        ctx.moveTo(ox, oy);
        ctx.arc(
          ox,
          oy,
          radius * (_rates?.[index] || 1) * _opts.hoverRate,
          startAngle,
          endAngle,
          false
        );
        ctx.closePath();
        ctx.fill();
      }
      ctx.fillStyle = !isSelected ? colors[index] : getColorRgba(colors[index], 0.8);
      ctx.beginPath();
      ctx.moveTo(ox, oy);
      ctx.arc(ox, oy, radius * (_rates?.[index] || 1), startAngle, endAngle, false);
      ctx.closePath();
      ctx.fill();

      if (_opts.lineWidth) {
        ctx.lineJoin = 'round';
        ctx.stroke();
      }
      if (IS_ANIMATE_FINISHED) {
        _centerArr.push((endAngle + startAngle) / 2);
      }
      startAngle = endAngle;
    });

    if (!isTransparentColor(backgroundColor)) {
      drawPoint(ctx, { x: ox, y: oy }, backgroundColor, '', radiusWhite, 0);
    } else {
      clearArc(ctx, { x: ox, y: oy }, radiusWhite);
    }
    if (IS_ANIMATE_FINISHED) {
      this.centerArr = _centerArr;
      _chartjs.oldDataset = null;
      _chartjs.dataset = datas;
    }
  }

  /**
   * @function PieDraw.draw
   * @description 折线图——总控
   * @param {Boolean} onlyClearShapes 是否只清理折线图形区域
   * @param {Boolean}  noAnimate 是否不需要动画
   */
  override draw(onlyClearShapes?: boolean, noAnimate?: boolean) {
    const _chartjs = this.chartjs;
    const _opts = _chartjs.opts;

    if (onlyClearShapes) _chartjs.oldDataset = cloneArray([], _chartjs.dataset);

    const CANNOT_ANIMATE = noAnimate || (!isWeb && !isWeapp);
    if (CANNOT_ANIMATE) {
      // nodejs
      this.drawPie(_opts.annularRate, 1);
      if (_opts.onFinish) _opts.onFinish();
    } else {
      (this as any).setAnimation((process: number) => {
        this.drawPie(_opts.annularRate, process);
        if (_opts.onAnimation) _opts.onAnimation.call(this, process);
        if (isWeapp) this.chartjs.ctx.draw(true);
      });
    }

    if (isWeapp) this.chartjs.canvas.draw();
  }

  /**
   * @function PieDraw.drawHover
   * @param {Number} x touch x轴坐标
   * @param {Number} y touch y轴坐标
   * @return {Number} 索引
   */
  override drawHover(x: number, y: number) {
    const _chartjs = this.chartjs;
    const _opts = _chartjs.opts;
    const { datas } = _opts;
    const _origin = this.origin;

    if (_chartjs.oldDataset) return false;
    const _angle = getPointsAngle(_origin, { x, y });
    const _percent = _angle / (2 * Math.PI);
    let _total = 0;

    let _hoverIndex;

    for (let i = 0, len = datas.length; i < len; i++) {
      _total += datas[i];
      if (_percent < _total) {
        _hoverIndex = i;
        break;
      }
    }

    if (
      isUndefined(_hoverIndex) ||
      getPointsDistance({ x, y }, _origin) > _chartjs.drawer.radius + 5
    ) {
      return false;
    }
    this.drawPie(_opts.annularRate, 1, _hoverIndex);
    if (isWeapp) _chartjs.canvas.draw(true);

    if (_opts.hover)
      _opts.hover.call(_chartjs, _hoverIndex, [datas[_hoverIndex || 0]], _angle, x, y);
    return _hoverIndex;
  }

  /**
   * @function PieDraw.init
   * @description 初始化
   */
  init() {
    const { noAnimation } = this.chartjs.opts;
    this.draw(false, noAnimation);
    this.setEvents();
    if (isWeapp) this.chartjs.canvas.draw();
  }
}
