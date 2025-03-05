export const DragDropFile = reaxper( (props) => {
	const onUpload = async (file) => {
		console.log( file );
	};
	const {
		containerEventHandler ,
		dragging ,
		imgPreviewUrl ,
		inputFileEventHandler ,
		file ,
	} = reaxel_DDF({
		onUpload,
		preventClickUpload : true,
	});
	
	return <div
		style={{
			width: 400,
			height: 400,
			border : '1px solid #eee',
			
		}}
	>
		<UploaderDDF/>
		
		<CropperTest/>
	</div>
	
	return <>
		<div
			style = { {
				width : "500px" ,
				height : "500px" ,
				backgroundColor : dragging ? "green" : "#eeeeee" ,
				justifyContent : "center" ,
				alignItems : "center" ,
				backgroundImage : `url('${ imgPreviewUrl }')` ,
				backgroundPosition : "center" ,
				backgroundRepeat : "no-repeat" ,
				backgroundSize : "100%" ,
				margin : "80px" ,
				transform : 'translateX(0)' ,
			} }
			{ ...containerEventHandler }
		>
			<input
				type = "file"
				style = { {
					width : '100%' ,
					height : '100%' ,
					opacity : '0' ,
				} }
				{ ...inputFileEventHandler }
			/>
		</div>
	</>;
} );

import { UploaderDDF } from '@@pages/Plugin-SBT-Pad--New/Upload-Box';
import { CropperTest } from '@@pages/Test/Drag-Drop-File/Cropper-Test';
import { reaxel_DDF } from '@@pages/Test/Drag-Drop-File/reaxel-DDF';

