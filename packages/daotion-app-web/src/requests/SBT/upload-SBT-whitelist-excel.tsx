export const request__upload_SBT_whitelist_excel = (payload : PayloadBody<API__SBT_upload_file_whitelist.payload>) => {
	
	
	return request.post<API__SBT_upload_file_whitelist.response,typeof payload>(`/sbt/sbt-get-file-whitelist` , {
		
		body : payload ,
	}).then((response) => {
		return {
			...response ,
			list : response.list.map((element) => {
				return {
					..._.omit(element , [ 'offset' ]) ,
					address : element.address.toLowerCase() ,
					editing : false ,
					modifiedOffset : element.offset ,
				};
			}) ,
			
		};
	});
};

import { API__SBT_upload_file_whitelist } from './types';
