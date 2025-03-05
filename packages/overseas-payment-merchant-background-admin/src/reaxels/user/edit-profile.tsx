export const reaxel_edit_info = function(){
	let ret;
	const { store , setState } = orzMobx({
		currentTab : 'userInfo',
	});

	
	const { store : resetPwdStore , setState : setStatePwd } = orzMobx({
		oldPassword : '' ,
		newPassword : '' ,
		checkPassword : '' ,
	});
	
	const { store : setApiStore , setState : setStateApi } = orzMobx({
		payInCallback : '' ,
		payOutCallback : '' ,
		payOutWhitelist :'',
		address : '' ,
		apiSetModalShow : false ,
		apiSetModalKey : 'payInCallback' ,
	});
	
	const { pendingState, setPending } = toolkits.orzPending();
	
	// 修改密码方法
	const modify = async () => {
		const { oldPassword , newPassword  } = resetPwdStore;
		if (pendingState.pending) return;
		setPending(true)
		return request_modify_password(async () => (
			{
				oldPassword : crypto.MD5(oldPassword).toString() ,
				newPassword : crypto.MD5(newPassword).toString(),
			}
		)).then((res) => {
			if (res.result !== 0) {
				setStatePwd({
					oldPassword : '' ,
					newPassword : '' ,
					checkPassword : '' ,
				})
				setPending(false)
				return 'error'
			} else {
				const {setAuth} = reaxel_user_auth();
				setAuth({
					isLoggedIn : true ,
					token : res.newToken ,
				});
				setStatePwd({
					oldPassword : '' ,
					newPassword : '' ,
					checkPassword : '' ,
				});
				setPending(false)
			}
			
		}).catch((e) => {
			setPending(false)
		});
	};
	
	// 修改Api方法
	const setApiConfig = async () => {
		const { apiSetModalKey } = setApiStore;
		if (pendingState.pending) return;
		setPending(true);
		
		return request_user_api_set(async () => {
			if (apiSetModalKey === 'payOutWhitelist') {
				return {
					payOutWhitelist: setApiStore.payOutWhitelist.split(';').filter(i => i !== '')
				}
			} else {
				return {
					[apiSetModalKey] : setApiStore[apiSetModalKey] ,
				};
			}
			
		}).then((res) => {
			setPending(false)
		}).catch((e) => {
			setPending(false)
			throw {
				msg: '操作失败,格式错误'
			}
		});
	};
	const reax_user_info = reaxel_user_info()
	
	return () => {
		return ret = {
			get currentTab(){
				return store.currentTab;
			} ,
			changeTab(tabValue : string){
				setState({
					currentTab : tabValue ,
				});
			} ,
			get resetPwdStore(){
				return resetPwdStore;
			} ,
			get setStatePwd(){
				return setStatePwd;
			} ,
			get setApiStore(){
				return setApiStore;
			} ,
			get setStateApi(){
				return setStateApi;
			} ,
			get pending(){
				return pendingState.pending;
			},
			showModal(key){
				let value = '';
				if (key === 'payOutWhitelist') {
					const whiteList = reax_user_info.apiConfig['payOutWhitelist']
					whiteList.forEach((i) => {
						value = value + i + ';'
					})
				} else {
					value = reax_user_info.apiConfig[key];
				}
				setStateApi({
					apiSetModalShow : true ,
					apiSetModalKey : key ,
					[key]: value
				});
			} ,
			
			 modifyPwd(){
				return  modify()
			} ,
			setApiConfig(){
				return setApiConfig();
			},
		};
	};
}();

import { request_modify_password, request_user_api_set } from "@@requests";
import { reaxel_user_info } from '@@reaxels/user/profile';
import { reaxel_user_auth } from '@@reaxels';
import { reaxel_storage } from '#reaxels';
import crypto from 'crypto-js';
import { orzMobx } from "reaxes";
