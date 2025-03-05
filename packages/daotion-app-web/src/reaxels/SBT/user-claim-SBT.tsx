export const reaxel__user_claim_SBT = function(){
	const initialState = {
		pending : false ,
		
	};
	const { store , setState } = orzMobx(initialState);
	const reax_wallet = reaxel_wallet();
	const reax_user = reaxel_user();
	const { currentIDSBTspace } = reaxel__SpaceIDSBTIDServ();
	
	
	const contractUserClaimSBT = async (responseData : API__user_claim_SBT.response) => {
		const contract = new ethers.Contract(responseData.SBTAddress , ExecuteSBTABI , reax_wallet.web3Provider);
		const contractWithSigner = contract.connect(reax_wallet.web3Provider.getSigner(reax_wallet.account.address));
		
		return contractWithSigner.claimMercle(
			responseData.verifyData.hashNode ,
			responseData.verifyData.index ,
			responseData.verifyData.node.address ,
			responseData.verifyData.node.id ,
			responseData.verifyData.node.amount ,
			responseData.verifyData.node.timestamp ,
			responseData.claimCount ,
		).then(({ hash , receipt }) => {
			return reax_wallet.web3Provider.waitForTransaction(hash , 1).
			then(() => {
				
				antd.Modal.success({
					title : "transaction success !" ,
				});
			});
		});
	};
	
	
	const fetchUserClaimSBT = async () => {
		if( store.pending ) {
			return;
		}
		setState({ pending : true });
		
		try {
			if( !currentIDSBTspace.SBTID || !currentIDSBTspace.spaceID ) {
				throw new Error('there is no currentIDSBTspace');
			}
			if( !reax_wallet.account ) {
				await reax_wallet.connectWallet();
			}
			if( !reax_user.fake_wallet_store.logged_in ) {
				await reax_user.loginWithUserWallet();
			}
			
			const data = {
				spaceID : currentIDSBTspace.spaceID ,
				SBTID : currentIDSBTspace.SBTID ,
				timestamp : await request_server_timestamp() ,
			};
			
			const responseData = await request__user_claim_SBT(async () => {
				return {
					address : reax_wallet.account.address ,
					data ,
					signature : await reax_user.signByFakeWallet(data) ,
				};
			});
			
			await contractUserClaimSBT(responseData);
			setState({ pending : false });
		} catch ( e ) {
			setState({ pending : false });
			throw e;
		}
	};
	
	
	return () => {
		return {
			get claimSBTPending(){
				return store.pending;
			} ,
			get user_claim_SBT(){
				return fetchUserClaimSBT;
			} ,
		};
	};
}();

/**
 * function claimMercle(
 * [hashNode]        bytes32[] memory proof,
 * [index]        uint256[] memory direct,
 * [node.address]        address owner_,
 * [node.id]        uint256 id_,
 * [node.amount]        uint256 rnd_,
 * [node.timestamp]        uint256 timestamp_,
 * [claimCount]        uint256 amount_
 *         )
 */


import {
	reaxel_wallet ,
	reaxel_user ,
} from '@@reaxels';
import { reaxel__SpaceIDSBTIDServ } from '@@reaxels/SBT/spaceID-SBTID';
import {} from '@@reaxels/Reaxel-Factories';
import {
	request_server_timestamp ,
	API__user_claim_SBT ,
	request__user_claim_SBT ,
} from '@@requests';
import { ExecuteSBTABI } from '@@public/contract/abi';
import { ethers } from 'ethers';
