
export const request_overview_order_count = (payload: PayloadBody<Overview__order_count.payload>) => {
	return request.post('/agent/order-count', {
		body: payload
	})
}

import { Overview__order_count } from './types'