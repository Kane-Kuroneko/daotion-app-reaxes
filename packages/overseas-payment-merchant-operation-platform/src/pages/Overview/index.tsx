export const Overview = reaxper(() => {
	return (
		<>
			<OverviewInfo />
			<OrderTypeOverview />
		</>
	
	);
});
export const OrderTypeOverview = reaxper(() =>{
	return(
		<div className={less.orderTypeOverview}>
			<CollectionOverview/>
			<PayoutOverview/>
			<WithdrawOverview/>
			<DepositOverview/>
		</div>
	)
})
import less from './index.module.less'
import { OverviewInfo, CollectionOverview, PayoutOverview, WithdrawOverview, DepositOverview } from '@@pages/--Components--/Overview'
