import less from './index.module.less';
export const DxzSBTAddWhitelist=()=>{
	return<>
		<div className={less.SBTAddWhitelistContainer}>
			<h1 className={less.mainTitle}>Add Whitelist</h1>
			<p className={less.someIntro}>
				SBT is based on the ERC721 standardized protocol.
			</p>
			<div className={less.SBTAddWhitelistInfo}>
				<CurrentSBTPreview/>
				<EditSBTWhitelist/>
			</div>
		</div>
	</>
}
import {
	XInput ,
} from "@@pages/Test/dxz-input";
import {
	XButton
} from "@@pages/Test/dxz-button";
import {
	Button
} from 'antd';
import {
	SVGAddNewFeature ,
	SVGCopySBT,
	SVGDeleteList
} from '@@SVGcomponents/all-SBT-SVG';

export const SBTWhiteItem=reaxper(()=>{
	return<>
	<div className={less.SBTWhiteItem}>
		<XInput
			type = "primary"
			style = { {
				width : "566px" ,
				marginRight : "32px" ,
			} }
			placeholder = { i18n( 'Make sure to enter the address, not the ENS name.' ) }
		/>
		<XInput
			type = "primary"
			style = { {
				width : "150px" ,
				marginRight : "32px" ,
			} }
			placeholder = { i18n( 'e. g. 1' ) }
		/>
		<SVGDeleteList/>
	</div>
	</>
})
export const CurrentSBTPreview=reaxper(()=>{
	return<>
		<div className={less.currentSBTPreview}>
			<p className={less.SBTPreviewSubtitle}>
				Current SBT
			</p>
			<div className={less.SBTPreviewImg}></div>
			<div className={less.SBTName}>SBT Name</div>
			<div className = { less.SBTAddress }>
				<span>
					0xab51...9260
				</span>
				<SVGCopySBT />
			</div>
		</div></>
})
export const EditSBTWhitelist=reaxper(()=>{
	return<>
		<div className={less.editSBTWhitelist}>
			{/*编辑SBT-white-list分为main和footer两个box*/}
			<div className={less.SBTAddWhitelistMainBox}>
				<p className={less.SBTAddWhitelistSubtitle}>
					Whitelist
				</p>
				<p className={less.someIntro}>
					The current SBT Hold the upper limit of each user is <b style={{color:"black"}}>1</b>.
				</p>
				
				<div className={less.SBTWhitelistColumnNames}>
					<span className={less.columnNameAddress}>Address</span>
					<span className={less.columnNameAmount}>Amount</span>
				</div>
				<SBTWhiteItem/>
				<SBTWhiteItem/>
				<Button className = { less.addNewSBTItemBtn }><SVGAddNewFeature /></Button>
			</div>
			<div className={less.SBTWhitelistFooterBox}>
				<XButton type="primary">Upload Whitelist</XButton>
			</div>
		</div></>
})
