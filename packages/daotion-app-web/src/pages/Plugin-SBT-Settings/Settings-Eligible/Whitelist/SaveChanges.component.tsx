import less from "@@pages/Plugin-SBT-Settings/index.module.less";
import clipboard from 'copy-to-clipboard';
export const SaveChangesGroup = reaxper(() => {
	
	const { 
		reset_changes , 
		effectiveChanges ,
		store__SBT_settings_whitelist ,
		saveWhitelist,
		showModal,
	} = reaxel__SBT_settings_whitelist();
	
	const [ , { spaceID , SBTID } ] = utils.makePair(toolkits.useRouter().params , ({ spaceID , SBTID }) => {
		return {
			spaceID : parseInt(spaceID) ,
			SBTID : parseInt(SBTID) ,
		};
	});
	
	
	
	const {Space, Modal} = antd;
	return <>
		<div className = { less.bottomAction }>
			{store__SBT_settings_whitelist.rootHash &&
				<div
					className = { less.rootHash }
					onClick={() => {
						clipboard(store__SBT_settings_whitelist.rootHash);
						message.success('copied successfully');
					}}
				>
					<span>RootHash: </span>
					<span className = { less.address }>{ store__SBT_settings_whitelist.rootHash }</span>
					<SVGCopySBT />
				</div>
			}
			<Space>
				<XButton
					onClick={ () => {
						saveWhitelist(SBTID , spaceID);
					} }
					disabled={!effectiveChanges}
					type="primary"
					loading={store__SBT_settings_whitelist.pending}
					style={{
						width:'160px',
						height: '48px'
					}}
				>
					<I18n>Confirm</I18n>
				</XButton>
				{effectiveChanges && <XButton
					onClick = { () => {showModal(true);} }
					type = { 'secondary' }
					style = { {
						width : '160px' ,
						height : '48px' ,
						border : 'none' ,
						
					} }
				>
					<I18n>Reset all</I18n>
				</XButton> }
				
			</Space>
			<Modal
				title={'Reset All'}
				footer={null}
				open={store__SBT_settings_whitelist.isShowModal}
				style={{
					boxSizing : 'border-box',
					padding : '32px',
					
				}}
			>
				<p>
					This will reset all Whitelist changes, All data or address will be deleted
				</p>
				<Space direction="vertical" style={{width: '100%'}}>
					<XButton
						type={'secondary'}
						style={{
							width: '100%',
							height: '48px'
						}}
						danger
						 onClick={() => {
							
							 reset_changes()
						 }}
					>
						Reset All
					</XButton>
					<XButton
						type={'secondary'}
						style={{
							width: '100%',
							height: '48px'
						}}
						onClick={() => {showModal(false)}}
					>
						Cancel
					</XButton>
				</Space>
			</Modal>
		</div>
	</>;
});

import { reaxel__SBT_settings_whitelist } from '@@pages/Plugin-SBT-Settings/Settings-Eligible/Whitelist/reaxel--SBT-settings-whitelist';
import { XButton } from '@@pages/Test/mozi-xbutton';
import { SVGCopySBT } from "@@SVGcomponents";
import { message } from "antd";
