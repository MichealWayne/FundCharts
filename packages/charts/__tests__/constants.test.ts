/**
 * @author Wayne
 * @Date 2025-08-02
 * @description Tests for charts constants
 */

import { VERSION, CHART_LIST } from '../src/constants';

describe('Charts constants', () => {
  describe('VERSION', () => {
    it('should have a valid version string', () => {
      expect(VERSION).toBeDefined();
      expect(typeof VERSION).toBe('string');
      expect(VERSION).toMatch(/^\d+\.\d+\.\d+$/); // Semantic versioning pattern
    });

    it('should be version 1.0.0', () => {
      expect(VERSION).toBe('1.0.0');
    });
  });

  describe('CHART_LIST', () => {
    it('should contain all expected chart types', () => {
      expect(CHART_LIST).toBeDefined();
      expect(typeof CHART_LIST).toBe('object');
      
      expect(CHART_LIST.LINE).toBe('line');
      expect(CHART_LIST.BAR).toBe('bar');
      expect(CHART_LIST.SCATTER).toBe('scatter');
      expect(CHART_LIST.KLINE).toBe('kline');
      expect(CHART_LIST.PIE).toBe('pie');
      expect(CHART_LIST.RADAR).toBe('radar');
      expect(CHART_LIST.SANKEY).toBe('sankey');
    });

    it('should have consistent string values', () => {
      const chartTypes = Object.values(CHART_LIST);
      
      chartTypes.forEach(type => {
        expect(typeof type).toBe('string');
        expect(type.length).toBeGreaterThan(0);
        expect(type).toMatch(/^[a-z]+$/); // Only lowercase letters
      });
    });

    it('should have 7 chart types', () => {
      const chartTypeCount = Object.keys(CHART_LIST).length;
      expect(chartTypeCount).toBe(7);
    });

    it('should have unique values', () => {
      const values = Object.values(CHART_LIST);
      const uniqueValues = [...new Set(values)];
      expect(values.length).toBe(uniqueValues.length);
    });

    it('should have uppercase keys', () => {
      const keys = Object.keys(CHART_LIST);
      keys.forEach(key => {
        expect(key).toMatch(/^[A-Z]+$/); // Only uppercase letters
        expect(key).toBe(key.toUpperCase());
      });
    });
  });
});