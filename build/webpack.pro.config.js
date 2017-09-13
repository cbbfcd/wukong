var path = require('path'),
	webpack = require('webpack'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	CopyWebpackPlugin = require('copy-webpack-plugin'),
	CleanWebpackPlugin = require('clean-webpack-plugin'),
	src = path.join(__dirname, '../src'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
	env = process.env.NODE_ENV;

module.exports = {
	//devtool: "cheap-module-source-map",
	entry: {
		app: [path.join(src, 'index.js')],
		vendor: [
			"react", 
			"react-dom", 
			"react-router", 
			"lodash", 
			"mobx", 
			"mobx-react", 
			"react-router-dom"
		]
	},
	output: {
		path: path.join(__dirname, "../dist/static"),
		publicPath: "/static/",
		filename: "[name].[chunkhash:6].js",
		chunkFilename: "[id].[chunkhash:6].js"
	},
	resolve:{
		extensions:['.js', '.jsx', '.less', '.css', '.scss', '.json'],
		alias: {
			ASSET: path.join(src, 'assets'),
			COMPONENT: path.join(src, 'components'),
			STORE: path.join(src, 'store'),
			UTIL: path.join(src, 'utils'),
			MOCK:path.join(src, 'mock')
	    }
	},
	resolveLoader: {
	    modules: [path.join(__dirname, '../node_modules')]
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				options: {
					presets: [
                        ["es2015", {"modules": false}],
                        "stage-0",
                        "react",
                    ],
                    plugins: [
                        "transform-async-to-generator",
                        "transform-decorators-legacy"
                    ]
				}
			},
			{
				test: /\.scss|css$/i,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [
						{ loader: 'css-loader', options: { sourceMap: true } },
						{ loader: 'postcss-loader', options: { sourceMap: true } },
						"resolve-url-loader",
						{ loader: 'sass-loader', options: { sourceMap: true } }
					]
				})
			},
			{
				test: /\.less$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [
						{ loader: 'css-loader', options: { sourceMap: true } },
						{ loader: 'less-loader', options: { sourceMap: true } },
						{ loader: 'postcss-loader', options: { sourceMap: true } }
					]
				})
			},
			{
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
						loader: 'url-loader',
						options: {
							query: {
							  name:'assets/[name].[hash].[ext]'
							}
						}
				    },
                    {
					    loader: 'image-webpack-loader',
					    options: {
					        progressive: true,
					        optipng: {
					            optimizationLevel: 7,
					        },
					        mozjpeg: {
					            quality: 65
					        },
					        gifsicle: {
					            interlaced: true,
					        },
					        pngquant: {
					            quality: '65-90',
					            speed: 4
					        }
					    }
					}
                ]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: "file-loader"
            }
		]
	},
	plugins: [
		new CleanWebpackPlugin('dist', {
		    root: path.resolve(__dirname, '..'),
		    verbose: false
		}),
		new CopyWebpackPlugin([
		    {
		      context: path.join(__dirname, '../static'),
		      from: '**/*',
		      ignore: ['*.md','*.mdown']
		    }
		]),
		new webpack.DefinePlugin({
		  'process.env': {
		  	NODE_ENV: JSON.stringify('production')
		  },
		  __DEV__: env === 'development',
		  __PROD__: env === 'production'
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
		    names: ['vendor', 'mainifest']
		}),
		new webpack.optimize.UglifyJsPlugin({
			beautify: false,//最紧凑的输出
			comments: false,//删除注释
			compress: {
				warnings: false,//在UglifyJs删除没有用到的代码时不输出警告
				drop_console: true,//删除所有console语句
				collapse_vars: true,//内嵌定义了但是只用到一次的变量
				reduce_vars: true,// 提取出出现多次但是没有定义成变量去引用的静态值
			}
        }),
        new ExtractTextPlugin('[name].[contenthash:6].css'),
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: path.join(src, 'index.html'),
            inject: true,
            chunksSortMode: 'dependency'
        }),
		new webpack.LoaderOptionsPlugin({
			options: {
				postcss: () => [autoprefixer],//css前缀补全以及兼容
				url: { limit: 10240 }
			}
		}),
        new BundleAnalyzerPlugin({
        	analyzerMode: 'server',
        	analyzerHost: '127.0.0.1',
        	analyzerPort: 8888,
        	reportFilename: 'report.html',
        	openAnalyzer: true,
        	generateStatsFile: false,
        }),
        // dll
		new webpack.DllReferencePlugin({
	        context: __dirname,
	        manifest: require('./dist/manifest.json')
	    })
	]
}