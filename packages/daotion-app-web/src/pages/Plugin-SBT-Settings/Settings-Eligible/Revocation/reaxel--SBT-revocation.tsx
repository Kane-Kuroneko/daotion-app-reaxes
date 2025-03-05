export const reaxel__SBT_revocation = function(){
	let ret;
	const initialState = {
		input_search_address : '' ,
		revocation_list : [] as revocationItem[],
		search_result : null as revocationItem,
		pending : false ,
		editing : null as {
			type : "revocating" | "recovering",
			address : string ,
			offset : number , 
		} ,
		SBTContractAddress : null ,
		isShowModal : false,
		
	};
	const {
		store ,
		setState ,
	} = orzMobx(initialState);
	const setEditing = (editing:Partial<typeof initialState.editing>) => {
		return setState({ ...store , editing : { ...store.editing , ...editing } });
	};
	const reax_wallet = reaxel_wallet();
	const reax_user = reaxel_user();
	
	const [closuredFetchRevocationList , resetDeps_fetchRevocationList] = Reaxes.closuredMemo((spaceID : number , SBTID : number) => {
		setState({ pending : true });
		return request__revocation_SBT_list(async () => {
			return { spaceID , SBTID  };
		}).then((data) => {
			setState({
				SBTContractAddress : data.contractAddress,
				revocation_list : data.list ,
			});
		}).finally(() => {
			setState({ pending : false });
		});
		
	} , () => []);
	
	
	/*通过完整地址查询该账户的剩余SBT数量。*/
	const [fetchSBTUserInfo,resetDeps_SBTUserInfo] = Reaxes.closuredMemo((address:string,SBTID:number,spaceID:number) => {
		return request__SBT_user_info(async () => {
			return { spaceID , SBTID , address };
		}).then((data) => {
			setState({
				search_result : {
					address ,
					holdNum : data.holdNum ,
					revocationNum : data.revocationNum ,
					tokenID : data.tokenID ,
				} ,
			});
		});
	} , () => []);
	
	const refreshDataOnSuccess = () => {
		ret.reset();
		ret.fetch_revocation_list();
	};
	
	const changeModal = (status: boolean) => {
		setState({
			isShowModal : status ,
		});
	}
	
	
	/*调用合约方法来revoke SBT*/
	const contractRevokeSBT = async (address:string,offset:number) => {
		setState({ pending : true  });
		const {invokeContract} = Reaxel_fact__contract(store.SBTContractAddress , ExecuteSBTABI , (contractWithSigner) => {
			return contractWithSigner.revoke;
		})();
		invokeContract(address , offset).then(() => {
			setState({ editing : null });
			ret.reset();
			changeModal(false)
			antd.Modal.success({
				title : "transaction success !" ,
			});
		}).catch((e) => {
			console.error(e);
		}).finally(() => {
			setState({ pending : false });
		});
	};
	/*调用合约方法来recover SBT*/
	const contractRecoverSBT = async (address:string,offset:number) => {
		setState({ pending : true  });
		const {invokeContract} = Reaxel_fact__contract(store.SBTContractAddress , ExecuteSBTABI , (contractWithSigner) => {
			return contractWithSigner.recover;
		})();
		invokeContract(address , offset).then((TransactionReceipt) => {
			setState({ editing : null });
			ret.reset();
			changeModal(false)
			antd.Modal.success({
				title : "transaction success !" ,
			});
		}).catch(() => {
			setState({ pending : false });
		});
	};
	
	return () => {
		return ret = {
			/**
			 *
			 */
			get revocation_list(){
				return store.revocation_list;
			} ,
			get store_SBT_revocation(){
				return store;
			} ,
			get fetch_revocation_list(){
				return closuredFetchRevocationList;
			} ,
			get address_insertable(){
				const input_address = store.input_search_address;
				if( input_address.length !== 42 ) {
					return false;
				}
				if( store.revocation_list.some((element) => element.address === input_address) ) {
					return false;
				}
				
				return true;
			} ,
			get setFields(){
				return setState;
			} ,
			/*确认这一行的修改*/
			done_row_offset(address : string){
				contractRevokeSBT(store.editing.address , store.editing.offset);
			} ,
			get editing(){
				return store.editing;
			} ,
			setEditing ,
			/*将搜索结果插入到表格内*/
			insertToRevocationList(){
				setState({
					revocation_list : [
						store.search_result ,
						...store.revocation_list ,
					] ,
				});
			} ,
			/*调起弹窗来revoke或recover*/
			openModalOperation(type : "revocating" | "recovering" , address : string){
				setEditing({
					type ,
					address ,
					offset : 0 ,
				});
			} ,
			showModal(status : boolean){
				changeModal(status);
			} ,
			contractRevokeSBT ,
			contractRecoverSBT ,
			closeModal(){
				setEditing(null);
			} ,
			onSearchSBTUserInfo(value : string , spaceID : number , SBTID : number){
				setState({ input_search_address : value });
				if( value.length !== 42 || !value.startsWith('0x') ) {
					return;
				}
				fetchSBTUserInfo(() => [ value , spaceID , SBTID ])(value , SBTID , spaceID);
			} ,
			reset(){
				setState(initialState);
				resetDeps_fetchRevocationList();
				resetDeps_SBTUserInfo();
			} ,
		};
	};
}();


type revocationItem = API__revocation_SBT_list.revocationItem;

import { reaxel_wallet } from '@@reaxels/wallet/wallet';
import { reaxel_user } from '@@reaxels/user';
import { Reaxel_fact__contract } from '@@reaxels/Reaxel-Factories';
import {ExecuteSBTABI} from '@@public/contract/abi';
import {ethers} from 'ethers';

import {
	API__revocation_SBT_list ,
	request__revocation_SBT_list ,
	API__SBT_user_info ,
	request__SBT_user_info,
} from '@@requests';
