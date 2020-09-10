/**
 * webpack config
 */

const path = require('path');
const webpack = require('webpack');

module.exports = (options = {}) => {
    const myBanner = `
@description: FundCharts ToolTips.
@version: 0.9.7
@author: Micheal Wayne(michealwayne@163.com)
@time: 2018~2020`;

    return {
        entry: {
			'fundchart-tooltips': './src/index.js',
		},

        resolve: {
            extensions: ['.js'],
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
        },

        output: {
			path: path.resolve(__dirname, 'dist'),
			filename: `[name].js`,
			library: 'FundChartsToolTips',
			libraryTarget: 'umd'
		},
		
        module: {
            rules: [
                // js
                {
                    test: /\.js$/,
                    use: [
                        'babel-loader',
                        'eslint-loader'
                    ]
                }
            ]
        },

        mode: 'production',

        plugins: [
			new webpack.BannerPlugin(myBanner)
		],

        performance: {
            hints: options.dev ? false : 'warning'
        }
    }
};
