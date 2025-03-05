import {
	reaxel_wallet ,
} from '@@reaxels';

export const TestWallet = reaxper( class extends Reaxlass {
	
	
	render() {
		
		
		const reax_wallet = reaxel_wallet();
		
		
		return <>
			{ !reax_wallet.wallet && <button
				onClick = { () => {
					reax_wallet.connectWallet();
				} }
			>
				connect wallet
			</button> }
			{ reax_wallet.wallet && <button
				onClick = { () => {
					reax_wallet.disconnectWallet( reax_wallet.wallet.label );
				} }
			>
				disconnect wallet
			</button> }
			
			<select
				onChange = { ( e ) => {
					console.log( e.target.value );
					reax_wallet.selectChain( { chainId : e.target.value } );
				} }
				value = { reax_wallet.walletStore.chain?.id ?? '0x1' }
			>
				{ reax_wallet.chains.map( ( chain ) => {
					return <option
						key = { chain.id }
						value = { chain.id }
						onClick = { () => {
							// reax_wallet.selectChain( { chainId : chain.id } );
						} }
					>{ chain.label }</option>;
				} ) }
			</select>
		</>;
	}
} );
