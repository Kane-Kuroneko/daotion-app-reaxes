import { XConfirmModal } from '../mozi-xmodal'
import { XButton } from '../mozi-xbutton'



export const XModalShow = reaxper(class extends Reaxlass{
	state = {
		modalType: {
			1: {
				id : 1 ,
				show : false ,
				title : 'MoziTest1' ,
				danger : false ,
			},
			2: {
				id : 2 ,
				show : false ,
				title : 'MoziTest2' ,
				danger : true,
			}
		},
		currentClick : 1,
		
	};
	render () {
		const { Space } = antd;
		
		const btnArr = [
			{
				id : 1 ,
				showModal : false ,
				title : 'MoziTest1' ,
				danger : false ,
			} ,
			{
				id : 2 ,
				showModal : false ,
				title : 'MoziTest2' ,
				danger : true,
			} ,
		];
		const {modalType = {}, currentClick} = this.state
		return (
			<>
				<p>test</p>
				<Space
					style = { {
						width : '50%' ,
					} }
				>
					{ btnArr.map((item) => {
						return (
							<XButton
								key = { item.id }
								
								danger = { item.danger }
								onClick = { () => {
									this.setState({
										currentClick: item.id,
										modalType: {
											...modalType,
											[item.id]: {
												...modalType[item.id],
												show: true
											}
										}
									})
								} }
							>
								{item.title}
							</XButton>
						);
					}) }
				</Space>
				<XConfirmModal
					danger = { modalType[currentClick].danger }
					open = { modalType[currentClick].show }
					title = { modalType[currentClick].title }
					actionClick = { () => {alert('confirm');} }
					cancelClick = { () => {
						this.setState({
							modalType: {
								...modalType,
								[currentClick]: {
									...modalType[currentClick],
									show: false
								}
							}
						})
					} }
				/>
			
			</>
		);
	}


});
