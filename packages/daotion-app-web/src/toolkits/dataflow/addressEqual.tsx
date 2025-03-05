/*判断两个钱包地址是否相等*/
export const addressEqual = (address1 : string , address2 : string) => {
	
	if( typeof address1 === "string" && typeof address2 === 'string' ) {
		return address1.toLowerCase() === address2.toLowerCase();
	}else {
		return false
	}
}; 
