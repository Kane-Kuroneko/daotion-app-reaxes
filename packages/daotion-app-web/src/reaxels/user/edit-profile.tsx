import { reaxel_user_profile } from '@@reaxels/user/profile-info';
import { reaxel_wallet } from '@@reaxels/wallet/wallet';
import { reaxel_user } from '@@reaxels/user/auth';

import {
	request_server_timestamp ,
	request_user_update_profile ,
	request_user_upload_profile_pictures ,
} from '@@requests';
import { User__profile_info } from '@@requests/types';
import { staticSocialList } from '@@pages/--Components--/Select-Social-Btn-Modal/static-social-list';

/*编辑个人profile*/
export const reaxel_edit_profile = function(){
	let ret;
	let originalProfile : User__profile_info.response;
	const {store,setState} = orzMobx({
		selectSocialVisible : false,
		input_display_name : null,
		input_bio : null,
		input_portfolio_website : null,
		social_list : [
			{
				key : Math.random(),
				link : '',
				type : 'Twitter',
			},
		] as LinkSocialItem[],
	});
	const reax_user_profile = reaxel_user_profile();
	const reax_wallet = reaxel_wallet();
	const reax_user = reaxel_user();
	Reaxes.observedMemo(() => {
		if(reax_user_profile.profileStore.profile){
			const {profile} = reax_user_profile.profileStore;
			originalProfile = Object.freeze(_.cloneDeep(profile));
			setState({
				input_display_name : profile.displayName,
				input_bio : profile.bio,
				input_portfolio_website : profile.customUrl,
				social_list : profile.socialLinks ? JSON.parse(profile.socialLinks) : store.social_list,
			});
		}
		
	},() => [reax_user_profile.profileStore.profile?.address]);
	
	const fetchUpdateUserProfile = async () => {
		const address = reax_wallet.account.address;
		const createPayload = async () => {
			const data = {
				displayName : store.input_display_name ,
				bio : store.input_bio,
				customUrl : store.input_portfolio_website,
				socialLinks : JSON.stringify(store.social_list),
				setAddress :  address,
				timestamp : await request_server_timestamp(),
			};
			return {
				address ,
				data ,
				signature : await reax_user.signByFakeWallet( data ) ,
			};
		}
		return request_user_update_profile( createPayload ).
		then( ( res ) => {
			reax_user_profile.memoedFetchProfile( address , true );
			crayon.orange( res );
		} );
	}
	
	return () => {
		const {user_profile_upload_avatar , user_profile_upload_banner} = reaxel_upload_profile_pics();
		return ret = {
			get originalProfile(){
				return originalProfile;
			},
			get editProfileStore(){
				return store;
			},
			get staticSocialList(){
				return staticSocialList.filter(({type}) => {
					return !store.social_list.some( ( item ) => item.type === type );
				});
			},
			setSelectSocialVisible (selectSocialVisible:boolean){
				setState( {
					selectSocialVisible ,
				} );
			},
			setProfileData(partialState:Partial<typeof store>){
				setState( partialState );
			},
			fetchUpdateUserProfile ,
			uploadProfileAvatar( callback = ( url? : string ) => null ) {
				user_profile_upload_avatar( callback );
			},
			uploadProfileBanner( callback = ( url? : string ) => null ) {
				user_profile_upload_banner( callback );
			},
			addSocialItem(type : string, ){
				setState( {
					social_list : [
						...store.social_list ,
						{
							link : '' ,
							type ,
							key : Math.random().toString() ,
						} ,
					] ,
				} );
				if(ret.staticSocialList.length === 0){
					setState( { selectSocialVisible : false } );
				}
			},
			deleteSocialItem(type : string){
				setState( {
					social_list : store.social_list.filter( ( item ) => item.type !== type ) ,
				} );
			},
			editSocialItem(type : string, text){
				setState( {
					social_list : store.social_list.map((item) => {
						if(item.type === type){
							return {
								...item ,
								link : text ,
							};
						}else {
							return item;
						}
					}) ,
				} );
			},
		};
	}
}();

/*上传用户头像和背景*/
export const reaxel_upload_profile_pics = function () {
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
			/*上传用户头像*/
			user_profile_upload_avatar(callback = (url?:string) => null ){
				const reax_user = reaxel_user();
				const reax_wallet = reaxel_wallet();
				const reax_user_profile = reaxel_user_profile();
				
				const fetch_upload = async ( file : File ):Promise<string> => {
					
					const createPayload = async () => {
						const { address } = reax_wallet.account;
						const data = {
							address ,
							profileType : 1 ,
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
						const response = await request_user_upload_profile_pictures( createPayload);
						reax_user_profile.setProfileAvatar( response.url );
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
						return reax_user_profile.setProfileAvatar(url),url;
					} ).then((url) => {
						callback(url);
					});
				} );
				input.click();
			},
			/*上传用户主页banner*/
			user_profile_upload_banner(callback = (url?:string) => null ){
				const reax_user = reaxel_user();
				const reax_wallet = reaxel_wallet();
				const reax_user_profile = reaxel_user_profile();
				
				const fetch_upload = async ( file : File ):Promise<string> => {
					
					const createPayload = async () => {
						const { address } = reax_wallet.account;
						const data = {
							address ,
							profileType : 2 ,
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
						const response = await request_user_upload_profile_pictures( createPayload);
						reax_user_profile.setProfileBanner( response.url );
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
						return reax_user_profile.setProfileBanner(url),url;
					} ).then((url) => {
						callback(url);
					});
				} );
				input.click();
			},
		};
	};
}();

type LinkSocialItem = {
	/*社交媒体类型的字符串  如twitter*/
	type : string;
	/*社交媒体的链接*/
	link : string;
	
	key? : string|number;
};



