//@ts-nocheck

export const request_collection_order = (payload:PayloadBody<Order__collection_order.payload>) => {
	return request.post<Order__collection_order.response,typeof payload>(`/mch/order-pay-in-list` , {
		body : payload ,
	});
};


import { Order__collection_order } from './types';
