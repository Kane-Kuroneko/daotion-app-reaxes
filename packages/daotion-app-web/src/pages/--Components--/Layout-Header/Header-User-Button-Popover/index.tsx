export const UserButtonDropdown = reaxper( () => {
	const {
		Button ,
		Switch ,
	} = antd;
	const reax_wallet = reaxel_wallet();
	const [subscribe_root_click,invoke_root_click,root_click_symbol] = reaxel_subs_root_click();
	const [ visible , setVisible ] = useState( false );
	const { navigate } = toolkits.useRouter();
	
	
	useEffect( () => {
		
		return subscribe_root_click( () => {
			setVisible( false );
		} );
	} , [] );
	
	if ( !reax_wallet.wallet ) return null;
	const btnStyle : React.CSSProperties = {
		...headerBtnStyle ,
		padding : "8px" ,
		borderRadius : "12px" ,
		border : "none" ,
		marginLeft : "8px" ,
		display : "flex" ,
		alignItems : "center" ,
		fontWeight : "bold" ,
		
	};
	return <>
		<XPopover
			overlayClassName = { less.userinfoPopoverContainer }
			align = { {
				targetOffset : [ 32 ] ,
			} }
			autoAdjustOverflow = { false }
			open = { visible }
			onOpenChange = { ( visible ) => {
				invoke_root_click.then( () => setVisible( () => visible ) );
			} }
			trigger = { [ 'click' ] }
			content = { <div
				className = { less.userinfoPopoverContent }
				onClick = { ( e ) => {
					e.stopPropagation();
				} }
			>
				<div
					style = { { display : "flex" } }
				>
					<UserAvatar width = {40} height={40}/>
					<div
						style = { {
							display : "flex" ,
							justifyContent : "center" ,
							flexFlow : "column nowrap" ,
							marginLeft : "8px" ,
							width : "100px" ,
							lineHeight : "normal" ,
							
						} }
					>
						<span
							style = { {
								fontSize : 16 ,
								color : "#23262f" ,
							} }
						>{ reax_wallet.account?.ens?.name }</span>
						<EllipsisAddress />
					</div>
					<div
						style = { {
							display : "flex" ,
							justifyContent : "space-between" ,
							marginLeft : "16px" ,
							alignItems : "center" ,
							width : "48px" ,
							
						} }
					>
						{/*<BtnIconRenameSvgComponent />*/}
						<BtnIconCopySvgComponent />
					</div>
				</div>
				
				<div
					className = { less.userPopoverMenuItem }
					onClick = { ( e ) => {
						setVisible( false );
						navigate( '/profile' );
					} }
				>
					<div>
						<ItemIconProfileSvgComponent />
						<span>
							<I18n>
								My profile
							</I18n>
						</span>
					</div>
				</div>
				<div
					className = { less.userPopoverMenuItem }
					onClick = { () => {
						setVisible( false );
						reax_wallet.disconnectWallet( reax_wallet.wallet.label );
					} }
				>
					<div>
						<ItemIconDisconnectSvgComponent />
						<span>
							<I18n>
								Disconnect
							</I18n>
						</span>
					</div>
				</div>
			
			
			</div> }
		>
			<Button
				style = { btnStyle }
				onClick = { () => {
					setVisible( !visible );
				} }
			>
				<span
					style = { {
						fontSize : "16px" ,
						fontWeight : "bold" ,
						color : "#23262f" ,
						fontFamily : "Inter , Consolas" ,
					} }
				>
					{ reax_wallet.account?.ens?.name ?? <EllipsisAddress /> }
				</span>
				<UserAvatar width={20} height={20} />
			</Button>
		</XPopover>
	</>;
} );


import less from '../index.module.less';

import {
	reaxel_subs_root_click
} from '@@reaxels';
import { XPopover } from '@@Xcomponents';

import {
	BtnIconCopySvgComponent ,
	BtnIconRenameSvgComponent ,
	ItemIconDisconnectSvgComponent ,
	ItemIconProfileSvgComponent ,
} from '@@SVGcomponents';
import { headerBtnStyle } from '../';
import { UserAvatar } from '../Header-User-Avatar';
import { EllipsisAddress } from '../Header-Ellipsis-Address';

import {
	reaxel_wallet ,
} from '@@reaxels';
