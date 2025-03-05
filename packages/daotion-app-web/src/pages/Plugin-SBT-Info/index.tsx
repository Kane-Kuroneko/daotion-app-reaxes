import clipboard from "copy-to-clipboard";

export const PluginSBTInfo = reaxper(() => {
	
	const [ , { spaceID , SBTID } ] = utils.makePair(toolkits.useRouter().params , ({ spaceID , SBTID }) => {
		return {
			spaceID : parseInt(spaceID) ,
			SBTID : parseInt(SBTID) ,
		};
	});
	
	const {
		SBT_info ,
		pending ,
		setFields ,
		closuredFetchSBTInfo ,
	} = reaxel__SBT_info();
	const { match } = reaxel__space_plugin();
	const { setIDSBTspace ,clearIDSBTspace} = reaxel__SpaceIDSBTIDServ();
	const { user_SBT_access } = reaxel__SBT_user_claim_access();
	
	setIDSBTspace({ SBTID , spaceID  });
	closuredFetchSBTInfo(  spaceID,SBTID );
	
	
	useEffect(() => {
		return () => clearIDSBTspace();
	} , []);
	
	if( !SBT_info ) return null;
	
	if( !match(({ plugin_spaceID }) => plugin_spaceID === SBT_info.spaceID) ) {
		const { Result } = antd;
		return <Result
			status = "404"
			title = "404"
			subTitle = "Sorry, the page you visited does not exist."
		/>;
	}
	
	const { Table  } = antd;
	return <>
		<div className = { less.SBTDetailsContainer }>
			{/*SBT详情页信息分主要信息部分以及下方Activity列表,主要信息又分为左右两栏 : */ }
			<div className = { less.SBTDetailsMainfield }>
				<div className = { less.SBTDetailsLeft }>
					<Img
						className = { less.SBTImg }
						src = {SBT_info.iconUrl}
					/>
					<SBTInfoBox title = { i18n("Details") }>
						<SBTDetailList />
					</SBTInfoBox>
					<SBTInfoBox title = { i18n("Destruction of rules") }>
						<div className = { less.desc }>
							<SVGSBTChecked />
							<span><I18n>Destruction by issuer</I18n></span>
						</div>
						<div className = { less.desc }>
							<SVGSBTChecked />
							<span><I18n>Burned by Holder</I18n></span>
						</div>
					</SBTInfoBox>
				</div>
				<div className = { less.SBTDetailsRight }>
					<div className = { less.SBTCertificateTop }>
						<span className = { less.certificateTag }>
							<I18n>{ SBT_info.type }</I18n>
						</span>
						{/*<ShareBtn />*/ }
						<div className = { less.shareBtn }><ShareBtn /></div>
					</div>
					<p className = { less.SBTName }>
						<I18n>{ SBT_info.name }</I18n>
					</p>
					
					<p className = { less.someIntro }>
						<I18n>
							{ SBT_info.desc }
						</I18n>
					</p>
					
					<SBTAddressInfo />
					<SBTInfoBox>
						{/*SBT-claim条件包括符合(conforming) & 不符合(nonconforming) 两种*/ }
						<h3 className = { less.conditionTitle }>
							<I18n>Limit of Each Address：1 SBT</I18n>
						</h3>
						<div className = { less.firstCondition }>
							{/*<span className={less.conditionSubtitle}><I18n>Meet all the following conditions：get 1 SBT</I18n></span>*/ }
							<div className = { less.conditionContent }>
								<SVGNonconformingCondition />
								<span>
									<I18n>3 <Img
										src = "https://www.popsci.com/uploads/2020/01/07/WMD5M52LJFBEBIHNEEABHVB6LA.jpg?auto=webp&width=1440&height=864"
										className = { less.sbtCover }
									/> mfer</I18n>
								</span>
							</div>
							<div className = { less.conditionContent }>
								<SVGNonconformingCondition />
								<span>
									<I18n>3 <Img
										src = "https://www.popsci.com/uploads/2020/01/07/WMD5M52LJFBEBIHNEEABHVB6LA.jpg?auto=webp&width=1440&height=864"
										className = { less.sbtCover }
									/> SBTname</I18n>
								</span>
							</div>
							<div className = { less.conditionContent }>
								<SVGNonconformingCondition />
								<span>
									<I18n>Quest</I18n>
								</span>
							</div>
						</div>
						<Divider />
						<div className = { less.secondCondition }>
							{/*<span className={less.conditionSubtitle}><I18n>Meet any the following conditions：get 1 SBT</I18n></span>*/ }
							<div className = { less.conditionContent }>
								<SVGConformingCondition />
								<span>
									<I18n>Whitelist</I18n>
								</span>
							</div>
							<div className = { less.conditionContent }>
								<SVGConformingCondition />
								<span>
									<I18n>Proof</I18n>
								</span>
							</div>
						</div>
						<Divider />
						<div className = { less.singleCondition }>
							<SVGConformingCondition />
							<span>
								<I18n>Whitelist</I18n>
							</span>
						</div>
						{/*三种状态的Button : */ }
						{/*<XButton*/ }
						{/*	disabled*/ }
						{/*	className = { less.notEligibleBtn }*/ }
						{/*	type = "primary"*/ }
						{/*	style = { { width : '100%' } }*/ }
						{/*><I18n>You are not eligible</I18n></XButton>*/ }
						<ClaimBtnArea/>
					</SBTInfoBox>
				</div>
			</div>
			
			{/*Activity表格:*/ }
			<SBTInfoBox title = { i18n("Activity") }>
				<Table
					className = { less.SBTActivityTable }
					columns = { columns }
					dataSource = { data }
					footer = { null }
					bordered = { false }
				/>
			</SBTInfoBox>
		</div>
	</>;
});

