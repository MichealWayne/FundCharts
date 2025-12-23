/**
 * @author Wayne
 * @Date 2025-08-02
 * @description Tests for LineChart class
 */

import LineChart from '../src/LineChart';

// Mock the dependencies
jest.mock('../src/factorys/InitCore', () => {
  return class MockInitCore {
    initContext = jest.fn();
    drawer: any;
  };
});

jest.mock('../src/charts/line', () => {
  return class MockLine {
    init = jest.fn();
    constructor(chart: any) {
      // Mock constructor
    }
  };
});

describe('LineChart', () => {
  let lineChart: LineChart;

  beforeEach(() => {
    lineChart = new LineChart();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create LineChart instance', () => {
      expect(lineChart).toBeInstanceOf(LineChart);
    });
  });

  describe('init method', () => {
    it('should initialize with default behavior (not lazy)', () => {
      const initContextSpy = jest.spyOn(lineChart, 'initContext');
      
      lineChart.init();

      expect(initContextSpy).toHaveBeenCalled();
      expect(lineChart.drawer).toBeDefined();
      expect(lineChart.drawer.init).toHaveBeenCalled();
    });

    it('should initialize with lazy draw disabled', () => {
      const initContextSpy = jest.spyOn(lineChart, 'initContext');
      
      lineChart.init(false);

      expect(initContextSpy).toHaveBeenCalled();
      expect(lineChart.drawer).toBeDefined();
      expect(lineChart.drawer.init).toHaveBeenCalled();
    });

    it('should handle lazy draw enabled', () => {
      const initContextSpy = jest.spyOn(lineChart, 'initContext');
      
      lineChart.init(true);

      expect(initContextSpy).not.toHaveBeenCalled();
      expect(lineChart.drawer).toBeDefined();
      expect(lineChart.drawer.init).not.toHaveBeenCalled();
    });

    it('should set drawer property correctly', () => {
      lineChart.init();
      
      expect(lineChart.drawer).toBeDefined();
      expect(lineChart.drawer.constructor.name).toBe('MockLine');
    });

    it('should call drawer init only when not lazy', () => {
      // Test lazy draw = true
      lineChart.init(true);
      expect(lineChart.drawer.init).not.toHaveBeenCalled();

      // Reset and test lazy draw = false
      jest.clearAllMocks();
      lineChart.init(false);
      expect(lineChart.drawer.init).toHaveBeenCalled();
    });
  });
});