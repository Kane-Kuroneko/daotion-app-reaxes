import {
	User__profile_info ,
	User__update_profile ,
	User__upload_avatar ,
	User__profile_joined_list ,
} from './types';

/*获取用户profile信息*/
export const request_user_profile = ( payload : PayloadBody<User__profile_info.payload> ) => {
	return request.post<User__profile_info.response , typeof payload>( `/user/user-profile-detail` , {
		body : payload ,
	} ).
	then( ( res ) => {
		return res;
	} );
};

/*获取用户主页里用户加入的space list*/
export const request_user_profile_joined_list = (payload : PayloadBody<User__profile_joined_list.payload>) => {
	
	
	return request.post<User__profile_joined_list.response , typeof payload>( '/user/user-profile-joined-space-list-paged' , {
		body : payload ,
	} );
}
