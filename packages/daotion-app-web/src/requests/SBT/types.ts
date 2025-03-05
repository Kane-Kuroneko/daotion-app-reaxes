/*查询当前SBT是否属于spaceID*/
export namespace API__SBT_available {
	export type payload = {
		spaceID : number,
		SBTID : number,
	};
	export type response = {
		existed : boolean;
	};
}

export namespace API__SBT_list {
	
	export type SBTListItem = {
		"spaceID": number;
		"SBTID": number;
		"name": string,
		"iconUrl": string,
		"type": string,
		"chainID": string,
		"chainAddr": string,
	};
	
	export type payload = {
		"indexStart": number,
		"count": number,
		"firstTimestamp": number,
		"spaceID": number,
		"type": string;
		"chainID": string;
		/*模糊搜索*/
		"name": string;
	};
	export type response = {
		"indexEnd": number,
		"count": number,
		"firstTimestamp": number,
		"total": number,
		"infos": SBTListItem[];
	};
}

export namespace API__create_SBT {
	export type feature_kv = {
		key: string;
		value: string;
	};
	
	export type payload = {
		address: string;
		data: {
			spaceID: number;
			type: string;
			desc: string;
			features: string[];
			conditionData: string[];
			/*创建的用户的地址*/
			createAddress: string;
			timestamp: number;
		};
		signature: string;
		file: File;
	};
	export type response = {
		orderID: number;
		metadataUrl: string;
		spaceAddress:string;
	};
}

export namespace API__SBT_info {
	
	export type payload = {
		SBTID : number;
		spaceID :number;
	};
	
	export type response = {
		"spaceID" : number,
		"SBTID" : number,
		"name" : string,
		"type" : string,
		"desc" : string,
		"iconUrl" : string,
		"addrChain" : string,
		"creator" : string,
		"access" : string,
		"issueNum" : number,
		"holdLimit" : number,
		"canRevoke" : number,
		"canBurn" : number,
		"features" : string[],
		"metadataUrl":string,
	}
}

export namespace API__SBT_whitelist{
	
	export type payload = {
		indexStart : number;
		count : number;
		firstTimestamp : number;
		spaceID : number;
		SBTID : number;
		rest : boolean;
	};
	
	export type response = {
		indexEnd : number;
		count : number;
		total : number;
		firstTimestamp : number;
		whitelist : whitelist_item[];
	};
	
	export type whitelist_item = {
		address : string;
		amount : number;
		remainder : number;
	};
}

export namespace API__SBT_upload_file_whitelist {
	
	export type payload = {
		address : string;
		spaceID : number;
		SBTID : number;
		file : File;
	};
	
	export type response = {
		success : boolean;
		list : {
			amount: number;
			remainder : number;
			address : string;
			offset : number;
		}[];
		duplicateLines : number[];
		invalid : number[];
	};

}

export namespace API__SBT_add_whitelist {
	
	export type payload = {
		address : string;
		data : {
			spaceID : number;
			SBTID : number;
			list : {
				address : string;
				offset : number;
			}[];
			timestamp : number;
		};
		signature : string;
	};
	
	export type response = {
		rootHash : string;
	};

}

export namespace API__SBT_search_whitelist {
	
	
	export type payload = {
		spaceID : number;
		SBTID : number;
		address : string;
		
	};
	export type response = API__SBT_whitelist.response;
}

export namespace API__SBT_save_modify_whitelist {
	
	
	export type payload = {
		address : string;
		data : {
			spaceID: number;
			SBTID : number;
			list : {address : string,offset:number}[];
			timestamp : number;
		};
		signature : string;
	};
	export type response = {
		rootHash : string;
		SBTAddress : string;
	};
}

export namespace API__address_unclaimed_SBT_quantity {
	
	export type payload = {
		spaceID : number;
		SBTID : number;
		address : string;
	};
	export type response = {
		unclaimedQuantity : number;
		claimedQuantity : number;
	};
}

export namespace API__paged_SBT_hoder_list {
	
	export type payload = {
		indexStart : number,
		count : number,
		firstTimestamp : number,
		spaceID : number,
		SBTID : number,
		address : string,
	};
	export type response = {
		indexEnd : number,
		count : number,
		total : number,
		firstTimestamp : number,
		infos : holder[];
	};
	export type holder = {
		address : string,
		userName : string,
		iconUrl : string,
		holderTime : number,
		tokenID : number,
		amount : number,
	};
}

export namespace API__user_claim_SBT {
	
	export type payload = {
		address : string,
		data : {
			spaceID : number,
			SBTID : number,
			timestamp : number,
		},
		signature : string,
	};
	export type response = {
		spaceID: number,
		SBTID: number,
		verifyData: {
			hashNode: string[],
			index: number[],
			node: {
				id: number,
				address: string,
				amount: number,
				timestamp: number
			}
		},
		claimCount: number,
		SBTAddress: string,
	};
}

export namespace API__revocation_SBT_list {
	
	export type payload = {
		spaceID:number,
		SBTID : number,
	};
	export type response = {
		spaceID : number,
		SBTID : number;
		contractAddress : string,
		list: revocationItem[];
	};
	export type revocationItem = {
		address : string;
		tokenID : number,
		holdNum : number,
		revocationNum : number;
	};
}

/*查询用户对于某个SBT的信息*/
export namespace API__SBT_user_info {
	
	export type payload = {
		spaceID : number,
		SBTID : number,
		address : string,
	};
	export type response = {
		/*所有历史发放白名单数量总和*/
		amount : number,
		/*claim过的数量*/
		claimNum : number,
		/*当前持有数量*/
		holdNum : number,
		/*撤销过的数量*/
		revocationNum : number ,
		
		tokenID : number,
	};
}

/*请求SBT黑名单列表*/
export namespace API__SBT_blacklist{
	
	export type payload = {
		spaceID : number,
		SBTID : number,
	};
	export type response = {
		spaceID : number,
		SBTID : number,
		contractAddress : string,
		list : blackItem[],
	};
	export type blackItem = {
		address : string,
		revocationNum : number ,
		holdNum : number,
	};
}

/*更新SBT链下信息*/
export namespace API__update_SBT_info {
	
	export type payload = {
		address : string,
		data : {
			spaceID:number,
			SBTID:number,
			desc:string,
			features : string[],
			timestamp : number,
		},
		signature : string,
		file : File,
	};
	export type response = {
		iconUrl : string,
		metadataUrl : string,
	};
}
