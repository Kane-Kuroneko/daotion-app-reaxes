/**
 * 站内信服务
 */
export const reaxel_msg_notif = function(){
	const { store , setState } = orzMobx({
		messageTypes : {},
		list : [] as notifMsgItem[] ,
	});
	
	return () => {
		
		return {
			get messageTypes(){
				return store.messageTypes;
			},
			get messages (){
				return store.list;
			},
			/*添加一条消息类型*/
			addMessageType(msgTypes:{[p:string]:msgType}){
				setState({
					messageTypes : {
						...store.messageTypes ,
						...msgTypes ,
					} ,
				});
			},
			/*清除一类消息*/
			checkin(type:notifMsgItem['type']){
				setState({
					list : store.list.filter((item) => {
						return item.type !== type;
					}) ,
				});
			},
			push(msgList : notifMsgItem[]){
				setState({
					list : [ ...store.list , ...msgList ] ,
				});
			},
			
		};
	};
}();

import {notifMsgItem,msgType} from './types';


