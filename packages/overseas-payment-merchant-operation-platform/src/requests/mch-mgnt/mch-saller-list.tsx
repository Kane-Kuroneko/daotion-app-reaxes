export const request_mch_saller_list = (payload?:PayloadBody<mch_saller_list.payload>) => {
	
	return request.post<mch_saller_list.response,typeof payload>(`/agent/all-seller` , {
		body : payload ,
	});
};

import { mch_saller_list } from './types';
