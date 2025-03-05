export const reaxel_user_join_or_leave_space = function(){
	
	return () => {
		const reax_joined_space_list= reaxel_joined_Space_list();
		const reax_user = reaxel_user();
		const reax_wallet = reaxel_wallet();
		return {
			is_user_joined_space (spaceID:number):boolean{
				return reax_joined_space_list.joined_space_list.some( ( { spaceID } ) => spaceID === spaceID );
			},
			async join_space( spaceID : number ) {
				if(!reax_wallet.wallet){
					await reax_wallet.connectWallet();
				}
				if(!reax_user.fake_wallet_store.logged_in){
					await reax_user.loginWithUserWallet();
				}
				
				const data = {
					spaceID ,
					joinAddress : reax_wallet.account.address ,
					timestamp : await request_server_timestamp(),
				};
				
				const createPayload = async () => {
					const signature = await reax_user.signByFakeWallet( data );
					return {
						address : data.joinAddress ,
						data ,
						signature,
					};
				};
				
				return request_user_join_space( createPayload ).catch((e) => {
					antd.Modal.error({
						title : e.message ,
					});
					throw e;
				}).then((spaceInfo) => {
					reax_joined_space_list.set_joined_space_list( [
						...reax_joined_space_list.joined_space_list ,
						spaceInfo ,
					] );
					return spaceInfo;
				});
			} ,
			async leave_space( spaceID : number ) {
				if(!reax_wallet.wallet){
					await reax_wallet.connectWallet();
				}
				if(!reax_user.fake_wallet_store.logged_in){
					await reax_user.loginWithUserWallet();
				}
				const data = {
					spaceID ,
					leaveAddress : reax_wallet.account.address ,
					timestamp : await request_server_timestamp(),
				};
				const createPayload = async () => {
					return {
						data ,
						address : reax_wallet.account.address,
						signature: await reax_user.signByFakeWallet( data ),
					}
				}
				return request_user_leave_space( createPayload).
				catch((e):never => {
					
					antd.Modal.error({
						title : e ,
					});
					throw e;
				}).then((e) => {
					reax_joined_space_list.set_joined_space_list( reax_joined_space_list.joined_space_list.filter( ( spaceInfo ) => spaceInfo.spaceID !== spaceID ) );
				} );
			} ,
			
		};
	};
}();

import {
	request_user_join_space ,
	request_user_leave_space,
	request_server_timestamp
} from '@@requests';
import { reaxel_joined_Space_list } from '@@reaxels/Spaces/joined-space-list';
import {reaxel_user,} from '@@reaxels/user';
import {reaxel_wallet,} from '@@reaxels/wallet';
