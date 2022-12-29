export const DepositOverview = reaxper(() => {
	const {
		fetchDepositOrderClosure
	} = reaxel_overview_order_info();
	fetchDepositOrderClosure('deposit-order');
	return (
		<OverviewOrderInfoComponent
			type='deposit-order'
		/>
	);
});
import { reaxel_overview_order_info } from "@@reaxels";
import {
	OverviewOrderInfoComponent,
} from "./index";