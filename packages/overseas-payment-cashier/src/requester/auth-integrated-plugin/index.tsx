/**
 * 
 */

export function AuthIntegratedPlugin (){
	
	return (hooks) => {
		
		hooks.onInvoke((slot , url , options) => {
			
		});
		/*fixme 先假设此插件一定在<AsyncReplayablePayloadPlugin>之后运行*/
		hooks.onResolve(async (slot , url , options) => {
			try {
				const json = await slot.response.json();
				
				switch(json.code){
					case 0 : {
						Object.defineProperty(slot , "response" , {
							get(){
								if(json.hasOwnProperty('data')){
									return json.data;									
								}else {
									return json;
								}
							} ,
							configurable : true ,
							enumerable : true ,
						});
					};break;
					case 50 : {
						throw json;
					};break;
					case 401 : {
						throw json.message;
					};break;
					default : throw json;
				}
			}catch ( e ) {
				console.error(e);
				throw e;
			}
		});
	}
}
