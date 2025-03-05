import { SearchOutlined } from "@ant-design/icons";

export const SearchBar = reaxper(() => {
	const [ , { spaceID , SBTID } ] = utils.makePair(toolkits.useRouter().params , ({ spaceID , SBTID }) => {
		return {
			spaceID : parseInt(spaceID) ,
			SBTID : parseInt(SBTID) ,
		};
	});
	
	const { 
		store_SBT_blacklist ,
		onSearchAddress,
		localExist,
		searchingAddable,
		switchAddressBlacklist,
		
		setFields
	} = reaxel__blacklist();
	
	const { Button } = antd;
	return <>
		<div className = { less.searchBarActived } >
			<XInput
				value = { store_SBT_blacklist.input_search_address }
				onChange = { (e) => {
					onSearchAddress(e.target.value , SBTID , spaceID );
				} }
				allowClear
				maxLength = { 42 }
				type = "primary"
				placeholder = {i18n("Enter address to search or add")}
				prefix={<SearchOutlined
					style={{color: '#B1B5C4'}}
				/>}
				suffix = { searchingAddable ? <Button
					onClick={() => {
						switchAddressBlacklist();
					}}	
					type = "text"
				>
					<I18n>Add to blacklist</I18n>
				</Button> : <></> }
			/>
		</div>
	</>;
});


import { reaxel__blacklist } from './reaxel--blacklist';
import { XInput } from '@@pages/Test/dxz-input';
import { SVGSBTUpload  } from "@@SVGcomponents";
import {
	SVGSBTCheck ,
	SVGSBTClose ,
	SVGSBTCountDown ,
	SVGSBTCountUp ,
	SVGSBTUploading ,
	SVGSBTWarning ,
	SVGSBTChecked
} from "@@SVGcomponents";
import less from '../../index.module.less';

