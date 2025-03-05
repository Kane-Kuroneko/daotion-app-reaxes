
import {SelectNetworkButtonDropdown} from './Header-Select-Network-Button-Popover';

export const Layout_Header = reaxper( class extends Reaxlass {
	
	
	reax_header_svg_tool = reaxel_header_svg_tool();
	
	reax_wallet = reaxel_wallet();
	
	reax_user = reaxel_user();
	
	reax_blockies = reaxel_blockies();
	
	reax_theme = reaxel_theme();
	
	render() {
		const {
			Input ,
			Button ,
			Switch ,
		} = antd;
		const { navigate } = toolkits.useRouter();
		return <div className = { less.topBanner }>
			{ __EXPERIMENTAL__ && <div>
				<Input.TextArea
					value = { this.reax_header_svg_tool.inputSvgString }
					onChange = { ( e ) => this.reax_header_svg_tool.setInputSvgString( e.target.value ) }
					onPaste = { ( e ) => {
						if ( e.clipboardData.items[ 0 ].kind === "file" ) {
							const picFile = e.clipboardData.items[ 0 ].getAsFile();
							/*navigator?.clipboard?.readText?.().
							then( ( value ) => {
								console.log( value );
							} );*/
							(
								new Promise( ( resolve ) => {
									const fileReader = new FileReader();
									fileReader.onload = ( e ) => {
										resolve( e.target.result );
									};
									fileReader.readAsDataURL( picFile );
								} )
							).then( ( base64 : string ) => {
								console.log( base64 );
								navigator.clipboard.writeText( `url('${ base64 }')` );
							} );
						}
					} }
				/>
			</div> }
			<div className = { less.rightSideGroup }>
				
				<Button
					style = { {
						padding : '6px 6px 8px 8px' ,
						borderRadius : "12px" ,
						height : "40px" ,
						border : "none" ,
						marginLeft : "8px" ,
						boxShadow:"unset",
						backgroundColor : this.reax_theme.theme === "light" ? "" : "black"
					} }
					onClick = { () => {
						console.log( `url('data:image/svg+xml;base64,${ window.btoa( this.reax_header_svg_tool.inputSvgString ) }')` );
						
					} }
					autoFocus = { false }
				>
					<HeaderNotificationIconSvgComponent />
				</Button>
				
				{ __EXPERIMENTAL__ && this.reax_user.fake_wallet_store.logged_in && <Button
					style = { {
						padding : '8px' ,
						borderRadius : "12px" ,
						height : "40px" ,
						border : "none" ,
						marginLeft : "8px" ,
						boxShadow:"none",
					} }
					onClick = { () => {
						localStorage.clear();
						localStorage.setItem('_fake_wallets_map_',`{"0xd0b747df2122a04f4011089999ff77dd97b1bdb9":"0x4aec4b52d9a5c8667dce0f7e4768fabb08f536d2470c92e6af7f8d1f0b86dbbb"}`)
						location.reload();
					} }
					autoFocus = { false }
				>
					logout
				</Button> }
				
				<SelectNetworkButtonDropdown />
				<UserButtonDropdown />
				<GeneralMenuButtonDropdown/>
			</div>
		</div>;
	}
} );

export const reaxel_header_svg_tool = function () {
	
	const {
		store ,
		setState ,
	} = orzMobx( {
		inputSvgString : '' ,
	} );
	
	return () => {
		
		return {
			get inputSvgString() {
				return store.inputSvgString;
			} ,
			setInputSvgString( inputSvgString : string ) {
				setState( { inputSvgString } as const );
			} ,
		};
	};
}();



export const headerBtnStyle : React.CSSProperties = {
	padding : "8px " ,
	borderRadius : "12px" ,
	height : "40px" ,
	border : "none" ,
	marginLeft : "8px" ,
	display : "flex" ,
	alignItems : "center" ,
	fontWeight : "bold" ,
	boxShadow : "unset",
};




import less from './index.module.less';

import {
	reaxel_subs_root_click
} from '@@reaxels';
import { XPopover } from '@@Xcomponents';

import {
	BtnIconCopySvgComponent ,
	BtnIconRenameSvgComponent ,
	HeaderNotificationIconSvgComponent ,
	HeaderToggleThemeIconSvgComponent ,
	ItemIconDisconnectSvgComponent ,
	ItemIconI18nSvgComponent ,
	ItemIconProfileSvgComponent ,
	ItemIconThemeSvgComponent ,
} from '@@SVGcomponents';

import {
	reaxel_blockies ,
	reaxel_user ,
	reaxel_wallet ,
	reaxel_theme ,
} from '@@reaxels';
import { UserButtonDropdown } from './Header-User-Button-Popover';
import { GeneralMenuButtonDropdown } from './Header-General-Button-Popover';

