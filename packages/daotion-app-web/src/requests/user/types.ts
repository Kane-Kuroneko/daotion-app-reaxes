export namespace User__is_signed {
	
	export interface payload {
		address : string;
	}
	
	export interface response {
		address : string;
		isSigned : boolean;
	}
}

export namespace User__address_alias {
	
	export interface payload {
		address : string;
		data : {
			from : string;
			alias : string;
			timestamp : string;
		};
		signature : string;
	}
	
	export interface response {
		result : boolean;
	}
}


export namespace User__profile_info {
	
	export type payload = {
		address : string;
	}
	
	export type response = {
		"address" : string;
		"iconUrl" : string;
		"bgUrl" : string;
		"displayName" : string;
		"bio" : string;
		"customUrl" : string;
		"socialLinks" : string;
		/*用户是否曾经登陆过*/
		"exist" : true;
	}
}

export namespace User__update_profile {
	
	export type response = {};
	
	export type payload = {
		"address" : string;
		"data" : {
			"displayName" : string;
			"bio" : string;
			"customUrl" : string;
			"socialLinks" : string;
			"setAddress" : string;
			"timestamp" : number;
		};
		"signature" : string;
	};
}

export namespace User__upload_avatar {
	
	export type response = {
		"address" : string;
		"profileType" : number;
		"url" : string;
		"ipfsHash" : string;
	};
	
	export type payload = {
		address : string;
		data : {
			address : string;
			profileType : number;
			timestamp : number;
			socialLinks : string;
		}
		// todo 要改掉
		signature : any;
		file : File;
	}
}

export namespace User__profile_joined_list {
	
	export type payload = {
		address : string;
	};
	
	export type response = {
		infos : {
			spaceID : number ,
			address : string,
			icon : string,
			contributionVal : 0 ,
			rank : 0,
			spaceName : string;
		}[];
	}
}
