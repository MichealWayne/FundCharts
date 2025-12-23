/**
 * @author Wayne
 * @Date 2025-08-02
 * @description Tests for calculate utility functions
 */

import { getListExtremum, getAxisLimit } from '../src/utils/calculate';

describe('Calculate utilities', () => {
  describe('getListExtremum', () => {
    it('should return correct min and max for normal array', () => {
      const result = getListExtremum([1, 3, 5, 2, 2, 4, 5, 7]);
      expect(result).toEqual({ min: 1, max: 7 });
    });

    it('should handle single element array', () => {
      const result = getListExtremum([5]);
      expect(result).toEqual({ min: 5, max: 5 });
    });

    it('should handle negative numbers', () => {
      const result = getListExtremum([-5, -1, -10, -3]);
      expect(result).toEqual({ min: -10, max: -1 });
    });

    it('should handle mixed positive and negative numbers', () => {
      const result = getListExtremum([-5, 10, 0, -2, 8]);
      expect(result).toEqual({ min: -5, max: 10 });
    });

    it('should return {min: 0, max: 0} for empty array', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      const result = getListExtremum([]);
      expect(result).toEqual({ min: 0, max: 0 });
      expect(consoleSpy).toHaveBeenCalledWith('chart data is empty');
      consoleSpy.mockRestore();
    });

    it('should handle decimal numbers', () => {
      const result = getListExtremum([1.5, 2.7, 0.3, 4.1]);
      expect(result).toEqual({ min: 0.3, max: 4.1 });
    });
  });

  describe('getAxisLimit', () => {
    it('should return 1 for undefined range', () => {
      const result = getAxisLimit();
      expect(result).toBe(1);
    });

    it('should return 1 for range 0', () => {
      const result = getAxisLimit(0);
      expect(result).toBe(1);
    });

    it('should return 1.2 for range 1', () => {
      const result = getAxisLimit(1);
      expect(result).toBe(1.2);
    });

    it('should return 2.4 for range 2', () => {
      const result = getAxisLimit(2);
      expect(result).toBe(2.4);
    });

    it('should return ceil(range/4)*4 for range > 2', () => {
      expect(getAxisLimit(3)).toBe(4);
      expect(getAxisLimit(5)).toBe(8);
      expect(getAxisLimit(10)).toBe(12);
      expect(getAxisLimit(15)).toBe(16);
    });

    it('should handle large ranges', () => {
      expect(getAxisLimit(100)).toBe(100);
      expect(getAxisLimit(101)).toBe(104);
      expect(getAxisLimit(200)).toBe(200);
    });
  });
});