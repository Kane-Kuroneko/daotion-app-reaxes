import { MenuProps } from "antd";

export const Layout = reaxper(() => {
	const { Layout, Menu, Breadcrumb, Space }  = antd;
	const {  Sider, Content }  = Layout
	const { location } = toolkits.useRouter();

	const {  pathname } = location;
	const routeName = {
		'profile': '用户信息',
		'edit': '编辑信息',
		'order': '订单数据'
	};
	const breadcrumb = () => {
		const pathArr = pathname.split('/').slice(1);
		return pathArr.map((i) => {
			return {
				key: i,
				name: routeName[i]
			}
		})
	}
	const breadcrumbArr = breadcrumb()
	return <>
		<Layout>
				<LayoutHeader/>
		</Layout>
		<Layout>
			<Sider
				style={{
					backgroundColor : '#ffffff',
				}}
			>
				<LayoutMenu/>
			</Sider>
			<Content
				className={less.contentWrap}
			>
				{!(pathname === '/home' || pathname === '/profile') &&
					<Space
						direction="vertical"
						className={less.contentSpace}
						
				>
					 <Breadcrumb>
						{ breadcrumbArr.map((i) => (
							<Breadcrumb.Item key = { i.key }>
								{ i.name }
							</Breadcrumb.Item>
						)) }
					
					</Breadcrumb>
					<h2>{breadcrumbArr[breadcrumbArr.length - 1].name}</h2>
				</Space>}
				<div className={less.contentGrayBg}>
					<div className={less.contentComponents}>
						<MainContentRouting/>
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
	MenuUserIcon,
} from '@@SVGcomponents';
import React from "react";