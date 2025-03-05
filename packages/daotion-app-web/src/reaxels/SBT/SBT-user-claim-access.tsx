/**
 * 查询用户对于某个SBT的claim信息和资格
 *
 * 获取此信息时无需主动调用请求, 当链接钱包且进入space&SBT页面时通过setIDSBTspace函数会自动响应式请求
   用户信息并更新store.
 */
export const reaxel__SBT_user_claim_access = function(){
	/**
	 * 进入需要查询的页面时setSpaceSBTID,组件卸载时resetSpaceSBTID
	 */
	const { store , setState } = orzMobx({
		/*用户对此SBT的资格和信息,如果用户没链接钱包就是null*/
		user_SBT_access : null as user_SBT_access ,
	});
	const { clearIDSBTspace , currentIDSBTspace , setIDSBTspace } = reaxel__SpaceIDSBTIDServ();
	const reax_wallet = reaxel_wallet();
	
	// const [ closuredFetchSBTUserClaimAccess , resetDeps_SBTUserClaimAccess ] = Reaxes.closuredMemo(() => {
	// 	return request__address_unclaimed_SBT_quantity()
	// } , () => []);
	
	Reaxes.observedMemo(() => {
		
		if(_.isNumber(currentIDSBTspace.SBTID)&&_.isNumber(currentIDSBTspace.spaceID)&&reax_wallet.account?.address){
			request__address_unclaimed_SBT_quantity(async () => {
				return {
					spaceID : currentIDSBTspace.spaceID,
					SBTID : currentIDSBTspace.SBTID,
					address : reax_wallet.account?.address,
				};
			}).then((data) => {
				/*如果已经有则assign进去*/
				setState(_.isPlainObject(store.user_SBT_access) ? {
					...store,
					user_SBT_access : {
						...store.user_SBT_access ,
						...data ,
					}
				} : {
					...store,
					user_SBT_access : data ,
				});
			});
			
		}else if(!reax_wallet.account?.address) {
			setState({
				user_SBT_access : null ,
			});
		}
		
	} , () => [currentIDSBTspace.SBTID,currentIDSBTspace.spaceID,reax_wallet.account?.address]);
	
	
	return () => {
		return {
			get user_SBT_access (){
				return store.user_SBT_access;
			},
			setIDSBTspace,
		};
	};
}();


import {
	request__address_unclaimed_SBT_quantity ,
	API__address_unclaimed_SBT_quantity,
} from '@@requests';
import {
	reaxel_wallet ,
} from '@@reaxels';
import { reaxel__SpaceIDSBTIDServ } from '@@reaxels/SBT/spaceID-SBTID';

type user_SBT_access = API__address_unclaimed_SBT_quantity.response;
