export const LayoutHeader = reaxper(() => {
	const { navigate } = toolkits.useRouter();
	const reax_user_info = reaxel_user_info();
	const { logout } = reaxel_user_auth();
	const { tz , setTz } = reaxel_timezone();
	const { now } = reaxel_global();	
	const { Select , Dropdown , Menu } = antd;
	return (
		<div className = { less.layoutHeader }>
			<SVGHeaderDepayLogo />
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
						<SVGTimezoneIcon />
						<span>{tz === "Asia/Shanghai"
							? <>
								<span>中国标准时间:</span>
								<br/>
								<span>UTC+08:00</span>
							</>
							: <>
								<span>巴西时间:</span>
								<br/>
								<span>UTC-03:00</span>
							</>
						}</span>
						<div className = {less.timeNow}>
							<Timezone format >
								{now}
							</Timezone>
						</div>
					</div>
				</Dropdown>
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
	timezone ,
	Timezone ,
	reaxel_timezone ,
	reaxel_global,
} from '@@reaxels';
import {
	SVGHeaderAvatar ,
	SVGHeaderDepayLogo ,
	SVGHeaderLogoutIcon ,
	SVGHeaderResetpwdIcon ,
	SVGTimezoneIcon ,
} from '@@SVGcomponents';
import {DownOutlined} from '@ant-design/icons'
import less from './index.module.less'
