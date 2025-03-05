export const request_mch_mgnt_list = (payload:PayloadBody<mch_mgnt_list.payload>) => {
	
	return request.post<mch_mgnt_list.response,typeof payload>(`/agent/mch-list`,{
		body : payload,
	});
};

import { mch_mgnt_list } from "@@requests/mch-mgnt/types";
