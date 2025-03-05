import {
	reaxel_wallet ,
	reaxel_user,
} from "@@reaxels";

export const FileUpload = reaxper( () => {
	const {store,upload} = reaxel_upload();
	
	return <>
		<input type="file"
			onChange={(e) => {
				const file = e.target.files[0];
				upload(file);
				// const fileReader = new FileReader();
				// fileReader.onload = (e) => {
				// 	const result = e.target.result;
				// 	console.log(typeof result);
				// 	upload(result);
				// }
				// // fileReader.readAsDataURL( file );
				// fileReader.readAsDataURL( file ,);
			}}
			
		/>
		<img src = {store.file}/>
	</>
} );



const reaxel_upload = function(){
	const {
		store,
		setState
	} = orzMobx({
		file :null ,
		
	})
	
	
	return () => {
		
		return {
			get store(){
				return store;
			},
			upload (file:File){
				const reax_user = reaxel_user();
				
				const data = {
					spaceID : 30 ,
					iconType : 1 ,
					address : "0x46DE5Eb1ecd41A974b86B85C6c53e1a04606dA59" ,
					timestamp : Date.now() ,
				};
				reax_user.signByFakeWallet( data ).then((signature) => {
					
					return request.post( `https://192.168.0.4:8199/space/space-upload-avatar` , {
						method : "post" ,
						body : toolkits.toFormdata( {
							address : reaxel_wallet().account.address ,
							data ,
							signature ,
							file : file ,
						} ) ,
						mode : "cors" ,
					} );
				});
			}
		}
	}
}();
