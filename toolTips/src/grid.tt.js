/**
 * FundCharts.ToolTips
 * @module Grid
 * @description Line/Bar/Scatter/Kline
 * @time 2020.06
 */

import { 
    handleArguments,
    drawTriangle,
    isFunction
} from './utils'
import CONFIG from './config'

const {
    colors
} = CONFIG;

/**
 * @function BasicToolTip
 * @description basic toolTip, no arrow
 * @fit Line/Bar
 */
export const BasicToolTip = handleArguments(function ({
    xData,
    yDatas,
    xPos,
    yPos
}) {
    let ctx = this.ctx,
        opts = this.opts;
    let {
        width = CONFIG.width,
        height = CONFIG.height,
        font = CONFIG.font,
        color = colors.color,
        textAlign = CONFIG.textAlign,
        backgroundColor = colors.backgroundColor,
        showTip
    } = opts.toolTip || {};
    
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = backgroundColor;
    let _rectX = xPos - ~~(width / 2);
    const xLimit = this._chart.width - opts.chartRight - width;
    _rectX = _rectX < opts.chartLeft 
        ? opts.chartLeft 
            : _rectX > xLimit
                ? xLimit : _rectX;
    ctx.fillRect(_rectX, opts.chartTop + 5, width, height);

    // text
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.textAlign = textAlign;

    const txt = isFunction(showTip) && showTip(xData, yDatas) || showTip || (xData + ':' + yDatas.map(item => item.toFixed(2)).join(','));
    ctx.fillText(txt, _rectX + ~~(width / 2), opts.chartTop + 15);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
});

/**
 * @function ArrowToolTip
 * @description this toolTip has an arrow
 * @fit Line/Bar
 */
export const ArrowToolTip = handleArguments(function ({
    xData,
    yDatas,
    xPos,
    yPos,
    index
}) {
    let ctx = this.ctx,
        opts = this.opts;
    let {
        width = CONFIG.width,
        height = CONFIG.height,
        font = CONFIG.font,
        color = colors.color,
        textAlign = CONFIG.textAlign,
        backgroundColor = colors.backgroundColor,
        top = 10,
        showTip
    } = opts.toolTip || {};

    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = backgroundColor;
    ctx.fillStyle = backgroundColor;

    let _rectX = xPos - ~~(width / 2);
    const xLimit = this._chart.width - opts.chartRight - width;
    _rectX = _rectX < opts.chartLeft 
        ? opts.chartLeft 
            : _rectX > xLimit
                ? xLimit : _rectX;
    let _x = this.datasets[0][index].x;
    
    let pointY = this.datasets[0][index].y
    if (this.barWidth) {    // bar
        _x += ~~((this.barWidth) / 2);
        pointY = Math.min.apply(null, this.datasets.map(item => item[index].y))
    }
    let _y = pointY + (this.drawer.zeroY && pointY > this.drawer.zeroY ? top : -(height + top));
    
    let _showTriangle = true;
    if (_y < opts.chartTop) {   // top limit
        _showTriangle = false;
        _y = opts.chartTop;
    }
    
    let triangleY = _y + height;
    if (this.drawer.zeroY && _y > this.drawer.zeroY) {  // bar
    //     _y = pointY + 20;
         triangleY = _y;
    }
    if (_y + height > this._chart.height - 25) {    // bottom limit
        _showTriangle = false;
        _y = this._chart.height - 25 - height;
    }
    ctx.fillRect(_rectX, _y, width, height);
    
    if (_showTriangle) {
        drawTriangle(ctx, [
            { x: Math.max(_x - 3, _rectX), y: triangleY },
            { x: Math.min(_x + 3, _rectX + width), y: triangleY },
            { x: _x, y: triangleY + 5 * (triangleY > _y ? 1 : -1) }
        ])
    }

    // text
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.textAlign = textAlign;

    const txt = isFunction(showTip) && showTip(xData, yDatas) || showTip || (xData + ':' + yDatas.map(item => item.toFixed(2)).join(','));
    ctx.fillText(txt, _rectX + ~~(width / 2), _y + 10);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
})

/**
 * @function KlineToolTip
 * @description Kline label.
 * @fit Kline
 */
export const KlineToolTip = handleArguments(function ({
    xData,
    yDatas,
    xPos,
    yPos,
    index
}) {
    let ctx = this.ctx,
        opts = this.opts;
    let {
        xWidth = CONFIG.width,
        xHeight = 15,
        yWidth = 40,
        yHeight = 15,
        font = CONFIG.font,
        color = colors.color,
        textAlign = CONFIG.textAlign,
        backgroundColor = colors.backgroundColor
    } = opts.toolTip || {};

    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = backgroundColor;
    ctx.fillStyle = backgroundColor;

    let _rectX = xPos - ~~(xWidth / 2);
    let _rectY = yPos - ~~(yHeight / 2);
    const xLimit = this._chart.width - opts.chartRight - xWidth;
    const yLimit = this._chart.height - 40;
    _rectX = _rectX < opts.chartLeft 
        ? opts.chartLeft 
            : _rectX > xLimit
                ? xLimit : _rectX;
    _rectY = _rectY < opts.chartTop
        ? opts.chartTop
            : _rectY > yLimit
                ? yLimit : _rectY;

    ctx.fillRect(_rectX, yLimit, xWidth, xHeight);
    ctx.fillRect(opts.chartLeft, _rectY, yWidth, yHeight);

    // text
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.textAlign = textAlign;
    ctx.fillText(xData, _rectX + ~~(xWidth / 2), yLimit + 8);
    let yDataShow = ((yPos - this.drawer.yBasic) / this.drawer.yRate).toFixed(2)
    
    ctx.fillText(yDataShow, opts.chartLeft + ~~(yWidth / 2), _rectY + 8);

    ctx.closePath();
    ctx.stroke();
    ctx.restore();
})