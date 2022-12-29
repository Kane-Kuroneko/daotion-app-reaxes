export const request_cashier = (payload) => {
	return request.post(`/v1/checkstand/get-trade` , {
		body : payload ,
	});
};
