export const reaxel_ctrl = function(){
	let ret;
	const initialState = {
		name : '',
		password : '',
		contactPerson : '',
		contactPhone : '',
		sellerID : null ,
		payIn : {
			mode : "basic" as "basic"|"advanced",
			amount : null,
			left : {
				fix : null,
				rate : null,
			},
			right : {
				fix : null,
				rate : null,
			},
		},
		payOut : {
			mode : "basic" as "basic"|"advanced",
			amount : null,
			left : {
				fix : null,
				rate : null,
			},
			right : {
				fix : null,
				rate : null,
			},
		},
		whiteList : [""],
		status : 1 ,
		payInStatus : 1,
		payOutStatus : 1,
	};
	const { store , setState } = orzMobx(initialState);
	const {store:state$sallers,setState:setState$sallers} = orzMobx({sallers : null as mch_saller_list.response['list']});
	
	const [closFetchSellerList] = Reaxes.closuredMemo(() => {
		return request_mch_saller_list().then(({ list }) => {
			setState$sallers({ sallers : list });
		});
	} , () => []);
	
	return () => {
		return ret = {
			setFields : setState ,
			state$mchCNE : store ,
			get sallers(){
				return state$sallers.sallers;
			},
			closFetchSellerList,
			reset(){
				setState(initialState);
			},
			async validate(){
				/*校验密码合法性,如果是空值则代表不修改密码*/
				if(store.password !== '' && !/[0-9a-zA-Z_.`!@#$%^&*(){}/+|\\?\-]{6,18}/.test(store.password)){
					throw new Error('密码不合法:需要6-18位的数字、字母、英文半角符号。不能包含特殊字符');
				}
			},
		};
	};
}();


import { request_mch_saller_list } from '@@requests';
import { mch_saller_list } from '@@requests/mch-mgnt/types';
