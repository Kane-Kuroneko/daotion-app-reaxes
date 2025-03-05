import {
	headerBtnStyle ,
	reaxel_header_svg_tool ,
} from '../';
import {
	reaxel_wallet ,
} from '@@reaxels';
import {
	reaxel_subs_root_click
} from '@@reaxels';
import {
	BtnIconShare ,
	ItemIconEthNode,
} from '@@SVGcomponents';
import less from '../index.module.less';

import { XPopover } from '@@Xcomponents';

export const SelectNetworkButtonDropdown = reaxper( () => {
	const { Button } = antd;
	const reax_wallet = reaxel_wallet();
	const reax_header_svg_tool = reaxel_header_svg_tool();
	const [ subscribe_root_click,invoke_root_click ] = reaxel_subs_root_click();
	
	const [ visible , setVisible ] = useState( false );
	useEffect( () => {
		const symbol = Symbol();
		const subscription = () => {
			setVisible( false );
		};
		return subscribe_root_click( subscription );
		
	} , [] );
	
	const btnStyle : React.CSSProperties = {
		...headerBtnStyle,
		padding : "8px 16px" ,
		borderRadius : "12px" ,
		border : "none" ,
		marginLeft : "8px" ,
		display : "flex" ,
		alignItems : "center" ,
		height:"40px"
	};
	if ( !reax_wallet.wallet ) {
		return <>
			<Button
				type = "primary"
				style = { {
					...btnStyle,
					// minWidth : "120px",
					
				} }
				onClick = { () => {
					reaxel_wallet().
					connectWallet();
				} }
			>
				<I18n>
					Connect Wallet
				</I18n>
			
			</Button>
		</>;
	}
	const currentNetworkInfo = reax_wallet.chains.find( ( { id } ) => reax_wallet.chain?.id === id );
	return <>
		<XPopover
			overlayClassName = { less.userinfoPopoverContainer }
			align = { {
				// targetOffset : [ -61 ] ,
			} }
			onOpenChange = { ( visible ) => {
				invoke_root_click.then( () => setVisible( () => visible ) );
			} }
			autoAdjustOverflow = { false }
			// visible = { true }
			open = { visible }
			content = { <div
				style = { {
					padding : "24px 16px" ,
					display : "flex" ,
					flexFlow : "column nowrap" ,
					whiteSpace : "nowrap" ,
					
				} }
				onClick = { ( e ) => {
					e.stopPropagation();
				} }
			>
				<div
					style = { {
						fontWeight : 600 ,
						fontSize : "14px" ,
						color : "#353945" ,
					} }
				>
					<I18n>
						Select a network
					</I18n>
				
				</div>
				{ reax_wallet.chains.map( ( chain ) => {
					if ( chain.id === reax_wallet.chain?.id ) {
						
						return <div
							key = { chain.id }
							style = { {
								padding : "8px 16px" ,
								display : "flex" ,
								alignItems : "center" ,
								backgroundColor : "#f4f5f6" ,
								borderRadius : "12px" ,
								marginTop : "8px" ,
								userSelect : "none" ,
								
							} }
						>
							<ItemIconEthNode src = { chain.icon } />
							<div
								style = { {
									width : "152px" ,
									display : "flex" ,
									justifyContent : "space-between" ,
									alignItems : "center" ,
									height : "46px" ,
									marginLeft : "16px" ,
									
								} }
							>
								<div
									style = { {
										display : "flex" ,
										flexFlow : "column nowrap" ,
										justifyContent : "space-between" ,
										lineHeight : "normal" ,
										height : "100%" ,
										
									} }
								>
									<span
										style = { {
											fontWeight : 600 ,
											fontSize : "14px" ,
											color : "#777e91" ,
											
										} }
									>{ chain.label }
									</span>
									<a
										style = { {
											fontWeight : 400 ,
											fontSize : "12px" ,
											textDecoration : "underline" ,
											color : "#777e90" ,
										} }
										onClick = { () => {
											window.open( chain.blockchainExplorer );
										} }
									>Etherscan
									</a>
								</div>
								<div
									style = { {
										display : "flex" ,
										flexFlow : "column nowrap" ,
										justifyContent : 'space-between' ,
										alignItems : "center" ,
										height : "100%" ,
										
									} }
								>
									<span
										style = { {
											display : "flex" ,
											width : "10px" ,
											height : "10px" ,
											backgroundColor : "#45b26b" ,
											borderRadius : "50%" ,
											
										} }
									></span>
									<BtnIconShare
										style = { {
											cursor : "pointer" ,
											
										} }
									/>
								</div>
							</div>
						</div>;
					}
					
					return <div
						key = { chain.id }
						onClick = { () => {
							reax_wallet.selectChain( { chainId : chain.id } ).
							then( ( success ) => {
								if ( !success ) return Promise.reject( false );
								setTimeout( () => {setVisible( false );} , 500 );
							} ).
							catch( ( e ) => {
								console.error( e );
							} );
						} }
						style = { {
							padding : "8px 16px" ,
							display : "flex" ,
							alignItems : "center" ,
							borderRadius : "12px" ,
							marginTop : "8px" ,
							userSelect : "none" ,
						} }
					>
						<ItemIconEthNode src = { chain.icon } />
						<div
							className = { less.selectNetworkUnselected }
						>
							<span>{ chain.label }</span>
						</div>
					</div>;
				} ) }
			</div> }
			
			placement = "bottom"
			trigger = { [ 'click' ] }
		>
			{ currentNetworkInfo ? <Button
				style = { btnStyle }
				onClick = { () => {
					setVisible( !visible );
					console.log( "data:image/svg+xml;base64," + window.btoa( reax_header_svg_tool.inputSvgString ) );
				} }
			>
				<img
					src = { currentNetworkInfo.icon }
					style = { { borderRadius : "50%" } }
				/>
				<span
					style = { {
						fontWeight : "bold" ,
						marginLeft : "8px" ,
						
					} }
				>
					{ currentNetworkInfo.label }
				</span>
				<img
					style = { {
						marginLeft : "8px" ,
						
					} }
					src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDE0IDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xLjcwNzExIDAuMjkyODkzQzEuMzE2NTggLTAuMDk3NjMxMSAwLjY4MzQxNyAtMC4wOTc2MzExIDAuMjkyODkzIDAuMjkyODkzQy0wLjA5NzYzMTEgMC42ODM0MTcgLTAuMDk3NjMxMSAxLjMxNjU4IDAuMjkyODkzIDEuNzA3MTFMMS43MDcxMSAwLjI5Mjg5M1pNNyA3TDYuMjkyODkgNy43MDcxMUM2LjY4MzQyIDguMDk3NjMgNy4zMTY1OCA4LjA5NzYzIDcuNzA3MTEgNy43MDcxMUw3IDdaTTEzLjcwNzEgMS43MDcxMUMxNC4wOTc2IDEuMzE2NTggMTQuMDk3NiAwLjY4MzQxNyAxMy43MDcxIDAuMjkyODkzQzEzLjMxNjYgLTAuMDk3NjMxMSAxMi42ODM0IC0wLjA5NzYzMTEgMTIuMjkyOSAwLjI5Mjg5M0wxMy43MDcxIDEuNzA3MTFaTTAuMjkyODkzIDEuNzA3MTFMNi4yOTI4OSA3LjcwNzExTDcuNzA3MTEgNi4yOTI4OUwxLjcwNzExIDAuMjkyODkzTDAuMjkyODkzIDEuNzA3MTFaTTcuNzA3MTEgNy43MDcxMUwxMy43MDcxIDEuNzA3MTFMMTIuMjkyOSAwLjI5Mjg5M0w2LjI5Mjg5IDYuMjkyODlMNy43MDcxMSA3LjcwNzExWiIgZmlsbD0iIzg4ODg4OCIvPgo8L3N2Zz4K"
				/>
			</Button> : <Button
				style = { {
					...btnStyle ,
					backgroundColor : "#ef466f" ,
					padding : "8px 24px" ,
				} }
			>
				<svg
					width = "24"
					height = "24"
					viewBox = "0 0 24 24"
					fill = "none"
					xmlns = "http://www.w3.org/2000/svg"
				>
					<path
						d = "M2.25 12H5.25L9 3.75L15 19.5L18.75 12H21.75"
						stroke = "white"
						strokeWidth = "2"
						strokeLinecap = "round"
						strokeLinejoin = "round"
					/>
				</svg>
				<span
					style = { {
						marginLeft : "8px" ,
						fontWeight : 600 ,
						fontSize : "16px" ,
						color : "white" ,
					} }
				>
					Wrong Network
				</span>
			</Button> }
		</XPopover>
	</>;
} );
