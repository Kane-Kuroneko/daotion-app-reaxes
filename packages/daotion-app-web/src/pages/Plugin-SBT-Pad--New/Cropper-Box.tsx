/*裁剪组件*/
export const CropperBox = reaxper(() => {
	const { reax_DDF, reaxel_Cropper, cropperModalShow, closeCropperModal } = reaxel__create_SBT();
	const { imgPreviewUrl, setFile } = reax_DDF
	
	return <CropperPicBox
		reaxel_Cropper={reaxel_Cropper}
		cropperModalShow = { cropperModalShow }
		imgPreviewUrl = { imgPreviewUrl }
		onCrop={(blob) => {
			setFile(blob)
			closeCropperModal()
		}}
	/>;
});

import { Reaxel_fact__DDF } from '@@reaxels/Reaxel-Factories';
import { reaxel__create_SBT } from '@@reaxels';
import { CropperPicBox } from '@@Xcomponents';


