export const PayoutOverview = reaxper(() => {
	const {
		payoutOrder ,
		fetchPayoutOrderClosure,
	} = reaxel_overview_order_info();
	fetchPayoutOrderClosure('payment-order')
	return (
		<OverviewOrderInfoComponent
			type='payment-order'
		/>
	);
	
});

import {
	reaxel_overview_order_info,
} from "@@reaxels";
import { OverviewOrderInfoComponent } from "./index";