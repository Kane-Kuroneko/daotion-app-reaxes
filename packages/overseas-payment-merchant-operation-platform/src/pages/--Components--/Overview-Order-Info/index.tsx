export const OverviewOrderInfoComponent = reaxper((props : {
	type : "collection-order" | "payment-order" | "withdrawal-order" | "deposit-order",
}) => {
	const { type = 'collectionOrder' } = props;
	
	const {
		collectionOrder ,
		collectionOrderSetState ,
		payoutOrder ,
		payoutOrderSetState ,
		withdrawalOrder ,
		withdrawalOrderSetState ,
		depositOrder ,
		depositOrderSetState ,
		get_enum_order_list_map ,
		get_overview_duration_type ,
	} = reaxel_overview_order_info();
	
	const orderType = get_enum_order_list_map(type);
	
	const durationBtnArr = get_overview_duration_type().map(i => (
		{
			label : i.label ,
			value : i.duration ,
		}
	));
	const typeCheckTitle = {
		'collection-order' : {
			text : '代收' ,
			store : collectionOrder ,
			setState : collectionOrderSetState ,
			svg : <SVGOverviewPayinIcon /> ,
		} ,
		'payment-order' : {
			text : '代付' ,
			store : payoutOrder ,
			setState : payoutOrderSetState ,
			svg : <SVGOverviewPayoutIcon /> ,
		} ,
		'withdrawal-order' : {
			text : '提现' ,
			store : withdrawalOrder ,
			setState : withdrawalOrderSetState ,
			svg : <SVGOverviewWithdrawIcon /> ,
		} ,
		'deposit-order' : {
			text : '充值' ,
			store : depositOrder ,
			setState : depositOrderSetState ,
			svg : <SVGOverviewIconDeposit/> ,
		} ,
	};
	const {
		store ,
		setState ,
		text ,
		svg ,
	} = typeCheckTitle[type];
	
	const { Radio } = antd;
	
	
	return (
		<div className = { less.orderTypeOverviewContainer }>
			<div className = { less.orderTypeTitle }>
				<span>{ text }</span>
				<Radio.Group
					options = { durationBtnArr }
					onChange = { (e) => {
						setState({
							duration : e.target.value ,
						});
					} }
					value = { store.duration }
					optionType = "button"
					style={{
						userSelect : 'none',
					}}
				/>
			</div>
			{store.info && !store.loading
				? <>
					<div className = { less.totalAmount }>
						{ svg }
						<div className = { less.totalAmountContent }>
							<span className = { less.totalAmountTitle }>
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
				</>
				: <OrderInfoSkeleton/>
			}
			
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

export const OrderInfoSkeleton = reaxper(() => {
	
	const { Skeleton } = antd;
	
	return (
		<div
			style = { {
				display : "flex" ,
				flexDirection : "column" ,
				gap : 24 ,
				width: '100%',
				marginTop: '16px'
			} }
		>
			<div style={{
				display : 'flex',
				alignItems : 'center',
				gap : '16px',
				marginBottom: 24
			}} >
				<Skeleton.Avatar active size={'large'} />
				<div style={{
					display: "flex",
					flexDirection: "column",
				}}>
					<Skeleton.Button active style={{ width: 100, height: 20 }}/>
					<Skeleton.Button active style={{ width: 184, height: 35 }}/>
				</div>
			</div>
			<Skeleton.Button active style={{width: 100, height: 20}}/>
			{[0, 1, 2, 3].map((item, id) => {
				return(
					<div
						key={id}	
						style={{
						display: "flex",
						flexDirection: "column",
						width: '100%',
						marginBottom: 16,
						textAlign: "right"
					}}>
						<Skeleton.Button
							style = { { width : '100%' , height : 20} }
							active
						/>
						<Skeleton.Button
							style = { { width : 100  , height : 20 } }
							active
						/>
					</div>
				)
			})}
		</div>
	)
});


import { reaxel_overview_order_info } from '@@reaxels';
import less from "./index.module.less";
import {
	SVGOverviewPayinIcon ,
	SVGOverviewWithdrawIcon ,
	SVGOverviewPayoutIcon ,
	SVGOverviewIconDeposit ,
} from "@@SVGcomponents";

