/**
 * webpack config
 */

const path = require('path');
const webpack = require('webpack');
const { description, version } = require('./package.json');

module.exports = (options = {}) => {
  const myBanner = `
@description: ${description}.
@version: ${version}
@author: Micheal Wayne(michealwayne@163.com)
@time: 2018~2021`;

  return {
    entry: {
      'FundCharts-tooltips': './src/index.js',
    },

    resolve: {
      extensions: ['.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: `[name].js`,
      library: 'FundChartsToolTips',
      libraryTarget: 'umd',
    },

    module: {
      rules: [
        // js
        {
          test: /\.js$/,
          use: ['babel-loader', 'eslint-loader'],
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
