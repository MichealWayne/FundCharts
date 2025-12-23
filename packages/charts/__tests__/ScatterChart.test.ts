/**
 * @author Wayne
 * @Date 2025-08-02
 * @description Tests for ScatterChart class
 */

import ScatterChart from '../src/ScatterChart';

// Mock the dependencies
jest.mock('../src/factorys/InitCore', () => {
  return class MockInitCore {
    initContext = jest.fn();
    drawer: any;
  };
});

jest.mock('../src/charts/scatter', () => {
  return class MockScatter {
    init = jest.fn();
    constructor(chart: any) {
      // Mock constructor
    }
  };
});

describe('ScatterChart', () => {
  let scatterChart: ScatterChart;

  beforeEach(() => {
    scatterChart = new ScatterChart();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create ScatterChart instance', () => {
      expect(scatterChart).toBeInstanceOf(ScatterChart);
    });
  });

  describe('init method', () => {
    it('should initialize correctly', () => {
      const initContextSpy = jest.spyOn(scatterChart, 'initContext');
      
      scatterChart.init();

      expect(initContextSpy).toHaveBeenCalled();
      expect(scatterChart.drawer).toBeDefined();
      expect(scatterChart.drawer.init).toHaveBeenCalled();
    });

    it('should set drawer property correctly', () => {
      scatterChart.init();
      
      expect(scatterChart.drawer).toBeDefined();
      expect(scatterChart.drawer.constructor.name).toBe('MockScatter');
    });

    it('should call all required initialization steps', () => {
      const initContextSpy = jest.spyOn(scatterChart, 'initContext');
      
      scatterChart.init();

      expect(initContextSpy).toHaveBeenCalledTimes(1);
      expect(scatterChart.drawer.init).toHaveBeenCalledTimes(1);
    });
  });
});