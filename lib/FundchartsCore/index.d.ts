/**
 * @author Wayne
 * @Date 2022-06-04 19:13:04
 * @LastEditTime 2023-02-28 15:10:41
 */
declare global {
    interface Window {
        NODE_ENV: unknown;
    }
}
declare const __DEV__: boolean;
declare const isWeapp: boolean;
declare const isWeb: boolean;
declare const isNode: boolean;

/**
 * @author Wayne
 * @Date 2022-06-06 09:40:04
 * @LastEditTime 2022-07-19 14:06:53
 */
/** 坐标位置 */
interface PointPosition {
    x: number;
    y: number;
}
/** 坐标集 */
declare type PointsMap = PointPosition[];
/** 列表极值 */
declare type ListExtremum = {
    max: number;
    min: number;
};
/** 普通对象 */
declare type SimpleObj = {
    [propName: string]: unknown;
};
/** 任意对象 */
declare type AnyObj = {
    [key: string]: any;
};
/** 任意数组 */
declare type AnyArray = any[];
/** 任意方法 */
declare type AnyFunc = (...args: any[]) => unknown;

/**
 * @author Wayne
 * @Date 2022-06-06 09:26:24
 * @LastEditTime 2025-06-17 20:41:47
 */

/**
 * @function type
 * @description **type(val)** get the variable value's type
 * @param {any} val variable value
 * @return {string} type string
 * @example
 * const test1 = [1, 2, 3],
 *     test2 = { a: 1, b: '2' },
 *     test3 = 'abc',
 *     test4;
 * type(test1);  // 'Array'
 * type(test2);  // 'Object'
 * type(test3);  // 'String'
 * type(test4);  // 'Undefined'
 */
declare function type(val?: unknown): string;
/**
 * @function isArray
 * @description **isArray(val)** if the variable value is Array
 * @param {any} val value
 * @return {boolean}
 * @example
 * const test1 = [1, 2, 3],
 *     test2 = { a: 1, b: '2' };
 * isArray(test1);  // true
 * isArray(test2);  // false
 */
declare function isArray(val?: unknown): val is Array<any>;
/**
 * @function isUndefined
 * @description **isUndefined(val)** if the variable value is undefined
 * @param {any} val variable value
 * @return {boolean}
 * @example
 * const test1 = [1, 2, 3],
 *     test2;
 * isUndefined(test1);  // false
 * isUndefined(test2);  // true
 */
declare function isUndefined(val?: unknown): val is undefined;
/**
 * @function isString
 * @description **isString(val)** if the variable value is String
 * @param {any} val variable value
 * @return {boolean}
 * @example
 * const test1 = [1, 2, 3],
 *     test2 = 'abc';
 * isString(test1);  // false
 * isString(test2);  // true
 */
declare function isString(val?: unknown): val is string;
/**
 * @function isObject
 * @description **isObject(val)** if the variable value is Object
 * @param {any} val variable value
 * @return {boolean}
 * @example
 * const test1 = [1, 2, 3],
 *     test2 = { a: 1, b: '2' };
 * isObject(test1);  // false
 * isObject(test2);  // true
 */
declare function isObject(val?: unknown): val is Record<any, any>;
/**
 * @function isFunction
 * @description **isFunction(val)** if the variable value is Function
 * @param {any} val variable value
 * @return {Boolean}
 * @example
 * const test1 = [1, 2, 3],
 *     test2 = function () { alert(1) };
 * isFunction(test1);  // false
 * isFunction(test2);  // true
 */
declare function isFunction(val?: unknown): val is Function;
/**
 * @function isNumber
 * @description **isNumber(val)** 判断是否是数字
 * @param {any} value
 * @returns {Boolean}
 */
declare function isNumber(val: unknown): val is number;
/**
 * @function isEmptyObj
 * @description is empty object / array?
 * @param obj checked variate
 * @returns {boolean} empty or not
 * @example
 * const obj1 = { a: 1 };
 * const obj2 = {};
 * isEmptyObj(obj1);    // false
 * isEmptyObj(obj2);    // true
 */
