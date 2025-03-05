import less from './index.module.less';
export const DxzSBTRevocation=()=>{
	return<>
		<div className={less.SBTRevocationContainer}>
			<h1 className={less.mainTitle}>Revocation</h1>
			<p className={less.someIntro}>
				SBT is based on the ERC721 standardized protocol.
			</p>
			<div className={less.SBTRevocationInfo}>
				<CurrentSBTPreview/>
				<EditSBTRevocationlist/>
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

export const SBTRevocationItem=reaxper(()=>{
	return<>
		<div className={less.SBTRevocationItem}>
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
export const EditSBTRevocationlist=reaxper(()=>{
	return<>
		<div className={less.editSBTRevocationlist}>
			{/*编辑SBT-revocation-list分为main和footer两个box*/}
			<div className={less.SBTRevocationlistMainBox}>
				<p className={less.SBTRevocationlistSubtitle}>
					Revocation list
				</p>
				<p className={less.someIntro}>
					The current SBT Hold the upper limit of each user is <b style={{color:"black"}}>2</b>.
				</p>
				
				<div className={less.SBTRevocationlistColumnNames}>
					<span className={less.columnNameAddress}>Number of specified SBTs</span>
					<span className={less.columnNameAmount}>Amount</span>
				</div>
				<SBTRevocationItem/>
				<SBTRevocationItem/>
				<Button className = { less.addNewSBTItemBtn }><SVGAddNewFeature /></Button>
			</div>
			<div className={less.SBTRevocationlistFooterBox}>
				<XButton type="primary">Revocation SBT</XButton>
				<p className={less.SBTRevocationFooterMention}>
					You are <b>Revocation SBT </b>,
					Please ensure these values are correct before proceeding.
				</p>
			</div>
		</div></>
})
