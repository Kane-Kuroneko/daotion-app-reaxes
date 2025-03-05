import {
	reaxel_edit_profile ,
	reaxel_user_profile ,
	reaxel_wallet ,
	reaxel_profile_avatar ,
	
} from "@@reaxels";


import { Img  } from '@@Xcomponents';
import {
	EditSocialItem ,
	SelectSocialModalBtn,
} from '@@pages/--Components--';
import less from "./index.module.less";


export const EditProfile = reaxper( () => {
	
	const {
		Button ,
		Form ,
		Input ,
		message ,
	} = antd;
	
	const reax_edit_profile = reaxel_edit_profile();
	const reax_wallet = reaxel_wallet();
	const reax_user_profile = reaxel_user_profile();
	const { BlokiesAvatar } = reaxel_profile_avatar();
	Reaxes.collectDeps( reax_user_profile.profileStore );
	
	if(!reax_edit_profile.originalProfile){
		return null;
	}
	
	return <div className = { less.editProfileBox }>
		<h1 className = { less.Title }>
			<I18n>
				Edit profile
			</I18n>
		</h1>
		<p className = { less.intro }>
			<I18n>
				You can set preferred display name, create
			</I18n>
			
			<span className = { less.boldSpan }>
				<I18n>
					your profile URL
				</I18n>
			</span>
			<I18n>
				and manage other personal settings.
			</I18n>
		
		</p>
		<div className = { less.mainField }>
			<div className = { less.profilePhoto }>
				{/*todo 图片变形*/ }
				<div
					className = { less.profilePhotoLeft }
				>
					<Img
						src = { reax_user_profile.profileStore.profile.iconUrl }
						className = { less.profilePhoto }
						fallback = { <BlokiesAvatar
							size = { 128 }
							address = { reax_user_profile.profileStore.profile.address }
							canvasStyle = { {
								borderRadius : "12px" ,
							} }
						/> }
					/>
				</div>
				<div className = { less.profilePhotoRight }>
					<span className = { less.photoTitle }>
						<I18n>
							Profile photo
						</I18n>
					</span>
					<p className = { less.avatarRule }>
						<I18n>
							We recommend an image of at least 400x400.
						</I18n>
						
						<br />
						<I18n>
							Gifs work too 🙌
						</I18n>
					
					</p>
					<Button
						style = { {
							border : "2px solid #e6e8ec" ,
							padding : "12px 16px" ,
							height : "40px" ,
							borderRadius : "12px" ,
							display : "flex" ,
							alignItems : "center" ,
							fontWeight : "700" ,
							fontSize : "14px" ,
							lineHeight : "16px" ,
							color : "#23262f" ,
						} }
						onClick = { () => {
							reax_edit_profile.uploadProfileAvatar( () => {
								console.log( 111111111 );
							} );
						} }
					
					>
						<I18n>Upload</I18n>
					</Button>
				</div>
			</div>
			
			<Form>
				<EditSocialItem
					onChange = { ( text ) => {
						reax_edit_profile.setProfileData( {
							input_display_name : text ,
						} );
					} }
					value = { reax_edit_profile.editProfileStore.input_display_name }
					title = { i18n( "Display name" ) }
					placeholder = { i18n( "Enter your display name" ) }
				/>
				
				<EditSocialItem
					onChange = { ( text ) => {
						reax_edit_profile.setProfileData( {
							input_bio : text ,
						} );
					} }
					value = { reax_edit_profile.editProfileStore.input_bio }
					title = { i18n( "Bio" ) }
					placeholder = { i18n( "About yourself in a few words" ) }
				/>
				
				<EditSocialItem
					onChange = { ( text ) => {
						reax_edit_profile.setProfileData( {
							input_portfolio_website : text ,
						} );
					} }
					value = { reax_edit_profile.editProfileStore.input_portfolio_website }
					title = { i18n( "Portfolio or website" ) }
					placeholder = { i18n( "Enter URL" ) }
				/>
				
				{ reax_edit_profile.editProfileStore.social_list.map( ( item ) => {
					const props = {} as any;
					if ( !(
						item.type === "Twitter"
					) ) {
						props.onDelete = () => {
							if ( item.type === 'twitter' ) return;
							reax_edit_profile.deleteSocialItem( item.type );
						};
					}
					return <EditSocialItem
						key = { item.type }
						onChange = { ( text ) => {
							reax_edit_profile.editSocialItem( item.type , text );
						} }
						value = { item.link }
						title = { item.type }
						placeholder = { i18n( "please input" ) }
						{ ...props }
					/>;
				} ) }
				
				<SelectSocialModalBtn
					socialList = { reax_edit_profile.staticSocialList }
					onClick = { () => {
						reax_edit_profile.setSelectSocialVisible( true );
					} }
					onSelect = { ( item ) => {
						reax_edit_profile.addSocialItem( item.type );
					} }
					onModalCancel = { () => {
						reax_edit_profile.setSelectSocialVisible( false );
					} }
					modalVisible = { reax_edit_profile.editProfileStore.selectSocialVisible }
				/>
				<footer className = { less.lastIntro }>
					<I18n>
						To update your settings you should sign message through your wallet. Click 'Update profile' then sign the message
					</I18n>
				
				</footer>
				<div className = { less.divider }></div>
				<XButton
					type = "primary"
					onClick = { () => {
						reax_edit_profile.fetchUpdateUserProfile().
						then( () => {
							if ( __EXPERIMENTAL__ ) {
								antd.message.success( 'update successful' );
							}
						} );
					} }
				>
					<I18n>
						Update
					</I18n>
				</XButton>
			</Form>
		</div>
	</div>;
	
} );
import{XButton}from'@@pages/Test/dxz-button';
