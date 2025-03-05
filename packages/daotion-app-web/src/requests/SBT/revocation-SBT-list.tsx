export const request__revocation_SBT_list = (payload:PayloadBody<API__revocation_SBT_list.payload>) => {
	
	return request.post<API__revocation_SBT_list.response , typeof payload>(`/sbt/sbt-revocation-list` , {
		body : payload ,
	});
};


import { API__revocation_SBT_list } from './types';
