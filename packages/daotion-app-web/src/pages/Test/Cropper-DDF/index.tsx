import { CropperDDF } from './Cropper';


export const TestCropperDDF = reaxper(() => {
	
	const {XCropper , reax_DDF , reaxel_Cropper , setState,store } = reaxel_TestCropper();
	
	return <div>
		
		<UploadFileBox
			reaxel_DDF = {() => reax_DDF}
		/>
		
		<CropperDDF
			reaxel_Cropper = {reaxel_Cropper}
			onCrop = {(url) => {
				reax_DDF.setFile(url);
				setState({ modalVisible : false });
			}}
			imgPreviewUrl = {reax_DDF.imgPreviewUrl}
			cropperModalShow = {store.modalVisible}
		/>
	</div>;
});


const reaxel_TestCropper = function(){
	const {store,setState} = orzMobx({
		modalVisible : false,
		
	})
	const reaxel_DDF = Reaxel_fact__DDF();
	const reaxel_Cropper = reaxel_fact__Cropper();
	const reax_DDF = reaxel_DDF({
		onUpload(file){
			setState({ modalVisible : true });
		},
	});
	const reax_cropper = reaxel_Cropper();
	
	return () => {
		
		return {
			get store(){return store;},
			setState,
			reax_DDF,
			reaxel_Cropper,
			get XCropper (){
				return reax_cropper.XCropper;
			},
		};
	};
}();

import { UploadFileBox } from '@@Xcomponents';
import {
	Reaxel_fact__DDF ,
	reaxel_fact__Cropper,
} from '@@reaxels/Reaxel-Factories';
import { reaxel_DDF } from "@@pages/Test/Drag-Drop-File/reaxel-DDF";
