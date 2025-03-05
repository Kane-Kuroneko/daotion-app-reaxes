export const request__page_SBT_holder_list = (payload : PayloadBody<API__paged_SBT_hoder_list.payload>) => {
	
	return request.post<API__paged_SBT_hoder_list.response , typeof payload>(`/sbt/paged-all-sbt-holders` , {
		body : payload ,
	});
};


import { API__paged_SBT_hoder_list } from './types';
