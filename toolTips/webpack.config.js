/**
 * @config webpack config
 * @author Wayne
 * @buildTime 2020.06
 * @lastModified 2021.09.25
 */

const path = require('path');
const webpack = require('webpack');
const { description, version } = require('./package.json');

module.exports = (options = {}) => {
  const myBanner = `
@description ${description}.
@version ${version}
@author Wayne(michealwayne@163.com)
@time 2018~2021`;

  let entryJSList = {};
  let outputConfig = {};
  if (options.LIB) {
    entryJSList = {
      grid: './src/grid.tt.ts',
      shape: './src/shape.tt.ts',
      index: './src/index.ts',
    };

    outputConfig = {
      path: path.resolve(__dirname, 'dist/lib'),
      filename: '[name].js',
      libraryTarget: 'umd',
    };
  } else {
    entryJSList = {
      'fundCharts-tooltips': './src/index.ts',
    };

    outputConfig = {
      path: path.resolve(__dirname, 'dist'),
      filename: `[name].js`,
      library: 'FundChartsToolTips',
      libraryTarget: 'umd',
    };
  }

  return {
    entry: entryJSList,

    output: outputConfig,

    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      mainFiles: ['index'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },

    mode: 'production',

    plugins: [new webpack.BannerPlugin(myBanner)],

    performance: {
      hints: options.dev ? false : 'warning',
    },
  };
};
