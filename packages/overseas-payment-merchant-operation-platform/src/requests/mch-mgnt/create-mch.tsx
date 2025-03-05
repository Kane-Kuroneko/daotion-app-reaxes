export const request_create_mch = (payload : PayloadBody<create_mch.payload>) => {
	return request.post<create_mch.response , typeof payload>(`/agent/new-mch` , {
		body : payload ,
	});
};

import { create_mch } from './types';
