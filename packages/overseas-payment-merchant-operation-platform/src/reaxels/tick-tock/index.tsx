export const reaxel_tick_tock = function(){
	const { store , setState } = orzMobx({
		now : Date.now(),
	});
	
	const timer = new utils.Timer();
	timer.subscribe(() => {
		setState({ now : Date.now() });
	});
	timer.start(Number.MAX_VALUE);
	
	return () => {
		
		return {
			timer:{
				get subscribe(){
					return timer.subscribe.bind(timer);
				},
				
			},
			get now(){
				return store.now;
			},
		};
	};
}();
