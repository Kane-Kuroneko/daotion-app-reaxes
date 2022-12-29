//@ts-nocheck

export const request_overview_info = () => {
	return  request.post(`/mch/home`, {
	
	})
}


export const request_fin_detail = (payload: PayloadBody<Overview__fin_detail.payload>) => {
	return request.post<Overview__fin_detail.response, typeof payload>(`/mch/money-detail`, {
		body : payload,
		
	})
}

export const request_withdraw_apply = (payload: PayloadBody<Overview__withdraw.payload>) => {
	return request.post<Overview__withdraw.response, typeof payload>(`/mch/withdraw`, {
		body : payload,
		
	})
}

export const request_deposit_apply = (payload: PayloadBody<Overview__deposit.payload>) => {
	return request.post<Overview__withdraw.response, typeof payload>(`/mch/recharge`, {
		body : payload,
		
	})
}

import { Overview__fin_detail, Overview__withdraw, Overview__deposit } from './types'
