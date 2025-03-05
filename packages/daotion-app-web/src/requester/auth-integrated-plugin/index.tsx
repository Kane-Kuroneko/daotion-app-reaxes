/**
 * 
 */
export function AuthIntegratedPlugin (){
	
	return (hooks) => {
		
		hooks.onInvoke((slot , url , options) => {
			const reax_auth = reaxel_user();
		});
		/*fixme 先假设此插件一定在<AsyncReplayablePayloadPlugin>之后运行*/
		hooks.onResolve(async (slot , url , options) => {
			const reax_auth = reaxel_user();
			try {
				const json = await slot.response.json();
				
				switch(json.code){
					case 0 : {
						Object.defineProperty(slot , "response" , {
							get(){
								return json.data;
							} ,
							configurable : true ,
							enumerable : true ,
						});
					};break;
					case 50 : {
						throw json;
					};break;
					/*pix码校验失败*/
					case 4100 : {
						throw json;
					};break;
					case 401 : {
						reax_auth.clearInvalidFakeWallet();
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

import { reaxel_user } from '@@reaxels';
