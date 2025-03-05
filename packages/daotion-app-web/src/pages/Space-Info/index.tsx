

const {
	Tabs ,
	Button,
} = antd;
const onChange = ( key : string ) => {
	console.log( key );
};
export const SpaceInfo = reaxper( class extends Reaxlass<any , any> {
	
	reax_space_detail = reaxel_space_detail();
	
	reax_user_join_or_leave_space = reaxel_user_join_or_leave_space();
	
	reax_upload_banner = reaxel_space_settings_upload_pictures();
	
	reax_joined_Space_list = reaxel_joined_Space_list();
	
	reax_space_member_list = reaxel_space_member_list();
	
	render() {
		const { params } = toolkits.useRouter();
		const spaceID = parseInt( params.spaceID );
		this.reax_space_detail.getSpaceDetailMemoed( spaceID );
		this.reax_space_member_list.closuredFetchUpdateMemberList(() => [spaceID])(spaceID);
		
		if ( !this.reax_space_detail.store.spaceInfo ) return null;
		/*todo 骨架屏*/
		if ( this.reax_space_detail.store.spaceInfo.spaceID !== spaceID ) return null;
		
		return <>
			<div>
				<div
					className = { less.spaceInfo }
				>
					<div className = { less.banner }>
						<Img
							className = { less.coverImg }
							src = { this.reax_space_detail.store.spaceInfo.bgUrl }
							width = "1200px"
							height = "300px"
							alt = ""
						/>
						<div className = { less.avatarBox }>
							<Img
								className = { less.spaceAvatar }
								src = { this.reax_space_detail.store.spaceInfo.iconUrl }
								fallback = { <div
									style = { {
										height : "100%" ,
										borderRadius : "16px" ,
										backgroundColor : "black" ,
										display:"flex",
										justifyContent:"center",
										alignItems:"center",
										} }
								>
									<span className={less.theFirstLetter}>
										{ this.reax_space_detail.store.spaceInfo.name.slice( 0 , 1 ).toUpperCase() }
									</span>
								</div> }
							/>
						</div>
						
						{ this.reax_joined_Space_list.joined_space_list?.some( ( space ) => {
							if ( space.spaceID === this.reax_space_detail.store.spaceInfo.spaceID && space.role === 3 ) {
								return true;
							}
						} ) && <div
							className = { less.editCover }
							onClick = { () => {
								this.reax_upload_banner.space_info_banner( this.reax_space_detail.store.spaceInfo.spaceID );
							} }
						>
							<I18n>
								Edit cover
							</I18n>
						
						</div> }
					</div>
					<div className = { less.infoBox }>
						<div className = { less.spaceJoin }>
							<span
								className = { less.spaceName }
							>{ this.reax_space_detail.store.spaceInfo.name }
							</span>
							<div className = { less.share_joinBox }>
								<ShareBtn></ShareBtn>
								<BtnSpaceJoinedSetting
									spaceID = { this.reax_space_detail.store.spaceInfo.spaceID }
								/>
							</div>
						</div>
						<div
							className = { less.sharingBox }
						>
							<WalletAddressCopyBox
								walletAddr = { this.reax_space_detail.store.spaceInfo.addrChain }
							/>
							<div className = { less.socialMedias }>
								<SVGSocialShare />
							</div>
						</div>
						<p
							className = { less.bios }
						>
							{ this.reax_space_detail.store.spaceInfo.bio }
						</p>
					</div>
					<div className = { less.tabsBox }>
						<AddNewTabBtn />
						<Tabs
							defaultActiveKey = "1"
							onChange = { onChange }
							items = {[
								{
									label : <I18n>OverView</I18n>,
									key:"1",
									children:<SpaceOverViewContainer memberList = { this.reax_space_member_list.spaceMemberList } />
								},
								{
									label : <I18n>Articles</I18n>,
									key:"2",
									children:"Content of Tab Pane 22222"
								},
							]}
						/>
					</div>
				</div>
			</div>
		</>;
	}
} );

const EditTabsNameBtn = reaxper( () => {
	return <>
		<Button
			className = { less.editTabsNameBtn }
			shape="round">
			<SVGSettingTabs />
		</Button>
	</>;
} );

