export const reaxel_fact__Cropper = function(){
	
	let cropperInstance:Cropper|null = null;

	const XCropper = reaxper( ( props : ReactCropperProps ) => {
		return <>
			<Cropper
				onInitialized = { ( instance ) => {
					cropperInstance = instance;
				} }
				aspectRatio = { 1 }
				dragMode = "move"
				guides = { false }
				cropBoxMovable = { false }
				cropBoxResizable = { false }
				autoCropArea = { 1 }
				viewMode = { 1 }
				style={{
					width: '100%',
					height: 'auto'
				}}
				rotatable = {false}
				{...props}
			/>
		</>
	} );
	
	const createUrl = ( blob : Blob ) => window.URL.createObjectURL( blob );
	
	return () => {
		
		return {
			XCropper ,
			async crop () {
				if(!cropperInstance) throw 'cropperInstance has not initilized yet!';
				const promise = orzPromise<Blob>();
				cropperInstance.getCroppedCanvas().toBlob((blob) => {
					promise.resolve( blob );
				});
				return promise;
			},
			zoomTo (ratio) {
				cropperInstance.zoomTo(ratio)
			},
		};
	};
};

export type XCropper = (props : ReactCropperProps) => React.ReactElement;

export type reaxel_Cropper = ReturnType<typeof reaxel_fact__Cropper>;

import Cropper , { ReactCropperProps } from 'react-cropper';
import "cropperjs/dist/cropper.css";
