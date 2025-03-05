/*上传区域组件*/
export const UploadFileBox = reaxper( (props:UploadFileBoxProps ) => {
	const onUpload = async ( file ) => {
		console.log( file );
	};
	const { reaxel_DDF } = props;
	const {
		containerEventHandler ,
		dragging ,
		imgPreviewUrl ,
		inputFileEventHandler ,
		file ,
		clearFile ,
		inputFileRef,
	} = reaxel_DDF( {
		onUpload ,
		// preventClickUpload : true,
	} );
	
	const fillingContent = <>
		<SVGClose
			onClick = { ( e ) => {
				clearFile();
			} }
			style = { {
				position : 'absolute' ,
				right : '7px' ,
				top : '7px' ,
				zIndex : 1 ,
			} }
		/>
		
		
		<div
			className = { less.uploadFileFilling }
			onClick = { () => {
				inputFileRef.current.click();
			} }
			style = { {
				justifyContent : "center" ,
				alignItems : "center" ,
				backgroundImage : `url(${ imgPreviewUrl })` ,
			} }
		>
			<div
				style = { {
					position : "absolute" ,
					width : "calc(100% - 48px)" ,
					height : "calc(100% - 48px)" ,
					left : "24px" ,
					top : "24px" ,
					backgroundSize : '100%' ,
					backdropFilter : "blur(20px)" ,
					background : "rgba(255, 255, 255, 0.2)" ,
					display : "flex" ,
					justifyContent : "center" ,
					alignItems : "center" ,
				} }
			>
				<div
					className = { less.uploadFileFillingButton }
					style = { {
						display : "flex" ,
						justifyContent : "center" ,
						alignItems : "center" ,
						zIndex : '0' ,
						fontWeight : '700' ,
						fontSize : '15px' ,
						flexDirection : 'row' ,
						padding : '12px 20px' ,
						width : 'fit-content' ,
						height : '48px' ,
						background : '#fcfcfc' ,
						border : '2px solid #efefef' ,
						boxShadow : '0px 0px 36px 2px rgba(0, 0, 0, 0.04)' ,
						borderRadius : '12px' ,
					} }
				>
					<SVGUploadFileIcon />
					<span>Click or drop image</span>
				</div>
			</div>
		
		</div>
	
	</>;
	
	const emptyContent = <>
		{ dragging ? null : <div
			className = { less.uploadFile }
			onClick = { () => {
				inputFileRef.current.click();
			} }
		>
			<SVGUploadFileIcon />
			<span>Click or drop image</span>
		</div> }
	</>;
	
	return <>
		<div
			className = { file ? less.uploadFileContainerFilling : less.uploadFileContainerEmpty }
			style = { {
				transform : 'translateX(0)' ,
				padding : "24px" ,
			} }
			{ ...containerEventHandler }
		>
			<div
				style = { {
					width : 'calc(100% - 48px)' ,
					height : 'calc(100% - 48px)' ,
					left : "24px" ,
					top : "24px" ,
					position : "absolute" ,
					backgroundImage : `url('${ imgPreviewUrl }')` ,
					backgroundPosition : "center" ,
					backgroundRepeat : "no-repeat" ,
					backgroundSize : "100%" ,
				} }
			/>
			<input
				type = "file"
				title = ""
				style = { {
					width : '100%' ,
					height : '100%' ,
					opacity : '0' ,
					position : "absolute" ,
					zIndex : 1 ,
				} }
				{ ...inputFileEventHandler }
			/>
			{ file ? fillingContent : emptyContent }
		</div>
	</>;
} );

type UploadFileBoxProps = {
	reaxel_DDF
};

import { Reaxel_fact__DDF } from '@@reaxels/Reaxel-Factories';
import { reaxel__create_SBT } from '@@reaxels';
import { SVGUploadFileIcon  } from '@@SVGcomponents/all-SBT-SVG';
import less from './index.module.less';

export const SVGClose = ( props : {
	style? : React.CSSProperties,
	onClick? : React.MouseEventHandler<SVGElement>
} ) => {
	
	return <>
		<svg
			onClick = { props.onClick }
			style = { props.style }
			width = "40"
			height = "40"
			viewBox = "0 0 40 40"
			fill = "none"
			xmlns = "http://www.w3.org/2000/svg"
		>
			<rect
				x = "1"
				y = "1"
				width = "38"
				height = "38"
				rx = "19"
				fill = "white"
			/>
			<path
				fillRule = "evenodd"
				clipRule = "evenodd"
				d = "M13.2929 13.2929C13.6834 12.9024 14.3166 12.9024 14.7071 13.2929L20 18.5858L25.2929 13.2929C25.6834 12.9024 26.3166 12.9024 26.7071 13.2929C27.0976 13.6834 27.0976 14.3166 26.7071 14.7071L21.4142 20L26.7071 25.2929C27.0976 25.6834 27.0976 26.3166 26.7071 26.7071C26.3166 27.0976 25.6834 27.0976 25.2929 26.7071L20 21.4142L14.7071 26.7071C14.3166 27.0976 13.6834 27.0976 13.2929 26.7071C12.9024 26.3166 12.9024 25.6834 13.2929 25.2929L18.5858 20L13.2929 14.7071C12.9024 14.3166 12.9024 13.6834 13.2929 13.2929Z"
				fill = "#23262F"
			/>
			<rect
				x = "1"
				y = "1"
				width = "38"
				height = "38"
				rx = "19"
				stroke = "#E6E8EC"
				strokeWidth = "2"
			/>
		</svg>
	</>;
};
