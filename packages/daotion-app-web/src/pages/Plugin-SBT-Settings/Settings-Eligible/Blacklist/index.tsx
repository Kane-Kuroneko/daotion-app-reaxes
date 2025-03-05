export const SBTBlacklist = reaxper(() => {
	const [ , { spaceID , SBTID } ] = utils.makePair(toolkits.useRouter().params , ({ spaceID , SBTID }) => {
		return {
			spaceID : parseInt(spaceID) ,
			SBTID : parseInt(SBTID) ,
		};
	});
	const {
		reset,
		closuredFetchBlacklist,
		store_SBT_blacklist,
	} = reaxel__blacklist();
	
	Reaxes.collectDeps(store_SBT_blacklist);
	
	closuredFetchBlacklist(() => [ spaceID , SBTID ])(spaceID , SBTID);
	
	useEffect(() => {
		return () => reset();
	} , []);
	
	return <div className = { less.subContent }>
		<h1 className = { less.contentTitle }>
			<I18n>Blacklist</I18n>
		</h1>
		<TableSBTBlacklist/>
	</div>;
});


import { reaxel__blacklist } from './reaxel--blacklist';
import {TableSBTBlacklist} from './Table-SBT-Blacklist';
import less from '@@pages/Plugin-SBT-Settings/index.module.less';
