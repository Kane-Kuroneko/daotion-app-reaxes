const {store,setState} = orzMobx({
	count : 0,
});
import {autorun} from 'mobx';

const subs = (callback) => {
	autorun(function(){
		[store.count],callback(Math.random());
		console.log( store.count );
	});
};

import {useSyncExternalStore} from 'use-sync-external-store/shim';

const useSES = () => {
	const subscribe = useCallback((onStoreChange) => {
		console.log( 1111111 );
		subs( onStoreChange );
	},[]);
	const getSnapshot = (...args) => {
		return store.count;
	};
	return useSyncExternalStore(subscribe,getSnapshot);
};

export const UseSyncExternalStore = () => {
	return <button
		onClick={() => {
			setState({
				count : store.count + 1,
			})
		}}
	>
		count : {useSES()}
	</button>;
};
