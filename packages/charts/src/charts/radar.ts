/**
 * @module RadarDraw
 * @description radar chart drawer
 * @author Wayne
 * @createTime 2019-07-15
 * @lastModified 2021-10-10
 */

import {
  isWeb,
  isWeapp,
  each,
  getColorRgba,
  cloneArray,
  getListExtremum,
  getPointsAngle,
  getPointsDistance,
  drawLine,
  drawPoint,
} from 'fundcharts-core';

import Shape from '../factorys/ShapeFactory';

type RadarCircle = {
  x: number;
  y: number;
};

export default class RadarDraw extends Shape {
  radius = 0; // radius
  origin: RadarCircle = { x: 0, y: 0 }; // circle origin
  sideArr: RadarCircle[] = []; // side array

  /**
   * @function RadarDraw.setDataset
   * @description 网格数据
   * @param {Boolean} update 是否更新数据
   */
  setDataset(update?: boolean) {
    const _chartjs = this.chartjs;
    const { opts } = _chartjs;

    opts.datas = this.formatGridDatas(opts.datas);
    const { origin, datas } = opts;

    let _max = 0;
    each(datas, (data: number[]) => {
      const _m = getListExtremum(data).max;
      if (_m > _max) _max = _m;
    });

    _chartjs.rangeMax = Math.ceil((_max * 1) / (opts.maxRate || 0.9)); // 最大值

    const { width, height } = _chartjs._chart;

    this.radius = opts.radius || height / 2 - 10;
    this.origin = {
      x: width / 2,
      y: height / 2,
      ...origin,
    };

    if (update) {
      _chartjs.oldDataset = cloneArray([], _chartjs.dataset);
      return false;
    }

    // 计算各角的坐标点
    this.sideArr = (function (sideNum: number) {
      const _posArr = [];
      const _angle = (2 * Math.PI) / sideNum;

      for (let i = 0; i < sideNum; i++) {
        _posArr.push({
          x: Math.sin(_angle * i),
          y: Math.cos(_angle * i),
        });
      }

      return _posArr;
    })((_chartjs.side = datas[0].length));
  }

  /**
   * @function RadarDraw.drawRadar
   * @description 画图
   * @param {Number} process 进度（0~1）
   * @param {Number} hoverIndex 当前选中索引
   */
  drawRadar(process = 1, hoverIndex?: number) {
    const _chartjs = this.chartjs;
    const _opts = _chartjs.opts;
    const { colors } = _opts;

    this.clearCtn();

    const { ctx } = _chartjs;

    const radius = this.radius; // options.radius or height/2-20
    const _origin = this.origin;
    const ox = _origin.x;
    const oy = _origin.y;

    const _sideArr = this.sideArr;
    const _firstSide = _sideArr[0];
    const _oldDataset = _chartjs.oldDataset;
    const _gridNum = _opts.gridNumber || 3;

    ctx.lineWidth = 1;
    ctx.strokeStyle = _opts.dash.color;

    // draw grid
    for (let i = 0; i < _gridNum; i++) {
      const _rate = ((i + 1) / _gridNum) * radius;

      ctx.beginPath();
      ctx.moveTo(ox + _firstSide.x * _rate, oy - _firstSide.y * _rate);
      each(_sideArr, (data: RadarCircle) => {
        ctx.lineTo(ox + data.x * _rate, oy - data.y * _rate);
      });
      ctx.lineTo(ox + _firstSide.x * _rate, oy - _firstSide.y * _rate);
      ctx.closePath();

      if (!_opts.fillGrid) {
        ctx.stroke();
      } else {
        ctx.fillStyle = getColorRgba(_opts.fillGrid, ((_gridNum - i) / _gridNum) * 0.8);
        ctx.fill();
      }

      if (i + 1 === _gridNum) {
        each(_sideArr, (data: RadarCircle) => {
          drawLine(ctx, { x: ox, y: oy }, { x: ox + data.x * _rate, y: oy - data.y * _rate });
        });
      }
    }

    const _max = _chartjs.rangeMax;
    const _dataArr: RadarCircle[][] = [];

    const _drawRate = (radius * (_oldDataset ? 1 : process)) / _max;
    const _draw = (data: number[], index: number, oldPointData: RadarCircle[]) => {
      ctx.strokeStyle = colors[index];
      ctx.fillStyle = getColorRgba(colors[index], 0.4);
      ctx.beginPath();

      each(data, (item: number, idx: number) => {
        const side = _sideArr[idx];
        const oldSide = oldPointData?.[idx];
        if (side) {
          let _x;
          let _y;

          _x = ox + item * side.x * _drawRate;
          _y = oy - item * side.y * _drawRate;

          if (oldSide) {
            _x = oldSide.x + (_x - oldSide.x) * process;
            _y = oldSide.y + (_y - oldSide.y) * process;
          }

          _dataArr[index].push({
            x: _x,
            y: _y,
          });
          ctx.lineTo(_x, _y);
        }
      });
      ctx.lineTo(_dataArr[index][0].x, _dataArr[index][0].y);
      ctx.closePath();
      ctx.stroke();

      if (!_opts.noFill) ctx.fill();

      ctx.save();

      // draw points
      const _defaultRadius = _opts.hidePoints ? 0 : 3;
      each(_dataArr[index], (item, nowIndex: number) => {
        drawPoint(
          ctx,
          { x: item.x, y: item.y },
          colors[index],
          _opts.pointStyle,
          hoverIndex === nowIndex ? 5 : _defaultRadius,
          hoverIndex === nowIndex ? 1 : 0
        );
      });

      ctx.restore();
    };

    // draw graphics
    each(_opts.datas, (data: number[], index: number) => {
      _dataArr[index] = [];

      _draw(data, index, _oldDataset?.[index]);
    });

    if (process === 1) {
      // 绘制完成时删除旧数据
      _chartjs.oldDataset = null;
      _chartjs.dataset = _dataArr;
    }
  }

