/***
 * 用户信息
 */
export const reaxel_user_profile = function () {
	let ret;
	let prevForceUpdate = null;
	const {
		store ,
		setState ,
		mutatePartialState,
	} = orzMobx( {
		profile : null as User__profile_info.response ,
		loading : false as { address : string; promise : Promise<any> } | false ,
	} );
	
	const reax_wallet = reaxel_wallet();
	
	const fetchUpdateUserProfile = async ( address : string ) => {
		/*防止重复请求*/
		if ( store.loading && toolkits.addressEqual(address,store.loading?.address)) {
			return;
		}
		
		setState( {
			loading : {
				address ,
				promise : request_user_profile( async () => (
					{ address }
				) ).
				catch( ( e ) : never => {
					throw e;
				} ).
				then( ( profile ) => {
					// mutatePartialState( { profile } );
					setState( { profile } );
				} ).
				finally( () => {
					setState( { loading : false } );
				} ) ,
			} ,
		} );
		
	};
	
	const closuredFetchProfile = Reaxes._DEPRECATED_closuredMemo( ( address? ) => {
		if ( address ) {
			fetchUpdateUserProfile( address );
		} else {
			// reax_wallet.connectWallet();
		}
	} , () => [] );
	
	Reaxes.observedMemo( () => {
		if ( reax_wallet.account?.address ) {
			closuredFetchProfile( () => [
				reax_wallet.account.address ,
				prevForceUpdate,
			] )( reax_wallet.account.address );
		}else {
			/*清空缓存*/
			closuredFetchProfile(() => [])()
			setState({profile:null,loading:false});
		}
	} , () => [ reax_wallet.account?.address ] );
	
	return () => {
		
		return ret = {
			get profileStore() {
				return store;
			} ,
			/*手动获取个人profile ,forceUpdate为true时就算address没变化也会刷新store.profile*/
			memoedFetchProfile( address : string , forceUpdate = false ) {
				return closuredFetchProfile( () => [
					address ,
					...(
						forceUpdate ? [ prevForceUpdate = Math.random() ] : [ prevForceUpdate ]
					) ,
				] )( address );
			} ,
			setProfileAvatar( url : string ) {
				mutatePartialState( {
					profile : {
						iconUrl : url ,
					} ,
				} );
			} ,
			setProfileBanner( url : string ) {
				setState({
					...store ,
					profile : {
						...store.profile ,
						bgUrl : url,
					} ,
				});
				false && mutatePartialState( {
					profile : {
						bgUrl : url ,
					} ,
				} );
			} ,
		};
	};
}();


/*第三方用户(或自己)的profile和4个tabs信息*/
export const reaxel_user_profile_lists = function () {
	
	const {
		store ,
		setState ,
	} = orzMobx( {
		profile : null as User__profile_info.response ,
		profile_joined_space_list_paged : [] as User__profile_joined_list.response['infos'] ,
		NFTs : [] ,
		Tokens : [] ,
		SBTs : [] ,
	} );
	const reax_wallet = reaxel_wallet();
	const reax_user_profile = reaxel_user_profile();
	
	/*获取profile内此用户加入的space列表*/
	const fetchUpdateJoinedSpaceList = async ( address : string ) => {
		
		const createPayload = async () => {
			return { address };
		};
		
		request_user_profile_joined_list( createPayload ).
		then( ( res ) => {
			setState( {
				profile_joined_space_list_paged : res.infos ,
			} );
		} );
		return;
	};
	
	/*获取其他人的profile信息*/	
	const fetchUpdateOthersProfile = async ( address : string ) => {
		if(address){
			const createPayload = async () => {
				return { address };
			};
			request_user_profile( createPayload ).
			then( ( res ) => {
				setState( {profile : res } );
			} );
		}
	};
	
	/*获取其他用户(或自己)profile主页加入了的space的列表*/
	const memorizedFetchUpdateOthersProfile = Reaxes._DEPRECATED_closuredMemo( ( address : string ) => {
		if ( address ) {
			fetchUpdateOthersProfile( address );
		}
	} , () => [] );
	/*获取其他用户(或自己)profile主页加入了的space的列表*/
	const memorizedFetchUpdateJoinedSpaceList = Reaxes._DEPRECATED_closuredMemo( ( address : string ) => {
		
		if ( address ) {
			fetchUpdateJoinedSpaceList( address );
		}
	} , () => [] );
	
	const closuredClearOthersProfile = Reaxes._DEPRECATED_closuredMemo( (address:string) => {
		setState( {
			profile : null ,
			profile_joined_space_list_paged : [] ,
			NFTs : [] ,
			Tokens : [] ,
			SBTs : [] ,
		} );
	} , () => [] );
	
	return () => {
		return {
			get othersProfile(){
				return store.profile;
			},
			get profile_joined_space_list_paged(){
				return store.profile_joined_space_list_paged;
			},
			get othersProfileStore() {
				return store;
			} ,
			closuredClearOthersProfile ,
			memorizedFetchUpdateJoinedSpaceList ,
			memorizedFetchUpdateOthersProfile ,
		};
	};
}();

/*做*/
export const reaxel_profile_avatar = function(){
	

	const BlokiesAvatar = reaxper( ( props : BlokiesAvatarProps ) => {
		const containerRef = useRef<HTMLCanvasElement>();
		useLayoutEffect( () => {
			renderIcon( {
				seed : props.address.toLowerCase() ,
				scale : (props.size && props.size / 8) ?? 8  ,
			} , containerRef.current );
		});
		return <canvas
			ref = { containerRef }
			style = { {
				borderRadius : "50%" ,
				...props.canvasStyle,
			} }
		></canvas>;
	} );
	
	return () => {
		
		return {
			BlokiesAvatar
		};
	};
	
	type BlokiesAvatarProps = {
		/*覆盖canvas的样式*/
		canvasStyle? : React.CSSProperties;
		/*canvas头像的长宽px*/
		size : number;
		address : string;
	}
}();


import { reaxel_wallet } from '@@reaxels/wallet/wallet';

import {
	request_user_profile ,
	request_user_profile_joined_list ,
} from '@@requests';
import {
	User__profile_info ,
	User__profile_joined_list ,
} from '@@requests/types';

import {renderIcon} from '@download/blockies';
