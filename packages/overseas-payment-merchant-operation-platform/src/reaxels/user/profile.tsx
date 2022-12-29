export const reaxel_user_info = function(){
	let ret;
	const initalState = {
		loading : false as { promise : Promise<any> } | false ,
		userInfo : {} as any ,
		currentTab : 'userInfo' ,
		apiConfig : {} as any ,
	};
	const { store , setState } = orzMobx(initalState);
	
	const reax_user_auth = reaxel_user_auth();
	
	
	// 获取user信息
	const getUserInfo = async () => {
		if( store.loading ) return;

		setState({
			loading: {
				promise: request_user_info().then ((userInfo : any) => {
					setState({
						userInfo,

					})
				}).finally(() => {
					setState({ loading : false });
				})
			}
		})
	};
	
	// 获取api配置
	const [ fetchApiConfig ] = Reaxes.closuredMemo(async () => {
		setState({
			loading: {
				promise: request_user_api().then ((apiConfig : any) => {
					setState({
						apiConfig,
						loading : false,

					})
				}).finally(() => {
					setState({ loading : false });
				})
			}
		})
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
				return store.apiConfig
			},
			closuredFetchApiConfig(badge){
				return fetchApiConfig(() => [badge])()
			} ,
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
