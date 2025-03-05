export const TestRender = reaxper(() => {
	
	const { pending , error , setPending , setError } = reaxel();
	
	if( pending ) {
		return <span>pending.......</span>;
	}
	
	if( error ) {
		return <span>Error!</span>;
	}
	
	return <div
		onClick = { () => {
			setPending(true);
		} }
	>
		message
	</div>;
});


const reaxel = function(){
	const { pendingState , setPending , setError } = toolkits.orzPending();
	
	
	crayon.blue(pendingState.pending);
	setPending(true);
	
	orzPromise((res , rej) => {
		setTimeout(() => {
			res();
		} , 1400);
	}).then(() => {
		setPending(false);
	}).catch(() => {
		setPending(false);
		setError(true);
	});
	return () => {
		return {
			get pending(){
				return pendingState.pending;
			} ,
			get error(){
				return pendingState.error;
			} ,
			setPending ,
			setError ,
		};
	};
}();
