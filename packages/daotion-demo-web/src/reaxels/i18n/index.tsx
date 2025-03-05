export const reaxel_i18n = Reaxel_i18n('en' , [
	{
		name : "English",
		lang : 'en-US',
		module : null,
	},
	{
		name : "简体中文",
		lang : 'zh-CN',
		module : () => import('@@public/lang/lang_zh-CN.json')
	},
]);

export const { I18n , i18n  } = reaxel_i18n();

import { Reaxel_i18n } from '#reaxels';
