/*C端用户claim SBT操作*/
export const request__user_claim_SBT = (payload : PayloadBody<API__user_claim_SBT.payload>) => {
	
	return request.post<API__user_claim_SBT.response , typeof payload>(`/sbt/sbt-claim` , {
		body : payload ,		
	});
};

import { API__user_claim_SBT } from './types';
