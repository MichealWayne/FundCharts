/**
 * @author Wayne
 * @Date 2022-04-07 13:13:02
 * @LastEditTime 2022-07-20 11:20:22
 */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { isEmptyObj } from '../src/';
import { getListExtremum } from '../src/';
import { NOOP } from '../src/';

describe('units test', () => {
  describe('noop test', () => {
    it('NOOP()', async () => {
      expect(NOOP()).toEqual('');
    });
  });

  describe('object test', () => {
    it('isEmptyObj()', async () => {
      expect(isEmptyObj({})).toEqual(true);
      expect(isEmptyObj({ a: 1 })).toEqual(false);
      expect(isEmptyObj(null)).toEqual(false);
      expect(isEmptyObj()).toEqual(false);
    });
  });

  describe('array test', () => {
    it('getExtremum()', async () => {
      expect(getListExtremum([1, 2, 3]).min).toEqual(1);
      expect(getListExtremum([1, 2, 3]).max).toEqual(3);
      expect(getListExtremum([-5, -1, -9]).min).toEqual(-9);
      expect(getListExtremum([-5, -1, -9]).max).toEqual(-1);
      expect(getListExtremum([-1e3, 0, 1e5]).min).toEqual(-1000);
      expect(getListExtremum([-1e3, 0, 1e5]).max).toEqual(100000);
      expect(getListExtremum([-3, 0, 5]).min).toEqual(-3);
      expect(getListExtremum([-3, 0, 5]).max).toEqual(5);
      const zeroResult = getListExtremum([-0, 0, +0]);
      expect(zeroResult.min).toEqual(-0);
      expect(Math.abs(zeroResult.max)).toEqual(0);
    });
  });
});
