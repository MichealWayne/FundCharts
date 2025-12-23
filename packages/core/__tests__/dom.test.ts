/**
 * @author Wayne
 * @Date 2022-06-07 21:40:44
 * @LastEditTime 2022-07-25 21:57:37
 */
// document https://github.com/testing-library/jest-dom
// document https://testing-library.com/docs/ecosystem-jest-dom/

import { getElementSize, appendCanvasElem } from '../src/utils/doms';

describe('DOM test', () => {
  it('getElementSize()', () => {
    const dom = document.createElement('div');
    dom.style.width = '50px';
    expect(getElementSize(dom, 'width')).toBe(50);
    dom.style.width = '60px';
    expect(getElementSize(dom, 'width')).toBe(60);
  });

  it('appendCanvasElem()', () => {
    const dom = document.createElement('div');
    const canvasDom1 = appendCanvasElem(dom, { id: 'test1', width: 50, height: 50 });
    expect(canvasDom1.width).toBe(50);
    dom.style.width = '80px';
    dom.style.height = '80px';
    const canvasDom2 = appendCanvasElem(dom, { id: 'test2' });
    expect(canvasDom2.width).toBe(80);
    expect(canvasDom2.height).toBe(80);
  });
});
