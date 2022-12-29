

export const App = reaxper(() => {
	
	return <ConfigProvider
		locale={locale}
	>
		<Routing/>
	</ConfigProvider>
});

import 'antd/dist/antd.less';
import './styles/main.module.less';
import { Routing } from './Routing';
import { ConfigProvider } from 'antd';
import locale from 'antd/es/locale/pt_BR';



