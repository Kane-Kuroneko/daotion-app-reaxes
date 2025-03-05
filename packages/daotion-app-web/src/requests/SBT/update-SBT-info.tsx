export const request__update_SBT_info = (payload : PayloadBody<API__update_SBT_info.payload>) => {
	
	return request.post<API__update_SBT_info.response , typeof payload>(`/sbt/sbt-update-settings` , {
		body : payload ,	
	});
};


import { API__update_SBT_info } from './types';
