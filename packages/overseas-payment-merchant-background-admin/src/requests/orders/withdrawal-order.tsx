//@ts-nocheck

export const request_withdrawal_order = (payload:PayloadBody<Order__withdrawal_order.payload>) => {
	return request.post<Order__withdrawal_order.response,typeof payload>(`/mch/order-withdraw-list` , {
		body : payload ,
	});
};


import { Order__withdrawal_order } from './types';
