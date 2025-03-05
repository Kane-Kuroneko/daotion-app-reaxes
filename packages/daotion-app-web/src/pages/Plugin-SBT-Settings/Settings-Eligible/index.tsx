export const Eligible = reaxper(class extends Reaxlass {
	
	render(){
		const [ , { spaceID , SBTID } ] = utils.makePair(toolkits.useRouter().params , ({ spaceID , SBTID }) => {
			return {
				spaceID : parseInt(spaceID) ,
				SBTID : parseInt(SBTID) ,
			};
		});
		
		const [currentList , setList] = useState("Whitelist");
		
		const { Segmented } = antd;
		
		return <>
			<Segmented
				value = {currentList}
				onChange = {(value:string) => {
					setList(value);
				}}
				options = { [ 'Whitelist' , 'Blacklist' , 'Revocationlist' ] }
			/>
			{{
				"Whitelist" : <SettingsWhitelist />,
				"Blacklist" : <SBTBlacklist />,
				"Revocationlist" : <Revocation />,
			}[currentList]}
		</>;
	}
});


import { SettingsWhitelist } from '@@pages/Plugin-SBT-Settings/Settings-Eligible/Whitelist';
import { SBTBlacklist } from '@@pages/Plugin-SBT-Settings/Settings-Eligible/Blacklist';
import { Revocation } from '@@pages/Plugin-SBT-Settings/Settings-Eligible/Revocation';
