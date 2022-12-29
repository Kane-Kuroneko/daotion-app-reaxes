/**
 * 
 */

export const reaxel_user_auth = function(){
	
	let ret;
	const __storage_key__auth/*用户登录的token*/ = `-mch-auth-token-`;
	const initialState = {
		pending : false ,
		token : null ,
		isLoggedIn : false ,
	};
	const { store , setState } = orzMobx(initialState);
	const reax_storage = reaxel_storage();
	// 登录方法
	const fetchLogin = async (username:string,password:string) => {
		try {
			if(store.pending){
				return ;
			}
			setState({ pending : true });
			const { code } = await request_user_pre_login(async () => {
				return { username };
			});
			const {token} = await request_user_login(async () => {
				return { username , password:crypto.MD5(password).toString() ,code };
			});
			reax_storage.set(__storage_key__auth , token );
			setState({ token , isLoggedIn : true , pending : false });
			return store;
		}catch ( e ) {
			setState({
				pending : false ,
			});
			throw e;
		}
	};
	
	const clearAuthStorage = () => {
		reax_storage.remove(__storage_key__auth);
		crayon.orange(`auth has been cleared`);
	}
	
	{
		const token = reax_storage.get(__storage_key__auth);
		if(token && token.length > 8){
			setState({ token , isLoggedIn : true });
		}
	};
	
	return () => {
		
		return ret = {
			get token (){
				return store.token;
			},
			get pending(){
				return store.pending;
			} ,
			get isLoggedIn(){
				return store.isLoggedIn;
			} ,
			get login(){
				return fetchLogin;
			} ,
			setAuth(auth:Partial<typeof initialState>){
				setState(auth);
				if(auth.token){
					reax_storage.set(__storage_key__auth , auth.token);
				}
			},
			logout(){
				clearAuthStorage();
				setState(initialState);
			},
		};
	};
}();


import {
	request_user_login ,
	request_user_pre_login,
} from '@@requests';
import { reaxel_storage } from '#reaxels';
import crypto from 'crypto-js';
