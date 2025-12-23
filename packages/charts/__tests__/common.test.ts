/**
 * @author Wayne
 * @Date 2025-08-02
 * @description Tests for common factory functions
 */

import { setEvents } from '../src/factorys/common';

// Mock dependencies
jest.mock('fundcharts-core', () => ({
  __DEV__: false,
  isWeb: true,
  AnyObj: {},
}));

describe('Common factory functions', () => {
  describe('setEvents', () => {
    let mockCanvas: HTMLCanvasElement;
    let mockChart: any;
    let mockThis: any;

    beforeEach(() => {
      // Mock canvas element
      mockCanvas = {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      } as unknown as HTMLCanvasElement;

      // Mock chart object
      mockChart = {
        canvas: mockCanvas,
        opts: {
          events: ['click', 'mousemove'],
          eventsCallbacks: {},
        },
      };

      // Mock this context
      mockThis = {
        chartjs: mockChart,
        drawHover: jest.fn(),
      };
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should be defined', () => {
      expect(setEvents).toBeDefined();
      expect(typeof setEvents).toBe('function');
    });

    it('should add event listeners when events are configured', () => {
      setEvents.call(mockThis);

      expect(mockCanvas.addEventListener).toHaveBeenCalledTimes(2);
      expect(mockCanvas.addEventListener).toHaveBeenCalledWith('click', expect.any(Function), false);
      expect(mockCanvas.addEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function), false);
    });

    it('should return false when no events configured', () => {
      mockThis.chartjs.opts.events = null;
      const result = setEvents.call(mockThis);

      expect(result).toBe(false);
      expect(mockCanvas.addEventListener).not.toHaveBeenCalled();
    });

    it('should handle empty events array', () => {
      mockThis.chartjs.opts.events = [];
      setEvents.call(mockThis);

      expect(mockCanvas.addEventListener).not.toHaveBeenCalled();
    });

    it('should store event callbacks', () => {
      setEvents.call(mockThis);

      expect(mockThis.chartjs.opts.eventsCallbacks).toBeDefined();
      expect(Object.keys(mockThis.chartjs.opts.eventsCallbacks)).toEqual(['click', 'mousemove']);
    });
  });
});