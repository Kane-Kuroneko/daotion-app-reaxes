export const DxzModalCropper = () => {
	return <>
		<Modal
			open = { true }
			className = { less.antdCropperModal }
			centered
			maskClosable
			closeIcon = { <SVGCloseIcon /> }
			mask = { true }
			width = "600px"
			footer = { null }
			maskStyle = { {
				background : "#f4f4f4" ,
			} }
		>
			<h1 className = { less.mainTitle }>
				<I18n>Edit media</I18n>
			</h1>
			<div className = { less.cropperBox }>
				{/*此处放置图片裁剪框*/ }
			</div>
			<div className = { less.scaleSlider }>
				<span>-</span>
				<Slider />
				<span>+</span>
			</div>
			<XButton
				type="primary"
				style = { { width : '100%' } }
			>
				<I18n>Apply</I18n>
			</XButton>
		</Modal>
	</>;
};
import less from './index.module.less';
import {
	Modal ,
	Slider,
} from 'antd';
import { SVGCloseIcon } from '@@SVGcomponents';
import { XButton } from '@@pages/Test/dxz-button';
