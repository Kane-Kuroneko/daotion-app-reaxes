export namespace User__pre_login {
	export interface payload {
		username: string
	}
	
	export interface response {
		code: string
	}
}

export  namespace User__login {
	export interface payload {
			username: string,
			password: string,
			code: string
	}
	
	export interface response {
		token: string,
		expireTimestamp: string
	}
}

export  namespace User__modify_password {
	export  interface payload {
		oldPassword: string,
		newPassword: string
	}
	
	export interface response {
		data : {
			result : number,
			newToken : string,
		};
	}
}

export namespace User__info {
	export interface payload {
		data
	}
	
	export interface response {
		data: {
			mchNo: string,
			name: string,
			contactPerson: string,
			contactPhone: string,
			payInFeeFix: number,
			payInFeeRate: number,
			payOutFeeFix: number,
			payOutFeeRate : number,
		}
	}
}

export namespace User__api_info {
	export interface payload {
		data
	}
	
	export interface response {
		data: {
			mchNo: string,
			mchKey: string,
			platformIPS: string,
			payInCallback: string,
			payOutCallback: string,
			payOutWhitelist: [
				string
			]
		}
	}
}


export namespace User__api_set {
	export interface payload {
		payInCallback? : string;
		payOutCallback? : string;
		payOutWhitelist? : string[] ;
		address? : string;
		
		
	}
	
	
	export interface response {
		data
	}
}
