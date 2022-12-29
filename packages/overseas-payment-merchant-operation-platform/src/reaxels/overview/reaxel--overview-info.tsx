export const reaxel_overview_info = function(){
	let ret;	
	/*
	* 首页基本信息
	* 资金明细信息
	*/
	const {store, setState } = orzMobx({
		overviewInfo : {} as any ,
		fin_detail_list : [] as Overview__fin_detail.response['listInfo'] ,
	})
	const [fetchOverviewInfo] = Reaxes.closuredMemo(async () => {
		return request_overview_info().then((res) => {
			setState({
				overviewInfo: res
			})
		})
	}, () => []);
	const [fetchFinDetail] = Reaxes.closuredMemo( async () => {
		return request_fin_detail(async () => {
			return {
				indexStart : 0,
				count : 999999,
				firstTimestamp : 0,
			}
		}).then((data) => {
			setState({
				fin_detail_list: data.listInfo
			})
		})
	}, () => [])
	
	/**
	 * 提现相关信息及方法
	 */
	const { store: withdrawStore , setState: withdrawSetState } = orzMobx({
		withdrawApplyMoney : '' as any ,
	});
	const withdrawApply = async () => {
		const { withdrawApplyMoney = ''} = withdrawStore;
		const {overviewInfo: {address} } = store
		return request_withdraw_apply(async () => {
			return {
				money : +withdrawApplyMoney,
				address
			}
		})
	}
	
	/**
	 * 充值相关信息及方法
	 */
	const { store: depositStore, setState: depositSetState } = orzMobx({
		depositMoney : '',
		paymentAddress : '',
	})
	const depositApply = async () => {
		const { depositMoney, paymentAddress } = depositStore
		return request_deposit_apply(async () => {
			return {
				usdt : +depositMoney,
				sourceAddress: paymentAddress
			}
		})
	}
	
	
	return () => {
		return ret = {

			get overviewInfo(){
				return store.overviewInfo;
			},
			get fin_detail_list(){
				return store.fin_detail_list;
			} ,
			fetchOverviewInfo(badge){
				return fetchOverviewInfo(() => [ badge ])();
			} ,
			fetchFinDetail(badge){
				return fetchFinDetail(() => [ badge ])();
			} ,
			// 提现方法
			get withdrawStore(){
				return withdrawStore;
			} ,
			get withdrawSetState(){
				return withdrawSetState
			},
			withdrawApply(){
				return  withdrawApply();
			},
			
			//充值方法
			get depositStore(){
				return depositStore
			},
			get depositSetState(){
				return depositSetState;
			},
			deposit(){
				return depositApply()
			},
			
			
		};
	}
}();

import {
	request_overview_info ,
	request_fin_detail ,
	Overview__fin_detail ,
	request_withdraw_apply ,
	request_deposit_apply,
} from '@@requests';

