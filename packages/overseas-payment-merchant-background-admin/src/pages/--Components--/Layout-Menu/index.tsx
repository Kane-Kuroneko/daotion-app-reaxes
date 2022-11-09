export const LayoutMenu = reaxper(() => {
	const { navigate , params } = toolkits.useRouter();
	
	const { Menu } = antd;
	return (
		<div className={less.siderMenuContainer}>
			<Menu
				style={{
					height: '100%',
				}}
				selectedKeys = {params['*'].split('/')}
				items={menulist}
				onSelect={(e) => {
					navigate(e.key);
				}}
				mode="inline"
			/>
		</div>
	);
});



const menulist:ItemType[] = [
	{
		label:"主页",
		key : "overview",
		icon : <SVGMenuOverviewIcon />,
	},
	{
		label:"订单数据",
		key : "order",
		icon : <SVGMenuOrderIcon />,
		children : [
			{
				label:"代收订单",
				key : 'collection-order',
			},
			{
				label:"代付订单",
				key : 'payment-order',
			},
			{
				label:"提现订单",
				key : 'withdrawal-order',
			},
			{
				label:"充值订单",
				key : 'deposit-order',
			},
		],
	},
	{
		label:"代付管理",
		key : "payment-mgnt",
		icon : <SVGMenuPayoutIcon />,
	},
	{
		label:"操作记录",
		key : "ops-record",
		icon : <SvgMenuIconLogs />,
	},
	{
		label:"商户信息",
		key : "profile",
		icon : <SVGMenuProfileIcon />,
	},
	{
		label:"API文档",
		key : "api",
		icon : <SVGMenuApiIcon />,
	},
];

import {
	SVGMenuApiIcon ,
	SVGMenuOrderIcon ,
	SVGMenuOverviewIcon ,
	SVGMenuPayoutIcon ,
	SVGMenuProfileIcon ,
	SvgMenuIconLogs ,
} from '@@SVGcomponents';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import less from '@@root/src/styles/layout.module.less';
