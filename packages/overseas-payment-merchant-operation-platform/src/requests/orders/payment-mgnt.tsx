//@ts-nocheck
export const request_payment_mgnt_list = (payload:PayloadBody<Order__payment_order.payload>) => {
	return request.post<Order__payment_order.response,typeof payload>(`/mch/order-pay-out-list` , {
		body : payload ,
	});
};


import { Order__payment_order } from './types';

import { Order__collection_order } from './types';
