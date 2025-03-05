
export const SearchBar = reaxper(() => {
	const [ , { spaceID , SBTID } ] = utils.makePair(toolkits.useRouter().params , ({ spaceID , SBTID }) => {
		return {
			spaceID : parseInt(spaceID) ,
			SBTID : parseInt(SBTID) ,
		};
	});
	const {
		store__SBT_settings_whitelist,
		setFields ,
		address_insertable ,
		search_add_address_btn ,
		search_whitelist_onChange,
		uploadStatus,
		onClickUpload, 
	} = reaxel__SBT_settings_whitelist();
	
	
	const { Button } = antd;
	return <>
		<div className = { less.searchBarActived }>
			<XInput
				value = { store__SBT_settings_whitelist.input_search_address }
				onChange = { (e) => {
					search_whitelist_onChange(e.target.value , spaceID , SBTID);
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
						search_add_address_btn();
					}}	
					type = "text"
				>
					<I18n>Add to Whitelist</I18n>
				</Button> : <></> }
			/>
			<div className={less.btns}>
				<Button
					type = "primary"
					ghost
					icon = { <DownloadOutlined /> }
					style={{marginRight: '12px' }}
					
				>
					<a
						download={'AddressSample.csv'}
						href="../../../../../public/statics/AddressSample.csv"
						style={{color: '#0070f3'}}
					>
						<I18n>Template file</I18n>
						
					</a>
				</Button>
				<Button
					onClick={() => {
						onClickUpload(spaceID,SBTID);
					}}
					type = "primary"
					ghost
					icon = { <SVGSBTUpload /> }
				>
					<I18n>Upload CSV</I18n>
				</Button>

			</div>
		</div>
		{ uploadStatus.status && <UploadStatus /> }
	</>;
});



export const UploadStatus = reaxper(() => {
	
	const {setFields,setUpload,uploadStatus} = reaxel__SBT_settings_whitelist();
	
	const { Button } = antd;
	return <>
		<div className = { less.processAlert }>
			<div className = { less.alertLeft }>
				{ {
					succeed : <SVGSBTCheck /> ,
					failed : <SVGSBTWarning /> ,
					uploading : <div className = { less.rotating }>
						<SVGSBTUploading />
					</div> ,
				}[uploadStatus.status] }
				
				<span className = { less.alertTitle }>
					{ uploadStatus.filename }
				</span>
			</div>
			<div className = { less.alertRight }>
				{
					{
						succeed : <></> ,
						failed : <>
							<span className = { less.alertInfo }>
								<I18n>Some addresses or amount are invalid</I18n>
							</span>
							<Button
								onClick = { () => {
									uploadStatus.status === "failed" && antd.Modal.error({
										title : uploadStatus.errorMsg ,
										content : <>
										
										</> ,
										maskClosable : true ,
										
									});
								} }
								type = "text"
							>
								<I18n>View details</I18n>
							</Button>
						</> ,
						uploading : <span className = { less.uploading }>
							<I18n>Uploading...</I18n>
						</span> ,
					}[uploadStatus.status]
				}
				<button
					onClick = { () => {
						setUpload({
							status : null ,
						});
					} }
					className = { less.alertClose }
				>
					<SVGSBTClose />
				</button>
			</div>
		</div>
	</>;
});

import { XInput } from '@@pages/Test/mozi-xinput';
import { reaxel__SBT_settings_whitelist } from '@@pages/Plugin-SBT-Settings/Settings-Eligible/Whitelist/reaxel--SBT-settings-whitelist';
import { SVGSBTUpload  } from "@@SVGcomponents";
import { DownloadOutlined, SearchOutlined } from '@ant-design/icons'
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

