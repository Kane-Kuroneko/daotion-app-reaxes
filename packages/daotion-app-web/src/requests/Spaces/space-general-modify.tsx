import { Space__general_modify } from './types';
export const request_space_general_modify = (payload:PayloadBody<Space__general_modify.payload>) => {
	
	return request.post<Space__general_modify.response,typeof payload>( `/space/space-update-settings-general` , {
		body : payload ,
	} );
};
