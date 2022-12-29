export const reaxel_storage = function(){
	
	return () => {
		
		return {
			get<ret extends any = string>( key:string ):ret|Storage {
				if ( key.length ) {
					try {
						return JSON.parse(window.localStorage.getItem( key ));
					}catch ( e ) {
						return window.localStorage.getItem( key ) as ret;
					}
				} else {
					return window.localStorage;
				}
			},
			
			set( key : string , value , expiration:number|BigInt = null) {
				if ( typeof key === "string" ) {
					localStorage.setItem( key , value );
				} else {
					throw "0.7714076737885125|key must be string type";
				}
			},
			
			remove (key : string ){
				window.localStorage.removeItem( key );
			}
		};
	};
}();

