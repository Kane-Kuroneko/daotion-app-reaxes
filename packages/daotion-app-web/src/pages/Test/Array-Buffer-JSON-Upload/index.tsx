export const UploadArrayBuffer = reaxper(() => {
	
	const {
		upload_text ,
		upload_BinaryString,
		upload_base64 ,
	} = reaxel_JSON_upload_ArrayBuffer();
	const {} = reaxel_user();
	
	return <>
		<button
			onClick = { upload_base64 }
			style = { {
				width : "200px" ,
				height : "60px" ,
				
			} }
		>
			Base64
		</button>
	</>;
})

const reaxel_JSON_upload_ArrayBuffer = function(){
	
	return () => {
		
		return {
			upload_text (){
				const input = document.createElement( 'input' );
				input.type = "file";
				input.onchange = async (e) => {
					
					request.post('https://192.168.0.4:8199/space/test-file-json',{
						body : async () => (
							{
								address : input.files[0].type ,
								fileContent : await input.files[ 0 ].text() ,
							}
						),
					})
				}
				input.click();
			},
			upload_BinaryString (){
				const input = document.createElement( 'input' );
				input.type = "file";
				input.onchange = async (e) => {
					const reader = new FileReader();
					reader.onload = (e) => {
						request.post( 'https://192.168.0.4:8199/space/test-file-json' , {
							body : async () => (
								{
									address : input.files[0].type ,
									fileContent : reader.result ,
								}
							) ,
						} );
					}
					reader.readAsBinaryString(await input.files[0]);
				}
				input.click();
			},
			upload_base64 (){
				const input = document.createElement( 'input' );
				input.type = "file";
				input.onchange = async (e) => {
					const reader = new FileReader();
					reader.onload = (e) => {
						console.log( reader.result.toString() );
						request.post( 'https://192.168.0.4:8199/space/test-file-json' , {
							body : async () => (
								{
									address : input.files[0].type ,
									fileContent : reader.result.toString().replace(/[\w\W]*base64,/ ,'') ,
								}
							) ,
						} );
					}
					reader.readAsDataURL(input.files[0]);
				}
				input.click();
			},
		}
	}
}();
import { reaxel_user } from '@@reaxels/user/auth';