declare function isEmptyObj(obj?: SimpleObj): boolean;
/**
 * @function NOOP
 * @description empty function
 * @returns
 */
declare const NOOP: () => string;
/**
 * @function each
 * @description **each(array, fn)** traverse Array
 * @param {any[]} arr traverse array
 * @param {Function} handle function
 * @return {any[]} array
 * @example
 * const arr = [1, 2, 3];
 * each(arr, function (i) {console.log(i)});
 * // 1
 * // 2
 * // 3
 */
declare function each<T>(arr: T[], fn: (...args: any[]) => void): T[];
/**
 * @function cloneObjDeep
 * @description **cloneObjDeep(fromobj, toobj)** clone a object to new vari
 * @param {object} fromobj from object
 * @param {object} toobj to object
 * @return {object} copied object
 * @example
 * const obj1 = {
 *    a: 1,
 *    b: {
 *        c: 2,
 *        d: 3
 *    },
 *    e: 4
 * };
 * const obj2 = {
 *    a: 'a',
 *    f: 'f'
 * };
 *
 * const obj3 = cloneObjDeep(obj1, obj2);
 * // obj3 == obj2 : {"a":"a","f":"f","b":{"c":2,"d":3},"e":4}
 */
declare function cloneObjDeep(fromObj: SimpleObj, toObj: SimpleObj): Record<any, any>;
/**
 * @function cloneArray
 * @description **cloneArray(fromarr, toarr)**
 * @param {any[]} fromobj
 * @param {any[]} toobj
 * @return {any[]} copied array
 * @example
 * const arr1 = [1,2,3,4,5,6];
 * const arr2 = [7];
 * const arr3 = cloneArray(arr1, arr2);
 * // arr2 == arr3 : [1, 2, 3, 4, 5, 6]
 */
declare const cloneArray: <T>(fromArr: T[], toArr: T[]) => T[];
/**
 * @function throwError
 * @description throw Error Object
 * @param {string} info 错误信息
 * @param {string} part 错误单元
 * @param {string} detail 错误单元细节
 */
declare function throwError(info: unknown, part?: string, detail?: string): Promise<void>;

/**
 * @module Calculate
 * @description chart calcluate
 * @author Wayne
 * @createTime 2019-07-15
 * @lastModified 2019-07-15
 */

/**
 * @function getListExtremum
 * @description 获取数字数组的极值（最大max、最小min）
 * @param {number[]} arr
 * @return {Object} extremum
 *         {Number} min
 *         {Number} max
 * @notice 数组不能为空
 * @example
 *   const { max, min } = getListExtremum([1,3,5,2,2,4,5,7]);  // -> { min: 1, max: 7 }
 */
declare function getListExtremum(arr: number[]): ListExtremum;
/**
 * @function getAxisLimit
 * @description 获取网格最大范围值。set grid charts scale rate range
 * @param {Number} range
 * @return {Number}
 */
declare function getAxisLimit(range?: number): number;
/**
 * @function getPointsAngle
 * @description 根据两个点获取角度值
 * @param {PointPosition} point1
 * @param {PointPosition} point2
 * @return {Number}
 * @example
 *   const angle = getPointsAngle({ x: 0, y: 0 }, { x: 1, y: 1 })
 */
declare function getPointsAngle({ x: x1, y: y1 }: PointPosition, { x: x2, y: y2 }: PointPosition): number;
/**
 * @function getPointsDistance
 * @description 获得两个点距离
 * @param {PointPosition} point1
 * @param {NumberPointPosition} point2
 * @return {Number}
 * @example
 *   const distance = getPointsDistance({ x: 0, y: 0 }, { x: 1, y: 1 })
 */
declare function getPointsDistance({ x: x1, y: y1 }: PointPosition, { x: x2, y: y2 }: PointPosition): number;

/**
 * @module Colors
 * @author Wayne
 * @Date 2022-06-07 11:21:34
 */
