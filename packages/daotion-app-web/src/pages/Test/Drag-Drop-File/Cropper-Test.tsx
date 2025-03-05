export const CropperTest = reaxper( () => {
	const {
		dragging ,
		file ,
		imgPreviewUrl,
		
	} = reaxel_DDF({
		onUpload( file ) {
			console.log( file );
		},
		
	});
	
	const {
		XCropper ,
		crop,
	} = useRef( reaxel_fact__Cropper() ).current?.();
	
	
	const [preview,setPriview] = useState(null);
	
	/*********************/
	
	/*********************/
	
	return <div
		style = { {
			width : 200 ,
			height : 200 ,
			border : "2px solid #eee",
			
		} }
	>
		<XCropper
			src = {imgPreviewUrl}
		/>
		<antd.Button
			onClick={() => {
				crop().then((blob) => {
					const url = window.URL.createObjectURL( blob );
					setPriview( url );
				})
			}}
		>Cut</antd.Button>
		<div
			style = {{
				width: 300,
				height: 300,
				backgroundColor : "#eeaabb",
				backgroundImage : `url(${preview})`,
				backgroundPosition : "center",
				backgroundSize : "100%",
				backgroundRepeat : "no-repeat",
				
			}}
		/>
	</div>;
} );



import { reaxel_DDF } from '@@pages/Test/Drag-Drop-File/reaxel-DDF';
import { reaxel_fact__Cropper } from "@@reaxels/Reaxel-Factories/Reaxel-fact--Cropper";
