import { message } from "antd";

export const PluginSBTSettings = reaxper(class extends Reaxlass {
	
	
	render(){
		const spaceID = parseInt(toolkits.useRouter().params.spaceID);
		
		const { match , store } = reaxel__space_plugin();
		const {role} = reaxel__role_in_space(spaceID);
		
		const { Tabs , Table , Segmented , Button } = antd;
		const { TabPane } = Tabs;
		
		if((!role || role === 1) || !match(({ plugin_spaceID }) => {
			return spaceID === plugin_spaceID;
		})){
			return <antd.Result status="404" />
		};
		
		return <div className = { less.detailContainer }>
			<UserInfo />
			<div className = { less.content }>
				<div className = { less.navTab }>
					<Tabs
						defaultActiveKey = "Eligible"
					>
						<TabPane
							tab = {i18n("Eligible")}
							key = "Eligible"
						>
							<Eligible />
						</TabPane>
						<TabPane
							tab = {i18n("Metadata")}
							key = "Metadata"
						>
							<SBTSettingsMetaData />
						</TabPane>
					</Tabs>
				</div>
			</div>
		</div>;
	}
});


export const UserInfo = reaxper((props) => {
	const { SBT_info } = reaxel__SBT_info() || {};
	return <>
		{ SBT_info &&
			<div className = { less.userInfo }>
				<button className = { less.backBtn }><SVGSBTBack /></button>
				<Img
					className = { less.userAvatar }
					src={SBT_info.iconUrl || ''}
				/>
				
					<div className = { less.info }>
						<h2><I18n>{ SBT_info.name || '' }</I18n></h2>
						<div
							className = { less.userAddress }
							onClick = { () => {
								clipboard(SBT_info["contractAddress"]);
								message.success('copied successfully');
							} }
						>
							<span className = { less.address }>
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
	
	</>;
});



const UploaderDDF = reaxper(() => {
	
	
})


import { reaxel__SBT_settings_whitelist } from './Settings-Eligible/Whitelist/reaxel--SBT-settings-whitelist';
import {
	reaxel__space_plugin ,
	reaxel__role_in_space ,
	reaxel__SBT_info ,
} from '@@reaxels';
import { Eligible } from './Settings-Eligible';
import { SBTSettingsMetaData } from './Meta-Data';
import {
	SVGCopySBT ,
	SVGSBTAdd ,
	SVGSBTBack ,
	SVGSubtract ,
} from "@@SVGcomponents";
import {
	Img ,
} from "@@Xcomponents";
import clipboard from "copy-to-clipboard";
import less from './index.module.less';