/**
 * @function getColorRgbList
 * @description hexadecimal color to 255.#ff0000 -> [255, 0, 0];支持标准（#RRGGBB）和简写（#RGB）格式。
 * @param {String} color hexadecimal number color
 * @return {Number[]} rgb array
 * @example
 * getColorRgbList('#f00') => [255, 0, 0]
 * getColorRgbList('#0000FF') => [0, 0, 255]
 * getColorRgbList('#aaBB99') => [170, 187, 153]
 */
declare function getColorRgbList(color: string): number[];
/**
 * @function getColorRgba
 * @description 十六进制颜色转rgba。hexadecimal color string -> rgba
 * @param {String} str hex color string
 * @param {Number} opacity
 * @return {String}
 * @need getColorRgb
 * @example
 * getColorRgba('#f00') => 'rgba(255,0,0,1)'
 * getColorRgba('#f00', 0.5) => 'rgba(255,0,0,0.5)'
 * getColorRgba('#0000FF') => 'rgba(0,0,255,1)'
 * getColorRgba('#0000FF', 0.1) => 'rgba(0,0,255,0.1)'
 */
declare function getColorRgba(str: string, opacity?: number): string;
/**
 * @function isTransparentColor
 * @description 是否为透明色
 * @param {String} colorStr
 * @return {Boolean}
 * @example
 * isTransparentColor('') => false
 * isTransparentColor('rgba(255,0,0,0)') => true
 * isTransparentColor('rgba(255,0,0,1)') => false
 * isTransparentColor(getColorRgba('#f00').toString()) => false
 */
declare function isTransparentColor(colorStr: string): boolean;
/**
 * @function getLightfulRgbList
 * @description 十六进制颜色变浅（亮色）
 * @param {String} color hexadecimal number color
 * @param {Number} weight lighting weight
 * @return {[Red, Green, Blue]}
 * @example
 * getLightfulRgbList('#f00') => [255, 0, 0]
 * getLightfulRgbList('#f00', 0.5) => [255, 128, 128]
 * getLightfulRgbList('#0000FF') => [0, 0, 255]
 * getLightfulRgbList('#0000FF', 0.5) => [0, 0, 128]
 * getLightfulRgbList('#aaBB99') => [170, 187, 153]
 * getLightfulRgbList('#aaBB99', 0.5) => [170, 187, 153]
 */
declare function getLightfulRgbList(color: string, weight?: number): number[];

/**
 * @module Drawer
 * @description canvas draw functions
 * @notice 注意draw方法要保持第一个传参为ctx（canvas context），以提供给Context处理类进行函数调用
 * @author Wayne
 * @createTime 2019-07-15
 * @lastModified 2019-09-16
 */

/**
 * @function drawLine
 * @description 画直线
 * @param {CanvasRenderingContext2D} ctx canvas context
 * @param {PointPosition} point1
 * @param {PointPosition} point2
 * @example
 *  drawLine(ctx, { x: 10, y: 10 }, { x: 100, y: 100 });
 */
declare function drawLine(ctx: CanvasRenderingContext2D, { x: x1, y: y1 }: PointPosition, { x: x2, y: y2 }: PointPosition): void;
/**
 * @function drawDashLine
 * @description 画虚线，可控制虚线宽度
 * @param {CanvasRenderingContext2D} ctx canvas context
 * @param {PointPosition} point1
 * @param {PointPosition} point2
 * @param {number} dashLen dash line width
 */
declare function drawDashLine(ctx: CanvasRenderingContext2D, { x: x1, y: y1 }: PointPosition, { x: x2, y: y2 }: PointPosition, dashLen?: number): void;
/**
 * @function drawPoint
 * @description 画圆点
 * @param {CanvasRenderingContext2D} ctx canvas context
 * @param {PointPosition} centerPoint
 * @param {String} color fill color
 * @param {String} strokeColor circle side color
 * @param {Number} width radius
 * @param {Number} strokeWidth circle side width
 */
declare function drawPoint(ctx: CanvasRenderingContext2D, centerPoint: PointPosition, color: string, strokeColor: string, width: number, strokeWidth: number): void;
/**
 * @function drawRotateText
 * @description 绘制旋转文字
 * @param {CanvasRenderingContext2D} ctx 画布
 * @param {Number} x 切换中心点的x坐标
 * @param {Number} y 切换中心点的y坐标
 * @param {Number} degree 旋转角度
 * @param {Number|String} text 文字内容
 */
