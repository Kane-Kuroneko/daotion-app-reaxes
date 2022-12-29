


/**
 * 此文件是所有打包行为的入口,为后续流程提供依赖
 */

export const args = process.argv.slice(2);

export const port = await getPort();

export let {
	repo = null,
	mock = null,
	analyze = false ,
	method = "server" ,
	env = "unset",
	node_env = "development",
	experimental = null ,
} = overload(args , [
	{
		regExp : /\bdaotion-app-web|daotion-demo-web|daotion-honmepage-web|overseas-payment-cashier|overseas-payment-merchant-background-admin|overseas-payment-merchant-operation-platform\b/ ,
		key : "repo" ,
	} ,
	{
		regExp : /\bmock\b/ ,
		key : "mock" ,
	} ,
	{
		regExp : /\banalyze\b/ ,
		key : "analyze" ,
	} ,
	{
		regExp : /\bbuild|server\b/ ,
		key : "method" ,
	} ,
	{
		/*网络请求环境*/
		regExp : /\bserver_yang|server_dev|server_production\b/ ,
		key : "env" ,
	} ,
	{
		/*网络请求环境*/
		regExp : /\bdevelopment|production\b/ ,
		key : "node_env" ,
	} ,
	{
		/*是否开启实验特性*/
		regExp : /\bexperimental\b/i ,
		key : "experimental" ,
	} ,
]);

/*如果没有明确指定node_env:  npm.server下自动dev,npm.build是production*/
if ( !node_env ) {
	if(method === "server"){
		node_env = 'development';
	}else {
		node_env = 'production';
	}
}else if(node_env === "production"){
	
}
/*如果是dev环境则默认开启实验特性,除非明确说明*/
if ( !experimental ) {
	// node_env === 'development' ? experimental = 'experimental' : experimental = 'non-exp';
	experimental = 'non-exp';
}

export const rootPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../');

export const repoRoot = path.resolve(rootPath , `packages/${ repo }`);

export const packagesRoot = path.resolve(rootPath , `packages`);

/*定义那些是业务模块,*/
export const repoPackages = [
	"daotion-app-web" ,
	"daotion-demo-web" ,
	"daotion-honmepage-web" ,
	"overseas-payment-cashier" ,
	"overseas-payment-merchant-background-admin" ,
	"overseas-payment-merchant-operation-platform" ,
];
/*非业务模块不可被打包,因为webpack.base.config.mjs里配置了对通用模块的alias,*/
if(repoPackages.every((repoName) => repoName !== repo )){
	throw new Error(`this repo "${ repo }" is not a valid business package`);
}


import {
	getPort ,
	overload,
} from './toolkits.mjs';
import { fileURLToPath } from "url";
import path from "path";
import { merge } from "webpack-merge";
