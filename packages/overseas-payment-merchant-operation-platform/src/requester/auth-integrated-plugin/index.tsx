/**
 * 
 */

export function AuthIntegratedPlugin (){
	
	return (hooks) => {
		
		hooks.onInvoke((slot , url , options) => {
			const reax_auth = reaxel_user_auth();
			slot.options.headers["Authorization"] = `token ${reax_auth.token}`;
		});
		/*fixme 先假设此插件一定在<AsyncReplayablePayloadPlugin>之后运行*/
		hooks.onResolve(async (slot , url , options) => {
			const reax_auth = reaxel_user_auth();
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
						reax_auth.logout();
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

import { reaxel_user_auth } from '@@reaxels';

