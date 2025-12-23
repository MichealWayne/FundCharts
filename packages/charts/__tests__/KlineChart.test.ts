/**
 * @author Wayne
 * @Date 2025-08-02
 * @description Tests for KlineChart class
 */

import KlineChart from '../src/KlineChart';

// Mock the dependencies
jest.mock('../src/factorys/InitCore', () => {
  return class MockInitCore {
    initContext = jest.fn();
    drawer: any;
  };
});

jest.mock('../src/charts/kline', () => {
  return class MockKline {
    init = jest.fn();
    constructor(chart: any) {
      // Mock constructor
    }
  };
});

describe('KlineChart', () => {
  let klineChart: KlineChart;

  beforeEach(() => {
    klineChart = new KlineChart();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create KlineChart instance', () => {
      expect(klineChart).toBeInstanceOf(KlineChart);
    });
  });

  describe('init method', () => {
    it('should initialize correctly', () => {
      const initContextSpy = jest.spyOn(klineChart, 'initContext');
      
      klineChart.init();

      expect(initContextSpy).toHaveBeenCalled();
      expect(klineChart.drawer).toBeDefined();
      expect(klineChart.drawer.init).toHaveBeenCalled();
    });

    it('should set drawer property correctly', () => {
      klineChart.init();
      
      expect(klineChart.drawer).toBeDefined();
      expect(klineChart.drawer.constructor.name).toBe('MockKline');
    });

    it('should call all required initialization steps', () => {
      const initContextSpy = jest.spyOn(klineChart, 'initContext');
      
      klineChart.init();

      expect(initContextSpy).toHaveBeenCalledTimes(1);
      expect(klineChart.drawer.init).toHaveBeenCalledTimes(1);
    });
  });
});