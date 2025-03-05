export const request_space_member_list = (payload:PayloadBody<Space__member_list.payload>) => {

	return request.post<Space__member_list.response,typeof payload>('/space/space-member-list',{
		body : payload,
	})
};


import { Space__member_list } from './types';
