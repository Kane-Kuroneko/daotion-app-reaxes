

export const Sider_Space_Plugin_List = reaxper(() => {
	
	const {
		navigate ,
		params ,
	} = toolkits.useRouter();
	// console.log( params );
	const paramsSpaceID = parseInt(params.spaceID);
	// const {selecting} = reaxel_plugin_routing_controller(['sbt-pad',]);
	const paramsCategory = params['*'];
	const { store : space_plugin_store , fetchSpacePlugin } = reaxel__space_plugin();
	const { fetchUserRoleInSpace } = reaxel__role_in_space(paramsSpaceID);
	fetchUserRoleInSpace();
	fetchSpacePlugin(() => [ paramsSpaceID ])(paramsSpaceID);
	
	return <>
		<aside className = { less.pluginAsideContainer }>
			<div className = { less.pluginAsideTop }>
				<Img
					className={less.avatarImg}
					src = { space_plugin_store.spaceIconUrl }
					width = { 36 }
					height = { 36 }
					// fallback = { <SVGPluginSpaceIcon /> }
					fallback = { <div
						style = { {
							height : "40px" ,
							borderRadius : "12px" ,
							backgroundColor : "black" ,
							display : "flex" ,
							justifyContent : "center" ,
							alignItems : "center" ,
							width : "40px" ,
						} }
					>
						<span className = { less.theFirstLetter }>
							{ space_plugin_store.spaceName?.slice(0,1).toUpperCase()}
						</span>
					</div> }
				/>
				<Tooltip
					title = { space_plugin_store.spaceName }
					placement = "right">
					<span className = { less.pluginAsideSpaceName }>{ space_plugin_store.spaceName }</span>
				</Tooltip>
				<SVGPluginDropDownIcon />
			</div>
			
			<div className = { less.pluginAsideList }>
				<PluginListItem
					text = "Overview"
					icon = { <SVGPluginOverviewIcon /> }
					navigateTo = { `/space${ paramsSpaceID }/info` }
					selecting = { paramsCategory === "info" && !!params.spaceID }
				/>
				
				{ enum_plugin_list.map(({
					icon ,
					navigateTo ,
					text ,
				}) => {
					return <PluginListItem
						key = { text }
						text = { text }
						icon = { icon }
						navigateTo = { navigateTo }
						selecting = { paramsCategory.includes(navigateTo) }
					/>;
				}) }
				{/*<PluginListItem
					text = "NFT"
					icon = { <SVGPluginNFTIcon /> }
				/>
				<PluginListItem
					text = "SRM"
					icon = { <SVGPluginSRMIcon /> }
				/>
				<PluginListItem
					text = "Voting"
					icon = { <SVGPluginVotingIcon /> }
				/>*/ }
			</div>
			{/*<div className={less.pluginAsideBottom}>
				<Button className = {less.pluginCenterBtn}>
						<I18n>Plugin Center</I18n>
				</Button>
			</div>*/ }
		</aside>
	</>;
});





const SVGPluginSBTPad = () => {
	return <svg
		width = "24"
		height = "24"
		viewBox = "0 0 24 24"
		fill = "none"
		xmlns = "http://www.w3.org/2000/svg"
	>
		<rect
			width = "24"
			height = "24"
			rx = "6"
			fill = "#DCDBFF"
		/>
		<path
			d = "M18.6987 16.3976C17.0884 14.9049 15.6443 14 13.3335 14C11.0227 14 9.5786 14.9049 7.96828 16.3976C7.25293 17.0607 7.14219 18.1396 7.63604 18.9314C7.81393 19.2166 8.15505 19.3333 8.49119 19.3333H18.1758C18.5119 19.3333 18.8531 19.2166 19.031 18.9314C19.5248 18.1396 19.4141 17.0607 18.6987 16.3976Z"
			fill = "#8583FF"
		/>
		<path
			d = "M13.3333 12.0013C11.8606 12.0013 10.6667 10.8074 10.6667 9.33464C10.6667 7.86188 11.8606 6.66797 13.3333 6.66797C14.8061 6.66797 16 7.86188 16 9.33464C16 10.8074 14.8061 12.0013 13.3333 12.0013Z"
			fill = "#8583FF"
		/>
		<rect
			x = "4"
			y = "5"
			width = "7"
			height = "1"
			fill = "#8583FF"
		/>
		<rect
			x = "4"
			y = "8"
			width = "4"
			height = "1"
			fill = "#8583FF"
		/>
	</svg>;
};

