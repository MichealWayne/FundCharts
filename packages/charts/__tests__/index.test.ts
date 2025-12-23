/**
 * @author Wayne
 * @Date 2025-08-02
 * @description Tests for charts index
 */

import FundCharts from '../src/index';
import { VERSION, CHART_LIST } from '../src/constants';

// Mock all chart dependencies
jest.mock('../src/charts/line', () => class MockLine {
  init = jest.fn();
  constructor(chart: any) {}
});

jest.mock('../src/charts/bar', () => class MockBar {
  init = jest.fn();
  constructor(chart: any) {}
});

jest.mock('../src/charts/scatter', () => class MockScatter {
  init = jest.fn();
  constructor(chart: any) {}
});

jest.mock('../src/charts/kline', () => class MockKline {
  init = jest.fn();
  constructor(chart: any) {}
});

jest.mock('../src/charts/pie', () => class MockPie {
  init = jest.fn();
  constructor(chart: any) {}
});

jest.mock('../src/charts/radar', () => class MockRadar {
  init = jest.fn();
  constructor(chart: any) {}
});

jest.mock('../src/charts/sankey', () => class MockSankey {
  init = jest.fn();
  constructor(chart: any) {}
});

jest.mock('../src/factorys/InitCore', () => {
  return class MockInitCore {
    initContext = jest.fn();
    drawer: any;
  };
});

describe('FundCharts index', () => {
  describe('FundCharts object', () => {
    it('should be defined', () => {
      expect(FundCharts).toBeDefined();
      expect(typeof FundCharts).toBe('object');
    });

    it('should have version property', () => {
      expect(FundCharts.version).toBe(VERSION);
      expect(typeof FundCharts.version).toBe('string');
    });

    it('should have all chart types available', () => {
      expect(FundCharts).toHaveProperty(CHART_LIST.LINE);
      expect(FundCharts).toHaveProperty(CHART_LIST.BAR);
      expect(FundCharts).toHaveProperty(CHART_LIST.SCATTER);
      expect(FundCharts).toHaveProperty(CHART_LIST.KLINE);
      expect(FundCharts).toHaveProperty(CHART_LIST.PIE);
      expect(FundCharts).toHaveProperty(CHART_LIST.RADAR);
      expect(FundCharts).toHaveProperty(CHART_LIST.SANKEY);
    });

    it('should have chart constructors as functions', () => {
      expect(typeof FundCharts[CHART_LIST.LINE]).toBe('function');
      expect(typeof FundCharts[CHART_LIST.BAR]).toBe('function');
      expect(typeof FundCharts[CHART_LIST.SCATTER]).toBe('function');
      expect(typeof FundCharts[CHART_LIST.KLINE]).toBe('function');
      expect(typeof FundCharts[CHART_LIST.PIE]).toBe('function');
      expect(typeof FundCharts[CHART_LIST.RADAR]).toBe('function');
      expect(typeof FundCharts[CHART_LIST.SANKEY]).toBe('function');
    });
  });

  describe('Chart constructors', () => {
    it('should create chart instances', () => {
      const LineChart = FundCharts[CHART_LIST.LINE];
      const BarChart = FundCharts[CHART_LIST.BAR];

      const lineInstance = new LineChart();
      const barInstance = new BarChart();

      expect(lineInstance).toBeDefined();
      expect(barInstance).toBeDefined();
      expect(typeof lineInstance.init).toBe('function');
      expect(typeof barInstance.init).toBe('function');
    });

    it('should handle init method correctly', () => {
      const LineChart = FundCharts[CHART_LIST.LINE];
      const instance = new LineChart();

      // Test normal initialization
      instance.init();
      expect(instance.initContext).toHaveBeenCalled();
      expect(instance.drawer).toBeDefined();

      // Reset mocks
      jest.clearAllMocks();

      // Test delayed initialization
      instance.init(true);
      expect(instance.initContext).not.toHaveBeenCalled();
      expect(instance.drawer).toBeDefined();
    });

    it('should create different chart types', () => {
      const charts = [
        CHART_LIST.LINE,
        CHART_LIST.BAR,
        CHART_LIST.SCATTER,
        CHART_LIST.KLINE,
        CHART_LIST.PIE,
        CHART_LIST.RADAR,
        CHART_LIST.SANKEY,
      ];

      charts.forEach(chartType => {
        const ChartConstructor = FundCharts[chartType];
        const instance = new ChartConstructor();
        
        expect(instance).toBeDefined();
        expect(typeof instance.init).toBe('function');
      });
    });

    it('should have proper property descriptors', () => {
      const charts = Object.keys(CHART_LIST);
      
      charts.forEach(chartKey => {
        const chartName = CHART_LIST[chartKey as keyof typeof CHART_LIST];
        const descriptor = Object.getOwnPropertyDescriptor(FundCharts, chartName);
        
        expect(descriptor).toBeDefined();
        expect(descriptor!.configurable).toBe(false);
        expect(descriptor!.enumerable).toBe(true);
        expect(typeof descriptor!.get).toBe('function');
      });
    });
  });

  describe('Integration', () => {
    it('should maintain version consistency', () => {
      expect(FundCharts.version).toBe(VERSION);
    });

    it('should be extensible for new chart types', () => {
      const originalKeys = Object.keys(FundCharts);
      expect(originalKeys).toContain('version');
      expect(originalKeys.length).toBeGreaterThan(1);
    });
  });
});