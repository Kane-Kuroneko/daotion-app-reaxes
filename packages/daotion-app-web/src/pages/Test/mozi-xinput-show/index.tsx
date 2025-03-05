import { XInput } from '../mozi-xinput';
import { XTextArea } from '../mozi-xtextarea'
import { Space } from 'antd'

export const XInputShow = reaxper(() => {
	return (
		<Space
			direction="vertical"
			style = { {
				width : '50%' ,
			} }
			size={'large'}
		>
			<XInput
			/>
			<XInput
				placeholder={'Has Palceholder'}
			/>
			
			<XInput
				type={'number'}
			/>
			
			<XInput
				status='error'
			/>
			<XInput
				status='warning'
			/>
			
			<XTextArea/>
			
		</Space>
	);
});
