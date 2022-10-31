import { MenuProps } from "antd";
import {useNavigate , Navigate} from 'react-router-dom';
export const Layout = reaxper(() => {
	const { isLoggedIn } = reaxel_user_auth();
	const { navigate , location } = toolkits.useRouter();
	
	if(!isLoggedIn){
		return <Navigate to = "/login" />;
	}
	
	const routeName = {
		'profile' : '用户信息' ,
		'edit': '编辑信息',
		'payOutOrder' : '代付订单',
		'payInOrder' : '代收订单',
		'payout' : '代付管理',
		'home' : '主页',
		'financialDetail' : '资金明细',
		
		
	};
	const breadcrumb = () => {
		const pathArr = pathname.split('/').slice(1);
		return pathArr.map((i) => {
			return {
				key : i ,
				name : routeName[i],
			};
		});
	};
	const { pathname } = location;
	const breadcrumbArr = breadcrumb();
	const { Layout , Menu , Breadcrumb , Space } = antd;
	const { Header , Sider , Content } = Layout;
	return <>
		<Layout>
			<LayoutHeader />
		</Layout>
		<Layout>
			<Sider
				style = { {
					backgroundColor : '#ffffff' ,
				} }
			>
				<LayoutMenu/>
			</Sider>
			<Content
				className={less.contentWrap}
			>
				{ !(
					pathname === '/home' || pathname === '/profile'
				) &&
					<Space
					direction = "vertical"
						className={less.contentSpace}
						
				>
					<Breadcrumb>
						{ breadcrumbArr.map((i) => (
							<Breadcrumb.Item key = { i.key }>
								{ i.name }
							</Breadcrumb.Item>
						)) }
					
					</Breadcrumb>
					<h2>{ breadcrumbArr[breadcrumbArr.length - 1].name }</h2>
				</Space> }
				<div className={less.contentGrayBg}>
					<div className={less.contentComponents}>
						<MainContentRouting />
					</div>
				</div>
			</Content>
		</Layout>
	
	</>;
} );


export const LayoutMenu = reaxper(() => {
	const { Menu } = antd;
	type MenuItem = Required<MenuProps>['items'][number];
	const { navigate } = toolkits.useRouter()
	
	const getItem = (
		label : React.ReactNode ,
		key : React.Key | null ,
		icon? : React.ReactNode ,
		children? : MenuItem[] ,
	) : MenuItem => (
		{
			key ,
			label ,
			icon ,
			children,
		} as MenuItem
	);
	const items : MenuItem[] = [
		getItem('主页' , 'home' , <MenuHomeIcon />) ,
		getItem('订单数据' , 'order' , <MenuOrderIcon /> , [ getItem('代收订单' , 'payInOrder') , getItem('代付订单' , 'payOutOrder') ], ) ,
		getItem('代付管理' , 'payout' , <MenuPayoutIcon />) ,
		getItem('商户信息' , 'profile' , <MenuUserIcon />) ,
		getItem('API文档' , 'api' , <MenuApiIcon />),
	];
	return (
		<Menu
			style={{
				height : '100%',
			}}
			items={items}
			onSelect={(e) => {
				navigate(e.key)
			}}
			mode='inline'
			// openKeys={['order']}
		/>
	)
})

import {reaxel_user_auth} from '@@reaxels';
import {
	MainContentRouting ,
} from './Routing';
import {
	LayoutHeader ,
} from './pages/--Components--/Layout-Header';
import less from './styles/layout.module.less';
import {
	MenuApiIcon ,
	MenuHomeIcon ,
	MenuOrderIcon ,
	MenuPayoutIcon ,
	MenuUserIcon ,
} from '@@SVGcomponents';
import React from "react";