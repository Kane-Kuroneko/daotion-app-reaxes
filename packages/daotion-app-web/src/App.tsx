export const App = reaxper(() => {
	const { language } = reaxel_i18n();
	ConfigProvider.config( {
		theme : {
			primaryColor : '#1890ff' ,
			errorColor : '#1dd334' ,
			warningColor : '#faad14' ,
			successColor : '#52c41a' ,
			infoColor : '#1890ff' ,
		} ,
	} );
	
	return <>
		<ConfigProvider
			locale = { {
				"zh-CN" : zhCN ,
				"zh-TC" : zhTW ,
				"enUS" : enUS ,
				"en" : enUS ,
			}[language] }
		>
			<Routing />
		</ConfigProvider>
	</>;
});


import { hot } from 'react-hot-loader/root';
import enUS from 'antd/lib/locale/en_US';
import zhCN from 'antd/lib/locale/zh_CN';
import zhTW from 'antd/lib/locale/zh_TW';
import {
	Button ,
	ConfigProvider ,
	message ,
} from 'antd';
import { Test } from '@@pages/Test';
import { ReactTemplate } from '../Public/react-template';
import { Routing } from './Routing';
import {reaxel_i18n} from '@@reaxels';
// import 'antd/dist/antd.less';
import "./styles/main.module.less";
import './styles/web3-onboard.cover.less';
