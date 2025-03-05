import { Space } from "antd";

export const SBTSettingsMetaData = reaxper(() => {
	
	const { spaceID , SBTID } = toolkits.useSpaceSBTID();
	const {
		fetchSBTInfo,
		resetDeps,
	} = reaxel__SBT_settings_Metadata();
	
	fetchSBTInfo(spaceID , SBTID);
	
	useEffect(() => () => resetDeps() , []);
	
	return <div className = { less.metaContainer }>
		<h2 className = { less.metaTitle }><I18n>Metadata</I18n></h2>
		<div className = { less.metaContent }>
			<MetaDataLeft />
			<MetaDataRight />
		</div>
	</div>;
})



export const MetaDataLeft = reaxper(() => {
	const {spaceID,SBTID} = toolkits.useSpaceSBTID();
	const {
		store_SBT_settings_metadata ,
		setFields,
		fetchUpdateSBTSettings,
		resetAll ,
		didNotChange,
		cropperModalShow
	} = reaxel__SBT_settings_Metadata();
	const {  Space } = antd;
	return <>
		<div className = { less.metaLeft }>
			<SubTitleWithItem
				title = { i18n("SBT Image") }
				icon = { <SVGSubtract /> }
			>
				<UploaderDDF />
				<CropperPic />
			</SubTitleWithItem>
			<SubTitleWithItem title = { i18n("Description") }>
				<XTextArea
					value = { store_SBT_settings_metadata.textarea_SBT_description }
					onChange = { (e) => {
						setFields({ textarea_SBT_description : e.target.value });
					} }
				/>
			</SubTitleWithItem>
			<SubTitleWithItem
				title = { i18n("Properties") }
				icon = { <SVGSubtract /> }
			>
				<Properties />
			</SubTitleWithItem>
			<Space
				style = { {
					paddingTop : '24px' ,
					boxSizing : 'border-box' ,
					borderTop : '1px solid #E6E8EC' ,
				} }
			>
				<XButton
					style = { {
						width : '160px' ,
						height : '48px' ,
					} }
					disabled = { didNotChange }
					onClick = { () => {
						fetchUpdateSBTSettings(spaceID , SBTID);
					} }
				>
					Save
				</XButton>
				<XButton
					style = { {
						width : '160px' ,
						height : '48px' ,
						border : 'none' ,
						
					} }
					onClick = { () => {
						resetAll();
					} }
				>
					Reset All
				</XButton>
			</Space>
		</div>
	</>;
});

export const MetaDataRight = reaxper((props) => {
	const { SBT_info } = reaxel__SBT_info() || {};
	const { reax_DDF } = reaxel__SBT_settings_Metadata()
	const { imgPreviewUrl } = reax_DDF
	return <>
		<div className = { less.metaRight }>
			<p className = { less.previewTitle }>
				<I18n>Preview</I18n>
			</p>
			{
				SBT_info &&
				<div className = { less.previewContent }>
					<Img
						className = { less.previewImg }
						src = { imgPreviewUrl }
					/>
					<div className = { less.previewUserInfo }>
						<div className = { less.SBTName }><I18n>{ SBT_info.name }</I18n></div>
						<div className = { less.SBTAddress }>
							<span>
								{ SBT_info['contractAddress'].length > 10
									? <>
										<span>{SBT_info['contractAddress'].slice(0, 6)}</span>
										<span>...</span>
										<span>{SBT_info['contractAddress'].slice(-4)}</span>
									
									</>
									: SBT_info['contractAddress']
								}
							</span>
							<SVGCopySBT />
						</div>
					</div>
				</div>
				
			}
		</div>
	</>;
});


export const SubTitleWithItem = (props) => {
	return <>
		<div className = { less.subTitleWithItem }>
			<span className = { less.subTitle }>
				{ props.title }
				{ props.icon }
			</span>
			{ props.children }
		</div>
	</>;
};

const UploaderDDF = reaxper(() => {
	const { reax_DDF } = reaxel__SBT_settings_Metadata();
	return <UploadFileBox
		reaxel_DDF = { () => reax_DDF }
	/>;
});

const CropperPic = reaxper (() => {
	const { closeCropperModal, cropperModalShow, reax_DDF, reaxel_Cropper } = reaxel__SBT_settings_Metadata();
	
	return <CropperPicBox
		reaxel_Cropper = {reaxel_Cropper}
		imgPreviewUrl = {reax_DDF.imgPreviewUrl}
		cropperModalShow = {cropperModalShow}
		onCrop={(blob) => {
			reax_DDF.setFile(blob)
			closeCropperModal()
		}}
	/>
})

export const Properties = reaxper(() => {
	
	const {
		setFields ,
		store_SBT_settings_metadata ,
		setProperties,
	} = reaxel__SBT_settings_Metadata();
	const propertiesLength = store_SBT_settings_metadata.properties.length;
	const { Button } = antd;
	return <>
		{ store_SBT_settings_metadata.properties.map((item) => {
			return <div
				key = { item.id }
				className = { less.propertyInput }
			>
				<XInput
					value = { item.key }
					onChange = { (e) => {
						setProperties.set(item.id , e.target.value , null);
					} }
					placeholder = { i18n("Enter Subject...") }
				/>
				<XInput
					value = { item.value }
					onChange = { (e) => {
						setProperties.set(item.id , null , e.target.value);
					} }
					placeholder = { i18n("Enter Content...") }
				/>
				<Button
					onClick = { () => {
						setProperties.remove(item.id);
					} }
					className = { less.propertyInputDeleteBtn }
				>
					<SVGCloseIcon />
				</Button>
			</div>;
		}) }
		<Button
			onClick = { () => {
				setProperties.add();
			} }
			className = { less.addNewSBTFeatureBtn }
		>
			<SVGSBTAdd />
		</Button>
	</>;
});

import { reaxel__SBT_settings_Metadata } from './reaxel--SBT-settings-MetaData';
import { reaxel__SBT_info } from '@@reaxels'
import { UploadFileBox, CropperPicBox } from '@@Xcomponents';
import { XInput  } from "@@pages/Test/mozi-xinput";
import { XTextArea } from "@@pages/Test/mozi-xtextarea"
import { XButton } from "@@pages/Test/mozi-xbutton"
import {
	SVGCopySBT ,
	SVGSBTAdd ,
	SVGSubtract ,
} from "@@SVGcomponents";

import { SVGCloseIcon } from '@@SVGcomponents/SVG-close-icon';
import { Img } from "@@Xcomponents";
import less from '@@pages/Plugin-SBT-Settings/index.module.less';
