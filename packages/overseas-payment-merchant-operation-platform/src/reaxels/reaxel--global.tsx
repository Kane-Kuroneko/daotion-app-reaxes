export const reaxel_global = function(){
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
			get now(){
				return store.now;
			},
		};
	};
}();
