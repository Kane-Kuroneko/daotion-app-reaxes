
export const App = reaxper(() => {
	
	const { count , addCount , minusCount } = reaxel_counter();
	
	return <h1>
		<AlertTwoTone/>
		<button onClick={addCount}>count+</button>
		<p>{count}</p>
		<button onClick={minusCount}>count-</button>
	</h1>;
});


const reaxel_counter = function(){
	const { store , setState } = orzMobx({ count : 0 });
	
	Reaxes.observedMemo(() => {
		if(store.count === 4){
		}
	},() => [store.count])
	
	return () => {
		
		return {
			get count(){
				return store.count;
			} ,
			minusCount(){
				setState({ count : store.count - 1 });
			} ,
			addCount(){
				setState({ count : store.count + 1 });
			} ,
		};
	};
}();




import {AlertTwoTone} from '@ant-design/icons';
