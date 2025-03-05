/**
 * 真钱包签名,登录
 * localstorage._fake_wallets_map_ === "{'<address>':'<private_key>'}"
 */
export const reaxel_user = function () {
	const {
		store ,
		setState ,
	} = orzMobx<{
		logged_in:boolean;
		privateKey : string;
		real_address : string;
		fakeWallet : Wallet;
	}>( {
		logged_in : false ,
		/*假钱包私钥*/
		privateKey : null ,
		/*用户真实钱包的地址*/
		real_address : null ,
		fakeWallet : null ,
	} );
	let ret;
	const reax_wallet = reaxel_wallet();
	const reax_storage = reaxel_storage();
	const symbol__storage_key_fake_wallets_secret_map_ = Symbol( '_fake_wallets_map_' );

	/*从storage获取私钥*/
	const checkAddressIsLoggedIn = ( address : string ) => {
		const walletsMap : string = reax_storage.get<string>( '_fake_wallets_map_' ) || '{}';
		const privateKey : string = (typeof walletsMap === "string" ? JSON.parse( walletsMap )[ address ] : walletsMap[address]) ?? null;

		return privateKey;
	};
	/*用于操作localstorage存的私钥组*/
	const address_map_private_key_utils = {
		add( [ address , privateKey ] : [ string , string ] ) {
			// if ( address_map_private_key_utils.getAll().hasOwnProperty( address ) ) {
			//
			// }
			const pairs = address_map_private_key_utils.getAll();
			pairs[address] = privateKey;
			console.log( pairs );
			reax_storage.set( symbol__storage_key_fake_wallets_secret_map_.description , JSON.stringify( pairs ) );
		} ,
		remove(address:string) {
			const pairs = _.omit(address_map_private_key_utils.getAll(),[address]);
			reax_storage.set( symbol__storage_key_fake_wallets_secret_map_.description , JSON.stringify( pairs ) );
		} ,
		empyt() {
			reax_storage.set( symbol__storage_key_fake_wallets_secret_map_.description , JSON.stringify( {} ) );
		} ,
		/*获取所有的映射关系键值对 exa:{k1:v1,k2:v2}*/
		getAll() : member {
			const map_string = reax_storage.get<string>( symbol__storage_key_fake_wallets_secret_map_.description ) ?? '{}';
			return typeof map_string === "string" ? JSON.parse( map_string ) : map_string ;
		} ,
		checkAddressIsLoggedIn ,
	};

	reax_wallet.address_memoed_reaction( ( address ) => {
		if ( address ) {
			setState( { real_address : address } );
			const privateKey = checkAddressIsLoggedIn( address );
			if ( privateKey ) {
				setState( { privateKey,logged_in:true , fakeWallet : new Wallet(privateKey) } );
			}else {
				setState( { privateKey : null , logged_in : false } );
			}
		}
	} );

	return () => {

		return ret = {
			get storage_key_fake_wallets_secret_map() {
				return symbol__storage_key_fake_wallets_secret_map_.description;
			} ,
			get fake_wallet_store() {
				return store;
			} ,
			/*使用用户真实的钱包签名并登录 ,当用户点击了签名按钮并且与后端交互成功时,将假钱包私钥缓存进localstorage*/
			async loginWithUserWallet() {
				if ( !store.privateKey ) {
					const fakeWallet = Wallet.createRandom();
					const {
						address : fakeAddress ,
						privateKey : fakePrivateKey ,
					} = fakeWallet;
					const real_address = store.real_address || reax_wallet.account.address;

					const message = {
						from : real_address ,
						alias : fakeAddress ,
						/*所有接口只有这里用string的时间戳.*/
						timestamp : (await request_server_timestamp()).toString(),
					};

					const data = (
						{
							types : {
								EIP712Domain : domainTypes ,
								AddressAlias : messageTypes ,
							} ,
							domain : domainData ,
							primaryType : "AddressAlias" ,
							message : message ,
						}
					);


					const createPayload = async () => {
						const signature:string = await reax_wallet.web3Provider.send( 'eth_signTypedData_v3' , [
							store.real_address.toLowerCase() ,
							JSON.stringify( data ) ,
						] );
						return {
							address : reax_wallet.account.address ,
							data : message ,
							signature ,
						};
					};

					await request_user_address_alias( createPayload);

					address_map_private_key_utils.add( [
						reax_wallet.account.address ,
						fakePrivateKey,
					] );
					setState( {
						logged_in : true ,
						privateKey : fakePrivateKey ,
						fakeWallet ,
					} );
					crayon.green( "登录成功!" );
				}
			} ,
			sign712(){
				/*todo to be continued*/

			},
			/*传入要被签名的对象或字符串*/
			async signByFakeWallet(data:any){
				if(!store.fakeWallet){
					await ret.loginWithUserWallet();
				}
				if({
					"string" : true,
					"number" : true,
					"boolean" : true,
				}[typeof data]){
					return store.fakeWallet.signMessage( data );
				}
				console.log(JSON.stringify(data));
				return store.fakeWallet.signMessage( JSON.stringify( data ) );
			},

			/*登录失效时清空状态,不会清除localstorage*/
			clearInvalidFakeWallet() {
				setState( {
					logged_in : false ,
					/*假钱包私钥*/
					privateKey : null ,
					fakeWallet : null ,
				} );
			},

		};
	};
}();

import { reaxel_storage } from '@@reaxels';
import { Wallet  } from 'ethers';
import {
	request_server_timestamp ,
	request_user_address_alias,
} from '@@requests';
import { reaxel_wallet } from '@@reaxels/wallet/wallet';
/*address-privateKey映射*/
type member = { [ p : string ] : string };
const domainTypes = [
	{
		name : "name" ,
		type : "string" ,
	} ,
	{
		name : "version" ,
		type : "string" ,
	} ,
	{
		name : "salt" ,
		type : "bytes32" ,
	} ,
];
const domainData = {
	name : "Daotion" ,
	version : "1" ,
	salt : "0xf2d857f4a3edcb9b78b5d503bfe733db1e3f6cdc2b7971ee739626c97e86a558" ,
};
const messageTypes = [
	{
		name : "from" ,
		type : "address" ,
	} ,
	{
		name : "alias" ,
		type : "address" ,
	} ,
	{
		name : "timestamp" ,
		type : "string" ,
	} ,
];
