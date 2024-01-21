export const reaxel_wallet = function(){
	const {
		store ,
		setState,
	} = orzMobx( {
		walletAddr : "0x100",
	} );
	
	return () => {
		
		return {
			store,
			setState,
		}
	}
}() ;

export const reaxel_userInfo = function () {
	const {
		store ,
		setState,
	} = orzMobx( {
		userInfo : null ,
	} );
	const reax_wallet = reaxel_wallet();
	Reaxes.observedMemo( () => {} , () => [] );
	return () => {
		
		return {
			
		};
	};
}();

const SwitchWallet = Reaxper(() => {
	
})



import {
	Reaxper ,
	Reaxlass ,
	orzMobx ,
} from 'reaxes';
