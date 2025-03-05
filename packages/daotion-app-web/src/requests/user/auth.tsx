/**
 * 使用用户真实钱包私钥签随机假钱包公钥,获取登录状态
 *
 */
export const request_user_address_alias = (payload:PayloadBody<User__address_alias.payload>) => {
	return request.post<User__address_alias.response , typeof payload>( `/user/substitute-user-wallet` , {
		body : payload ,
	} ).then((res) => {
		if(res.result !== true){
			return Promise.reject( res.result );
		}
		return res.result;
	});
};

import { User__address_alias } from './types';
