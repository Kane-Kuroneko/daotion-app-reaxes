export const request__address_unclaimed_SBT_quantity = (payload:PayloadBody<API__address_unclaimed_SBT_quantity.payload>) => {
	
	
	return request.post<API__address_unclaimed_SBT_quantity.response,typeof payload>(`/sbt/address-unclaimed-sbt-quantity` , {
		body : payload ,
	});
};


import { API__address_unclaimed_SBT_quantity } from './types';
