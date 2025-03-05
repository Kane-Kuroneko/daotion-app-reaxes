export const reaxel_mch_mgnt_detail = function(){
	const initialState:Partial<mch_info.response> = {};
	const { store , setState } = orzMobx(initialState);
	const { pendingState , setPending } = toolkits.orzPending();
	
	const [closFetchMchDetail,cleanMchDetailDeps] = Reaxes.closuredMemo((mchNo:string) => {
		
		return request_mch_info(async () => ({mchNo})).then((res) => {
			setState(res);
		});
	} , () => []);
	
	return () => {
		
		return {
			state : store ,
			setFields : setState ,
			get pending(){
				return pendingState.pending;
			},
			reset(){
				setState(initialState);
			},
			setPending,
			closFetchMchDetail,
			cleanMchDetailDeps,
		};
	};
}();

import { request_mch_info } from '@@requests';
import { mch_info } from '@@requests/mch-mgnt/types';
