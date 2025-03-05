export const reaxel__blacklist = function(){
	let ret;
	const initialState = {
		pending : false,
		blacklist : [] as API__SBT_blacklist.blackItem[],
		input_search_address : '' ,
		SBTContractAddress : null ,
	};
	const { store , setState } = orzMobx(initialState);
	
	
	
	const [ closuredFetchBlacklist , resetDeps_blacklist ] = Reaxes.closuredMemo((spaceID : number , SBTID : number) => {
		
		return request__SBT_blacklist(async () => {
			return {
				SBTID ,
				spaceID ,
			};
		}).then(({ list  ,contractAddress }) => {
			setState({
				blacklist : list,
				SBTContractAddress : contractAddress,
			});
		});
	} , () => []);
	
	/*调用合约来设置/取消设置用户地址白名单状态*/
	const contractAddToBlacklist = async (address:string,status:boolean) => {
		const { invokeContract } = Reaxel_fact__contract(store.SBTContractAddress , ExecuteSBTABI , (contractWithSigner) => {
			return contractWithSigner.setBlack;
		})();
		setState({ pending : true });
		
		const waitingConfirm =  orzPromise();
		antd.Modal.confirm({
			onOk : () => waitingConfirm.resolve() ,
			onCancel : () => waitingConfirm.reject() ,
			title : "Waring" ,
			content : "this operation will invoke contract to add user to blacklist , are you sure to do this ?" ,
		});
		await waitingConfirm;
		const notifyKey = Math.random().toString();
		antd.notification.open({
			key : notifyKey,
			duration : null ,
			message : "Transaction Processing" ,
			description : "please hold on..." ,
		});
		invokeContract(address , status).then(() => {
			ret.reset();
			antd.notification.open({
				key :notifyKey,
				type : "success",
				message : "success!",
				duration : 3,
			});
		}).catch((e) => {
			antd.notification.open({
				type : "error",
				key :notifyKey,
				message : "faild!",
				description : e?.message || e || e.toString(),
				duration : 3,
			});
			console.error(e);
		}).finally(() => {
			setState({ pending : false})
		});
	};
	
	return () => {
		
		return ret = {
			get store_SBT_blacklist(){
				return store;
			},
			get blacklist(){
				if(ret.localExist){
					return [ret.localExist];
				}else {
					
				}
				return store.blacklist;
			},
			get setFields(){
				return setState;
			},
			/*当前table里是否存在此address*/
			get localExist(){
				if(!store.input_search_address){
					return false;
				}
				return store.blacklist.find((element) => element.address.includes(store.input_search_address));
			},
			get searchingAddable(){
				const address = store.input_search_address;
				if(address.length === 42 && address.startsWith('0x') && !store.blacklist.some((element) => {
					return toolkits.addressEqual(element.address , address);
				})){
					return true;
				}
				
				return false;
			},
			switchAddressBlacklist(address = store.input_search_address ,status:boolean = true){
				if(!store.pending){
					contractAddToBlacklist(address,status);
				}
			},
			onSearchAddress(value:string,spaceID : number , SBTID : number){
				setState({ input_search_address : value });
				
			},
			closuredFetchBlacklist,
			resetDeps_blacklist,
			reset(){
				resetDeps_blacklist();
				setState(initialState);
			},
		};
	};
}();


import { Reaxel_fact__contract } from '@@reaxels/Reaxel-Factories';
import {ExecuteSBTABI} from '@@public/contract/abi';
import {
	API__SBT_blacklist ,
	request__SBT_blacklist,
} from '@@requests';
