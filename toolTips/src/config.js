/**
 * @module Config
 */

const isWeapp = typeof wx !== 'undefined' && typeof wx.getSystemInfoSync !== 'undefined';

export default {
  isWeapp,
  dpr: (isWeapp ? wx.getSystemInfoSync().pixelRatio : window.devicePixelRatio) || 1,

  // toolTip box
  width: 70,
  height: 20,

  // toolTip styles
  font: '10px Arial',
  pieFont: 'bold 22px Arial',
  labelFont: 'bold 12px Arial',
  textAlign: 'center',
  colors: {
    color: '#fff',
    backgroundColor: '#bdbdbd',
    valColor: '#eee',
  },
};
