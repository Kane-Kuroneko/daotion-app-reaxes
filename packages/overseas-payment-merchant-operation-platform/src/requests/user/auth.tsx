/**
 * 用户登录相关接口
 */
export const request_user_pre_login = (
	payload: PayloadBody<User__pre_login.payload>
) => {
	return request.post<User__pre_login.response,typeof payload>('/agent/login-code', {
		body : payload,
	}).then((res) => {
		return res;
	})
}

export const request_user_login = (
	payload: PayloadBody<User__login.payload>
) => {
	return request.post<User__login.response,typeof payload>(`/agent/login` , {
		body : payload ,
	}).then((res) => {
		return res;
	});
}


import {
	User__login ,
	User__pre_login,
} from './type';
