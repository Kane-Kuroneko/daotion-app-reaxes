import { request_overview_order_count } from "@@requests";

export const reaxel_overview_order_info = function(){
	let ret;
	/*
* 首页各个类型订单统计信息
*/
	const { store: collectionOrder$store, setState: collectionOrder$setState } = orzMobx({
		info : {} as any,
		duration : 0,
	})
	
	const { store: payoutOrder$store, setState: payoutOrder$setState } = orzMobx({
		info : {} as any,
		duration : 0,
	})
	
	const { store: withdrawalOrder$store, setState: withdrawalOrder$setState } = orzMobx({
		info : {} as any,
		duration : 0,
	})
	
	const { store: depositOrder$store, setState: depositOrder$setState } = orzMobx({
		info : {} as any,
		duration : 0,
	})
	
	const [fetchOrderCountClosure ] = Reaxes.closuredMemo(async (pageType, duration) => {
		return request_overview_order_count(async () => {
			const orderType = enum_overview_order_type.find(i => (i.pagePath === pageType)).type
			return {
				orderType ,
				duration ,
			};
		})
	} , () => []);
	
	return () => {
		return ret = {
			get collectionOrder(){
				return collectionOrder$store
			},
			get collectionOrderSetState(){
				return collectionOrder$setState
			},
			get payoutOrder(){
				return payoutOrder$store
			},
			get payoutOrderSetState(){
				return payoutOrder$setState
			},
			get withdrawalOrder(){
				return withdrawalOrder$store
			},
			get withdrawalOrderSetState(){
				return withdrawalOrder$setState
			},
			get depositOrder(){
				return depositOrder$store
			},
			get depositOrderSetState(){
				return depositOrder$setState
			},
			get_enum_order_list_map(path){
				return {
					"collection-order" : enum_collection_order_status,
					"payment-order" : enum_payment_order_status,
					"withdrawal-order" : enum_withdrawal_order_status,
					"deposit-order" : enum_deposit_order_status,
				}[path];
			},
			get_overview_duration_type () {
				return enum_overview_duration_type
			},
			fetchCollectionOrderClosure(pageType ){
				return fetchOrderCountClosure(() => [pageType, collectionOrder$store.duration])(pageType, collectionOrder$store.duration).then((res) => {
					collectionOrder$setState({
						info: res.countInfo
					})
				});
			} ,
			fetchPayoutOrderClosure(pageType ){
				return fetchOrderCountClosure(() => [pageType, payoutOrder$store.duration])(pageType, payoutOrder$store.duration).then(res => {
					payoutOrder$setState({
						info: res.countInfo
					})
				});
			} ,
			fetchWithdrawalClosure(pageType){
				return fetchOrderCountClosure(() => [pageType,withdrawalOrder$store.duration])(pageType, withdrawalOrder$store.duration).then(res => {
					withdrawalOrder$setState({
						info: res.countInfo
					})
				});
			} ,
			fetchDepositOrderClosure( pageType){
				return fetchOrderCountClosure(() => [pageType, depositOrder$store.duration])(pageType, depositOrder$store.duration).then(res => {
					depositOrder$setState({
						info: res.countInfo
					})
				}) ;
			} ,
		}
	}
}();


import enum_collection_order_status from '@@public/enums/colloection-order-status.json';
import enum_payment_order_status from '@@public/enums/payment-order-status.json';
import enum_withdrawal_order_status from '@@public/enums/withdrawal-order-status.json';
import enum_deposit_order_status from '@@public/enums/deposit-order-status.json';
import enum_overview_duration_type from '@@public/enums/overview-order-duration-type.json';
import enum_overview_order_type from '@@public/enums/overview-order-type.json';