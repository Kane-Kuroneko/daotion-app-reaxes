export const Layout = reaxper(() => {

	const { isLoggedIn } = reaxel_user_auth();
	const { navigate , location , params } = toolkits.useRouter();
	
	


	if (!isLoggedIn) {
		return <Navigate to="/login" />;
	}
	
	const { Layout, Menu, Breadcrumb, Space } = antd;
	const { Header, Sider, Content } = Layout;
	
	
	return (
		<>
			<Layout>
				<LayoutHeader />
			</Layout>
			<Layout>
				<Sider
					style={{
						backgroundColor: '#ffffff',
					}}
				>
					<LayoutMenu />
				</Sider>
				<Content className={less.contentWrap}>
					<LayoutBreadCrumb/>
					<div className={less.contentGrayBg}>
						<div className={less.contentComponents}>
							<MainContentRouting />
						</div>
					</div>
				</Content>
			</Layout>
		</>
	);
});



export const LayoutBreadCrumb = reaxper(() => {
	const { Space, Breadcrumb, Button } = antd;
	const { navigate , params,  } = toolkits.useRouter();
	const path = params['*'].split('/');
	const pathName = params['*'];
	if (!(pathName === 'overview' || pathName.includes('profile'))) {
		return (
			<Space
				direction = "vertical"
				className = { less.contentSpace }
			>
				<Breadcrumb
					style={{
						userSelect : 'none',
					}}
				>
					{ path.length > 1 && path.map((item , index) => (
						<Breadcrumb.Item
							key = { item }
							onClick = { () => {navigate('..');} }
						>{ index !== path.length - 1
							? <Button
								type = "link"
								style = { { padding : 0 , height : 0 } }
							>{ breadcrumb_router_name[item] }</Button>
							: breadcrumb_router_name[item]
						}</Breadcrumb.Item>
					)) }
				</Breadcrumb>
				<div style = { { display : 'flex' , alignItems : 'center' , gap : '8px' } }>
					{ path.length > 1 &&
						<Button
							shape = "circle"
							onClick = { () => {
								const newPath = path;
								newPath.pop();
								navigate(`/${ newPath.join('/') }`);
							} }
							icon = { <LeftOutlined /> }
						>
						</Button>
					}
					<h2 style = { { margin : 0, userSelect : 'none' } }>{ breadcrumb_router_name[path[path.length - 1]] }</h2>
				</div>
			</Space>
		);
		
	} else {
		return <></>
	}
})

import { reaxel_user_auth } from '@@reaxels';
import { MainContentRouting } from './Routing';
import { LayoutMenu,LayoutHeader } from '@@pages/--Components--';
import { LeftOutlined } from '@ant-design/icons';
import { Navigate } from 'react-router-dom';
import less from './styles/layout.module.less';
import breadcrumb_router_name from '@@public/routers/breadcrumb-router-name.json'
