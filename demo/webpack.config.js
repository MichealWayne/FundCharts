/**
 * webpack config
 */

const glob = require('glob');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LessFunc = require('less-plugin-functions');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const browsersVersionSet = {	// for autoprefixer
	browsers: [
		'last 2 versions',
		'android 4', 
		'ios 8'
	]
};
const imageLimit = 5000;	// base64 limit

module.exports = (options = {}) => {
    const entries = glob.sync('./web/**/enter.js');
    let entryJSList = {};
    let outputConfig;
    const entryHtmlList = [];
	
	if (options.dev) {     // test 
        outputConfig = {path: path.resolve(__dirname, 'dist'),
            filename: '[name].js',
            chunkFilename: '[id].js?[chunkhash]'
        };
		for (const path of entries) {
			const chunkName = path.slice('./web/js/'.length, -'/enter.js'.length);
			entryJSList[chunkName] = path;

			entryHtmlList.push(new HtmlWebpackPlugin({
				template: './web/' + chunkName + '.html',
				filename: chunkName + '.html',
				chunks: ['manifest', 'vendor', chunkName, 'commons'],
				minify: {
					removeAttributeQuotes: false
				}
			}));
		}
	} else {   // build
        /*outputConfig = {
            path: path.resolve(__dirname, 'dist'),
            filename: `[name]${options.NODEJS ? '-node' : '.min'}.js`,
            library: 'FundCharts',
            libraryTarget: options.NODEJS && 'commonjs'|| 'umd'
        };
		entryJSList = {
			FundCharts : './FundCharts/FundCharts.js'
		};*/
	}

    let plugins = [
        ...entryHtmlList,
        new MiniCssExtractPlugin({
			filename: `[name]${options.dev ? '' : '.[chunkhash]'}.css`,
			chunkFilename: `[id].css`
		}),
    ];

    return {
        entry: entryJSList,

        resolve: {
            extensions: ['.js', '.css', 'less'],
            alias: {
                '~': path.resolve(__dirname, '../dist'),
                'lib': path.resolve(__dirname, 'web/js/lib'),
                'css': path.resolve(__dirname, 'web/css')
            }
        },

        output: outputConfig,
		
        module: {
            rules: [
                // js
                {
                    test: /\.js$/,
                    use: ['babel-loader']
                },

                // html
                {
                    test: /\.html$/,
                    use: {
                        loader: 'html-loader',
                        options: {
                            root: path.resolve(__dirname, 'FundCharts'),
                            attrs: ['img:src']
                        }
                    }
                },

                                // css
                {
                    test: /\.css$/,
                    use: [
						MiniCssExtractPlugin.loader,
						'css-loader',
						{
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    require('autoprefixer')(browsersVersionSet)
                                ]
                            }
                        }
					]
                },

                // less
                {
                    test: /\.less$/,
                    use: [
						MiniCssExtractPlugin.loader,
						'css-loader',
						{
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    require('autoprefixer')(browsersVersionSet)
                                ]
                            }
                        },
						{
							loader: 'less-loader',
							options: {
								strictMath: true,
								plugins: [ new LessFunc() ]
							}
						}
					]
                },

                // image or font
                {
                    test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: imageLimit,
                            name: 'images/[hash].[ext]'
                        }
                    }]
                }
            ]
        },

        mode: 'production',

        plugins: plugins,

        devServer: {
            port: 3000,
            hot: true,
            contentBase: path.join(__dirname, 'FundCharts'),
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