import {
	reaxel__SBT_info ,
	reaxel__space_plugin ,
	reaxel__SpaceIDSBTIDServ ,
	reaxel__SBT_user_claim_access ,
	reaxel__user_claim_SBT,
} from '@@reaxels';
import { Img } from '@@Xcomponents';
import { XButton } from '@@pages/Test/mozi-xbutton';
import {
	SVGConformingCondition ,
	SVGCopySBT ,
	SVGNetEthereum ,
	SVGNonconformingCondition ,
	SVGSBTChecked ,
} from '@@SVGcomponents/all-SBT-SVG';
import { SVGShareIcon  } from '@@SVGcomponents/space-info-svg';
import type { ColumnsType } from 'antd/es/table';
import less from './index.module.less';
import { message } from "antd";


export const ClaimBtnArea = reaxper(() => {
	
	const { user_SBT_access } = reaxel__SBT_user_claim_access();
	const { claimSBTPending , user_claim_SBT } = reaxel__user_claim_SBT();
	
	
	return <>
		{ user_SBT_access && <p className = { less.SBTClaimState }>
			<I18n>Clamed</I18n>
			<span className = { less.amount }>{ user_SBT_access.claimedQuantity }</span>
			<I18n>Available</I18n>
			<span className = { less.amount }>{ user_SBT_access.unclaimedQuantity }</span>
		</p> }
		{ (
			!user_SBT_access || user_SBT_access.unclaimedQuantity <= 0
		) && <XButton
			disabled
			className = { less.SBTClaimedBtn }
			type = "primary"
			style = { { width : '100%' } }
		><I18n>Claimed</I18n></XButton> }
		
		{ (
			user_SBT_access && user_SBT_access.unclaimedQuantity > 0
		) && <XButton
			onClick={() => {
				user_claim_SBT();
			}}
			loading = {claimSBTPending}
			type = "primary"
			style = { { width : '100%' } }
		><I18n>Claim</I18n></XButton> }
	</>;
});


// 每一个灰色边框盒子:
export const SBTInfoBox = reaxper((props) => {
	return <>
		<div className = { less.SBTInfoBox }>
			<p className = { less.boxSubtitle }>{ props.title }</p>
			{ props.children }
		</div>
	</>;
});

const Divider = reaxper(() => {
	const { Divider } = antd;
	
	return <Divider
		plain
		className = { less.divider }
	>or</Divider>;
});

