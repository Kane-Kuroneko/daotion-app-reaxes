
export const OverviewOrderInfoComponent = reaxper((props : {
	type : "collection-order" | "payment-order" | "withdrawal-order" | "deposit-order",
}) => {
	const { type = 'collectionOrder'} = props;

	const {
		collectionOrder ,
		collectionOrderSetState,
		payoutOrder,
		payoutOrderSetState, 
		withdrawalOrder,
		withdrawalOrderSetState,
		depositOrder,
		depositOrderSetState,
		get_enum_order_list_map,
		get_overview_duration_type,
	} = reaxel_overview_order_info();
	
	const orderType = get_enum_order_list_map(type);

	const durationBtnArr = get_overview_duration_type().map(i => (
		{
			label: i.label,
			value: i.duration
		}
	));
	const typeCheckTitle = {
		'collection-order' : {
			text: '代收',
			store: collectionOrder,
			setState: collectionOrderSetState,
			svg: <SVGOverviewPayinIcon/>
		} ,
		'payment-order' : {
			text: '代付',
			store: payoutOrder,
			setState: payoutOrderSetState,
			svg: <SVGOverviewPayoutIcon/>
		} ,
		'withdrawal-order' : {
			text : '提现',
			store: withdrawalOrder,
			setState: withdrawalOrderSetState,
			svg: <SVGOverviewWithdrawIcon/>
		} ,
		'deposit-order' : {
			text : '充值',
			store : depositOrder,
			setState: depositOrderSetState,
			svg: <SVGOverviewPayoutIcon/>
		} ,
	};
	const {
		store,
		setState,
		text,
		svg
	} = typeCheckTitle[type];
	
	const { Radio } = antd;
	return (
		<div className = { less.payinOverview }>
			<div className = { less.orderTypeTitle }>
				<span>{ text }</span>
				<Radio.Group
					options = { durationBtnArr }
					onChange = { (e) => {
						setState({
							duration: e.target.value
						})
					} }
					value = { store.duration }
					optionType = "button"
				/>
			</div>
			<div className = { less.totalAmount }>
				{svg}
				<div className = { less.totalAmountContent }>
					<span className={less.totalAmountTitle}>
						{ text }总金额 (R$)
					</span>
					<span>
						{ store.info.totalMoney }
					</span>
				</div>
			</div>
			<div className = { less.orderInfo }>
				<span className = { less.dataTitle }>
					{ text }订单数据
				</span>
				
				<div className = { less.orderInfoList }>
					{ store.info?.statusCount?.map((i , index) => {
						return (
							<OrderInfoListRow
								key = { orderType[index + 1].status }
								orderType = { orderType[index + 1].label }
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

export const OrderInfoListRow = (props) => {
	return (
		<div className = { less.orderInfoRow }>
			<span className = { less.rowLeft }>
				{ props.orderType }
			</span>
			<div className = { less.rowRight }>
				<span className = { less.rowRightAmount }>
					{ props.amount }
				</span>
				<span className = { less.rowRightOrderAmount }>
					{ props.orderAmount }
				</span>
			</div>
		</div>
	);
};


import { reaxel_overview_order_info } from '@@reaxels';
import less from "@@pages/Overview/index.module.less";
import { SVGOverviewPayinIcon, SVGOverviewWithdrawIcon, SVGOverviewPayoutIcon } from "@@SVGcomponents";
