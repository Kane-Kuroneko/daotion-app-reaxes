import less from './index.module.less'
import  { TextAreaProps } from 'antd/lib/input'

export const XTextArea = (props: Partial<TextAreaProps>) => {
	const { TextArea } = antd.Input
	
	return (
		<TextArea
			className = { less ['x-input'] }
			{ ...props }
		/>
	)
}
