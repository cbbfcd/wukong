var path = require("path"),　　
　　webpack = require("webpack"),
    bundle=[
    	'react',
    	'react-dom',
    	'react-router-dom',
    	'lazy-route',
    	'react-router',
    	'mobx-react',
    	'mobx',
    	'rfx-core'
    ];

module.exports = {
　　entry: {
　　　　vendor:bundle  //只打包一次的第三方库
　　},
　　output: {	   
        path: path.join(__dirname, "dist"),
　　　　filename: "[name].js",
　　　　library: "[name]"
　　},
　　plugins: [
　　　　new webpack.DllPlugin({
　　　　　　path: path.join(__dirname, "dist", "manifest.json"),
　　　　　　name: "[name]",
　　　　　　context: __dirname
　　　　})
　　]
}; 