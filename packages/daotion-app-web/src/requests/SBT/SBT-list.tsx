export const request__SBT_list = ( payload : PayloadBody<API__SBT_list.payload> ) => {
	
	return request.post<API__SBT_list.response , typeof payload>( '/sbt/paged-all-sbt-list' , {
		body : payload ,
	} )
};


import { API__SBT_list } from '@@requests/SBT/types';
