import {
	SVGClose ,
	SVGInstagram ,
	SVGNotion ,
	SVGMedium ,
	SVGClubHouse ,
	SVGMirror ,
	SVGTikTok ,
	SVGFacebook ,
	SVGReddit ,
	SVGTelegram ,
	SVGYoutube ,
}from '@@SVGcomponents/space-setting-svg';

export const reaxel_edit_space_social_settings = function () {
	let ret;
	/*从后端请求到的social-list*/
	let spaceSocialList = null;
	const staticSocialList = [
		{
			type : "Mirror" ,
			icon : <SVGMirror /> ,
		} ,
		{
			type : "Telegram" ,
			icon : <SVGTelegram /> ,
		} ,
		{
			type : "Notion" ,
			icon : <SVGNotion /> ,
		} ,
		{
			type : "Youtube" ,
			icon : <SVGYoutube /> ,
		} ,
		{
			type : "Medium" ,
			icon : <SVGMedium /> ,
		} ,
		{
			type : "ClubHouse" ,
			icon : <SVGClubHouse /> ,
		} ,
		{
			type : "Reddit" ,
			icon : <SVGReddit /> ,
		} ,
		{
			type : "Instagram" ,
			icon : <SVGInstagram /> ,
		} ,
		{
			type : "Tik tok" ,
			icon : <SVGTikTok /> ,
		} ,
		{
			type : "Facebook" ,
			icon : <SVGFacebook /> ,
		} ,
	];
	const {
		store ,
		setState ,
	} = orzMobx<store>( {
		socialList : [
			{
				key : Math.random() ,
				type : "Homepage" ,
				link : '' ,
			} ,
			{
				key : Math.random() ,
				type : "Twitter" ,
				link : '' ,
			} ,
			{
				key : Math.random() ,
				type : "Discord" ,
				link : '' ,
			} ,
			{
				key : Math.random() ,
				type : "GitHub" ,
				link : '' ,
			} ,
		] ,
		selectModalVisible : false ,
	} );
	const reax_space_detail = reaxel_space_detail();
	const reax_wallet = reaxel_wallet();
	const reax_user = reaxel_user();
	
	const fetchEditSocial = async () => {
		return request_edit_space_social_list( async () => {
			const data = {
				spaceID : reax_space_detail.store.spaceInfo.spaceID ,
				socialLinks : JSON.stringify( store.socialList ) ,
				modifyAddress : reax_wallet.account.address ,
				timestamp : await request_server_timestamp() ,
			};
			return {
				address : reax_wallet.account.address ,
				data ,
				signature : await reax_user.signByFakeWallet( data ) ,
			};
		} ).
		catch( ( e ) : never => {
			throw e;
		} ).
		then( () => {
			if ( __EXPERIMENTAL__ ) {
				antd.message.success( 'update successful!' );
			}
			reax_space_detail.getSpaceDetailMemoed( reax_space_detail.store.spaceInfo.spaceID , true );
		} );
	};
	
	
	const clousred = Reaxes._DEPRECATED_closuredMemo(() => {
		if(!reax_space_detail.store.spaceInfo?.socialLinks){
			setState( {
				socialList : [
					{
						key : Math.random() ,
						type : "Homepage" ,
						link : '' ,
					} ,
					{
						key : Math.random() ,
						type : "Twitter" ,
						link : '' ,
					} ,
					{
						key : Math.random() ,
						type : "Discord" ,
						link : '' ,
					} ,
					{
						key : Math.random() ,
						type : "GitHub" ,
						link : '' ,
					} ,
				],
			} );
		} else {
			setState( {
				socialList : (
					JSON.parse( reax_space_detail.store.spaceInfo.socialLinks )
				) as spaceSocialItem[] ,
			} );
		}
	} , () => [ reax_space_detail.store.spaceInfo?.socialLinks ] );
	
	Reaxes.observedMemo( () => {
		
		clousred( () => [ reax_space_detail.store.spaceInfo?.socialLinks ] )();
	} , () => [reax_space_detail.store.spaceInfo] );
	
	
	return () => {
		return ret = {  
			get store() {
				return store;
			} ,
			get staticSocialList() {
				return staticSocialList.filter( ( { type } ) => {
					return !store.socialList.some( ( item ) => item.type === type );
				} );
			} ,
			/*通过key编辑单个item*/
			editSocialItem( key : string|number , value : string ) {
				setState( {
					socialList : store.socialList.map( ( item ) => {
						if ( item.key === key ) {
							return {
								...item ,
								link : value ,
							} as spaceSocialItem;
						} else {
							return item;
						}
					} ),
				} );
			} ,
			/*添加一个社媒*/
			addSocialItem( type : string ) {
				setState( {
					socialList : [
						...store.socialList ,
						{
							link : '' ,
							type ,
							key : Math.random().toString() ,
						} ,
					] ,
				} );
				if ( ret.staticSocialList.length === 0  ) {
					setState( {
						selectModalVisible : false ,
					} );
				}
			} ,
			deleteSocialItem(type: string) {
				setState( {
					socialList : store.socialList.filter( ( each ) => each.type !== type ) ,
				} );
			},
			setSelectModalVisible( selectModalVisible = !store.selectModalVisible ) {
				setState( {
					selectModalVisible ,
				} );
			} ,
			fetchEditSocial ,
		};
	};
	type store = {
		socialList : ( spaceSocialItem & { key? : string|number } )[];
		selectModalVisible : boolean;
	};
	type spaceSocialItem = {
		/*社交媒体类型的字符串  如twitter*/
		type : string;
		/*社交媒体的链接*/
		link : string;
		
		key? : string|number;
	};
}();

import {reaxel_wallet} from '@@reaxels/wallet/wallet';
import {reaxel_user} from '@@reaxels/user/auth';
import {reaxel_space_detail} from '@@reaxels/Spaces/space-detail';
import {
	request_edit_space_social_list ,
	request_server_timestamp,
} from '@@requests';
