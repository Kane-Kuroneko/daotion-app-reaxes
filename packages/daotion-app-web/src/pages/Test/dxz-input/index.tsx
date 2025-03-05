

export const XInput = ( props:InputProps ) => {
	const { Input } = antd;
	return <Input
		className = { less[ props.type ] }
		placeholder={props.placeholder}
		size="large"
		{...props}
	/>;
	
};
export const XTextArea = ( props : TextAreaProps & {
	type? : "primary"
}) => {
	const { TextArea } = antd.Input;
	return <TextArea
		className = { less[ props.type ] }
		style={props.style}
		size="large"
		{...props}
	/>;
	
};
export const DxzInput = reaxper( () => {
	return <>
		<div className={less.box}>
			<XInput
				type = "primary"
			/>
			<XTextArea
				type = "primary"
			/>
		</div>
	</>;
} );
import less from './index.module.less';
import { InputProps  } from 'antd';
import { TextAreaProps } from "antd/lib/input";
