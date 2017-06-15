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
	devtool: "cheap-module-source-map",
	entry: {
		app: ["babel-polyfill","./src/index"],
		vendor: ["react", "react-dom", "react-router", "lodash"]
	},
	output: {
		path: path.join(__dirname, "../dist"),
		publicPath: "/",
		filename: "assets/[name].[chunkhash:6].js",
		chunkFilename: "assets/[id].[chunkhash:6].js"
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
		      to:path.join(__dirname, "../dist/assets"),
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
		    names: ['vendor', 'mainifest'],
		    minChunks: Infinity
		}),
		new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false,
                drop_console: true,
                screw_ie8: true
            },
            output: {
                comments: false
            }
        }),
        new ExtractTextPlugin('assets/[name].[contenthash:6].css'),
        new HtmlWebpackPlugin({
            hash: false,
            template: path.join(src, 'index.html')
        }),
        new BundleAnalyzerPlugin({
        	analyzerMode: 'server',
        	analyzerHost: '127.0.0.1',
        	analyzerPort: 8888,
        	reportFilename: 'report.html',
        	openAnalyzer: true,
        	generateStatsFile: false,
        })
	]
}