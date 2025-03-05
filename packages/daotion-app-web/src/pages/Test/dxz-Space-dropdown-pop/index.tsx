import less from './index.module.less';
import {
	Switch ,
	Input ,
} from 'antd';
import {
	SVGSpaceProfileSetting ,
	SVGLeaveSpace ,
	SVGDropWebsite ,
	SVGDropTwitter ,
	SVGDropDiscord,
	SVGPopJoinSpace
} from '@@SVGcomponents/Space-dropdown-pop-svg';

export const DxzSpaceDropdownPop = () => {
	return <>
		<div className = { less.container }>
			<PopupLi text = "Space Profile" icon={<SVGSpaceProfileSetting />}>
			</PopupLi>
			<PopupLi text = "Mute Notification" icon={<Switch className={less.popSwitch}/>}>
			</PopupLi>
			<div className={less.divider}></div>
			{/*三个默认社媒 : */}
			<PopupLi text = "Website" icon={<SVGDropWebsite />}>
			</PopupLi>
			<PopupLi text = "Twitter" icon={<SVGDropTwitter />}>
			</PopupLi>
			<PopupLi text = "Discord" icon={<SVGDropDiscord />}>
			</PopupLi>
			<div className={less.divider}></div>
			{/*两种按钮样式,注释部分为leave space btn*/}
			{/*<div className={less.leaveSpaceBtn}>*/}
			{/*	<span>Leave Space</span>*/}
			{/*	<SVGLeaveSpace />*/}
			{/*</div>*/}
			<div className={less.joinSpaceBtn}>
				<span>Join Space</span>
				< SVGPopJoinSpace/>
			</div>
		</div>
	</>;
};
const PopupLi = ( props ) => {
	return <>
		<div
			className = { less.popList }
		>
			<span>{ props.text }
			</span>
			{props.icon}
		</div>
	</>;
};

