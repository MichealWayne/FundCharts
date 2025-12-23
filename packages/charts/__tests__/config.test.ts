/**
 * @author Wayne
 * @Date 2025-08-02
 * @description Tests for charts config
 */

// Mock dependencies
jest.mock('fundcharts-core', () => ({
  isWeapp: false,
  DEFAULT_GRID_CHART_PADDING: 20,
}));

import Config from '../src/config';

describe('Charts config', () => {
  describe('Config object', () => {
    it('should be defined', () => {
      expect(Config).toBeDefined();
      expect(typeof Config).toBe('object');
    });

    it('should have required basic properties', () => {
      expect(Config).toHaveProperty('id');
      expect(Config).toHaveProperty('backgroundColor');
    });

    it('should have default id as empty string', () => {
      expect(Config.id).toBe('');
      expect(typeof Config.id).toBe('string');
    });

    it('should have default backgroundColor as transparent', () => {
      expect(Config.backgroundColor).toBe('rgba(0,0,0,0)');
      expect(typeof Config.backgroundColor).toBe('string');
    });

    it('should be a valid configuration object', () => {
      // Test that config is a plain object
      expect(Config.constructor).toBe(Object);
      expect(Array.isArray(Config)).toBe(false);
    });

    it('should have string type properties for basic config', () => {
      expect(typeof Config.id).toBe('string');
      expect(typeof Config.backgroundColor).toBe('string');
    });

    it('should maintain config structure', () => {
      const configKeys = Object.keys(Config);
      expect(configKeys.length).toBeGreaterThan(0);
      expect(configKeys).toContain('id');
      expect(configKeys).toContain('backgroundColor');
    });

    it('should have consistent property types', () => {
      // Test that known properties have expected types
      if (Config.hasOwnProperty('colors')) {
        expect(Array.isArray(Config.colors)).toBe(true);
      }
      
      if (Config.hasOwnProperty('width')) {
        expect(typeof Config.width === 'number' || typeof Config.width === 'string').toBe(true);
      }
      
      if (Config.hasOwnProperty('height')) {
        expect(typeof Config.height === 'number' || typeof Config.height === 'string').toBe(true);
      }
    });
  });
});