export const reaxel_ops_record = function(){
	const initialState = {
		records:[],
	};
	const { store , setState } = orzMobx(initialState);
	const { pendingState, setPending } = toolkits.orzPending();
	
	const [fetchOpsRecord] = Reaxes.closuredMemo(() => {
		setPending(true);
		return request_ops_record(async function(){
			return {
				indexStart : 0 ,
				count : 999999 ,
				firstTimestamp : 0 ,
			};
		}).then(({recordList}) => {
			setState({ records : recordList });
			setPending(false);
			
		});
	} , () => []);
	
	return () => {
		
		return {
			get pending(){
				return pendingState.pending;
			},
			get records(){
				return store.records;
			},
			fetchOpsRecord(badge){
				return fetchOpsRecord(() => [badge])();
			},
			setState,
		};
	};
}();


const request_ops_record = (payload) => {
	
	return request.post(`/mch/record-operation` , {
		body : payload ,
	}).then((data) => {
		return {
			...data ,
			recordList : data.recordList.map((item) => {
				return { ...item , key : Math.random() };
			}) ,
		};
	});
};

