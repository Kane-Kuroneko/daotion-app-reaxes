/**
 * 进入space及子节点时会获取space内部基础信息(多数为非展示性)
 * 作为space子路由验证的验证父节点
 * (即作为space下的子资产是否隶属于这个spaceID)
 */

export const reaxel__space_plugin = function(){
	
	const { store , setState } = orzMobx({
		spaceID : null ,
		spaceName : null ,
		spaceIconUrl : null ,
		deployedChainList : [] ,
		pluginNames : [] ,
	});
	
	
	const fetchSpacePlugin = Reaxes._DEPRECATED_closuredMemo((spaceID:number) => {
		if(_.isNumber(spaceID)){
			request__space_plugin(async () => (
				{ spaceID }
			)).then((data) => {
				setState(data);
			});
		}
	} , () => []);
	
	
	
	return () => {
		
		return {
			store ,
			/*true:合法.  false不合法,404 传入函数返回一个boolean , 来给子路由(模块)来判断是否404*/
			match(callback: ({ plugin_spaceID }:matches) => boolean){
				if(!store.spaceID){
					return false;
				}
				return callback({
					plugin_spaceID : store.spaceID,
					
				});
			},
			/**/
			fetchSpacePlugin ,
			
		};
	};
	type matches = {
		plugin_spaceID : number;
	};
}();


import { request__space_plugin } from '@@requests';
