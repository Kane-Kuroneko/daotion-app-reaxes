import { Reaxel_i18n } from '#reaxels';

const languageList = [
	{
		lang:"zh-CN",
		name:"简体中文",
		module:null,
	},
	{
		lang:"pt-BR",
		name:"Portuguese",
		module : () => import('@@public/lang/pt-br.json'),
	},
];

export const reaxel_i18n = Reaxel_i18n(
	"zh-CN" ,
	languageList,
);

export const {
	i18n ,
	I18n,
} = reaxel_i18n();
