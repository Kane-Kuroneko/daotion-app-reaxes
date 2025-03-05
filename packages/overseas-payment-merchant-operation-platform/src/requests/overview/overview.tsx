//@ts-nocheck

export const request_overview_info = () => {
	return  request.post(`/agent/home`, {
	
	})
}


export const request_account_fin_detail = (payload: PayloadBody<Overview__fin_detail.payload>) => {
	return request.post<Overview__fin_detail.response, typeof payload>(`/agent/mch-money-detail`, {
		body : payload,
		
	})
}
export const request_service_fin_detail = (payload: PayloadBody<Overview__fin_detail.payload>) => {
	return request.post<Overview__fin_detail.response, typeof payload>(`/agent/tax-money-detail`, {
		body : payload,
		
	})
}

export const request_withdraw_apply = (payload: PayloadBody<Overview__withdraw.payload>) => {
	return request.post<Overview__withdraw.response, typeof payload>(`/agent/withdraw-record`, {
		body : payload,
		
	})
}


import { Overview__fin_detail, Overview__withdraw } from './types'
