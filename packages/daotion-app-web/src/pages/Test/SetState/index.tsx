export const SetState = reaxper(class extends Reaxlass {
	
	state = {
		count : 0 ,
	};
	
	setCount = () => this.setState({count:this.state.count + 1});
	
	componentDidUpdate( prevProps  , prevState , snapshot? : any ) {
		console.log('updated',this);
	}
	
	componentDidMount() {
		console.log( 'mounted' );
	}
	
	render() {
		console.log('rendering',this);
		
		
		// const [count,setCount] = useState(0);
		// return <div onClick={() => setCount(count + 1)}>{count}</div>
		
		return <div
			onClick={this.setCount}
		>
			{this.state.count}
		</div>;
	}
})
