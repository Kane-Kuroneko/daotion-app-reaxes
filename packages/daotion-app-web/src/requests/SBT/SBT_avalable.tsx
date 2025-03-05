/*查询当前SBTID是否属于当前spaceID*/

export const request__SBT_available = (payload : PayloadBody<API__SBT_available.payload>) => {
	
	
	return request.post<API__SBT_available.response , typeof payload>(`/sbt/sbt-available` , {
		body : payload ,
	});
};


import { API__SBT_available } from './types';
