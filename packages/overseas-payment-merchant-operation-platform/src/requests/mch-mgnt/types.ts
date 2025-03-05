/*商户列表*/
export namespace mch_mgnt_list {
	
	export type payload = {
		indexStart : number,
		count : number ,
		firstTimestamp : number,
		mchNo : string,
	};
	
	export type response = {
		"indexEnd": number,
		"count": number,
		"total": number,
		"firstTimestamp": number,
		"list": item[],
	};
	
	export type item = {
		"mchNo": string,
		"name": string,
		"phone": string,
		"seller": string,
		"status": number,
		"payInStatus": number,
		"payOutStatus": number
	};
}
/*商户详情*/
export namespace mch_info {
	
	export type payload = {
		mchNo : string,
	};
	
	export type response = {
		mchNo : string,
		name:string,
		contactPerson :string,
		contactPhone : string,
		sellerID : number,
		createTimestamp : number,
		mchKey : string,
		address : string,
		payInCallback:string,
		payOutCallback:string,
		status: number,
		payInStatus: number,
		payOutStatus: number,
		whiteList : string[],
		payIn:{
			start:number,
			fix:number,
			rate:number
		}[],
		payOut:{
			start:number,
			fix:number,
			rate:number
		}[],
	};
	
}

/*商户提现申请列表*/
export namespace mch_withdraw_rqst_list{
	export type payload = {
		indexStart : number,
		count: number,
		firstTimestamp: number,
		orderID: string,
		orderState: number,
		createTimestampBegin: number,
		createTimestampEnd: number,
		updateTimestampBegin: number,
		updateTimestampEnd: number
	};
	export type response = {
		indexEnd: number,
		count: number,
		total: number,
		firstTimestamp: number,
		orderList: {
			orderID : string,
			mchNo: string,
			state : number,
			money : number,
			mchName : string,
			address : string,
			createTimestamp : number,
			updateTimestamp : number
		}[],
	};
}


/*商户充值申请列表*/
export namespace mch_deposit_rqst_list{
	export type payload = {
		indexStart : number,
		count: number,
		firstTimestamp: number,
		orderID: string,
		orderState: number,
		createTimestampBegin: number,
		createTimestampEnd: number,
		updateTimestampBegin: number,
		updateTimestampEnd: number
	}
	
	export type response = {
		indexEnd: number,
		count: number,
		total: number,
		firstTimestamp: number,
		orderList: {
			orderID : string,
			state : number,
			money : number,
			usdt : number,
			mchName: string,
			sourceAddress : string,
			targetAddress : string,
			createTimestamp : number,
			updateTimestamp : number
		}[],
	}
}

/*审核商户充值*/
export namespace mch_deposit_rqst {
	export type payload = {
		orderID : string;
		agree : boolean;
		money : number;
	};
	
	export type response = {}
}


/*审核商户提现*/
export namespace mch_withdraw_rqst {
	export type payload = {
		orderID : string;
		agree : boolean;
		usdt : number;
	};
	
	export type response = {}
}

export namespace mch_saller_list {
	
	export type payload = {};
	
	export type response = {
		list : saller[];
	};
	
	export type saller = {
		id : number,
		name : string,
		phone : string;
	};
}

export namespace edit_mch_cfg {
	
	export type payload = Partial<{
		"mchNo": string,
		"name": string,
		"contactPerson": string,
		"contactPhone": string,
		"sellerID": number,
		"payIn": commission[],
		"payOut": commission[],
		"whiteList": string[],
		"status": number,
		"payInStatus": number,
		"payOutStatus": number,
	}>;
	
	export type response = {
		
	};
	
}
export namespace create_mch {
	
	export type payload = {
		"name": string,
		"password": string,
		"contactPerson": string,
		"contactPhone": string,
		"sellerID": number,
		"payIn": commission[],
		"payOut": commission[],
		"whiteList": string[],
		"status": number,
		"payInStatus": number,
		"payOutStatus": number,
	};
	
	export type response = {
		
	};
	
}

export type commission = {
	"start": number,
	"fix": number,
	"rate": number
};
