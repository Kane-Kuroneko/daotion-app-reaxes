export const SocialProfile = reaxper( () => {
	const { params } = toolkits.useRouter();
	const reax_edit_space_social_settings = reaxel_edit_space_social_settings();
	return <>
		<div
			style = { {
				width : "100%" ,
				marginLeft : "32px" ,
				display : "flex" ,
				flexFlow : "column nowrap" ,
			} }
		>
			<ProfileTitle>
				<I18n>
					Social Profiles
				</I18n>
			</ProfileTitle>
			<div
				style = { {
					minHeight : "250px" ,
				} }
			>
				
				{ reax_edit_space_social_settings.store.socialList.map( ( item ) => {
					const props = {} as any;
					if(!["Homepage","Twitter","Discord","GitHub"].includes(item.type)){
						props.onDelete = () => {
							reax_edit_space_social_settings.deleteSocialItem( item.type );
						} 
					}
					return <EditSocialItem
						title = { item.type }
						value = { item.link }
						onChange = { ( text ) => {
							reax_edit_space_social_settings.editSocialItem( item.key , text );
						} }
						key = { item.type }
						{...props}
					/>;
				} ) }
			</div>
			<SelectSocialModalBtn
				socialList = { reax_edit_space_social_settings.staticSocialList }
				onClick = { () => {
					reax_edit_space_social_settings.setSelectModalVisible( true );
				} }
				onSelect = { ( item ) => {
					reax_edit_space_social_settings.addSocialItem( item.type );
				} }
				onModalCancel = { () => {
					reax_edit_space_social_settings.setSelectModalVisible( false );
				} }
				modalVisible = { reax_edit_space_social_settings.store.selectModalVisible }
			/>
			<div className = { less.divider }></div>
			<ProfileFooterBtn
				text = { i18n( "Update Social Profiles" ) }
			/>
		</div>
	</>;
} );


const EditSocialItem = reaxper( ( props : EditSocialItemProps ) => {
	const mixedProps = Object.assign<Partial<EditSocialItemProps> , EditSocialItemProps>( {
		placeholder : "Please enter" ,
	} , { ...props } );
	return <>
		<div
			style = { {
				display : "flex" ,
				flexFlow : "column nowrap" ,
			} }
		>
			<div className = { less.titleWithDelete }>
				<span
					className = { less.subTitle }
				>{ mixedProps.title }</span>
				{ props.onDelete && <SVGSocialItemDelete
					onClick = { () => props.onDelete() }
				/> }
			</div>
			<XInput
				type = "primary"
				value = { mixedProps.value }
				onChange = { ( e ) => {
					mixedProps.onChange( e.target.value );
				} }
				placeholder = { mixedProps.placeholder }
			/>
		</div>
	</>;
} );
type EditSocialItemProps = {
	title : React.ReactNode;
	value : string;
	onChange : ( text : string ) => void;
	onDelete : () => void;
	placeholder? : string;
};

export const ProfileFooterBtn = reaxper( ( props ) => {
	
	const reax_edit_space_social_settings = reaxel_edit_space_social_settings();
	return <>
		<XButton
			onClick = { () => {
				reax_edit_space_social_settings.fetchEditSocial();
			} }
			className={less.socialUploadBtn}
		>{ props.text }</XButton>
	</>;
} );

import { reaxel_edit_space_social_settings } from '@@reaxels';
import less from './index.module.less';
import { XButton  } from '@@pages/Test/dxz-button';
import { SelectSocialModalBtn } from '@@pages/--Components--/Select-Social-Btn-Modal';
import { ProfileTitle } from './Profile-Title';
import { XInput } from '@@pages/Test/dxz-input';
import{SVGSocialItemDelete}from '@@SVGcomponents/space-setting-svg'
