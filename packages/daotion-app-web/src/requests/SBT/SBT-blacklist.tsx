export const request__SBT_blacklist = (payload : PayloadBody<API__SBT_blacklist.payload>) => {
	return request.post<API__SBT_blacklist.response , typeof payload>(`/sbt/sbt-black-list` , {
		body : payload ,
	}).then((data) => {
		return {
			...data ,
			list : data.list.map((element) => {
				return { ...element , inBlacklist : true };
			}) ,
		};
	});
};


import { API__SBT_blacklist } from './types';
