/**
 * 封装调用合约流程
 */
export const Reaxel_fact__contract = (
	contractAddress : string ,
	contractABI : ContractInterface ,
	callback : (contractWithSigner:Contract) => (...args) => Promise<TransactionResponse> ,
) => {
	const {store,setState} = orzMobx({ pending : false });
	const reax_wallet = reaxel_wallet();
	const reax_user = reaxel_user();
	
	return () => {
		
		return {
			get pending (){
				return store.pending;
			},
			async invokeContract(...args){
				setState({ pending : true });
				if( !reax_wallet.account ) {
					await reax_wallet.connectWallet();
				}
				if( !reax_user.fake_wallet_store.logged_in ) {
					await reax_user.loginWithUserWallet();
				}
				const contract = new ethers.Contract(contractAddress , contractABI , reax_wallet.web3Provider);
				const contractWithSigner = contract.connect(reax_wallet.web3Provider.getSigner(reax_wallet.account.address));
				
				const result = callback(contractWithSigner)(...args).then(({wait}) => {
					return wait(1);
				});
				result.finally(() => {
					setState({ pending : false });
				});
				return result;
			},
		}
	}
}

/*test&example*/
/*import {ExecuteSBTABI} from '@@public/contract/abi';
window.recover = () => {
	const {invokeContract,pending} = Reaxel_fact__contract('0xD8d9Db20553d3096029d64d42D805b83Dfb80625',ExecuteSBTABI,(contractWithSigner) => {
		return contractWithSigner.recover;
	})();
	invokeContract("0xD0B747Df2122A04f4011089999ff77Dd97b1bdb9",999).then((data) => {
		crayon.green(`data:` , data);
	}).catch((e) => {
		crayon.red('error:' , e);
	});
}*/

import { reaxel_wallet } from '@@reaxels/wallet/wallet';
import { reaxel_user } from '@@reaxels/user/auth';
import {
	Contract ,
	ContractInterface ,
	ethers ,
} from 'ethers';
import { TransactionResponse  } from '@ethersproject/abstract-provider';
