const cssLoaderOptions = {
	sourceMap: true,
	modules: {
		exportLocalsConvention: 'dashes',
		localIdentName: '[local]--[hash:base64:4]',
	},
};
const { ProvidePlugin } = webpack;
/**
 * @suggest dev环境建议使用全量source-map , 否则可能会导致错误栈无法定位到正确的模块
 */

/*webpack基础配置*/
export const webpack_base_config = {
	mode: method === 'server' ? 'development' : 'production',
	entry: {
		main: path.resolve(repoRoot, 'src'),
	},
	output: {
		filename: method === 'server' ? '[name].bundle.js' : '[name].bundle.[contenthash:6].js',
		path: path.resolve(repoRoot, 'dist'), // publicPath : path.resolve(rootPath , 'dist') ,
	},
	resolve: {
		alias: {
			'react-dom': '@hot-loader/react-dom',
			'#root': path.resolve(rootPath),
			'#toolkits': path.resolve(packagesRoot, 'tookits'),
			'#statics': path.resolve(rootPath, 'statics'),
			'#utils': path.resolve(packagesRoot, 'utils'),
			'#reaxels': path.resolve(packagesRoot, 'reaxels'),
			'#requester': path.resolve(packagesRoot, 'requester'),
			'#reaxes': path.resolve(packagesRoot, 'reaxes'),
		},
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
	},
	devtool: 'cheap-source-map',
	cache: {
		type: 'memory',
		maxGenerations: 2,
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				resolve: {
					fullySpecified: false,
				},
			},
			{
				test: /\.(jsx?|tsx?)$/,
				use: {
					loader: 'babel-loader',
				},
				exclude: /node_modules/,
			},
			{
				test: /\.module\.less$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: cssLoaderOptions,
					},
					{
						loader: 'less-loader',
						options: {
							sourceMap: true,
							lessOptions: {
								javascriptEnabled: true,
							},
						},
					},
				],
			},
			{
				test: /(?<!(\.module|\.theme))\.less$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: _.pick(cssLoaderOptions, ['sourceMap']),
					},
					{
						loader: 'less-loader',
						options: {
							sourceMap: true,
							lessOptions: {
								javascriptEnabled: true,
							},
						},
					},
				],
			},
			{
				test: /\.module\.css$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: cssLoaderOptions,
					},
				],
			},
			{
				test: /(?<!(\.module|\.theme))\.css$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: _.pick(cssLoaderOptions, ['sourceMap']),
					},
				],
			},
			{
				test: /\.theme\.(le|c)ss$/, // type :  "asset/source",
				use: [
					{
						loader: 'css-loader',
						options: _.pick(cssLoaderOptions, ['sourceMap']),
					},
					{
						loader: 'less-loader',
						options: {
							sourceMap: true,
							lessOptions: {
								javascriptEnabled: true,
							},
						},
					},
				],
			},
			{
				test: /\.(png|jpe?g|te?xt|gif|woff|woff2|eot|ttf|otf|bmp|swf)$/,
				type: 'asset/resource',
				generator: {
					filename: 'static/[hash][ext][query]',
				},
				parser: {
					dataUrlCondition: {
						maxSize: 20 * 1024,
					},
				},
			},
			{
				test: /\.component\.svg$/,
				use: ['@svgr/webpack'],
			},
			{
				test: /(?<!\.component)\.svg$/,
				type: 'asset/resource',
			},
		],
	},
	optimization: {
		minimizer: [
			new TerserPlugin({
				extractComments: false,
				terserOptions: {
					format: {
						comments: false,
					},
				},
			}),
		],
	},
	performance: {
		maxEntrypointSize: 10000000,
		maxAssetSize: 30000000,
	},
	stats: 'errors-only',
	plugins: [
		new NodePolyfillPlugin(),
		new ProvidePlugin({
			_: ['lodash'],
			React: ['react'],
			useState: ['react', 'useState'],
			useEffect: ['react', 'useEffect'],
			useRef: ['react', 'useRef'],
			useLayoutEffect: ['react', 'useLayoutEffect'],
			useMemo: ['react', 'useMemo'],
			useCallback: ['react', 'useCallback'],
			antd: ['antd'],
			reaxper: ['#reaxes', 'Reaxper'],
			Reaxlass: ['#reaxes', 'Reaxlass'],
			Reaxes: ['#reaxes', 'Reaxes'],
			orzMobx: ['#reaxes', 'orzMobx'],
		}),
	],
};

import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import {
	method ,
	packagesRoot ,
	repoRoot ,
	rootPath,
} from './entrance.mjs';
import _ from 'lodash';
import webpack from 'webpack';

import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
