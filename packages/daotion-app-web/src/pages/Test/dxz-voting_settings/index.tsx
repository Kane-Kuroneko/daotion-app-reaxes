import less from './index.module.less';
import {
	Button ,
	Switch,
	Select
} from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import {
	Cascader ,
	Input ,
	Space ,
} from 'antd';

const { Option } = Select;

const children : React.ReactNode[] = [];
for ( let i = 10 ; i < 36 ; i++ ) {
	children.push( <Option key = { i.toString( 36 ) + i }>{ i.toString( 36 ) + i }</Option> );
}
const selectAfter = (
	<Select
		defaultValue = "Hours"
		style = { {} }
	>
		<Option value = "Hours">Hours</Option>
		<Option value = "Minutes">Minutes</Option>
		<Option value = "Seconds">Seconds</Option>
		<Option value = "Days">Days</Option>
	</Select>
);
const handleChange = ( value : string[] ) => {
	console.log( `selected ${ value }` );
};

export const DxzVoting_Settings = () => {
	return <>
		<div
			className = { less.votingSettingsContainer }
			style = { {
				backgroundColor : "#f4f5f6" ,
				minWidth : "max-content" ,
				height : "fit-content" ,
				
			} }
		>
			<Button
				style = { {
					color : "#353945" ,
					backgroundColor : "#ffffff" ,
					border : "2px solid #E6E8EC" ,
					width : "121px" ,
					height : "48px" ,
					borderRadius : "12px" ,
					marginBottom : "24px" ,
					display : "flex" ,
					alignItems : "center" ,
				} }
			>
				<svg
					width = "16"
					height = "16"
					viewBox = "0 0 16 16"
					fill = "none"
					xmlns = "http://www.w3.org/2000/svg"
				>
					<path
						d = "M7.13813 11.8619C7.39848 12.1223 7.39848 12.5444 7.13813 12.8047C6.87778 13.0651 6.45567 13.0651 6.19532 12.8047L2.3334 8.94281C1.8127 8.42211 1.8127 7.57789 2.3334 7.05719L6.19532 3.19526C6.45567 2.93491 6.87778 2.93491 7.13813 3.19526C7.39848 3.45561 7.39848 3.87772 7.13813 4.13807L3.94287 7.33333H13.3334C13.7016 7.33333 14.0001 7.63181 14.0001 8C14.0001 8.36819 13.7016 8.66667 13.3334 8.66667H3.94287L7.13813 11.8619Z"
						fill = "#353945"
					/>
				</svg>
				
				<span
					style = { {
						marginLeft : "12px" ,
						height : "24px" ,
						width : "61px" ,
						lineHeight : "24px" ,
						fontSize : "15px" ,
						fontWeight : "700" ,
					} }
				>
					Go Back
				</span>
			</Button>
			
			<div
				style = { {
					display : "flex" ,
					flexFlow : "row" ,
					alignItems : "flex-start" ,
				} }
			>
				<div
					style = { {
						display : "flex" ,
						flexFlow : "column" ,
						alignItems : "flex-start" ,
						backgroundColor : "#f4f5f6" ,
					} }
				>
					<div
						style = { {
							padding : "24px" ,
							backgroundColor : "#ffffff" ,
							width : "852px" ,
							marginBottom : "8px" ,
							borderRadius : "8px" ,
						} }
					>
						<p
							style = { {
								margin : "0px 0px 32px 0px" ,
								padding : "4px 0px" ,
								fontSize : "24px" ,
								lineHeight : "32px" ,
								fontWeight : "600" ,
								color : "#1a1d1f" ,
							} }
						>
							Proposal
						</p>
						<p
							style = { {
								fontSize : "14px" ,
								lineHeight : "24px" ,
								fontWeight : "600" ,
								marginBottom : "12px" ,
							} }
						>
							Proposal Strategie
						</p>
						
						<div
							style = { {
								marginBottom : "12px" ,
								padding : "16px 24px" ,
								backgroundColor : "#f4f5f6" ,
								border : "none" ,
								borderRadius : "16px" ,
								display : "inline-flex" ,
								width : "100%" ,
								justifyContent : "space-between" ,
								alignItems : "center" ,
							} }
						>
							<div
								style = { {
									display : "inline-flex" ,
									flexFlow : "column wrap" ,
									
								} }
							>
								<p
									style = { {
										fontSize : "14px" ,
										fontWeight : "700" ,
										margin : "0px 0px 0px 0px" ,
										color : "#23262f" ,
										lineHeight : "16px" ,
									} }
								>USTD
								</p>
								<p
									style = { {
										fontSize : "14px" ,
										fontWeight : "bold" ,
										margin : "0px 0px 0px 0px" ,
										color : "#3772ff" ,
										lineHeight : "22px" ,
									} }
								>
									0xdAC17F958D2ee523a2206206994597C13D831ec7
								</p>
							</div>
							<svg
								width = "20"
								height = "20"
								viewBox = "0 0 20 20"
								fill = "none"
								xmlns = "http://www.w3.org/2000/svg"
							>
								<path
									fill-rule = "evenodd"
									clip-rule = "evenodd"
									d = "M4.41073 4.41076C4.73617 4.08533 5.26381 4.08533 5.58925 4.41076L9.99999 8.82151L14.4107 4.41076C14.7362 4.08533 15.2638 4.08533 15.5892 4.41076C15.9147 4.7362 15.9147 5.26384 15.5892 5.58928L11.1785 10L15.5892 14.4108C15.9147 14.7362 15.9147 15.2638 15.5892 15.5893C15.2638 15.9147 14.7362 15.9147 14.4107 15.5893L9.99999 11.1785L5.58925 15.5893C5.26381 15.9147 4.73617 15.9147 4.41073 15.5893C4.0853 15.2638 4.0853 14.7362 4.41073 14.4108L8.82148 10L4.41073 5.58928C4.0853 5.26384 4.0853 4.7362 4.41073 4.41076Z"
									fill = "#777E91"
								/>
							</svg>
						</div>
						<div
							style = { {
								marginBottom : "12px" ,
								padding : "16px 24px" ,
								backgroundColor : "#f4f5f6" ,
								border : "none" ,
								borderRadius : "16px" ,
								display : "inline-flex" ,
								width : "100%" ,
								justifyContent : "space-between" ,
								alignItems : "center" ,
								
							} }
						>
							<div
								style = { {
									display : "inline-flex" ,
									flexFlow : "column wrap" ,
									
								} }
							>
								<p
									style = { {
										fontSize : "14px" ,
										fontWeight : "bolder" ,
										margin : "0px 0px 0px 0px" ,
										color : "#23262f" ,
										lineHeight : "16px" ,
									} }
								>ETH
								</p>
								<p
									style = { {
										fontSize : "14px" ,
										fontWeight : "bold" ,
										margin : "0px 0px 0px 0px" ,
										color : "#3772ff" ,
										lineHeight : "22px" ,
									} }
								>
									0xdAC17F958D2ee523a2206206994597C13D831ec7
								</p>
							</div>
							<svg
								width = "20"
								height = "20"
								viewBox = "0 0 20 20"
								fill = "none"
								xmlns = "http://www.w3.org/2000/svg"
							>
								<path
									fill-rule = "evenodd"
									clip-rule = "evenodd"
									d = "M4.41073 4.41076C4.73617 4.08533 5.26381 4.08533 5.58925 4.41076L9.99999 8.82151L14.4107 4.41076C14.7362 4.08533 15.2638 4.08533 15.5892 4.41076C15.9147 4.7362 15.9147 5.26384 15.5892 5.58928L11.1785 10L15.5892 14.4108C15.9147 14.7362 15.9147 15.2638 15.5892 15.5893C15.2638 15.9147 14.7362 15.9147 14.4107 15.5893L9.99999 11.1785L5.58925 15.5893C5.26381 15.9147 4.73617 15.9147 4.41073 15.5893C4.0853 15.2638 4.0853 14.7362 4.41073 14.4108L8.82148 10L4.41073 5.58928C4.0853 5.26384 4.0853 4.7362 4.41073 4.41076Z"
									fill = "#777E91"
								/>
							</svg>
						
						</div>
						
						
						<AddButton>Add Proposal Strategie</AddButton>
						<p
							style = { {
								fontSize : "14px" ,
								fontWeight : "600" ,
								marginBottom : "12px" ,
							} }
						>
							Author
						</p>
						<div
							style = { {
								width : "100%" ,
								height : "112px" ,
								border : "2px solid rgba(154,159,165,0.25)" ,
								borderRadius : "12PX" ,
								marginBottom : "12px" ,
							} }
						>
							{/*组件*/ }
						</div>
						<div
							style = { {
								height : "16px" ,
								marginBottom : "12px" ,
							} }
						>
							<span
								style = { {
									fontSize : "13px" ,
									fontWeight : "bold" ,
									color : "#353945" ,
									height : "16px" ,
								} }
							>
								Enter in the list of Addresses and Amounts
							</span>
							<span
								style = { {
									fontSize : "13px" ,
									fontWeight : "bold" ,
									color : "#9a9fa5" ,
									height : "16px" ,
								} }
							> amounts will be sent to - one address,amount per line.
							</span>
						</div>
						<div
							style = { {
								display : "flex" ,
								justifyContent : "space-between" ,
								alignItems : "center" ,
							} }
						>
							<span
								style = { {
									display : "inline-flex" ,
									flexFlow : "row nowrap" ,
									alignItems : "center" ,
								} }
							>
								<p
									style = { {
										fontSize : "14px" ,
										lineHeight : "24px" ,
										fontWeight : "600" ,
										display : "inline-flex" ,
										flexFlow : "row nowrap" ,
										alignItems : "center" ,
										margin : "0px 4px 0px 0px" ,
									} }
								>
									Author proposal only
								</p>
								<svg
									width = "16"
									height = "16"
									viewBox = "0 0 16 16"
									fill = "none"
									xmlns = "http://www.w3.org/2000/svg"
								>
									<path
										fill-rule = "evenodd"
										clip-rule = "evenodd"
										d = "M14.6668 8C14.6668 11.6819 11.6821 14.6667 8.00016 14.6667C4.31826 14.6667 1.3335 11.6819 1.3335 8C1.3335 4.3181 4.31826 1.33333 8.00016 1.33333C11.6821 1.33333 14.6668 4.3181 14.6668 8ZM8.00016 7.33333C8.36835 7.33333 8.66683 7.6318 8.66683 8V11.3339C8.66683 11.7021 8.36835 12.0006 8.00016 12.0006C7.63197 12.0006 7.3335 11.7021 7.3335 11.3339V8C7.3335 7.6318 7.63197 7.33333 8.00016 7.33333ZM8.00016 6C8.36835 6 8.66683 5.70152 8.66683 5.33333C8.66683 4.96514 8.36835 4.66666 8.00016 4.66666C7.63197 4.66666 7.3335 4.96514 7.3335 5.33333C7.3335 5.70152 7.63197 6 8.00016 6Z"
										fill = "#9A9FA5"
									/>
								</svg>
							</span>
							<span>
								<Switch />
							</span>
						</div>
					
					</div>
					
					<Block title = "Voting">
						<p
							style = { {
								fontSize : "14px" ,
								lineHeight : "24px" ,
								fontWeight : "600" ,
								marginBottom : "12px" ,
							} }
						>
							Voting Strategie
						</p>
						<AddButton text = "">Add Strategie</AddButton>
						<p
							
							style = { {
								fontSize : "14px" ,
								lineHeight : "24px" ,
								fontWeight : "600" ,
								marginBottom : "12px" ,
							} }
						>
							
							Voting delay
						</p>
						
						<IptSelect></IptSelect>
						<p
							style = { {
								fontSize : "14px" ,
								lineHeight : "24px" ,
								fontWeight : "600" ,
								marginBottom : "12px" ,
							} }
						>
							Voting period
						</p>
						<IptSelect></IptSelect>
						<Votingtype title = "Proposal validity threshold"></Votingtype>
						<p
							style = { {
								fontSize : "14px" ,
								lineHeight : "24px" ,
								fontWeight : "600" ,
								marginBottom : "12px" ,
							} }
						>
							Proposal validity threshold
						</p>
						<XSelect
							type="primary"
							// className = { less.votingType_box }
							style = { {
								width : "100%" ,
								color : "#9a9fa5" ,
								height : "48px" ,
								
							} }
							removeIcon = { <ClearSvg /> }
							defaultValue = { [
								'a10' ,
								'c12' ,
							] }
							onChange = { handleChange }
							mode = "multiple"
							allowClear
							placeholder = "Select VotingType"
						>{ children }</XSelect>
					
					
					</Block>
				
				
				</div>
				<div
					
					style = { {
						padding : "24px" ,
						width : "340px" ,
						height : "160px" ,
						top : "204px" ,
						marginLeft : "8px" ,
						display : "inline-flex" ,
						flexFlow : "column wrap" ,
						backgroundColor : "#ffffff" ,
						borderRadius : "8px" ,
					} }
				>
					<Button
						className = { less.save_cancel }
						style = { {
							marginBottom : "12PX" ,
							backgroundColor : "#3772ff" ,
							color : "#fcfcfd" ,
						} }
					
					>Save
					</Button>
					
					<Button
						className = { less.save_cancel }
						style = { {
							color : "#353945" ,
							backgroundColor : "#ffffff" ,
							border : "2px solid #E6E8EC" ,
						} }
					>Cancel
					</Button>
				</div>
			</div>
		
		</div>
	
	</>;
	
};


