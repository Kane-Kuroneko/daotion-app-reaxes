export const reaxel_mch_open_account = function(){
	let ret;
	const { state$mchCNE , setFields , reset } = reaxel_ctrl();
	const { setPending , pendingState } = toolkits.orzPending();
	
	const fetchSubmit = (mchNo:string) => {
		if(pendingState.pending){
			return;
		}
		setPending(true);
		return request_create_mch(async () => {
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
			const whiteList = (
				state$mchCNE.whiteList.length === 1 && !state$mchCNE.whiteList[0]
			) ? [] : state$mchCNE.whiteList;
			return {
				mchNo ,
				..._.omit(state$mchCNE , "payIn" , "payOut" ) ,
				whiteList,
				password : state$mchCNE.password && crypto.MD5(state$mchCNE.password).toString() ,
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
			fetchSubmit,
		};
	};
}();
import { reaxel_ctrl } from './reaxel--mch-ctrl';
import { request_create_mch } from '@@requests';
import crypto from 'crypto-js';
import { commission } from '@@requests/mch-mgnt/types';
