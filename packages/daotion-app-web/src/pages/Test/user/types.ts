export  namespace User__login {
	export interface payload {
		data: {
			userName: string,
			password: string
		}
	}
	
	export interface response {
		token: string
	}
}

export  namespace User__modify_password {
	export  interface payload {
		data: {
			oldPassword: string,
			newPassword: string
		}
	}
	
	export interface response {
		result: boolean
	}
}