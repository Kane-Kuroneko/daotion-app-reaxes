export const reaxel_collection_order = function(){
	let ret;
	const initialSearch = {
		/*以下是表单搜索区域*/
		input_search_orderID : "",
		range_picker_order_created_date : [] ,
		range_picker_order_updated_date : [] ,
		select_order_status : 0 ,
	};
	const initialOrderList = {
		pending:false,
		/*表单数据*/
		collection_order_list : [] as Order__collection_order.response["orderList"],
	}
	const { store : store$search , setState : setState$search } = orzMobx(initialSearch);
	const { store : store$orderList , setState : setState$orderList } = orzMobx(initialOrderList);
	
	const { store , setState } = orzMobx({
		processModalShow : false ,
	});
	
	const setPending = (pending) => {
		// setState$orderList({ pending })
		queueMicrotask(() => setState$orderList({ pending }));
	};
	const {grasp:fetchCollectionOrder} = reaxel_fact__prevent_dup_request((preventDup) => async (path) => {
		const fetchMap = {
			"collection-order" : request_collection_order,
			"payment-order" : request_payment_order,
			"withdrawal-order" : request_withdrawal_order,
			"deposit-order" : request_deposit_order,
		};
		setPending(true);
		return fetchMap[path](async () => {
			return {
				indexStart : 0,
				count : 999999,
				firstTimestamp : 0,
				orderID : store$search.input_search_orderID,
				orderState : store$search.select_order_status,
				createTimestampBegin : null,
				createTimestampEnd : null,
				updateTimestampBegin : null,
				updateTimestampEnd : null,
			} as any;
		}).then((data) => {
			preventDup(() => {
				setState$orderList({ collection_order_list : data.orderList });
				setPending(false);
				currentPath = path;
			});
			return data;
		}).catch((e) => {
			preventDup(() => {
				setPending(false);
			});
			throw e;
		});
	})();
	
	const [closuredFetch , clearDeps] = Reaxes.closuredMemo((path) => {
		fetchCollectionOrder(path);
	} , () => []);
	/*记录当前是什么订单列表,如果和当前请求的列表不匹配collection_order_list就会返回空*/
	let currentPath;
	return (path) => {
		
		return ret = {
			get state$search(){
				return store$search;
			},
			get pending(){
				return store$orderList.pending;
			},
			get collection_order_list(){
				Reaxes.collectDeps(store$orderList);
				if(path && path !== currentPath){
					return [];
				}
				if(store$orderList.pending){
					return [];
				}
				return store$orderList.collection_order_list;
			},
			get setFields(){
				return setState$search;
			},
			get processModalShow(){
				return store.processModalShow;
			},
			get_enum_order_list_map(path){
				return {
					"collection-order" : enum_collection_order_status,
					"payment-order" : enum_payment_order_status,
					"withdrawal-order" : enum_withdrawal_order_status,
					"deposit-order" : enum_deposit_order_status,
				}[path];
			},
			fetchCollectionOrderList(path){
				return closuredFetch(() => [
					store$search.input_search_orderID ,
					store$search.select_order_status ,
					path 
				])(path);
			},
			resetSearch(){
				setState$search(initialSearch);
			},
			resetFetchDeps(){
				clearDeps();
			},
			/*切换订单进度modal*/
			changeModalShow(status : boolean){
				setState({
					processModalShow : status ,
				});
			},
			
		};
	};
}();

import {
	request_collection_order ,
	Order__collection_order ,
	request_payment_order ,
	request_withdrawal_order,
	request_deposit_order,
} from '@@requests';
import { reaxel_fact__prevent_dup_request } from '#reaxels';

import enum_collection_order_status from '@@public/enums/colloection-order-status.json';
import enum_payment_order_status from '@@public/enums/payment-order-status.json';
import enum_withdrawal_order_status from '@@public/enums/withdrawal-order-status.json';
import enum_deposit_order_status from '@@public/enums/deposit-order-status.json';
