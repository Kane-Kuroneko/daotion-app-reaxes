Error.stackTraceLimit = 30;

const webpackDevConfig = merge(webpackConfigWithRepo , webpack_devserver_config);

const webpackDevServer = () => {
	try {
		const compiler = webpack(webpackDevConfig);
		const webpackServer = new WebpackDevServer(webpack_devserver_config.devServer , compiler);
		webpackServer.start().then(() => {
			// console.log(chalk.yellow(`WDS已启动在http://${ getIPV4address() }:${ port }`));
		}).catch((e) => {
			console.error(e);
		});
	}
	catch ( e ) {
		return Promise.reject(e);
	}
	finally {
		return Promise.resolve(true);
	}
};

webpackDevServer();

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
import { webpackConfigWithRepo } from '../build/webpack.repo.config.mjs';
import { merge } from "webpack-merge";
import { webpack_devserver_config } from '../build/webpack.devserver.config.mjs';
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
