// 插件引入
var path = require('path'),
	webpack = require('webpack'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	NyanProgressPlugin = require('nyan-progress-webpack-plugin'),
	src = path.join(__dirname, '../src'),
	HappyPack = require('happypack'),
	env = process.env.NODE_ENV;

// webpack2配置
module.exports = {
	devtool: 'eval',
	entry: [
		"react-hot-loader/patch",
        "webpack-dev-server/client?http://localhost:9090",
        "webpack/hot/only-dev-server",
        "whatwg-fetch",
        "./src/index"
	],
	output:{
		path: path.join(__dirname, "../dist"),
        publicPath: "/",
        filename: "bundle.js"
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
	module:{
		rules: [
			{
	            test: /\.js[x]?$/,
	            enforce: 'pre',
	            use: [{
	                loader: 'happypack/loader?id=eslint', 
	                options: { fix: true }
	            }],
	            include: path.resolve(__dirname, '../src/**/*.js'),
	            exclude: /node_modules/
	        },
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
				test: /\.scss|css$/,
				use:[
					"style-loader",
					"css-loader",
					"postcss-loader",
					"resolve-url-loader",
					"sass-loader?sourceMap"
				]
			},
			{
				test: /\.less$/,
				use:[
					"style-loader",
					"css-loader",
					"less-loader",
					"resolve-url-loader",
					"postcss-loader"
				]
			},
			{
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
						loader: 'url-loader',
						options: {
						query: {
							  name:'[name].[hash].[ext]'
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
    
	plugins:[
		new HappyPack({
			verbose: false,
			id: 'eslint',
			threads: 4,
			loaders: [ 'eslint-loader' ]
		}),
		new NyanProgressPlugin(),
		new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
        	hash: false,
        	filename: 'index.html',
        	template: path.join(src, 'index.html'),
        	inject: true
        }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /nb/),
        new webpack.DefinePlugin({
		  'process.env': {
		  	NODE_ENV: JSON.stringify('development')
		  },
		  __DEV__: env === 'development',
		  __PROD__: env === 'production'
		}),
		// dll
		new webpack.DllReferencePlugin({
	        context: __dirname,
	        manifest: require('./dist/manifest.json')
	    })
	]
}


