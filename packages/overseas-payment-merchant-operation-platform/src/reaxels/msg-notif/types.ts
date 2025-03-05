export type notifMsgItem = {
	type : "mch-withdraw-rqst"|"mch-deposit-rqst",
	number : number,
};

export type msgType = {
	label : string,
	path? : string;
}
