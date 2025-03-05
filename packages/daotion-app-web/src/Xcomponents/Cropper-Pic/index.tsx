/* 图片裁剪器 */
export const CropperPicBox = reaxper((props : {
	imgPreviewUrl: string,
	cropperModalShow: boolean,
	closeModal?: () => void,
	onCrop ,
	reaxel_Cropper : reaxel_Cropper ,
}) => {
	const { reaxel_Cropper ,  } = props;
	
	const {
		imgPreviewUrl = '',
		cropperModalShow = false
	} = props;
	const { Modal , Slider } = antd;
	const { XCropper , zoomTo,crop } = reaxel_Cropper();
	return (
		<Modal
			open={cropperModalShow}
			title={'Edit Media'}
			footer={null}
			className={less.cropperModal}
		>
			<XCropper
				src = { imgPreviewUrl }
			/>
			<div className = { less.zoomSlider }>
				<span>-</span>
				<Slider
					style={{
						width:'418px'
					}}
					min = { 0 }
					max = { 1 }
					onChange = { (e) => {
						zoomTo(e);
					} }
					step = { 0.01 }
				/>
				<span>+</span>
			</div>
			<XButton
				onClick = { () => {
					crop().then((blob) => {
						const url = window.URL.createObjectURL(blob);
						props.onCrop(url);
					});
				} }
				style={{ width : "100%"}}
			>
				Apply
			</XButton>
		</Modal>
	);
});

type CropperPicBoxProps = {
	reaxel_Cropper
}

import less from './index.module.less';
import { XButton } from '@@pages/Test/mozi-xbutton';
import type {reaxel_Cropper} from '@@reaxels/Reaxel-Factories';
