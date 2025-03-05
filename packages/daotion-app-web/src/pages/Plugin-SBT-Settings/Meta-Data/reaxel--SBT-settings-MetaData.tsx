export const reaxel__SBT_settings_Metadata = function(){
	let ret;
	/*请求到sbt info 后被赋值, 用于重置用户改动*/
	let initialSBTInfo;
	const initalState = {
		pending : false,
		textarea_SBT_description : '' ,
		properties : [] as {key:string,value:string,id:number}[],
		cropperModalShow: false,
	};
	const { store , setState } = orzMobx(initalState);
	const reax_SBT_info = reaxel__SBT_info();
	const reaxel_DDF = Reaxel_fact__DDF();
	const reax_DDF = reaxel_DDF({
		onUpload(file){
			setState({
				cropperModalShow : true,
			});
		},
	});
	const reaxel_Cropper  = reaxel_fact__Cropper();
	const reax_user = reaxel_user();
	const reax_wallet = reaxel_wallet();
	
	const { grasp: fetchUpdateSBTSettings } = reaxel_fact__prevent_dup_request((preventDup) => async (spaceID : number , SBTID : number) => {
		const data : API__update_SBT_info.payload['data'] = {
			spaceID ,
			SBTID ,
			desc : store.textarea_SBT_description,
			features : store.properties.map((item) => JSON.stringify(_.omit(item , "id"))),
			timestamp : await request_server_timestamp(),
		};
		return request__update_SBT_info(async () => {
			return toolkits.toFormdata({
				address : reax_wallet.account.address ,
				data ,
				signature : await reax_user.signByFakeWallet(data) ,
				file : reax_DDF.file ,
			});
		}).then(() => {
			preventDup(() => {
				antd.message.success({
					content : "update successful" ,
				});
				reax_SBT_info.cleanStore();
				return ret.fetchSBTInfo(spaceID , SBTID);
			});
		});
	})();
	
	const changeCropperModal = (status: boolean) => {
		setState({
			cropperModalShow: status
		})
	}
	
	return () => {
		return ret = {
			get store_SBT_settings_metadata(){
				return store;
			},
			get setFields(){
				return setState;
			},
			/*是否能够点击resetAll*/
			get resetable (){
				if(initialSBTInfo){
					return true;
				}else {
					return false;
				}
			},
			get didNotChange() {
				
				if(initialSBTInfo ) {
					if (store.textarea_SBT_description === initialSBTInfo?.desc && store.properties === initialSBTInfo?.properties) {
						return true;
						
					} else {
						return false
					}
				} else {
					return true;
				}
			},
			get setProperties(){
				
				return {
					add(){
						setState({
							properties : [
								...store.properties ,
								{ key : '' , value : '' , id : Math.random() } ,
							] ,
						});
					},
					remove(id:number){
						setState({
							properties : store.properties.filter((item) => {
								return item.id !== id;
							}) ,
						});
					},
					set(id:number,key,value){
						setState({
							properties : store.properties.map((item) => {
								if( id === item.id ) {
									return {
										...item,
										key : key ? key : item.key,
										value : value ? value : item.value,
									};
								} else {
									return item;
								}
							}) ,
						});
					},
				}
			},
			fetchSBTInfo(spaceID : number , SBTID : number){
				return reax_SBT_info.closuredFetchSBTInfo(spaceID , SBTID)?.then(async (data) => {
					await reax_DDF.setFile(data.iconUrl);
					setState({
						textarea_SBT_description : data.desc ,
						properties : data.features.map((str) => _.assign(JSON.parse(str) , { id : Math.random() })) ,
					});
					initialSBTInfo = data;
				});
			},
			reaxel_DDF,
			reax_DDF,
			reaxel_Cropper,
			resetAll(){
				setState({
					textarea_SBT_description : initialSBTInfo.desc ,
					properties : initialSBTInfo.features.map((str) => _.assign(JSON.parse(str) , { id : Math.random() })) ,
				});
			},
			get cropperModalShow(){
				return store.cropperModalShow
			},
			closeCropperModal(){
				changeCropperModal(false)
			},
			resetDeps(){
				reax_SBT_info.cleanStore();
			},
			fetchUpdateSBTSettings,
		};
	};
}();


import {
	reaxel__SBT_info ,
	reaxel_wallet ,
	reaxel_user,
} from '@@reaxels';
import {
	Reaxel_fact__DDF ,
	reaxel_fact__prevent_dup_request ,
	reaxel_fact__Cropper ,
} from '@@reaxels/Reaxel-Factories';
import {
	API__update_SBT_info ,
	request__update_SBT_info ,
	request_server_timestamp,
} from '@@requests';
