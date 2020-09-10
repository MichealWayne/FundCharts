/**
 * FundCharts.ToolTips
 * @module Shape
 * @description Pie/Radar
 * @time 2020.06
 */

import { 
    handleArguments,
    drawPoint,
    isFunction
} from './utils'
import CONFIG from './config'

const {
    colors
} = CONFIG;

/**
 * @function PieCenterToolTip
 * @description basic
 * @fit Pie
 */
export const PieCenterToolTip = handleArguments(function ({
    angle,
    yDatas,
    xPos,
    yPos,
    index
}) {
    let ctx = this.ctx,
        opts = this.opts;
    let {
        font = CONFIG.pieFont,
        color,
        valColor = colors.valColor,
        textAlign = CONFIG.textAlign,
        valY,
        showTip,
        showValTip
    } = opts.toolTip || {};
    
    ctx.save();

    // draw texts
    let _origin = this.drawer.origin;
    valY = valY || _origin.y;

    // draw texts
    ctx.fillStyle = color || opts.colors[index];
    ctx.font = font;
    ctx.textAlign = textAlign;
    let txt = isFunction(showTip) && showTip(index) || showTip || '';
    ctx.fillText(txt, _origin.x, valY - 10);
    
    ctx.fillStyle = valColor;
    let valTxt = isFunction(showValTip) && showValTip(yDatas[0]) || showValTip || (yDatas[0] * 100).toFixed(1);
    
    ctx.fillText(valTxt, _origin.x, valY + 15);
    ctx.restore();
});


/**
 * @function PieLabelToolTip
 * @description basic
 * @fit Pie
 */
export const PieLabelToolTip = handleArguments(function ({
    angle,
    yDatas,
    xPos,
    yPos,
    index
}) {
    let ctx = this.ctx,
        opts = this.opts;
    let {
        font = CONFIG.labelFont,
        color,
        valColor = colors.valColor,
        textAlign = CONFIG.textAlign,
        //valY,
        showTip,
        showValTip
    } = opts.toolTip || {};
    
    ctx.save();

    // draw texts
    let _origin = this.drawer.origin,
        radius = this.drawer.radius,
        centerArr = this.drawer.centerArr;

    let _sinx = Math.sin(centerArr[index]) * radius,
        _cosx = Math.cos(centerArr[index]) * radius;
    if (opts.widthRates) {
        _sinx *= opts.widthRates[index] || 1;
        _cosx *= opts.widthRates[index] || 1;
    }
    let lineXStart = opts.chartLeft,
        lineXEnd = this._chart.width - lineXStart;

    // draw line
    ctx.beginPath();
    ctx.moveTo(_origin.x + _cosx, _origin.y + _sinx);
    ctx.lineTo(_origin.x + _cosx * 1.2, _origin.y + _sinx * 1.2)
    ctx.lineTo(_cosx > 0 ? lineXEnd - 20 : lineXStart + 20, _origin.y + _sinx * 1.2);
    ctx.strokeStyle = ctx.fillStyle = opts.colors[index];
    ctx.lineWidth = 1;
    
    ctx.stroke();

    // draw texts
    ctx.font = font;
    ctx.textAlign = textAlign;
    ctx.textBaseline = 'middle';
    
    ctx.fillStyle = color || opts.colors[index];
    let txt = isFunction(showTip) && showTip(index) || showTip || '';
    ctx.fillText(txt, _cosx > 0 ? lineXEnd : lineXStart, _origin.y + _sinx * 1.2 - 10);

    ctx.fillStyle = valColor;
    let valTxt = isFunction(showValTip) && showValTip(yDatas[0]) || showValTip || (yDatas[0] * 100).toFixed(2);
    
    ctx.fillText(valTxt, _cosx > 0 ? lineXEnd : lineXStart, _origin.y + _sinx * 1.2 + 5);
    ctx.restore();
});

/**
 * @function LabelsToolTip
 * @description basic
 * @fit Pie
 */
export const LabelsToolTip = handleArguments(function ({
    angle,
    yDatas,
    xPos,
    yPos,
    index
}) {
    let ctx = this.ctx,
        opts = this.opts;
    let {
        font = CONFIG.labelFont,
        color,
        valColor = colors.valColor,
        valY,
        valX,
        showTip,
        showValTip
    } = opts.toolTip || {};
    
    ctx.save();
    let _origin = this.drawer.origin;
    let x = valX;
    if (!x) x = _origin.x > this._chart.width / 2 ? opts.chartLeft + 20 : this._chart.width - opts.chartRight - 70;

    let y = valY || _origin.y;
    if (this.side) {    // radar
        this.dataset.map((item, idx) => {
            drawPoint(ctx, x, y - 4 + idx * 15, opts.colors[idx], opts.colors[idx], 4, 1);
        })
    } else {    // pie
        drawPoint(ctx, x, y - 4, opts.colors[index], opts.colors[index], 4, 1);
    }

    ctx.font = font;
    
    let txt = isFunction(showTip) && showTip(index) || showTip || '';
    if (this.side) {
        this.dataset.map((item, idx) => {
            ctx.fillStyle = color || opts.colors[idx];
            ctx.fillText(txt, x + 10, y + 15 * idx);
            let valTxt = isFunction(showValTip) && showValTip(yDatas[0]) || showValTip || (yDatas[0] * (this.side && 100 || 1)).toFixed(2);
            ctx.fillStyle = valColor;
            ctx.fillText(valTxt, x + ctx.measureText(txt).width + 15, y + 15 * idx);
        });
    } else {
        ctx.fillStyle = color || opts.colors[index];
        ctx.fillText(txt, x + 10, y);
        let valTxt = isFunction(showValTip) && showValTip(yDatas[0]) || showValTip || (yDatas[0] * (this.side && 100 || 1)).toFixed(2);
        ctx.fillText(valTxt, x + ctx.measureText(txt).width + 15, y);
    }

    ctx.restore();
})

