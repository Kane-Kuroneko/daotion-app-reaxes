export const request__create_SBT = (payload:PayloadBody<FormData>) => {
	
	return request.post<API__create_SBT.response,typeof payload>(`/sbt/create-sbt`,{
		body : payload,
	});
};

import { API__create_SBT } from './types';
