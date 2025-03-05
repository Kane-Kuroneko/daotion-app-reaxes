export const reaxel_SBT_list = function(){
	const { store , setState } = orzMobx({
		SBT_list : [] as API__SBT_list.SBTListItem[] ,
		input_search : null ,
		select_chain : null ,
		select_type : null ,
		
		total : 0 ,
		hasMore : false ,
		
		pending : false ,
		create_Modal_visible : false,
	});
	/*记录上一次请求的状态,*/
	const [ prevParams , assignPrevParams ] = utils.makePair({
		spaceID : null ,
		firstTimestamp : 0 ,
		/*当前分页最后一个在总列表的索引位置(以1开头的),映射后端接口的indexEnd*/
		tailIndex : 0 ,
		
		input_search : store.input_search ,
		select_chain : store.select_chain ,
		select_type : store.select_type ,
	} , (ori) => (partial:Partial<typeof ori>) => _.assign(ori , partial));
	
	const reax_wallet = reaxel_wallet();
	const [closuredFetch__SBT_Pad_list , resetDeps__SBT_Pad_list] = Reaxes.closuredMemo((args : {
			spaceID : number;
			indexStart : number;
			count? : number;
			firstTimestamp? : number,
		}) => {
		
			return reax_fetch_SBT_list.grasp(args);
		} , () => [
			null,
			store.input_search ,
			store.select_chain ,
			store.select_type ,
			/*占位:spaceID*/ ,
		] ,
	);
	const reax_fetch_SBT_list = reaxel_fact__prevent_dup_request((preventDup) => {
		return ({
			spaceID ,
			count = 40 ,
			firstTimestamp = prevParams.firstTimestamp ,
			indexStart ,
		} : {
			spaceID : number;
			indexStart : number;
			count? : number;
			firstTimestamp? : number,
		}) => {
			return request__SBT_list(async () => {
				
				return {
					indexStart ,
					count ,
					firstTimestamp ,
					spaceID ,
					type : store.select_type ,
					chainID : store.select_chain ,
					name : store.input_search,
				};
			}).then((res) => {
				assignPrevParams({
					spaceID ,
					firstTimestamp : res.firstTimestamp ,
					tailIndex : res.indexEnd ,
					input_search : store.input_search ,
					select_chain : store.select_chain ,
					select_type : store.select_type ,
				});
				
				preventDup(() => {
					setState({
						SBT_list : firstTimestamp ? [
							...store.SBT_list ,
							...res.infos,
						] : res.infos ,
						hasMore : res.count === count ,
					});
				});
			}).finally(() => {
				preventDup(() => {
					setState({ pending : false });
				});
			});
		}
	})();
	
	const userInputChanged = (spaceID:number) => !utils.shallowEqual(prevParams,{
		...prevParams ,
		spaceID,
		input_search : store.input_search ,
		select_chain : store.select_chain ,
		select_type : store.select_type ,
	});
	
	const {scrollParentRef} = reaxel_scrollParentRef();
	return () => {
		return {
			get enum__SBT_type(){
				return enum__SBT_type;
			} ,
			get SBT_Pad_Store(){
				Reaxes.collectDeps(store);
				return store;
			} ,
			get scrollParentRef(){
				return scrollParentRef;
			},
			setFields (state:Partial<typeof store>){
				setState(state);
			},
			emptyData : () => {
				setState({
					input_search : '' ,
					select_type : null,
					select_chain : null ,
				});
				resetDeps__SBT_Pad_list();
				assignPrevParams({
					firstTimestamp : 0 ,
					tailIndex : 0 ,
				});
			},
			/**
			 * 内部驱动状态的获取sbt列表封装,视图层只简单调用.
			 */
			fetchSBTList({ spaceID , count = 40 },fetchMore?){
				
				/*如果用户输入变化 则重置请求*/
				if(userInputChanged(spaceID)) {
					assignPrevParams({
						firstTimestamp : 0 ,
						tailIndex : 0 ,
					});
				}
				
				closuredFetch__SBT_Pad_list(([prevFetchMore]) => [
					fetchMore ? Math.random() : prevFetchMore,
					store.input_search ,
					store.select_chain ,
					store.select_type ,
					spaceID ,
				])({
					spaceID ,
					indexStart : prevParams.tailIndex ,
					firstTimestamp : prevParams.firstTimestamp ,
					count : 20 ,
				});
			} ,
		};
	};
}();






import { API__SBT_list } from "@@requests/SBT/types";
import { reaxel_wallet } from "@@reaxels/wallet/wallet";
import { reaxel_scrollParentRef } from '@@reaxels/engine/reaxel--scroll-coentent-ref';
import { reaxel_fact__prevent_dup_request } from "@@reaxels/Reaxel-Factories";
import { request__SBT_list } from "@@requests/SBT/SBT-list";
import enum__SBT_type from '@@public/SBT--types.enum.json';
