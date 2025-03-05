import { Space__user_joined_Space_list } from './types';


export const request_user_joined_space_list = ( payload : PayloadBody<Space__user_joined_Space_list.payload> ) => {
	
	
	return request.post<Space__user_joined_Space_list.response , typeof payload>( '/user/user-joined-space-list' , {
		body : payload,
	} ).
	then( ( data ) => {
		return data;
	} ).
	catch( ( e ) => {
		console.error( e );
		throw e;
	} ) as Promise<Space__user_joined_Space_list.response>;
};
