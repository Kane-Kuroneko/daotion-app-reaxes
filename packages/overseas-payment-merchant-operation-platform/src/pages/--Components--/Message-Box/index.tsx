export const MessageBox = reaxper(() => {
	
	const { Button , Popover } = antd;
	return <Popover
		title = { <div className = { less.title }>通知</div> }
		placement = "bottomRight"
		trigger = "click"
		arrowPointAtCenter
		content = { <PopoverContent /> }
	>
		<div className = { less.msgBox }>
			<SVGMessageBox />
		</div>
	</Popover>;
});

const PopoverContent = reaxper(() => {
	const { msgTypes , messages } = reaxel_msg_notif();
	
	if( messages.length === 0 ) {
		return <div className = { `${ less.emptyBox } ${ less.msgContent }` }>
			<SVGMessageBoxBell />
			<span>你已阅完所有通知</span>
		</div>;
	}
	
	return <div className = { less.msgContent }>
		{ Object.keys(msgTypes).map((type : notifMsgItem["type"]) => {
			const items = messages.filter((item) => item.type === type);
			const count = items.reduce((accu , item) => item.number + accu , 0);
			const { label , path } = msgTypes[type];
			return items.length > 0 &&
				<NewMessage
					key = { Math.random() }
					type = { type }
					count = { count }
				
				/>;
		}) }
	</div>;
});

const NewMessage = reaxper((props) => {
	const { Badge } = antd;
	const { navigate } = toolkits.useRouter();
	const { checkin , msgTypes } = reaxel_msg_notif();
	const typeCheck = {
		"mch-withdraw-rqst" : {
			title : '提现申请' ,
			icon : <SVGMessageBoxWithdraw /> ,
		} ,
		"mch-deposit-rqst" : {
			title : '充值申请' ,
			icon : <SVGMessageBoxDeposit /> ,
		} ,
	};
	const { type , count } = props;
	const { label , path } = msgTypes[type];
	const { title , icon } = typeCheck[type];
	
	return (
		<div
			className = { less.messageContainer }
			onClick = { () => {
				navigate(path);
				checkin(type);
			} }
		>
			{ icon }
			<div style = { { flex : 1 } }>
				<p>{ title }</p>
				<span className = { less.label }>{ label }</span>
			</div>
			<Badge count = { count } />
		</div>
	);
});

import { reaxel_msg_notif } from '@@reaxels';
import { notifMsgItem } from '@@reaxels/msg-notif/types';
import {
	SVGMessageBox ,
	SVGMessageBoxBell ,
	SVGMessageBoxWithdraw ,
	SVGMessageBoxDeposit ,
} from '@@SVGcomponents';
import less from './index.module.less';

const reaxel_message_box = function(){
	
	const reax_msg_notif = reaxel_msg_notif();
	
	return () => {
		
		return {
			get messages(){
				return reax_msg_notif.messages;
			} ,
		};
	};
}();
