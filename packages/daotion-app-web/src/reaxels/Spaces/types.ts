export namespace Space__all_spaces {
	
	export type payload = {
		"indexStart": number,
		"count": number,
		"firstTimestamp": number | 0 ,
		"chainId"?: string,
		"tag"?: string ,
		"nameSearch"?: string,
	}
	
	export type response = {
		"indexEnd": number,
		"count": number,
		"firstTimestamp": number,
		"infos": {
			"id": number,
			"name": string,
			"tags": string[],
			"chainIDs": string[],
			"addrChain": string,
			"iconUrl": string,
			"userCount": number,
			"spaceID": number,
			
		}[],
	}
}



