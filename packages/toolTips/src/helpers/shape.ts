/**
 * FundCharts.ToolTips
 * @module Shape
 * @description Pie/Radar
 * @time 2020.06
 */

import {
  handleShowValTipsStr,
  handleToolTipOptions,
  drawPoint,
  isFunction,
  handleWeappDraw,
} from '../utils';
import CONFIG from '../config';

const { colors } = CONFIG;

/**
 * @function PieCenterToolTip
 * @description basic
 * @fit Pie
 */
export const PieCenterToolTip = handleToolTipOptions(function ({
  yDatas,
  index,
}) {
  const { ctx, opts } = this;

  const { origin } = this.drawer || {};
  const {
    font = CONFIG.pieFont,
    color,
    valColor = colors.valColor,
    textAlign = CONFIG.textAlign,
    valY = origin.y,
    showTip,
    showValTip,
  } = opts.toolTip || {};

  ctx.save();

  // draw texts
  ctx.fillStyle = color || opts.colors[index];
  ctx.font = font;
  ctx.textAlign = textAlign;
  const txt = (isFunction(showTip) && showTip(index)) || showTip || '';
  ctx.fillText(txt, origin.x, valY - 10);

  ctx.fillStyle = valColor;
  const valTxt =
    (isFunction(showValTip) && showValTip(yDatas[0])) ||
    showValTip ||
    (yDatas[0] * 100).toFixed(1);
  ctx.fillText(valTxt, origin.x, valY + 15);

  ctx.restore();

  handleWeappDraw(ctx);
});

/**
 * @function PieLabelToolTip
 * @description basic
 * @fit Pie
 */
export const PieLabelToolTip = handleToolTipOptions(function ({
  yDatas,
  index,
}) {
  const { ctx, opts, drawer } = this;

  const {
    font = CONFIG.labelFont,
    color,
    valColor = colors.valColor,
    textAlign = CONFIG.textAlign,
    showTip,
    showValTip,
  } = opts.toolTip || {};

  ctx.save();

  const _origin = drawer.origin;
  const radius = drawer.radius;
  const centerArr = drawer.centerArr;

  let _sinx = Math.sin(centerArr[index]) * radius;
  let _cosx = Math.cos(centerArr[index]) * radius;
  if (opts.widthRates) {
    _sinx *= opts.widthRates[index] || 1;
    _cosx *= opts.widthRates[index] || 1;
  }
  const lineXStart = opts.chartLeft;
  const lineXEnd = this._chart.width - lineXStart;

  // draw line
  ctx.beginPath();
  ctx.moveTo(_origin.x + _cosx, _origin.y + _sinx);
  ctx.lineTo(_origin.x + _cosx * 1.2, _origin.y + _sinx * 1.2);
  ctx.lineTo(
    _cosx > 0 ? lineXEnd - 20 : lineXStart + 20,
    _origin.y + _sinx * 1.2
  );
  ctx.strokeStyle = ctx.fillStyle = opts.colors[index];
  ctx.lineWidth = 1;

  ctx.stroke();

  // draw texts
  ctx.font = font;
  ctx.textAlign = textAlign;
  ctx.textBaseline = 'middle';

  ctx.fillStyle = color || opts.colors[index];
  const txt = (isFunction(showTip) && showTip(index)) || showTip || '';
  ctx.fillText(
    txt,
    _cosx > 0 ? lineXEnd : lineXStart,
    _origin.y + _sinx * 1.2 - 10
  );

  ctx.fillStyle = valColor;
  const valTxt = handleShowValTipsStr(
    showValTip,
    String(yDatas[0]),
    (yDatas[0] * 100).toFixed(2)
  );
  ctx.fillText(
    valTxt,
    _cosx > 0 ? lineXEnd : lineXStart,
    _origin.y + _sinx * 1.2 + 5
  );

  ctx.closePath();
  ctx.restore();

  handleWeappDraw(ctx);
});

/**
 * @function LabelsToolTip
 * @description basic
 * @fit Pie
 */
export const LabelsToolTip = handleToolTipOptions(function ({ yDatas, index }) {
  const { ctx, opts } = this;

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
  const isRadar = this.side;
  const _origin = this.drawer.origin;
  const dataset = this.dataset;
  const { width } = this._chart;

  // draw point
  let x = valX;
  if (!x) {
    x =
      _origin.x > width / 2
        ? opts.chartLeft + 20
        : width - opts.chartRight - 70;
  }

  const y = valY || _origin.y;

  const drawPointParams = {
    ctx,
    x,
    y: 0,
    color: '',
    strokeColor: '',
    width: 4,
    strokeWidth: 1,
  };
  if (isRadar) {
    // radar
    dataset.forEach((_: unknown, idx: number) => {
      drawPointParams.y = y - 4 + idx * 15;
      drawPointParams.color = drawPointParams.strokeColor = opts.colors[idx];
      drawPoint(drawPointParams);
    });
  } else {
    // pie
    drawPointParams.y = y - 4;
    drawPointParams.color = drawPointParams.strokeColor = opts.colors[index];
    drawPoint(drawPointParams);
  }

  // draw texts
  ctx.font = font;
  const txt = (isFunction(showTip) && showTip(index)) || showTip || '';

  // radar
  if (isRadar) {
    dataset.forEach((_: unknown, idx: number) => {
      ctx.fillStyle = color || opts.colors[idx];
      ctx.fillText(txt, x + 10, y + 15 * idx);
      const valTxt = handleShowValTipsStr(
        showValTip,
        String(yDatas[0]),
        (yDatas[0] * 1).toFixed(2)
      );
      ctx.fillStyle = valColor;
      ctx.fillText(valTxt, x + ctx.measureText(txt).width + 15, y + 15 * idx);
    });
  } else {
    // pie
    ctx.fillStyle = color || opts.colors[index];
    ctx.fillText(txt, x + 10, y);
    const valTxt = handleShowValTipsStr(
      showValTip,
      String(yDatas[0]),
      (yDatas[0] * 100).toFixed(2)
    );
    ctx.fillText(valTxt, x + ctx.measureText(txt).width + 15, y);
  }

  ctx.restore();

  handleWeappDraw(ctx);
});
