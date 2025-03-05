export const DxzSBTSettings = () => {
	return <>
		<div className = { less.SBTSettingsContainer }>
			<h1 className = { less.mainTitle }>Settings</h1>
			<p className = { less.someIntro }>
				SBT is based on the ERC721 standardized protocol.
			</p>
			<div className = { less.SBTSettingsInfo }>
				<CurrentSBTPreview />
				<EditSBTSettings />
			</div>
		
		</div>
	</>;
};

import less from './index.module.less';
import { XTextArea  } from "@@pages/Test/dxz-input";
import {
	SingleSelect ,
	TagsSelect ,
} from '@@pages/Test/dxz-select';
import { XButton  } from "@@pages/Test/dxz-button";
import { Button  } from 'antd';
import {
	SVGAddNewFeature ,
	SVGCopySBT ,
} from '@@SVGcomponents/all-SBT-SVG';
import { UploadFileBox  } from '@@pages/Plugin-SBT-Pad--New/Upload-Box';

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
export const CurrentSBTPreview = reaxper(() => {
	return <>
		<div className = { less.currentSBTPreview }>
			<p className = { less.SBTPreviewSubtitle }>
				Current SBT
			</p>
			<div className = { less.SBTPreviewImg }></div>
			<div className = { less.SBTName }>SBT Name</div>
			<div className = { less.SBTAddress }>
				<span>
					0xab51...9260
				</span>
				<SVGCopySBT />
			</div>
		</div>
	</>;
});
export const EditSBTSettings = () => {
	return <>
		<div className = { less.editSBTSettings }>
			<div className = { less.SBTSettingsMainBox }>
				<p className = { less.SBTSettingsSubtitle }>
					Settings
				</p>
				<SubTitleWithItem title = "Upload files">
					<UploadFileBox />
				</SubTitleWithItem>
				<SubTitleWithItem title = "Type">
					<SingleSelect type = "primary" />
				</SubTitleWithItem>
				<SubTitleWithItem title = "Description">
					<XTextArea type = "primary" />
				</SubTitleWithItem>
				<SubTitleWithItem title = "Features">
					<TagsSelect placeholder = { i18n('Add Features...') } />
					<Button className = { less.addNewSBTFeatureBtn }><SVGAddNewFeature /></Button>
				</SubTitleWithItem>
			</div>
			<div className = { less.SBTSettingsFooterBox }>
				<XButton type = "primary">Save settings</XButton>
			</div>
		</div>
	</>;
};

