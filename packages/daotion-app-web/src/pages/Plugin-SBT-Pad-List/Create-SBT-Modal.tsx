import { reaxel_SBT_list } from "@@reaxels";

export const CreateSBTModal = reaxper(() => {
	
	const { Modal } = antd;
	const { navigate } = toolkits.useRouter();
	const { SBT_template } = reaxel__SBT_template();
	const { setFields:setFields__newSBT } = reaxel__create_SBT();
	const { setFields:setFields__SBT_list,SBT_Pad_Store } = reaxel_SBT_list();
	return <>
		<Modal
			open = { SBT_Pad_Store.create_Modal_visible }
			onCancel={() => {
				setFields__SBT_list({ create_Modal_visible : false });
			}}
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
			
			{ SBT_template.map((temp , index) => {
				
				return <React.Fragment key = { temp.template_name }>
					<SBTTemplateItem
						icon = { temp.icon }
						text = { temp.template_name }
						onClick = {() => {
							if(index === 0){
								setFields__newSBT({
									select__SBT_type : null ,
									input__SBT_name : null as string ,
									textarea__description : null as string ,
									select__SBT_eligible : null ,
									input_number__litmit_of_each_address : null as string ,
									/*发行总量-无限开关*/
									switch__issuance_quantity_infinity : false ,
									/*发行总量-数量*/
									input__issuance_quantity_number : '1' ,
									select__network_chainID : null ,
									input_pair__properties : [{
										key : '' ,
										value : '' ,
										react_key : Math.random() ,
									}] ,
								});
							}else {
								/*todo*/
								setFields__newSBT({
									select__SBT_type : temp.SBT_type ,
									input__SBT_name : null as string ,
									textarea__description : null as string ,
									select__SBT_eligible : null ,
									input_number__litmit_of_each_address : temp.limit_of_each_address ,
									/*发行总量-无限开关*/
									switch__issuance_quantity_infinity : false ,
									/*发行总量-数量*/
									input__issuance_quantity_number : '1' ,
									select__network_chainID : null ,
									input_pair__properties : [{
										key : '' ,
										value : '' ,
										react_key : Math.random() ,
									}] ,
								});
							}
							setFields__SBT_list({ create_Modal_visible : false });
							navigate('new');
						}}
					/>
					{ index === 0 && <h5 className = { less.subTitle }>Start from a template</h5> }
				</React.Fragment>;
			}) }
			
			<SBTTemplateItem
				icon = { imgHonor }
				text = "Honorary certificate template"
			/>
			
			<SBTTemplateItem
				icon = { imgBussiness }
				text = "Business cooperation template"
			/>
			
			<SBTTemplateItem
				icon = { imgEvent }
				text = "Event ticket template"
			/>
			
			<SBTTemplateItem
				icon = { imgMember }
				text = "Membership card template"
			/>
		
		</Modal>
	</>;
});


import SBT_template from '@@public/SBT--create-SBT-template.json';
export const reaxel__SBT_template = function(){
	
	const icon_jsx_map:icon_jsx_map = {
		"Blank template" : {
			icon : imgBlank,
		},
		"Title template" : {
			icon : imgTitle,
		},
		"Work certificate template" : {
			icon : imgWork,
		},
	};
	
	return () => {
		
		return {
			get SBT_template(){
				return SBT_template.map((temp) => {
					return {
						...temp,
						...icon_jsx_map[temp.template_name]
					}
				});
			} ,
		};
	};
	type icon_jsx_map = {
		[p:string] : {
			icon : string ,
			
		};
	};
}();




type SBTTemplateItemProps = {
	icon : string;
	text : string;
	onClick? : React.BaseHTMLAttributes<HTMLDivElement>['onClick'];
};
export const SBTTemplateItem = reaxper((props:SBTTemplateItemProps) => {
	return <>
		<div
			onClick={props.onClick}
			className = { less.SBTCreateTemplate }
		>
			<Img src = { props.icon } width = "36px" height = "36px" />
			<span className = { less.SBTTemplateText }>
				{ props.text }
			</span>
			<SVGArrowTip />
		</div>
	</>;
});


import { reaxel__create_SBT } from '@@reaxels/SBT/create-SBT';
import {
	SVGCloseIcon ,
	SVGArrowTip ,
} from '@@SVGcomponents';
import { Img } from '@@Xcomponents';
import imgBlank from '@@public/statics/create-new-SBT-template-icon/blank-template.png';
import imgTitle from '@@public/statics/create-new-SBT-template-icon/title-template.png';
import imgWork from '@@public/statics/create-new-SBT-template-icon/work-template.png';
import imgHonor from '@@public/statics/create-new-SBT-template-icon/honorary-template.png';
import imgBussiness from '@@public/statics/create-new-SBT-template-icon/bussiness-template.png';
import imgEvent from '@@public/statics/create-new-SBT-template-icon/event-template.png';
import imgMember from '@@public/statics/create-new-SBT-template-icon/member-template.png';
import less from './index.module.less';
