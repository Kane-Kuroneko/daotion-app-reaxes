
export const request_overview_order_count = (payload: PayloadBody<Overview__order_count.payload>) => {
	return request.post('/mch/order-count', {
		body: payload
	})
}

import { Overview__order_count } from './types'