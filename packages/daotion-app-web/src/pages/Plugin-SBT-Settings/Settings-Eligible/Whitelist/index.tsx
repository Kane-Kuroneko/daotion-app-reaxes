export const SettingsWhitelist = reaxper(() => {
	const [ , { spaceID , SBTID } ] = utils.makePair(toolkits.useRouter().params , ({ spaceID , SBTID }) => {
		return {
			spaceID : parseInt(spaceID) ,
			SBTID : parseInt(SBTID) ,
		};
	});
	
	const {
		store__SBT_settings_whitelist ,
		emptyStore,
	} = reaxel__SBT_settings_whitelist();
	
	useEffect(() => {
		return () => emptyStore();
	} , []);
	
	const { Steps } = antd;
	const { Step } = Steps;
	return <div className = { less.subContent }>
		<h1 className = { less.contentTitle }>
			<I18n>Whitelist</I18n>
		</h1>
		{/* <Steps current = { store__SBT_settings_whitelist.step }>
			<Step title = "modify whitelist" />
			<Step title = "execute" />
		</Steps> */}
		<EditWhitelist />
		{/*{ {*/}
		{/*	0 : <EditWhitelist /> ,*/}
		{/*	1 : <ExecuteWhitelist /> ,*/}
		{/*}[store__SBT_settings_whitelist.step] }*/}
	</div>;
});


import { EditWhitelist } from '@@pages/Plugin-SBT-Settings/Settings-Eligible/Whitelist/EditWhitelist';
import { ExecuteWhitelist } from '@@pages/Plugin-SBT-Settings/Settings-Eligible/Whitelist/ExecuteWhitelist';
import { reaxel__SBT_settings_whitelist } from '@@pages/Plugin-SBT-Settings/Settings-Eligible/Whitelist/reaxel--SBT-settings-whitelist';
import less from '@@pages/Plugin-SBT-Settings/index.module.less';
