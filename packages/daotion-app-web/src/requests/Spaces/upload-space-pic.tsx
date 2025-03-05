const upload = (iconType : "bannber" | "avatar") => {
	
	return (payload:PayloadBody<Space__upload_pics.payload>) => {
		return request.post<Space__upload_pics.response,typeof payload>(`/space/upload-space-pictures`,{
			body : payload ,
		})
	};
};

import { Space__upload_pics } from './types';

export const request_upload_space_banner = upload('bannber');
export const request_upload_space_avatar = upload('avatar');
