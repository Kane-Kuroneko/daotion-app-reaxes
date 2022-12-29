import path from 'path';
import webpack from 'webpack';
import { repoRoot } from '/build/entrance.mjs';

const { ProvidePlugin } = webpack;

export const webpackConfig = {
	resolve: {
		alias: {
			'@@pages': path.resolve(repoRoot, 'src/pages'),
			'@@reaxels': path.resolve(repoRoot, 'src/reaxels'),
			'@@requester': path.resolve(repoRoot, 'src/requester'),
			'@@toolkits': path.resolve(repoRoot, 'src/toolkits'),
			'@@public': path.resolve(repoRoot, 'public'),
			'@@Xcomponents': path.resolve(repoRoot, 'src/Xcomponents'),
			'--Components--': path.resolve(repoRoot, 'src/pages/--Components--'),
		},
	},
	plugins: [
		new ProvidePlugin({
			orzPromise: ['@@utils', 'orzPromise'],
			utils: ['@@utils'],
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
