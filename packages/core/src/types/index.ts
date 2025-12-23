/**
 * @author Wayne
 * @Date 2022-06-06 09:40:04
 * @LastEditTime 2022-07-19 14:06:53
 */

/** 坐标位置 */
export interface PointPosition {
  x: number;
  y: number;
}

/** 坐标集 */
export type PointsMap = PointPosition[];

/** 列表极值 */
export type ListExtremum = {
  max: number;
  min: number;
};

/** 普通对象 */
export type SimpleObj = {
  [propName: string]: unknown;
};
/** 任意对象 */
export type AnyObj = {
  [key: string]: any;
};
/** 任意数组 */
export type AnyArray = any[];
/** 任意方法 */
export type AnyFunc = (...args: any[]) => unknown;
