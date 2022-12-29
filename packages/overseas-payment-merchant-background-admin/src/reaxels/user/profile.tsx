export const reaxel_user_info = function(){
	let ret;
	const initalState = {
		getUserInfoLoading : false,
		getApiLoading : false ,
		userInfo : {} as any ,
		currentTab : 'userInfo' ,
		apiConfig : {} as any ,
	};
	const { store , setState } = orzMobx(initalState);
	
	const reax_user_auth = reaxel_user_auth();
	
	
	// 获取user信息
	const getUserInfo = async () => {
		if (store.getUserInfoLoading) return;
		setUserInfoLoading(true);
		return request_user_info().then((userInfo : any) => {
			
			setState({
				userInfo ,
			});
			setUserInfoLoading(false);
		});
	}
	const setUserInfoLoading = (pending) => {
		queueMicrotask(() =>{setState({ getUserInfoLoading: pending })})
	}
	const setApiPending = (pending) => {
		queueMicrotask(() => setState({ getApiLoading: pending }));
	};

	
	const fetchApiConfig = async () => {
		if (store.getApiLoading) return;
		setApiPending(true)
		return request_user_api().then ((apiConfig : any) => {
			setState({
				apiConfig,
			})
			setApiPending(false);
		}).finally(() => {
			setApiPending(false);
		})
	}
	
	// 获取api配置
	const [ closureFetchApiConfig ] = Reaxes.closuredMemo(async () => {
		return fetchApiConfig()
	} , () => []);

	
	//监听是否登录
	Reaxes.observedMemo(() => {
		if( reax_user_auth.isLoggedIn ) {
			getUserInfo();
		} else {
			setState(initalState);
		}
	} , () => [ reax_user_auth.isLoggedIn ]);
	
	
	return () => {
		return ret = {
			get userInfo(){
				return store.userInfo;
			} ,
			get currentTab(){
				return store.currentTab;
			} ,
			get apiConfig(){
				return store.apiConfig;
			},
			get getApiLoading(){
				return store.getApiLoading;
			},
			closureFetchApiConfig(badge){
				return closureFetchApiConfig(() => [badge])()
			} ,
			fetchApiConfig(){
				return fetchApiConfig()
			},
			changeTab(tabValue : string){
				setState({
					currentTab : tabValue,
				});
			} ,
			
			
		};
	};
	
	
}();


import { reaxel_user_auth } from './auth';
import {
	request_user_info ,
	request_user_api ,
	request_user_pre_login,
} from '@@requests';
import { User__info } from "@@requests/user/type";
