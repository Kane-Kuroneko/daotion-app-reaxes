import { Space__create_space } from './types';

export const request_create_space = (payload:PayloadBody<Space__create_space.payload>) => {
	
	return request.post<Space__create_space.response,typeof payload>('/space/create-space',{
		body : payload,
	}).then((data) => {
		return data.spaceID;
	});
}
