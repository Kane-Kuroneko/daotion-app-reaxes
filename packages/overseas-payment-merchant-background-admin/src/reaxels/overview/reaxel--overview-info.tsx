export const reaxel_overview_info = function(){
	let ret;	
	/*
	* 首页基本信息
	* 资金明细信息
	*/
	const {store, setState } = orzMobx({
		overviewInfoPending : false,
		overviewInfo : null as any ,
		finDetailPending : false,
		fin_detail_list : [] as Overview__fin_detail.response['listInfo'] ,
	})
	
	const setOverviewInfoPending = (pending) => {
		queueMicrotask(() => {
			setState({
				overviewInfoPending: pending
			})
		})
	}
	const setFinDetailPending = (pending) => {
		queueMicrotask(() => {
			setState({
				finDetailPending: pending
			})
		})
	}
	
	const [fetchOverviewInfo] = Reaxes.closuredMemo(async () => {
		if(store.overviewInfoPending) return;
		setOverviewInfoPending(true)
		return request_overview_info().then((res) => {
			setState({
				overviewInfo : res ,
			});
			setOverviewInfoPending(false)
		})
	}, () => []);
	const [fetchFinDetail] = Reaxes.closuredMemo( async () => {
		if (store.finDetailPending) return;
		setFinDetailPending(true);
		return request_fin_detail(async () => {
			return {
				indexStart : 0,
				count : 999999,
				firstTimestamp : 0,
			}
		}).then((data) => {
			setState({
				fin_detail_list : data.listInfo,
			})
			setFinDetailPending(false);
		})
	}, () => [])
	
	/**
	 * 提现相关信息及方法
	 */
	const { store: withdrawStore , setState: withdrawSetState } = orzMobx({
		withdrawApplyMoney : '' as any ,
		pending : false,
		
	});
	const setWithdrawPending = (pending) => {
		queueMicrotask(() => {
			withdrawSetState({
				pending,
			});
		});
	};
	const withdrawApply = async () => {
		const { withdrawApplyMoney = '', pending} = withdrawStore;
		const {overviewInfo: {address} } = store
		if (pending) return;
		if (withdrawApplyMoney === '') {
			throw {
				msg : '提现金额不能为空',
			}
		} else if (address === '') {
			throw {
				msg: '请先设置地址'
			}
		} else {
			setWithdrawPending(true);
			return request_withdraw_apply(async () => {
				return {
					money : + withdrawApplyMoney ,
					address ,
				};
			}).then((res) => {
				setWithdrawPending(false);
				if (res.result === 0) {
					withdrawSetState({
						withdrawApplyMoney : '',
					})
					ret.fetchOverviewInfo();
				} else {
					throw {
						msg: '申请失败'
					}
				}
			}).catch(() => {
				throw {
					msg: '申请失败'
				}
			})
		}
		
	}
	
	/**
	 * 充值相关信息及方法
	 */
	const { store: depositStore, setState: depositSetState } = orzMobx({
		depositMoney : '',
		paymentAddress : '',
		pending : false,
	})
	const setDepositPending = (pending) => {
		queueMicrotask(() => {
			depositSetState({
				pending,
			})
		})
	}
	
	const depositApply = async () => {
		const { depositMoney, paymentAddress, pending } = depositStore
		if (pending) return;
		if (depositMoney === ''){
			throw {
				msg: '充值金额不能为空'
			}
		} else if (paymentAddress === '') {
			throw {
				msg: '地址不能为空'
			}
		} else {
			setDepositPending(true);
			return request_deposit_apply(async () => {
				return {
					usdt : +depositMoney,
					sourceAddress: paymentAddress
				}
			}).then((res) => {
				setDepositPending(false);
				if (res.result === 0) {
					depositSetState({
						depositMoney : '',
						paymentAddress : '',
					})
					ret.fetchOverviewInfo();
				} else {
					throw {
						msg : '充值失败',
					}
				}
			}).catch(() => {
				setDepositPending(false);
				throw {
					msg : '充值失败' ,
				};
			})
			
		}
	}
	
	
	return () => {
		return ret = {

			get overviewInfo(){
				return store.overviewInfo;
			},
			get overviewInfoPending(){
				return store.overviewInfoPending;
			},
			get finDetailPending(){
				return store.finDetailPending;
			},
			get fin_detail_list(){
				return store.fin_detail_list;
			} ,
			fetchOverviewInfo(){
				return fetchOverviewInfo(() => [store.overviewInfo == null ? Symbol():store.overviewInfo?.mchNo])();
			} ,
			fetchFinDetail(badge){
				return fetchFinDetail(() => [ badge ])();
			} ,
			// 提现方法
			get withdrawStore(){
				return withdrawStore;
			} ,
			get withdrawSetState(){
				return withdrawSetState;
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