const Block = ( props ) => {
	
	
	return <>
		<div
			style = { {
				padding : "24px" ,
				backgroundColor : "#ffffff" ,
				width : "852px" ,
				marginBottom : "8px" ,
				borderRadius : "8px" ,
			} }
		>
			<p
				style = { {
					margin : "0px 0px 32px 0px" ,
					padding : "4px 0px" ,
					fontSize : "24px" ,
					lineHeight : "32px" ,
					fontWeight : "600" ,
					color : "#1a1d1f" ,
				} }
			>
				{ props.title }
			</p>
			{ props.children }
		</div>
	</>;
};

const AddButton = ( props ) => {
	
	return <>
		<Button
			style = { {
				backgroundColor : "#ffffff" ,
				display : "flex" ,
				alignItems : "center" ,
				borderRadius : "12px" ,
				padding : "8px 16px" ,
				border : "2px solid #3772FF" ,
				boxSizing : "border-box" ,
				height : "40px" ,
				marginBottom : "32px" ,
			} }
		>
			<svg
				width = "12"
				height = "12"
				viewBox = "0 0 12 12"
				fill = "none"
				xmlns = "http://www.w3.org/2000/svg"
			>
				<path
					fill-rule = "evenodd"
					clip-rule = "evenodd"
					d = "M7 1C7 0.447715 6.55228 0 6 0C5.44772 0 5 0.447715 5 1V5H1C0.447715 5 0 5.44772 0 6C0 6.55228 0.447715 7 1 7H5V11C5 11.5523 5.44772 12 6 12C6.55228 12 7 11.5523 7 11V7H11C11.5523 7 12 6.55228 12 6C12 5.44772 11.5523 5 11 5H7V1Z"
					fill = "#2A85FF"
				/>
			</svg>
			
			
			<span
				style = { {
					color : "#3772ff" ,
					fontWeight : "bolder" ,
					padding : "8px 0px 8px 8px" ,
					fontSize : "13px" ,
					lineHeight : "24px" ,
				} }
			>
				{ props.children }
			</span>
		</Button>
	</>;
};

