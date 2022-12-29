export const reaxel_user_login = (function () {
	let ret;
	const initialState = {
		input_username : '' ,
		input_password : '' ,
	};
	const { store , setState } = orzMobx(initialState);
	const reax_user_auth = reaxel_user_auth();
	
	return () => {
		return (
			ret = {
				get store(){
					return store;
				} ,
				get setFields(){
					return setState;
				} ,
				/*用户点击登录*/
				login(){
					return reax_user_auth.login(
						store.input_username ,
						store.input_password,
					).then((data) => {
						setState(initialState);
						return data;
					})
				} ,
			}
		);
	};
})();

import { reaxel_user_auth } from '@@reaxels/user/auth';