// SBT详情页address-info包括space-address 和 contact-address
export const SBTAddressInfo = reaxper(() => {
	const { SBT_info } = reaxel__SBT_info();
	console.log(SBT_info);
	
	return <>
		<div className = { less.SBTAddressInfo }>
			<SBTInfoItem title = { i18n("Issuer") }>
				<div className = { less.creatorBox }>
					<img
						className = { less.spaceAvatar }
						src = { SBT_info.iconUrl }
					/>
					<div className = { less.creatorInfo }>
						<span className = { less.spaceName }>
							<I18n>{SBT_info.name}</I18n>
						</span>
						<span
							className = { less.spaceAddressBox }
							onClick = { () => {
								clipboard(SBT_info["contractAddress"]);
								message.success('copied successfully');
							} }
						>
							{/*space地址:*/ }
							<span className = { less.spaceAddress }>
								{ SBT_info['contractAddress'].length > 10
									? <>
										<span>{SBT_info['contractAddress'].slice(0, 6)}</span>
										<span>...</span>
										<span>{SBT_info['contractAddress'].slice(-4)}</span>
									
									</>
									: SBT_info['contractAddress']
								}
							</span>
							<SVGCopySBT />
						</span>
					</div>
				</div>
			</SBTInfoItem>
			<SBTInfoItem title = { i18n("Contract address") }>
				<span className = { less.contractAddressBox }>
					{/*合约地址:*/ }
					<span
						className = { less.contractAddress }
						onClick = { () => {
							clipboard(SBT_info["contractAddress"]);
							message.success('copied successfully');
						} }
					>
						{ SBT_info['contractAddress'].length > 10
							? <>
								<span>{SBT_info['contractAddress'].slice(0, 6)}</span>
								<span>...</span>
								<span>{SBT_info['contractAddress'].slice(-4)}</span>
							
							</>
							: SBT_info['contractAddress']
						}
					</span>
					<SVGCopySBT />
				</span>
			</SBTInfoItem>
		</div>
	</>;
});

export const SBTDetailList = reaxper(() => {
	const { SBT_info } = reaxel__SBT_info();
	const { user_SBT_access } = reaxel__SBT_user_claim_access()
	if(!SBT_info ){
		return null;
	}
	return <>
		<div className = { less.SBTDetailList }>
			<SBTInfoItem title = { i18n("Minted") }>
				<span className = { less.mintedContent }>{user_SBT_access?.claimedQuantity} / {SBT_info.issueNum}</span>
			</SBTInfoItem>
			<SBTInfoItem title = { i18n("Network") }>
				<span><SVGNetEthereum />
					<span className = { less.itemContent }>
						<I18n>{SBT_info['chainID']}</I18n>
					</span>
				</span>
			</SBTInfoItem>
			<SBTInfoItem title = { i18n("Token Standard") }>
				<span className = { less.itemContent }>ERC-721</span>
			</SBTInfoItem>
			<SBTInfoItem title={i18n("MetaData")} >
				<a
					href={SBT_info.metadataUrl}
					target="_blank"
					className = { less.itemContent }
				>IFPS</a>
			
			</SBTInfoItem>
			<SBTInfoItem title = { i18n("Properties") }>
				<div className = { less.propList }>
					{SBT_info.features.map(({key,value}) => {
						return <div className = { less.keyVal } key = {Math.random()}>
							<span className = { less.key }><I18n>{key}</I18n></span>
							<span className = { less.val }><I18n>{ value }</I18n></span>
						</div>;
					})}
				</div>
			</SBTInfoItem>
		</div>
	</>;
});

// 灰色subtitle和黑色content组成的item :
export const SBTInfoItem = reaxper((props) => {
	return <>
		<div className = { less.SBTInfoItem }>
			<span className = { less.itemSubtitle }>{ props.title }</span>
			{ props.children }
		</div>
	</>;
});

const ShareBtn = reaxper( () => {
	const { Button } = antd;
	return <>
		<Button className = { less.shareBtn }>
			<SVGShareIcon />
		</Button>
	</>;
} );



interface DataType {
	key : React.Key;
	holder : React.ReactNode;
	// amount : number;
	time : string;
	// id : string;
	// status : string;
}

const columns : ColumnsType<DataType> = [
	{
		title : 'Holders' ,
		dataIndex : 'holder' ,
	} ,
	{
		title : 'Mint time' ,
		dataIndex : 'time' ,
	} ,
	// {
	// 	title : 'TokenID' ,
	// 	dataIndex : 'id' ,
	// } ,
	// {
	// 	title : 'Amount' ,
	// 	dataIndex : 'amount' ,
	// } ,
	// {
	// 	title : 'Status' ,
	// 	dataIndex : 'status' ,
	// } ,

];

const data : DataType[] = [];
for( let i = 0 ; i < 6 ; i ++ ) {
	data.push({
		key : Math.random() ,
		holder : <span className = { less.userInfo }>
			<div className = { less.avatarContainer }></div>
			0x4183...4f6d </span> ,
		// amount : 2 ,
		time : '4 minutes ago' ,
		// id : '#23451' ,
		// status : 'Claimed' ,
	});
}



