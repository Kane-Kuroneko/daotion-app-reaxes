

export const XSwitch = ( props : XSwitchProps ) => {
	return <Switch
		className = { less[ props.type ] }
		{ ...props }
	/>;
	
};
type XSwitchProps = SwitchProps&{
	type : "primary" | "secondary";
}

export const DxzSwitch = reaxper( () => {
	return <>
		<XSwitch
			defaultChecked={true}
			type = "primary"
		/>
		<XSwitch
			type = "secondary"
		/>
	</>;
} );
import less from './index.module.less';
import { Switch,SwitchProps } from 'antd';
