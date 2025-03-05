/**
 * 轮询服务
 */
export const reaxel_poll_rqst = function(){
	const stack = [];
	const { timer } = reaxel_tick_tock();
	const usCycle = (frequency:number,runDurFirst:boolean = false) => {
		let count = 0;
		return (cb) => (innerCount,invokeTimes) => {
			if(runDurFirst && count == 0){
				count ++;
				return cb(count,count%frequency);
			}else {
				if(count !== 0 && count%frequency === 0){
					count ++;
					return cb(count,count%frequency);
				}
				count ++;
			}
		}
	}
	
	const invokeCycle_1s = usCycle(1);
	
	timer.subscribe(invokeCycle_1s((innerCount,invokeTimes) => {
		crayon.blue(`tick ${innerCount}`)
		
	}))
	
	return () => {
		
		return {
			regist(cycle,cb){
				const withCycle = usCycle(cycle);
				timer.subscribe(withCycle(cb));
			},
		};
	};
}();
import { reaxel_tick_tock } from '@@reaxels';

const reax_prqst = reaxel_poll_rqst();
reax_prqst.regist(6,async (innerCount,invokeTimes) => {
	console.log(111111111111);

	orzPromise((res) => {
		setTimeout(() => res({a:1,b:2}) , 10);
	}).then((data) => {
		crayon.yellow(`subs` , data);
	})
});

