/**
 * FundCharts.ToolTips
 * @module Shape
 * @description Pie/Radar
 * @time 2020.06
 */

import { handleArguments, drawPoint, isFunction, handleWeappDraw } from './utils';
import CONFIG from './config';

const { colors } = CONFIG;

/**
 * @function PieCenterToolTip
 * @description basic
 * @fit Pie
 */
export const PieCenterToolTip = handleArguments(function ({ yDatas, index }) {
  const ctx = this.ctx,
    opts = this.opts;

  const _origin = this.drawer.origin;
  const {
    font = CONFIG.pieFont,
    color,
    valColor = colors.valColor,
    textAlign = CONFIG.textAlign,
    valY = _origin.y,
    showTip,
    showValTip,
  } = opts.toolTip || {};

  ctx.save();

  // draw texts

  ctx.fillStyle = color || opts.colors[index];
  ctx.font = font;
  ctx.textAlign = textAlign;
  const txt = (isFunction(showTip) && showTip(index)) || showTip || '';
  ctx.fillText(txt, _origin.x, valY - 10);

  ctx.fillStyle = valColor;
  const valTxt =
    (isFunction(showValTip) && showValTip(yDatas[0])) || showValTip || (yDatas[0] * 100).toFixed(1);
  ctx.fillText(valTxt, _origin.x, valY + 15);

  ctx.restore();
  handleWeappDraw(ctx);
});

/**
 * @function PieLabelToolTip
 * @description basic
 * @fit Pie
 */
export const PieLabelToolTip = handleArguments(function ({ yDatas, index }) {
  const ctx = this.ctx,
    opts = this.opts;
  const {
    font = CONFIG.labelFont,
    color,
    valColor = colors.valColor,
    textAlign = CONFIG.textAlign,
    showTip,
    showValTip,
  } = opts.toolTip || {};

  ctx.save();

  const drawer = this.drawer,
    _origin = drawer.origin,
    radius = drawer.radius,
    centerArr = drawer.centerArr;

  let _sinx = Math.sin(centerArr[index]) * radius,
    _cosx = Math.cos(centerArr[index]) * radius;
  if (opts.widthRates) {
    _sinx *= opts.widthRates[index] || 1;
    _cosx *= opts.widthRates[index] || 1;
  }
  const lineXStart = opts.chartLeft,
    lineXEnd = this._chart.width - lineXStart;

  // draw line
  ctx.beginPath();
  ctx.moveTo(_origin.x + _cosx, _origin.y + _sinx);
  ctx.lineTo(_origin.x + _cosx * 1.2, _origin.y + _sinx * 1.2);
  ctx.lineTo(_cosx > 0 ? lineXEnd - 20 : lineXStart + 20, _origin.y + _sinx * 1.2);
  ctx.strokeStyle = ctx.fillStyle = opts.colors[index];
  ctx.lineWidth = 1;

  ctx.stroke();

  // draw texts
  ctx.font = font;
  ctx.textAlign = textAlign;
  ctx.textBaseline = 'middle';

  ctx.fillStyle = color || opts.colors[index];
  const txt = (isFunction(showTip) && showTip(index)) || showTip || '';
  ctx.fillText(txt, _cosx > 0 ? lineXEnd : lineXStart, _origin.y + _sinx * 1.2 - 10);

  ctx.fillStyle = valColor;
  const valTxt =
    (isFunction(showValTip) && showValTip(yDatas[0])) || showValTip || (yDatas[0] * 100).toFixed(2);
  ctx.fillText(valTxt, _cosx > 0 ? lineXEnd : lineXStart, _origin.y + _sinx * 1.2 + 5);

  ctx.closePath();
  ctx.restore();
  handleWeappDraw(ctx);
});

/**
 * @function LabelsToolTip
 * @description basic
 * @fit Pie
 */
export const LabelsToolTip = handleArguments(function ({ yDatas, index }) {
  const ctx = this.ctx,
    opts = this.opts;
  const {
    font = CONFIG.labelFont,
    color,
    valColor = colors.valColor,
    valY,
    valX,
    showTip,
    showValTip,
  } = opts.toolTip || {};

  ctx.save();
  const isRadar = this.side,
    _origin = this.drawer.origin,
    dataset = this.dataset;

  // draw point
  let x = valX;
  if (!x) {
    x =
      _origin.x > this._chart.width / 2
        ? opts.chartLeft + 20
        : this._chart.width - opts.chartRight - 70;
  }

  let y = valY || _origin.y;

  if (isRadar) {
    // radar
    dataset.map((item, idx) => {
      drawPoint(ctx, x, y - 4 + idx * 15, opts.colors[idx], opts.colors[idx], 4, 1);
    });
  } else {
    // pie
    drawPoint(ctx, x, y - 4, opts.colors[index], opts.colors[index], 4, 1);
  }

  // draw texts
  ctx.font = font;
  const txt = (isFunction(showTip) && showTip(index)) || showTip || '';
  if (isRadar) {
    dataset.map((item, idx) => {
      ctx.fillStyle = color || opts.colors[idx];
      ctx.fillText(txt, x + 10, y + 15 * idx);
      const valTxt =
        (isFunction(showValTip) && showValTip(yDatas[0])) ||
        showValTip ||
        (yDatas[0] * ((this.side && 100) || 1)).toFixed(2);
      ctx.fillStyle = valColor;
      ctx.fillText(valTxt, x + ctx.measureText(txt).width + 15, y + 15 * idx);
    });
  } else {
    // pie
    ctx.fillStyle = color || opts.colors[index];
    ctx.fillText(txt, x + 10, y);
    const valTxt =
      (isFunction(showValTip) && showValTip(yDatas[0])) ||
      showValTip ||
      (yDatas[0] * ((this.side && 100) || 1)).toFixed(2);
    ctx.fillText(valTxt, x + ctx.measureText(txt).width + 15, y);
  }

  ctx.restore();
  handleWeappDraw(ctx);
});