declare function drawRotateText(ctx: CanvasRenderingContext2D, rotatePoint: PointPosition, degree: number, text: string | number): void;
/**
 * @function clearArc
 * @description 实现圆形清除
 * @param {CanvasRenderingContext2D} ctx canvas context
 * @param {PointPosition} point
 * @param {Number} width radius
 */
declare function clearArc(ctx: CanvasRenderingContext2D, point: PointPosition, width: number): void;
/**
 * @function retinaScale
 * @description Canvas元素适配移动端机型，for web
 * @param {HTMLCanvasElement} canvas
 * @param {CanvasRenderingContext2D} ctx canvas context
 * @return {Number} retina pixel ratio
 */
declare function retinaScale(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): number;
/**
 * @function setEnvContext
 * @description 设置布局
 * @param {canvas object} chart chart object
 * @param {boolean} inBrowser is in browser
 * @param {boolean} inWeapp is weapp
 */
declare function setEnvContext(chart: any): void;

/**
 * @module DOM
 * @description dom operate
 * @author Wayne
 * @Date 2022-06-06 10:08:50
 * @LastEditTime 2024-07-19 13:30:02
 */
/**
 * @function getElementSize
 * @description **getElementStyle(el, property)** get DOM style
 * @param {HTMLElement} elem
 * @param {String} property
 * @return {Number}
 * @example
 *  const bodyWidth = getElementStyle(document.querySelector('body'), 'width')
 */
declare function getElementSize(elem: HTMLElement, property: string): number;
/**
 * @function appendCanvasElem
 * @description (web)创建并填充canvas元素
 * @param {HTMLElement} elem
 * @param {Options} options
 * @return {HTMLCanvasElement}
 * @example
 *  const canvas = appendCanvasElem(document.querySelector('body'), {
 *    id: 'demo'
 *  })
 */
declare function appendCanvasElem(elem: HTMLElement, { id, width, height, }: {
    id: string;
    width?: number;
    height?: number;
}): HTMLCanvasElement;

/**
 * @util Vector
 * @description curve functions.
 * @author Wayne
 * @Date 2022-06-06 10:06:08
 * @LastEditTime 2022-06-07 15:27:14
 */

declare class Vector {
    x: number;
    y: number;
    constructor(x: number, y: number);
    length: () => number;
    normalize: () => Vector;
    add: (v: PointPosition) => Vector;
    multiply: (f: number) => Vector;
    dot: (v: Vector) => number;
    angle: (v: Vector) => number;
}
/**
 * @function getCurvePoints
 * @description get points to draw curve line
 * @param {Array} paths origin path points
 * @return {Array}
 */
declare function getCurvePoints(paths: PointPosition[]): Vector[];

/**
 * @module decorators
 * @author Wayne
 * @Date 2022-02-08 14:53:40
 * @LastEditTime 2024-07-19 13:30:05
 */
/**
 * @decorator mixins
 * @param list
 * @returns
 */
declare function mixins(...list: unknown[]): (target: ProxyConstructor) => void;
/**
 * @decorator setAnimationHooks
 * @param chartFactory
 */
declare function setAnimationHooks(chartFactory: Function): void;
/**
 * @decorator setEnvContext
 * @param chart
 * @returns
 */
declare function addEnvContext(chart: any, _: string, descriptor: PropertyDescriptor): PropertyDescriptor;

/**
 * @util animations
 * @author Wayne
 * @createTime 2019-07-15
 * @lastModified 2022-04-17
 * @changeLog
 *  2022-04-17 remove (moz|webkit)RequestAnimationFrame
 */
interface AnimationOptions {
    duration: number;
    onProcess?: (process: number) => void;
    onAnimationFinish?: () => void;
}
/**
 * @function animation
 * @param {AnimationOptions} opts 参数
 *        {Number} duration 动画时间
 *        {Function} onProcess 动画执行回调
 *        {Function} onAnimationFinish 动画完成回调
 */
