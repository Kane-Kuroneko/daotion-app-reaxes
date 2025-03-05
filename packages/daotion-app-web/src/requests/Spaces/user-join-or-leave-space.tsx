import {Space__user_join_space,Space__user_leave_space} from './types';


export const request_user_join_space = (payload: PayloadBody<Space__user_join_space.payload>) => {
	
	
	return request.post<Space__user_join_space.response , typeof payload>( '/user/user-join-space' , {
		body : payload,
	} );
};

export const request_user_leave_space = (payload : PayloadBody<Space__user_leave_space.payload>) => {
	
	
	return request.post<Space__user_leave_space.response , typeof payload>( '/user/user-leave-space' , {
		body : payload ,
	} );
};
