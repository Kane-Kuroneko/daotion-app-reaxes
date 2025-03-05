export const request_BE_message = (payload:PayloadBody<BE_messages.payload>):Promise<{
	tips : { type : number, number : number }[];
}> => {
	
	
	return request.post<BE_messages.response,typeof payload>(`/agent/new-tips`,{
		body:payload,
	}).then((data) => {
		return {
			...data,
			tips : data.tips ? data.tips.map(({type,num}) => {
				return {
					type ,
					number:num
				}
			}) : []
		}
	});
}
import { BE_messages } from './types';