declare function animate(opts: AnimationOptions): void;

/**
 * @constants
 * @description FundCharts core constants and default values
 * @author Wayne
 * @Date 2022-06-06 21:04:20
 * @LastEditTime 2022-08-05 14:15:23
 */
/**
 * Default canvas dimensions for chart rendering.
 * These values define the initial size of the chart canvas element
 * when no specific dimensions are provided.
 *
 * @name FundCharts.DEFAULT_CANVAS_SIZE
 * @type {Object}
 * @property {number} width - The default width of the chart canvas in pixels
 * @property {number} height - The default height of the chart canvas in pixels
 *
 * @sample {fundcharts} core/constants/canvas-size/
 *         Custom canvas dimensions
 *
 * @default {width: 500, height: 500}
 */
declare const DEFAULT_CANVAS_SIZE: {
    /**
     * The default width of the chart canvas in pixels.
     * This value is used when no width is specified in the chart configuration.
     *
     * @type {number}
     * @default 500
     */
    width: number;
    /**
     * The default height of the chart canvas in pixels.
     * This value is used when no height is specified in the chart configuration.
     *
     * @type {number}
     * @default 500
     */
    height: number;
};
/**
 * Default padding values for the chart grid area.
 * These values define the spacing between the chart content and the canvas edges,
 * providing space for axes, labels, and other chart elements.
 *
 * @name FundCharts.DEFAULT_GRID_CHART_PADDING
 * @type {Object}
 * @property {number} top - Top padding in pixels
 * @property {number} right - Right padding in pixels
 * @property {number} bottom - Bottom padding in pixels
 * @property {number} left - Left padding in pixels
 *
 * @sample {fundcharts} core/constants/grid-padding/
 *         Custom grid padding configuration
 *
 * @default {top: 0, right: 15, bottom: 30, left: 50}
 */
declare const DEFAULT_GRID_CHART_PADDING: {
    /**
     * Top padding for the chart grid area in pixels.
     * This space is reserved above the chart content for titles or other elements.
     *
     * @type {number}
     * @default 0
     */
    top: number;
    /**
     * Right padding for the chart grid area in pixels.
     * This space is reserved on the right side for Y-axis labels and tick marks.
     *
     * @type {number}
     * @default 15
     */
    right: number;
    /**
     * Bottom padding for the chart grid area in pixels.
     * This space is reserved below the chart content for X-axis labels and tick marks.
     *
     * @type {number}
     * @default 30
     */
    bottom: number;
    /**
     * Left padding for the chart grid area in pixels.
     * This space is reserved on the left side for Y-axis labels and tick marks.
     *
     * @type {number}
     * @default 50
     */
    left: number;
};
/**
 * Default animation duration for chart transitions and effects.
 * This value controls the speed of all animated transitions including
 * data updates, hover effects, and initial rendering animations.
 *
 * @name FundCharts.DEFAULT_ANIMATION_TIME
 * @type {number}
 *
 * @sample {fundcharts} core/constants/animation-time/
 *         Custom animation duration
 *
 * @default 600
 */
declare const DEFAULT_ANIMATION_TIME = 600;

export { AnyArray, AnyFunc, AnyObj, DEFAULT_ANIMATION_TIME, DEFAULT_CANVAS_SIZE, DEFAULT_GRID_CHART_PADDING, ListExtremum, NOOP, PointPosition, PointsMap, SimpleObj, __DEV__, addEnvContext, animate, appendCanvasElem, clearArc, cloneArray, cloneObjDeep, drawDashLine, drawLine, drawPoint, drawRotateText, each, getAxisLimit, getColorRgbList, getColorRgba, getCurvePoints, getElementSize, getLightfulRgbList, getListExtremum, getPointsAngle, getPointsDistance, isArray, isEmptyObj, isFunction, isNode, isNumber, isObject, isString, isTransparentColor, isUndefined, isWeapp, isWeb, mixins, retinaScale, setAnimationHooks, setEnvContext, throwError, type };
