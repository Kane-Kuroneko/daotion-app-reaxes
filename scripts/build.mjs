let now = Date.now();
console.log(chalk.yellowBright(`正在打包${ repo },请稍候...`));
const config = merge(webpackConfigWithRepo , buildWebpackConfig);
webpack_promise(config).
then(() => {
	console.log(chalk.green(`打包成功<${repo}/dist>,本次耗时${(Date.now() - now)/1000}s`));
}).
catch((reason) => {
	console.log(chalk.red(`打包失败,请在inspect模式下查看详情`));
	throw reason;
});

import {
	port ,
	repo ,
	mock ,
	env ,
	args ,
	node_env ,
	method ,
	analyze ,
	experimental ,
} from '../build/entrance.mjs';
import { webpack_promise } from '../build/toolkits.mjs';
import { webpackConfigWithRepo } from '../build/webpack.repo.config.mjs';
import webpack from 'webpack';
import buildWebpackConfig from '../build/webpack.build.config.mjs';
import { merge } from 'webpack-merge';

import chalk from 'chalk';
