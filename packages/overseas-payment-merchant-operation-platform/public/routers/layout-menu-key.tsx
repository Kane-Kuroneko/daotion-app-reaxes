

 export const MenuList:ItemType[] = [
	{
		label:"主页",
		key : "overview",
		icon : <SVGMenuOverviewIcon/>,
	},
	{
		label:"订单数据",
		key : "order",
		icon : <SVGMenuOrderIcon/>,
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
		label:"商户提现申请",
		key : "mch-withdraw-rqst",
		icon : <SVGMenuIconWithdrawalApply />,
	},
	{
		label:"商户充值申请",
		key : "mch-deposit-rqst",
		icon : <SVGMenuIconDepositApply />,
	},
	{
		label:"商户管理",
		key : "mch-mgnt",
		icon : <SVGMenuIconMerchantMgnt />,
	},
	{
		label:"成员管理",
		key : "user-mgnt",
		icon : <SVGMenuIconUserMgnt />,
	},
	{
		label:"系统设置",
		key : "setting",
		icon : <SVGMenuIconSetting />,
	},
];

import { ItemType } from "antd/es/menu/hooks/useItems";
import {
	SVGMenuIconDepositApply ,
	SVGMenuIconMerchantMgnt ,
	SVGMenuIconSetting ,
	SVGMenuIconUserMgnt ,
	SVGMenuIconWithdrawalApply ,
	SVGMenuOrderIcon ,
	SVGMenuOverviewIcon ,
} from "@@SVGcomponents";