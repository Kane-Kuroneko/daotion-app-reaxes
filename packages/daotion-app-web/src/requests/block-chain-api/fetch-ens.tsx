/*根据地址获取ens信息*/
export const fetchEns = async ( address : string , chain? : Chain ) => {
	const web3Onboard = web3onboard.instance;
	const { state } = web3Onboard;
	const {chain : currentChain} = reaxel_wallet();
	if(!chain){
		chain = state.get().
		chains.
		find( ( {
			namespace ,
			id,
		} ) => {
			return namespace === "evm" && id === '0x1';
		} );
	}
	const provider = new providers.StaticJsonRpcProvider(
		chain.providerConnectionInfo && chain.providerConnectionInfo.url ?
			chain.providerConnectionInfo :
			chain.rpcUrl ,
	);
	try {
		const name = await provider.lookupAddress( address );
		
		if ( name ) {
			const resolver = await provider.getResolver( name );
			
			if ( resolver ) {
				const [ contentHash , avatar ] = await Promise.all( [
					resolver.getContentHash() ,
					resolver.getAvatar() ,
				] );
				
				const getText = resolver.getText.bind( resolver );
				
				return {
					name ,
					avatar ,
					contentHash ,
					getText ,
				};
			}
		}
		return null;
	} catch ( error ) {
		console.error( error );
		return null;
	}
};
import { providers } from 'ethers';
import { Chain } from '@web3-onboard/common';
import { web3onboard } from '@@reaxels/wallet/init-web3onboard';
import { reaxel_wallet } from '@@reaxels/wallet/wallet';
