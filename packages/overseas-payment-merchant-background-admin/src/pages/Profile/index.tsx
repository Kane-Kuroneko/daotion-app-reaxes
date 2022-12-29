export const Profile = reaxper(() => {
	
	return (
		<div className = { less.profile }>
			<Menu />
			<div className = { less.profileContent }>
				<ProfileRouting />
			</div>
		</div>
	);
});

const Menu = reaxper(() => {
	
	const { navigate , params } = toolkits.useRouter();
	
	const { Menu } = antd;
	return (
		<Menu
			style = { { width : 208 } }
			selectedKeys = {[params["*"]]}
			onSelect = { (e) => {
				navigate(e.key);
			} }
			items = { [
				{
					label : "基本信息" ,
					key : "base-info" ,
				},
				{
					label : "修改密码" ,
					key : "reset-pwd" ,
				},
				{
					label : "API对接" ,
					key : "API" ,
				},
			] }
		/>
	);
});


import { ProfileRouting } from '@@pages/../Routing';
import less from './index.module.less';
