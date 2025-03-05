/**
 * xbutton按钮组件
 * type类型(不传为默认值)：primary(默认); sencondary; link;
 * frontIcon图标位置是否在前: 默认true; false
 * 其余api同antd-button保持一致
 * 
 */
import less from './index.module.less';
import {ButtonProps} from 'antd';
import { reaxel_theme } from '@@reaxels';


export const XButton = reaxper((props : Omit<ButtonProps,'type'| 'icon'> & {
	type? : any,
	icon? : any,
	frontIcon? : boolean,
} ) => {
	const reax_theme = reaxel_theme();
	const theme = reax_theme.theme;
	const { Button } = antd;
	const {
		type = 'primary' ,
		icon,
		frontIcon = true,
        ...buttonProps
    } = props;
	const exchangeType = {
		'secondary': 'default'
	};
	const showType = exchangeType[type] ? exchangeType[type] : type;
	
	return (
		<Button
			type = {showType}
			onClick = { props.onClick }
			className = {less.Xbutton + " " + `${showType}-${theme}`}
			style = {props.style}
			{ ...buttonProps  }
		>
			{frontIcon && icon}
			{ props.children }
			{!frontIcon && icon}
		</Button>
	);
});
