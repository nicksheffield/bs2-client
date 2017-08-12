const webpack            = require('webpack')
const path               = require('path')
const HtmlWebpackPlugin  = require('html-webpack-plugin')

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: './index.html',
	filename: 'index.html',
	inject: 'body'
})

module.exports = {
	entry: './angular/app.js',
	output: {
		path: path.resolve('dist'),
		filename: 'bundle.js'
	},
	resolve: {
		modules: [
			path.resolve('./angular'),
			path.resolve('./node_modules')
		],
		extensions: ['.js', '.styl']
	},
	module: {
		loaders: [
			{ test: /\.js$/,                   loader: 'babel-loader',  exclude: /node_modules/, options: { sourceMap: true } },
			{ test: /\.styl$/,                 loader: 'style-loader!css-loader!stylus-loader' },
			{ test: /\.(jpe?g|png|gif|svg)$/i, loader: 'file-loader?name=/images/[name].[ext]' },
			{ test: /\.css$/,                  loader: "style-loader!css-loader" },
			{ test: /\.png$/,                  loader: "url-loader?limit=100000" },
			{ test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/, loader: 'url-loader' },
			{ test: /\.(html)$/,               loader: 'html-loader', options: { attrs: [':data-src'] } },
			{ test: /\.json$/,                 loader: 'json-loader' },
		]
	},
	plugins: [
		HtmlWebpackPluginConfig,
		new webpack.ProvidePlugin({ "window.jQuery": "jQuery" }),
	],
	devServer: {
		historyApiFallback: true
	}
}