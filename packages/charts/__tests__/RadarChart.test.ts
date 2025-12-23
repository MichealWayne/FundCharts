/**
 * @author Wayne
 * @Date 2025-08-02
 * @description Tests for RadarChart class
 */

import RadarChart from '../src/RadarChart';

// Mock the dependencies
jest.mock('../src/factorys/InitCore', () => {
  return class MockInitCore {
    initContext = jest.fn();
    drawer: any;
  };
});

jest.mock('../src/charts/radar', () => {
  return class MockRadar {
    init = jest.fn();
    constructor(chart: any) {
      // Mock constructor
    }
  };
});

describe('RadarChart', () => {
  let radarChart: RadarChart;

  beforeEach(() => {
    radarChart = new RadarChart();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create RadarChart instance', () => {
      expect(radarChart).toBeInstanceOf(RadarChart);
    });
  });

  describe('init method', () => {
    it('should initialize correctly', () => {
      const initContextSpy = jest.spyOn(radarChart, 'initContext');
      
      radarChart.init();

      expect(initContextSpy).toHaveBeenCalled();
      expect(radarChart.drawer).toBeDefined();
      expect(radarChart.drawer.init).toHaveBeenCalled();
    });

    it('should set drawer property correctly', () => {
      radarChart.init();
      
      expect(radarChart.drawer).toBeDefined();
      expect(radarChart.drawer.constructor.name).toBe('MockRadar');
    });

    it('should call all required initialization steps', () => {
      const initContextSpy = jest.spyOn(radarChart, 'initContext');
      
      radarChart.init();

      expect(initContextSpy).toHaveBeenCalledTimes(1);
      expect(radarChart.drawer.init).toHaveBeenCalledTimes(1);
    });
  });
});