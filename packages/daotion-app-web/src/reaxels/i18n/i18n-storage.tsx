import { reaxel_storage } from '@@reaxels';
/*为reaxel-i18n勾入storage能力*/
export const reaxel_i18n_storage = function(){
	const reax_storage = reaxel_storage();
	let ret = {
		writeToStorage(lang:string){
			reax_storage.set('__i18n_language__' , lang)
		},
		readFromStorage(callback){
			callback(reax_storage.get('__i18n_language__'));
			
		},
		clearI18nStorage(){
			reax_storage.remove( '__i18n_language__' );
		},
	};
	
	return (changLang) => {
		ret.readFromStorage( ( lang : string ) => {
			if ( lang ) {
				changLang( lang );
			}
			
		} );
		
		return ret;
	}
}();
