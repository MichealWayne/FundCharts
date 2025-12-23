/**
 * @author Wayne
 * @Date 2022-06-06 09:26:24
 * @LastEditTime 2025-06-17 20:41:47
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @module utils
 * @description basic functions
 * @author Wayne
 * @createTime 2019-07-15
 * @lastModified 2019-12-05
 * @updateInfo
 *  2019.12.05: add min & max
 */

import { SimpleObj } from '../types';

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
export function type(val?: unknown): string {
  return Object.prototype.toString.call(val).replace(/\[object\s|\]/g, '');
}

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
export function isArray(val?: unknown): val is Array<any> {
  return type(val) === 'Array';
}

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
export function isUndefined(val?: unknown): val is undefined {
  return val === undefined;
}

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
export function isString(val?: unknown): val is string {
  return typeof val === 'string';
}

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
export function isObject(val?: unknown): val is Record<any, any> {
  return type(val) === 'Object';
}

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
// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(val?: unknown): val is Function {
  return typeof val === 'function';
}

/**
 * @function isNumber
 * @description **isNumber(val)** 判断是否是数字
 * @param {any} value
 * @returns {Boolean}
 */
export function isNumber(val: unknown): val is number {
  return typeof val === 'number' && !isNaN(val);
}

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
export function isEmptyObj(obj?: SimpleObj): boolean {
  if (!obj) {
    return false;
  }
  for (const _ in obj) {
    return false;
  }
  return true;
}

/**
 * @function NOOP
 * @description empty function
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const NOOP = () => '';

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
export function each<T>(arr: T[], fn: (...args: any[]) => void): T[] {
  for (let i = 0, len = arr.length; i < len; i++) {
    fn(arr[i], i);
  }
  return arr;
}

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
export function cloneObjDeep(fromObj: SimpleObj, toObj: SimpleObj): Record<any, any> {
  if (!isObject(fromObj) || !isObject(toObj)) {
    return {};
  }

  for (const i in fromObj) {
    if (isObject(toObj[i]) && !isEmptyObj(toObj[i] as SimpleObj)) {
      // obj
      cloneObjDeep(fromObj[i] as SimpleObj, toObj[i] as SimpleObj);
      continue;
    }

    toObj[i] = toObj[i] || fromObj[i];
  }

  return toObj;
}

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
export const cloneArray = <T>(fromArr: T[], toArr: T[]): T[] => {
  each(fromArr, (item, index: number) => {
    toArr[index] = item;
  });

  return toArr;
};

/**
 * @function throwError
 * @description throw Error Object
 * @param {string} info 错误信息
 * @param {string} part 错误单元
 * @param {string} detail 错误单元细节
 */
export async function throwError(info: unknown, part = '', detail = '') {
  throw new Error(`Error!${info}.(FundCharts-${part} ${detail})`);
}
