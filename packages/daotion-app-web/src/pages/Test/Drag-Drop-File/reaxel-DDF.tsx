/**
 * 拖拽上传
 * reaxel_DDF({
 *    onUpload(file):拖拽或点击上传后的回调; 
 *    preventClickUpload:是否阻止点击上传
 * })入参
 *
 * containerEventHandler : input@type=file的外层容器事件处理器,建议是DIV
 * inputFileEventHandler : input@type=file事件处理器,必须放在input@type=file元素上
 *
 */
export const reaxel_DDF = function(){
	let ret;
	const {
		store ,
		setState,
	} = orzMobx( {
		dragging : false ,
		imgPreviewUrl : null ,
		file : null ,
	} );
	const inputFileRef = React.createRef<HTMLInputElement>();
	
	const createUrl = ( blob : Blob ) => window.URL.createObjectURL( blob ); 
	
	return ret = ( {
		onUpload ,
		preventClickUpload = false ,
	} : args = {} ) => {
		
		return {
			get imgPreviewUrl() {
				return store.imgPreviewUrl;
			} ,
			get dragging() {
				return store.dragging;
			} ,
			get file() {
				return store.file;
			} ,
			get inputFileRef (){
				return inputFileRef;
			},
			clearFile : () => {
				setState( {
					file : null ,
					imgPreviewUrl : null ,
				} );
				inputFileRef.current.value = null;
			},
			/*不通过input<file>的形式传入文件 , 比如剪裁*/
			setFile(file:Blob){
				setState( { 
					file ,
					imgPreviewUrl : createUrl( file ),
				} );
			},
			containerEventHandler : {
				onDrop : () => {
					setState( { dragging : false } );
				} ,
				onDragEnter : () => {
					setState( { dragging : true } );
				} ,
				onDragLeave : () => {
					setState( { dragging : false } );
				} ,
			} as React.HTMLAttributes<any> ,
			inputFileEventHandler : {
				ref  : inputFileRef,
				onClick : ( e ) => {
					if ( preventClickUpload ) {
						e.preventDefault();
					}
				} ,
				onChange : (e) => {
					const file = e.target.files[0];
					console.log( file );
					if(!file) return ;
					const objectURL = window.URL.createObjectURL( file );
					setState( {
						imgPreviewUrl : objectURL ,
						file ,
					} );
					onUpload?.(file);
				},
				onDrop : ( e ) => {
					const [ file ] = e.dataTransfer.files;
					const objectURL = window.URL.createObjectURL( file );
					setState( {
						imgPreviewUrl : objectURL ,
						file ,
					} );
					onUpload?.(store.file);
					console.log( objectURL.replace( 'blob:' , '' ) );
				} ,
			} as React.InputHTMLAttributes<any> ,
		};
	};
	type args = {
		onUpload? : (file : File,) => void ,
		preventClickUpload? : boolean;
	};
}();
