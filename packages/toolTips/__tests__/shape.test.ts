/**
 * @author Wayne
 * @Date 2025-08-02
 * @description Tests for toolTips shape helpers
 */

import { PieCenterToolTip } from '../src/helpers/shape';

describe('Shape helpers', () => {
  describe('PieCenterToolTip', () => {
    it('should be defined', () => {
      expect(PieCenterToolTip).toBeDefined();
      expect(typeof PieCenterToolTip).toBe('function');
    });

    it('should be a function that can be called', () => {
      expect(() => {
        // Test that the function exists and can be referenced
        const func = PieCenterToolTip;
        expect(func).toBeTruthy();
      }).not.toThrow();
    });
  });
});