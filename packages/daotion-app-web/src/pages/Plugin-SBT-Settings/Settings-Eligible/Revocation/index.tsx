export const Revocation = reaxper(() => {
	const [ , { spaceID , SBTID } ] = utils.makePair(toolkits.useRouter().params , ({ spaceID , SBTID }) => {
		return {
			spaceID : parseInt(spaceID) ,
			SBTID : parseInt(SBTID) ,
		};
	});
	
	const {
		reset,
		fetch_revocation_list,
	} = reaxel__SBT_revocation();
	
	fetch_revocation_list(() => [spaceID,SBTID])(spaceID,SBTID);
	
	useEffect(() => {
		return () => reset();
	} , []);
	
	return <div className = { less.subContent }>
		<h1 className = { less.contentTitle }>
			<I18n>Revocation</I18n>
		</h1>
		<RevocationList/>
	</div>;
});

import { reaxel__SBT_revocation } from '@@pages/Plugin-SBT-Settings/Settings-Eligible/Revocation/reaxel--SBT-revocation';
import { RevocationList } from '@@pages/Plugin-SBT-Settings/Settings-Eligible/Revocation/RevocationList';
import less from '@@pages/Plugin-SBT-Settings/index.module.less';
