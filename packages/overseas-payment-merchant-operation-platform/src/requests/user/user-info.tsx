export const request_modify_password = (
	payload : PayloadBody<User__modify_password.payload> ,
) => {
	
	return request.post(`/mch/modify-password` , {
		body : payload ,
	}).then((res) => {
		return res;
	});
};

export const request_user_info = () => {
	return request.post(`/agent/user-info` , {
	}).then((res) => {
		return res
	});
};

export const request_user_api = () => {
	return request.post(`/mch/user-api-info` , {}).then((res) => {
		return res
	});
}

export const request_user_api_set = (
	payload: PayloadBody<User__api_set.payload>
) => {
	return request.post(`/mch/user-api-info-set` , {
		body : payload ,
	}).then((res) => {
		return res;
	});
}

import  { User__modify_password, User__api_set } from './type'
