const cssLoaderOptions = {
	sourceMap : true ,
	modules : {
		exportLocalsConvention : "dashes" ,
		localIdentName : "[local]--[hash:base64:4]" ,
		
	} ,
};

/**
 * @suggest dev环境建议使用全量source-map , 否则可能会导致错误栈无法定位到正确的模块
 */

/*webpack基础配置*/
export const webpack_base_config = {
	mode : method === 'server' ? 'development' : 'production' ,
	entry : {
		main : path.resolve(repoRoot , "src") ,
	} ,
	output : {
		// filename : '[name].bundle.[fullhash:6].js' ,
		/*todo*/
		filename : method === "server" ? '[name].bundle.js' : "[name].bundle.[contenthash:6].js" ,
		path : path.resolve(repoRoot , 'dist') , // publicPath : path.resolve(rootPath , 'dist') ,
	} ,
	resolve : {
		alias : {
			'react-dom' : "@hot-loader/react-dom" ,
			'mobx-react-lite' : path.resolve(rootPath , 'src/libs/mobx-react-lite/index') ,
			'@@RootPath' : path.resolve(rootPath) ,
			'@@common' : path.resolve(rootPath , 'src/common') ,
			'@@common/*' : path.resolve(rootPath , 'src/common/*') ,
			'@@toolkits' : path.resolve(rootPath , 'src/tool-kits') ,
			'@@toolkits/*' : path.resolve(rootPath , 'src/tool-kits/*') ,
			'@@Xcomponents/*' : path.resolve(rootPath , 'src/common/Xcomponents/*') ,
			'@@Xcomponents' : path.resolve(rootPath , 'src/common/Xcomponents') ,
			'@@SvgComponents/*' : path.resolve(rootPath , 'src/common/SvgComponents/*') ,
			'@@SvgComponents' : path.resolve(rootPath , 'src/common/SvgComponents') ,
			'@@utils' : path.resolve(packagesRoot , 'utils') ,
			'@@Public' : path.join(rootPath , 'Public') ,
			'@@mobxState' : path.resolve(rootPath , 'src/common/MobxState.ts') ,
			'@@components' : path.resolve(rootPath , 'src/utils/components/index.ts') ,
			'@@components/*' : path.resolve(rootPath , 'src/utils/components/*') ,
			'@@pages' : path.resolve(rootPath , 'src/pages') ,
			'@@reaxels' : path.resolve(rootPath , 'src/reaxels') ,
			'@@reaxels/*' : path.resolve(rootPath , 'src/reaxels/*') ,
			'@@requester' : path.resolve(rootPath , 'src/common/requester') ,
			'@@requests' : path.resolve(rootPath , 'src/requests') ,
			'@@requests/*' : path.resolve(rootPath , 'src/requests/*') , // "magic-sdk" : path.resolve(rootPath , "node_modules/magic-sdk/dist/cjs/index.js") ,
			// '@@common/requests' : path.resolve(rootPath , 'src/common/requests/index.ts') ,
			// '@@common/routes' : path.resolve(rootPath , 'src/common/routes/index.ts') ,
			
		} ,
		extensions : [
			'.ts' ,
			'.tsx' ,
			'.js' ,
			'.jsx' ,
			'.json' ,
		] ,
	} ,
	devtool : 'cheap-source-map' ,
	cache : {
		type : "memory" ,
		maxGenerations : 2 ,
	} ,
	module : {
		rules : [
			{
				test : /\.m?js$/ ,
				resolve : {
					fullySpecified : false ,
				} ,
			} ,
			{
				test : /\.(jsx?|tsx?)$/ ,
				use : {
					loader : 'babel-loader' ,
				} ,
				exclude : /node_modules/ ,
			} ,
			{
				test : /\.module\.less$/ ,
				use : [
					{
						loader : 'style-loader' ,
					} ,
					{
						loader : 'css-loader' ,
						options : cssLoaderOptions ,
					} ,
					{
						loader : 'less-loader' ,
						options : {
							sourceMap : true ,
							lessOptions : {
								javascriptEnabled : true ,
							} ,
						} ,
					} ,
				] ,
			} ,
			{
				test : /(?<!(\.module|\.theme))\.less$/ ,
				use : [
					{
						loader : 'style-loader' ,
					} ,
					{
						loader : 'css-loader' ,
						options : _.pick(cssLoaderOptions , ["sourceMap"]) ,
					} ,
					{
						loader : 'less-loader' ,
						options : {
							sourceMap : true ,
							lessOptions : {
								javascriptEnabled : true ,
							} ,
						} ,
					} ,
				] ,
			} ,
			{
				test : /\.module\.css$/ ,
				use : [
					{
						loader : 'style-loader' ,
					} ,
					{
						loader : 'css-loader' ,
						options : cssLoaderOptions ,
					} ,
				] ,
			} ,
			{
				test : /(?<!(\.module|\.theme))\.css$/ ,
				use : [
					{
						loader : 'style-loader' ,
					} ,
					{
						loader : 'css-loader' ,
						options : _.pick(cssLoaderOptions , ["sourceMap"]) ,
					} ,
				] ,
			} ,
			{
				test : /\.theme\.(le|c)ss$/ , // type :  "asset/source",
				use : [
					{
						loader : 'css-loader' ,
						options : _.pick(cssLoaderOptions , ["sourceMap"]) ,
					} ,
					{
						loader : 'less-loader' ,
						options : {
							sourceMap : true ,
							lessOptions : {
								javascriptEnabled : true ,
							} ,
						} ,
					} ,
				] ,
			} ,
			{
				test : /\.(png|jpe?g|te?xt|gif|woff|woff2|eot|ttf|otf|bmp|swf)$/ ,
				type : "asset/resource" ,
				generator : {
					filename : 'static/[hash][ext][query]' ,
				} ,
				parser : {
					dataUrlCondition : {
						maxSize : 20 * 1024 ,
					} ,
				} ,
			} ,
			{
				test : /\.component\.svg$/ ,
				use : ["@svgr/webpack"] ,
				
			} ,
			{
				test : /(?<!\.component)\.svg$/ ,
				type : "asset/resource" ,
				
			} ,
		] ,
	} ,
	optimization : {
		minimizer : [
			new TerserPlugin({
				extractComments : false ,
				terserOptions : {
					format : {
						comments : false ,
					} ,
				} ,
			}) ,
		] ,
	} ,
	performance : {
		maxEntrypointSize : 10000000 ,
		maxAssetSize : 30000000 ,
	} ,
	stats : 'errors-only' ,
	plugins : [
		new NodePolyfillPlugin() ,
	] ,
};


import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import {
	method ,
	repoRoot ,
	rootPath ,
	packagesRoot,
} from './entrance.mjs';
import _ from 'lodash';

import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
