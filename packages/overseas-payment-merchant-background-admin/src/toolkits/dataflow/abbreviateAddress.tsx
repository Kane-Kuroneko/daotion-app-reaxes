/*将钱包地址切成0x1111...2222*/
export const abbreviateAddress = (address:string,[head,tail] = [6,4],symbol="...") => {
	return address.slice(0,head) + symbol + address.split('').slice(address.length - tail).join('');
};
