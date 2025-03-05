/**
 * 获取商户的配置信息
 */
export const request_mch_info = (payload : PayloadBody<mch_info.payload>) => {
	
	return request.post<mch_info.response,typeof payload>(`/agent/mch-info` , {
		body : payload ,
	});
};
import { mch_info } from './types';
