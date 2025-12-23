/**
 * @author Wayne
 * @Date 2025-08-02
 * @description Tests for colors utility functions
 */

import { getColorRgbList, getColorRgba } from '../src/utils/colors';

describe('Colors utilities', () => {
  describe('getColorRgbList', () => {
    it('should convert short hex color to RGB array', () => {
      expect(getColorRgbList('#f00')).toEqual([255, 0, 0]);
      expect(getColorRgbList('#0f0')).toEqual([0, 255, 0]);
      expect(getColorRgbList('#00f')).toEqual([0, 0, 255]);
      expect(getColorRgbList('#abc')).toEqual([170, 187, 204]);
    });

    it('should convert full hex color to RGB array', () => {
      expect(getColorRgbList('#ff0000')).toEqual([255, 0, 0]);
      expect(getColorRgbList('#00ff00')).toEqual([0, 255, 0]);
      expect(getColorRgbList('#0000ff')).toEqual([0, 0, 255]);
      expect(getColorRgbList('#aabbcc')).toEqual([170, 187, 204]);
    });

    it('should handle uppercase hex colors', () => {
      expect(getColorRgbList('#FF0000')).toEqual([255, 0, 0]);
      expect(getColorRgbList('#AABBCC')).toEqual([170, 187, 204]);
      expect(getColorRgbList('#ABC')).toEqual([170, 187, 204]);
    });

    it('should handle mixed case hex colors', () => {
      expect(getColorRgbList('#aaBB99')).toEqual([170, 187, 153]);
      expect(getColorRgbList('#A1b2C3')).toEqual([161, 178, 195]);
    });

    it('should return empty array for invalid color format', () => {
      expect(getColorRgbList('ff0000')).toEqual([]); // Missing #
      expect(getColorRgbList('#gggggg')).toEqual([]); // Invalid characters
      expect(getColorRgbList('#ff00')).toEqual([]); // Invalid length
      expect(getColorRgbList('#ff000')).toEqual([]); // Invalid length
      expect(getColorRgbList('#ff00000')).toEqual([]); // Too long
      expect(getColorRgbList('')).toEqual([]); // Empty string
      expect(getColorRgbList('#')).toEqual([]); // Just hash
    });

    it('should handle edge cases', () => {
      expect(getColorRgbList('#000')).toEqual([0, 0, 0]);
      expect(getColorRgbList('#fff')).toEqual([255, 255, 255]);
      expect(getColorRgbList('#000000')).toEqual([0, 0, 0]);
      expect(getColorRgbList('#ffffff')).toEqual([255, 255, 255]);
    });
  });

  describe('getColorRgba', () => {
    it('should convert hex color to rgba with default opacity', () => {
      expect(getColorRgba('#f00')).toBe('rgba(255,0,0,1)');
      expect(getColorRgba('#00ff00')).toBe('rgba(0,255,0,1)');
      expect(getColorRgba('#0000ff')).toBe('rgba(0,0,255,1)');
    });

    it('should convert hex color to rgba with custom opacity', () => {
      expect(getColorRgba('#f00', 0.5)).toBe('rgba(255,0,0,0.5)');
      expect(getColorRgba('#0000FF', 0.1)).toBe('rgba(0,0,255,0.1)');
      expect(getColorRgba('#abc', 0.8)).toBe('rgba(170,187,204,0.8)');
    });

    it('should handle opacity edge cases', () => {
      expect(getColorRgba('#fff', 0)).toBe('rgba(255,255,255,0)');
      expect(getColorRgba('#000', 1)).toBe('rgba(0,0,0,1)');
    });

    it('should handle invalid colors gracefully', () => {
      expect(getColorRgba('invalid')).toBe('rgba(0,0,0,0)');
      expect(getColorRgba('#gggggg')).toBe('rgba(0,0,0,0)');
      expect(getColorRgba('')).toBe('rgba(0,0,0,0)');
    });

    it('should handle uppercase hex colors', () => {
      expect(getColorRgba('#FF0000')).toBe('rgba(255,0,0,1)');
      expect(getColorRgba('#AABBCC', 0.7)).toBe('rgba(170,187,204,0.7)');
    });

    it('should handle mixed case and different formats', () => {
      expect(getColorRgba('#aaBB99')).toBe('rgba(170,187,153,1)');
      expect(getColorRgba('#A1b2C3', 0.3)).toBe('rgba(161,178,195,0.3)');
    });
  });
});