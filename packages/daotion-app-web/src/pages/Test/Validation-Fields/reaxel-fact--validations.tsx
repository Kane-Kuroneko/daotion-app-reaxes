/**
 * 
 * @param validator 
 * @param chainReactionMode 连锁模式: 这个当其他字段改变时
 * 就算这个字段没发生改变也会触发校验和视图更新
 */
export const reaxel_fact__validation = function<T extends (...args) => (Promise<boolean>)|(boolean) >(validator : T , chainReactionMode = false ){
	
	const {
		store ,
		setState,
	} = orzMobx( {
		/*字段是否有效: null未校验状态, true校验通过 , false校验错误*/
		valid : null as null | true | false ,
	} );
	/*一进来就是true,后续都是false*/
	let first = true;
	let fieldChanged = false;
	let _value = Symbol();
	let pending = null;
	
	
	return (...args) => {
		const [value] = args;
		
		return {
			get valid() {
				if(first){
					first = false;
					_value = value;
				}else if(chainReactionMode || _value !== value) {
					const res = pending = validator(...args);
					if(utils.isPromise(res)){
						res.then( ( validation ) => {
							/*如果中途再次触发了校验,则取消之前校验的结果,只取最后一次生效的promise*/
							if(pending !== null && pending !== res){
								return;
							}
							setState( { valid : true } );
						} );
						res.catch(() => {
							if(pending !== null && pending !== res){
								return;
							}
							setState( { valid : false } );
						})
					}else {
						queueMicrotask( () => {
							setState( { valid : res } );
						} );
					}
					_value = value;
				}
				return store.valid;
			} ,
			reset(){
				first = true;
				setState( {
					valid : null ,
				} );
			},
			validate(){
				first = false;
				const res = pending = validator(...args);
				if(utils.isPromise(res)){
					res.then( ( validation ) => {
						/*如果中途再次触发了校验,则取消之前校验的结果,只取最后一次生效的promise*/
						if(pending !== null && pending !== res){
							return;
						}
						setState( { valid : true } );
					} );
					res.catch( () => {
						if ( pending !== null && pending !== res ) {
							return;
						}
						setState( { valid : false } );
					} );
					res.finally( () => {
						if(pending === res) pending = null;
						
					} );
				}else {
					queueMicrotask( () => {
						setState( { valid : res } );
					} );
				}
				_value = value;
			},
		};
	}
};
