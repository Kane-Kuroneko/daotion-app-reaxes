export const PayoutOverview = reaxper(() => {
	const {
		fetchOrderCount ,
		get_enum_order_list_map,
		get_overview_duration_type,
		payoutOrder
	} = reaxel_overview_order_info();
	const {
		info : {
			totalMoney = 0 ,
			statusCount = [],
		},
		duration = 0
	} = payoutOrder || {};
	const orderType = get_enum_order_list_map('payment-order');
	const durationBtnArr = get_overview_duration_type().map(i => (
		{
			label: i.label,
			value: i.duration
		}
	));
	const { Radio } = antd;
	return (
		<div className = { less.payoutOverview }>
			<div className = { less.orderTypeTitle }>
				<span>代收</span>
				<Radio.Group
					options={durationBtnArr}
					onChange={(e) => {
						fetchOrderCount('collectionOrder', e.target.value)
					}}
					value={duration}
					optionType="button"
				/>
			</div>
			<div className = { less.totalAmount }>
				<SVGOverviewPayoutIcon />
				<div className = { less.totalAmountContent }>
					<span className = { less.totalAmountTitle }>
						代付总金额 (R$)
					</span>
					<span>
						{ totalMoney }
					</span>
				</div>
			</div>
			<div className = { less.orderInfo }>
				<span className = { less.dataTitle }>
					代付订单数据
				</span>
				<div className = { less.orderInfoList }>
					{ statusCount.map((i , index) => {
						return (
							<OrderInfoListRow
								key = { orderType[index].status }
								orderType = { orderType[index].label }
								amount = { i.orderMoney }
								orderAmount = { i.orderNum + '笔' }
							/>
						);
					}) }
				</div>
			</div>
		</div>
	);
	
});

import {
	reaxel_overview_order_info,
} from "@@reaxels";
import less from "@@pages/Overview/index.module.less";
import { SVGOverviewPayoutIcon } from "@@SVGcomponents";
import { OrderInfoListRow } from "../components";