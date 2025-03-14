export const reaxel_payment_mgnt = function(){
	const { store , setState } = orzMobx({
		payment_application_list : [],
		selectedOrders: [],
	});
	const {pendingState, setPending} = toolkits.orzPending();

	
	const fetchPaymentOrderList = async () => {
		setPending(true);
		return request_payment_mgnt_list(async function(){
			return {
				indexStart : 0 ,
				count : 999999 ,
				firstTimestamp : 0 ,
				orderID : null ,
				/*通用接口,写1是取待审核的订单*/
				orderState : 1 ,
				createTimestampBegin : null ,
				createTimestampEnd : null ,
				updateTimestampBegin : null ,
				updateTimestampEnd : null ,
			};
		}).then((data) => {
			setState({ payment_application_list : data.orderList });
			setPending(false);
		});
	};
	

	
	const [closuredFetchPaymentMgntList,clearDeps] = Reaxes.closuredMemo(() => {
		return fetchPaymentOrderList();
	} , () => []);
	
	const conductApplication = async (instruction:boolean) => {
		return request_conduct_payment_application(async function(){
			return {
				tradeIDList:  store.selectedOrders,
				agree : instruction ,
			};
		}).then((data) => {
			setState({
				payment_application_list : store.payment_application_list.filter((item) => {
					return !data.successTradeID.includes(item.orderID);
				}),
			});
			return data;
		}).catch((e) => {
			console.error(e);
			throw e;
		});
	};
	
	return () => {
		
		return {
			get paymentApplicationList(){
				return store.payment_application_list;
			},
			get loading(){
				return pendingState.pending;
			},
			get selectedOrders(){
				return store.selectedOrders;
			},
			setSelectedOrders(orders){
				setState({
					selectedOrders: orders
				})
			},
			fetchPaymentOrderList(badge){
				return closuredFetchPaymentMgntList(() => [ badge ])();
			},
			conductApplication ,
			
			
		};
	};
}();
import {
	request_payment_mgnt_list ,
	request_conduct_payment_application,
} from '@@requests';
