

export const reaxel_test = function(){
	let ret;
	const initialState = {
		info : {} as any ,
		count : 0,
		
	}
	
	const { store, setState } = orzMobx(initialState)
	
	const [fetchInfo, ] = Reaxes.closuredMemo(async () => {
		if (store.count > 3) {
			return Promise.reject({
				msg: 'error'
			})
		}
		return request_overview_info().then((res) => {
			setState({
				info: res
			})
		})
	}, () => []);
	
	return () => {
		return ret = {
			get store(){
				return store;
			},
			
			setCount(){
				setState({
					count : store.count + 1,
					
				})
			},
			fetchInfo(badge){
				return fetchInfo(() => [ badge, store.count > 3 ])();
			} ,
		}
	}
}();

import {
	request_overview_info,
} from "@@requests";