/*
export const Test = reaxper( class extends Reaxlass {
	
	act = _action(this.lifecycle);
	
	render() {
		
		
		return <>
			<button onClick = {this.act.setCount}>counter</button>
			<Text/>
			<Hooking/>
		</>;
	}
} );

const Text = reaxper(class extends Reaxlass {
	
	act = _action( _.omit(this.lifecycle,"updated","") );
	
	render() {
		return <>
			<span>
				{ this.act.count }
			</span>|
			<span>
				{this.act.result }
			</span>
		</>;
	}
});


const Hooking = reaxper( () => {
	
	const reaxel = _action( Reaxes.hooks );
	
	return <button
		onClick = { reaxel.reset }
	>
		reset{ reaxel.number }
	</button>;
} );

const reaxel = (initial?) => {
	
	const {store,setState} = orzMobx({
		count : initial ?? 0 ,
		number : 999 ,
	})
	
	return (lifecycle?:Lifecycle) => {
		
		let result = Reaxes.memory(() => {
			return result = store.count + store.number; 
		},() => [store.count,store.number]);
		
		lifecycle?.updated?.(() => crayon.green(result.toString()))
		
		lifecycle.effect(() => {
			crayon.blue('fffffff');
		},() =>[]);
		
		if(lifecycle.name === 'text'){
			lifecycle.rendered(() => {
				console.log( 'text called -----' );
			})
		}
		lifecycle.effect(() => {
			console.log(`component:${lifecycle.name} updated!!`);
		},() => [store.count , store.number > 990])
		
		lifecycle.mounted(() => {
			console.log('mounted===================');
		})
		
		return {
			get result (){
				[store.number,store.count];
				return result;
			},
			get count (){
				return store.count;
			} ,
			get number (){
				return store.number;
			} ,
			setCount() {
				if(store.count > 4){
					return setState({number:store.number - 1}) ;
				}
				setState( { count : store.count + 1 } );
			},
			reset() {
				setState({
					count : 0 ,
					number : 0 ,
				})
			},
			
		}
	}
	
};

const _action = reaxel();
import {reaction ,observable} from 'mobx';
import { observer } from 'mobx-react';

*/


import {
	useNavigate ,
	Route ,
	Routes ,
	Navigate ,
	useParams ,
} from 'react-router-dom';

export const RoutingTest =  () => {
	
	// const {
	// 	navigate ,
	// 	params,
	// } = routerProps;
	const params = useParams();
	const navigate = useNavigate();
	console.log( params );
	const btnNavigate = ( ID ) => {
		navigate( `./DAO${ ID }/info` );
	};
	
	
	// const InfoElement = utils.withRouter( ( routerProps ) => ( props ) => {
	// 	useEffect(() => {
	// 		console.log( props.history );
	// 	})
	// 	return <>info:{ routerProps.params.ID }</>;
	// } );
	
	
	
	useEffect(() => {
		return () => console.log( 'nnnnnnnnnnnnn' );
	},[])
	
	return <div>
		<button
			onClick = { () => btnNavigate( 12 ) }
		>
			DAO:12
		</button>
		<button
			onClick = { () => btnNavigate( 13 ) }
		>
			DAO:13
		</button>
		<button
			onClick = { () => btnNavigate( 14 ) }
		>
			DAO:14
		</button>
		<Routes>
			<Route
				path = "/*"
			>
				<Route
					index
					element = { <>/*</> }
				/>
				<Route
					path = "DAO:ID/*"
				>
					<Route
						index
						element = { <Navigate
							to = { `./info` }
							// replace
						/> }
					/>
					<Route
						path = "info"
						element = { <InfoElement history = {window.history}/>    }
					/>
				</Route>
			</Route>
		</Routes>
	</div>;
}
// const InfoElement = ( props ) => {
// 	useEffect(() => {
// 		return () => console.log( 'vvvvvvvvvvvvvvv' );
// 	})
// 	const navigate = useNavigate();
// 	const params = useParams();
// 	return <div>info:{ params.ID }</div>;
// }


// const InfoElement = reaxper(class pop extends Reaxlass {
//	
//	
// 	reax = reaxel( this.lifecycle );
//	
// 	render() {
//		
// 		return utils.withRouter((routerProps) => {
// 			// const { params } = this.reax.useRouters();
// 			const { params } = routerProps;
// 			return <div onClick={this.reax.setCount}>info:{ params.ID } , count:{this.reax.count}</div>;
// 		})
// 	}
// })
const InfoElement = reaxper((props) => {
	
	
	const reax = reaxel( Reaxes.hooks );
	
	
	return utils.withRouter( ( routerProps ):React.ReactElement => {
		// const { params } = this.reax.useRouters();
		const { params } = routerProps;
		return <div onClick = { reax.setCount }>info:{ params.ID } , count:{ reax.count }</div>;
	} );
	
})


const reaxel = function(){
	const {store,setState} = orzMobx({
		count : 0 ,
	});
	return (lifecycle:Lifecycle) => {
		console.log('reax()');
		
		lifecycle.mounted(() => {
			console.log( 'mounted' );
		})
		lifecycle.updated(() => {
			console.log( 'updated' );
		})
		lifecycle.unmount(() => {
			console.log( 'unmounted' );
			
		})
		return {
			get count (){
				return store.count;
			},
			setCount() {
				setState( { count : store.count + 1 } );
			},
			useRouters (){
				return toolkits.useRouter();
			},
		}
	}
}();
