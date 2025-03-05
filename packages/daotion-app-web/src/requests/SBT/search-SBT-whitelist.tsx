export const request__search_SBT_whitelist = (payload:PayloadBody<API__SBT_search_whitelist.payload>) => {
	
	
	return request.post<API__SBT_search_whitelist.response,typeof payload>(`/sbt/sbt-whitelist-search`,{
		body : payload,
	}).then((response) => {
		return {
			...response ,
			whitelist : response.whitelist.map((item) => (
				{
					...item ,
					address : item.address.toLowerCase(),
					editing : false ,
					modifiedOffset : 0 ,
				}
			)) ,
		};
	});
}


import { API__SBT_search_whitelist } from './types';
