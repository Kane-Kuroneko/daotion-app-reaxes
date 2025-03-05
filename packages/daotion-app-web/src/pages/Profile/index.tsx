/**/
export const Profile = reaxper(() => {
	const { Empty } = antd;
	/*声明profileStore,如果是本人的则直接用reax_user_profile.profile,否则用othersProfile*/
	let profile : User__profile_info.response;
	const {
		params ,
		navigate,
	} = toolkits.useRouter();
	const {
		othersProfile ,
		profile_joined_space_list_paged,
		closuredClearOthersProfile ,
		memorizedFetchUpdateJoinedSpaceList,
		memorizedFetchUpdateOthersProfile,
	} = reaxel_user_profile_lists();
	const { BlokiesAvatar } = reaxel_profile_avatar();
	const reax_wallet = reaxel_wallet();
	const { uploadProfileBanner } = reaxel_edit_profile();
	const reax_user_profile = reaxel_user_profile();
	
	Reaxes.collectDeps(othersProfile);
	Reaxes.collectDeps(reax_user_profile.profileStore.profile);
	Reaxes.collectDeps(reax_wallet.account);
	
	const address = reax_wallet.account?.address;
	const qsAddress = params.address?.toLowerCase();
	
	/*当address或qsAdress变化时清除othersProfile*/
	closuredClearOthersProfile(() => [qsAddress||address])(qsAddress||address);
	
	/* 访问的是/profile/:address    */
	if ( qsAddress ) {
		profile = othersProfile;
		memorizedFetchUpdateOthersProfile( () => [ qsAddress ] )( qsAddress );
		memorizedFetchUpdateJoinedSpaceList(() => [qsAddress])(qsAddress);
		if(qsAddress !== profile?.address){
			return null;
		}
	} else /*访问的是/profile  */  {
		profile = reax_user_profile.profileStore.profile;
		memorizedFetchUpdateJoinedSpaceList(() => [address])(address);
		/*既没有钱包地址也没有路由地址 , 说明用户在访问/profile,且没链接钱包*/
		if (!reax_wallet.connecting && !address){
			/*清除掉获取到的列表*/
			memorizedFetchUpdateJoinedSpaceList(() => [])(null);
			reax_wallet.connectWallet().then( () => {
				if ( !reax_wallet.account ) {
					navigate( '/' );
				}
			} );
			console.log(1111111111,profile);
			return <Empty/>;
		}
	}
	
	if(!profile){
		console.log( 222222222 ,profile);
		return <Empty/>;
	}
	
	if(toolkits.addressEqual(qsAddress,reax_user_profile.profileStore.profile?.address)){
		return <Navigate
			to="/profile"
			replace
		/>
	}
	
	
	/*如果访问的是用户本人的profile则显示settings*/
	const UserSelfSettingsBtn = () => {
		if(!qsAddress || (address === qsAddress)){
			return <Button
				className = { less.myProfileSettingBtn }
				onClick={() => navigate('/profile/edit')}
			>
				<SVGSettingIcon />
				<span>
					<I18n>Settings</I18n>
				</span>
			</Button>;
		}else {
			return null;
		}
	};
	/*如果是用户本人就显示edit cover*/
	const UserSelfEditCoverBtn = () => {
		if(!qsAddress || (address === qsAddress)){
			return <div
				className = { less.editCover }
				onClick = {() => uploadProfileBanner()}
			>
				<I18n>Edit cover</I18n>
			</div>
		}else {
			return null;
		}
	};
	
	return <>
		<div
			className = { less.spaceInfo }
		>
			<div
				className = { less.banner }
			>
				<Img
					className = { less.cover }
					width = "1200px"
					height = "300px"
					src = {profile.bgUrl}
				/>
				<div className = { less.myAvatarContainer }>
					<Img
						className = { less.myAvatar }
						src = {profile.iconUrl}
						fallback={<BlokiesAvatar
							address = {profile.address}
							size = {124}
						/>}
					/>
				</div>
				{ UserSelfEditCoverBtn() }
			</div>
			<div
				className = { less.infoBox }
			>
				<div
					className = { less.spaceJoin }
				>
					<span
						className = { less.spaceName }
					>{ profile.displayName || profile.address }
					</span>
					<div className = { less.share_joinBox }>
						<ShareBtn />
						
						{UserSelfSettingsBtn()}
						
					</div>
				</div>
				
				<div
					style = { {
						display : "flex" ,
						justifyContent : "space-between" ,
					} }
				>
					<div>
						<div className = { less.sharingBox }>
							<WalletAddressCopyBox walletAddr = { profile.address } />
							<div className = { less.socialMedias }>
								<SVGSocialShare />
							</div>
						</div>
						<p
							className = { less.bios }
						>
							{profile.bio}
						</p>
					</div>
					<div className = { less.netWorth }>
						<p className = { less.netWorthTitle }>
							<I18n>
								Net Worth
							</I18n>
						</p>
						<p className = { less.netWorthMoney }>$18,494,958.15</p>
					</div>
				</div>
			</div>
			<div className = { less.tabsBox }>
				<Tabs
					defaultActiveKey = "1"
					onChange = { onChange }
				>
					<TabPane
						tab = {i18n("Joined Spaces")}
						key = "1"
					>
						<div className = { less.joinedSpaceBox }>
							{ profile_joined_space_list_paged.
							map( ( item ) => {
								return <JoinedSpaceCard
									key = {item.address}
									{...item}
								/>;
							} ) }
						</div>
					</TabPane>
					<TabPane
						tab = "NFTs"
						key = "2"
					>
						<MyProfileNFTsBox />
					</TabPane>
					<TabPane
						tab = "SBTs"
						key = "3"
					>
						<MyProfileSBTsBox />
					</TabPane>
					<TabPane
						tab = "Tokens"
						key = "4"
					>
						<MyProfileTokensBox />
					</TabPane>
				</Tabs>
			</div>
		</div>
	</>;
});


