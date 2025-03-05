export const request__add_SBT_whitelist = (payload:PayloadBody<API__SBT_add_whitelist.payload>) => {
	
	
	return request.post<API__SBT_add_whitelist.response,typeof payload>(`/sbt/sbt-add-whitelist` , {
		body : payload ,
	});
};


import { API__SBT_add_whitelist } from './types';
