export const reaxel_mch_mgnt_list = function(){
	const { setPending , pendingState } = toolkits.orzPending();
	const { store , setState } = orzMobx({
		list : [] as mch_mgnt_list.item[] ,
		searchText : '',
		
	});
	const fetchMchList = () => {
		return request_mch_mgnt_list(async () => {
			return {
				mchNo : store.searchText ,
				count : 99999999 ,
				indexStart : 0 ,
				firstTimestamp : Math.ceil(Date.now() / 1000) ,
			};
		});
	};
	
	const [ closFetchMchList , cleanDps$MchMgntList ] = Reaxes.closuredMemo(() => {
		setPending(true);
		return fetchMchList().then((data)=> {
			setState({
				list : data.list ,
			});
			setPending(false);
			return data;
		});
	} , () => []);
	
	/*商户列表切换代收/代付/状态 */
	const switchStatus = (
		type : "payInStatus" | "payOutStatus" | "status" ,
		status : number,
		mchNo : string,
	) => {
		return request_edit_mch_cfg(async () => (
			{
				mchNo,
				[type] : status ,
			}
		)).then(() => {
			cleanDps$MchMgntList();
			closFetchMchList(() => [ NaN ])();
		});
	};
	
	return () => {
		
		return {
			get pending(){
				return pendingState.pending;
			},
			get mch_list(){
				return store.list;
			},
			state$mchMgnt:store,
			setFields : setState,
			setPending,
			switchStatus,
			closFetchMchList(){
				return closFetchMchList(() => [store.searchText])();
			},
			cleanDeps(){
				cleanDps$MchMgntList();
			}
		};
	};
}();

import {
	request_mch_mgnt_list ,
	request_edit_mch_cfg,
} from '@@requests';
import { reaxel_fact__prevent_dup_request } from '#reaxels';
import { mch_mgnt_list } from '@@requests/mch-mgnt/types';
