/**
 * 用户登录相关接口
 */
export const request_user_login = (
	payload: PayloadBody<User__login.payload>) => {
	return request.post(`/login/`, {
		body: payload,
	}).then((res) => {
		return res
	})
}

export const request_modify_password = (
	payload: PayloadBody<User__modify_password.payload>
) => {
	return request.post(`/modify`, {
		body: payload
	}).then((res) => {
		return res
	})
}

import {User__login, User__modify_password } from '../types'