const {
	ProvidePlugin ,
	DefinePlugin,
} = webpack;

const __ENV_CONFIG__ = (await import(`./proxy.configuration.json`,{assert: { type: 'json' }})).default;

export const webpackConfig = {
	resolve: {
		alias: {
			'@@root': path.resolve(repoRoot),
			'@@pages': path.resolve(repoRoot, 'src/pages'),
			'@@reaxels': path.resolve(repoRoot, 'src/reaxels'),
			'@@utils': path.resolve(repoRoot, 'src/utils'),
			'@@requester': path.resolve(repoRoot, 'src/requester'),
			'@@requests': path.resolve(repoRoot, 'src/requests'),
			'@@toolkits': path.resolve(repoRoot, 'src/toolkits'),
			'@@public': path.resolve(repoRoot, 'public'),
			'@@SVGcomponents': path.resolve(repoRoot, 'src/SVGcomponents'),
			'@@Xcomponents': path.resolve(repoRoot, 'src/Xcomponents'),
			'--Components--': path.resolve(repoRoot, 'src/pages/--Components--'),
		},
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(repoRoot, 'public/index.template.ejs'),
			title: repo,
			filename: 'index.html',
			minify: false,
			hash: true,
			excludeChunks: [],
			inject: false,
		}),
		new DefinePlugin({
			__IS_MOCK__ : mock ? 'true' : 'false' ,
			__ENV__ : JSON.stringify(env) ,
			__ENV_CONFIG__ : JSON.stringify(__ENV_CONFIG__) ,
			__NODE_ENV__ : JSON.stringify(node_env),
			__EXPERIMENTAL__ : JSON.stringify(experimental === 'experimental'),
		}),
		new ProvidePlugin({
			orzPromise: ['@@utils', 'orzPromise'],
			utils: ['@@utils'],
			antm: ['antd-mobile'],
			toolkits: ['@@toolkits'],
			crayon: ['@@utils', 'crayon'],
			logProxy: ['@@utils', 'logProxy'],
			decodeQueryString: ['@@utils', 'decodeQueryString'],
			encodeQueryString: ['@@utils', 'encodeQueryString'],
			stringify: ['@@utils', 'stringify'],
			request: ['@@requester', 'request'],
			I18n: ['@@reaxels/i18n', 'I18n'],
			i18n: ['@@reaxels/i18n', 'i18n'],
		}),
	],
};

import path from 'path';
import webpack from 'webpack';
import { repo, repoRoot , mock , env , node_env , experimental, } from '../../build/entrance.mjs';
import HtmlWebpackPlugin from 'html-webpack-plugin';
