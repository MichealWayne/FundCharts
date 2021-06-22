/**
 * FundCharts.ToolTips
 * @module Grid
 * @description Line/Bar/Scatter/Kline
 * @time 2020.06
 */
import { half, handleArguments, drawTriangle, isFunction, handleWeappDraw } from './utils';
import { PointsMap } from './types';
import CONFIG from './config';

const { colors } = CONFIG;

/**
 * @function BasicToolTip
 * @description basic toolTip, no arrow
 * @fit Line/Bar
 */
export const BasicToolTip = handleArguments(function ({ xData, yDatas, xPos }) {
  const ctx = this.ctx;
  const opts = this.opts;
  const {
    width = CONFIG.width,
    height = CONFIG.height,
    font = CONFIG.font,
    color = colors.color,
    textAlign = CONFIG.textAlign,
    backgroundColor = colors.backgroundColor,
    showTip,
  } = opts.toolTip || {};

  ctx.save();
  ctx.beginPath();

  // draw background
  ctx.fillStyle = backgroundColor;
  let _rectX = xPos - half(width);
  const xLimit = this._chart.width - opts.chartRight - width;
  _rectX = _rectX < opts.chartLeft ? opts.chartLeft : _rectX > xLimit ? xLimit : _rectX;
  ctx.fillRect(_rectX, opts.chartTop + 5, width, height);

  // draw text
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textAlign = textAlign;
  const txt =
    (isFunction(showTip) && showTip(xData, yDatas)) ||
    showTip ||
    xData + ':' + yDatas.map((item: number) => item.toFixed(2)).join(',');
  ctx.fillText(txt, _rectX + half(width), opts.chartTop + 15);

  ctx.closePath();
  ctx.stroke();
  ctx.restore();
  handleWeappDraw(ctx);
});

/**
 * @function ArrowToolTip
 * @description this toolTip has an arrow
 * @fit Line/Bar
 */
export const ArrowToolTip = handleArguments(function ({ xData, yDatas, xPos, index }) {
  const ctx = this.ctx;
  const opts = this.opts;
  const {
    width = CONFIG.width,
    height = CONFIG.height,
    font = CONFIG.font,
    color = colors.color,
    textAlign = CONFIG.textAlign,
    backgroundColor = colors.backgroundColor,
    top = 12,
    showTip,
  } = opts.toolTip || {};

  ctx.save();
  ctx.beginPath();

  // draw background and triangle
  const _chart = this._chart;
  const datasets = this.datasets;
  const isBar = this.barWidth;
  ctx.strokeStyle = backgroundColor;
  ctx.fillStyle = backgroundColor;

  let _rectX = xPos - half(width);
  const xLimit = _chart.width - opts.chartRight - width;
  _rectX = _rectX < opts.chartLeft ? opts.chartLeft : _rectX > xLimit ? xLimit : _rectX;
  let _x = datasets[0][index].x;

  let pointY = datasets[0][index].y;
  if (isBar) {
    // bar
    _x += half(this.barWidth);
    pointY = Math.min.apply(
      null,
      datasets.map((item: PointsMap) => item[index].y)
    );
  }
  let _y = pointY + (this.drawer.zeroY && pointY > this.drawer.zeroY ? top : -(height + top));

  // triangle control
  let _showTriangle = true;
  if (_y < opts.chartTop) {
    // top limit
    _showTriangle = false;
    _y = opts.chartTop;
  }

  let triangleY = _y + height;
  if (isBar && this.drawer.zeroY && _y > this.drawer.zeroY) {
    // bar
    triangleY = _y;
  }
  if (_y + height > _chart.height - 25) {
    // bottom limit
    _showTriangle = false;
    _y = _chart.height - 25 - height;
  }
  ctx.fillRect(_rectX, _y, width, height);

  if (_showTriangle) {
    drawTriangle(ctx, [
      { x: Math.max(_x - 3, _rectX), y: triangleY },
      { x: Math.min(_x + 3, _rectX + width), y: triangleY },
      { x: _x, y: triangleY + 5 * (triangleY > _y ? 1 : -1) },
    ]);
  }

  // draw text
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textAlign = textAlign;
  const txt =
    (isFunction(showTip) && showTip(xData, yDatas)) ||
    showTip ||
    xData + ':' + yDatas.map((item: number) => item.toFixed(2)).join(',');
  ctx.fillText(txt, _rectX + half(width), _y + 10);

  ctx.closePath();
  ctx.stroke();
  ctx.restore();
  handleWeappDraw(ctx);
});

/**
 * @function KlineToolTip
 * @description Kline label.
 * @fit Kline
 */
export const KlineToolTip = handleArguments(function ({ xData, xPos, yPos }) {
  xPos = Math.abs(xPos);
  yPos = Math.abs(yPos);
  const ctx = this.ctx;
  const opts = this.opts;
  const {
    xWidth = CONFIG.width,
    xHeight = 15,
    yWidth = 40,
    yHeight = 15,
    font = CONFIG.font,
    color = colors.color,
    textAlign = CONFIG.textAlign,
    backgroundColor = colors.backgroundColor,
    showTip,
    showValTip,
  } = opts.toolTip || {};

  ctx.save();
  ctx.beginPath();
  const _chart = this._chart;
  ctx.strokeStyle = backgroundColor;
  ctx.fillStyle = backgroundColor;

  let _rectX = xPos - half(xWidth);
  let _rectY = yPos - half(yHeight);
  const xLimit = _chart.width - opts.chartRight - xWidth;
  const yLimit = _chart.height - 40;
  _rectX = _rectX < opts.chartLeft ? opts.chartLeft : _rectX > xLimit ? xLimit : _rectX;
  _rectY = _rectY < opts.chartTop ? opts.chartTop : _rectY > yLimit ? yLimit : _rectY;

  ctx.fillRect(_rectX, yLimit, xWidth, xHeight);
  ctx.fillRect(opts.chartLeft, _rectY, yWidth, yHeight);

  // text
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textAlign = textAlign;
  ctx.fillText(
    (isFunction(showTip) && showTip(xData)) || showTip || xData,
    _rectX + half(xWidth),
    yLimit + 8
  );
  const yDataShow = ((yPos - this.drawer.yBasic) / this.drawer.yRate).toFixed(2);
  ctx.fillText(
    (isFunction(showValTip) && showValTip(yDataShow)) || showValTip || yDataShow,
    opts.chartLeft + half(yWidth),
    _rectY + 8
  );

  ctx.closePath();
  ctx.stroke();
  ctx.restore();
  handleWeappDraw(ctx);
});
