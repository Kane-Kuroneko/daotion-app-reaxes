import type {
	ConnectOptions ,
	WalletState ,
	ConnectedChain ,
	
} from '@web3-onboard/core';
import {
	ethers ,
	providers ,
	
} from 'ethers';
import {
	reaxel_storage
} from '@@reaxels';
import { Chain } from '@web3-onboard/common';
import {
	web3onboard ,
} from '@@reaxels/wallet/init-web3onboard';

const web3Onboard = web3onboard.instance;





/*当链接钱包和获取ens完成时存入storage*/
const connect_wallet_from_storage = function() {
	
	return () => {
		
		
		return {
			/*从localstorage读入缓存并链接钱包*/
			connectWalletFromStorage() {
				const reax_wallet = reaxel_wallet?.();
				const reax_storage = reaxel_storage();
				const wallet = reax_storage.get<WalletState>( '__internal_storage_wallet_account__' );
				if ( wallet !== null && reax_wallet?.wallet === null ) {
					// crayon.blue( 'connectWalletFromStorage:' , wallet );
					web3onboard.instance.connectWallet( {
						autoSelect : {
							label : wallet.label ,
							disableModals : true ,
						} ,
					} ).then(() => {
						
					}).catch(() => {
						crayon.gold( '222cannot get previous wallet info' );
					});
				} else {
					crayon.gold( 'cannot get previous wallet info' );
				}
			} ,
		};
	}
}();







export const reaxel_wallet = function () {
	let ret;
	const {
		store ,
		setState ,
	} = orzMobx<{
		/*用户已连接的钱包对象*/
		wallet : WalletState,
		/*是否正在链接钱包*/
		connecting : boolean,
		/*已链接的链*/
		chain : ConnectedChain,
		/*是否正在选择修改链*/
		settingChain : boolean,
		/*钱包下的account对象.*/
		account : Account,
	}>( {
		wallet : null ,
		connecting : false ,
		chain : null ,
		settingChain : false ,
		account : null ,
	} );
	
	
	const reax_storage = reaxel_storage();
	
	const memedChain = Reaxes._DEPRECATED_closuredMemo( ( chain : ConnectedChain ) => {
		if ( chain ) {
			setState( { chain } );
		}
	} , () => [] );
	const memoedLogWalletInfo = Reaxes._DEPRECATED_closuredMemo((connectedWallet:WalletState) => {
		if(true || store.wallet){
			crayon.green( 'connectedWallet : ' , connectedWallet , connectedWallet.chains );
		}
	},() => [store.wallet]);
	
	/*wallet subscription监听钱包的(外部和内部)改动*/
	web3Onboard.state.select( "wallets" ).
	subscribe( ( [ connectedWallet ] ) => {
		if ( connectedWallet == undefined ) {
			setState( {
				wallet : null ,
				account : null ,
			} );
			return;
		} else {
			memoedLogWalletInfo( () => [ connectedWallet ] )(connectedWallet);
			queueMicrotask(() => setState( {
				wallet : connectedWallet ,
				account : connectedWallet.accounts[0] ,
			} ));
			setWalletToLocalstorage( connectedWallet );
			memedChain( () => [ connectedWallet.chains?.[ 0 ]?.id ] )( connectedWallet.chains?.[ 0 ] );
			return;
		}
	} );
	
	const connectWalletFromStorage = () =>  {
		const wallet = reax_storage.get<WalletState>( '__internal_storage_wallet_account__' );
		if ( wallet !== null && store.wallet === null ) {
			setState( { connecting : true } );
			web3onboard.instance.connectWallet( {
				autoSelect : {
					label : wallet.label ,
					disableModals : true ,
				} ,
			} ).then(() => {
				
			}).catch(() => {
				crayon.gold( '222cannot get previous wallet info' );
			}).finally(() => {
				setState( { connecting : false } );
			});
		} else {
			crayon.gold( 'cannot get previous wallet info' );
		}
	};
	
	let web3provider:ethers.providers.Web3Provider = Reaxes.observedMemo( ( first ) => {
		if ( !store.wallet ) return web3provider = null;
		return web3provider = new ethers.providers.Web3Provider( store.wallet?.provider ?? null , 'any' );
	} , () => [ store.wallet ] );
	
	connectWalletFromStorage();
	return () => {
		return ret = {
			get connecting (){
				return store.connecting;
			},
			get wallet() {
				return store.wallet;
			} ,
			get account():Account {
				return store.account;
			} ,
			get walletStore() {
				return store;
			} ,
			get web3Provider() {
				return web3provider;
			} ,
			get settingChain() {
				return store.settingChain;
			} ,
			get chain() {
				return store.chain;
			} ,
			get chains() {
				const blockchainExplorerMap = {
					'0x1' : 'https://etherscan.io',
					'0x3' : 'https://ropsten.etherscan.io',
					'0x4' : 'https://rinkeby.etherscan.io',
					'0x5' : 'https://goerli.etherscan.io',
					'0x42' : 'https://kovan.etherscan.io',
				};
				// crayon.orange( 'web3Onboard.state.get().chains:' , web3Onboard.state.get().chains );
				return web3Onboard.state.get().chains.map((chain) => {
					return {
						...chain ,
						blockchainExplorer : blockchainExplorerMap[ chain.id ] ,
					};
				});
			} ,
			/*传入链对象来修改store的chain对象*/
			setChain( chain : ConnectedChain ) {
				setState( { chain } );
			} ,
			/*通过web3onboard.setChain来修改当前钱包的链,需要钱包确认才能被确认*/
			selectChain( options : SetChainOptions , walletLabel? : string ) {
				if ( !walletLabel && store.wallet ) {
					walletLabel = store.wallet.label;
				}
				setState( { settingChain : true } );
				return web3Onboard.setChain( {
					...options ,
					wallet : walletLabel ,
				} );
			} ,
			/*断开与钱包的链接*/
			disconnectWallet( label : string ) {
				setState( { connecting : true } );
				web3Onboard.disconnectWallet( { label } ).
				then( () => {
					reax_storage.remove( '__internal_storage_wallet_account__' );
				} ).finally(() => {
					
					setState( { connecting : false } );
				});
			} ,
			/*连接钱包,此promise完成不代表连接完成*/
			connectWallet( options : ConnectOptions = {} ) {
				setState( { connecting : true } );
				const ret = web3Onboard.connectWallet( null);
				ret.
				then((wallet) => {
					
				}).
				finally( () => {
					setState( { connecting : false } );
				} );
				return ret;
			} ,
			address_memoed_reaction( cb : ( address : string ) => any ) {
				const lazyInvoke = Reaxes._DEPRECATED_closuredMemo( () => cb( store.account?.address ) , () => [] );
				const memo = Reaxes.observedMemo( () => {
					lazyInvoke( () => [ store.account?.address ] )();
				} , () => [ store.account?.address ] );
				
			} ,
			/*当钱包地址发生变化时自动执行*/
			connectWalletFromStorage,
		};
	};
}();


const onerror = ( msg ) => {
	crayon.error( msg );
};


type SetChainOptions = {
	chainId : string;
	chainNamespace? : string;
}



function setWalletToLocalstorage( connectWallet : WalletState ) {
	reaxel_storage().set( "__internal_storage_wallet_account__" , stringify( _.omit( connectWallet , [ "provider" ] ) ) );
}


