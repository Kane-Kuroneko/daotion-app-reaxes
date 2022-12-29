export const WithdrawOverview = reaxper(() => {
	const {
		withdrawalOrder,
		fetchWithdrawalClosure
	} = reaxel_overview_order_info();
	fetchWithdrawalClosure('withdrawal-order')
	return (
		<OverviewOrderInfoComponent
			type='withdrawal-order'
		/>
	);
});

import {
	reaxel_overview_info ,
	reaxel_overview_order_info,
} from "@@reaxels";
import less from "@@pages/Overview/index.module.less";
import { SVGOverviewWithdrawIcon } from "@@SVGcomponents";
import { OrderInfoListRow, OverviewOrderInfoComponent } from "./index";

