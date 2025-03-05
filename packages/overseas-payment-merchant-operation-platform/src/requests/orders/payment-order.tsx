//@ts-nocheck

export const request_payment_order = (payload:PayloadBody<Order__payment_order.payload>) => {
	return request.post<Order__payment_order.response,typeof payload>(`/agent/order-pay-out-list` , {
		body : payload ,
	});
};


import { Order__payment_order } from './types';
