export namespace Overview__info {
	export type response = {
		mchNo: string,
		balance: 0,
		withdrawingMoney: 0,
		address: string,

	}
}

export namespace Overview__order_count {
	export type payload = {
		orderType : number,
		duration : number
	}
	
	export type response = {
		orderType: number,
		duration: number,
		countInfo : {
			totalMoney: number,
			statusCount: {
				orderNum: number,
				orderMoney: number,
			}[],
		},
	}
}

export namespace Overview__fin_detail {
	export type payload = {
		indexStart : number,
		count : number,
		firstTimestamp : number,
	};
	
	export type response = {
		indexEnd: number,
		count: number,
		total: number,
		firstTimestamp: number,
		listInfo: {
			orderID: string,
			tax: number,
			money: number,
			balance: string,
			timestamp: number,
		}[],
	};
}


export namespace Overview__withdraw {
	export type payload = {
		money : number,
	}
	
	export type response = {
		result: number
	}
}

