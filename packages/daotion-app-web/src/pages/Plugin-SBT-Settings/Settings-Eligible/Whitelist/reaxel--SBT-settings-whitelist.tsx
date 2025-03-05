export const reaxel__SBT_settings_whitelist = function(){
	let ret;
	const reax_wallet = reaxel_wallet();
	const reax_user = reaxel_user();
	const initialState = {
		input_search_address : '' as string ,
		modifyingWhitelist : [] as Array<null|(API__SBT_whitelist.whitelist_item & {editing : boolean, modifiedOffset : number})>,
		whitelist_search_result : [] as Array<null|(API__SBT_whitelist.whitelist_item & {editing : boolean, modifiedOffset : number})>,
		/*是否仅显示修改过的列表*/
		upload_status : {
			status : null as "succeed"|"failed"|"uploading",
			filename : '' ,
			errorMsg : "" ,
		},
		rootHash : null as string,
		currentPage : 1 ,
		pageSize : 15, 
		pending : false ,
		isShowModal: false,
	};
	const { store , setState } = orzMobx(initialState);
	
	const { grasp : preventDup_search_SBT_whitelist } = reaxel_fact__prevent_dup_request((preventDup) => (searchText : string , SBTID : number , spaceID : number) => {
		return request__search_SBT_whitelist(async () => {
			return {
				spaceID ,
				SBTID ,
				address : searchText ,
			};
		}).then(({ whitelist }) => {
			preventDup(() => {
				setState({
					whitelist_search_result : whitelist.map((element) => {
						return {
							...element ,
							modifiedOffset : 0 ,
							editing : false ,
						}
					}) ,
				});
			});
		});
	})();
	
	const debouncedFetchSearchWhitelist = utils.debounce((searchText:string,SBTID:number,spaceID:number) => {
		preventDup_search_SBT_whitelist(searchText , SBTID , spaceID);
	} , 600);
	
	const closuredDebouncedFetchSearchWhitelist = Reaxes._DEPRECATED_closuredMemo((searchText:string,SBTID:number,spaceID:number) => {
		return debouncedFetchSearchWhitelist(searchText,SBTID,spaceID);
	},() => [reax_wallet.account?.address]);
	
	/*todo */
	const contractSaveWhitelst = async ( SBTAddress: any, rootHash: any ) => {
		setState({
			pending : true ,
		});
		if( !reax_wallet.account ) {
			await reax_wallet.connectWallet();
		}
		if( !reax_user.fake_wallet_store.logged_in ) {
			await reax_user.loginWithUserWallet();
		}
		const contract = new ethers.Contract( SBTAddress, ExecuteSBTABI , reax_wallet.web3Provider);
		const contractWithSigner = contract.connect(reax_wallet.web3Provider.getSigner(reax_wallet.account.address));
		contractWithSigner.setRoot('0x' + rootHash).then(({ hash , receipt }) => {
			return reax_wallet.web3Provider.waitForTransaction(hash , 1).
			then(() => {
				ret.emptyStore();
				antd.Modal.success({
					title : "transaction success !" ,
				});
				setState({
					pending : false ,
				});
			}).catch(() => {
				antd.Modal.error({
					title : "transaction error !" ,
				});
				setState({
					pending : false ,
				});
			})
		}).catch(() => {
			setState({
				pending : false ,
			});
		})
		
	}
	
	const fetchSaveModifiedWhitelist = async (SBTID:number,spaceID:number,) => {
		return request__save_modify_whitelist(async () => {
			const data = {
				spaceID ,
				SBTID ,
				list : store.modifyingWhitelist.map(({ address , modifiedOffset }) => (
					{
						address ,
						offset : modifiedOffset ,
					}
				)) ,
				timestamp : await request_server_timestamp() ,
			};
			return {
				address : reax_wallet.account.address ,
				data ,
				signature : await reax_user.signByFakeWallet(data) ,
			};
		}).then(async ({ rootHash , SBTAddress }) => {
			await contractSaveWhitelst(SBTAddress, rootHash)
			setState({
				rootHash ,
			});
		});
	};
	
	const fetchUploadCSV = async (file:File,spaceID:number,SBTID:number) => {
		ret.setUpload({
			status : "uploading" ,
			filename : file.name ,
		});
		return request__upload_SBT_whitelist_excel(async () => {
			return toolkits.toFormdata({
				address : reax_wallet.account.address ,
				SBTID ,
				spaceID ,
				file ,
			});
		}).then(({ success , list , duplicateLines , invalid }) => {
			
			if(success){
				console.log(success , list);
				ret.setUpload({
					status : "succeed" ,
					
				});
				/*读取到csv后双列表遍历 , 如果有相同地址 , 用后面的覆盖前面的offset*/
				const deduplicateModifyingWhitelist = store.modifyingWhitelist.filter((element) => {
					return !list.some(({ address }) => address === element.address);
				});
				setState({
					input_search_address : '' ,
					modifyingWhitelist : [ ...deduplicateModifyingWhitelist , ...list ] ,
				});
			}else {
				ret.setUpload({
					status : "failed" ,
					errorMsg : "fail",
					
				})
			}
			
		}).catch((e) => {
			ret.setUpload({
				status : "failed" ,
				errorMsg : e?.message || e.toString() || "fail",
				
			})
			antd.message.error('upload failed ')
		}).finally(() => {
		});
	};
	
	const changeModalStatus = (status: boolean) => {
		setState({
			isShowModal: status
		})
	}
	
	return () => {
		return ret = {
			get whitelist (){
				if(store.input_search_address){
					const exist = store.modifyingWhitelist.filter((element) => {
						return element.address.includes(store.input_search_address);
					});
					if(exist.length){
						return exist;
					}
					return store.whitelist_search_result;
				}
				return store.modifyingWhitelist;
			},
			/*检测是否存在有效的修改项*/
			get effectiveChanges(){
				return store.modifyingWhitelist.some((element) => {
					if( element.modifiedOffset !== 0 ) {
						return true;
					}else {
						return false;
					}
				});
			},
			get store__SBT_settings_whitelist (){
				return store;
			},
			/*如果用户输入42位地址但没查询到时,empty换成提示点击添加*/
			get TableEmpty(){
				if(store.input_search_address.length === 42){
					return <span>click Add to whitelist to add a new </span>;
				}else {
					return <antd.Empty/>
				}
			},
			get setFields(){
				return setState;
			},
			/*用户输入的addrss是否可被添加的状态 fixme:处理大小写兼容*/
			get address_insertable () :boolean {
				const input_address = store.input_search_address;
				if(input_address.length !== 42){
					return false;
				}
				if(store.modifyingWhitelist.some((element) => element.address === input_address )){
					return false;
				}
				return input_address.startsWith('0x');
			},
			get uploadStatus(){
				return store.upload_status;
			},
			/*点击上传按钮*/
			onClickUpload(spaceID:number,SBTID:number){
				const input = document.createElement('input');
				input.type = "file";
				input.accept = ".csv,.xls,.xlsx";
				input.onchange = (e) => {
					const [file] = input.files;
					console.log(input.files);
					fetchUploadCSV(file , spaceID , SBTID);
				};
				input.click();
			},
			setUpload(partialUploadState:Partial<typeof initialState["upload_status"]>){
				
				setState({
					...store ,
					upload_status : {
						...store.upload_status ,
						...partialUploadState ,
					} ,
				});
			},
			/*搜索框添加白名单地址*/
			search_add_address_btn(){
				const searchExist = store.whitelist_search_result.find((element) => {
					return toolkits.addressEqual(element.address,store.input_search_address);
				});
				const newElement = {
					address : store.input_search_address,
					editing : true ,
					remainder : 0 ,
					modifiedOffset : 0 ,
					amount : 0 ,
				};
				if(searchExist){
					newElement.amount = searchExist.amount;
				}
				setState({
					modifyingWhitelist : store.modifyingWhitelist.slice().concat([
						newElement
					]) ,
				});
			},
			/*输入搜索框时发起搜索请求*/
			search_whitelist_onChange (value:string,spaceID:number,SBTID:number){
				setState({ input_search_address : value });
				
				if(value && value !== "0x"){
					closuredDebouncedFetchSearchWhitelist(() => [
						reax_wallet.account?.address,
						SBTID,
						spaceID ,
						value,
					])(value , SBTID , spaceID);
				}
			},
			/*使某一行变为可编辑状态*/
			switch_row_editable(enable:boolean,address:string){
				/*如果主列表里面有了则直接变为可编辑状态*/
				if( store.modifyingWhitelist.some((element) => toolkits.addressEqual(element.address , address)) ) {
					setState({
						modifyingWhitelist : store.modifyingWhitelist.map((item) => {
							if( toolkits.addressEqual(item.address,address) ) {
								return {
									...item ,
									editing : enable ,
								};
							} else {
								return item;
							}
						}) ,
					});
				} else if( store.whitelist_search_result.some((element) => toolkits.addressEqual(element.address , address)) ) {
					setState({
						modifyingWhitelist : [
							...store.modifyingWhitelist ,
							{
								...store.whitelist_search_result.find((element) => toolkits.addressEqual(element.address , address)) ,
								editing : true ,
							} ,
						] ,
					});
				} else {
					console.error('0.624967003197128');
					
				}
			},
			/*用户输入某一行的修改值*/
			offset_row_value (address:string,offset:number){
				setState({
					modifyingWhitelist : store.modifyingWhitelist.map((item) => {
						if(item === null){
							return null;
						}
						if( item.address === address ) {
							return {
								...item ,
								modifiedOffset : offset ,
							};
						} else {
							return item;
						}
					}) ,
				});
			},
			/*保存白名单改动到后端, 然后下一步*/
			async saveWhitelist(SBTID:number,spaceID:number,){
				const undone = store.modifyingWhitelist.filter((element) => {
					return element.editing;
				});
				if(undone.length){
					
					antd.Modal.confirm({
						title : "有未确认的修改，是否保存并继续？" ,
						onOk() {
							fetchSaveModifiedWhitelist(SBTID , spaceID);
							
						} ,
					});
				}else {
					fetchSaveModifiedWhitelist(SBTID , spaceID);
					
				}
				
				
				
			},
			// get contractSaveWhitelst(){
			// 	return contractSaveWhitelst;
			// },
			/*重置用户的改动*/
			reset_row(address){
				setState({
					modifyingWhitelist : store.modifyingWhitelist.map((element) => {
						if(element === null){
							return element;
						}
						if( address === element.address ) {
							return {
								...element ,
								editing : false ,
								modifiedOffset : 0 ,
							};
						}else return element;
					}) ,
				});
			},
			/*弹窗展开*/
			showModal (status: boolean) {
				changeModalStatus(status)
			},
			/*重置列表请求状态(分页)*/
			reset_changes (){
				setState({
					modifyingWhitelist : [],
					upload_status : initialState.upload_status ,
				});
				changeModalStatus(false)
			},
			emptyStore(){
				setState(initialState);
				
			},
		};
	};
}();


import {
	request__SBT_whitelist ,
	API__SBT_whitelist ,
	request__search_SBT_whitelist ,
	API__SBT_search_whitelist ,
	API__SBT_upload_file_whitelist ,
	request__upload_SBT_whitelist_excel ,
	request__save_modify_whitelist,
	request_server_timestamp,
} from '@@requests';
import { reaxel_wallet} from '@@reaxels/wallet/wallet';
import { reaxel_user } from '@@reaxels/user/auth';
import { reaxel_fact__prevent_dup_request } from '@@reaxels/Reaxel-Factories';
import { ExecuteSBTABI } from '@@public/contract/abi';
import { ethers } from 'ethers';


/**
 * 缓存上次数据,条件未达成时先使用上次的数据渲染,达成后再渲染正确的数据
 * 常用于异步数据未获取到时先渲染上次的结果.
 */
const reaxel_fact__use_previous = () => {
	
	
};
