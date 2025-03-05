export const request__save_modify_whitelist = (payload : PayloadBody<API__SBT_save_modify_whitelist.payload>) => {
	
	
	return request.post<API__SBT_save_modify_whitelist.response , typeof payload>(`/sbt/sbt-add-whitelist` , {
		body : payload ,
	});
};


import { API__SBT_save_modify_whitelist } from './types';
