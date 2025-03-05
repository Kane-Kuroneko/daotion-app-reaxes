/**
 * xInput输入组件
 *
 */

import less from './index.module.less'
import  { InputProps } from 'antd'


export const XInput = reaxper((props : Partial<InputProps>) => {
	const { Input } = antd;
	
	
	return (
		<Input
			className = { less ['x-input'] }
			size = "large"
			{ ...props }
		/>

	);
	
});
