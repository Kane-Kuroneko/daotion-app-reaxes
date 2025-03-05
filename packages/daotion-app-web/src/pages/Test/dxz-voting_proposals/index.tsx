import less from './index.module.less';
import {
	Button ,
	Select,
} from 'antd';
import { reaxel_i18n } from '@@reaxels';

const { Option } = Select;

export const DxzVotingProposals = (() => {
	
	
	const JSX = {
		active : () => {
			return <>
				<span>
					<span
						style = { {
							display : "inline-block" ,
							fontSize : "15px" ,
							color : '#ffffff' ,
							backgroundColor : "#45b36b" ,
							borderRadius : '4px' ,
							verticalAlign : "middle" ,
							textAlign : "center" ,
							padding : "0px 8px" ,
							
						} }
					>
						Active
					</span>
				</span>
			</>;
		} ,
		closed : () => {
			return <>
				<span
					style = { {
						display : "inline-block" ,
						fontSize : "15px" ,
						color : '#ffffff' ,
						backgroundColor : "#777e91" ,
						borderRadius : '4px' ,
						verticalAlign : "middle" ,
						textAlign : "center" ,
						padding : "0px 8px" ,
						
					} }
				>
					Closed
				</span>
			</>;
		} ,
		date : () => {
			return <>
				<span
					style = { {
						display : "flex" ,
						alignItems : "center" ,
						flexFlow : "row nowrap" ,
					} }
				>
					
					<svg
						width = "24"
						height = "25"
						viewBox = "0 0 24 25"
						fill = "none"
						xmlns = "http://www.w3.org/2000/svg"
					>
						<path
							fill-rule = "evenodd"
							clip-rule = "evenodd"
							d = "M7 2.5C7.55228 2.5 8 2.94772 8 3.5V4.5H16V3.5C16 2.94772 16.4477 2.5 17 2.5C17.5523 2.5 18 2.94772 18 3.5V4.5H19C20.6569 4.5 22 5.84315 22 7.5V19.5C22 21.1569 20.6569 22.5 19 22.5H5C3.34315 22.5 2 21.1569 2 19.5V7.5C2 5.84315 3.34315 4.5 5 4.5H6V3.5C6 2.94772 6.44772 2.5 7 2.5ZM16 6.5V7.5C16 8.05228 16.4477 8.5 17 8.5C17.5523 8.5 18 8.05228 18 7.5V6.5H19C19.5523 6.5 20 6.94771 20 7.5V10.5H4V7.5C4 6.94772 4.44772 6.5 5 6.5H6V7.5C6 8.05228 6.44772 8.5 7 8.5C7.55228 8.5 8 8.05228 8 7.5V6.5H16ZM4 12.5V19.5C4 20.0523 4.44772 20.5 5 20.5H19C19.5523 20.5 20 20.0523 20 19.5V12.5H4Z"
							fill = "#6F767E"
						/>
					</svg>
					
					<span
						style = { {
							marginLeft : "16px" ,
							fontWeight : "bold" ,
							fontSize : "14px",
						} }
					>
						End Date: 4/27/2022,11:31 AM
					</span>
				</span>
			</>;
		} ,
		choice : () => {
			return <>
				<span
					style = { {
						display : "flex" ,
						alignItems : "center" ,
						flexFlow : "row nowrap" ,
					} }
				>
					<svg
						width = "24"
						height = "25"
						viewBox = "0 0 24 25"
						fill = "none"
						xmlns = "http://www.w3.org/2000/svg"
					>
						<path
							fill-rule = "evenodd"
							clip-rule = "evenodd"
							d = "M12 22.25C17.5228 22.25 22 17.7728 22 12.25C22 6.72715 17.5228 2.25 12 2.25C6.47715 2.25 2 6.72715 2 12.25C2 17.7728 6.47715 22.25 12 22.25ZM17.7071 9.95711C18.0976 9.56658 18.0976 8.93342 17.7071 8.54289C17.3166 8.15237 16.6834 8.15237 16.2929 8.54289L11 13.8358L8.70711 11.5429C8.31658 11.1524 7.68342 11.1524 7.29289 11.5429C6.90237 11.9334 6.90237 12.5666 7.29289 12.9571L10.2929 15.9571C10.6834 16.3476 11.3166 16.3476 11.7071 15.9571L17.7071 9.95711Z"
							fill = "#45B36B"
						/>
					</svg>
					
					<span
						style = { {
							marginLeft : "16px" ,
							fontWeight : "bold" ,
							fontSize : "14px" ,
							
							
						} }
					>
						Choice #1 - 10M TokenName
					</span>
				</span>
			</>;
		},
	};
	
	return <>
		<div className = { less.voting_proposalsContainer }
			style = { {
				backgroundColor : "#f4f5f6" ,
				display : "flex" ,
				boxSizing : "border-box" ,
				flexFlow : "column" ,
				width : "100%" ,
				height : "100%" ,
				minWidth:"",
			} }
			
		>
			<div
				className = "proposal-menu"
				style = { {
					display : "flex" ,
					justifyContent : "space-between" ,
					marginBottom : "24px" ,
					alignItems : "center" ,
				} }
			>
				<div
					style = { {
						display : "flex" ,
						alignItems : "center" ,
					} }
				>
					<span
						style = { {
							fontSize : "40px" ,
							fontWeight : "600" ,
							lineHeight : "48px" ,
						} }
					>Proposals
					</span>
					<span
						style = { {
							marginLeft : "24px" ,
							display : "inline-block" ,
						} }
					>
						<Select
							defaultValue = "All proposals"
							// open={true}
							style = { {
								
								fontSize : "14px" ,
								height : "24px" ,
								justifyContent : "center" ,
								color : "#6f767e" ,
								fontWeight : "bolder" ,
								backgroundColor : "#ffffff" ,
								borderRadius : "12px" ,
								border : "2px solid #EFEFEF" ,
								display : "flex" ,
								alignItems : "center" ,
							} }
						>
							<Option value = "jack">Jack</Option>
							<Option value = "lucy">Lucy</Option>
						</Select>
					</span>
				</div>
				<div
					style = { {
						display : "flex" ,
						alignItems : "center" ,
					} }
				>
					<Button className={less.setting_newProposal}
						style = { {
							backgroundColor : "#ffffff" ,
							border : "2px solid #E6E8EC" ,
							borderRadius:"12px",
							color : "#6f767e" ,
							padding : "19px 0px" ,
						} }
					
					>
						<span 
							style = { {
								padding : "12px 15px" ,
							} }
						>
							Settings
						</span>
					</Button>
					<Button className={less.setting_newProposal}
						style = { {
							marginLeft : "16px" ,
							backgroundColor : "#3772ff" ,
							color : "#fcfcfd" ,
							padding : "22px 14px" ,
							borderRadius:"12px",
						} }
					>New Proposal
					</Button>
				</div>
			</div>
			<div
				className = "Title-list"
				style = { {
					display : "flex" ,
					flexDirection : "column" ,
					
				} }
			>
				{ new Array( 4 ).fill( '' ).
				map( ( v , i ) => <div
					key = { i }
					style = { {
						backgroundColor : "#fcfcfc" ,
						marginBottom : "8px" ,
						padding : "24px" ,
						borderRadius : '8px' ,
					} }
				>
					<div
						style = { {
							display : "flex" ,
							alignItems : "center" ,
							justifyContent : "space-between" ,
						} }
					>
						<span className= { less.Title }
						>
							Title
						</span>
						{ i % 2 === 0 ? JSX.active() : JSX.closed() }
					</div>
					<p
						style = { {
							fontSize : "14px" ,
							fontWeight : "400" ,
							margin : "12px 0px" ,
							height:"24px",
						} }
					>
						Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
					</p>
					<div
						style = { {
							display : "flex" ,
							justifyContent : "space-between" ,
							alignItems : "center" ,
						} }
					>
						<div>
							<img
								src = ""
								alt = ""
								style = { {
									width : "27px" ,
									height : "27px" ,
									marginRight : "16px" ,
									backgroundColor : 'greenyellow' ,
								} }
							
							/>
							<span
								style = { {
									fontWeight : "bolder" ,
									fontSize : "14px" ,
									marginRight : "2px" ,
								} }
							>
								DAONAME
							</span>
							<span>By</span>
							<span
								style = { {
									fontWeight : "bolder" ,
									fontSize : "14px" ,
									marginLeft : "2px" ,
								} }
							>0×D0...bdb9
							</span>
						</div>
						{ i % 2 === 0 ? JSX.date() : JSX.choice() }
					</div>
				
				</div> ) }
			</div>
		</div>
	
	</>;
});
