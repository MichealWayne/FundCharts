/**
 * @author Wayne
 * @Date 2022-06-06 16:12:47
 * @LastEditTime 2022-07-19 13:50:01
 */

type DrawMethod = (context: CanvasRenderingContext2D, ...args: unknown[]) => void;
type DrawMethodsMap = {
  [methodName: string]: DrawMethod;
};
type ContextDrawMethod = (context: CanvasRenderingContext2D, ...args: unknown[]) => Context;
type ContextDrawMethodsMap = {
  [methodName: string]: ContextDrawMethod;
};

/**
 * @class Context
 * @description FundCharts canvas绘图上下文构造
 * @example
 *   const canvas = document.createElement('canvas');
 *   const ctx = canvas.getContext('2d');
 *   const context = new Context(ctx, { drawPoint, drawLine }); // from fundcharts-core
 *   context.drawLine({ x: 0, y: 0 }, { x: 1, y: 1 }).drawPoint({ x: 1, y: 1 })
 */
export default class Context {
  readonly ctx: CanvasRenderingContext2D;
  public methods: ContextDrawMethodsMap;

  constructor(ctx: CanvasRenderingContext2D, drawMethods: DrawMethodsMap) {
    this.ctx = ctx;
    this.methods = this.addDrawMethods(drawMethods);
  }

  /**
   * @description 添加绘图方法
   * @param drawMethods
   * @returns
   */
  public addDrawMethods(drawMethods: DrawMethodsMap): ContextDrawMethodsMap {
    const methods: ContextDrawMethodsMap = {};
    for (const methodName in drawMethods) {
      methods[methodName] = (...args: unknown[]) => {
        drawMethods[methodName](this.ctx, ...args);
        return this;
      };
    }
    return methods;
  }
}
