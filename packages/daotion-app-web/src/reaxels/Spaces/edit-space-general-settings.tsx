export const reaxel_edit_space_general_settings = function () {
	let ret;
	const {
		store ,
		setState ,
	} = orzMobx<fields>( {
		bio : null ,
		email : null ,
		tags : [] ,
		iconUrl : null ,
	} );
	let currentSpaceID : number;
	let spaceInfo : fields;
	let fetching = false;
	const reax_space_detail = reaxel_space_detail();
	/*从服务器拿spaceInfo并缓存下来*/
	const closuredSpaceInfo = Reaxes._DEPRECATED_closuredMemo( async ( spaceID : number , forceUpdate : boolean = false ) => {
		/*当前逻辑是进入space:spaceID路由下会自动请求space的detail,而settings页面一定在space:spaceID路由下的
		  所以可以认为编辑中的spaceInfo和自动请求到的spaceInfo是同一套.判断一下,如果spaceID相同就不请求后端了*/
		const info = reax_space_detail.store.spaceInfo;
		currentSpaceID = spaceID;
		if ( info && (
			spaceID === info.spaceID
		) && !forceUpdate ) {
			spaceInfo = {
				bio : info.bio ,
				email : info.email ,
				tags : info.tags ,
				iconUrl : info.iconUrl ,
			};
			setState( spaceInfo );
			return;
		}
		
		return reax_space_detail.getSpaceDetailMemoed( spaceID , forceUpdate );
		
	} , () => [] );
	
	Reaxes.observedMemo( () => {
		if ( (
			currentSpaceID
		) && reax_space_detail.store.spaceInfo?.spaceID === currentSpaceID ) {
			const info = reax_space_detail.store.spaceInfo;
			spaceInfo = {
				bio : info.bio ,
				email : info.email ,
				tags : info.tags ,
				iconUrl : info.iconUrl ,
			};
			setState( spaceInfo );
		}
	} , () => [ reax_space_detail.store.spaceInfo ] );
	
	const omitIconUrl = () => {
		return [
			_.omit( store , 'iconUrl' ) ,
			_.omit( spaceInfo , 'iconUrl' ) ,
		] as [ Omit<fields , "iconUrl"> , Omit<fields , 'iconUrl'> ];
	};
	
	type fields = {
		bio : string,
		email : string,
		tags : string[],
		iconUrl : string;
	};
	return () => {
		
		return ret = {
			closuredFetchSpaceInfo( spaceID : number , forceUpdate : boolean = false ) {
				const force = forceUpdate ? [ Math.random() ] : [];
				return closuredSpaceInfo( () => [
					spaceID ,
					...force ,
				] )( spaceID , forceUpdate );
			} ,
			get InfoEquals() {
				/*_.isEqual()深度对比*/
				return _.isEqual( ...omitIconUrl() );
			} ,
			get editingStore() {
				return store;
			} ,
			setEditingSpaceInfo( partialInfo : Partial<fields> ) {
				setState( partialInfo );
			} ,
			async saveSpaceSettings() {
				const reax_wallet = reaxel_wallet();
				const reax_user = reaxel_user();
				const address = reax_wallet.account.address;
				
				/*todo 只传改变了的字段.现在没时间 后续优化*/
				// if(!_.isEqual(store.tags,spaceInfo.tags)){
				// 	data.tags = store.tags.join(',');
				// }
				//
				const fetch_space_general_modify = async () => {
					const createPayload = async () => {
						const data : data = {
							spaceID : currentSpaceID ,
							tags : store.tags.join( ',' ) ,
							bio : store.bio ,
							email : store.email ,
							modifyAddress : reax_wallet.account.address ,
							timestamp : await request_server_timestamp() ,
						};
						return {
							address ,
							data ,
							signature : await reax_user.signByFakeWallet( data ) ,
						};
					};
					return request_space_general_modify( createPayload );
				};
				// ret.closuredFetchSpaceInfo(currentSpaceID,true).then(() => {
				// 	antd.Modal.success({title : "changed successful!"})
				// });
				// return ;
				fetch_space_general_modify().
				then( () => {
					ret.closuredFetchSpaceInfo( currentSpaceID , true ).
					then( () => {
						antd.Modal.success( { title : "changed successful!" } );
					} );
				} ).
				catch( ( e ) => {
					console.error( e );
				} );
				type data = {
					spaceID : number,
					modifyAddress : string,
					timestamp : number,
					tags? : string,
					bio? : string,
					email? : string,
				};
			} ,
		};
	};
}();

import {reaxel_wallet} from '@@reaxels/wallet/wallet';
import {reaxel_space_detail} from '@@reaxels/Spaces/space-detail';
import {reaxel_user} from '@@reaxels/user/auth';

import {
	request_server_timestamp ,
	request_space_general_modify ,
} from '@@requests';
