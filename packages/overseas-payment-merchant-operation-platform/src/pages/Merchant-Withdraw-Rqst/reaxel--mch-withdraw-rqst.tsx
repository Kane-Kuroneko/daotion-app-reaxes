export const reaxel_mch_withdraw_rqst = function(){
	const { store , setState } = orzMobx({
		pending : false ,
		dataList: null,
		withdrawMsgList : [] as any,
		withdrawModalVisible : false,
		verifyInfo : null as any,
		verifyPending : false,
		verifyUSDT : null,
		
	});
	
	const reax_msg_notif = reaxel_msg_notif();
	const { checkin,messageTypes,push } = reax_msg_notif;
	const { regist_BE_message } = reaxel_BE_message();
	
	regist_BE_message((messageList) => {
		const messages = messageList.filter((msg) => msg.type === "mch-withdraw-rqst");
		if(messages.length){
			crayon.green(`商户提现列表有新的申请!`);
			push(messages);
		}
	});
	
	const setPending = (type,pending) => {
		queueMicrotask(() => {
			setState({
				[type]: pending
			});
		});
	}
	
	/*请求提现列表*/
	const [ fetchWithdrawRqst , cleanWithdrawRqstDeps ] = Reaxes.closuredMemo(() => {
		return fetchWithdrawalRqstList();
	} , () => []);
	
	const fetchWithdrawalRqstList = async () => {
		setPending('pending' , true);
		return request_mch_withdraw_rqst_list(async () => {
			return {
				indexStart : 0,
				count : 999999,
				firstTimestamp : 0,
				orderID : '',
				orderState: 1,
				createTimestampBegin : null,
				createTimestampEnd : null,
				updateTimestampBegin : null,
				updateTimestampEnd : null,
			}
		}).then((res) => {
			setState({
				dataList : res.orderList ,
			});
			checkin("mch-withdraw-rqst");
			setPending('pending',false)
		})
	}
	
	/*确认提现*/
	const verifyWithdrawRqst = async (agree) => {
		const { verifyInfo: { orderID = '' }, verifyUSDT } = store;
		setPending('verifyPending' , true);
		return request_mch_withdraw_rqst(async () => {
			return {
				orderID ,
				agree ,
				usdt : + verifyUSDT,
			};
		}).then(() => {
			setPending('verifyPending' , false);
			setState({
				withdrawModalVisible : false,
				verifyUSDT: null
			})
			fetchWithdrawalRqstList();
		}).catch((e) => {
			setPending('verifyPending' , false);
			throw e;
		})
	};
	
	return () => {
		return {
			checkin(){
				checkin("mch-withdraw-rqst");
			},
			fetchWithdrawRqst (badge) {
				return fetchWithdrawRqst(() => [badge])();
			},
			get store(){
				return store;
			},
			get setState(){
				return setState;
			},
			get withdrawMsgList () {
				return reax_msg_notif.messages.filter((item) => item.type === "mch-withdraw-rqst");
			},
			cleanDeps(){
				cleanWithdrawRqstDeps();
			},
			verifyWithdrawRqst (agree) {
				return verifyWithdrawRqst(agree)
			}
		};
	};
}();

import {
	reaxel_msg_notif ,
	reaxel_BE_message,
} from '@@reaxels';
import { request_mch_withdraw_rqst_list, request_mch_withdraw_rqst } from '@@requests'
