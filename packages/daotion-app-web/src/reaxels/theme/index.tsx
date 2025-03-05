const darkThemePath = () => import('@@root/src/styles/dark.theme.less');
const lightThemePath = () => import('@@root/src/styles/light.theme.less');

export const reaxel_theme = function(){
	const {
		store ,
		setState,
	} = orzMobx<{
		theme :theme,
	}>( {
		theme : "light" ,
	} );
	
	const style = document.createElement('style');
	document.head.append( style );
	
	Reaxes.observedMemo(async () => {
		
		const LessModule = await darkThemePath();
		// console.log( LessModule , LessModule.default[ 0 ][ 1 ] , LessModule.default.toString() );
		if ( store.theme === "dark" ) {
			document.body.className = "dark";
			style.innerHTML = await darkThemePath().then((module) => module.default[ 0 ][ 1 ]);
		}else if(store.theme === "light"){
			document.body.className = "light";
			style.innerHTML = await lightThemePath().then((module) => module.default[ 0 ][ 1 ]);
		}
	} , () => [ store.theme ] );
	
	return () => {
		return {
			get theme (){
				return store.theme
			},
			/*如果不传theme则自动切换为另一种*/
			switch(theme?:theme){
				if(!theme){
					return setState( {
						theme : store.theme === "light" ? "dark" : "light" ,
					} );
				}else {
					setState( {
						theme ,
					} );
				}
			}
		}
	}
}(); 


type theme = "light"|"dark";
