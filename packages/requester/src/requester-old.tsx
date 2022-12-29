const global_env_config = __ENV_CONFIG__.reduce((accu , itm) => {
	accu[itm.env] = {
		proxy_dev : itm.proxy_path_dev ,
		proxy_server : itm.proxy_path_server ,
	};
	return accu;
} , {} as global_env_config);

export const request = new (
	class {
		/*测试是否是绝对地址*/
		#testHTTP = /^https?:\/\//;
		
		fetch = async <response , payload extends () => Promise<any>>(
			orignal_url : string ,
			orignal_options : ORZ.RequestOptions<payload> & { method : string } = { method : 'GET' } ,
		) : Promise<response> => {
			let url = orignal_url ,
				options = _.cloneDeep(orignal_options);
			
			const env = options.env ?? __ENV__ ?? 'unset';
			/**
			 * 暂时禁用
			 * 需 mock 的情形，走mock请求
			 * */
			if( false && __IS_MOCK__ && options.mock === true ) {
				try {
					/*@ts-ignore*/
					const resArr = mockArr.filter((item) => url.endsWith(item.url));
					if( resArr[0]?.code === 1 ) {
						return resArr[0]?.data || [];
					} else {
						throw Error('code not 1');
					}
				} catch ( error ) {
					crayon.info[ '#ffd12cd9' ]( '请检查mock文件相关配置!' , url );
				}
			}
			/**
			 * 处理请求地址
			 * 如果不是绝对地址则加http前缀
			 * 这一步得到"http://baidu.com" || "/server_dev/space-list"
			 */
			url = (
				() => {
					/*如果是绝对地址,则不作处理*/
					if( this.#testHTTP.test(url) ) {
						return url;
					} else {
						/*requester.env > npm.env > auto unset */
						const prefixPath = (
							() => {
								/*如果没有指定npm env,则判断运行环境后拼装proxy前缀*/
								if( env === 'unset' ) {
									/*如果没有指定requester.env*/
									if( !orignal_options.env ) {
										if( __NODE_ENV__ === 'development' ) {
											return '/server_dev';
										} else {
											return '/server';
										}
									} else {
										/*如果指定了requester.env就用它*/
										return {
											development : global_env_config[orignal_options.env].proxy_dev ,
											production : global_env_config[orignal_options.env].proxy_server ,
										}[__NODE_ENV__];
									}
								} else {
									/*如果没有指定requester.env*/
									if( !orignal_options.env ) {
										/*则使用npm.env*/
										return global_env_config[env].proxy_dev;
									} else {
										/*如果指定了requester.env就用它*/
										return global_env_config[orignal_options.env].proxy_dev;
									}
								}
							}
						)();
						return `${ prefixPath }${ url.startsWith('/') ? url : `/${ url }` }`;
					}
				}
			)();
			
			/*把GET请求的body对象转成queryString.去除body属性*/
			const payload : ReturnType<payload> = await orignal_options.body?.();
			if( /GET/i.test(options.method) ) {
				/*检测绝对地址中是否存在qs并警告*/
				if( url.includes('?') && orignal_options.hasOwnProperty('body') ) {
					crayon.warn('url参数中不应包含queryString!');
				}
				
				if( _.isObject(payload) ) {
					url += `?${ encodeQueryString(payload) }`;
				} else if( _.isString(payload) ) {
					crayon.warn('options.body不能是字符串!');
					/*字符串不是合法的body,必须传对象或不传*/
					return Promise.reject('options.body不能是字符串!');
				}
				delete options.body;
			} else {
				/*支持请求体是FormData*/
				if( _.isObject(payload) && payload instanceof FormData ) {
					options.body = payload as any;
				} else if( _.isPlainObject(payload) ) {
					options.body = JSON.stringify(payload || {}) as payload & string;
				} else if( !payload ) {
				} else {
					crayon.trace(payload);
					throw 'innerError: payload is not a plainObject';
				}
			}
			
			/*在webpack devserver服务下显示出请求给后端的真实url路径*/
			const real_address = (
				() => {
					const host = __ENV_CONFIG__.find(({ env }) => {
						if( __ENV__ === 'unset' || __ENV__ === 'server_dev' ) {
							return env === 'server_dev';
						}
					})?.server_host;
					
					if( !host ) {
						return {};
					} else {
						return {
							_real_address_ : host + url.replace(/\/(server_dev|server_yang|server_production)/ , '') ,
						};
					}
				}
			)();
			try {
				const json : response = await fetch(url , {
					credentials : 'include' ,
					mode : 'cors' ,
					...options ,
					body : options.body as payload & string ,
					headers : {
						/*没有devserver真实请求的地址*/
						...real_address ,
						...options.headers ,
					} ,
				}).then(async (response) => {
					try {
						return await response.json();
					} catch ( e ) {
						throw await response.text();
					}
				}).then(async (json : responseWrap<response> & response) => {
					if( json.hasOwnProperty('code') ) {
						switch( json.code ) {
							/*success*/
							case 0: {
								return json.data ?? null;
							}
							case 1002: {
								/*todo*/
								// const { loginWithUserWallet , clearInvalidFakeWallet , storage_key_fake_wallets_secret_map } =
								// 	reaxel_user();
								// clearInvalidFakeWallet();
								// orzLocalstroage.remove(storage_key_fake_wallets_secret_map);
								// return loginWithUserWallet().then(() => this.fetch(orignal_url , orignal_options));
							}
							default:
								throw json;
						}
					} else {
						throw 'uncatched error : 22041';
					}
				});
				
				return json;
			} catch ( e ) {
				if( Array.isArray(e) && e[0] === symbol_no_authorized ) {
					return Promise.reject(symbol_no_authorized);
				}
				return Promise.reject(e);
			}
		};
		
		post = async <response , payload extends () => Promise<any> = any , F = any>(
			url : string ,
			options : ORZ.RequestOptions<payload> = {} ,
		) : Promise<response> => {
			return this.fetch<response , payload>(url , {
				method : 'POST' ,
				...options ,
			});
		};
		
		get = async <response = any , request extends () => Promise<any> = any>(
			url : string ,
			options : ORZ.RequestOptions<request> = {} ,
		) : Promise<response> => {
			const requestBody = (
				function(){
					if( typeof options.body === 'object' && options.body !== null ) {
						return encodeQueryString(options.body);
					} else if( typeof options.body === 'string' ) {
						return options.body;
					} else {
						return null;
					}
				}
			)();
			
			return this.fetch(`${ url }${ requestBody ? '?' : '' }${ requestBody }` , {
				..._.omit(options , [ 'body' ]) ,
				method : 'GET' ,
			});
		};
		
		/*递归对象转换成data[subKey][subsubkey]的formdata*/
		formater = (source , formdata = null , parentKey : string = null) => {
			if( _.isArray(source) ) {
				source.forEach((value) => {
					if( _.isObject(value) && Object.getPrototypeOf(value) !== File.prototype ) {
						this.formater(value , formdata , parentKey ? `${ parentKey }[]` : '[]');
					} else {
						formdata.append(parentKey ? `${ parentKey }[]` : '[]' , value);
					}
				});
				return;
			}
			return _.keys(source).reduce((formdata , key : string , index) => {
				const value = source[key];
				if( _.isObject(value) && Object.getPrototypeOf(value) !== File.prototype ) {
					this.formater(value , formdata , parentKey ? `${ parentKey }[${ key }]` : key);
				} else {
					formdata.append(parentKey ? `${ parentKey }[${ key }]` : key , value);
				}
				return formdata;
			} , formdata ?? new FormData());
		};
	}
)();

const symbol_no_authorized = Symbol('no_authorized');
// import { reaxel_user } from '@@RootPath/src/reaxels/user/auth';
// import { orzLocalstroage } from '@@common/storages';

type global_env_config = {
	[o in typeof __ENV__] : {
		proxy_dev : string;
		proxy_server : string;
	};
};



import {crayon,encodeQueryString} from '../../utils';
import './plugins/async-replayable-payload-plugin';
