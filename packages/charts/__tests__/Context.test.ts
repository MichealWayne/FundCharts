/**
 * @author Wayne
 * @Date 2025-08-02
 * @description Tests for Context class
 */

import Context from '../src/factorys/Context';

describe('Context', () => {
  let mockContext: CanvasRenderingContext2D;
  let context: Context;

  beforeEach(() => {
    // Mock CanvasRenderingContext2D
    mockContext = {
      fillRect: jest.fn(),
      stroke: jest.fn(),
      fill: jest.fn(),
    } as unknown as CanvasRenderingContext2D;
  });

  describe('constructor', () => {
    it('should create Context instance with canvas context', () => {
      const drawMethods = {
        drawRect: jest.fn(),
        drawCircle: jest.fn(),
      };

      context = new Context(mockContext, drawMethods);

      expect(context).toBeInstanceOf(Context);
      expect(context.ctx).toBe(mockContext);
      expect(context.methods).toBeDefined();
    });

    it('should initialize methods correctly', () => {
      const drawMethods = {
        drawRect: jest.fn(),
        drawLine: jest.fn(),
      };

      context = new Context(mockContext, drawMethods);

      expect(Object.keys(context.methods)).toEqual(['drawRect', 'drawLine']);
      expect(typeof context.methods.drawRect).toBe('function');
      expect(typeof context.methods.drawLine).toBe('function');
    });
  });

  describe('addDrawMethods', () => {
    it('should convert draw methods to context methods', () => {
      const drawRect = jest.fn();
      const drawCircle = jest.fn();
      const drawMethods = { drawRect, drawCircle };

      context = new Context(mockContext, drawMethods);
      const methods = context.addDrawMethods(drawMethods);

      expect(methods.drawRect).toBeDefined();
      expect(methods.drawCircle).toBeDefined();
      expect(typeof methods.drawRect).toBe('function');
      expect(typeof methods.drawCircle).toBe('function');
    });

    it('should create chainable methods', () => {
      const drawRect = jest.fn();
      const drawMethods = { drawRect };

      context = new Context(mockContext, drawMethods);

      // Test chaining
      const result = context.methods.drawRect(10, 10, 50, 50);
      expect(result).toBe(context);
      expect(drawRect).toHaveBeenCalledWith(mockContext, 10, 10, 50, 50);
    });

    it('should handle multiple chained calls', () => {
      const drawRect = jest.fn();
      const drawCircle = jest.fn();
      const drawMethods = { drawRect, drawCircle };

      context = new Context(mockContext, drawMethods);

      // Test chaining by calling methods sequentially
      const result1 = context.methods.drawRect(0, 0, 10, 10);
      const result2 = result1.methods.drawCircle(5, 5, 3);
      
      expect(result1).toBe(context);
      expect(result2).toBe(context);
      expect(drawRect).toHaveBeenCalledWith(mockContext, 0, 0, 10, 10);
      expect(drawCircle).toHaveBeenCalledWith(mockContext, 5, 5, 3);
    });

    it('should handle methods with no arguments', () => {
      const clearCanvas = jest.fn();
      const drawMethods = { clearCanvas };

      context = new Context(mockContext, drawMethods);

      context.methods.clearCanvas();
      expect(clearCanvas).toHaveBeenCalledWith(mockContext);
    });

    it('should handle empty draw methods object', () => {
      context = new Context(mockContext, {});

      expect(context.methods).toEqual({});
      expect(Object.keys(context.methods)).toHaveLength(0);
    });
  });
});