import { SearchOutlined } from "@ant-design/icons";

export const SearchBar = reaxper(() => {
	const [ , { spaceID , SBTID } ] = utils.makePair(toolkits.useRouter().params , ({ spaceID , SBTID }) => {
		return {
			spaceID : parseInt(spaceID) ,
			SBTID : parseInt(SBTID) ,
		};
	});
	const {
		address_insertable,
		store_SBT_revocation,
		insertToRevocationList,
		onSearchSBTUserInfo,
	} = reaxel__SBT_revocation();
	
	
	const { Button } = antd;
	return <>
		<div className = { less.searchBarActived } >
			<XInput
				value = { store_SBT_revocation.input_search_address }
				onChange = { (e) => {
					onSearchSBTUserInfo(e.target.value , spaceID , SBTID );
				} }
				allowClear
				maxLength = { 42 }
				type = "primary"
				placeholder = {i18n("Enter address to search or add")}
				prefix={<SearchOutlined
					style={{color: '#B1B5C4'}}
				/>}
				suffix = { address_insertable ? <Button
					onClick={() => {
						insertToRevocationList();
					}}	
					type = "text"
				>
					<I18n>Add to Revocation List</I18n>
				</Button> : <></> }
			/>
		</div>
	</>;
});


import { XInput } from '@@pages/Test/dxz-input';
import { reaxel__SBT_revocation } from '@@pages/Plugin-SBT-Settings/Settings-Eligible/Revocation/reaxel--SBT-revocation';
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

