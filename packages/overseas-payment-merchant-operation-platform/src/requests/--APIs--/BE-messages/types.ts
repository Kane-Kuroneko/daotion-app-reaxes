export namespace BE_messages {
	
	export type payload = {};
	
	export type response = {
		tips : BE_msg[];
	};
	
	export type BE_msg = {
		type : number,
		num : number;
	};
}
