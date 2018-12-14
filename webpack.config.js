/**
 * webpack config
 */

let glob = require('glob');
let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let Ex = require('extract-text-webpack-plugin');

let myBanner = `
  FundCharts
  @description: 移动端轻量级canvas数据可视化组件。折线图、饼图。
  @version: beta
  @author: Micheal Wayne(michealwayne@163.com)
  @build time: 2018-11-22
`;

module.exports = (options = {}) => {
    const entries = glob.sync('./test/**/enter.js');
    let entryJSList = {};
    let outputConfig;
    const entryHtmlList = [];

	if (options.dev) {     // test 
        outputConfig = {path: path.resolve(__dirname, 'dist'),
            filename: '[name].js',
            chunkFilename: '[id].js?[chunkhash]'
        };
		for (const path of entries) {
			const chunkName = path.slice('./test/js/'.length, -'/enter.js'.length);
			entryJSList[chunkName] = path;

			entryHtmlList.push(new HtmlWebpackPlugin({
				template: './test/' + chunkName + '.html',
				filename: chunkName + '.html',
				chunks: ['manifest', 'vendor', chunkName, 'commons'],
				minify: {
					removeAttributeQuotes: false
				}
			}));
		}
	} else {   // build
        outputConfig = {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].min.js',
            library: 'FundCharts',
            libraryTarget: 'umd'
        };
		entryJSList = {
			FundCharts : './src/FundCharts.js'
		};
	}

    let plugins = [
        ...entryHtmlList,
        new webpack.BannerPlugin(myBanner),
        new Ex(`css/[name]${options.dev ? '' : 
            '.[chunkhash]'
        }.css`)
    ];
    if (!options.dev) plugins.push(new webpack.IgnorePlugin(/mock\/*/));    // ignore mock

    return {
        entry: entryJSList,

        resolve: {
            extensions: ['.js', '.css', 'less'],
            alias: {
                '@': path.resolve(__dirname, 'src'),
                'lib': path.resolve(__dirname, 'test/js/lib'),
                'css': path.resolve(__dirname, 'test/css')
            }
        },

        output: outputConfig,

        module: {
            rules: [
                // js
                {
                    test: /\.js$/,
                    use: ['babel-loader'
                        ,'eslint-loader'
                    ]
                },

                // html
                {
                    test: /\.html$/,
                    use: {
                        loader: 'html-loader',
                        options: {
                            root: path.resolve(__dirname, 'src'),
                            attrs: ['img:src']
                        }
                    }
                },

                // css
                {
                    test: /\.css$/,
                    use: Ex.extract({
                        use: ['css-loader', 'postcss-loader'],
                        publicPath:'../'
                    })
                    //'style-loader', 'css-loader', 'postcss-loader')
                },

                // less
                {
                    test: /\.less$/,
                    use: Ex.extract({
                        fallback:"style-loader",
                        use: ['css-loader', 'less-loader', 'postcss-loader'],
                        publicPath:'../'
                    })
                },

                // image or font
                {
                    test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 5000,
                            name: 'images/[hash].[ext]'
                        }
                    }]
                }
            ]
        },

        plugins: plugins,

        devServer: {
            port: 3000,
            hot: true,
            contentBase: path.join(__dirname, 'src'),
            overlay: true,
            historyApiFallback: {
                index: '/assets/',
                disableDotRule: true
            },
            inline: true
        },

        performance: {
            hints: options.dev ? false : 'warning'
        }
    }
};