/**
 * @file utils.test.ts
 * @description Unit tests for utility functions
 */

import {
  NOOP,
  half,
  isUndefined,
  isFunction,
  isString,
  handleShowValTipsStr,
  handleLimitedVal,
  drawTriangle,
  drawPoint,
} from '../src/utils';

describe('Utils', () => {
  describe('NOOP', () => {
    it('should return empty string', () => {
      expect(NOOP()).toBe('');
    });
  });

  describe('half', () => {
    it('should return half of even numbers', () => {
      expect(half(10)).toBe(5);
      expect(half(20)).toBe(10);
      expect(half(0)).toBe(0);
    });

    it('should return half of odd numbers using bitwise operation', () => {
      expect(half(7)).toBe(3);
      expect(half(15)).toBe(7);
      expect(half(1)).toBe(0);
    });

    it('should handle negative numbers', () => {
      expect(half(-10)).toBe(-5);
      expect(half(-7)).toBe(-3);
    });
  });

  describe('isUndefined', () => {
    it('should return true for undefined', () => {
      expect(isUndefined(undefined)).toBe(true);
      expect(isUndefined()).toBe(true);
    });

    it('should return false for other values', () => {
      expect(isUndefined(null)).toBe(false);
      expect(isUndefined(0)).toBe(false);
      expect(isUndefined('')).toBe(false);
      expect(isUndefined(false)).toBe(false);
      expect(isUndefined([])).toBe(false);
      expect(isUndefined({})).toBe(false);
    });
  });

  describe('isFunction', () => {
    it('should return true for functions', () => {
      expect(
        isFunction(() => {
          return;
        })
      ).toBe(true);
      expect(
        isFunction(function () {
          return;
        })
      ).toBe(true);
      expect(
        isFunction(async () => {
          return;
        })
      ).toBe(true);
    });

    it('should return false for non-functions', () => {
      expect(isFunction('function')).toBe(false);
      expect(isFunction(123)).toBe(false);
      expect(isFunction(null)).toBe(false);
      expect(isFunction(undefined)).toBe(false);
      expect(isFunction([])).toBe(false);
      expect(isFunction({})).toBe(false);
    });
  });

  describe('isString', () => {
    it('should return true for strings', () => {
      expect(isString('hello')).toBe(true);
      expect(isString('')).toBe(true);
      expect(isString(String('test'))).toBe(true);
    });

    it('should return false for non-strings', () => {
      expect(isString(123)).toBe(false);
      expect(isString(null)).toBe(false);
      expect(isString(undefined)).toBe(false);
      expect(isString([])).toBe(false);
      expect(isString({})).toBe(false);
      expect(
        isString(() => {
          return;
        })
      ).toBe(false);
    });
  });

  describe('handleShowValTipsStr', () => {
    it('should call function when showValTipFunc is a function', () => {
      const mockFn = jest.fn((val: string) => `Value: ${val}`);
      const result = handleShowValTipsStr(mockFn, '100', 'N/A');

      expect(mockFn).toHaveBeenCalledWith('100');
      expect(result).toBe('Value: 100');
    });

    it('should return string when showValTipFunc is a string', () => {
      const result = handleShowValTipsStr('Fixed Text', '100', 'N/A');
      expect(result).toBe('Fixed Text');
    });

    it('should return default value when showValTipFunc is null/undefined', () => {
      expect(handleShowValTipsStr(null, '100', 'N/A')).toBe('N/A');
      expect(handleShowValTipsStr(undefined, '100', 'N/A')).toBe('N/A');
    });

    it('should return dealValue when no default value provided', () => {
      expect(handleShowValTipsStr(null, '100')).toBe('100');
    });
  });

  describe('handleLimitedVal', () => {
    it('should return value when within bounds', () => {
      expect(handleLimitedVal(5, 0, 10)).toBe(5);
      expect(handleLimitedVal(0, 0, 10)).toBe(0);
      expect(handleLimitedVal(10, 0, 10)).toBe(10);
    });

    it('should return min when value is below minimum', () => {
      expect(handleLimitedVal(-1, 0, 10)).toBe(0);
      expect(handleLimitedVal(5, 10, 20)).toBe(10);
    });

    it('should return max when value is above maximum', () => {
      expect(handleLimitedVal(15, 0, 10)).toBe(10);
      expect(handleLimitedVal(25, 0, 20)).toBe(20);
    });
  });

  describe('drawTriangle', () => {
    let mockCtx: jest.Mocked<CanvasRenderingContext2D>;

    beforeEach(() => {
      mockCtx = {
        beginPath: jest.fn(),
        moveTo: jest.fn(),
        lineTo: jest.fn(),
        closePath: jest.fn(),
        fill: jest.fn(),
      } as any;
    });

    it('should draw triangle with three points', () => {
      const points = [
        { x: 0, y: 0 },
        { x: 10, y: 0 },
        { x: 5, y: 10 },
      ];

      const result = drawTriangle(mockCtx, points);

      expect(result).toBe(true);
      expect(mockCtx.beginPath).toHaveBeenCalled();
      expect(mockCtx.moveTo).toHaveBeenCalledWith(0, 0);
      expect(mockCtx.lineTo).toHaveBeenCalledWith(10, 0);
      expect(mockCtx.lineTo).toHaveBeenCalledWith(5, 10);
      expect(mockCtx.closePath).toHaveBeenCalled();
      expect(mockCtx.fill).toHaveBeenCalled();
    });

    it('should return false for invalid points', () => {
      expect(drawTriangle(mockCtx, [])).toBe(false);
      expect(drawTriangle(mockCtx, [{ x: 0, y: 0 }])).toBe(false);
      expect(
        drawTriangle(mockCtx, [
          { x: 0, y: 0 },
          { x: 10, y: 0 },
        ])
      ).toBe(false);
      expect(drawTriangle(mockCtx, null as any)).toBe(false);
    });
  });

  describe('drawPoint', () => {
    let mockCtx: jest.Mocked<CanvasRenderingContext2D>;

    beforeEach(() => {
      mockCtx = {
        beginPath: jest.fn(),
        arc: jest.fn(),
        closePath: jest.fn(),
        fill: jest.fn(),
        stroke: jest.fn(),
        fillStyle: '',
        strokeStyle: '',
        lineWidth: 0,
      } as any;
    });

    it('should draw point with stroke', () => {
      const params = {
        ctx: mockCtx,
        x: 100,
        y: 100,
        color: '#ff0000',
        strokeColor: '#000000',
        width: 5,
        strokeWidth: 1,
      };

      drawPoint(params);

      expect(mockCtx.beginPath).toHaveBeenCalled();
      expect(mockCtx.arc).toHaveBeenCalledWith(
        100,
        100,
        5,
        0,
        Math.PI * 2,
        true
      );
      expect(mockCtx.closePath).toHaveBeenCalled();
      expect(mockCtx.fill).toHaveBeenCalled();
      expect(mockCtx.stroke).toHaveBeenCalled();
      expect(mockCtx.fillStyle).toBe('#ff0000');
      expect(mockCtx.strokeStyle).toBe('#000000');
      expect(mockCtx.lineWidth).toBe(1);
    });

    it('should draw point without stroke when strokeWidth is 0', () => {
      const params = {
        ctx: mockCtx,
        x: 100,
        y: 100,
        color: '#ff0000',
        strokeColor: '#000000',
        width: 5,
        strokeWidth: 0,
      };

      drawPoint(params);

      expect(mockCtx.stroke).not.toHaveBeenCalled();
    });

    it('should use default strokeColor when not provided', () => {
      const params = {
        ctx: mockCtx,
        x: 100,
        y: 100,
        color: '#ff0000',
        strokeColor: '',
        width: 5,
        strokeWidth: 1,
      };

      drawPoint(params);

      expect(mockCtx.strokeStyle).toBe('#fff');
    });
  });
});
