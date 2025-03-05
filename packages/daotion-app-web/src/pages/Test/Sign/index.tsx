import {
	ethers ,
	Wallet ,
} from 'ethers';
import {
	reaxel_user ,
	reaxel_wallet,
} from '@@reaxels';
import { request_user_address_alias } from '@@requests';
import { Button } from 'antd';

const randomWallet = Wallet.createRandom();
/*登录验证接口 EIP-712*/
const reaxel_login = function () {
	const {
		store ,
		setState,
	} = orzMobx( {
		sign_avalable : false ,
	} );
	const reax_wallet = reaxel_wallet();
	const sign_reaction = reax_wallet.address_memoed_reaction( ( address ) => {
		if ( address ) {
			setState( { sign_avalable : true } );
		} else {
			setState( { sign_avalable : false } );
		}
	} );
	return ( lifecycle : Lifecycle ) => {
		
		return {
			get store() {
				return store;
			} ,
			async login() {
				const {
					address : randomAdress ,
					privateKey ,
				} = randomWallet;
				
				const address = reax_wallet.account?.address;
				
				
				const domainTypes = [
					{
						name : "name" ,
						type : "string",
					} ,
					{
						name : "version" ,
						type : "string",
					} ,
					{
						name : "salt" ,
						type : "bytes32",
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
						type : "address",
					} ,
					{
						name : "alias" ,
						type : "address",
					} ,
					{
						name : "timestamp" ,
						type : "string",
					} ,
				];
				const message = {
					from : address ,
					alias : randomAdress ,
					timestamp : Date.now().
					toString() ,
				};
				
				const data = (
					{
						types : {
							EIP712Domain : domainTypes ,
							AddressAlias : messageTypes ,
						} ,
						domain : domainData ,
						primaryType : "AddressAlias" ,
						message : message,
					}
				);
				const createPayload = async () => {
					const signature = await reax_wallet.web3Provider.send( 'eth_signTypedData_v3' , [
						reax_wallet.account?.address.toLowerCase() ,
						JSON.stringify( data ) ,
					] );
					return {
						address : reax_wallet.account?.address ,
						data : message ,
						signature ,
					};
				}
				await request_user_address_alias( createPayload );
			},
		};
	};
}();
/*普通校验假签名请求后端*/
const reaxel_sign_request = function () {
	const reax_wallet = reaxel_wallet();
	// new Wallet(randomWallet.privateKey);
	// ethers.getDefaultProvider();
	return () => {
		const {
			address : randomAdress ,
			privateKey ,
		} = randomWallet;
		
		
		return {
			async sign() {
				//todo 当用户点击签名按钮后 往localstorage里存key:真钱包address&value:假钱包私钥.
				// (new ethers.providers.Web3Provider(randomWallet.provider, 'any')).getSigner().signMessage(JSON.stringify({
				
				
				
				const createPayload = async () => {
					const signature = await randomWallet.signMessage( JSON.stringify( {
						"daoID" : 0 ,
						"joinAddress" : "0x46DE5Eb1ecd41A974b86B85C6c53e1a04606dA59",
					} ) );
					return {
						address : reax_wallet.account.address ,
						data : {
							"daoID" : 0 ,
							"joinAddress" : "0x46DE5Eb1ecd41A974b86B85C6c53e1a04606dA59" ,
						} ,
						signature ,
					};
				};
				return request.post( '/user/join-dao' , {
					body : createPayload ,
				} );
			} ,
		};
	};
}();

export const SignTest = reaxper( class extends Reaxlass {
	
	// reax_login = reaxel_login(this.lifecycle);
	//
	// reax_sign_request = reaxel_sign_request( this.lifecycle );
	
	user_sign_login = reaxel_user();
	
	reax_sign_request = reaxel_sign_request();
	reax_wallet = reaxel_wallet();
	
	render() {
		return <>
			{ (
				this.reax_wallet.wallet && !this.user_sign_login.fake_wallet_store.logged_in
			) ? <Button
				type = "primary"
				onClick = { () => {
					this.user_sign_login.loginWithUserWallet();
				} }
			>
				sign
			</Button> : null }
			<Button
				onClick = { () => {
					this.reax_wallet.connectWallet();
				} }
				type = "dashed"
			>
				connect Wallet
			</Button>
			<Button
				onClick = { () => {
					this.reax_sign_request.sign();
				} }
				type = "dashed"
			>
				request with fake wallet sign
			</Button>
		</>;
	}
} );
