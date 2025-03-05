import { reaxel_scrollParentRef } from '@@reaxels';
export const Notification = reaxper(class extends Reaxlass<{
	visible : boolean;
	config : ArgsProps;
}>{
	
	
	opening:false|string = this.props.visible ? this.props.config.key : false;
	
	componentDidRender(stage : "mount" | "update" , prevProps? , prevState? , snapshot? : any) : any{
		const { scrollParentRef } = reaxel_scrollParentRef();
		if(this.props.visible === true){
			
			if(!this.opening){
				antd.notification.open({
					...this.props.config,
					className : less.notificationContainer ,
					getContainer : () => scrollParentRef.current
				});
				
				this.opening = this.props.config.key;
			}
			
		}else {
			if(this.opening){
				antd.notification.close(this.opening);
				this.opening = false;
			}
		}
		
	}
	
	render(){
		return null;
	}
});

const {store,setState} = orzMobx({
	visible : false,
});
export const TestNotification = reaxper(() => {
	
	return <>
		<antd.Button
			onClick = { () => {
				setState({
					visible : !store.visible ,
				});
			} }
		
		>
			switch notification {store.visible}
		</antd.Button>
		<Notification
			visible = {store.visible}
			config = {{
				// className: less.notifi,
				duration:null,
				key : "123" ,
				message : <div className={less.wrapper}>
					<span className={less.title}>Unsaved changes!</span>
					<div className={less.btn}>
						<XButton 
							type="text">
							Reset all
						</XButton>
						<XButton 
							type="primary">
							Confirm
						</XButton>
					</div>
				</div>,
				bottom : 24,
				placement : "bottom",
			}}
		/>
	</>;
})

import less from './index.module.less';
import {ArgsProps} from 'antd/lib/notification/index';
import {XButton} from "@@Xcomponents";
