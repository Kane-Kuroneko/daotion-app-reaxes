export const DxzCreateSBTModal = () => {
	const { Modal } = antd;
	return <>
		<Modal
			open = { true }
			className = { less.createSBTModal }
			centered
			maskClosable
			closeIcon = { <SVGCloseIcon /> }
			mask = { true }
			width = "448px"
			footer = { null }
			maskStyle = { {
				background : 'rgba(244, 244, 244, 0.8)' ,
				backdropFilter : "blur(50px)" ,
			} }
		>
			<h1 className = { less.mainTitle }>
				<I18n>Create SBT</I18n>
			</h1>
			<SBTTemplateItem
				icon = { <img
					src = { imgBlack }
					width = "40px"
					height = "40px"
				/> }
				text = "Blank template"
			/>
			
			<h5 className = { less.subTitle }>Start from a template</h5>
			<SBTTemplateItem
				icon = { <img
					src = { imgTitle }
					width = "36px"
					height = "36px"
				/> }
				text = "Title template"
			/>
			
			<SBTTemplateItem
				icon = { <img
					src = { imgWork }
					width = "36px"
					height = "36px"
				/> }
				text = "Work certificate template"
			/>
			
			<SBTTemplateItem
				icon = { <img
					src = { imgHonor }
					width = "36px"
					height = "36px"
				/> }
				text = "Honorary certificate template"
			/>
			
			<SBTTemplateItem
				icon = { <img
					src = { imgBussiness }
					width = "36px"
					height = "36px"
				/> }
				text = "Business cooperation template"
			/>
			
			<SBTTemplateItem
				icon = { <img
					src = { imgEvent }
					width = "36px"
					height = "36px"
				/> }
				text = "Event ticket template"
			/>
			
			<SBTTemplateItem
				icon = { <img
					src = { imgMember }
					width = "36px"
					height = "36px"
				/> }
				text = "Membership card template"
			/>
		
		</Modal>
	</>;
};
import {
	SVGCloseIcon ,
	SVGArrowTip ,
} from '@@SVGcomponents';
import { Img } from '@@Xcomponents';
import imgBlack from '@@public/statics/create-new-SBT-template-icon/blank-template.png';
import imgTitle from '@@public/statics/create-new-SBT-template-icon/title-template.png';
import imgWork from '@@public/statics/create-new-SBT-template-icon/work-template.png';
import imgHonor from '@@public/statics/create-new-SBT-template-icon/honorary-template.png';
import imgBussiness from '@@public/statics/create-new-SBT-template-icon/bussiness-template.png';
import imgEvent from '@@public/statics/create-new-SBT-template-icon/event-template.png';
import imgMember from '@@public/statics/create-new-SBT-template-icon/member-template.png';
import less from './index.module.less';

export const SBTTemplateItem = reaxper((props) => {
	return <>
		<div className = { less.SBTCreateTemplate }>
			{ props.icon }
			<span className = { less.SBTTemplateText }>
				{ props.text }
			</span>
			<SVGArrowTip />
		</div>
	</>;
});

