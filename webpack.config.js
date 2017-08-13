const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BabiliPlugin = require('babili-webpack-plugin')

var env = ''
if (process.argv[3] && process.argv[3].indexOf('staging') !== -1) env = 'staging'
if (process.argv[3] && process.argv[3].indexOf('production') !== -1) env = 'production'

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: './index.html',
	filename: 'index.html',
	inject: 'body',
})

const plugins = [
	HtmlWebpackPluginConfig,
	new webpack.ProvidePlugin({
		'window.jQuery': 'jquery',
		'window.Tether': 'tether',
		'window.jQuery': 'jquery',
		$: 'jquery',
		jQuery: 'jquery',
		Tether: 'tether',
		'window.swal': 'sweetalert2',
		Popper: ['popper.js', 'default'],
		Alert: 'exports-loader?Alert!bootstrap/js/dist/alert',
		Button: 'exports-loader?Button!bootstrap/js/dist/button',
		Carousel: 'exports-loader?Carousel!bootstrap/js/dist/carousel',
		Collapse: 'exports-loader?Collapse!bootstrap/js/dist/collapse',
		Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
		Modal: 'exports-loader?Modal!bootstrap/js/dist/modal',
		Popover: 'exports-loader?Popover!bootstrap/js/dist/popover',
		Scrollspy: 'exports-loader?Scrollspy!bootstrap/js/dist/scrollspy',
		Tab: 'exports-loader?Tab!bootstrap/js/dist/tab',
		Tooltip: 'exports-loader?Tooltip!bootstrap/js/dist/tooltip',
		Util: 'exports-loader?Util!bootstrap/js/dist/util',
	}),
	new webpack.DefinePlugin({
		VERSION: JSON.stringify(require('./package.json').version),
		BUILD_DATE: JSON.stringify(new Date())
	}),
]

if (env === 'production') {
	plugins.push(new BabiliPlugin())
}

module.exports = {
	entry: './angular/app.js',
	output: {
		path: path.resolve('dist'),
		filename: 'bundle.js',
	},
	resolve: {
		modules: [
			path.resolve('./angular'),
			path.resolve('./node_modules'),
		],
		extensions: ['.js', '.styl', '.css'],
	},
	module: {
		loaders: [
			{ test: /\.js$/,                   loader: 'babel-loader', exclude: /node_modules/ },
			{ test: /\.styl$/,                 loader: 'style-loader!css-loader!stylus-loader' },
			{ test: /\.(jpe?g|png|gif|svg)$/i, loader: 'file-loader' },
			{ test: /\.css$/,                  loader: 'style-loader!css-loader' },
			{ test: /\.png$/,                  loader: 'url-loader?limit=100000' },
			{ test: /\.(eot|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/, loader: 'url-loader' },
			{ test: /\.html$/,                 loader: 'html-loader', options: { attrs: [':data-src'] } },
			{ test: /\.json$/,                 loader: 'json-loader' },
		],
	},
	plugins: plugins,
	devServer: {
		historyApiFallback: true,
	},
	devtool: 'inline-source-map'
}