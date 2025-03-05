export const reaxel__SBT_available = function(){
	
	const { store , setState } = orzMobx({
		SBT_existed : false ,
	});
	
	const [ closuredFetchSBTAvailable , resetDeps_SBTAvailable ] = Reaxes.closuredMemo((spaceID : number , SBTID : number) => {
		return request__SBT_available(async () => {
			return {
				spaceID ,
				SBTID ,
			};
		}).then(({ existed }) => {
			setState({ SBT_existed : existed });
		}).catch((e) => {
			crayon.error(e);
		});
	} , () => []);
	
	const {grasp} = reaxel_fact__prevent_dup_request((preventDup) => (spaceID : number , SBTID : number) => {
		return closuredFetchSBTAvailable(() => [spaceID , SBTID])(spaceID , SBTID);
	})();
	
	return () => {
		
		return {
			get SBT_existed (){
				return store.SBT_existed;
			},
			get FetchSBTAvailable(){
				return grasp;
			},
			reset(){
				resetDeps_SBTAvailable()
			},
		};
	};
}();

import { request__SBT_available } from '@@requests';
import { reaxel_fact__prevent_dup_request } from '@@reaxels/Reaxel-Factories';
