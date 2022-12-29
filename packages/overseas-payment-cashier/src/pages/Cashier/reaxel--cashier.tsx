export const reaxel_cashier = function(){
	let tradeID;
	const { store , setState } = orzMobx({
		pending : true ,
		tradeInfo : null,
	});
	const fetchCashier = (tradeID) => {
		
		return request_cashier(() => {
			return {
				tradeID,
			}
		}).then((data) => {
			console.log(data);
			setState({ pending : false , tradeInfo : data });
		});
	}
	
	const [getTradeID] = Reaxes.closuredMemo(() => {
		return qs.parse(location.search.slice(1)).tradeID as string;
	}, () => []);
	
	return () => {
		return {
			get state(){
				return store;
			},
			/*copy to clipboard*/
			ctc(text){
				return orzPromise((resolve,reject) => {
					if(ctc(text)){
						resolve(true);
					}else {
						reject(false);
					};
				});
			},
			fetchCashier,
			getTradeID(){
				return getTradeID(() => [location.search])();
			},
		};
	};
}();


import ctc from 'copy-to-clipboard';
import { request_cashier } from '@@requests';
import qs from 'qs';