import {
	Img ,
	WalletAddressCopyBox ,
} from '@@Xcomponents';
import {
	reaxel_edit_profile ,
	reaxel_user_profile ,
	reaxel_user_profile_lists ,
	reaxel_wallet ,
	reaxel_profile_avatar,
} from '@@reaxels';
import {User__profile_info} from '@@requests/types';
import { Navigate } from 'react-router-dom';
import less from './index.module.less';

import {
	Button ,
	Tabs ,
} from 'antd';
import {
	SVGCup ,
	SVGLightning ,
	SVGMyProfileCardOp ,
	SVGNFTsLink ,
	SVGSBTsCardSpaceLogo ,
	SVGSettingIcon ,
	SVGShareIcon ,
} from '@@SVGcomponents/my-profile-tabs-svg';

import { SVGSocialShare } from '@@SVGcomponents/space-info-svg';


const { TabPane } = Tabs;
const onChange = ( key : string ) => {
	console.log( key );
};

const MyProfileTokensBox = () => {
	return <>
		<div className = { less.myProfileTokensBox }>
			<MyprofileTabSubTitle />
			{ new Array( 6 ).fill( '' ).
			map( ( a , i ) => {
				return <MyprofileTokensList
					key = { Math.random() }
				/>;
			} ) }
		</div>
	</>;
};
const MyprofileTokensList = () => {
	return <>
		<div className = { less.myProfileTokensList }>
			<SVGMyProfileCardOp />
			<div className = { less.TokensPriceBox }>
				<div>
					<p className = { less.TokensPriceName }>OP</p>
					<p className = { less.TokensPriceAddition }>Optimism</p>
				</div>
				<div>
					<p className = { less.TokensPriceName }>$0.49</p>
					<p className = { less.TokensPriceAddition }>Optimism</p>
				</div>
				<div>
					<p className = { less.TokensPriceName }>USD$981.30</p>
					<p className = { less.TokensPriceAddition }>45,9508.38</p>
				</div>
			</div>
		</div>
	</>;
};

