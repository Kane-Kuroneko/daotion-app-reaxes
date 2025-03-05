import {
	User__profile_info ,
	User__update_profile ,
	User__upload_avatar ,
} from './types';

/*用户更新profile*/
export const request_user_update_profile = (
	payload : PayloadBody<User__update_profile.payload> ,
) => {
	return request.post( `/user/user-update-profile` , {
		body : payload ,
	} );
};

/*用户上传头像和banner*/
export const request_user_upload_profile_pictures = (
	payload : PayloadBody<User__upload_avatar.payload> ,
) => {
	return request.post<User__upload_avatar.response>( `/user/upload-profile-pictures` , {
		body : payload ,
	} );
};
