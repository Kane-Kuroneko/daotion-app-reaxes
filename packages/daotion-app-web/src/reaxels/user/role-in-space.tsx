/**
 * 获取当前space下的用户角色
 * * 只能在能获取到router - spaceID的组件内使用!
 */
export const reaxel__role_in_space = function(){
	const { store , setState } = orzMobx({
		/*角色1:游客, 2:admin , 3:controller*/
		role : 1 ,
		spaceID : null ,
	});
	
	const reax_wallet = reaxel_wallet();
	
	const closuredFetch = Reaxes._DEPRECATED_closuredMemo((payload : payload) => {
		return request__user_role_in_space(async () => payload).then((res) => {
			setState({ role : res.role });
		});
	} , () => [ reax_wallet.account?.address ]);
	
	const { grasp } = reaxel_fact__prevent_dup_request((preventDup) => {
		
		return (payload : payload) => closuredFetch(() => [ reax_wallet.account?.address , store.spaceID ])(payload);
	})();
	
	Reaxes.observedMemo(() => {
		
		if( reax_wallet.account?.address && store.spaceID ) {
			grasp({ spaceID : store.spaceID , address : reax_wallet.account.address });
		} else {
			setState({ role : 1 });
		}
	} , () => [ reax_wallet.account?.address , store.spaceID , reax_wallet.wallet ]);
	
	return (spaceID:number) => {
		setState({ spaceID });
		return {
			/*角色1:游客, 2:admin , 3:controller*/
			get role(){
				return store.role;
			},
			fetchUserRoleInSpace(){
				if(reax_wallet.account?.address){
					grasp({ spaceID , address : reax_wallet.account?.address })
				};
			} ,
		};
	};
}();
type payload = {
	spaceID:number;
	address : string;
};
const request__user_role_in_space = (payload : PayloadBody<payload>) => {
	return request.post<{ role : 1 | 2 | 3;},typeof payload>(`/user/user-space-role` , {
		body : payload ,
	});
};
import { reaxel_fact__prevent_dup_request } from '@@reaxels/Reaxel-Factories';
import { reaxel_wallet } from "@@reaxels/wallet/wallet";

