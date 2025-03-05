import less from './index.module.less'
import { SelectProps } from 'antd'

export const XSelect = reaxper((props: Partial<SelectProps>) => {
	const { Select } = antd
	return (
		<Select
			style = { { width : '100%' } }
			size = "large"
			className = { less ['x-select'] }
			{ ...props }
		/>
	);
})
