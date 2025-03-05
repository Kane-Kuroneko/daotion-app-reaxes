export const request_mch_deposit_rqst_list = (payload: PayloadBody<mch_deposit_rqst_list.payload>) => {
	return request.post<mch_deposit_rqst_list.response, typeof payload>('/agent/order-recharge-list',{
		body: payload
	})
};

export const request_mch_deposit_rqst = (payload: PayloadBody<mch_deposit_rqst.payload>) => {
	return request.post<mch_deposit_rqst.response , typeof payload>('/agent/verify-recharge' , {
		body : payload ,
	});
}
import {
	mch_deposit_rqst_list ,
	mch_deposit_rqst,
} from '@@requests/mch-mgnt/types';