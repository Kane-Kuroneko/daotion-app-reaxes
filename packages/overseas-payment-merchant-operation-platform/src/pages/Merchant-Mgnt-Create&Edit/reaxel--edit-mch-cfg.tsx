export const reaxel_edit_mch_cfg = function(){
	
	let ret;
	const initialState = {
		
	};
	const { state$mchCNE , setFields , reset } = reaxel_ctrl();
	const { store , setState } = orzMobx(initialState);
	
	const { setPending , pendingState } = toolkits.orzPending();
	
	const fetchMchCfg = (mchNo:string) => {
		return request_mch_info(async () => ({
			mchNo
		})).then((res) => {
			
			return res;
		});
	};
	
	const [closFetchMchCfg , cleanMchCfg] = Reaxes.closuredMemo((mchNo:string) => {
		return fetchMchCfg(mchNo).then((res) => {
			const gankCommission = (type:"payIn"|"payOut") => {
				return {
					mode : function(){
						if( !res[type][1] ) {
							return "basic" as const;
						}
						return "advanced" as const;
					}() ,
					amount : function(){
						if( !res[type][1] ) {
							return 0;
						} else {
							return res[type][1].start;
						}
					}() ,
					left : { fix : res[type][0].fix , rate : res[type][0].rate } ,
					right : {
						fix : function(){
							if( res[type][1] ) {
								return res[type][1].fix;
							}
							return null;
						}() ,
						rate : function(){
							if( res[type][1] ) {
								return res[type][1].rate
							}
							return null;
						}() ,
					} ,
				};
			};
			setFields({
				name : res.name ,
				contactPerson : res.contactPerson ,
				contactPhone : res.contactPhone ,
				sellerID : res.sellerID,
				payIn : gankCommission('payIn'),
				payOut : gankCommission('payOut'),
				status : res.status,
				payInStatus : res.payInStatus,
				payOutStatus:res.payOutStatus,
				whiteList : res.whiteList,
			});
		});
	} , () => []);
	
	const fetchSubmit = (mchNo:string) => {
		if(pendingState.pending){
			return;
		}
		setPending(true);
		return request_edit_mch_cfg(async () => {
			/*从前端状态衍生出后端要的payIn/payOut格式 */
			const gankCommission = (type : "payIn" | "payOut") : commission[] => {
				const commission = state$mchCNE[type];
				if( commission.mode === "basic" ) {
					return [ { start : 0 , fix : commission.left.fix , rate : commission.left.rate } ];
				} else {
					return [
						{ start : 0 , fix : commission.left.fix , rate : commission.left.rate } ,
						{ start : commission.amount , fix : commission.right.fix , rate : commission.right.rate } ,
					];
				}
			};
			
			return {
				mchNo ,
				..._.omit(state$mchCNE , "payIn" , "payOut" ) ,
				whiteList : state$mchCNE.whiteList.filter((item) => !!item) ,
				password : state$mchCNE.password && crypto.MD5(state$mchCNE.password).toString() || null,
				payIn : gankCommission('payIn') ,
				payOut : gankCommission('payOut') ,
			};
		}).then((data) => {
			setPending(false);
			return data;
		}).catch((e) => {
			setPending(false);
			throw e;
		});
	};
	
	return () => {
		return ret = {
			get pending(){
				return pendingState.pending;
			},
			state:store,
			setState,
			reaxel_ctrl,
			closFetchMchCfg,
			cleanMchCfg,
			fetchSubmit,
		};
	};
}();

import { reaxel_ctrl } from './reaxel--mch-ctrl';
import {
	request_mch_info ,
	request_edit_mch_cfg,
} from '@@requests';
import { commission } from '@@requests/mch-mgnt/types';
import crypto from 'crypto-js';
import { mch_info } from '@@requests/mch-mgnt/types';
