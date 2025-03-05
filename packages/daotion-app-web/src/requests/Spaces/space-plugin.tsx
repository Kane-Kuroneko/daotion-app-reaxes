export const request__space_plugin = (payload : PayloadBody<Space__plugin_list.payload>) => {
	
	return request.post<Space__plugin_list.response , typeof payload>(`/plugin/space-plugin-list` , {
		body : payload ,
	});
};

import { Space__plugin_list } from './types';
