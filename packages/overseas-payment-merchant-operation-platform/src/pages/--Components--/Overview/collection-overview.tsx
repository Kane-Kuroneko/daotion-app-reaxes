export const CollectionOverview = reaxper(() => {
	const {
		fetchCollectionOrderClosure
	} = reaxel_overview_order_info();
	fetchCollectionOrderClosure('collection-order');
	return (
		<OverviewOrderInfoComponent
			type='collection-order'
		/>
	);
});
import { reaxel_overview_order_info } from "@@reaxels";
import {
	OverviewOrderInfoComponent,
} from "./index";