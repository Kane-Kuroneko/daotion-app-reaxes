export const Layout = reaxper( () => {
	
	const urlparam = utils.decodeQueryString();
	const [,invoke_root_click] = reaxel_subs_root_click();
	const { scrollParentRef } = reaxel_scrollParentRef();
	return <>
		<div
			className = { less.HomeRoot }
			onClick = { invoke_root_click }
		>
			<div
				className = { less.leftSide }
			>
				{/*用户加入过的space列表*/ }
				<Sider_Space_List />
				{/*选中space下的插件列表 , 仅当出在host/space:spaceID时出现*/ }
				<SiderPluginListRouting />
			</div>
			
			<div
				className = { less.mainContent }
			>
				<Layout_Header />
				<>
					<div
						style = { {
							display : "flex" ,
							height : "calc(100% - 80px)" ,
							position : "static" ,
							transform : "translateX(0)" ,
							width : "100%" ,
							boxSizing : "border-box" ,
							overflow : "auto" ,
							padding : "32px" ,
							paddingBottom : "0" ,
							justifyContent : "center" ,
							flexFlow : "row nowrap" ,
							
						} }
						ref = { scrollParentRef }
					>
						<MainContentRouting />
					</div>
				</>
			</div>
			<ModalCreateSpace />
		</div>
	</>;
} );



import { Select  } from 'antd';
import { reaxel_subs_root_click } from '@@reaxels';
import { reaxel_scrollParentRef } from '@@reaxels';
import {
	MainContentRouting ,
	SiderPluginListRouting ,
} from './Routing';
import {
	Layout_Header ,
	ModalCreateSpace ,
	Sider_Space_List ,
} from '@@pages/--Components--';
import less from './styles/main.module.less';