const MyProfileSBTsBox = () => {
	return <>
		<div className = { less.myProfileSBTsBox }>
			{ new Array( 7 ).fill( '' ).
			map( ( a , i ) => {
				return <MyProfileSBTsCard
					key = { Math.random() }
				/>;
			} ) }
		</div>
	</>;
};
/*NFTs和SBTs-card大部分样式基本相同,so,SBTs-card采用NFTsCardMain以及NFTsCollectName的样式*/
const MyProfileSBTsCard = () => {
	return <>
		<div className = { less.myProfileSBTsCard }>
			<div className = { less.NFTsCardMain }>
				<div className = { less.NFTsViewOn }>
					<span>View on</span>
					<div className = { less.NFTsLinkBox }>
						<SVGNFTsLink />
					</div>
				</div>
			</div>
			<div className = { less.SBTsCardInfo }>
				<div className = { less.NFTsCollectName }>NFT Collection’s Looooooooooooger Name# 320</div>
				<div className = { less.cardLogoNameBox }>
					<div className = { less.SBTsCardSpaceLogo }>
						<SVGSBTsCardSpaceLogo />
					</div>
					<span className = { less.SBTsCardSpaceName }>Daotion Space</span>
				</div>
				<div className = { less.divider }>
				</div>
				<div className = { less.SBTsCardOp }>
					<SVGMyProfileCardOp />
					<span>Optimision</span>
				</div>
			</div>
		</div>
	</>;
};
const MyProfileNFTsBox = () => {
	return <>
		<div className = { less.myProfileNFTsBox }>
			<MyprofileTabSubTitle />
			<div className = { less.myProfileNFTsCardField }>
				{ new Array( 9 ).fill( '' ).
				map( ( a , i ) => {
					return <MyProfileNFTsCard
						key = { Math.random() }
					/>;
				} ) }
			</div>
		</div>
	
	</>;
};
const MyProfileNFTsCard = () => {
	return <>
		<div className = { less.myProfileNFTsCard }>
			<div className = { less.NFTsCardMain }>
				<div className = { less.NFTsCardPolygon }>
					<SVGNFTsLink />
					<span>Polygon</span>
				</div>
				<div className = { less.NFTsViewOn }>
					<span>View on</span>
					<div className = { less.NFTsLinkBox }>
						<SVGNFTsLink />
					</div>
				</div>
			</div>
			<div className = { less.NFTsCardInfo }>
				<div className = { less.NFTsCollectName }>NFT Collection’s Looooooooooooger Name# 320</div>
				<div className = { less.NFTsPriceBox }>
					<p className = { less.NFTsPriceTitle }>
						<span>Floor Price</span>
						<span>Est. Value</span>
					</p>
					<p className = { less.NFTsPriceNumber }>
						<span>Ξ 0.75</span>
						<span>Ξ 1.22</span>
					</p>
				</div>
			</div>
		</div>
	</>;
};

const JoinedSpaceCard = (props:JoinedSpaceCardProps) => {
	const { navigate } = toolkits.useRouter();
	return <>
		<div
			className = { less.joinedSpaceCard }
			onClick = { () => navigate( '/space' + props.spaceID ) }
		>
			<div className = { less.cardTop }>
				<GrayBoxVal
					text = { props.contributionVal }
					icon = { <SVGLightning /> }
				/>
				<GrayBoxRank
					text = { props.rank }
					icon = { <SVGCup /> }
				/>
			</div>
			
			<div className = { less.profileAvatarBox }>
				<Img
					width = { 110 }
					height = { 110 }
					src = { props.icon }
					style = { {
						borderRadius : "50%" ,
						objectFit : "cover" ,
					} }
					fallback = { <div
						style = { {
							height : "100%" ,
							borderRadius : "50%" ,
							backgroundColor : "black" ,
							display:"flex",
							justifyContent:"center",
							alignItems:"center",
						} }
					>
						<span className={less.theFirstLetter}>
							{ props.spaceName.slice( 0 , 1 ).toUpperCase() }
						</span>
					</div> }
				/>
			</div>
			
			<div
				className = { less.cardSpaceName }
				title = { props.address }
				onClick={(e) => e.stopPropagation()}
			>
				{ props.spaceName || props.address }
			</div>
		</div>
	</>;
};
type JoinedSpaceCardProps = {
	spaceName : string;
	spaceID: number,
	address: string,
	icon: string,
	contributionVal: number,
	rank: number
};
const MyprofileTabSubTitle = () => {
	return <>
		<div className = { less.myProfileTabSubtitle }>
			<p className = { less.myProfileTabPriceTitle }>NFTs Net Worth</p>
			<p className = { less.myProfileTabPriceNumber }>$25,572.77</p>
		</div>
	</>;
};
const ShareBtn = reaxper( () => {
	return <>
		<Button className = { less.shareBtn }>
			<SVGShareIcon />
		</Button>
	</>;
} );

const CardTop = () => {
	return <>
		<div className = { less.cardTop }>
			<GrayBoxVal
				text = "1.2"
				icon = { <SVGLightning /> }
			/>
			<GrayBoxVal
				text = "999+"
				icon = { <SVGCup /> }
			/>
		</div>
	</>;
};
const GrayBoxVal = ( props ) => {
	return <>
		<div className = { less.grayBoxVal }>
			{ props.icon }
			<span className = { less.grayTextVal }>
				{ props.text }
			</span>
		</div>
	</>;
};
const GrayBoxRank = ( props ) => {
	return <>
		<div className = { less.grayBoxRank }>
			{ props.icon }
			<span className = { less.grayTextRank }>
				{ props.text }
			</span>
		</div>
	</>;
};
