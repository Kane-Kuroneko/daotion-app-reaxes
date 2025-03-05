export const SelectSocialModalBtn = reaxper( (props:AddSocialBtn) => {
	const { Modal,Button } = antd;
	const social_list = props.socialList ?? staticSocialList;
	return <>
		<Button
			disabled={props.socialList?.length === 0}
			className={less.selectSocialBtn}
			onClick = { props.onClick }
		>
			<SVGGrayAdd/>
			<span>
				<I18n>
					Add more social account
				</I18n>
			</span>
		</Button>
		<Modal
			open = { props.modalVisible }
			onCancel = { props.onModalCancel }
			footer = { null }
			className = { less.antdSocialMediaModal }
			centered
			maskClosable
			mask = { true }
			width = "480px"
			closeIcon = { <SVGClose /> }
			maskStyle={{
				background:'rgba(244, 244, 244, 0.4)',
				backdropFilter:'blur(50px)',
			}}
		>
			<div className = { less.content }>
				<h1 className = { less.mainTitle }>Socials</h1>
				<p className = { less.intro }>Select the social media you want to add</p>
				<div className = { less.divider }></div>
				<div className = { less.socialMediaBox }>
					{ social_list.map( ( item ) => {
						return <MenuItem
							onClick = { () => {
								props.onSelect( item );
								
							} }
							key = { item.type }
							text = { item.type }
							icon = { item.icon }
						/>;
					} ) }
				</div>
			</div>
		</Modal>
	</>;
} );

const MenuItem = reaxper( ( props : TMenuItem ) => {
	return <>
		<div
			className = { less.socialMedia }
			onClick = { props.onClick }
		>
			{ props.icon }
			<span className = { less.itemText }>
				{ props.text }
			</span>
		</div>
	</>;
} );

import { staticSocialList } from './static-social-list';
import less from './index.module.less';
import {
	SVGClose ,
	SVGGrayAdd ,
} from './svg';

type SocialItem = {
	type : string;
	icon :React.ReactElement;
}

type TMenuItem = {
	icon : React.ReactElement;
	text : React.ReactNode;
	onClick? : () => any;
};

type LinkSocialItem = {
	/*社交媒体类型的字符串  如twitter*/
	type : string;
	/*社交媒体的链接*/
	link : string;
	
	key : string;
};
type AddSocialBtn = {
	onSelect (socialItem:SocialItem):void;
	onClick () : void;
	onModalCancel : () => void;
	socialList? : SocialItem[];
	modalVisible : boolean;
};
