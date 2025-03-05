/**
 * 上传profile/space-avatar头像等
 */
import { reaxel_user } from '@@reaxels/user/auth';
import { reaxel_wallet } from '@@reaxels/wallet/wallet';
import { reaxel_space_detail } from '@@reaxels/Spaces/space-detail';
import { reaxel_joined_Space_list } from '@@reaxels/Spaces/joined-space-list';
import { reaxel_user_profile } from '@@reaxels/user/profile-info';

import {
	request_server_timestamp ,
	request_upload_space_banner ,
	request_upload_space_avatar,
	request_user_upload_profile_pictures ,
	
} from '@@requests';


export const reaxel_space_settings_upload_pictures = function () {
	let ret;
	
	/*生成一个上传的input*/
	const uploader = ( inputOpts : {} , onChange : ( files : FileList ) => void ) => {
		const input = document.createElement( 'input' );
		input.type = "file";
		input.onchange = ( { target = '__empty_file__' } ) => {
			onChange( (
				target as HTMLInputElement
			).files );
		};
		return input;
	};
	
	return () => {
		return ret = {
			/*上传space banner*/
			space_info_banner( spaceID : number ) {
				const reax_user = reaxel_user();
				const reax_wallet = reaxel_wallet();
				const reax_space_detail = reaxel_space_detail();
				
				
				const fetch_upload = async ( file : File ) => {
					const createPayload = async () => {
						const { address } = reax_wallet.account;
						const data = {
							spaceID ,
							iconType : 2 ,
							address ,
							timestamp : await request_server_timestamp() ,
						};
						const signature = await reax_user.signByFakeWallet( data );
						
						return toolkits.toFormdata( {
							address ,
							data ,
							signature ,
							file ,
						} );
					};
					
					try {
						const response = await request_upload_space_banner( createPayload);
						reax_space_detail.setSpaceBanner( response.url );
						antd.Modal.success( { title : "upload successful!" } );
					} catch ( e ) {
						antd.Modal.error( { title : e.toString() } );
					}
				};
				const input = uploader( {} , ( [ file ] ) => {
					fetch_upload( file );
				} );
				input.click();
			} ,
			/*上传space头像*/
			space_settings_avatar : ( spaceID : number ,callback = (url?:string) => null) => {
				const reax_user = reaxel_user();
				const reax_wallet = reaxel_wallet();
				const reax_space_detail = reaxel_space_detail();
				const reax_joined_space_list = reaxel_joined_Space_list();
				
				const fetch_upload = async ( file : File ):Promise<string> => {
					
					const createPayload = async () => {
						const { address } = reax_wallet.account;
						const data = {
							spaceID ,
							iconType : 1 ,
							address ,
							timestamp : await request_server_timestamp() ,
						};
						const signature = await reax_user.signByFakeWallet( data );
						return toolkits.toFormdata( {
							address ,
							data ,
							signature ,
							file ,
						} );
					};
					
					try {
						const response = await request_upload_space_avatar( createPayload);
						reax_space_detail.setSpaceAvatar( response.url );
						antd.Modal.success( { title : "upload successful!" } );
						return response.url;
					} catch ( e ) {
						antd.Modal.error( { title : e.toString() } );
						throw e;
					}
				};
				const input = uploader( {} , ( [ file ] ) => {
					fetch_upload( file ).
					then( (url) => {
						return reax_joined_space_list.fetchUpdate_joined_space_list().then(() => url);
					} ).then((url) => {
						callback(url);
					});
				} );
				input.click();
			} ,
		};
	};
}();
