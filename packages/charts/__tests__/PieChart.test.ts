/**
 * @author Wayne
 * @Date 2025-08-02
 * @description Tests for PieChart class
 */

import PieChart from '../src/PieChart';

// Mock the dependencies
jest.mock('../src/factorys/InitCore', () => {
  return class MockInitCore {
    initContext = jest.fn();
    drawer: any;
  };
});

jest.mock('../src/charts/pie', () => {
  return class MockPie {
    init = jest.fn();
    constructor(chart: any) {
      // Mock constructor
    }
  };
});

describe('PieChart', () => {
  let pieChart: PieChart;

  beforeEach(() => {
    pieChart = new PieChart();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create PieChart instance', () => {
      expect(pieChart).toBeInstanceOf(PieChart);
    });
  });

  describe('init method', () => {
    it('should initialize correctly', () => {
      const initContextSpy = jest.spyOn(pieChart, 'initContext');
      
      pieChart.init();

      expect(initContextSpy).toHaveBeenCalled();
      expect(pieChart.drawer).toBeDefined();
      expect(pieChart.drawer.init).toHaveBeenCalled();
    });

    it('should set drawer property correctly', () => {
      pieChart.init();
      
      expect(pieChart.drawer).toBeDefined();
      expect(pieChart.drawer.constructor.name).toBe('MockPie');
    });

    it('should call all required initialization steps', () => {
      const initContextSpy = jest.spyOn(pieChart, 'initContext');
      
      pieChart.init();

      expect(initContextSpy).toHaveBeenCalledTimes(1);
      expect(pieChart.drawer.init).toHaveBeenCalledTimes(1);
    });
  });
});