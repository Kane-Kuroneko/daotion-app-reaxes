/**
 * 轮询服务
 */
export const reaxel_poll_rqst = function(){
	const stack = [];
	
	return () => {
		
		return {
			regist(type:any,cb,duration:number){
				const timer = new utils.Timer();
				timer.subscribe(function(){
					/*闭包记录调用次数,因为timer会直接调用一次,就跳过这次调用*/
					let count = null;
					return () => {
						if(count === null){
							count = 0;
						}else{
							console.log(count , duration);
							if(count % duration === 0){
								cb();
							}
							count ++;
						}
					}
				}());
				timer.start(Number.MAX_VALUE);
				stack.push({
					type,
					timer,
					cb,
					duration,
				});
			},
			
		};
	};
}();


const reax_prqst = reaxel_poll_rqst();
reax_prqst.regist(Symbol(),async () => {
	console.log(111111111111);

	orzPromise((res) => {
		setTimeout(() => res({a:1,b:2}) , 10);
	}).then((data) => {
		crayon.yellow(`subs` , data);
	})
},3);

