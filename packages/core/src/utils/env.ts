/**
 * @author Wayne
 * @Date 2022-06-04 19:13:04
 * @LastEditTime 2023-02-28 15:10:41
 */

declare global {
  interface Window {
    NODE_ENV: unknown; // 可以通过提前设置NODE_ENV打开dev开关
  }
}

const { NODE_ENV } =
  (typeof global !== 'undefined' && global.process?.env) ||
  (typeof window !== 'undefined' && window) ||
  {};

// dev 模式，也可用webpack.DefinePlugin
export const __DEV__ = NODE_ENV === 'development';

// 微信小程序
export const isWeapp = typeof wx !== 'undefined' && typeof wx.getSystemInfoSync !== 'undefined';

// web
export const isWeb = typeof window !== 'undefined' && !isWeapp;

// nodejs 环境
export const isNode = typeof process !== 'undefined' && !!process.versions?.node;
