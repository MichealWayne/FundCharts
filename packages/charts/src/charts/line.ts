/**
 * @module LineDraw
 * @description line chart drawer
 * @author Wayne
 * @createTime 2019-07-15
 * @lastModified 2021-10-10
 */

import {
  isWeb,
  isWeapp,
  each,
  getColorRgbList,
  cloneArray,
  getAxisLimit,
  drawLine,
  AnyFunc,
} from 'fundcharts-core';
import Grid from '../factorys/GridFactory';

type LinePoint = {
  x: number;
  y: number;
  value: number;
};

export default class LineDraw extends Grid {
  /**
   * @function LineChart.setDataset
   * @description 计算并设置实例参数数据
   */
  private setDataset() {
    const _chartjs = this.chartjs;
    const { opts } = _chartjs;

    opts.datas = this.formatGridDatas(opts.datas);
    const yLength = opts.grid.yTickLength;
    const { datas } = opts;

    const [minData, maxData] = this.getBasicData(); // extend grid.draw

    let _min: number;
    let _range: number;
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

    let _xlength = datas[0].length;
    _xlength = _xlength > 1 ? _xlength : 2;
    this.xaxis = {
      min: 0,
      max: _xlength - 1,
      range: _xlength,
      unit: 1,
    };

    // x = xRate * index + 50;
    const _xBasic = (this.xBasic = opts.chartLeft);
    const _xRate = (this.xRate =
      (_chartjs._chart.width - opts.chartLeft - opts.chartRight) / (_xlength - 1));

    const _datasets: LinePoint[][] = [];

    // get points coordinate
    each(datas, (item: number[][]): void => {
      const _dataset: LinePoint[] = [];

      if (item.length === 1) item[1] = item[0];
      each(item, (data: number, i: number) => {
        _dataset.push({
          x: Math.ceil(i * _xRate + _xBasic),
          y: data * _yRate + _yBasic,
          value: data,
        });
      });

      _datasets.push(_dataset);
    });

    _chartjs.datasets = _datasets;
  }

  /**
   * @function LineChart.drawLine
   * @description 折线图——绘制折线
   * @param {Number} 进程
   */
  private drawLine(process = 1) {
    const _chartjs = this.chartjs;
    const _datasets = _chartjs.datasets;
    const _opts = _chartjs.opts;
    const { ctx } = _chartjs;

    ctx.lineWidth = 1;

    const ymax = _chartjs._chart.height - 24;
    const linearHeight = ymax - _opts.chartTop || 170;
    const gradientCache = new Map<string, CanvasGradient>();

    // define gradient
    const drawLinearGradient = (color: string) => {
      const cacheKey = `${color}-${linearHeight}`;
      let grad = gradientCache.get(cacheKey);
      if (!grad) {
        grad = ctx.createLinearGradient(0, 0, 0, linearHeight);
        const colors = getColorRgbList(color).join(',');
        grad.addColorStop(0, `rgba(${colors}, 0.3)`);
        grad.addColorStop(0.8, `rgba(${colors}, 0.05)`);
        grad.addColorStop(1, `rgba(${colors}, 0)`);
        gradientCache.set(cacheKey, grad);
      }

      ctx.fillStyle = grad;
      ctx.fill();
    };

    // 连接线
    const _oldDatasets = _chartjs.oldDatasets;
    const _oldDataLen = _oldDatasets?.[0]?.length;

    // lineto method
    const lineTo =
      !_oldDataLen || process === 1
        ? (data: LinePoint) => {
            ctx.lineTo(data.x, data.y);
          }
        : (data: LinePoint, index: number, oldPointData: LinePoint[]) => {
            const _x = data.x;
            const _y = data.y;

            if (!oldPointData) return;
            const _data = oldPointData[index] || oldPointData[_oldDataLen - 1];

            ctx.lineTo(
              (_x - _data.x) * process + _data.x,
              oldPointData[index] ? (_y - _data.y) * process + _data.y : _y
            );
          };
    // curve method
    const curveTo = (data: LinePoint, dataNext: LinePoint, oldPointData?: LinePoint[]) => {
      dataNext = dataNext || data;
      const _x = (data.x + dataNext.x) / 2;
      const _y = ymax * (1 - process) + ((data.y + dataNext.y) * process) / 2;

      ctx.quadraticCurveTo(data.x, data.y, _x, _y);
    };

    // draw
    // eslint-disable-next-line complexity
    each(_datasets, (_item: LinePoint[], index: number) => {
      ctx.save();
      const firstDataset = _datasets[index][0]; // first dataset point
      const limitLen = !_oldDataLen ? ~~(process * _item.length) : _item.length;
      if (!limitLen) return false;

      const findNextValidIndex = (start: number) => {
        for (let i = start; i < limitLen; i++) {
          const data = _item[i];
          if (data && data.value !== undefined) return i;
        }
        return -1;
      };

      const findLastValidIndex = () => {
        for (let i = limitLen - 1; i >= 0; i--) {
          const data = _item[i];
          if (data && data.value !== undefined) return i;
        }
        return -1;
      };

      const getOldPointByOrder = (oldSet: LinePoint[] | undefined, order: number) => {
        if (!oldSet || order < 0) return null;
        let count = 0;
        let lastValid: LinePoint | null = null;
        for (let i = 0, len = oldSet.length; i < len; i++) {
          const data = oldSet[i];
          if (data && data.value !== undefined) {
            if (count === order) return data;
            lastValid = data;
            count++;
          }
        }
        return lastValid;
      };

      const firstValidIndex = findNextValidIndex(0);
      if (firstValidIndex === -1) return false;
      const lastValidIndex = findLastValidIndex();
      if (lastValidIndex === -1) return false;

      const oldPointData = _oldDatasets?.[index];
      let validCount = 0;

      const traverseLine = () => {
        for (let i = firstValidIndex; i <= lastValidIndex; i++) {
          const data = _item[i];
          if (!data || data.value === undefined) continue;
          if (!_opts.curveLine) {
            lineTo(data, validCount, oldPointData);
          } else {
            const nextIndex = findNextValidIndex(i + 1);
            const nextData = nextIndex === -1 ? data : _item[nextIndex];
            curveTo(data, nextData, oldPointData);
          }
          validCount++;
        }
      };

      if (_opts.allGradient || (index === 0 && !_opts.noGradient)) {
        // first line add fill gradient

        ctx.beginPath();
        ctx.lineWidth = 0;
        ctx.strokeStyle = _opts.backgroundColor;
        ctx.moveTo(_opts.chartLeft, ymax);

        ctx.lineTo(firstDataset.x + 0.5, ymax * (1 - process) + firstDataset.y * process);
        traverseLine();

        if (!_oldDatasets?.[0]) {
          ctx.lineTo(_item[lastValidIndex].x + 0.5, ymax);
        } else {
          const olditem = getOldPointByOrder(_oldDatasets[0], validCount - 1) || _item[lastValidIndex];
          const oldx = (_item[lastValidIndex].x - olditem.x) * process + olditem.x;
          ctx.lineTo(oldx, (_item[lastValidIndex].y - olditem.y) * process + olditem.y);
          ctx.lineTo(oldx, ymax);
        }
        ctx.closePath();
        ctx.stroke();
        drawLinearGradient(_opts.colors[index]);
      }

      ctx.lineWidth = _opts.lineWidths?.[index] || 1;
      ctx.strokeStyle = _opts.colors[index];
      ctx.beginPath();

      if (_oldDatasets?.[index]) {
        // translate animte
        ctx.moveTo(
          firstDataset.x,
          (firstDataset.y - _oldDatasets[index][0].y) * process + _oldDatasets[index][0].y
        );
      } else {
        ctx.moveTo(firstDataset.x, firstDataset.y);
      }

      validCount = 0;
      traverseLine(); // draw lines

      ctx.stroke();
      ctx.restore();
    });

    ctx.save();

    if (process === 1) {
      // translate animation finished, clear old datasets
      _chartjs.oldDatasets = null;
    }
  }