  /**
   * @function RadarDraw.drawHover
   * @param {Number} x touch x轴坐标
   * @param {Number} y touch y轴坐标
   * @return {Number} 索引
   */
  override drawHover(x: number, y: number) {
    const _chartjs = this.chartjs;
    const _opts = _chartjs.opts;
    const _origin = this.origin;
    const _length = this.sideArr.length;

    if (_chartjs.oldDataset || getPointsDistance({ x, y }, _origin) > _chartjs.drawer.radius + 5) {
      return false;
    }
    const _angle = getPointsAngle(_origin, { x, y });
    const _partAngle = Math.PI / _length; // 2N份
    let _index = Math.floor(_angle / _partAngle); // select index

    _index = Math.round(_index + ((_index & 1 && 1) || 0)) / 2;
    if (_index === _length) _index = 0;

    const _values = _opts.datas.map((item: number[]) => item[_index]);

    // draw hover status
    this.drawRadar(1, _index);
    if (isWeapp) _chartjs.canvas.draw(true);

    if (_opts.hover) _opts.hover.call(_chartjs, _index, _values, _angle, x, y);

    return _index;
  }

  /**
   * @function RadarDraw.draw
   * @description 折线图——总控
   * @param {Boolean} onlyClearShapes 是否只清理折线图形区域
   * @param {Boolean}  noanimatebool 是否不需要动画
   */
  override draw(onlyClearShapes?: boolean, noAnimate?: boolean) {
    this.setDataset(onlyClearShapes);
    const _opts = this.chartjs.opts;

    const CANNOT_ANIMATE = noAnimate || (!isWeb && !isWeapp);
    if (CANNOT_ANIMATE) {
      // nodejs
      this.drawRadar(1);
      if (_opts.onFinish) _opts.onFinish();
    } else {
      (this as any).setAnimation((process: number) => {
        // animation finish
        this.drawRadar(process);
        if (_opts.onAnimation) _opts.onAnimation.call(this, process);
        if (isWeapp) this.chartjs.ctx.draw(true);
      });
    }
  }

  /**
   * @function RadarDraw.init
   * @description 初始化
   */
  init() {
    const { noAnimation } = this.chartjs.opts;
    this.draw(false, noAnimation);
    this.setEvents();
    if (isWeapp) this.chartjs.canvas.draw();
  }
}
