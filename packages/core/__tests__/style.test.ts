/**
 * @author Wayne
 * @Date 2022-03-30 14:09:16
 * @LastEditTime 2022-06-07 19:58:44
 */
import { getColorRgbList, getColorRgba, isTransparentColor } from '../src/utils/colors';

describe('string test', () => {
  it('getColorRgbList()', async () => {
    expect(getColorRgbList('#f00').toString()).toEqual('255,0,0');
    expect(getColorRgbList('#0000FF').toString()).toEqual('0,0,255');
    expect(getColorRgbList('#aaBB99').toString()).toEqual('170,187,153');
    expect(getColorRgbList('#0').toString()).toEqual('');
    expect(getColorRgbList('#0000VV').toString()).toEqual('');
    expect(getColorRgbList('#00x').toString()).toEqual('');
    expect(getColorRgbList('').toString()).toEqual('');
  });

  it('getColorRgbList()', async () => {
    expect(getColorRgba('#f00').toString()).toEqual('rgba(255,0,0,1)');
    expect(getColorRgba('#f00', 0.5).toString()).toEqual('rgba(255,0,0,0.5)');
    expect(getColorRgba('#0000FF').toString()).toEqual('rgba(0,0,255,1)');
    expect(getColorRgba('#0000FF', 0.1).toString()).toEqual('rgba(0,0,255,0.1)');
    expect(getColorRgba('#aaBB99').toString()).toEqual('rgba(170,187,153,1)');
    expect(getColorRgba('#aaBB99', 0.6).toString()).toEqual('rgba(170,187,153,0.6)');
    expect(getColorRgba('#0').toString()).toEqual('rgba(0,0,0,0)');
    expect(getColorRgba('#0000VV', 1).toString()).toEqual('rgba(0,0,0,0)');
    expect(getColorRgba('#00x').toString()).toEqual('rgba(0,0,0,0)');
    expect(getColorRgba('').toString()).toEqual('rgba(0,0,0,0)');
  });

  it('isTransparentColor()', async () => {
    expect(isTransparentColor('')).toEqual(false);
    expect(isTransparentColor('rgba(255,0,0,0)')).toEqual(true);
    expect(isTransparentColor('rgba(255,0,0,1)')).toEqual(false);
    expect(isTransparentColor(getColorRgba('#f00').toString())).toEqual(false);
    expect(isTransparentColor(getColorRgba('#f00', 0.5).toString())).toEqual(false);
    expect(isTransparentColor(getColorRgba('#f00', 0).toString())).toEqual(true);
    expect(isTransparentColor(getColorRgba('#0000FF').toString())).toEqual(false);
    expect(isTransparentColor(getColorRgba('#0000FF', 0.1).toString())).toEqual(false);
    expect(isTransparentColor(getColorRgba('#0000FF', 0).toString())).toEqual(true);
    expect(isTransparentColor(getColorRgba('#aaBB99').toString())).toEqual(false);
    expect(isTransparentColor(getColorRgba('#aaBB99', 0.6).toString())).toEqual(false);
    expect(isTransparentColor(getColorRgba('#aaBB99', 0).toString())).toEqual(true);
    expect(isTransparentColor(getColorRgba('#0').toString())).toEqual(true);
    expect(isTransparentColor(getColorRgba('#0000VV', 1).toString())).toEqual(true);
    expect(isTransparentColor(getColorRgba('#00x').toString())).toEqual(true);
    expect(isTransparentColor(getColorRgba('').toString())).toEqual(true);
  });
});
