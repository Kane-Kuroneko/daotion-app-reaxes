export namespace Order__collection_order {
	
	export type response = {
		"indexEnd" : number,
		"count" : number,
		"total" : number,
		"firstTimestamp" : number,
		"orderList" : {
			"orderID" : string,
			"state" : number,
			"money" : number,
			"userName" : string,
			"tax" : number,
			"createTimestamp" : number,
			"updateTimestamp" : number
		}[],
	};
	export type payload = {
		indexStart : number,
		count : number,
		firstTimestamp : number,
		orderID : string,
		orderState : number,
		createTimestampBegin : number,
		createTimestampEnd : number,
		updateTimestampBegin : number,
		updateTimestampEnd : number,
	};
}
export namespace Order__payment_order {
	
	export type response = {
		"indexEnd" : number,
		"count" : number,
		"total" : number,
		"firstTimestamp" : number,
		"orderList" : {
			"orderID" : string,
			"state" : number,
			"money" : number,
			"userName" : string,
			"tax" : number,
			"createTimestamp" : number,
			"updateTimestamp" : number
		}[],
	};
	export type payload = {
		indexStart : number,
		count : number,
		firstTimestamp : number,
		orderID : string,
		orderState : number,
		createTimestampBegin : number,
		createTimestampEnd : number,
		updateTimestampBegin : number,
		updateTimestampEnd : number,
	};
}
export namespace Order__withdrawal_order {
	
	export type response = {
		"indexEnd" : number,
		"count" : number,
		"total" : number,
		"firstTimestamp" : number,
		"orderList" : {
			"orderID" : string,
			"state" : number,
			"money" : number,
			"userName" : string,
			"tax" : number,
			"createTimestamp" : number,
			"updateTimestamp" : number
		}[],
	};
	export type payload = {
		indexStart : number,
		count : number,
		firstTimestamp : number,
		orderID : string,
		orderState : number,
		createTimestampBegin : number,
		createTimestampEnd : number,
		updateTimestampBegin : number,
		updateTimestampEnd : number,
	};
} 

export namespace Order__deposit_order {
	
	export type response = {
		"indexEnd" : number,
		"count" : number,
		"total" : number,
		"firstTimestamp" : number,
		"orderList" : {
			"orderID" : string,
			"state" : number,
			"money" : number,
			"userName" : string,
			"tax" : number,
			"createTimestamp" : number,
			"updateTimestamp" : number
		}[],
	};
	export type payload = {
		indexStart : number,
		count : number,
		firstTimestamp : number,
		orderID : string,
		orderState : number,
		createTimestampBegin : number,
		createTimestampEnd : number,
		updateTimestampBegin : number,
		updateTimestampEnd : number,
	};
} 