  /**
   * @function LineChart.drawHover
   * @description 折线图——交互——事件交互展示
   * @param {Number} x x轴位置坐标
   * @param {Number} y x轴位置坐标
   * @return {Number | Boolean} 索引或离开
   */
  override drawHover(x: number, y: number): number | boolean {
    const _chartjs = this.chartjs;
    const _opts = _chartjs.opts;

    // 曲线或者还在动画过渡
    if (_opts.curveLine || _chartjs.oldDatasets) return false;
    this.draw(isWeapp, true);

    const { ctx } = _chartjs;

    const rightLimit = _chartjs._chart.width - _opts.chartRight;
    x = x < _opts.chartLeft ? _opts.chartLeft : x > rightLimit ? rightLimit : x;

    const _index = Math.round((x - this.xBasic) / this.xRate);
    const _values: number[] = [];
    let _x = 0;
    const pointsArr: AnyFunc[] = [];

    // points
    const _datasets = _chartjs.datasets;

    each(_datasets, (item: LinePoint[], index: number) => {
      const _item = item[_index];
      if (!_opts.hideHoverPoints && _item) {
        pointsArr.unshift(() => {
          this.drawPoint(
            ctx,
            { x: _item.x, y: _item.y - 1 },
            _opts.colors[index],
            _opts.pointStyle,
            4,
            1
          );
        });
      }
      _x = _item.x;
      _values.push(_item.value);
    });

    // hover line
    if (!_opts.noHoverLine) {
      _x += 0.3;
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = _opts.hoverLineColor;

      drawLine(ctx, { x: _x, y: 6 + _opts.chartTop }, { x: _x, y: _chartjs._chart.height - 25 });
    }

    // hover points
    if (pointsArr.length) each(pointsArr, (draw: AnyFunc) => draw());

    if (_opts.hover) _opts.hover.call(_chartjs, _index, _values, _opts.xaxis[_index], x, y);
    ctx.restore();

    if (isWeapp) _chartjs.canvas.draw(true);

    return _index;
  }

  /**
   * @function LineChart.draw
   * @description 折线图——总控
   * @param {Boolean} onlyClearShapes 是否只清理折线图形区域
   * @param {Boolean | Undefined}  noAnimate 是否不需要动画
   */
  override draw(onlyClearShapes?: boolean, noAnimate?: boolean) {
    const _chartjs = this.chartjs;
    const _opts = _chartjs.opts;
    const _datasets = _chartjs.datasets;
    this.clearCtn(!onlyClearShapes);
    this.drawDashs();

    if (onlyClearShapes) {
      if (_datasets) _chartjs.oldDatasets = cloneArray([], _datasets);
      this.setDataset();
      this.drawTexts();
    }

    if (
      noAnimate ||
      _opts.curveLine || // curve line
      (!isWeb && !isWeapp) // nodejs
    ) {
      this.drawLine();
      if (_opts.onFinish) _opts.onFinish();
    } else {
      (this as any).setAnimation((process: number) => {
        // finish animation
        this.clearCtn(true);
        this.drawDashs();
        this.drawLine(process);

        if (_opts.onAnimation) _opts.onAnimation.call(this, process);
        if (isWeapp) _chartjs.ctx.draw(true);
      });
    }
  }

  /**
   * @function LineChart.init
   * @description 初始化注入
   */
  init() {
    const { noAnimation } = this.chartjs.opts;

    this.draw(true, noAnimation);
    this.setEvents();
    if (isWeapp) this.chartjs.canvas.draw();
  }
}
