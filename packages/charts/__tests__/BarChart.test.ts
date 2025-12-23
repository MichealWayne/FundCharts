/**
 * @author Wayne
 * @Date 2025-08-02
 * @description Tests for BarChart class
 */

import BarChart from '../src/BarChart';

// Mock the dependencies
jest.mock('../src/factorys/InitCore', () => {
  return class MockInitCore {
    initContext = jest.fn();
    drawer: any;
  };
});

jest.mock('../src/charts/bar', () => {
  return class MockBar {
    init = jest.fn();
    constructor(chart: any) {
      // Mock constructor
    }
  };
});

describe('BarChart', () => {
  let barChart: BarChart;

  beforeEach(() => {
    barChart = new BarChart();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create BarChart instance', () => {
      expect(barChart).toBeInstanceOf(BarChart);
    });
  });

  describe('init method', () => {
    it('should initialize correctly', () => {
      const initContextSpy = jest.spyOn(barChart, 'initContext');
      
      barChart.init();

      expect(initContextSpy).toHaveBeenCalled();
      expect(barChart.drawer).toBeDefined();
      expect(barChart.drawer.init).toHaveBeenCalled();
    });

    it('should set drawer property correctly', () => {
      barChart.init();
      
      expect(barChart.drawer).toBeDefined();
      expect(barChart.drawer.constructor.name).toBe('MockBar');
    });

    it('should call all required initialization steps', () => {
      const initContextSpy = jest.spyOn(barChart, 'initContext');
      
      barChart.init();

      expect(initContextSpy).toHaveBeenCalledTimes(1);
      expect(barChart.drawer.init).toHaveBeenCalledTimes(1);
    });
  });
});