const Votingtype = ( props ) => {
	return <>
		<p
			style = { {
				fontSize : "14px" ,
				lineHeight : "24px" ,
				fontWeight : "600" ,
				marginBottom : "12px" ,
			} }
		>
			{ props.title }</p>
		<div
			style = { {
				marginBottom : "32px" ,
				padding : "16px 24px" ,
				backgroundColor : "#f4f5f6" ,
				border : "none" ,
				borderRadius : "16px" ,
				display : "inline-flex" ,
				width : "100%" ,
				justifyContent : "space-between" ,
				alignItems : "center" ,
				height : "48px" ,
			} }
		>
			<div
				style = { {
					display : "inline-flex" ,
					flexFlow : "column wrap" ,
					
				} }
			>
				<p
					style = { {
						fontSize : "14px" ,
						fontWeight : "700" ,
						margin : "0px 0px 0px 0px" ,
						color : "#23262f" ,
						lineHeight : "16px" ,
					} }
				>0
				</p>
			
			</div>
		
		</div>
	</>;
};
const ClearSvg = () => {
	return <>
		<svg
			width = "24"
			height = "24"
			viewBox = "0 0 24 24"
			fill = "none"
			xmlns = "http://www.w3.org/2000/svg"
		>
			<path
				fillRule = "evenodd"
				clipRule = "evenodd"
				d = "M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM9.70711 8.29289C9.31658 7.90237 8.68342 7.90237 8.29289 8.29289C7.90237 8.68342 7.90237 9.31658 8.29289 9.70711L10.5858 12L8.29289 14.2929C7.90237 14.6834 7.90237 15.3166 8.29289 15.7071C8.68342 16.0976 9.31658 16.0976 9.70711 15.7071L12 13.4142L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L13.4142 12L15.7071 9.70711C16.0976 9.31658 16.0976 8.68342 15.7071 8.29289C15.3166 7.90237 14.6834 7.90237 14.2929 8.29289L12 10.5858L9.70711 8.29289Z"
				fill = "white"
			/>
		</svg>
	
	</>;
};
const IptSelect = () => {
	return <>
		{/*<div*/ }
		{/*// style = { {
			// 	marginBottom : "32px" ,
			// 	padding : "16px 24px" ,
			// 	backgroundColor : "#ffffff" ,
			// 	border : "none" ,
			// 	borderRadius : "16px" ,
			// 	display : "inline-flex" ,
			// 	width : "70%" ,
			// 	justifyContent : "space-between" ,
			// 	alignItems : "center" ,
			// 	height : "48px" ,
			// } }*/ }
		{/*>*/ }
		<Input
			addonAfter = { selectAfter }
			placeholder = { 'please input' }
			bordered = { true }
			size = "large"
			style = { {
				// backgroundColor:"#f4f4f4",
				height : "48px" ,
				width : "100%" ,
				marginBottom : "32px" ,
			} }
		/>
		
		{/*</div>*/ }
	</>;
};
import { XSelect } from '@@pages/Test/dxz-select';
