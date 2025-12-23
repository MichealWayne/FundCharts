/**
 * @author Wayne
 * @Date 2022-06-07 21:38:07
 * @LastEditTime 2022-07-25 22:17:19
 */
// document https://www.npmjs.com/package/jest-canvas-mock

import {
  drawLine,
  drawDashLine,
  drawPoint,
  drawRotateText,
  clearArc,
  retinaScale,
  setEnvContext,
} from '../src/canvas/drawer';

describe('Canvas test', () => {
  it('drawLine()', () => {
    const elem = document.createElement('canvas');
    const ctx = elem.getContext('2d')!;
    expect(() => drawLine(ctx, { x: 0, y: 0 }, { x: 1, y: 1 })).not.toThrow(DOMException);
  });

  it('drawDashLine()', () => {
    const elem = document.createElement('canvas');
    const ctx = elem.getContext('2d')!;
    expect(() => drawDashLine(ctx, { x: 0, y: 0 }, { x: 1, y: 1 })).not.toThrow(DOMException);
    expect(() => drawDashLine(ctx, { x: 0, y: 0 }, { x: 3, y: 3 }, 3)).not.toThrow(DOMException);
  });

  it('drawPoint()', () => {
    const elem = document.createElement('canvas');
    const ctx = elem.getContext('2d')!;
    expect(() => drawPoint(ctx, { x: 0, y: 0 }, '#f00', '#00f', 50, 2)).not.toThrow(DOMException);
    expect(() => drawPoint(ctx, { x: 0, y: 0 }, '#f00', '#00f', -50, 2)).toThrow(DOMException);
  });

  it('drawRotateText', () => {
    const elem = document.createElement('canvas');
    const ctx = elem.getContext('2d')!;
    expect(() => drawRotateText(ctx, { x: 0, y: 0 }, 60, '909')).not.toThrow(DOMException);
  });

  it('clearArc()', () => {
    const elem = document.createElement('canvas');
    const ctx = elem.getContext('2d')!;
    expect(() => clearArc(ctx, { x: 0, y: 0 }, 50)).not.toThrow(DOMException);
    expect(() => clearArc(ctx, { x: 0, y: 0 }, -50)).not.toThrow(DOMException);
  });

  it('retinaScale()', () => {
    const elem = document.createElement('canvas');
    const ctx = elem.getContext('2d')!;
    expect(() => retinaScale(elem, ctx)).not.toThrow(DOMException);
  });

  it('setEnvContext() - valid chart object', () => {
    const elem = document.createElement('div');
    
    // Should not throw for valid chart object
    const validChart = {
      $el: elem,
      opts: {
        width: 400,
        height: 300,
      },
    };
    
    expect(() => setEnvContext(validChart)).not.toThrow();
  });
});
