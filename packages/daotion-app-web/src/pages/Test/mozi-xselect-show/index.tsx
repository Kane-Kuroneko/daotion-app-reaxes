import { XSelect } from '../mozi-xselect'
import { Space } from 'antd'

export const XSelectShow = reaxper(() => {
	
	return (
		<Space
			direction="vertical"
			style = { {
				width : '50%' ,
			} }
			size={'large'}
		>
			<XSelect/>
			<XSelect
				placeholder={'Has Placeholder'}
			/>
		</Space>
	)
	
})
