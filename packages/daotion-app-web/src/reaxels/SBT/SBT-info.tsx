/**
 * SBT主页
 */

export const reaxel__SBT_info = function(){
	let ret;
	const initialState = {
		SBT_info : null as Omit<API__SBT_info.response , "features"> & {
			features : { key : string, value : string }[]
		} ,
		SBT_holder_list : [],
		pending : false ,
	};
	const { store , setState } = orzMobx(initialState);
	const reax_wallet = reaxel_wallet();
	const reax_user = reaxel_user();
	const { currentIDSBTspace } = reaxel__SpaceIDSBTIDServ();
	
	const [ closuredFetchSBTInfo , resetDeps_SBTInfo ] = Reaxes.closuredMemo((spaceID : number , SBTID : number) => {
		if( !Number.isNaN(SBTID) ) {
			return request__SBT_info(async () => (
				{ SBTID , spaceID }
			)).then((res) => {
				crayon.blue(res);
				setState({
					SBT_info : {
						...res ,
						features : res.features.map((kv) => JSON.parse(kv) as { key : string, value : string }) ,
						
					} ,
				});
				return res;
			});
		}
	} , () => []);

	
	return () => {
		
		return ret = {
			get pending(){
				return store.pending;
			} ,
			get SBT_info(){
				return store.SBT_info;
			} ,
			get closuredFetchSBTInfo(){
				return (spaceID : number , SBTID : number) => closuredFetchSBTInfo(() => [ spaceID , SBTID ])(spaceID , SBTID);
			} ,
			get setFields(){
				return setState;
			},
			cleanStore(){
				setState(initialState);
				resetDeps_SBTInfo();
			},
			
		};
	};
}();

import { reaxel_wallet } from "@@reaxels/wallet";
import { reaxel_user } from '@@reaxels';
import { reaxel__SpaceIDSBTIDServ } from '@@reaxels/SBT/spaceID-SBTID';
import {
	request__SBT_info ,
	API__SBT_info ,
	API__address_unclaimed_SBT_quantity ,
	request__address_unclaimed_SBT_quantity,
} from '@@requests';