const SVGPluginSBTFusion = () => {
	return <svg
		width = "24"
		height = "24"
		viewBox = "0 0 24 24"
		fill = "none"
		xmlns = "http://www.w3.org/2000/svg"
	>
		<g filter = "url(#filter0_b_3701_21531)">
			<rect
				width = "24"
				height = "24"
				rx = "6"
				fill = "#F5F1FF"
			/>
		</g>
		<path
			d = "M12.5001 3.45312C7.5058 3.45312 3.45337 7.50623 3.45337 12.4998C3.45337 17.4941 7.50648 21.5466 12.5001 21.5466C17.4944 21.5466 21.5468 17.4934 21.5468 12.4998C21.5468 7.50555 17.4937 3.45312 12.5001 3.45312ZM8.88194 17.4751C8.28204 17.4751 7.70666 17.237 7.28221 16.8131C6.85776 16.3891 6.61895 15.814 6.61823 15.2141C6.61895 14.6142 6.85776 14.0391 7.28221 13.6152C7.70666 13.1912 8.28204 12.9531 8.88194 12.9531C9.472 12.9676 10.033 13.2121 10.4453 13.6346C10.8575 14.057 11.0882 14.6239 11.0882 15.2141C11.0882 15.8044 10.8575 16.3712 10.4453 16.7937C10.033 17.2161 9.472 17.4607 8.88194 17.4751ZM10.2391 8.8817C10.2391 8.28179 10.4772 7.70642 10.9011 7.28197C11.3251 6.85752 11.9002 6.6187 12.5001 6.61798C13.1 6.6187 13.6751 6.85752 14.099 7.28197C14.523 7.70642 14.7611 8.28179 14.7611 8.8817C14.7466 9.47176 14.5021 10.0328 14.0796 10.445C13.6572 10.8572 13.0903 11.088 12.5001 11.088C11.9098 11.088 11.343 10.8572 10.9205 10.445C10.4981 10.0328 10.2535 9.47176 10.2391 8.8817ZM16.1182 17.4751C15.5282 17.4607 14.9671 17.2161 14.5549 16.7937C14.1427 16.3712 13.9119 15.8044 13.9119 15.2141C13.9119 14.6239 14.1427 14.057 14.5549 13.6346C14.9671 13.2121 15.5282 12.9676 16.1182 12.9531C16.7181 12.9531 17.2935 13.1912 17.718 13.6152C18.1424 14.0391 18.3812 14.6142 18.3819 15.2141C18.3812 15.814 18.1424 16.3891 17.718 16.8131C17.2935 17.237 16.7181 17.4751 16.1182 17.4751Z"
			fill = "#703EFF"
		/>
		<defs>
			<filter
				id = "filter0_b_3701_21531"
				x = "-10"
				y = "-10"
				width = "44"
				height = "44"
				filterUnits = "userSpaceOnUse"
				colorInterpolationFilters = "sRGB"
			>
				<feFlood
					floodOpacity = "0"
					result = "BackgroundImageFix"
				/>
				<feGaussianBlur
					in = "BackgroundImage"
					stdDeviation = "5"
				/>
				<feComposite
					in2 = "SourceAlpha"
					operator = "in"
					result = "effect1_backgroundBlur_3701_21531"
				/>
				<feBlend
					mode = "normal"
					in = "SourceGraphic"
					in2 = "effect1_backgroundBlur_3701_21531"
					result = "shape"
				/>
			</filter>
		</defs>
	</svg>;
};

const enum_plugin_list : Enum_plugin_list_item[] = [
	{
		text : "SBT Pad" ,
		icon : <SVGPluginSBTPad /> ,
		navigateTo : 'sbt-pad' ,
	} ,
	{
		text : "SBT Fusion" ,
		icon : <SVGPluginSBTFusion /> ,
		navigateTo : 'sbt-fusion' ,
	} ,
];

type Enum_plugin_list_item = {
	text : string;
	icon : React.ReactElement;
	navigateTo : string;
};


const { Button } = antd;
const PluginListItem = (props : PluginListItemProps) => {
	const { navigate , params } = toolkits.useRouter();
	
	return <>
		<div
			onClick = { () => navigate(props.navigateTo) }
			className = { props.selecting ? less.pluginAsideItemSelected : less.pluginAsideItem }
		>
			{ props.icon }
			<p>
				{ props.text }
			</p>
		</div>
	</>;
	
};

type PluginListItemProps = {
	icon : React.ReactElement;
	text : string;
	navigateTo? : string;
	selecting : boolean;
};

import { Tooltip } from "antd";
import {
	reaxel__role_in_space ,
	reaxel__space_plugin ,
} from '@@reaxels';
import { Img } from '@@Xcomponents';
import {
	SVGPluginDropDownIcon ,
	SVGPluginOverviewIcon ,
	SVGPluginSpaceIcon ,
} from '@@SVGcomponents/left-plugin-list';
import less from './index.module.less';
