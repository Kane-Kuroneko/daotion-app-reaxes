import {
	request_space_detail ,
	request_space_member_list ,
	request_server_timestamp,
} from '@@requests';
import {
	Space___get_space_detail ,
	Space__member_list,
} from '@@requests/Spaces/types';

export const reaxel_space_detail = function (){
	/*缓存上一次强制刷新的参数 , 避免不需要强制刷新时没传第二个deps导致不必要刷新*/
	let prevForceUpdate = null;
	const {
		store ,
		setState ,
	} = orzMobx( {
		spaceInfo : null as Space___get_space_detail.response ,
		loading : true ,
	} );
	
	const fetchUpdate_space_detail = ( spaceID:number ) => {
		
		return request_space_detail( async() => ({spaceID}) ).
		catch((e):never => {
			setState( {
				loading : false ,
			} );
			throw e;
		}).
		then( ( data ) => {
			setState( {
				spaceInfo : data ,
				loading : false ,
			} );
		} );
	}
	
	/**
	 * 初始化一个依据deps变化来执行的闭包.每次调用时memedFetchSpaceinfo(*这里传入函数返回新的依赖列表*)此时会自动比对是否和上一次有差异,
	 * 如果没差异则不会执行,此方法用于防止无限请求&渲染.
	 */
	const closuredFetchSpaceInfo = Reaxes._DEPRECATED_closuredMemo( ( spaceID:number ) => {
		// setTimeout( () => setState( { spaceInfo : null } ) );
		fetchUpdate_space_detail( spaceID );
	} , () => [] );
	
	return () => {
		let ret;
		
		
		return ret = {
			get store (){
				return store;
			},
			setSpaceBanner(url:string){
				setState( {
					spaceInfo : {
						...store.spaceInfo ,
						bgUrl : url ,
					} ,
				} );
			},
			setSpaceAvatar(url:string){
				setState( {
					spaceInfo : {
						...store.spaceInfo ,
						iconUrl : url ,
					} ,
				} );
			},
			getSpaceDetailMemoed( spaceID : number , forceUpdate = false ) {
				return closuredFetchSpaceInfo( ( prevDeps ) => [ spaceID , ...(forceUpdate ? [prevForceUpdate = Math.random()] : [prevForceUpdate]) ] )( spaceID );
			},
		};
	};
}();


export const reaxel_space_member_list = function(){
	
	const {
		store ,
		setState,
	} = orzMobx( {
		memberList : [] as Space__member_list.response['userInfos'] ,
		loading : false ,
	} );
	
	const fetchUpdateMemberList = async (spaceID:number) => {
		const payload = async () => {
			return {
				spaceID ,
				indexStart : 0 ,
				count : 10000 ,
				firstTimestamp : await request_server_timestamp(),
			};
		};
		setState( { loading : true } );
		const ret = request_space_member_list(payload);
		ret.finally( () => {
			setState( { loading : false } );
		} );
		return ret;
	};
	
	const closuredFetchUpdateMemberList = Reaxes._DEPRECATED_closuredMemo( ( spaceID : number ) => {
		
		if(spaceID){
			fetchUpdateMemberList( spaceID ).then( ( res ) => {
				setState( {
					memberList : res.userInfos ,
				} );
			} );
		}
		
	} , () => [] );
	
	return () => {
		
		return {
			get spaceMemberList(){
				return store.memberList;
			},
			closuredFetchUpdateMemberList,
		};
	};
}();
