export const request_edit_mch_cfg = (payload : PayloadBody<edit_mch_cfg.payload>) => {
	
	return request.post<edit_mch_cfg.response , typeof payload>(`/agent/edit-mch` , {
		body : payload ,
	});
};

import { edit_mch_cfg } from './types';
