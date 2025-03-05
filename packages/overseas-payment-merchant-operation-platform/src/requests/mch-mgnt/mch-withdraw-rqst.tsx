export const request_mch_withdraw_rqst_list = (payload: PayloadBody<mch_withdraw_rqst_list.payload>) => {
	return request.post<mch_withdraw_rqst_list.response, typeof payload>('/agent/order-withdraw-list', {
		body: payload
	})
};

export const request_mch_withdraw_rqst = (payload: PayloadBody<mch_withdraw_rqst.payload>) => {
	return request.post<mch_withdraw_rqst.response , typeof payload>('/agent/verify-withdraw' , {
		body : payload ,
	});
}

import {
	mch_withdraw_rqst_list ,
	mch_withdraw_rqst ,
} from '@@requests/mch-mgnt/types';