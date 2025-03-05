export const reaxel_currency = function () {
	
	
	return () => {
		
		return {
			get currencyList(){
				return currencyList;
			}
		}
	}
}(); 

const currencyList = [
	{
		type : "European euro",
		ISO : "EUR",
		icon : '',
		symbol : '',
	},
	{
		type : "United States dollar",
		ISO : "USD",
		icon : '',
		symbol : '',
	},
	{
		type : "Chinese Yuan Renminbi",
		ISO : "CNY",
		icon : '',
		symbol : '',
	},
	{
		type : "Japanese yen",
		ISO : "JPY",
		icon : '',
		symbol : '',
	},
	
];
