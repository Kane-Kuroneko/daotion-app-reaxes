export const SpaceSettings = reaxper( class extends Reaxlass {
	
	state = {
		tab : "General" as 'Social' | 'General',
	};
	
	render() {
		const spaceID = parseInt( toolkits.useRouter().params.spaceID );
		const {} = antd;
		const Content = {
			Social : SocialProfile ,
			General : GeneralProfile ,
		}[ this.state.tab ];
		const { closuredFetchSpaceInfo , editingStore } = reaxel_edit_space_general_settings();
		const { match } = reaxel__space_plugin();
		const { role } = reaxel__role_in_space(spaceID);
		
		closuredFetchSpaceInfo(spaceID);
		console.log(role);
		
		if(match(() => role === 1)){
			const {Result} = antd;
			return <Result
				status = "404"
				title = "404"
				subTitle = "Sorry, the page you visited does not exist."
			/>;
		}
		
		return <>
			<div
				className = { less.container }
			>
				<SpaceSettingTabs
					tab = { this.state.tab }
					setTab = { (tab) => this.setState({tab}) }
				/>
				<Content />
			</div>
		</>;
	}
} );




const SpaceSettingTabs = reaxper( ( props : SpaceSettingTabsProps ) => {
	return <>
		<div
			style = { {
				width : "280px" ,
				height : "fit-content" ,
				display : "flex" ,
				flexFlow : "column nowrap" ,
			} }
		>
			<span
				className = { less.settingsTitle }
			>
				<I18n>
					Space Settings
				</I18n>
			</span>
			<ul
				style = { {
					display : "flex" ,
					flexFlow : "column nowrap" ,
					padding : "0 0 0 0" ,
					userSelect : 'none' ,
				} }
			>
				{ (
					[
						'General' ,
						'Social' ,
					] as const
				).map( ( tab ) => <SpaceSettingTabPane
					key = { tab }
					selected = { props.tab === tab }
					onClick = { () => props.setTab( tab ) }
				>{
					tab
				}</SpaceSettingTabPane> ) }
			</ul>
		</div>
	</>;
} );


const SpaceSettingTabPane = ( props : React.PropsWithChildren<{ selected? : boolean; onClick : () => any }> ) => {
	return <span
		className = { props.selected ? less.settingTabSelected : less.settingTab }
		onClick = { () => props.onClick() }
	>
		<I18n>
			{ props.children }
		</I18n>
	
	</span>;
};



type SpaceSettingTabsProps = {
	tab : 'Social' | 'General',
	setTab : ( tab : 'Social' | 'General' ) => void;
};

import {
	reaxel__space_plugin ,
	reaxel_edit_space_general_settings ,
	reaxel__role_in_space,
} from '@@reaxels';
import {
	GeneralProfile ,
	SocialProfile ,
} from '@@pages/--Components--/Space-Settings';
import less from './index.module.less';
