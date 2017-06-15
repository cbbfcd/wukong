var path = require("path"),　　
　　webpack = require("webpack"),
    AssetsPlugin = require('assets-webpack-plugin'),  
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
　　　　filename: "[name].[hash].js",
　　　　library: "[name]_[hash]"
　　},
　　plugins: [
　　　　new webpack.DllPlugin({
　　　　　　path: path.join(__dirname, "dist", "manifest.json"),
　　　　　　name: "[name]_[hash]",
　　　　　　context: __dirname
　　　　}),
        new AssetsPlugin({
            filename: 'bundle-config.json', 
            path: path.join(__dirname, "dist")
        })
　　]
}; 