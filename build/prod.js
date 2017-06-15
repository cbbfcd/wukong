var fs = require('fs'),
	path = require('path'),
	webpack = require('webpack'),
	config = require('./webpack.pro.config.js');

webpack(config, function(err, stats){
	console.log( stats.toString({ chunks: false, color: true }) );

	fs.writeFile(
    path.join(__dirname, '../dist/__build_info__'),
    stats.toString({ color: false })
  );
})