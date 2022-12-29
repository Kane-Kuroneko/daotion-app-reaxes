//@ts-nocheck

export const request_deposit_order = (payload:PayloadBody<Order__deposit_order.payload>) => {
	return request.post<Order__deposit_order.response,typeof payload>(`/mch/order-recharge-list` , {
		body : payload ,
	});
};


import { Order__deposit_order } from './types';
