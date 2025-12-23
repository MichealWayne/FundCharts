/**
 * @author Wayne
 * @Date 2025-08-02
 * @description Tests for animate utility functions
 */

import { animate } from '../src/utils/animate';

describe('Animate utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('animate', () => {
    it('should call animate function without errors', () => {
      const onProcess = jest.fn();
      const onAnimationFinish = jest.fn();

      expect(() => {
        animate({
          duration: 1000,
          onProcess,
          onAnimationFinish,
        });
      }).not.toThrow();
    });

    it('should handle animation with default options', () => {
      expect(() => {
        animate({
          duration: 100,
        });
      }).not.toThrow();
    });

    it('should handle missing onProcess callback gracefully', () => {
      expect(() => {
        animate({
          duration: 100,
        });
      }).not.toThrow();
    });

    it('should handle missing onAnimationFinish callback gracefully', () => {
      expect(() => {
        animate({
          duration: 100,
          onProcess: jest.fn(),
        });
      }).not.toThrow();
    });

    it('should work with custom duration', () => {
      const onProcess = jest.fn();
      const duration = 500;

      expect(() => {
        animate({
          duration,
          onProcess,
        });
      }).not.toThrow();
    });

    it('should handle animation with very short duration', () => {
      const onProcess = jest.fn();
      const onAnimationFinish = jest.fn();

      expect(() => {
        animate({
          duration: 1, // Very short
          onProcess,
          onAnimationFinish,
        });
      }).not.toThrow();
    });

    it('should handle zero duration', () => {
      const onProcess = jest.fn();
      const onAnimationFinish = jest.fn();

      expect(() => {
        animate({
          duration: 0,
          onProcess,
          onAnimationFinish,
        });
      }).not.toThrow();
    });

    it('should accept all required options', () => {
      const options = {
        duration: 1000,
        onProcess: jest.fn(),
        onAnimationFinish: jest.fn(),
      };

      expect(() => {
        animate(options);
      }).not.toThrow();
    });
  });
});