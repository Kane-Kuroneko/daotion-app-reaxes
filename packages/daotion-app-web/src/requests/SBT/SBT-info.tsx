/**
 * 请求SBT c端视角详情页
 */


export const request__SBT_info = (payload:PayloadBody<API__SBT_info.payload>) => {
	
	return request.post<API__SBT_info.response,typeof payload>( `/sbt/sbt-detail` , {
		body : payload ,
	} );
};
import { API__SBT_info } from './types';