const EditTabsNamePopover = reaxper( () => {
	return <>
		<XPopover
			content = { <EditTabsNameContent /> }
			trigger = "click"
			placement={"bottom"}
			overlayClassName={less.editTabsNamePopover}
		>
			<Button
				className = { less.editTabsNameBtn }
				shape="round">
				<SVGSettingTabs />
			</Button>
		</XPopover>
	</>;
} );
const EditTabsNameContent = reaxper( () => {
	return <>
		<div>
			<div className = { less.editTabsTitle }>TabsName</div>
			<div className = { less.editTabsBox }>
				<SVGEditTabIcon />
				<span>Edit</span>
			</div>
			<div className = { less.deleteTabsBox }>
				<SVGDeleteTabIcon />
				<span>Delete</span>
			</div>
		</div>
	</>;
} );
const AddNewTabBtn = reaxper( () => {
	return <>
			<Button
				className={less.addNewTabBtn}>
				<SVGAddNewIcon />
				<span>
					<I18n>
						New
					</I18n>
				</span>
			</Button>
	</>;
} );
const SpaceOverViewContainer = reaxper( (props:{memberList:Space__member_list.response['userInfos']}) => {
	return <>
		<div className = { less.contentBox }>
			<div className = { less.contentLeft }>
				<ContentListFirst />
				<ContentListSecond />
			</div>
			<div className = { less.contentRight }>
				<OverViewTitle />
				<div className = { less.memberLists }>
					{ props.memberList.
					map( ( item ) =>
						<MemberItem
							key = { item.address }
							avatar = { item.icon }
							address = { item.address }
							name = { item.name }
						></MemberItem> ,
					) }
				</div>
			</div>
		</div>
	
	</>;
} );

const MemberItem = reaxper( (props:MemberItemProps) => {
	const {} = reaxel_user_profile();
	const { navigate } = toolkits.useRouter();
	return <>
		<div
			className = { less.memberItem }
			onClick={() => {
				navigate( '/profile/' + props.address );
			}}>
			<Img className={less.memberAvatar}
				src = {props.avatar || "data:image/png;base64,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" }
				width = "24px"
				height = "24px"
			/>
			<span className={less.memberName} >
				{ props.name || props.address || "Hillen" }
			</span>
		</div>
	</>;
} );
type MemberItemProps = {
	avatar : string;
	address : string;
	name : string;
};


const OverViewTitle = reaxper( () => {
	return <>
		<div className={less.overviewTitle}>
				<I18n>
					Members
				</I18n>
		</div>
	</>;
} );
const ContentListFirst = reaxper( () => {
	return <>
		{/*<div className = { less.contentListFirst }>
			<OverViewTitle />
		</div>*/}
		
		<Contributions/>
	</>;
} );
const ContentListSecond = reaxper( () => {
	return <>
		{/*<div className = { less.contentListSecond }>
			<OverViewTitle />
		</div>*/}
		<Intensity/>
	</>;
} );

const ShareBtn = reaxper( () => {
	return <>
		<Button className = { less.shareBtn }>
			<SVGShareIcon />
		</Button>
	</>;
} );



import {
	Img ,
	WalletAddressCopyBox ,
	XPopover,
} from '@@Xcomponents';
import {
	reaxel_joined_Space_list ,
	reaxel_space_detail ,
	reaxel_space_member_list ,
	reaxel_space_settings_upload_pictures ,
	reaxel_user_join_or_leave_space ,
	reaxel_user,
	reaxel_user_profile,
} from '@@reaxels';
import { Space__member_list } from '@@requests/types';
import { BtnSpaceJoinedSetting } from '@@pages/--Components--';
import less from './index.module.less';
import {
	SVGAddNewIcon ,
	SVGDeleteTabIcon ,
	SVGEditTabIcon ,
	SVGSettingTabs ,
	SVGShareIcon ,
	SVGSocialShare ,
} from '@@SVGcomponents/space-info-svg';


import Contributions from '@@public/svg/Space-Info-Overview-Contributions.component.svg';
import Intensity from '@@public/svg/Space-Info-Overview-Intensity.component.svg';
