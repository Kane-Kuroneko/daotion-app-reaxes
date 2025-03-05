export const LayoutHeader = reaxper(() => {
	const { navigate } = toolkits.useRouter();
	const reax_user_info = reaxel_user_info();
	const { logout } = reaxel_user_auth();
	const { tz , setTz } = reaxel_timezone();
	const { now } = reaxel_tick_tock();	
	const { Select , Dropdown , Menu } = antd;
	return (
		<div className = { less.layoutHeader }>
			<SVGHeaderRiverpayLogo />
			<div className = { less.layoutHeaderRight }>
				
				<Dropdown
					overlay = { <Menu
						items = { [
							{
								key: 0,
								label : <div
									onClick = { () => {
										setTz(tz === "Asia/Shanghai" ? "America/Sao_Paulo" : "Asia/Shanghai");
									} }
								>切换为{tz === "Asia/Shanghai" ? "巴西时区" : "中国时区"}</div>,
							},
						] }
					/> }
				>
					<div className = { less.headerTime }>
						<div style={{marginRight: '24px'}}>
							<Timezone format >
								{now}
							</Timezone>
						</div>
						{tz === "Asia/Shanghai"
							? <SVGHeaderTimezoneChina/>
							: <SVGHeaderTimezoneBrazil/>
						}
						<span>{tz === "Asia/Shanghai"
							? '中国时区'
							: '巴西时区'
						}</span>
						<DownOutlined />
						
					</div>
				</Dropdown>
				<MessageBox/>
				<div className = { less.userSelect }>
					<Dropdown
						overlay = { <Menu
							items = { [
								{
									label : <span
										className = { less.resetPwd }
										onClick = { () => {
											navigate('/profile/reset-pwd');
										} }
									>
										<SVGHeaderResetpwdIcon />
										<span>修改密码</span>
									</span> ,
									key : "change-pwd" ,
								} ,
								{
									label : <span
										className = { less.logout }
										onClick = { () => {
											logout();
										} }
									>
										<SVGHeaderLogoutIcon />
										<span>退出登录</span>
									</span> ,
									key : "logout" ,
								} ,
							] }
						/>
						}
					
					>
						<a
							className = { less.userInfo }
							onClick = { e => e.preventDefault() }
						>
							<SVGHeaderAvatar />
							{ reax_user_info?.userInfo?.name || 'mozi' }
							<DownOutlined />
						</a>
					</Dropdown>
				</div>
			</div>
		</div>
	);
})

import {
	reaxel_user_info ,
	reaxel_user_auth ,
	Timezone ,
	reaxel_timezone ,
	reaxel_tick_tock,
} from '@@reaxels';
import { MessageBox } from '@@pages/--Components--/Message-Box';
import {
	SVGHeaderAvatar ,
	SVGHeaderRiverpayLogo ,
	SVGHeaderLogoutIcon ,
	SVGHeaderResetpwdIcon ,
	SVGHeaderTimezoneBrazil ,
	SVGHeaderTimezoneChina ,
} from '@@SVGcomponents';
import { DownOutlined } from '@ant-design/icons';
import less from './index.module.less';
