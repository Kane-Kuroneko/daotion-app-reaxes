import {request_all_spaces_list} from '@@requests/Spaces';
import { reaxel_fact__prevent_dup_request } from '@@reaxels/Reaxel-Factories/Reaxel-fact--prevent-dup-request';

export const reaxel_space_list = function(){
	let ret;
	const {
		store ,
		setState,
	} = orzMobx( {
		infos : [] ,
		Input__search_text : '' ,
		Select__search_tag : null ,
		total : 0,
		// searchChainId : null ,
		hasMore : false ,
	} );
	const [prevSearchParams,setPrevSearchParams] = utils.makePair({
		indexEnd : 0,
		firstTimestamp : 0 ,
		Input__search_text : store.Input__search_text ,
		Select__search_tag : store.Select__search_tag ,
	} , (prevSearchParams) => (partialSearchParams:Partial<typeof prevSearchParams>) => _.assign(prevSearchParams,partialSearchParams));
	
	const [closuredFetch_all_space_list , resetDeps_space_list] = Reaxes.closuredMemo((count = 30 ) => {
		const payload = async() => {
			const result = {
				indexStart : prevSearchParams.indexEnd ,
				firstTimestamp : prevSearchParams.firstTimestamp ,
				count ,
				nameSearch : store.Input__search_text,
				tag : store.Select__search_tag ,
			};
			/*与上一次请求成功的状态字段进行对比,如果查询条件发生了变化则重置请求,而非继续分页*/
			if(!utils.shallowEqual(prevSearchParams,{
				...prevSearchParams,
				Input__search_text : store.Input__search_text,
				Select__search_tag : store.Select__search_tag,
			})){
				_.assign(result,{indexStart:0,firstTimestamp:0});
			}
			return result;
		};
		return request_all_spaces_list( payload);
	},() => []);
	
	const deduped_fetch_all_space_list = reaxel_fact__prevent_dup_request((preventDup) => (more) => {
		return closuredFetch_all_space_list(([prevMore]) => [
			more ? Math.random() : prevMore,
			store.Input__search_text,
			store.Select__search_tag,
			prevSearchParams.firstTimestamp,
		])()?.then( ( data ) => {
			preventDup(() => {
				
				setPrevSearchParams({
					indexEnd : data.indexEnd,
					firstTimestamp : data.firstTimestamp ,
					Input__search_text : store.Input__search_text ,
					Select__search_tag : store.Select__search_tag ,
				});
			});
			setState( {
				infos : more ? [...store.infos,...data.infos] : data.infos ,
				hasMore : data.total > data.indexEnd ,
			} );
		} );
	})();
	
	return (lifcecycle = Reaxes.hooks) => {
		
		return ret = {
			store,
			setFields(partialStart:Partial<typeof store>){
				setState(partialStart);
			},
			/*在unmont生命周期里重置请求状态.*/
			reset_fetch_state (){
				setState({
					infos : [] ,
					Input__search_text : '' ,
					Select__search_tag : null ,
					total : 0,
					hasMore : false ,
				});
				resetDeps_space_list();
				setPrevSearchParams({
					indexEnd : 0,
					firstTimestamp : 0 ,
					Input__search_text : "" ,
					Select__search_tag : "" ,
				});
			},
			/*请求并更新all-space-list*/
			deduped_fetch_all_space_list(more = false){
				return deduped_fetch_all_space_list.grasp(more);
			} ,
		};
	}
}();


