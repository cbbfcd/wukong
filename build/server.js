var webpack = require('webpack'),
	WebpackDevServer = require('webpack-dev-server'),
	path = require('path'),
	config = require('./webpack.config.js');


new WebpackDevServer(webpack(config), {
	hot: true,
    //contentBase: path.resolve(__dirname, "../dist"),
    port: 9090,
    host: "localhost",
    publicPath: "/",
    historyApiFallback: true,
    disableHostCheck: true
}).listen(9090, 'localhost', function(err, re){
	if(err){
		console.log('webpack-dev-server start error: ', err);
	}

	console.info('welcome to start wukong on localhost:9090');
})