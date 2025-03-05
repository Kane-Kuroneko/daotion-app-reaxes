

export const App = reaxper(() => {
	const { language } = reaxel_i18n();
	return <ConfigProvider
		locale={{
			"zh-CN" : locale_zh_CN,
			"en-US" : locale_en_US
		}[language]}
	>
		<Routing/>
	</ConfigProvider>
});

import 'antd/dist/antd.less';
import './styles/main.module.less';
import { Routing } from './Routing';
import { ConfigProvider } from 'antd';
import { reaxel_i18n } from '@@reaxels';
import locale_zh_CN from 'antd/es/locale/zh_CN';
import locale_en_US from 'antd/es/locale/en_US';
