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
export const Reaxel_fact__DDF = function(){
	let ret;
	const {
		store ,
		setState,
	} = orzMobx( {
		dragging : false ,
		file : null as File,
	} );
	const inputFileRef = React.createRef<HTMLInputElement>();
	
	const createUrl = ( blob : Blob ) => window.URL.createObjectURL( blob );
	
	return ret = ( {
		onUpload ,
		preventClickUpload = false ,
	} : args = {} ) => {
		
		return {
			get imgPreviewUrl() {
				if(!store.file || !(store.file instanceof File)){
					return '';
				}
				return createUrl(store.file);
			} ,
			get dragging() {
				return store.dragging;
			} ,
			get file():File {
				return store.file;
			} ,
			get inputFileRef (){
				return inputFileRef;
			},
			clearFile : () => {
				setState( { file : null , } );
				inputFileRef.current.value = null;
			},
			/*不通过input<file>的形式传入文件 , 比如剪裁*/
			async setFile(file:File|string){
				if(file instanceof File){
					setState({ file });
				}else {
					const blob = await fetch(file).then((res) => res.blob());
					setState({ file : new File([ blob ] , 'whatever' , { type : "image/png" }) });
				}
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
					inputFileRef.current.value = null;
					if(!file || !(file instanceof File)) return ;
					setState( { file } );
					onUpload?.(file);
				},
				onDrop : ( e ) => {
					const [ file ] = e.dataTransfer.files;
					setState({ file });
					onUpload?.(store.file);
				} ,
			} as React.InputHTMLAttributes<any> ,
		};
	};
	type args = {
		onUpload? : (file : File,) => void ,
		preventClickUpload? : boolean;
	};
};
