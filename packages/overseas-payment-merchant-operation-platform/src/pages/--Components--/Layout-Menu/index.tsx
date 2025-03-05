export const LayoutMenu = reaxper(() => {
	const { navigate , params } = toolkits.useRouter();
	
	const openKeys = recursive(MenuList , params['*'].split('/').pop());
	
	const { Menu } = antd;
	return (
		<div className = { less.siderMenuContainer }>
			<Menu
				style = { {
					height : '100%' ,
					userSelect : 'none',
				} }
				selectedKeys = { params['*'].split('/') }
				items = { MenuList }
				defaultOpenKeys = { openKeys }
				onSelect = { (e) => {
					navigate(e.key);
				} }
				mode = "inline"
			/>
		</div>
	);
});

const recursive = (list,subKey) => {
	for(const item of list){
		if(item.children){
			if(item.children.find(({key}) => subKey)){
				return [item.key];
			}
		}
	}
	return [];
};
import less from '@@root/src/styles/layout.module.less';
import { MenuList } from '@@public/routers/layout-menu-key'
