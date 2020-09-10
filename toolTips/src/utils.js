/**
 * FundCharts.ToolTips
 * @module Utils
 * @time 2020.06
 */


export function isFunction (func) {
    return typeof func === 'function'
}

/**
 * @function handleArguments
 * @param {number} index 
 * @param {number[]} values 
 * @param {string[]} xaxis 
 * @param {number} x 
 * @param {number} y 
 * @return {Function}
 */
export function handleArguments (fn) {
    return function (index, values, xaxis, x, y) {
        fn.call(this, {
            xData: xaxis,
            yDatas: values,
            xPos: x,
            yPos: y,
            index
        })
    }
}

/**
 * @function drawTriangle
 * @description draw triangle shape
 * @param {CanvasRenderingContext2D} ctx
 * @param {[{x: number, y: number} * 3]} points
 * @return {boolean}
 */
export function drawTriangle (ctx, points) {
    if (points && points.length === 3) {
        ctx.beginPath()
        ctx.moveTo(points[0].x, points[0].y);
        ctx.lineTo(points[1].x, points[1].y);
        ctx.lineTo(points[2].x, points[2].y);
        ctx.closePath();
        ctx.fill();
        return true;
    } else {
        return false;
    }
}

/**
 * @function drawPoint
 * @description draw point
 * @param {canvas object} ctx canvas context
 * @param {number} x center of circle position x
 * @param {number} y center of circle position y
 * @param {string} color fill color
 * @param {string} strokeColor circle side color
 * @param {number} width radius
 * @param {number} strokeWidth circle side width
 */
export function drawPoint (ctx, x, y, color, strokeColor, width, strokeWidth) {
    ctx.beginPath();
    ctx.lineWidth = 0;
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = strokeWidth !== undefined ? strokeWidth : 1;
    ctx.arc(x, y, width, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();

    if (strokeWidth) ctx.stroke();
}
