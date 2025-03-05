export const XButtonShow = reaxper(() => {
	const reax_theme = reaxel_theme();
	const theme = reax_theme.theme;
	const { Space } = antd;
	
	return (
		<div>
			
			<h4 style = { { color : theme === 'dark' ? '#ffffff' : '' } }>primary</h4>
			<Space>
				
				<XButton // primary-base
					type = "primary"
					onClick = { () => {} }
				>mozi</XButton>
				<XButton // primary-frontIcon
					type = "primary"
					onClick = { () => {} }
					icon = { <SearchOutlined /> }
				>mozi</XButton>
				<XButton // primary-!frontIcon
					type = "primary"
					onClick = { () => {} }
					icon = { <SearchOutlined /> }
					frontIcon = { false }
				>mozi</XButton>
				<XButton // primary-disabled
					type = "primary"
					onClick = { () => {} }
					disabled
				>mozi</XButton>
				<XButton // primary-danger
					type = "primary"
					onClick = { () => {} }
					danger
				>mozi</XButton>
			</Space>
			<h4 style = { { color : theme === 'dark' ? '#ffffff' : '' } }>secondary</h4>
			<Space>
				<XButton // secondary-base
					type = "secondary"
					onClick = { () => {} }
				>mozi</XButton>
				<XButton // secondary-frontIcon
					type = "secondary"
					icon = { <SearchOutlined /> }
					onClick = { () => {} }
				>mozi</XButton>
				<XButton // secondary-!frontIcon
					type = "secondary"
					icon = { <SearchOutlined /> }
					frontIcon = { false }
					onClick = { () => {} }
				>mozi</XButton>
				<XButton // secondary-disabled
					type = "secondary"
					onClick = { () => {} }
					disabled
				>mozi</XButton>
				<XButton // secondary-danger
					type = "secondary"
					onClick = { () => {} }
					danger
				>mozi</XButton>
			</Space>
		</div>
	);
});

import { XButton } from '../mozi-xbutton';
import { reaxel_theme } from '@@reaxels';

import { SearchOutlined } from '@ant-design/icons';
