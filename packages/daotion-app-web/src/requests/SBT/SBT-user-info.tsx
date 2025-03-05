/*查询用户对于某个SBT的信息*/
export const request__SBT_user_info = (payload : PayloadBody<API__SBT_user_info.payload>) => {
	
	
	return request.post<API__SBT_user_info.response , typeof payload>(`/sbt/sbt-user-info` , {
		body : payload ,
	});
};

import { API__SBT_user_info } from './types';
